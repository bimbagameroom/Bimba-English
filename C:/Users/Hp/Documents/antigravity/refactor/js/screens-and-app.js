/********************************************************************
 * 10. SHARED UI COMPONENTS
 ********************************************************************/
function renderTopBar({ title, progressText = null, onBack }) {
  const stars = ProgressStore.getTotalStars();
  const musicIcon = AudioEngine.state.musicEnabled ? '🎵' : '🔇'; const muteIcon = AudioEngine.state.sfxMuted ? '🔕' : '🔊';
  return `
    <header class="top-bar">
      <div class="top-bar-left">
        <button class="btn-bubble btn-yellow" id="btn-topbar-back" aria-label="Back">⬅️ Back</button>
        <button class="btn-bubble" id="btn-topbar-home" aria-label="Home">🏠 Home</button>
      </div>
      <div class="top-bar-center">
        <div class="top-bar-title">${title}</div>
        ${progressText ? `<div class="pill-badge" style="margin-top:4px;background:#E0F2FE;">📋 ${progressText}</div>` : ''}
      </div>
      <div class="top-bar-right">
        <button class="btn-bubble" id="btn-topbar-music" title="Toggle Background Music">${musicIcon}</button>
        <button class="btn-bubble" id="btn-topbar-mute" title="Mute Voice & Sound Effects">${muteIcon}</button>
        <button class="btn-bubble" id="btn-topbar-settings" title="Settings & Voice">⚙️</button>
      </div>
    </header>
  `;
}

function renderMenuRow({ index, numberLabel, title, subtitle, icon, dataAttr }) {
  return `
    <div class="menu-row candy-theme-${index % 8}" role="button" tabindex="0" ${dataAttr}>
      <div class="menu-text">
        <div class="menu-title">${numberLabel} ${title}</div>
        ${subtitle ? `<div class="menu-sub">${subtitle}</div>` : ''}
      </div>
      <span class="menu-play">Play ▶</span>
    </div>`;
}

function renderCandyCard({ index, numberLabel, title, subtitle, icon, gameId = null, dataAttr = '', isBigCenter = false, vocabLayout = false }) {
  const themeIndex = index % 8; const isLightText = themeIndex === 1 || themeIndex === 5;
  let badgeHtml = '';
  if (gameId) {
    const status = ProgressStore.getGameStatus(gameId); const completedInfo = ProgressStore.getCompletedInfo(gameId);
    if (status === 'in_progress') badgeHtml = `<span class="status-badge status-progress">⏳ In progress</span>`;
    else if (status === 'completed') badgeHtml = `<span class="status-badge status-completed">Completed ${'★'.repeat(completedInfo.stars)}</span>`;
  }
  return `
    <div class="candy-card candy-theme-${themeIndex} ${isLightText ? 'text-light' : ''}" ${dataAttr}>
      <div class="candy-card-header">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <span class="candy-num-badge">${numberLabel}</span> ${badgeHtml}
        </div>
        <div class="candy-icon-bubble">${icon}</div>
      </div>
      ${vocabLayout ? `<div class="vocab-card-text"><div class="candy-card-title">${title}</div>${subtitle ? `<div class="candy-card-sub">${subtitle}</div>` : ''}</div>` : `
      <div style="${isBigCenter ? 'text-align: center; margin-top: 4px; flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center;' : ''}">
        <div class="candy-card-title" style="${isBigCenter ? 'font-size: 2.1rem; margin-bottom: 8px;' : ''}">${title}</div>
        ${subtitle ? `<div class="candy-card-sub" style="${isBigCenter ? 'font-size: 1.3rem; line-height: 1.3;' : ''}">${subtitle}</div>` : ''}
      </div>`}
    </div>
  `;
}

/********************************************************************
 * 11. SETTINGS & PRONUNCIATION CHECK MODALS
 ********************************************************************/
function openSettingsModal() {
  AudioEngine.playBubble(); const modalRoot = document.getElementById('modal-root');
  const voices = useSpeech.getAvailableVoices(); const currentURI = AudioEngine.state.selectedVoiceURI; const leoCurrentURI = AudioEngine.state.leoVoiceURI;

  const teacherOptionsHtml = [
    `<option value="AUTO_NATURAL_EN_US" ${currentURI === 'AUTO_NATURAL_EN_US' ? 'selected' : ''}>🌟 English Teacher Voice Natural (en-US) — Recommended</option>`,
    `<option value="FORCE_MALE_TEACHER" ${currentURI === 'FORCE_MALE_TEACHER' ? 'selected' : ''}>👨 Male Teacher Voice (Natural en-US)</option>`,
    ...voices.map(v => `<option value="${v.voiceURI}" ${currentURI === v.voiceURI ? 'selected' : ''}>${/Guy|David|Matthew|Mark|Brian|Male|George/i.test(v.name) ? '👨 ' : ''}${v.name} (${v.lang})</option>`)
  ].join('');

  const leoOptionsHtml = [
    `<option value="AUTO_LEO_MALE" ${leoCurrentURI === 'AUTO_LEO_MALE' ? 'selected' : ''}>🌟 Auto Male / Boy Voice — Recommended</option>`,
    ...voices.map(v => `<option value="${v.voiceURI}" ${leoCurrentURI === v.voiceURI ? 'selected' : ''}>${/Guy|David|Matthew|Mark|Brian|Male|George/i.test(v.name) ? '👨 ' : ''}${v.name} (${v.lang})</option>`)
  ].join('');

  modalRoot.innerHTML = `
    <div class="modal-backdrop" id="settings-backdrop">
      <div class="modal-card pop-anim">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;"><h2 style="font-size:1.75rem;">⚙️ Sound & Voice Settings</h2><button class="btn-bubble" id="btn-close-settings">✖️</button></div>
        <div style="margin-bottom:18px;background:#E0F2FE;border:3px solid #1E293B;border-radius:20px;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;box-shadow:0 4px 0 #1E293B;">
          <div><label for="toggle-all-men" style="font-weight:800;font-size:1.18rem;display:block;cursor:pointer;">👨 Option: All Men Voice Mode</label><span style="font-size:0.92rem;font-weight:600;color:#334155;">Make all voices, questions, instructions, and characters use male voices</span></div>
          <input type="checkbox" id="toggle-all-men" ${AudioEngine.state.allMenVoice ? 'checked' : ''} style="width:26px;height:26px;accent-color:#0284C7;cursor:pointer;flex-shrink:0;" />
        </div>
        <div style="margin-bottom:18px;">
          <label style="font-weight:800;font-size:1.1rem;display:block;">🎤 Teacher Voice Selection:</label><select class="voice-select" id="select-teacher-voice">${teacherOptionsHtml}</select>
          <div style="margin-top:10px;display:flex;gap:10px;flex-wrap:wrap;"><button class="btn-bubble btn-primary" id="btn-test-voice">🔊 Test Teacher</button><button class="btn-bubble btn-yellow" id="btn-open-pron-check">🔤 A–Z Pronunciation Check</button></div>
        </div>
        <div style="margin-bottom:18px;">
          <label style="font-weight:800;font-size:1.1rem;display:block;">👦 Leo Voice Selection:</label><select class="voice-select" id="select-leo-voice">${leoOptionsHtml}</select>
          <div style="margin-top:10px;"><button class="btn-bubble btn-blue" id="btn-test-leo-voice">🔊 Test Leo Voice</button></div>
        </div>
        <hr style="border:none;border-top:2px dashed #CBD5E1;margin:16px 0;" />
        <div style="margin-bottom:18px;">
          <label style="font-weight:800;font-size:1.1rem;display:block;">🎹 Background Music Volume: <span id="lbl-music-vol">${Math.round(AudioEngine.state.musicVolume * 100)}%</span></label>
          <input type="range" id="slider-music-vol" min="0" max="0.35" step="0.01" value="${AudioEngine.state.musicVolume}" style="width:100%;margin-top:8px;height:28px;accent-color:#10B981;" />
        </div>
        <div style="background:#F1F5F9;border-radius:16px;padding:12px 14px;font-size:0.95rem;border:2px solid #CBD5E1;">
          <strong>💡 Audio-File-First Pipeline Ready:</strong> Place optional neural-TTS or recorded files in <code>/assets/audio/&lt;phrase&gt;.mp3</code> to override browser TTS automatically.
        </div>
        <div style="margin-top:16px; text-align:center;">
          <button class="btn-bubble btn-pink" onclick="validateVocabContent()" style="font-size:0.9rem;">🛠️ Run Developer Validation</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('btn-close-settings').onclick = () => { AudioEngine.playBubble(); modalRoot.innerHTML = ''; };
  document.getElementById('toggle-all-men').onchange = (e) => { AudioEngine.setAllMenVoice(e.target.checked); };
  document.getElementById('select-teacher-voice').onchange = (e) => { AudioEngine.setSelectedVoice(e.target.value); };
  document.getElementById('select-leo-voice').onchange = (e) => { AudioEngine.setLeoVoice(e.target.value); };
  document.getElementById('btn-test-voice').onclick = () => { AudioEngine.playPop(); useSpeech.speakSentence("Hello! I'm your English teacher. Let's learn together!", true); };
  document.getElementById('btn-test-leo-voice').onclick = () => { AudioEngine.playPop(); useSpeech.speakSentence("Hi! I am Leo, let's learn English together!", true, 'Leo'); };
  document.getElementById('slider-music-vol').oninput = (e) => { AudioEngine.setMusicVolume(e.target.value); document.getElementById('lbl-music-vol').textContent = `${Math.round(e.target.value * 100)}%`; };
  document.getElementById('btn-open-pron-check').onclick = () => { AudioEngine.playBubble(); openPronunciationCheckModal(); };
}

function openPronunciationCheckModal() {
  const modalRoot = document.getElementById('modal-root');
  const tilesHtml = ALPHABET_DATA.map(item => `
    <button class="btn-bubble btn-yellow" data-check-letter="${item.letter}" style="flex-direction:column;padding:10px 14px;min-width:95px;">
      <span style="font-size:1.4rem;">${item.letter}${item.letter.toLowerCase()}</span><span style="font-size:0.82rem;opacity:0.85;">"${LETTER_NAME_SPOKEN[item.letter]}" ${LETTER_IPA_HINT[item.letter]}</span>
    </button>
  `).join('');
  modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal-card pop-anim" style="max-width:760px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;"><h2 style="font-size:1.6rem;">🔤 A–Z Letter Name Pronunciation Check</h2><button class="btn-bubble" id="btn-close-pron">⬅️ Back</button></div>
        <p style="margin:0 0 12px;font-weight:600;">Tap any letter below to verify its American English letter name pronunciation (especially Aa, Ee, Ff, and Rr):</p>
        <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;">${tilesHtml}</div>
      </div>
    </div>
  `;
  document.getElementById('btn-close-pron').onclick = () => openSettingsModal();
  modalRoot.querySelectorAll('[data-check-letter]').forEach(btn => {
    btn.onclick = () => { const letter = btn.getAttribute('data-check-letter'); btn.classList.remove('pop-anim'); void btn.offsetWidth; btn.classList.add('pop-anim'); useSpeech.speakLetterName(letter, true); };
  });
}

