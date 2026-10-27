/********************************************************************
 * 7. PROGRESS & SESSION ROTATION HOOK
 ********************************************************************/
const AppState = {
  screen: 'home',            // 'home' | 'category' | 'conv_player' | 'alpha_learn' | 'num_learn' | 'alpha_games_menu' | 'num_games_menu' | 'game_play' | 'game_result' | 'vocab_themes' | 'vocab_menu' | 'vocab_learn'
  activeCategoryId: null,    
  categoryTab: 'learn',      
  activeVocabTheme: null,    
  activeConvList: [],
  activeConvIndex: 0,
  convLineIndex: 0,
  convPlaying: false,
  activeGameMeta: null,
  activeSession: null,
  lastAutoReadQuestionKey: null,
  dndSlots: [],
  dndBank: [],
  hintRevealed: false,
  feedbackBanner: null,      
  mascotMood: 'happy',
  countingNumber: null,
  countingStep: 0,
  subGameIndex: 0,
  isProcessing: false // Prevents double clicking from skipping multiple questions
};

function generateVocabQuestions(themeId, gameNumber) {
  const theme = window.VOCAB_THEMES[themeId];
  if (!theme) return [];
  let qList = []; const words = theme.words; const N = words.length;

  const getDistractors = (arr, index, prop) => [arr[(index + 1) % arr.length][prop], arr[(index + 2) % arr.length][prop]];
  const shuffleArr = (arr) => { const a = [...arr]; for (let j = a.length - 1; j > 0; j--) { const k = Math.floor(Math.random() * (j + 1)); [a[j], a[k]] = [a[k], a[j]]; } return a; };
  const isPluralWord = (w) => PLURAL_WORDS.has(w.toLowerCase());
  const articleFor = (w) => (/^[aeiou]/i.test(w) ? 'an' : 'a');
  const tileWord = (w) => (CAL_PROPER.has(w.toLowerCase()) ? w : w.toLowerCase());
  const quoteWord = (w) => `\u201C${tileWord(w)}\u201D`;
  const joinList = (arr) => (arr.length <= 1 ? (arr[0] || '') : arr.slice(0, -1).join(', ') + ' and ' + arr[arr.length - 1]);

  if (gameNumber === 2) { 
    words.forEach((w, i) => {
       const letters = w.word.toUpperCase().split('');
       let targetSlots = [...letters];
       let hintSlots = Array(letters.length).fill(null);
       if (letters.length <= 3) hintSlots[0] = letters[0];
       else { hintSlots[0] = letters[0]; hintSlots[letters.length - 1] = letters[letters.length - 1]; }
       letters.forEach((ch, ci) => { if (!/[A-Z0-9]/.test(ch)) hintSlots[ci] = ch; });
       const bankTiles = shuffleArr(letters.filter((l, idx) => hintSlots[idx] === null));
       qList.push({ id: `v_${themeId}_g2_${i}`, type: 'dnd', categoryMode: 'vocab_missing_letters', prompt: `<div style="font-size:3rem;text-align:center;">${w.emoji}</div><div style="font-size:1.2rem;text-align:center;">Spell the word!</div>`, speakPrompt: `Spell the word ${w.word}.`, targetSlots: targetSlots, hintSlots: hintSlots, bankTiles: bankTiles, spokenAnswer: w.word, hint: `The word is ${w.word}.` });
    });
  } else if (gameNumber === 3) { 
    words.forEach((w, i) => {
       qList.push({ id: `v_${themeId}_g3_${i}`, type: 'mcq', prompt: `<div style="font-size:4rem;text-align:center;">${w.emoji}</div>`, speakPrompt: `What is this picture?`, answer: w.word, options: [w.word, ...getDistractors(words, i, 'word')], hint: `The picture shows a ${w.word}.` });
    });
  } else if (gameNumber === 4) { 
    words.forEach((w, i) => {
       qList.push({ id: `v_${themeId}_g4_${i}`, type: 'mcq', prompt: `Which picture is the <strong style="color:#FF5C8A;">${w.word}</strong>?`, speakPrompt: `Which picture is the ${w.word}?`, answer: w.emoji, options: [w.emoji, ...getDistractors(words, i, 'emoji')], hint: `The ${w.word} looks like ${w.emoji}.` });
    });
  } else if (gameNumber === 5) { 
    words.forEach((w, i) => {
       qList.push({ id: `v_${themeId}_g5_${i}`, type: 'mcq', prompt: `${w.clue}`, speakPrompt: w.clue, answer: w.emoji, options: [w.emoji, ...getDistractors(words, i, 'emoji')], hint: `The answer is ${w.word}.` });
    });
  } else if (gameNumber === 6) { 
    // Exactly one sentence per learned word: reuse the theme's own sentences, then fill the rest word-by-word.
    const genSentence = (w) => (isPluralWord(w.word) ? { words: ['These', 'are', w.word.toLowerCase() + '.'] } : { words: ['This', 'is', articleFor(w.word), w.word.toLowerCase() + '.'] });
    const base = theme.sentences.slice(0, N);
    const sentenceList = base.concat(words.slice(base.length).map(genSentence));
    sentenceList.forEach((sObj, i) => {
       const bankTiles = shuffleArr(sObj.words);
       qList.push({ id: `v_${themeId}_g6_${i}`, type: 'dnd', categoryMode: 'vocab_sentence', prompt: 'Build the sentence:', speakPrompt: sObj.words.join(' '), targetSlots: sObj.words, bankTiles: bankTiles, spokenAnswer: sObj.words.join(' '), hint: `Start with "${sObj.words[0]}".` });
    });
  } else if (gameNumber === 7) { 
    // Exactly one statement per learned word: reuse the theme's own statements, then fill the rest (alternating true / false).
    const genTf = (w, i) => {
       const makeTrue = i % 2 === 0;
       const subject = makeTrue ? w : words[(i + 1) % N];
       const plural = isPluralWord(subject.word);
       const text = plural ? `Are these ${subject.word.toLowerCase()}?` : `Is this ${articleFor(subject.word)} ${subject.word.toLowerCase()}?`;
       return { text, isTrue: makeTrue, emoji: w.emoji };
    };
    const baseTf = theme.trueFalse.slice(0, N);
    const tfList = baseTf.concat(words.map((w, i) => ({ w, i })).slice(baseTf.length).map(o => genTf(o.w, o.i)));
    tfList.forEach((tf, i) => {
       const promptHtml = tf.emoji ? `<div style="font-size:3.2rem;text-align:center;">${tf.emoji}</div>${tf.text}` : `${tf.text}`;
       qList.push({ id: `v_${themeId}_g7_${i}`, type: 'mcq', prompt: promptHtml, speakPrompt: tf.text, answer: tf.isTrue ? '✅ True' : '❌ False', options: ['✅ True', '❌ False'], correctIndex: tf.isTrue ? 0 : 1, hint: tf.isTrue ? 'This statement is true!' : 'This statement is false!' });
    });
  } else if (gameNumber === 8) { 
    // ONE question, with exactly one sentence (blank) per learned word.
    const customMap = {};
    (theme.story.sentences || []).forEach(sObj => { if (sObj.text !== 'Here is a _.') customMap[String(sObj.answer).toLowerCase()] = sObj; });
    const templates = ['Look at the picture! It is _.', 'I can see _ here.', 'Can you find _?', 'The word for this picture is _.', 'Say it with me: _!', 'This picture shows _.'];
    const storySentences = words.map((w, i) => customMap[w.word.toLowerCase()] ? customMap[w.word.toLowerCase()] : { text: templates[i % templates.length], answer: tileWord(w.word), hintPic: w.emoji });
    const bankTiles = shuffleArr(storySentences.map(sObj => sObj.answer));
    qList.push({ id: `v_${themeId}_g8`, type: 'vocab_story', prompt: 'Complete the story!', speakPrompt: 'Complete the story with the missing words.', sentences: storySentences, targetSlots: storySentences.map(sObj => sObj.answer), bankTiles: bankTiles, hint: 'Look at each picture and find the matching word.' });
  } else if (gameNumber === 9) { 
    // Text length AND number of questions grow with the number of learned words (3 words per sentence, 1 question per word).
    const speakers = ['Mia', 'Leo'];
    const groupSize = 3; const groups = [];
    for (let i = 0; i < N; i += groupSize) groups.push(words.slice(i, i + groupSize));
    const textParts = [`Today, Mia and Leo practice English words about ${theme.title}.`];
    groups.forEach((g, gi) => { textParts.push(`${speakers[gi % 2]} says ${joinList(g.map(w => quoteWord(w.word)))}.`); });
    textParts.push('Now they know all the words. They are very happy!');
    const readingText = textParts.join(' ');
    const questions = [];
    groups.forEach((g, gi) => {
       g.forEach(w => {
          const who = speakers[gi % 2];
          questions.push({ q: `Who says ${quoteWord(w.word)}?`, speak: `Who says ${w.word}?`, options: [who, speakers[(gi + 1) % 2], 'Nobody'], answerText: who });
       });
    });
    shuffleArr(questions).forEach((qObj, i) => {
       qList.push({ id: `v_${themeId}_g9_${i}`, type: 'vocab_reading', readingText: readingText, prompt: qObj.q, speakPrompt: qObj.speak, answer: qObj.answerText, options: qObj.options, correctIndex: qObj.options.indexOf(qObj.answerText), hint: `Read the text carefully to find the answer.` });
    });
  } else if (gameNumber === 10) { 
    // Dialogue only (no questions); its length follows the number of learned words (2 words per exchange).
    const chunkSize = 2; const chunks = [];
    for (let i = 0; i < N; i += chunkSize) chunks.push(words.slice(i, i + chunkSize));
    const chunkText = (c) => joinList(c.map(w => quoteWord(w.word)));
    const lines = [];
    lines.push({ speaker: 'Leo', text: `Hi Mia! Let\u2019s practice the words about ${theme.title}.` });
    lines.push({ speaker: 'Mia', text: `Great idea, Leo! I am ready.` });
    lines.push({ speaker: 'Leo', text: `Do you know ${chunkText(chunks[0])}?` });
    chunks.forEach((c, k) => {
       const speaker = k % 2 === 0 ? 'Mia' : 'Leo';
       const tail = k < chunks.length - 1 ? ` Do you know ${chunkText(chunks[k + 1])}?` : ` Now we know all the words!`;
       lines.push({ speaker, text: `Yes! ${chunkText(c)}.${tail}` });
    });
    const lastSpeaker = (chunks.length - 1) % 2 === 0 ? 'Mia' : 'Leo';
    lines.push({ speaker: lastSpeaker === 'Mia' ? 'Leo' : 'Mia', text: `Great job! See you next time.` });
    qList.push({ id: `v_${themeId}_g10`, type: 'vocab_dialogue', chatLines: lines, prompt: 'Listen and read the dialogue!', speakPrompt: 'Listen and read the dialogue.', hint: 'Tap any line to hear it again.' });
  }

  return qList;
}

