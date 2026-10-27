/********************************************************************
 * 2. SHARED AUDIO ENGINE: useSound & useMusic
 ********************************************************************/
const AudioEngine = (() => {
  let ctx = null; let isUnlocked = false; let musicTimer = null; let musicStep = 0; let inGameScreen = false; let isDucked = false;
  const settings = JSON.parse(localStorage.getItem('bimba_audio_settings') || '{}');
  let state = {
    musicEnabled: settings.musicEnabled !== undefined ? settings.musicEnabled : true,
    sfxMuted: settings.sfxMuted !== undefined ? settings.sfxMuted : false,
    musicVolume: settings.musicVolume !== undefined ? settings.musicVolume : 0.18,
    selectedVoiceURI: settings.selectedVoiceURI || 'AUTO_NATURAL_EN_US',
    leoVoiceURI: settings.leoVoiceURI || 'AUTO_LEO_MALE',
    allMenVoice: settings.allMenVoice !== undefined ? settings.allMenVoice : false
  };

  function saveSettings() { localStorage.setItem('bimba_audio_settings', JSON.stringify(state)); }
  function ensureContext() {
    if (!ctx) { const AudioCtx = window.AudioContext || window.webkitAudioContext; if (AudioCtx) ctx = new AudioCtx(); }
    if (ctx && ctx.state === 'suspended') { ctx.resume(); } return ctx;
  }
  function unlock() { ensureContext(); if (!isUnlocked) { isUnlocked = true; if (state.musicEnabled) startMusicLoop(); } }

  const MELODY_NOTES = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 783.99, 523.25, 440.00, 523.25, 659.25, 587.33];

  function getTargetMusicGain() {
    if (!state.musicEnabled) return 0;
    const base = inGameScreen ? Math.min(state.musicVolume * 0.42, 0.075) : state.musicVolume;
    return isDucked ? base * 0.25 : base;
  }

  function playMusicTick() {
    if (!state.musicEnabled || !ctx || ctx.state !== 'running') return;
    const gainVal = getTargetMusicGain(); if (gainVal <= 0.001) return;
    const now = ctx.currentTime; const freq = MELODY_NOTES[musicStep % MELODY_NOTES.length]; musicStep++;
    const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.type = 'sine'; osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.0001, now); gain.gain.linearRampToValueAtTime(gainVal, now + 0.03); gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);
    osc.connect(gain); gain.connect(ctx.destination); osc.start(now); osc.stop(now + 0.44);
  }
  function startMusicLoop() { if (musicTimer) clearInterval(musicTimer); musicTimer = setInterval(playMusicTick, 480); }
  function setDucking(duck) { isDucked = duck; }
  function setInGameMode(inGame) { inGameScreen = inGame; }

  function playBubble() {
    if (state.sfxMuted) return; const c = ensureContext(); if (!c) return;
    const now = c.currentTime; const osc = c.createOscillator(); const g = c.createGain();
    osc.type = 'sine'; osc.frequency.setValueAtTime(340, now); osc.frequency.exponentialRampToValueAtTime(780, now + 0.085);
    g.gain.setValueAtTime(0.18, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc.connect(g); g.connect(c.destination); osc.start(now); osc.stop(now + 0.095);
  }
  function playPop() {
    if (state.sfxMuted) return; const c = ensureContext(); if (!c) return;
    const now = c.currentTime; const osc = c.createOscillator(); const g = c.createGain();
    osc.type = 'triangle'; osc.frequency.setValueAtTime(480, now); osc.frequency.exponentialRampToValueAtTime(920, now + 0.07);
    g.gain.setValueAtTime(0.2, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(g); g.connect(c.destination); osc.start(now); osc.stop(now + 0.085);
  }
  function playCorrect() {
    if (state.sfxMuted) return; const c = ensureContext(); if (!c) return; setDucking(true);
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, i) => {
      const now = c.currentTime + i * 0.08; const osc = c.createOscillator(); const g = c.createGain();
      osc.type = 'triangle'; osc.frequency.setValueAtTime(n, now); g.gain.setValueAtTime(0.22, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
      osc.connect(g); g.connect(c.destination); osc.start(now); osc.stop(now + 0.25);
    }); setTimeout(() => setDucking(false), 500);
  }
  function playWrong() {
    if (state.sfxMuted) return; const c = ensureContext(); if (!c) return; setDucking(true);
    const now = c.currentTime; const osc = c.createOscillator(); const g = c.createGain();
    osc.type = 'sine'; osc.frequency.setValueAtTime(280, now); osc.frequency.linearRampToValueAtTime(195, now + 0.26);
    g.gain.setValueAtTime(0.2, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    osc.connect(g); g.connect(c.destination); osc.start(now); osc.stop(now + 0.29); setTimeout(() => setDucking(false), 400);
  }

  return {
    unlock, state, saveSettings, setDucking, setInGameMode, playBubble, playPop, playCorrect, playWrong,
    toggleMusic() { state.musicEnabled = !state.musicEnabled; saveSettings(); if (state.musicEnabled) startMusicLoop(); },
    toggleMute() { state.sfxMuted = !state.sfxMuted; if (state.sfxMuted && window.speechSynthesis) window.speechSynthesis.cancel(); saveSettings(); },
    setMusicVolume(v) { state.musicVolume = Number(v); saveSettings(); },
    setSelectedVoice(uri) { state.selectedVoiceURI = uri; saveSettings(); },
    setLeoVoice(uri) { state.leoVoiceURI = uri; saveSettings(); },
    setAllMenVoice(enabled) { state.allMenVoice = !!enabled; saveSettings(); }
  };
})();