function openResumeDialog(gameMeta) {
  const modalRoot = document.getElementById('modal-root'); const saved = ProgressStore.getActiveSession(gameMeta.id);
  modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal-card pop-anim" style="text-align:center;max-width:460px;">
        <div style="font-size:3.2rem;margin-bottom:8px;">🎮</div><h2 style="font-size:1.75rem;margin-bottom:8px;">Continue where you left off?</h2>
        <p style="font-size:1.1rem;font-weight:600;margin-bottom:20px;">You are on question <strong>${saved.currentIndex + 1} of ${saved.questions.length}</strong> in <strong>${gameMeta.title}</strong>.</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;"><button class="btn-bubble btn-primary" id="btn-resume-yes">▶️ Resume</button><button class="btn-bubble btn-pink" id="btn-resume-restart">🔄 Start Over</button></div>
      </div>
    </div>
  `;
  document.getElementById('btn-resume-yes').onclick = () => { AudioEngine.playBubble(); modalRoot.innerHTML = ''; launchGameSession(gameMeta, saved); };
  document.getElementById('btn-resume-restart').onclick = () => { AudioEngine.playBubble(); modalRoot.innerHTML = ''; const fresh = ProgressStore.createSession(gameMeta.id, gameMeta.isVariable); launchGameSession(gameMeta, fresh); };
}

/********************************************************************
 * 12. SCREEN RENDERERS
 ********************************************************************/
function homeCatHasProgress(catId) {
  let d = {}; try { d = JSON.parse(localStorage.getItem('bimba_english_progress_v2') || '{}'); } catch (e) {}
  const ids = Object.keys(d.activeSessions || {}).concat(Object.keys(d.completedGames || {}));
  const match = {
    expressions: id => id.startsWith('exp'),
    greetings:   id => id.startsWith('grt'),
    alpha_num:   id => id.startsWith('alpha') || id.startsWith('num'),
    vocabulary:  id => id.startsWith('vocab:'),
    grammar:     id => !/^(exp|grt|alpha|num|vocab:)/.test(id)
  }[catId];
  return !!match && ids.some(match);
}

function renderHomeScreen() {
  const cardsHtml = HOME_CATEGORIES.map((cat, idx) => {
    const started = homeCatHasProgress(cat.id);
    return `
    <button class="category-banner" data-cat-id="${cat.id}" style="background:${cat.bg};animation-delay:${idx * 0.06}s;">
      <div class="cat-icon-box">${SVGs.catIcon(cat.iconIndex)}</div>
      <span class="cat-number">${cat.number}</span>
      <span class="cat-title">${cat.title}</span>
      
      <span class="cat-play" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 1.5v11l9-5.5z" fill="#fff"/></svg></span>
    </button>`;
  }).join('');
  const music = AudioEngine.state.musicEnabled, sfxOff = AudioEngine.state.sfxMuted;
  return `
    <section class="screen-enter home-wrap">
      <div class="home-topbar">
        
        <button class="chip chip-mint" id="btn-topbar-music" title="Toggle Background Music">${music ? '🎵 Music ON' : '🔇 Music OFF'}</button>
        <button class="chip chip-pink" id="btn-topbar-mute" title="Mute Voice & Sound Effects">${sfxOff ? '🔕 Sound OFF' : '🔊 Sound ON'}</button>
        <button class="chip chip-round" id="btn-home-settings" title="Settings" aria-label="Settings">⚙️</button>
      </div>
      <div class="home-header"><div class="home-header-card"><h1 class="home-title-main">Game Room</h1><div class="home-title-sub">BIMBA ENGLISH</div></div></div>
      <div class="home-category-list">${cardsHtml}</div>
      <div class="mascot-wrap">
        <div class="mascot-say" id="mascot-say" hidden></div>
        <button class="mascot-btn" id="btn-mascot" aria-label="Say hi to Bimba">
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="17" cy="10" r="5.5" fill="#9B7BFF" stroke="#2B2B30" stroke-width="2.2"/>
            <circle cx="47" cy="10" r="5.5" fill="#9B7BFF" stroke="#2B2B30" stroke-width="2.2"/>
            <ellipse cx="23" cy="57" rx="7" ry="4" fill="#9B7BFF" stroke="#2B2B30" stroke-width="2.2"/>
            <ellipse cx="41" cy="57" rx="7" ry="4" fill="#9B7BFF" stroke="#2B2B30" stroke-width="2.2"/>
            <circle cx="8" cy="40" r="5" fill="#9B7BFF" stroke="#2B2B30" stroke-width="2.2"/>
            <circle cx="56" cy="40" r="5" fill="#9B7BFF" stroke="#2B2B30" stroke-width="2.2"/>
            <rect x="11" y="12" width="42" height="43" rx="11" fill="#FFCF3F" stroke="#2B2B30" stroke-width="2.4"/>
            <ellipse cx="24" cy="31" rx="3" ry="4" fill="#2B2B30"/><ellipse cx="40" cy="31" rx="3" ry="4" fill="#2B2B30"/>
            <circle cx="25" cy="29.5" r="1.1" fill="#fff"/><circle cx="41" cy="29.5" r="1.1" fill="#fff"/>
            <ellipse cx="19" cy="40" rx="4" ry="2.6" fill="#FF8FB5"/><ellipse cx="45" cy="40" rx="4" ry="2.6" fill="#FF8FB5"/>
            <path d="M27.5 40q4.5 5 9 0" fill="none" stroke="#2B2B30" stroke-width="2.2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </section>
  `;
}

function renderCategoryScreen() {
  const cat = HOME_CATEGORIES.find(c => c.id === AppState.activeCategoryId) || HOME_CATEGORIES[0];

  if (cat.id === 'alpha_num') {
    const learnCards = [
      renderMenuRow({ index: 0, numberLabel: '1.', title: 'Learn Alphabet', subtitle: 'Interactive A–Z board with letter names & picture words!', icon: '🔤', dataAttr: 'data-alpha-action="learn_alphabet"' }),
      renderMenuRow({ index: 1, numberLabel: '2.', title: 'Learn Numbers', subtitle: 'Interactive numbers 0–100 with counting & spelling!', icon: '🔢', dataAttr: 'data-alpha-action="learn_numbers"' })
    ].join('');
    const gameSubMenus = [
      renderMenuRow({ index: 2, numberLabel: '1.', title: 'Games Alphabet', subtitle: '4 fun A–Z letter games (Match, Order, Missing, Picture)!', icon: '🅰️', dataAttr: 'data-alpha-action="games_alphabet"' }),
      renderMenuRow({ index: 3, numberLabel: '2.', title: 'Games Numbers', subtitle: '5 exciting number games (Count, Order, Word, Listen, Sequence)!', icon: '🔟', dataAttr: 'data-alpha-action="games_numbers"' })
    ].join('');
    return `
      <section class="screen-enter">
        ${renderTopBar({ title: `${cat.number} ${cat.title}` })}
        <div style="display:flex;gap:12px;justify-content:center;margin-bottom:18px;">
          <button class="btn-bubble ${AppState.categoryTab === 'learn' ? 'btn-primary' : ''}" id="tab-btn-learn">📖 Learn (2)</button>
          <button class="btn-bubble ${AppState.categoryTab === 'games' ? 'btn-pink' : ''}" id="tab-btn-games">🎮 Games (2)</button>
        </div>
        <div class="menu-list">${AppState.categoryTab === 'learn' ? learnCards : gameSubMenus}</div>
      </section>
    `;
  }

  if (cat.id === 'expressions' || cat.id === 'greetings') {
    const convList = cat.id === 'expressions' ? CONVERSATIONS_EXPRESSIONS : CONVERSATIONS_GREETINGS;
    const gamesList = GAMES_CATALOG[cat.id] || [];
    const learnGrid = convList.map((conv, idx) => renderMenuRow({ index: idx, numberLabel: `${conv.number}.`, title: conv.title, subtitle: `Leo & Mia • ${conv.lines.length} animated lines`, icon: conv.icon, dataAttr: `data-open-conv="${idx}"` })).join('');
    const gamesGrid = gamesList.map((g, idx) => renderMenuRow({ index: idx + 2, numberLabel: `${idx + 1}.`, title: g.title, subtitle: g.subtitle, icon: g.icon, dataAttr: `data-start-game="${g.id}"` })).join('');
    return `
      <section class="screen-enter">
        ${renderTopBar({ title: `${cat.number} ${cat.title}` })}
        <div style="display:flex;gap:12px;justify-content:center;margin-bottom:18px;">
          <button class="btn-bubble ${AppState.categoryTab === 'learn' ? 'btn-primary' : ''}" id="tab-btn-learn">💬 Learn (10 Conversations)</button>
          <button class="btn-bubble ${AppState.categoryTab === 'games' ? 'btn-pink' : ''}" id="tab-btn-games">🎮 Games (${gamesList.length})</button>
        </div>
        <div class="menu-list">${AppState.categoryTab === 'learn' ? learnGrid : gamesGrid}</div>
      </section>
    `;
  }

  const gamesList = GAMES_CATALOG[cat.id] || [];
  const gamesGrid = gamesList.map((g, idx) => renderCandyCard({ index: idx + 3, numberLabel: `${idx + 1}.`, title: g.title, subtitle: g.subtitle, icon: g.icon, gameId: g.id, dataAttr: `data-start-game="${g.id}"`, vocabLayout: true })).join('');
  return `<section class="screen-enter">${renderTopBar({ title: `${cat.number} ${cat.title}` })}<div class="colorful-grid vocab-menu-grid">${gamesGrid}</div></section>`;
}

function renderVocabThemesScreen() {
  const themes = window.VOCAB_THEME_ORDER.map(id => window.VOCAB_THEMES[id]);
  const cardsHtml = themes.map((t, idx) => {
    const themeIdx = idx % 8; const isLightText = themeIdx === 1 || themeIdx === 5;
    return `
      <div class="candy-card candy-theme-${themeIdx} ${isLightText ? 'text-light' : ''}" data-vocab-theme="${t.id}">
        <div class="candy-card-header">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;"><span class="candy-num-badge">${idx + 1}.</span></div>
          <div class="candy-icon-bubble">${t.icon}</div>
        </div>
        <div class="vocab-card-text"><div class="candy-card-title">${t.title}</div><div class="candy-card-sub">${t.words.length} Words</div></div>
      </div>
    `;
  }).join('');
  return `<section class="screen-enter">${renderTopBar({ title: '4. Vocabulary Words (35 Themes)' })}<div class="colorful-grid vocab-menu-grid">${cardsHtml}</div></section>`;
}

function renderVocabMenuScreen() {
  const t = window.VOCAB_THEMES[AppState.activeVocabTheme];
  const games = [
    { id: '1', title: 'Learn the Words', subtitle: 'Tap to listen & spell!', icon: '📖' }, { id: '2', title: 'Missing Letters', subtitle: 'Drag to spell the word.', icon: '🔤' }, { id: '3', title: 'Choose Correct Word', subtitle: 'Match word to picture.', icon: '🎯' }, { id: '4', title: 'Choose Correct Picture', subtitle: 'Match picture to word.', icon: '🖼️' }, { id: '5', title: 'Guess from the Clue', subtitle: 'Read the clue & guess.', icon: '💡' }, { id: '6', title: 'Build the Sentence', subtitle: 'Arrange words in order.', icon: '📝' }, { id: '7', title: 'True or False', subtitle: 'Is it correct?', icon: '⚖️' }, { id: '8', title: 'Fill in the Blanks', subtitle: 'Complete the short story.', icon: '🧩' }, { id: '9', title: 'Read & Answer', subtitle: 'Read a text & answer.', icon: '📚' }, { id: '10', title: 'Chat Time', subtitle: 'Listen & read the dialogue.', icon: '💬' }
  ];

  const cardsHtml = games.map((g, idx) => {
    let statusBadge = '';
    if(idx > 0) {
       const gameId = `vocab:${t.id}:${idx+1}`; const status = ProgressStore.getGameStatus(gameId); const completedInfo = ProgressStore.getCompletedInfo(gameId);
       if (status === 'in_progress') statusBadge = `<span class="status-badge status-progress">⏳ In progress</span>`;
       else if (status === 'completed') statusBadge = `<span class="status-badge status-completed">Completed ${'★'.repeat(completedInfo.stars)}</span>`;
    }
    const themeIdx = idx % 8; const isLightText = themeIdx === 1 || themeIdx === 5;
    return `
      <div class="candy-card candy-theme-${themeIdx} ${isLightText ? 'text-light' : ''}" data-start-vocab-game="${idx+1}">
        <div class="candy-card-header">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;"><span class="candy-num-badge">${idx+1}.</span>${statusBadge}</div>
          <div class="candy-icon-bubble">${g.icon}</div>
        </div>
        <div class="vocab-card-text"><div class="candy-card-title">${g.title}</div><div class="candy-card-sub">${g.subtitle}</div></div>
      </div>
    `;
  }).join('');
  return `<section class="screen-enter">${renderTopBar({ title: `Theme: ${t.icon} ${t.title}` })}<div class="colorful-grid vocab-menu-grid">${cardsHtml}</div></section>`;
}

function renderVocabLearnScreen() {
  const t = window.VOCAB_THEMES[AppState.activeVocabTheme];
  const tilesHtml = t.words.map((w, idx) => {
    const themeIdx = idx % 8; const isLight = themeIdx === 1 || themeIdx === 5;
    const lettersHtml = w.word.split('').map(ch => { if (ch === ' ') return `<span style="width:8px;"></span>`; return `<span class="letter-mini-pill" data-spell-letter="${ch.toUpperCase()}">${ch}</span>`; }).join('');
    return `
      <div class="alpha-tile candy-theme-${themeIdx}" data-vocab-learn-word="${w.word}" style="color:${isLight ? '#FFF' : '#1E293B'};padding:14px;">
        <div class="alpha-emoji" style="font-size:3.5rem;">${w.emoji}</div>
        <div class="alpha-letters" style="font-size:1.6rem; margin-bottom: 6px;">${w.word}</div>
        <div class="num-word-letters">${lettersHtml}</div>
      </div>
    `;
  }).join('');
  return `
    <section class="screen-enter">
      ${renderTopBar({ title: `Learn: ${t.title}` })}
      <div class="question-stage" style="margin-bottom:16px;text-align:center;padding:14px;">
        <strong>👆 Tap any picture</strong> to hear the word, or <strong>tap the small letter tiles</strong> to hear the letter!
      </div>
      <div class="alpha-grid" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">${tilesHtml}</div>
    </section>
  `;
}

function renderConversationPlayerScreen() {
  const conv = AppState.activeConvList[AppState.activeConvIndex] || AppState.activeConvList[0];
  const visibleLines = conv.lines.slice(0, AppState.convLineIndex + 1); const currentLine = conv.lines[AppState.convLineIndex] || conv.lines[0];
  const bubblesHtml = visibleLines.map((line, idx) => {
    const isLeo = line.speaker === 'Leo'; const isCurrent = idx === AppState.convLineIndex;
    return `
      <div class="chat-bubble ${isLeo ? 'chat-leo' : 'chat-mia'} ${isCurrent ? 'chat-active pop-anim' : ''}" data-speak-line="${idx}">
        <div class="chat-meta"><span class="chat-name">${line.speaker}</span><span class="chat-hear">🔈 Tap to hear</span></div>
        <div class="chat-text">${line.text}</div>
      </div>
    `;
  }).join('');
  return `
    <section class="screen-enter">
      ${renderTopBar({ title: '' })}
      <div class="conv-card">
        <div class="conv-head">
                        <div class="conv-head-text">
            <div class="conv-eyebrow">Conversation ${AppState.activeConvIndex + 1} of ${AppState.activeConvList.length}</div>
            <div class="conv-title">${conv.title}</div>
          </div>
          <div class="conv-count">${visibleLines.length} / ${conv.lines.length} Lines</div>
        </div>
        <div class="conv-chars">
          <div class="char-actor ${currentLine.speaker === 'Leo' ? 'speaking' : ''}">${SVGs.charLeo()}<span class="conv-tag" style="background:#6EC6FF;">Leo</span></div>
          <div class="char-actor ${currentLine.speaker === 'Mia' ? 'speaking' : ''}">${SVGs.charMia()}<span class="conv-tag" style="background:#FF85B3;">Mia</span></div>
        </div>
        <div class="chat-list">${bubblesHtml}</div>
        <div class="conv-actions">
          <button class="btn-bubble btn-primary" id="btn-conv-play">${AppState.convLineIndex < conv.lines.length - 1 ? '▶ Play Next Line' : '🔊 Play All Lines'}</button>
          <button class="btn-bubble btn-yellow" id="btn-conv-replay">🔄 Replay</button>
          <button class="btn-bubble btn-purple" id="btn-conv-next">⏭ Next Conversation</button>
        </div>
      </div>
    </section>
  `;
}

function renderLearnAlphabetScreen() {
  const tilesHtml = ALPHABET_DATA.map((item, idx) => {
    const themeIdx = idx % 8; const isLight = themeIdx === 1 || themeIdx === 5;
    return `<div class="alpha-tile candy-theme-${themeIdx}" data-alpha-letter="${item.letter}" data-alpha-word="${item.word}" style="color:${isLight ? '#FFF' : '#1E293B'};"><div class="alpha-letters">${item.letter}${item.letter.toLowerCase()}</div><div class="alpha-emoji">${item.emoji}</div><div class="alpha-word">${item.word}</div></div>`;
  }).join('');
  return `
    <section class="screen-enter">
      ${renderTopBar({ title: '1. Learn Alphabet (Aa–Zz)' })}
      <div class="question-stage" style="margin-bottom:16px;text-align:center;padding:14px;"><strong>👆 Tap any letter tile</strong> to hear its exact English letter name and picture word!</div>
      <div class="alpha-grid">${tilesHtml}</div>
    </section>
  `;
}

function renderLearnNumbersScreen() {
  const tilesHtml = NUMBERS_DATA.map((item, idx) => {
    const themeIdx = idx % 8; const isLight = themeIdx === 1 || themeIdx === 5; let objectsDisplay = '';
    if (item.num === 0) objectsDisplay = '⭕ (empty)';
    else if (item.num <= 10) objectsDisplay = Array(item.num).fill(item.emoji).join(' ');
    else if (item.num <= 20) objectsDisplay = `🔟 + ${Array(item.num - 10).fill(item.emoji).join('')}`;
    else objectsDisplay = `${Array(item.num / 10).fill('🔟').join(' ')}`;
    const lettersHtml = item.word.split('').map(ch => { if (ch === ' ') return `<span style="width:8px;"></span>`; return `<span class="letter-mini-pill" data-spell-letter="${ch.toUpperCase()}">${ch}</span>`; }).join('');
    return `
      <div class="alpha-tile candy-theme-${themeIdx}" data-num-tile="${item.num}" style="color:${isLight ? '#FFF' : '#1E293B'};padding:14px;">
        <div class="alpha-letters" style="font-size:2.4rem;">${item.num}</div>
        <div style="font-size:1.25rem;min-height:42px;margin:6px 0;line-height:1.25;">${objectsDisplay}</div>
        <div class="num-word-letters">${lettersHtml}</div>
        ${item.num >= 1 && item.num <= 12 ? `<div style="margin-top:10px;"><button class="btn-bubble btn-yellow" data-count-with-me="${item.num}" style="min-height:40px;padding:4px 12px;font-size:0.9rem;">🧮 Count with me!</button></div>` : ''}
      </div>
    `;
  }).join('');
  let countBanner = '';
  if (AppState.countingNumber !== null) {
    const target = NUMBERS_DATA.find(n => n.num === AppState.countingNumber) || NUMBERS_DATA[1]; const items = [];
    for (let c = 1; c <= target.num; c++) { const active = c <= AppState.countingStep; items.push(`<span class="pill-badge ${active ? 'pop-anim' : ''}" style="background:${active ? '#86EFAC' : '#F1F5F9'};opacity:${active ? 1 : 0.45};font-size:1.2rem;">${target.emoji} ${c}</span>`); }
    countBanner = `<div class="question-stage pop-anim" style="margin-bottom:16px;text-align:center;background:#FFFBEB;"><div style="font-family:'Fredoka';font-size:1.35rem;margin-bottom:8px;">🧮 Counting to ${target.num} (${target.word}) with Teacher!</div><div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">${items.join('')}</div></div>`;
  }
  return `
    <section class="screen-enter">
      ${renderTopBar({ title: '2. Learn Numbers (0 – 100)' })}
      <div class="question-stage" style="margin-bottom:16px;text-align:center;padding:14px;"><strong>👆 Tap any number card</strong> to hear the number, <strong>tap the small letter tiles</strong> to spell the word, or press <strong>"Count with me!"</strong></div>
      ${countBanner}
      <div class="alpha-grid" style="grid-template-columns: repeat(auto-fill, minmax(195px, 1fr));">${tilesHtml}</div>
    </section>
  `;
}