const ProgressStore = (() => {
  const STORAGE_KEY = 'bimba_english_progress_v2';
  let data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  if (!data.totalStars) data.totalStars = 0; if (!data.usedQuestionIds) data.usedQuestionIds = {};
  if (!data.activeSessions) data.activeSessions = {}; if (!data.completedGames) data.completedGames = {};

  function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }

  function getGameStatus(gameId) {
    if (data.activeSessions[gameId] && data.activeSessions[gameId].currentIndex > 0) return 'in_progress';
    if (data.completedGames[gameId]) return 'completed';
    return 'new';
  }

  function createSession(gameId, isVariable = true) {
    let chosen = []; let isVocab = gameId.startsWith('vocab:');
    
    if (isVocab) {
       const parts = gameId.split(':'); const themeId = parts[1]; const gameNum = parseInt(parts[2], 10);
       chosen = generateVocabQuestions(themeId, gameNum);
       if (gameNum === 3 || gameNum === 4 || gameNum === 5 || gameNum === 7 || gameNum >= 9) chosen = assignBalancedOptionOrders(chosen);
    } else {
      const fullBank = QUESTION_BANKS[gameId] || [];
      if (!isVariable) {
        chosen = fullBank.slice(0, gameId === 'grammar_chat' ? fullBank.length : 10).map(q => JSON.parse(JSON.stringify(q)));
      } else {
        if (!data.usedQuestionIds[gameId]) data.usedQuestionIds[gameId] = [];
        let used = data.usedQuestionIds[gameId];
        const validIds = new Set(fullBank.map(q => q.id));
        used = used.filter(id => validIds.has(id));
        data.usedQuestionIds[gameId] = used;

        let unusedPool = fullBank.filter(q => !used.includes(q.id));
        if (unusedPool.length < 10) {
          used = [];
          data.usedQuestionIds[gameId] = [];
          unusedPool = [...fullBank];
        }
        const copy = [...unusedPool];
        for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; }
        chosen = copy.slice(0, 10).map(q => JSON.parse(JSON.stringify(q)));
        chosen = assignBalancedOptionOrders(chosen);

        chosen.forEach(q => {
          if (!data.usedQuestionIds[gameId].includes(q.id)) {
            data.usedQuestionIds[gameId].push(q.id);
          }
        });
      }
    }

    const session = { gameId, isVariable, questions: chosen, currentIndex: 0, score: 0, hintsUsed: 0 };
    data.activeSessions[gameId] = session; save(); return session;
  }

  function getActiveSession(gameId) { return data.activeSessions[gameId] || null; }
  function updateSessionProgress(gameId, currentIndex, score, hintsUsed) {
    const s = data.activeSessions[gameId]; if (!s) return;
    s.currentIndex = currentIndex; s.score = score; s.hintsUsed = hintsUsed; save();
  }
  function completeSession(gameId, starsEarned, score) {
    const s = data.activeSessions[gameId];
    if (s && s.isVariable) {
      if (!data.usedQuestionIds[gameId]) data.usedQuestionIds[gameId] = [];
      s.questions.forEach(q => { if (!data.usedQuestionIds[gameId].includes(q.id)) data.usedQuestionIds[gameId].push(q.id); });
    }
    delete data.activeSessions[gameId];
    data.completedGames[gameId] = { stars: Math.max((data.completedGames[gameId]?.stars || 0), starsEarned), bestScore: Math.max((data.completedGames[gameId]?.bestScore || 0), score) };
    data.totalStars = (data.totalStars || 0) + starsEarned; save();
  }

  return { getTotalStars: () => data.totalStars || 0, getGameStatus, getCompletedInfo: (gameId) => data.completedGames[gameId] || null, getActiveSession, createSession, updateSessionProgress, completeSession };
})();
window.ProgressStore = ProgressStore;

