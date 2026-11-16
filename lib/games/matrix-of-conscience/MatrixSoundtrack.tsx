import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChangeEvent, CSSProperties } from 'react';

interface Track {
  title: string;
  source: string;
  defaultLevel?: number;
}

// Add published tracks here with their site-relative URLs and optional default levels.
// Level 0 is the sector map. Levels without a track use the sector-map selection.
const publishedTracks: readonly Track[] = [];

const panelStyle: CSSProperties = {
  position: 'fixed',
  left: 'max(0.75rem, env(safe-area-inset-left))',
  bottom: 'max(0.75rem, env(safe-area-inset-bottom))',
  zIndex: 100,
  maxWidth: 'calc(100vw - 1.5rem)',
  padding: '0.5rem 0.75rem',
  border: '1px solid #35516a',
  borderRadius: '0.65rem',
  background: '#07111e',
  color: '#e4f4ff',
  font: '0.875rem system-ui, sans-serif',
};

const labelStyle: CSSProperties = { display: 'grid', gap: '0.25rem' };

export default function MatrixSoundtrack({ level }: { level: number }) {
  const player = useRef<HTMLAudioElement>(null);
  const attachPlayer = useCallback((audio: HTMLAudioElement | null) => {
    if (audio) audio.volume = 0.3;
    player.current = audio;
  }, []);
  const localSources = useRef<string[]>([]);
  const wantsPlayback = useRef(false);
  const [localTracks, setLocalTracks] = useState<Track[]>([]);
  const [selections, setSelections] = useState<Partial<Record<number, string>>>({});
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState('');
  const tracks = [...publishedTracks, ...localTracks];
  const defaultTrack = publishedTracks.find((track) => track.defaultLevel === level)?.source;
  const menuTrack = selections[0] ?? publishedTracks.find((track) => track.defaultLevel === 0)?.source;
  const source = selections[level] ?? defaultTrack ?? menuTrack ?? tracks[0]?.source;
  const scene = level === 0 ? 'Sector map' : 'Level ' + level;

  useEffect(() => {
    const sources = localSources.current;
    return () => {
      for (const source of sources) URL.revokeObjectURL(source);
      sources.length = 0;
    };
  }, []);

  const startPlayback = useCallback((audio: HTMLAudioElement) => {
    const expectedSource = audio.getAttribute('src');
    setError('');
    void audio.play().catch((reason: unknown) => {
      if (!wantsPlayback.current || audio.getAttribute('src') !== expectedSource) return;
      if (reason instanceof DOMException && reason.name === 'AbortError') return;
      wantsPlayback.current = false;
      setPlaying(false);
      setError('Playback could not start. Press Play or try another audio file.');
    });
  }, []);

  useEffect(() => {
    const audio = player.current;
    if (audio && source && wantsPlayback.current) startPlayback(audio);
  }, [source, startPlayback]);

  function importTracks(event: ChangeEvent<HTMLInputElement>) {
    const additions = Array.from(event.currentTarget.files ?? []).map((file) => {
      const source = URL.createObjectURL(file);
      localSources.current.push(source);
      return { title: file.name, source };
    });
    setLocalTracks((current) => [...current, ...additions]);
    event.currentTarget.value = '';
  }

  function togglePlayback() {
    const audio = player.current;
    if (!audio || !source) return;
    if (wantsPlayback.current) {
      wantsPlayback.current = false;
      audio.pause();
      setPlaying(false);
      return;
    }

    wantsPlayback.current = true;
    setPlaying(true);
    startPlayback(audio);
  }

  return (
    <details style={panelStyle}>
      <summary style={{ cursor: 'pointer' }}>Soundtrack</summary>
      <div style={{ display: 'grid', gap: '0.6rem', width: 'min(16rem, calc(100vw - 3rem))', paddingTop: '0.6rem' }}>
        <label style={labelStyle}>
          Add music from this device
          <input type="file" accept="audio/*,.mp3,.ogg,.wav,.m4a" multiple onChange={importTracks} />
        </label>
        {tracks.length > 0 && (
          <>
            <label style={labelStyle}>
              {scene} music
              <select
                value={source}
                onChange={(event) => {
                  const selectedSource = event.currentTarget.value;
                  setError('');
                  setSelections((current) => ({ ...current, [level]: selectedSource }));
                }}
              >
                {tracks.map((track) => <option key={track.source} value={track.source}>{track.title}</option>)}
              </select>
            </label>
            <button type="button" onClick={togglePlayback}>{playing ? 'Pause music' : 'Play music'}</button>
            <label style={labelStyle}>
              Music volume
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="30"
                onChange={(event) => {
                  if (player.current) player.current.volume = Number(event.currentTarget.value) / 100;
                }}
              />
            </label>
          </>
        )}
        <span role="status">{error}</span>
      </div>
      <audio
        ref={attachPlayer}
        src={source}
        loop
        preload="none"
        onError={() => {
          if (!source) return;
          wantsPlayback.current = false;
          setPlaying(false);
          setError('This track could not be loaded. Try another audio file.');
        }}
      />
    </details>
  );
}