function renderSubGamesMenuScreen(mode) {
  const isAlpha = mode === 'alpha'; const list = isAlpha ? GAMES_CATALOG.alpha_games : GAMES_CATALOG.num_games;
  const cardsHtml = list.map((g, idx) => renderCandyCard({ index: idx, numberLabel: `${idx + 1}.`, title: g.title, subtitle: g.subtitle, icon: g.icon, gameId: g.id, dataAttr: `data-start-game="${g.id}"`, isBigCenter: true })).join('');
  return `<section class="screen-enter">${renderTopBar({ title: isAlpha ? '1. Games Alphabet (4 Games)' : '2. Games Numbers (5 Games)' })}<div class="colorful-grid center-grid">${cardsHtml}</div></section>`;
}

function renderGamePlayScreen() {
  const session = AppState.activeSession; const gameMeta = AppState.activeGameMeta;
  const q = session.questions[session.currentIndex]; const progressLabel = `${session.currentIndex + 1} / ${session.questions.length}`;

  if (q.type === 'vocab_dialogue') {
    const themeTitle = q.topicTitle || String(gameMeta.title || '').split(': ')[0];
    const dlgBubbles = q.chatLines.map((line, idx) => {
      const isLeo = line.speaker === 'Leo';
      return `
      <div class="chat-bubble ${isLeo ? 'chat-leo' : 'chat-mia'}" data-speak-chat-line="${idx}">
        <div class="chat-meta"><span class="chat-name">${line.speaker}</span><span class="chat-hear">🔈 Tap to hear</span></div>
        <div class="chat-text">${line.text}</div>
      </div>`;
    }).join('');
    return `
    <section class="screen-enter">
      ${renderTopBar({ title: '' })}
      <div class="conv-card">
        <div class="conv-head">
          <div class="conv-head-text">
            <div class="conv-eyebrow">Chat Time</div>
            <div class="conv-title">${themeTitle}</div>
          </div>
          <div class="conv-count">${q.chatLines.length} / ${q.chatLines.length} Lines</div>
        </div>
        <div class="conv-chars">
          <div class="char-actor" id="chat-actor-Leo">${SVGs.charLeo()}<span class="conv-tag" style="background:#6EC6FF;">Leo</span></div>
          <div class="char-actor" id="chat-actor-Mia">${SVGs.charMia()}<span class="conv-tag" style="background:#FF85B3;">Mia</span></div>
        </div>
        <div class="chat-list">${dlgBubbles}</div>
        <div class="conv-actions">
          <button class="btn-bubble btn-primary" id="btn-read-text">🔊 Play All Lines</button>
          <button class="btn-bubble btn-yellow" id="btn-dialogue-done">✅ I read it!</button>
        </div>
      </div>
    </section>`;
  }

  let interactionHtml = '';
  if (q.type === 'mcq' || q.type === 'vocab_reading' || q.type === 'vocab_chat' || q.type === 'vocab_dialogue') {
    const letters = ['A', 'B', 'C', 'D'];
    let prefixHtml = '';
    if (q.type === 'vocab_reading') {
       prefixHtml = `<div style="background:#F1F5F9; border: 3px solid #CBD5E1; border-radius: 16px; padding: 16px; margin-bottom: 18px; font-size: 1.15rem; line-height: 1.5; max-height: 280px; overflow-y: auto;"><button class="btn-bubble btn-blue" id="btn-read-text" style="float:right; margin-left: 10px;">🔊 Read</button>${q.readingText}<div style="clear:both;"></div></div>`;
    } else if (q.type === 'vocab_chat' || q.type === 'vocab_dialogue') {
       prefixHtml = `<div class="conv-stage" style="margin-bottom:18px; padding:12px;"><button class="btn-bubble btn-blue" id="btn-read-text" style="width:100%; margin-bottom:12px;">🔊 Listen to Chat</button><div style="display:flex; flex-direction:column; gap:8px; max-height:55vh; overflow-y:auto; padding:4px;">${q.chatLines.map((l, lIdx) => `<div style="background:${l.speaker==='Leo'?'#FFF':'#FEF08A'}; border: 2px solid #1E293B; border-radius:12px; padding: 8px 12px; align-self: ${l.speaker==='Leo'?'flex-start':'flex-end'}; max-width: 85%; cursor: pointer; transition: transform 0.1s;" data-speak-chat-line="${lIdx}" onmousedown="this.style.transform='scale(0.98)'" onmouseup="this.style.transform='scale(1)'" onmouseleave="this.style.transform='scale(1)'"><strong>${l.speaker}:</strong> ${l.text}</div>`).join('')}</div></div>`;
    }
    if (q.type === 'vocab_dialogue') {
      interactionHtml = `${prefixHtml}<div style="display:flex;justify-content:center;margin-top:14px;"><button class="btn-bubble btn-primary" id="btn-dialogue-done">✅ I read it!</button></div>`;
    } else interactionHtml = `
      ${prefixHtml}
      <div class="options-grid">
        ${q.options.map((opt, idx) => `
          <button class="option-btn" data-mcq-index="${idx}">
            <span class="option-letter-badge">${letters[idx]}</span><span style="font-size:${opt.match(/[\uD83C-\uDBFF\uDC00-\uDFFF]+/) ? '3rem' : 'inherit'};">${opt}</span>
          </button>
        `).join('')}
      </div>
    `;
  } else if (q.type === 'dnd' || q.type === 'vocab_story') {
    const isMissingLetters = q.categoryMode === 'vocab_missing_letters'; const isStory = q.type === 'vocab_story';
    const bankHtml = AppState.dndBank.map((val, bIdx) => `<button class="dnd-tile" draggable="true" data-bank-index="${bIdx}">${val}</button>`).join('');

    if (isStory) {
       const storySentencesHtml = q.sentences.map((s, sIdx) => {
          const val = AppState.dndSlots[sIdx]; const parts = s.text.split('_');
          return `<div style="display:flex; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom: 12px; font-size: 1.2rem; background: #F8FAFC; padding: 10px; border-radius: 12px; border: 2px solid #E2E8F0;"><span style="font-size: 1.8rem;">${s.hintPic}</span><span>${parts[0]}</span><div class="dnd-slot ${val !== null ? 'filled' : ''}" data-slot-index="${sIdx}" style="min-width:100px; min-height:45px; display:inline-flex;">${val !== null ? val : ''}</div><span>${parts[1] || ''}</span></div>`;
       }).join('');
       interactionHtml = `<div><div class="q-label">Tile bank</div><div class="dnd-bank-row" id="dnd-bank-zone">${bankHtml}</div><div style="margin-top:16px;">${storySentencesHtml}</div><div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:14px;"><button class="btn-bubble btn-primary" id="btn-dnd-check">✅ Check Story</button><button class="btn-bubble btn-yellow" id="btn-dnd-clear">🗑️ Clear All</button></div></div>`;
    } else {
       const slotsHtml = AppState.dndSlots.map((val, sIdx) => {
         const prefill = isMissingLetters && q.hintSlots ? q.hintSlots[sIdx] : null;
         if (prefill && val === prefill) return `<div class="dnd-slot filled" style="background:#FFF3B0;" data-is-hint="true">${val}</div>`;
         return `<div class="dnd-slot ${val !== null ? 'filled' : ''}" data-slot-index="${sIdx}">${val !== null ? val : (isMissingLetters ? '' : `<span style="opacity:0.35;">${sIdx + 1}</span>`)}</div>`;
       }).join('');
       interactionHtml = `<div>
         <div class="q-zone"><div class="dnd-slots-row" id="dnd-slots-zone">${slotsHtml}</div></div>
         <div class="q-label" style="margin-top:20px;">Tile bank</div><div class="dnd-bank-row" id="dnd-bank-zone">${bankHtml}</div>
         <div class="q-actions"><button class="btn-bubble" id="btn-dnd-clear">🔄 Clear</button><button class="btn-bubble" id="btn-dnd-check">✅ Check Answer</button></div></div>`;
    }
  }

  const picMatch = String(q.prompt || '').match(/^\s*<div style="font-size:\s*[34](?:\.\d)?rem;[^"]*">([^<]+)<\/div>/);
  let qTextHtml = (picMatch ? String(q.prompt).slice(picMatch[0].length) : String(q.prompt || '')).replace(/<\/?div[^>]*>/g, '').trim();
  if (picMatch && !qTextHtml) qTextHtml = q.speakPrompt || '';
  const qPicHtml = picMatch ? `<span class="q-emoji">${picMatch[1]}</span>` : SVGs.mascotBuddy(AppState.mascotMood);
  const hintHtml = AppState.hintRevealed ? `<div class="feedback-banner pop-anim" style="background:#E0F2FE;color:#0369A1;">💡 Hint: ${q.hint}</div>` : '';
  const feedbackHtml = AppState.feedbackBanner ? `<div class="feedback-banner ${AppState.feedbackBanner.type} pop-anim">${AppState.feedbackBanner.text}</div>` : '';

  return `
    <section class="screen-enter">
      ${renderTopBar({ title: gameMeta.title, progressText: progressLabel })}
      <div class="question-stage" id="question-card-box">
        <div class="q-top">
          <button class="btn-bubble btn-blue" id="btn-question-listen">🔊 Listen</button>
          <button class="btn-bubble btn-yellow" id="btn-question-hint">💡 Hint</button>
        </div>
        <div class="q-head">
          <div class="q-pic">${qPicHtml}</div>
          ${qTextHtml ? `<div class="question-text q-text">${qTextHtml}</div>` : ''}
        </div>
        ${interactionHtml} ${hintHtml} ${feedbackHtml}
      </div>
    </section>
  `;
}