/********************************************************************
 * 8. CONFETTI / STAR BURST EFFECT & VALIDATION TOOL
 ********************************************************************/
function triggerConfetti() {
  const container = document.getElementById('confetti-container'); if (!container) return;
  const colors = ['#FFD13B', '#FF5C8A', '#4CC9F0', '#38E5A7', '#A78BFA', '#FF924C'];
  for (let i = 0; i < 36; i++) {
    const el = document.createElement('div'); el.className = 'confetti-piece';
    el.style.left = `${45 + (Math.random() * 16 - 8)}%`; el.style.top = '35%';
    el.style.background = colors[i % colors.length]; el.style.setProperty('--dx', `${(Math.random() - 0.5) * 520}px`); el.style.setProperty('--dy', `${(Math.random() - 0.3) * 460}px`);
    container.appendChild(el); setTimeout(() => el.remove(), 1350);
  }
}

function validateVocabContent() {
  let issues = []; const themes = window.VOCAB_THEME_ORDER.map(id => window.VOCAB_THEMES[id]);
  console.log(`Starting validation for ${themes.length} themes...`);
  themes.forEach(t => {
    const n = t.words ? t.words.length : 0;
    if (n < 8) issues.push(`[${t.id}] Missing or < 8 words.`);
    t.words.forEach(w => { if (!w.word || !w.emoji || !w.clue) issues.push(`[${t.id}] Word "${w.word}" missing emoji or clue.`); });
    for (let g = 2; g <= 7; g++) { const c = generateVocabQuestions(t.id, g).length; if (c !== n) issues.push(`[${t.id}] Game ${g} has ${c} questions, expected ${n}.`); }
    const g8 = generateVocabQuestions(t.id, 8); if (g8.length !== 1 || g8[0].sentences.length !== n) issues.push(`[${t.id}] Game 8 should be 1 question with ${n} sentences.`);
    const g9 = generateVocabQuestions(t.id, 9); if (g9.length !== n) issues.push(`[${t.id}] Game 9 has ${g9.length} questions, expected ${n}.`);
    const g10 = generateVocabQuestions(t.id, 10); if (g10.length !== 1 || g10[0].type !== 'vocab_dialogue') issues.push(`[${t.id}] Game 10 should be a single dialogue.`);
  });
  if(issues.length === 0) {
    console.log(`✅ All ${themes.length} themes passed validation! 10 games available for all.`);
    alert(`✅ All ${themes.length} themes passed validation!`);
  } else { console.error("Validation issues found:", issues); alert(`Found ${issues.length} issues. Check console for details.`); }
}
window.validateVocabContent = validateVocabContent;