/********************************************************************
 * 3. NATURAL TEACHER VOICE ENGINE
 ********************************************************************/
const useSpeech = (() => {
  let availableVoices = []; let cachedAutoVoice = null; let activeUtterance = null; let sequenceToken = 0;
  const recordedAudioMap = {};

  function loadVoices() {
    if (!('speechSynthesis' in window)) return [];
    const raw = window.speechSynthesis.getVoices() || [];
    if (raw.length > 0) { availableVoices = raw.filter(v => /^en(-|_|$)/i.test(v.lang)); cachedAutoVoice = pickBestNaturalEnUsVoice(raw); }
    return availableVoices;
  }

  function pickBestNaturalEnUsVoice(voices) {
    if (!voices || !voices.length) return null;
    const enVoices = voices.filter(v => /^en/i.test(v.lang)); const pool = enVoices.length ? enVoices : voices;
    const priorities = [
      v => /Google US English/i.test(v.name), v => /Microsoft (Aria|Jenny|Ana|Guy).*Online.*Natural/i.test(v.name),
      v => /Natural|Neural/i.test(v.name) && /en[-_]US/i.test(v.lang), v => /Samantha/i.test(v.name),
      v => /Microsoft (Zira|Aria|Jenny)/i.test(v.name), v => /en[-_]US/i.test(v.lang)
    ];
    for (const testFn of priorities) { const match = pool.find(testFn); if (match) return match; } return pool[0] || null;
  }

  if ('speechSynthesis' in window) { loadVoices(); window.speechSynthesis.onvoiceschanged = () => { loadVoices(); }; }

  function getChosenVoice() {
    if (!availableVoices.length) loadVoices(); const pref = AudioEngine.state.selectedVoiceURI;
    if (pref === 'FORCE_MALE_TEACHER') return getMaleVoice();
    if (pref && pref !== 'AUTO_NATURAL_EN_US') { const found = availableVoices.find(v => v.voiceURI === pref || v.name === pref); if (found) return found; }
    return cachedAutoVoice || availableVoices[0] || null;
  }
  function getMaleVoice(preferredURI) {
    if (!availableVoices.length) loadVoices(); const targetURI = preferredURI || AudioEngine.state.leoVoiceURI;
    if (targetURI && targetURI !== 'AUTO_LEO_MALE') { const found = availableVoices.find(v => v.voiceURI === targetURI || v.name === targetURI); if (found) return found; }
    const male = availableVoices.find(v => /Guy|David|Matthew|Mark|Brian|George|Male/i.test(v.name) && /^en/i.test(v.lang));
    return male || getChosenVoice(); 
  }
  function splitAtSentenceBoundaries(text) {
    const clean = String(text || '').replace(/\s+/g, ' ').trim(); if (!clean) return []; if (clean.length <= 150) return [clean];
    const parts = clean.match(/[^.!?]+[.!?]+|[^.!?]+$/g); return parts ? parts.map(p => p.trim()).filter(Boolean) : [clean];
  }
  function stopAll() { sequenceToken++; if ('speechSynthesis' in window && (window.speechSynthesis.speaking || window.speechSynthesis.pending)) window.speechSynthesis.cancel(); AudioEngine.setDucking(false); }

  function speakSingleUnit(text, options = {}) {
    return new Promise(resolve => {
      if (AudioEngine.state.sfxMuted || !text) { resolve(); return; }
      const cleanText = String(text).replace(/\s+/g, ' ').trim(); const audioKey = cleanText.toLowerCase();
      if (recordedAudioMap[audioKey]) {
        AudioEngine.setDucking(true); const audio = new Audio(recordedAudioMap[audioKey]);
        audio.onended = () => { AudioEngine.setDucking(false); resolve(); }; audio.onerror = () => { AudioEngine.setDucking(false); resolve(); };
        audio.play().catch(() => { AudioEngine.setDucking(false); resolve(); }); return;
      }
      if (!('speechSynthesis' in window)) { resolve(); return; }

      const isSingleWord = !cleanText.includes(' '); const chunks = splitAtSentenceBoundaries(cleanText); let idx = 0;
      function playNextChunk() {
        if (idx >= chunks.length) { AudioEngine.setDucking(false); resolve(); return; }
        const utter = new SpeechSynthesisUtterance(chunks[idx]); activeUtterance = utter;
        const isAllMen = AudioEngine.state.allMenVoice; const isLeo = options.speaker === 'Leo'; const useMale = isAllMen || isLeo;
        let voice = null;
        if (isLeo && AudioEngine.state.leoVoiceURI && AudioEngine.state.leoVoiceURI !== 'AUTO_LEO_MALE') voice = getMaleVoice(AudioEngine.state.leoVoiceURI);
        else if (useMale) voice = getMaleVoice(); else voice = getChosenVoice();

        if (voice) { utter.voice = voice; utter.lang = voice.lang || 'en-US'; } else { utter.lang = 'en-US'; }
        if (useMale) { utter.rate = options.rate || (isSingleWord ? 0.9 : 0.95); utter.pitch = options.pitch || (isLeo ? 0.82 : 0.76); } 
        else { utter.rate = options.rate || (isSingleWord ? 0.9 : 0.97); utter.pitch = options.pitch || 1.1; }
        utter.volume = 1.0; AudioEngine.setDucking(true);
        utter.onend = () => { idx++; playNextChunk(); }; utter.onerror = () => { AudioEngine.setDucking(false); resolve(); };
        window.speechSynthesis.speak(utter);
      }
      playNextChunk();
    });
  }

  async function speakQueue(items, { interrupt = true } = {}) {
    if (AudioEngine.state.sfxMuted) return; const myToken = ++sequenceToken;
    if (interrupt && 'speechSynthesis' in window) { if (window.speechSynthesis.speaking || window.speechSynthesis.pending) { window.speechSynthesis.cancel(); await new Promise(r => setTimeout(r, 105)); } }
    const list = Array.isArray(items) ? items : [items];
    for (let i = 0; i < list.length; i++) {
      if (myToken !== sequenceToken) return; const item = list[i]; const text = typeof item === 'string' ? item : item.text;
      const delayAfter = typeof item === 'object' && item.pause ? item.pause : 140; await speakSingleUnit(text, typeof item === 'object' ? item : {});
      if (i < list.length - 1 && myToken === sequenceToken) await new Promise(r => setTimeout(r, delayAfter));
    }
  }
  function speakSentence(sentence, interrupt = true, speaker = null, rate = null) { const item = { text: sentence, speaker: speaker }; if (rate) item.rate = rate; return speakQueue([item], { interrupt }); }
  const QUESTION_READ_RATE = 0.78; // slower pace used only when reading questions
  function speakQuestion(sentence, interrupt = true) { return speakSentence(sentence, interrupt, null, QUESTION_READ_RATE); }
  function speakLetterName(letter, interrupt = true) {
    const up = String(letter || '').trim().toUpperCase(); const spoken = LETTER_NAME_SPOKEN[up] || up.toLowerCase();
    return speakQueue([{ text: spoken, rate: 0.88, pitch: 1.1 }], { interrupt });
  }
  function speakLetterAndWord(letter, word, interrupt = true) {
    const up = String(letter || '').trim().toUpperCase(); const spokenLetter = LETTER_NAME_SPOKEN[up] || up.toLowerCase();
    return speakQueue([ { text: spokenLetter, rate: 0.88, pitch: 1.1, pause: 220 }, { text: String(word).toLowerCase(), rate: 0.92, pitch: 1.1 } ], { interrupt });
  }

  return { speakQuestion, loadVoices, getAvailableVoices: () => { loadVoices(); return availableVoices; }, getChosenVoice, getMaleVoice, stopAll, speakSentence, speakQueue, speakLetterName, speakLetterAndWord };
})();