function renderGameResultScreen() {
  const session = AppState.activeSession; const gameMeta = AppState.activeGameMeta;
  const stars = session.hintsUsed > 3 ? 2 : 3; const praiseLine = getResultPraise(stars);
  return `
    <section class="screen-enter">
      ${renderTopBar({ title: `${gameMeta.title} – Finished!` })}
      <div class="question-stage" style="text-align:center;padding:32px 20px;">
        <div style="font-size:3.8rem;letter-spacing:8px;margin-bottom:10px;" class="pop-anim">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
        <h2 style="font-size:2.2rem;color:#FF5C8A;margin-bottom:8px;">${praiseLine}</h2>
        <p style="font-size:1.25rem;font-weight:700;margin-bottom:24px;">Score: ${session.score} / ${session.questions.length * 10}</p>
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;"><button class="btn-bubble btn-primary" id="btn-result-again">🔄 Play Again</button><button class="btn-bubble btn-yellow" id="btn-result-menu">📋 Back to Menu</button></div>
      </div>
    </section>
  `;
}

/********************************************************************
 * 13. GAMEPLAY CONTROLLERS & HOOKS
 ********************************************************************/
function findGameMetaById(gameId) {
  if (!gameId) return null;
  if (gameId.startsWith('vocab:')) {
     const parts = gameId.split(':'); const theme = window.VOCAB_THEMES[parts[1]] || window.VOCAB_THEMES['intro_myself']; const gameNum = parts[2];
     const titles = ['','Learn the Words','Missing Letters','Choose Correct Word','Choose Correct Picture','Guess from the Clue','Build the Sentence','True or False','Fill in the Blanks','Read & Answer','Chat Time'];
     return { id: gameId, title: `${theme.title}: ${titles[gameNum]}`, isVariable: true };
  }
  for (const key of Object.keys(GAMES_CATALOG)) { const found = GAMES_CATALOG[key].find(g => g.id === gameId); if (found) return found; } return null;
}