function validateAlphaNumBanks() {
  const gameIds = ['alpha_match', 'alpha_order', 'alpha_missing', 'alpha_pic', 'num_count', 'num_order', 'num_word', 'num_listen', 'num_missing'];
  let issues = [];
  gameIds.forEach(id => {
    const bank = QUESTION_BANKS[id];
    if (!bank) { issues.push(`Missing bank: ${id}`); return; }
    if (bank.length !== 100) issues.push(`[${id}] Expected 100 questions, got ${bank.length}`);
    const idSet = new Set();
    const contentSet = new Set();
    bank.forEach((q, idx) => {
      if (idSet.has(q.id)) issues.push(`[${id}] Duplicate question ID: ${q.id}`);
      idSet.add(q.id);
      const key = q.type === 'dnd' ? `${q.prompt}::${(q.targetSlots || []).join('-')}` : `${q.prompt}::${q.answer}`;
      if (contentSet.has(key)) issues.push(`[${id}] Duplicate question content at index ${idx}: ${key}`);
      contentSet.add(key);
      if (q.type === 'mcq') {
        if (!Array.isArray(q.options) || q.options.length !== 3) issues.push(`[${id}] Question ${q.id} must have 3 options`);
        if (new Set(q.options).size !== 3) issues.push(`[${id}] Question ${q.id} has duplicate options: ${JSON.stringify(q.options)}`);
        if (!q.options.includes(q.answer)) issues.push(`[${id}] Question ${q.id} answer '${q.answer}' missing in options`);
      }
      if (q.type === 'dnd') {
        if (!Array.isArray(q.targetSlots) || q.targetSlots.length === 0) issues.push(`[${id}] Question ${q.id} has empty targetSlots`);
        if (!Array.isArray(q.bankTiles) || q.bankTiles.length < q.targetSlots.length) issues.push(`[${id}] Question ${q.id} has insufficient bankTiles`);
      }
    });
  });
  if (issues.length === 0) {
    console.log(`✅ All 9 Alphabet & Numbers games passed validation! Exactly 100 unique questions in each bank with zero duplicates.`);
    return true;
  } else {
    console.error("Alphabet & Numbers Bank validation issues:", issues);
    return false;
  }
}
window.validateAlphaNumBanks = validateAlphaNumBanks;


