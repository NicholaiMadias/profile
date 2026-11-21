"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { md102Lessons, MD102_CERT, MD102_GUIDE } from "../lib/md102-course";
import { emptyMd102Progress, mergeMd102Progress, MD102_STORAGE_KEY, parseMd102Progress, type Md102Progress } from "../lib/md102-progress";
import styles from "./MD102Course.module.css";

function readLocal(key: string): Md102Progress {
  try { return parseMd102Progress(JSON.parse(localStorage.getItem(key) || "null")); }
  catch { return emptyMd102Progress(); }
}
function userKey(uid: string): string { return `nicholai:lms:md102:v1:user:${uid}`; }
const cloudPath = (uid: string) => doc(db!, "users", uid, "lmsProgress", "md102");

export default function MD102Course() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState("Loading saved progress…");
  const [progress, setProgress] = useState<Md102Progress>(emptyMd102Progress);
  const [active, setActive] = useState(md102Lessons[0].id);
  const [choice, setChoice] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const session = useRef(0);
  const current = useRef(emptyMd102Progress());
  const storageKey = useRef(MD102_STORAGE_KEY);
  const signedInUser = useRef<User | null>(null);
  const readyRef = useRef(false);

  const setCurrent = useCallback((value: Md102Progress) => {
    current.current = value;
    setProgress(value);
  }, []);

  useEffect(() => {
    let disposed = false;
    const load = async (nextUser: User | null) => {
      const nonce = ++session.current;
      readyRef.current = false;
      signedInUser.current = nextUser;
      const key = nextUser ? userKey(nextUser.uid) : MD102_STORAGE_KEY;
      storageKey.current = key;
      setUser(nextUser);
      let next = readLocal(key);
      setCurrent(next);
      if (nextUser && db) {
        setSaving("Loading account progress…");
        try {
          const snapshot = await getDoc(cloudPath(nextUser.uid));
          if (disposed || session.current !== nonce) return;
          if (snapshot.exists()) next = mergeMd102Progress(next, parseMd102Progress(snapshot.data()));
          setCurrent(next);
          try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* browser storage unavailable */ }
          setSaving("Signed in · account progress loaded");
        } catch {
          if (disposed || session.current !== nonce) return;
          setSaving("Cloud unavailable · saving on this device");
        }
      } else {
        setSaving(nextUser ? "Account signed in · saving on this device" : "Guest mode · saving on this device");
      }
      if (!disposed && session.current === nonce) {
        readyRef.current = true;
        setReady(true);
      }
    };
    const unlisten = auth
      ? onAuthStateChanged(auth, account => { void load(account); }, () => { void load(null); })
      : undefined;
    if (!auth) void load(null);
    return () => { disposed = true; session.current++; unlisten?.(); };
  }, [setCurrent]);

  async function save(next: Md102Progress) {
    if (!readyRef.current) return;
    setCurrent(next);
    const key = storageKey.current;
    let localSaved = false;
    try { localStorage.setItem(key, JSON.stringify(next)); localSaved = true; }
    catch { setSaving("Storage blocked · progress lasts until this page closes"); }
    const account = signedInUser.current;
    if (account && db) {
      const nonce = session.current;
      setSaving("Syncing account progress…");
      try {
        await setDoc(cloudPath(account.uid), next, { merge: false });
        if (nonce === session.current) setSaving("Synced to your account");
      } catch {
        if (nonce === session.current) setSaving(localSaved ? "Cloud sync unavailable · saved on this device" : "Saving unavailable · keep this page open");
      }
    } else if (localSaved) {
      setSaving(account ? "Signed in · saved on this device" : "Guest mode · saved on this device");
    }
  }

  async function login() {
    if (!auth) return;
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch {
      setSaving("Sign-in unavailable. Continue as a guest; browser saving still works.");
    }
  }
  async function logout() {
    if (!auth) return;
    try { await signOut(auth); }
    catch { setSaving("Sign-out failed. Try again."); }
  }

  const lesson = md102Lessons.find(item => item.id === active)!;
  const completed = progress.completed.length;
  const correct = choice === lesson.correct;
  function selectLesson(id: string) {
    setActive(id);
    setChoice(null);
    setChecked(false);
  }
  async function recordResult() {
    if (choice === null || !checked) return;
    const next = mergeMd102Progress(current.current, {
      version: 1, completed: correct ? [lesson.id] : [], best: { [lesson.id]: correct ? 1 : 0 }
    });
    await save(next);
  }
  return (
    <section className={styles.root} aria-label="MD-102 certification learning path">
      <div className={styles.toolbar}>
        <div>
          <strong>MD-102 · Endpoint Administrator</strong>
          <p>{completed} / {md102Lessons.length} lessons completed · {saving}</p>
        </div>
        {auth ? user ? (
          <div><span className={styles.account}>Signed in: {user.displayName || user.email || "Learner"}</span>{" "}
            <button type="button" onClick={() => void logout()}>Sign out</button></div>
        ) : <button type="button" onClick={() => void login()}>Sign in with Google (optional)</button> : (
          <span className={styles.account}>Sign-in not configured · guest learning available</span>
        )}
      </div>
      <progress max={md102Lessons.length} value={completed} aria-label="Course completion" className={styles.progress}/>
      <div className={styles.layout}>
        <nav className={styles.modules} aria-label="MD-102 lessons">
          {md102Lessons.map((item, index) => (
            <button key={item.id} type="button" onClick={() => selectLesson(item.id)}
              aria-current={item.id === active ? "step" : undefined}>
              <span>Module {index + 1} · {item.weight}</span>
              <strong>{item.title}</strong>
              <small>{progress.completed.includes(item.id) ? "✓ Completed" : "Not completed"}</small>
            </button>
          ))}
        </nav>
        <article className={styles.lesson}>
          <h2>{lesson.title}</h2>
          <p>{lesson.overview}</p>
          <h3>Learning objectives</h3>
          <ul>{lesson.objectives.map(objective => <li key={objective}>{objective}</li>)}</ul>
          <details className={styles.reading}>
            <summary>Official Microsoft study resources</summary>
            <p><a href={MD102_GUIDE} target="_blank" rel="noopener noreferrer">MD-102 skills measured and study guide</a></p>
            <p><a href={MD102_CERT} target="_blank" rel="noopener noreferrer">Official certification and practice assessment</a></p>
          </details>
          <h3>Knowledge check</h3>
          <p>{lesson.question}</p>
          <fieldset className={styles.choices} disabled={checked || !ready}>
            <legend className={styles.srOnly}>Choose one answer</legend>
            {lesson.answers.map((answer, index) => (
              <label key={answer}><input type="radio" name={`md102-${lesson.id}`} checked={choice === index}
                onChange={() => setChoice(index)}/> {answer}</label>
            ))}
          </fieldset>
          {checked && <p role="status" className={styles.feedback}>
            <strong>{correct ? "Correct." : "Review this answer."}</strong> {lesson.explanation}
          </p>}
          <div className={styles.actions}>
            {!checked ? <button type="button" disabled={choice === null || !ready} onClick={() => setChecked(true)}>Check answer</button>
              : <button type="button" disabled={!ready} onClick={() => void recordResult()}>
                Save lesson progress
              </button>}
            {checked && <button type="button" onClick={() => { setChecked(false); setChoice(null); }}>Try again</button>}
          </div>
          <p className={styles.disclaimer}>Unofficial original practice content. Not affiliated with, endorsed by, or a substitute for Microsoft training or the MD-102 exam.</p>
        </article>
      </div>
    </section>
  );
}