function requestStartGame(gameId) {
  const meta = findGameMetaById(gameId); if (!meta) return;
  const existing = ProgressStore.getActiveSession(gameId);
  if (existing && existing.currentIndex > 0 && existing.currentIndex < existing.questions.length) openResumeDialog(meta);
  else { const session = ProgressStore.createSession(gameId, meta.isVariable); launchGameSession(meta, session); }
}

function prepareQuestionState(session) {
  const q = session.questions[session.currentIndex];
  AppState.hintRevealed = false; AppState.feedbackBanner = null; AppState.mascotMood = 'happy';
  if (q && (q.type === 'dnd' || q.type === 'vocab_story')) {
    AppState.dndSlots = Array(q.targetSlots.length).fill(null);
    if (q.categoryMode === 'vocab_missing_letters' && q.hintSlots) {
      for(let i=0; i<q.hintSlots.length; i++) { if (q.hintSlots[i]) AppState.dndSlots[i] = q.hintSlots[i]; }
    }
    AppState.dndBank = [...q.bankTiles];
  } else { AppState.dndSlots = []; AppState.dndBank = []; }
}

function launchGameSession(gameMeta, session) {
  AppState.activeGameMeta = gameMeta; AppState.activeSession = session; AppState.lastAutoReadQuestionKey = null;
  prepareQuestionState(session);
  saveNavState({ activeGameId: gameMeta.id });
  navigate({ screen: 'game_play' });
}

function maybeAutoReadCurrentQuestion() {
  if (AppState.screen !== 'game_play' || !AppState.activeSession) return;
  const s = AppState.activeSession; const q = s.questions[s.currentIndex]; if (!q) return;
  const key = `${s.gameId}_${s.currentIndex}_${q.id}`; if (AppState.lastAutoReadQuestionKey === key) return; AppState.lastAutoReadQuestionKey = key;
  setTimeout(() => { if (AppState.screen === 'game_play' && AppState.lastAutoReadQuestionKey === key) useSpeech.speakQuestion(q.speakPrompt || q.prompt, true); }, 310);
}

function advanceToNextQuestion() {
  const s = AppState.activeSession; if (!s) return;
  if (s.currentIndex + 1 < s.questions.length) {
    s.currentIndex++; ProgressStore.updateSessionProgress(s.gameId, s.currentIndex, s.score, s.hintsUsed); prepareQuestionState(s); renderApp();
  } else {
    const stars = s.hintsUsed > 3 ? 2 : 3;
    saveNavState({
      activeGameId: s.gameId,
      lastFinishedSession: {
        gameId: s.gameId,
        score: s.score,
        hintsUsed: s.hintsUsed,
        questions: new Array(s.questions.length).fill({})
      }
    });
    ProgressStore.completeSession(s.gameId, stars, s.score);
    triggerConfetti(); AudioEngine.playCorrect(); navigate({ screen: 'game_result' });
    setTimeout(() => { useSpeech.speakSentence(getResultPraise(stars), true); }, 320);
  }
}

