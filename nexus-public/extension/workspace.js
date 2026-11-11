const field = id => document.getElementById(id);
const maxDraftLength = 100000;

function draft() {
  return {
    name: field('draft-name').value.trim().replace(/[/\\\u0000-\u001f]/g, '_') || 'nexus-draft.txt',
    text: field('draft-text').value
  };
}

async function backUp(provider, token, project, document) {
  const headers = { Authorization: `Bearer ${token}` };
  let url;
  let body;
  if (provider === 'drive') {
    url = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id';
    const boundary = crypto.randomUUID();
    headers['Content-Type'] = `multipart/related; boundary=${boundary}`;
    body = [
      `--${boundary}`, 'Content-Type: application/json; charset=UTF-8', '',
      JSON.stringify({ name: document.name, mimeType: 'text/plain' }),
      `--${boundary}`, 'Content-Type: text/plain; charset=UTF-8', '',
      document.text, `--${boundary}--`, ''
    ].join('\r\n');
  } else {
    if (!/^[a-z][a-z0-9-]{4,62}[a-z0-9]$/.test(project)) {
      throw new Error('Enter your Firebase project ID.');
    }
    url = `https://firestore.googleapis.com/v1/projects/${project}/databases/(default)/documents/nexusDrafts`;
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify({
      fields: {
        name: { stringValue: document.name },
        text: { stringValue: document.text }
      }
    });
  }
  const result = await fetch(url, {
    method: 'POST', headers, body, redirect: 'error', signal: AbortSignal.timeout(30000)
  });
  if (!result.ok) throw new Error(`Backup returned HTTP ${result.status}. Check the token and write permissions.`);
}

export async function setupWorkspace() {
  const status = field('draft-status');
  const name = field('draft-name');
  const text = field('draft-text');
  const filePicker = field('draft-file');
  const draftAction = (id, action) => field(id).addEventListener('click', async () => {
    try {
      status.textContent = await action();
    } catch (error) {
      status.textContent = error.message;
    }
  });
  filePicker.addEventListener('change', async () => {
    const [file] = filePicker.files;
    filePicker.value = '';
    if (!file) return;
    try {
      if (file.size > 400000) throw new Error('Choose a text file up to 100,000 characters.');
      const contents = await file.text();
      if (contents.length > maxDraftLength || contents.includes('\u0000')) {
        throw new Error('Choose a text file up to 100,000 characters.');
      }
      name.value = file.name.slice(0, 100);
      text.value = contents;
      status.textContent = 'File opened in the draft editor.';
    } catch (error) {
      status.textContent = error.message;
    }
  });
  draftAction('attach-draft', () => {
    const prompt = field('prompt');
    const attachment = `\n\nDraft for reference:\n${JSON.stringify(draft().text)}`;
    if (prompt.value.length + attachment.length > prompt.maxLength) {
      throw new Error('Shorten the draft or select an excerpt before adding it to chat.');
    }
    prompt.value += attachment;
    prompt.focus();
    return 'Draft added to the request. Review it before sending.';
  });
  draftAction('use-answer', () => {
    const answer = field('answer').textContent;
    if (!answer.trim() || answer.length > maxDraftLength) throw new Error('There is no usable AI answer to copy.');
    if (text.value && !window.confirm('Replace the current draft with this AI answer?')) return 'Draft kept.';
    text.value = answer;
    return 'Answer copied. Review and save when ready.';
  });
  draftAction('save-draft', async () => {
    await chrome.storage.local.set({ nexusDraft: draft() });
    return 'Draft saved in this Chrome profile.';
  });
  draftAction('download-draft', () => {
    const { name, text } = draft();
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return 'Download requested.';
  });

  const backupProvider = field('backup-provider');
  const backupProject = field('backup-project');
  backupProvider.addEventListener('change', () => {
    const firebase = backupProvider.value === 'firebase';
    field('backup-project-label').hidden = !firebase;
    backupProject.required = firebase;
    field('backup-token').value = '';
  });
  field('backup-form').addEventListener('submit', async event => {
    event.preventDefault();
    const tokenInput = field('backup-token');
    const token = tokenInput.value.trim();
    tokenInput.value = '';
    const button = event.submitter;
    button.disabled = true;
    status.textContent = 'Sending backup…';
    try {
      if (!token) throw new Error('Enter a short-lived access token.');
      await backUp(backupProvider.value, token, backupProject.value.trim(), draft());
      status.textContent = 'Cloud backup created.';
    } catch (error) {
      status.textContent = error.message;
    } finally {
      button.disabled = false;
    }
  });

  try {
    const { nexusDraft } = await chrome.storage.local.get('nexusDraft');
    if (nexusDraft && !text.value && name.value === 'nexus-draft.txt') {
      name.value = nexusDraft.name;
      text.value = nexusDraft.text;
    }
  } catch {
    status.textContent = 'The saved draft could not be loaded.';
  }
}