/********************************************************************
 * 9. MULTI-PAGE ROUTER & STATE PERSISTENCE
 ********************************************************************/
const NAV_STORAGE_KEY = 'bimba_nav_state_v1';

function saveNavState(extra = {}) {
  try {
    const prev = JSON.parse(sessionStorage.getItem(NAV_STORAGE_KEY) || '{}');
    const next = {
      ...prev,
      screen: AppState.screen,
      activeCategoryId: AppState.activeCategoryId,
      categoryTab: AppState.categoryTab,
      activeVocabTheme: AppState.activeVocabTheme,
      activeConvIndex: AppState.activeConvIndex,
      activeGameId: (AppState.activeGameMeta && AppState.activeGameMeta.id) || (AppState.activeSession && AppState.activeSession.gameId) || prev.activeGameId || null,
      ...extra
    };
    sessionStorage.setItem(NAV_STORAGE_KEY, JSON.stringify(next));
  } catch (e) {}
}

function getPageUrlForState() {
  const s = AppState.screen;
  if (s === 'home') return 'index.html';
  if (s === 'category') {
    const cid = AppState.activeCategoryId || 'expressions';
    const tabParam = AppState.categoryTab === 'games' ? '?tab=games' : '';
    if (cid === 'expressions') return `expressions.html${tabParam}`;
    if (cid === 'greetings') return `greetings.html${tabParam}`;
    if (cid === 'alpha_num') return `alpha-numbers.html${tabParam}`;
    if (cid === 'grammar') return 'grammar.html';
    if (cid === 'vocabulary') return 'vocabulary.html';
    return `expressions.html${tabParam}`;
  }
  if (s === 'vocab_themes') return 'vocabulary.html';
  if (s === 'vocab_menu') return `vocab-menu.html?theme=${encodeURIComponent(AppState.activeVocabTheme || 'intro_myself')}`;
  if (s === 'vocab_learn') return `vocab-learn.html?theme=${encodeURIComponent(AppState.activeVocabTheme || 'intro_myself')}`;
  if (s === 'alpha_learn') return 'alphabet-learn.html';
  if (s === 'num_learn') return 'numbers-learn.html';
  if (s === 'alpha_games_menu') return 'alphabet-games.html';
  if (s === 'num_games_menu') return 'numbers-games.html';
  if (s === 'conv_player') {
    const cid = AppState.activeCategoryId === 'greetings' ? 'greetings' : 'expressions';
    return `conversation.html?cat=${encodeURIComponent(cid)}&conv=${AppState.activeConvIndex || 0}`;
  }
  if (s === 'game_play') {
    const gid = (AppState.activeGameMeta && AppState.activeGameMeta.id) || (AppState.activeSession && AppState.activeSession.gameId) || 'exp_quiz';
    return `game.html?game=${encodeURIComponent(gid)}`;
  }
  if (s === 'game_result') {
    const gid = (AppState.activeGameMeta && AppState.activeGameMeta.id) || (AppState.activeSession && AppState.activeSession.gameId) || 'exp_quiz';
    return `result.html?game=${encodeURIComponent(gid)}`;
  }
  return 'index.html';
}

window.addEventListener('pointerdown', () => { AudioEngine.unlock(); }, { once: true });

function navigate(newState) {
  useSpeech.stopAll();
  Object.assign(AppState, newState);
  saveNavState();
  AudioEngine.setInGameMode(
    AppState.screen === 'game_play' ||
    AppState.screen === 'conv_player' ||
    AppState.screen === 'alpha_learn' ||
    AppState.screen === 'num_learn'
  );

  const targetUrl = getPageUrlForState();
  const targetFile = targetUrl.split('?')[0];
  const currentPath = window.location.pathname || '';
  const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

  if (currentFile.toLowerCase() !== targetFile.toLowerCase()) {
    window.location.href = targetUrl;
  } else {
    try { window.history.replaceState(null, '', targetUrl); } catch (e) {}
    renderApp();
  }
}