function handleMcqChoice(choiceIndex, btnEl) {
  if (AppState.isProcessing) return;
  AppState.isProcessing = true;
  const s = AppState.activeSession; const q = s.questions[s.currentIndex]; const chosenText = q.options[choiceIndex]; const isCorrect = chosenText === q.answer;
  if (isCorrect) {
    btnEl.classList.add('correct', 'pop-anim'); const praise = getNextPraise(); AppState.mascotMood = 'cheer';
    AppState.feedbackBanner = { type: 'good', text: `✅ ${praise}` }; s.score += 10;
    AudioEngine.playCorrect(); renderApp();
    setTimeout(() => { if(q.isLetterQuestion) useSpeech.speakLetterAndWord(q.targetLetter, chosenText, true); else if(q.spokenAnswer) useSpeech.speakSentence(q.spokenAnswer, true); else useSpeech.speakSentence(praise, true); }, 150);
    setTimeout(() => { AppState.isProcessing = false; advanceToNextQuestion(); }, 1600);
  } else {
    btnEl.classList.add('wrong', 'shake-anim'); const retry = getNextTryAgain(); AppState.mascotMood = 'happy';
    AppState.feedbackBanner = { type: 'retry', text: `❌ ${retry}` };
    AudioEngine.playWrong(); renderApp(); useSpeech.speakSentence(retry, true);
    setTimeout(() => { btnEl.classList.remove('wrong', 'shake-anim'); AppState.feedbackBanner = null; AppState.isProcessing = false; renderApp(); }, 1400);
  }
}

function checkDndIfComplete() {
  const s = AppState.activeSession; if (!s) return;
  const q = s.questions[s.currentIndex];
  const isComplete = AppState.dndSlots.every((val, i) => {
    if(q.categoryMode === 'vocab_missing_letters' && q.hintSlots && q.hintSlots[i]) return true;
    return val !== null;
  });
  if (isComplete) {
    setTimeout(handleDndCheck, 150);
  }
}

function handleDndCheck() {
  if (AppState.isProcessing) return;
  const s = AppState.activeSession; const q = s.questions[s.currentIndex];
  const isComplete = AppState.dndSlots.every((val, i) => {
    if(q.categoryMode === 'vocab_missing_letters' && q.hintSlots && q.hintSlots[i]) return true;
    return val !== null;
  });
  if (!isComplete) { AudioEngine.playWrong(); AppState.feedbackBanner = { type: 'retry', text: `❌ Please fill all slots first!` }; renderApp(); setTimeout(() => { AppState.feedbackBanner = null; renderApp(); }, 1500); return; }

  let isCorrect = false;
  if (q.categoryMode === 'alphabet_spell') { const formed = AppState.dndSlots.join('').toLowerCase(); isCorrect = formed === q.wholeWord.toLowerCase(); }
  else if (q.categoryMode === 'alphabet_order' || q.categoryMode === 'number_order' || q.categoryMode === 'vocab_grammar' || q.categoryMode === 'vocab_sentence' || q.type === 'vocab_story' || q.categoryMode === 'vocab_missing_letters') {
    isCorrect = AppState.dndSlots.every((val, idx) => val === q.targetSlots[idx]);
  } else {
    isCorrect = AppState.dndSlots.every((val, idx) => val === q.targetSlots[idx]);
  }

  if (isCorrect) {
    AppState.isProcessing = true;
    const praise = getNextPraise(); AppState.mascotMood = 'cheer'; AppState.feedbackBanner = { type: 'good', text: `✅ ${praise}` }; s.score += 10;
    AudioEngine.playCorrect(); renderApp();
    setTimeout(() => { if (q.spokenAnswer) useSpeech.speakSentence(q.spokenAnswer, true); else useSpeech.speakSentence(praise, true); }, 150);
    setTimeout(() => { AppState.isProcessing = false; advanceToNextQuestion(); }, 1600);
  } else {
    AppState.isProcessing = true;
    const retry = getNextTryAgain(); AppState.mascotMood = 'happy'; AppState.feedbackBanner = { type: 'retry', text: `❌ ${retry}` };
    AudioEngine.playWrong(); renderApp(); useSpeech.speakSentence(retry, true);
    setTimeout(() => { AppState.feedbackBanner = null; AppState.isProcessing = false; renderApp(); }, 1600);
  }
}

function attachDndDragEvents(container) {
  if (!container) return; let draggedBankIndex = null; let draggedSlotIndex = null;
  container.querySelectorAll('.dnd-tile').forEach(tile => {
    tile.addEventListener('dragstart', e => {
      AudioEngine.playBubble(); draggedBankIndex = e.target.getAttribute('data-bank-index'); draggedSlotIndex = null;
      e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', draggedBankIndex); setTimeout(() => e.target.style.opacity = '0.4', 0);
    });
    tile.addEventListener('dragend', e => { e.target.style.opacity = '1'; });
  });
  container.querySelectorAll('.dnd-slot.filled').forEach(slot => {
    if(slot.getAttribute('data-is-hint') === 'true' || slot.style.background === 'rgb(255, 243, 176)') return;
    slot.setAttribute('draggable', 'true');
    slot.addEventListener('dragstart', e => {
      AudioEngine.playBubble(); draggedSlotIndex = e.target.getAttribute('data-slot-index'); draggedBankIndex = null;
      e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', draggedSlotIndex); setTimeout(() => e.target.style.opacity = '0.4', 0);
    });
    slot.addEventListener('dragend', e => { e.target.style.opacity = '1'; });
  });

  const slotsZone = container.querySelector('#dnd-slots-zone');
  if (slotsZone) {
    slotsZone.addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; });
    slotsZone.addEventListener('drop', e => {
      e.preventDefault(); const targetSlot = e.target.closest('.dnd-slot'); if (!targetSlot) return;
      const targetIndex = targetSlot.getAttribute('data-slot-index'); if (targetIndex === null) return;
      const q = AppState.activeSession.questions[AppState.activeSession.currentIndex];
      if(q.categoryMode === 'vocab_missing_letters' && q.hintSlots && q.hintSlots[targetIndex]) return; 

      AudioEngine.playPop();
      if (draggedBankIndex !== null) {
        const val = AppState.dndBank[draggedBankIndex]; const existing = AppState.dndSlots[targetIndex];
        AppState.dndSlots[targetIndex] = val; AppState.dndBank.splice(draggedBankIndex, 1);
        if (existing !== null) AppState.dndBank.push(existing); renderApp(); checkDndIfComplete();
      } else if (draggedSlotIndex !== null && draggedSlotIndex !== targetIndex) {
        const val = AppState.dndSlots[draggedSlotIndex]; const existing = AppState.dndSlots[targetIndex];
        AppState.dndSlots[targetIndex] = val; AppState.dndSlots[draggedSlotIndex] = existing; renderApp(); checkDndIfComplete();
      }
    });
  }
  
  const storyZone = container.querySelector('div[style*="margin-top:16px"]');
  if (storyZone && AppState.activeSession.questions[AppState.activeSession.currentIndex].type === 'vocab_story') {
    storyZone.addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; });
    storyZone.addEventListener('drop', e => {
      e.preventDefault(); const targetSlot = e.target.closest('.dnd-slot'); if (!targetSlot) return;
      const targetIndex = targetSlot.getAttribute('data-slot-index'); if (targetIndex === null) return;
      AudioEngine.playPop();
      if (draggedBankIndex !== null) {
        const val = AppState.dndBank[draggedBankIndex]; const existing = AppState.dndSlots[targetIndex];
        AppState.dndSlots[targetIndex] = val; AppState.dndBank.splice(draggedBankIndex, 1);
        if (existing !== null) AppState.dndBank.push(existing); renderApp(); checkDndIfComplete();
      } else if (draggedSlotIndex !== null && draggedSlotIndex !== targetIndex) {
        const val = AppState.dndSlots[draggedSlotIndex]; const existing = AppState.dndSlots[targetIndex];
        AppState.dndSlots[targetIndex] = val; AppState.dndSlots[draggedSlotIndex] = existing; renderApp(); checkDndIfComplete();
      }
    });
  }

  const bankZone = container.querySelector('#dnd-bank-zone');
  if (bankZone) {
    bankZone.addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; });
    bankZone.addEventListener('drop', e => {
      e.preventDefault();
      if (draggedSlotIndex !== null) { AudioEngine.playPop(); const val = AppState.dndSlots[draggedSlotIndex]; AppState.dndSlots[draggedSlotIndex] = null; AppState.dndBank.push(val); renderApp(); }
    });
  }
}

/********************************************************************
 * 14. MAIN RENDER PIPELINE & EVENT DELEGATION
 ********************************************************************/
function renderApp() {
  const app = document.getElementById('app'); let html = '';
  if (AppState.screen === 'home') html = renderHomeScreen();
  else if (AppState.screen === 'category') html = renderCategoryScreen();
  else if (AppState.screen === 'vocab_themes') html = renderVocabThemesScreen();
  else if (AppState.screen === 'vocab_menu') html = renderVocabMenuScreen();
  else if (AppState.screen === 'vocab_learn') html = renderVocabLearnScreen();
  else if (AppState.screen === 'alpha_learn') html = renderLearnAlphabetScreen();
  else if (AppState.screen === 'num_learn') html = renderLearnNumbersScreen();
  else if (AppState.screen === 'alpha_games_menu') html = renderSubGamesMenuScreen('alpha');
  else if (AppState.screen === 'num_games_menu') html = renderSubGamesMenuScreen('num');
  else if (AppState.screen === 'conv_player') html = renderConversationPlayerScreen();
  else if (AppState.screen === 'game_play') html = renderGamePlayScreen();
  else if (AppState.screen === 'game_result') html = renderGameResultScreen();
  app.innerHTML = html; attachGlobalEvents(app); maybeAutoReadCurrentQuestion();
}

function navigateBackFromGame() {
  const gid = (AppState.activeGameMeta && AppState.activeGameMeta.id) || (AppState.activeSession && AppState.activeSession.gameId) || '';
  if (gid.startsWith('vocab:')) {
    AppState.activeVocabTheme = gid.split(':')[1] || AppState.activeVocabTheme || 'intro_myself';
    navigate({ screen: 'vocab_menu' });
  } else if (gid.startsWith('alpha_')) {
    navigate({ screen: 'alpha_games_menu' });
  } else if (gid.startsWith('num_')) {
    navigate({ screen: 'num_games_menu' });
  } else if (gid.startsWith('exp_')) {
    navigate({ screen: 'category', activeCategoryId: 'expressions', categoryTab: 'games' });
  } else if (gid.startsWith('grt_')) {
    navigate({ screen: 'category', activeCategoryId: 'greetings', categoryTab: 'games' });
  } else {
    navigate({ screen: 'category', activeCategoryId: 'grammar', categoryTab: 'learn' });
  }
}

function attachGlobalEvents(container) {
  if (!window._isGlobalClickAttached) {
    window._isGlobalClickAttached = true;
    const clickHandlers = {
      'btn-topbar-home': () => { AudioEngine.playBubble(); navigate({ screen: 'home' }); },
      'btn-topbar-back': () => {
        AudioEngine.playBubble();
        if (AppState.screen === 'game_play' || AppState.screen === 'game_result') {
          navigateBackFromGame();
        }
        else if (AppState.screen === 'conv_player') { navigate({ screen: 'category', activeCategoryId: AppState.activeCategoryId || 'expressions', categoryTab: 'learn' }); }
        else if (AppState.screen === 'vocab_learn') { navigate({ screen: 'vocab_menu' }); }
        else if (AppState.screen === 'vocab_menu') { navigate({ screen: 'vocab_themes' }); }
        else if (AppState.screen === 'vocab_themes') { navigate({ screen: 'home' }); }
        else if (AppState.screen === 'alpha_learn' || AppState.screen === 'num_learn') { navigate({ screen: 'category', activeCategoryId: 'alpha_num', categoryTab: 'learn' }); }
        else if (AppState.screen === 'alpha_games_menu' || AppState.screen === 'num_games_menu') { navigate({ screen: 'category', activeCategoryId: 'alpha_num', categoryTab: 'games' }); }
        else { navigate({ screen: 'home' }); }
      },
      'btn-topbar-music': () => { AudioEngine.playBubble(); AudioEngine.toggleMusic(); renderApp(); },
      'btn-topbar-mute': () => { AudioEngine.playBubble(); AudioEngine.toggleMute(); renderApp(); },
    'btn-home-settings': () => openSettingsModal(),
    'btn-mascot': () => {
      AudioEngine.playBubble();
      const b = document.getElementById('btn-mascot'), s = document.getElementById('mascot-say');
      if (b) { b.classList.remove('hop'); void b.offsetWidth; b.classList.add('hop'); }
      if (s) { const lines = ["Hi! Let's play!", "Pick a game!", "You can do it!", "Let's learn English!"]; s.textContent = lines[Math.floor(Math.random() * lines.length)]; s.hidden = false; clearTimeout(window._mascotT); window._mascotT = setTimeout(() => { s.hidden = true; }, 1800); }
    },
      'tab-btn-learn': () => { AudioEngine.playBubble(); navigate({ categoryTab: 'learn' }); },
      'tab-btn-games': () => { AudioEngine.playBubble(); navigate({ categoryTab: 'games' }); },
    'btn-conv-play': () => {
      AudioEngine.playBubble(); const conv = AppState.activeConvList[AppState.activeConvIndex];
      if (AppState.convLineIndex < conv.lines.length - 1) {
        AppState.convLineIndex++; renderApp();
        useSpeech.speakSentence(conv.lines[AppState.convLineIndex].text, true, conv.lines[AppState.convLineIndex].speaker);
      } else {
        AppState.convLineIndex = conv.lines.length - 1; renderApp();
        useSpeech.speakQueue(conv.lines, { interrupt: true });
      }
    },
    'btn-conv-replay': () => { AudioEngine.playBubble(); AppState.convLineIndex = 0; renderApp(); useSpeech.speakSentence(AppState.activeConvList[AppState.activeConvIndex].lines[0].text, true, AppState.activeConvList[AppState.activeConvIndex].lines[0].speaker); },
      'btn-conv-next': () => {
        AudioEngine.playBubble(); AppState.activeConvIndex = (AppState.activeConvIndex + 1) % AppState.activeConvList.length; AppState.convLineIndex = 0;
        saveNavState();
        renderApp();
        useSpeech.speakSentence(AppState.activeConvList[AppState.activeConvIndex].lines[0].text, true, AppState.activeConvList[AppState.activeConvIndex].lines[0].speaker);
      },
    'btn-question-listen': () => {
      AudioEngine.playBubble(); const q = AppState.activeSession.questions[AppState.activeSession.currentIndex];
      useSpeech.speakQuestion(q.speakPrompt || q.prompt, true);
    },
    'btn-question-hint': () => {
      AudioEngine.playBubble(); AppState.hintRevealed = true; AppState.activeSession.hintsUsed++; renderApp();
      const q = AppState.activeSession.questions[AppState.activeSession.currentIndex]; useSpeech.speakSentence(q.hint, true);
    },
    'btn-dnd-check': () => handleDndCheck(),
    'btn-dnd-clear': () => { AudioEngine.playBubble(); prepareQuestionState(AppState.activeSession); renderApp(); },
    'btn-result-again': () => requestStartGame(AppState.activeSession.gameId),
      'btn-result-menu': () => {
        AudioEngine.playBubble();
        navigateBackFromGame();
      },
    'btn-dialogue-done': () => {
      AudioEngine.playBubble(); const s = AppState.activeSession; if (!s) return;
      s.score = s.questions.length * 10; advanceToNextQuestion();
    },
    'btn-read-text': () => {
      AudioEngine.playBubble(); const q = AppState.activeSession.questions[AppState.activeSession.currentIndex];
      if(q.readingText) useSpeech.speakSentence(q.readingText, true);
      else if(q.chatLines) useSpeech.speakQueue(q.chatLines, { interrupt: true });
    }
  };

  container.addEventListener('click', e => {
    const btn = e.target.closest('button'); if (btn && btn.id && clickHandlers[btn.id]) { clickHandlers[btn.id](); return; }
    const catCard = e.target.closest('[data-cat-id]');
    if (catCard) {
      AudioEngine.playBubble(); const cid = catCard.getAttribute('data-cat-id'); AppState.activeCategoryId = cid;
      if (cid === 'vocabulary') { navigate({ screen: 'vocab_themes' }); }
      else { AppState.categoryTab = 'learn'; navigate({ screen: 'category' }); } return;
    }
    const alphaAction = e.target.closest('[data-alpha-action]');
    if (alphaAction) {
      AudioEngine.playBubble(); const action = alphaAction.getAttribute('data-alpha-action');
      if (action === 'learn_alphabet') navigate({ screen: 'alpha_learn' }); else if (action === 'learn_numbers') navigate({ screen: 'num_learn' });
      else if (action === 'games_alphabet') navigate({ screen: 'alpha_games_menu' }); else if (action === 'games_numbers') navigate({ screen: 'num_games_menu' }); return;
    }
    const startGameCard = e.target.closest('[data-start-game]');
    if (startGameCard) { AudioEngine.playBubble(); requestStartGame(startGameCard.getAttribute('data-start-game')); return; }
    const startVocabGame = e.target.closest('[data-start-vocab-game]');
    if (startVocabGame) {
       AudioEngine.playBubble(); const gIdx = startVocabGame.getAttribute('data-start-vocab-game');
       if (gIdx === '1') navigate({ screen: 'vocab_learn' }); else requestStartGame(`vocab:${AppState.activeVocabTheme}:${gIdx}`); return;
    }
    const vocabThemeCard = e.target.closest('[data-vocab-theme]');
    if (vocabThemeCard) { AudioEngine.playBubble(); AppState.activeVocabTheme = vocabThemeCard.getAttribute('data-vocab-theme'); navigate({ screen: 'vocab_menu' }); return; }
    const openConv = e.target.closest('[data-open-conv]');
    if (openConv) {
      AudioEngine.playBubble(); const idx = parseInt(openConv.getAttribute('data-open-conv'), 10);
      AppState.activeConvList = AppState.activeCategoryId === 'expressions' ? CONVERSATIONS_EXPRESSIONS : CONVERSATIONS_GREETINGS;
      AppState.activeConvIndex = idx; AppState.convLineIndex = 0; navigate({ screen: 'conv_player' });
      setTimeout(() => { useSpeech.speakSentence(AppState.activeConvList[idx].lines[0].text, true, AppState.activeConvList[idx].lines[0].speaker); }, 250); return;
    }
    const optBtn = e.target.closest('.option-btn');
    if (optBtn && AppState.screen === 'game_play' && !optBtn.classList.contains('correct') && !optBtn.classList.contains('wrong')) {
      AudioEngine.playPop(); handleMcqChoice(parseInt(optBtn.getAttribute('data-mcq-index'), 10), optBtn); return;
    }
    const speakLine = e.target.closest('[data-speak-line]');
    if (speakLine) {
      AudioEngine.playBubble(); const lIdx = parseInt(speakLine.getAttribute('data-speak-line'), 10); AppState.convLineIndex = lIdx; renderApp();
      const line = AppState.activeConvList[AppState.activeConvIndex].lines[lIdx]; useSpeech.speakSentence(line.text, true, line.speaker); return;
    }
    const speakChatLine = e.target.closest('[data-speak-chat-line]');
    if (speakChatLine) {
      AudioEngine.playBubble(); 
      const lIdx = parseInt(speakChatLine.getAttribute('data-speak-chat-line'), 10); 
      const q = AppState.activeSession.questions[AppState.activeSession.currentIndex];
      const line = q.chatLines[lIdx];
      container.querySelectorAll('.chat-bubble').forEach(b => b.classList.remove('chat-active'));
      speakChatLine.classList.add('chat-active');
      ['Leo', 'Mia'].forEach(n => { const a = container.querySelector('#chat-actor-' + n); if (a) a.classList.toggle('speaking', line.speaker === n); });
      useSpeech.speakSentence(line.text, true, line.speaker); 
      return;
    }
    const alphaTile = e.target.closest('[data-alpha-letter]');
    if (alphaTile) {
      const l = alphaTile.getAttribute('data-alpha-letter'); const w = alphaTile.getAttribute('data-alpha-word');
      alphaTile.classList.remove('pop-anim'); void alphaTile.offsetWidth; alphaTile.classList.add('pop-anim');
      AudioEngine.playBubble(); useSpeech.speakLetterAndWord(l, w, true); return;
    }
    const spellLetter = e.target.closest('[data-spell-letter]');
    if (spellLetter) {
      e.stopPropagation(); const l = spellLetter.getAttribute('data-spell-letter');
      spellLetter.style.transform = 'scale(1.2)'; setTimeout(() => spellLetter.style.transform = 'none', 150);
      AudioEngine.playPop(); useSpeech.speakLetterName(l, true); return;
    }
    const vocabTile = e.target.closest('[data-vocab-learn-word]');
    if (vocabTile) {
      const w = vocabTile.getAttribute('data-vocab-learn-word'); vocabTile.classList.remove('pop-anim'); void vocabTile.offsetWidth; vocabTile.classList.add('pop-anim');
      AudioEngine.playBubble(); useSpeech.speakSentence(w, true); return;
    }
    const numTile = e.target.closest('[data-num-tile]');
    if (numTile && !e.target.closest('[data-count-with-me]')) {
      const nObj = NUMBERS_DATA.find(n => n.num === parseInt(numTile.getAttribute('data-num-tile'), 10)); if (!nObj) return;
      numTile.classList.remove('pop-anim'); void numTile.offsetWidth; numTile.classList.add('pop-anim');
      AudioEngine.playBubble(); useSpeech.speakSentence(nObj.word, true); return;
    }
    const countBtn = e.target.closest('[data-count-with-me]');
    if (countBtn) {
      e.stopPropagation(); AudioEngine.playBubble(); const targetNum = parseInt(countBtn.getAttribute('data-count-with-me'), 10);
      AppState.countingNumber = targetNum; AppState.countingStep = 0; renderApp();
      let currentCount = 1;
      const targetObj = NUMBERS_DATA.find(n => n.num === targetNum);
      function countNext() {
        if (AppState.screen !== 'num_learn' || AppState.countingNumber !== targetNum) return;
        AppState.countingStep = currentCount; renderApp(); useSpeech.speakSentence(String(currentCount), true);
        if (currentCount < targetNum) { 
          currentCount++; 
          setTimeout(countNext, 900); 
        } else { 
          setTimeout(() => { 
            if (AppState.screen === 'num_learn' && AppState.countingNumber === targetNum) { 
              if (targetObj && targetObj.objName) useSpeech.speakSentence(`${targetObj.word} ${targetObj.objName}`, true);
              setTimeout(() => {
                if (AppState.screen === 'num_learn' && AppState.countingNumber === targetNum) { 
                  AppState.countingNumber = null; AppState.countingStep = 0; renderApp(); 
                }
              }, 1800);
            } 
          }, 1000); 
        }
      }
      setTimeout(countNext, 200); return;
    }

    const bankTile = e.target.closest('#dnd-bank-zone .dnd-tile');
    if (bankTile && !AppState.isProcessing) {
      AudioEngine.playPop();
      const bIdx = parseInt(bankTile.getAttribute('data-bank-index'), 10);
      const val = AppState.dndBank[bIdx];
      const q = AppState.activeSession.questions[AppState.activeSession.currentIndex];
      let targetSlotIdx = -1;
      for(let i=0; i<AppState.dndSlots.length; i++) {
        if (AppState.dndSlots[i] === null) { targetSlotIdx = i; break; }
      }
      if (targetSlotIdx !== -1) {
        AppState.dndSlots[targetSlotIdx] = val;
        AppState.dndBank.splice(bIdx, 1);
        renderApp();
        checkDndIfComplete();
      }
      return;
    }

    const filledSlot = e.target.closest('.dnd-slot.filled');
    if (filledSlot && !AppState.isProcessing) {
      if (filledSlot.getAttribute('data-is-hint') === 'true') return;
      const sIdx = parseInt(filledSlot.getAttribute('data-slot-index'), 10);
      if (!isNaN(sIdx) && AppState.dndSlots[sIdx] !== null) {
        AudioEngine.playPop();
        const val = AppState.dndSlots[sIdx];
        AppState.dndSlots[sIdx] = null;
        AppState.dndBank.push(val);
        renderApp();
      }
      return;
    }

  });
  }
  attachDndDragEvents(container);
}

function initPageOnLoad() {
  let saved = {};
  try { saved = JSON.parse(sessionStorage.getItem(NAV_STORAGE_KEY) || '{}'); } catch (e) {}

  const body = document.body;
  const pageScreen = body.getAttribute('data-page-screen') || saved.screen || 'home';
  const pageCategory = body.getAttribute('data-page-category') || null;
  const params = new URLSearchParams(window.location.search);

  AppState.screen = pageScreen;
  AppState.activeCategoryId = params.get('cat') || pageCategory || saved.activeCategoryId || 'expressions';
  AppState.categoryTab = params.get('tab') || saved.categoryTab || 'learn';
  AppState.activeVocabTheme = params.get('theme') || saved.activeVocabTheme || 'intro_myself';

  if (pageScreen === 'conv_player') {
    const convCat = params.get('cat') || saved.activeCategoryId || 'expressions';
    AppState.activeCategoryId = convCat === 'greetings' ? 'greetings' : 'expressions';
    AppState.activeConvList = AppState.activeCategoryId === 'greetings' ? CONVERSATIONS_GREETINGS : CONVERSATIONS_EXPRESSIONS;
    const cIdx = parseInt(params.get('conv') !== null ? params.get('conv') : (saved.activeConvIndex || 0), 10);
    AppState.activeConvIndex = (!isNaN(cIdx) && cIdx >= 0 && cIdx < AppState.activeConvList.length) ? cIdx : 0;
    AppState.convLineIndex = 0;
  } else if (pageScreen === 'game_play') {
    const gameId = params.get('game') || saved.activeGameId || 'exp_quiz';
    if (gameId.startsWith('vocab:')) {
      AppState.activeVocabTheme = gameId.split(':')[1] || AppState.activeVocabTheme;
    }
    const meta = findGameMetaById(gameId) || findGameMetaById('exp_quiz');
    let session = ProgressStore.getActiveSession(meta.id);
    if (!session || session.currentIndex >= session.questions.length) {
      session = ProgressStore.createSession(meta.id, meta.isVariable);
    }
    AppState.activeGameMeta = meta;
    AppState.activeSession = session;
    AppState.lastAutoReadQuestionKey = null;
    prepareQuestionState(session);
  } else if (pageScreen === 'game_result') {
    const gameId = params.get('game') || (saved.lastFinishedSession && saved.lastFinishedSession.gameId) || saved.activeGameId || 'exp_quiz';
    if (gameId.startsWith('vocab:')) {
      AppState.activeVocabTheme = gameId.split(':')[1] || AppState.activeVocabTheme;
    }
    const meta = findGameMetaById(gameId) || findGameMetaById('exp_quiz');
    AppState.activeGameMeta = meta;
    if (saved.lastFinishedSession && saved.lastFinishedSession.gameId === meta.id) {
      AppState.activeSession = saved.lastFinishedSession;
    } else {
      const completed = ProgressStore.getCompletedInfo(meta.id);
      AppState.activeSession = {
        gameId: meta.id,
        score: completed ? completed.bestScore : 100,
        hintsUsed: completed && completed.stars === 2 ? 4 : 0,
        questions: new Array(10).fill({})
      };
    }
  }

  AudioEngine.setInGameMode(
    AppState.screen === 'game_play' ||
    AppState.screen === 'conv_player' ||
    AppState.screen === 'alpha_learn' ||
    AppState.screen === 'num_learn'
  );

  saveNavState();
  renderApp();

  if (AppState.screen === 'conv_player') {
    const conv = AppState.activeConvList[AppState.activeConvIndex];
    if (conv && conv.lines && conv.lines[0]) {
      setTimeout(() => { useSpeech.speakSentence(conv.lines[0].text, true, conv.lines[0].speaker); }, 250);
    }
  } else if (AppState.screen === 'game_result' && AppState.activeSession) {
    const stars = AppState.activeSession.hintsUsed > 3 ? 2 : 3;
    triggerConfetti();
    AudioEngine.playCorrect();
    setTimeout(() => { useSpeech.speakSentence(getResultPraise(stars), true); }, 320);
  }
}

window.onload = () => { initPageOnLoad(); };
