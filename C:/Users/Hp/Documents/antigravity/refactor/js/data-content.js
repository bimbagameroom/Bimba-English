/********************************************************************
 * 1. PRONUNCIATION MAPPING & VARIED PRAISE / ENCOURAGEMENT POOLS
 ********************************************************************/
const LETTER_NAME_SPOKEN = {
  A: 'a', B: 'b', C: 'c', D: 'd', E: 'e', F: 'f', G: 'g', H: 'h', I: 'i', J: 'j', K: 'k', L: 'l', M: 'm',
  N: 'n', O: 'o', P: 'p', Q: 'q', R: 'r', S: 's', T: 't', U: 'u', V: 'v', W: 'w', X: 'x', Y: 'y', Z: 'z'
};

const LETTER_IPA_HINT = {
  A: '/eɪ/', B: '/biː/', C: '/siː/', D: '/diː/', E: '/iː/', F: '/ɛf/', G: '/dʒiː/', H: '/eɪtʃ/', I: '/aɪ/',
  J: '/dʒeɪ/', K: '/keɪ/', L: '/ɛl/', M: '/ɛm/', N: '/ɛn/', O: '/oʊ/', P: '/piː/', Q: '/kjuː/', R: '/ɑːr/',
  S: '/ɛs/', T: '/tiː/', U: '/juː/', V: '/viː/', W: '/ˈdʌbəl.juː/', X: '/ɛks/', Y: '/waɪ/', Z: '/ziː/'
};

const PRAISE_POOL = ["Awesome!", "Fantastic!", "Well done!", "Excellent!", "Amazing!", "Brilliant!", "Perfect!", "Wonderful!", "You did it!", "Nice work!", "Spectacular!", "Good thinking!", "You're so smart!", "That's right!", "Super job!", "Way to go!"];
const TRY_AGAIN_POOL = ["Try again!", "Almost there!", "Give it another go!", "You can do it!", "Not quite, try once more!", "Keep trying, you've got this!", "So close! Try one more time!", "Let's try that again!"];

const RESULT_PRAISE_BY_STARS = {
  3: ["Superstar! You got three bright stars!", "Incredible work! You mastered this game!", "Outstanding! Three shiny stars for you!"],
  2: ["Great effort! You earned two shiny stars!", "Awesome job! You are getting so good at English!", "Wonderful work! Two bright stars for you!"],
  1: ["Good try! You earned a star—keep practicing!", "Nice effort! Every practice makes you smarter!", "Way to finish! Let's play again to win even more stars!"]
};

let lastPraiseIndex = -1;
let lastTryAgainIndex = -1;

function getNextPraise() {
  let idx; do { idx = Math.floor(Math.random() * PRAISE_POOL.length); } while (idx === lastPraiseIndex && PRAISE_POOL.length > 1);
  lastPraiseIndex = idx; return PRAISE_POOL[idx];
}
function getNextTryAgain() {
  let idx; do { idx = Math.floor(Math.random() * TRY_AGAIN_POOL.length); } while (idx === lastTryAgainIndex && TRY_AGAIN_POOL.length > 1);
  lastTryAgainIndex = idx; return TRY_AGAIN_POOL[idx];
}
function getResultPraise(stars) {
  const list = RESULT_PRAISE_BY_STARS[stars] || RESULT_PRAISE_BY_STARS[2];
  return list[Math.floor(Math.random() * list.length)];
}

/********************************************************************
 * 4. ORIGINAL SVG MASCOTS & CATEGORY ILLUSTRATIONS
 ********************************************************************/
const SVGs = {
  mascotBuddy(mood = 'happy') {
    const mouth = mood === 'cheer'
      ? '<path d="M 38 56 Q 50 70 62 56 Z" fill="#FF477E" stroke="#1E293B" stroke-width="3"/>'
      : '<path d="M 40 57 Q 50 65 60 57" fill="none" stroke="#1E293B" stroke-width="3.5" stroke-linecap="round"/>';
    return `
      <svg width="78" height="78" viewBox="0 0 100 100" aria-hidden="true">
        <rect x="16" y="18" width="68" height="62" rx="18" fill="#FFD13B" stroke="#1E293B" stroke-width="4"/>
        <circle cx="36" cy="43" r="6.5" fill="#1E293B"/>
        <circle cx="34" cy="41" r="2.2" fill="#FFFFFF"/>
        <circle cx="64" cy="43" r="6.5" fill="#1E293B"/>
        <circle cx="62" cy="41" r="2.2" fill="#FFFFFF"/>
        <ellipse cx="26" cy="52" rx="5" ry="3" fill="#FF6B9E" opacity="0.7"/>
        <ellipse cx="74" cy="52" rx="5" ry="3" fill="#FF6B9E" opacity="0.7"/>
        ${mouth}
      </svg>`;
  },
  charLeo() {
    const K = '#1E293B';
    return `<svg class="char-svg" width="104" height="104" viewBox="0 0 120 120" aria-hidden="true">
      <ellipse cx="60" cy="112" rx="30" ry="4.5" fill="#1E293B" opacity="0.12"/>
      <circle cx="17" cy="70" r="11" fill="#FFC93C" stroke="${K}" stroke-width="4"/>
      <circle cx="103" cy="70" r="11" fill="#FFC93C" stroke="${K}" stroke-width="4"/>
      <circle cx="15" cy="67" r="3" fill="#FFF" opacity="0.55"/>
      <circle cx="101" cy="67" r="3" fill="#FFF" opacity="0.55"/>
      <ellipse cx="60" cy="70" rx="41" ry="38" fill="#4DB8F5" stroke="${K}" stroke-width="4"/>
      <path d="M 32 88 Q 44 100 60 100" fill="none" stroke="#FFF" stroke-width="3.5" stroke-linecap="round" opacity="0.35"/>
      <path d="M 22 58 Q 24 22 62 22 Q 98 22 100 56 Q 62 44 22 58 Z" fill="#FFB020" stroke="${K}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M 40 31 Q 56 24 72 28" fill="none" stroke="#FFF" stroke-width="4" stroke-linecap="round" opacity="0.55"/>
      <path d="M 8 50 Q 14 34 38 38 Q 62 44 72 54 Q 40 46 8 62 Z" fill="#FFD84D" stroke="${K}" stroke-width="4" stroke-linejoin="round" transform="rotate(-6 40 50)"/>
      <circle cx="60" cy="21" r="4.5" fill="#FFD84D" stroke="${K}" stroke-width="3"/>
      <g class="char-eyes">
        <circle cx="45" cy="73" r="6.5" fill="${K}"/><circle cx="43" cy="71" r="2.4" fill="#FFF"/>
        <circle cx="75" cy="73" r="6.5" fill="${K}"/><circle cx="73" cy="71" r="2.4" fill="#FFF"/>
      </g>
      <ellipse cx="32" cy="85" rx="7" ry="4.5" fill="#FF7BAC" opacity="0.85"/>
      <ellipse cx="88" cy="85" rx="7" ry="4.5" fill="#FF7BAC" opacity="0.85"/>
      <path d="M 51 88 Q 60 98 69 88 Q 60 91 51 88 Z" fill="#FF477E" stroke="${K}" stroke-width="3.5" stroke-linejoin="round"/>
    </svg>`;
  },
  charMia() {
    const K = '#1E293B';
    return `<svg class="char-svg" width="104" height="104" viewBox="0 0 120 120" aria-hidden="true">
      <ellipse cx="60" cy="112" rx="30" ry="4.5" fill="#1E293B" opacity="0.12"/>
      <g transform="rotate(-12 40 38)"><ellipse cx="40" cy="26" rx="13" ry="26" fill="#FF6FA5" stroke="${K}" stroke-width="4"/><ellipse cx="40" cy="29" rx="6" ry="17" fill="#FFB5D2"/></g>
      <g transform="rotate(12 80 38)"><ellipse cx="80" cy="26" rx="13" ry="26" fill="#FF6FA5" stroke="${K}" stroke-width="4"/><ellipse cx="80" cy="29" rx="6" ry="17" fill="#FFB5D2"/></g>
      <circle cx="17" cy="72" r="11" fill="#3DDBB0" stroke="${K}" stroke-width="4"/>
      <circle cx="103" cy="72" r="11" fill="#3DDBB0" stroke="${K}" stroke-width="4"/>
      <circle cx="15" cy="69" r="3" fill="#FFF" opacity="0.55"/>
      <circle cx="101" cy="69" r="3" fill="#FFF" opacity="0.55"/>
      <ellipse cx="60" cy="72" rx="41" ry="37" fill="#FF6FA5" stroke="${K}" stroke-width="4"/>
      <path d="M 32 90 Q 44 101 60 101" fill="none" stroke="#FFF" stroke-width="3.5" stroke-linecap="round" opacity="0.35"/>
      <path d="M 38 42 Q 50 34 62 38" fill="none" stroke="#FFF" stroke-width="4" stroke-linecap="round" opacity="0.45"/>
      <circle cx="60" cy="38" r="6" fill="#FFD13B" stroke="${K}" stroke-width="3.5"/>
      <circle cx="58" cy="36" r="1.8" fill="#FFF"/>
      <g class="char-eyes">
        <circle cx="45" cy="72" r="6.5" fill="${K}"/><circle cx="43" cy="70" r="2.4" fill="#FFF"/>
        <circle cx="75" cy="72" r="6.5" fill="${K}"/><circle cx="73" cy="70" r="2.4" fill="#FFF"/>
      </g>
      <ellipse cx="32" cy="85" rx="7" ry="4.5" fill="#FF9EC4" opacity="0.95"/>
      <ellipse cx="88" cy="85" rx="7" ry="4.5" fill="#FF9EC4" opacity="0.95"/>
      <path d="M 50 86 Q 60 100 70 86 Z" fill="#E0457B" stroke="${K}" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M 55 93 Q 60 90 65 93 Q 60 98 55 93 Z" fill="#FF8DB5"/>
    </svg>`;
  },
  catIcon(index) {
    const icons = [
      `<svg width="48" height="48" viewBox="0 0 64 64"><path d="M10 14h44a6 6 0 0 1 6 6v22a6 6 0 0 1-6 6H26l-12 10V48H10a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6z" fill="#FFD13B" stroke="#1E293B" stroke-width="3.5"/><circle cx="22" cy="31" r="3.5" fill="#1E293B"/><circle cx="32" cy="31" r="3.5" fill="#1E293B"/><circle cx="42" cy="31" r="3.5" fill="#1E293B"/></svg>`,
      `<svg width="48" height="48" viewBox="0 0 64 64"><circle cx="32" cy="32" r="24" fill="#FF85B3" stroke="#1E293B" stroke-width="3.5"/><circle cx="23" cy="27" r="3.5" fill="#1E293B"/><circle cx="41" cy="27" r="3.5" fill="#1E293B"/><path d="M22 39q10 9 20 0" fill="none" stroke="#1E293B" stroke-width="3.5" stroke-linecap="round"/></svg>`,
      `<svg width="48" height="48" viewBox="0 0 64 64"><rect x="6" y="10" width="26" height="26" rx="7" fill="#4CC9F0" stroke="#1E293B" stroke-width="3"/><text x="19" y="29" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="18" fill="#1E293B">A</text><rect x="30" y="26" width="28" height="28" rx="7" fill="#FFD13B" stroke="#1E293B" stroke-width="3"/><text x="44" y="46" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="18" fill="#1E293B">123</text></svg>`,
      `<svg width="48" height="48" viewBox="0 0 64 64"><circle cx="32" cy="34" r="20" fill="#FF5C8A" stroke="#1E293B" stroke-width="3.5"/><path d="M32 14c0-6 6-9 10-8" fill="none" stroke="#1E293B" stroke-width="3.5" stroke-linecap="round"/><ellipse cx="40" cy="14" rx="7" ry="4" fill="#38E5A7" stroke="#1E293B" stroke-width="2.5"/></svg>`,
      `<svg width="48" height="48" viewBox="0 0 64 64"><rect x="12" y="10" width="40" height="46" rx="7" fill="#A78BFA" stroke="#1E293B" stroke-width="3.5"/><line x1="20" y1="22" x2="44" y2="22" stroke="#FFF" stroke-width="4" stroke-linecap="round"/><line x1="20" y1="33" x2="44" y2="33" stroke="#FFF" stroke-width="4" stroke-linecap="round"/><line x1="20" y1="44" x2="34" y2="44" stroke="#FFD13B" stroke-width="4" stroke-linecap="round"/></svg>`
    ]; return icons[index] || icons[0];
  }
};

/********************************************************************
 * 5. DATA LAYER: CONVERSATIONS, ALPHABET, NUMBERS & BANKS
 ********************************************************************/
const HOME_CATEGORIES = [
  { id: 'expressions', number: '1.', title: 'Common Expressions', bg: '#FFD147', iconIndex: 0 },
  { id: 'greetings',   number: '2.', title: 'Greetings',          bg: '#FF85B3', iconIndex: 1 },
  { id: 'alpha_num',   number: '3.', title: 'Alphabet & Numbers', bg: '#6EC6FF', iconIndex: 2 },
  { id: 'vocabulary',  number: '4.', title: 'Vocabulary Words',   bg: '#5CDFB9', iconIndex: 3 },
  { id: 'grammar',     number: '5.', title: 'Grammar',            bg: '#B9A3FF', iconIndex: 4 }
];

const CONVERSATIONS_EXPRESSIONS = [
  { id: 'exp_conv_1', number: 1, title: 'Asking Permission', icon: '🙋‍♂️', lines: [{ speaker: 'Leo', text: 'Excuse me, Miss Sara. May I go to the restroom, please?' }, { speaker: 'Mia', text: 'Yes, you may, Leo. Please wash your hands after.' }, { speaker: 'Leo', text: 'Okay, I will! Thank you very much.' }, { speaker: 'Mia', text: 'You are welcome. Come right back to class!' }] },
  { id: 'exp_conv_2', number: 2, title: 'Borrowing Something', icon: '✏️', lines: [{ speaker: 'Leo', text: 'Oh no, I forgot my blue crayon at home.' }, { speaker: 'Mia', text: 'Do you want to borrow mine, Leo?' }, { speaker: 'Leo', text: 'Yes, please! Can I borrow your blue crayon?' }, { speaker: 'Mia', text: 'Sure, here you go! You can use it now.' }, { speaker: 'Leo', text: 'Thank you, Mia! I will give it right back.' }] },
  { id: 'exp_conv_3', number: 3, title: 'Apologizing Politely', icon: '💛', lines: [{ speaker: 'Leo', text: 'Oops! I bumped into your desk. I am so sorry!' }, { speaker: 'Mia', text: 'That is okay, Leo. Nothing fell down.' }, { speaker: 'Leo', text: 'Let me help you fix your books anyway.' }, { speaker: 'Mia', text: 'Thank you! You are very kind.' }] },
  { id: 'exp_conv_4', number: 4, title: 'Thanking a Friend', icon: '🎁', lines: [{ speaker: 'Mia', text: 'Here is a shiny sticker for helping me today!' }, { speaker: 'Leo', text: 'Wow, thank you so much, Mia! I love stars.' }, { speaker: 'Mia', text: 'You are very welcome! You are a great friend.' }, { speaker: 'Leo', text: 'Let us put the stickers on our notebooks!' }] },
  { id: 'exp_conv_5', number: 5, title: 'Asking for Help', icon: '🤝', lines: [{ speaker: 'Leo', text: 'This puzzle box is up too high. Could you help me, please?' }, { speaker: 'Mia', text: 'Of course! I can reach it for you.' }, { speaker: 'Leo', text: 'Hooray! Now we can build the puzzle together.' }, { speaker: 'Mia', text: 'Great idea! Let us start with the corner pieces.' }] },
  { id: 'exp_conv_6', number: 6, title: 'Classroom Instructions', icon: '📚', lines: [{ speaker: 'Mia', text: 'Please open your English book to page ten.' }, { speaker: 'Mia', text: 'We have warm soup, rice, and sweet apples.' }, { speaker: 'Leo', text: 'Yum! Everything smells so delicious.' }, { speaker: 'Mia', text: 'Enjoy your meal, Leo!' }] },
  { id: 'exp_conv_8', number: 8, title: 'Washing Hands', icon: '🧼', lines: [{ speaker: 'Mia', text: 'Before we eat our snack, let us wash our hands.' }, { speaker: 'Leo', text: 'Good idea! I will use warm water and soap.' }, { speaker: 'Mia', text: 'Scrub the front and back for twenty seconds.' }, { speaker: 'Leo', text: 'All clean and dry! Now we are ready for snack time.' }] },
  { id: 'exp_conv_9', number: 9, title: 'Bedtime Routine', icon: '🌙', lines: [{ speaker: 'Mia', text: 'It is nine o’clock, Leo. It is time to go to bed.' }, { speaker: 'Leo', text: 'I brushed my teeth and put on my pajamas.' }, { speaker: 'Mia', text: 'Wonderful! Would you like a short bedtime story?' }, { speaker: 'Leo', text: 'Yes, please! Good night and sweet dreams.' }] },
  { id: 'exp_conv_10', number: 10, title: 'Helping at Home', icon: '🧹', lines: [{ speaker: 'Leo', text: 'Can I help you clean up the living room?' }, { speaker: 'Mia', text: 'Yes, please! You can put the toys into the basket.' }, { speaker: 'Leo', text: 'All the blocks and cars are inside the basket now.' }, { speaker: 'Mia', text: 'Thank you for helping! The room looks so tidy.' }] }
];

const CONVERSATIONS_GREETINGS = [
  { id: 'grt_conv_1', number: 1, title: 'Good Morning!', icon: '🌅', lines: [{ speaker: 'Mia', text: 'Good morning, Leo! Did you sleep well?' }, { speaker: 'Leo', text: 'Good morning, Mia! Yes, I slept great.' }, { speaker: 'Mia', text: 'The sun is shining brightly today.' }, { speaker: 'Leo', text: 'Let us have a happy day at school!' }] },
  { id: 'grt_conv_2', number: 2, title: 'Good Afternoon!', icon: '☀️', lines: [{ speaker: 'Leo', text: 'Good afternoon, Mia! Where are you going?' }, { speaker: 'Mia', text: 'Good afternoon, Leo! I am going to the library.' }, { speaker: 'Leo', text: 'May I walk with you? I want to read a book too.' }, { speaker: 'Mia', text: 'Sure! Let us go together.' }] },
  { id: 'grt_conv_3', number: 3, title: 'Good Evening!', icon: '🌇', lines: [{ speaker: 'Mia', text: 'Good evening, Leo! Welcome to our house.' }, { speaker: 'Leo', text: 'Good evening, Mia! Thank you for inviting me.' }, { speaker: 'Mia', text: 'Come inside, we are playing a board game.' }, { speaker: 'Leo', text: 'That sounds like so much fun!' }] },
  { id: 'grt_conv_4', number: 4, title: 'Good Night!', icon: '🌟', lines: [{ speaker: 'Leo', text: 'Look at the moon and stars outside the window.' }, { speaker: 'Mia', text: 'It is late now. Good night, Leo!' }, { speaker: 'Mia', text: 'See you in the morning!' }] },
  { id: 'grt_conv_5', number: 5, title: 'Meeting a New Friend', icon: '👋', lines: [{ speaker: 'Leo', text: 'Hello! I am Leo. Are you new in our class?' }, { speaker: 'Mia', text: 'Hi, Leo! Yes, today is my first day here.' }, { speaker: 'Leo', text: 'Welcome to our school! It is nice to meet you.' }, { speaker: 'Mia', text: 'Nice to meet you too, Leo!' }] },
  { id: 'grt_conv_6', number: 6, title: 'Asking Someone’s Name', icon: '🏷️', lines: [{ speaker: 'Mia', text: 'Hi there! What is your name?' }, { speaker: 'Leo', text: 'My name is Leo. What is your name?' }, { speaker: 'Mia', text: 'My name is Mia. How old are you, Leo?' }, { speaker: 'Leo', text: 'I am eight years old!' }, { speaker: 'Mia', text: 'Cool! I am eight years old too.' }] },
  { id: 'grt_conv_7', number: 7, title: 'How Are You Today?', icon: '😊', lines: [{ speaker: 'Leo', text: 'Hello, Mia! How are you doing today?' }, { speaker: 'Mia', text: 'I am doing great, thank you! How about you?' }, { speaker: 'Leo', text: 'I am very happy because we have art class today.' }, { speaker: 'Mia', text: 'Me too! I love painting colorful pictures.' }] },
  { id: 'grt_conv_8', number: 8, title: 'Saying Goodbye', icon: '🎒', lines: [{ speaker: 'Mia', text: 'The school bell is ringing. It is time to go home!' }, { speaker: 'Leo', text: 'Goodbye, Mia! Have a wonderful afternoon.' }, { speaker: 'Mia', text: 'Goodbye, Leo! Take care on your way home.' }, { speaker: 'Leo', text: 'Thank you! Bye-bye!' }] },
  { id: 'grt_conv_9', number: 9, title: 'See You Again Soon', icon: '🚀', lines: [{ speaker: 'Leo', text: 'Thank you for playing soccer with me at the park.' }, { speaker: 'Mia', text: 'That was awesome! Will you come back tomorrow?' }, { speaker: 'Leo', text: 'Yes! See you tomorrow afternoon.' }, { speaker: 'Mia', text: 'See you later, Leo!' }] },
  { id: 'grt_conv_10', number: 10, title: 'Introducing a Friend', icon: '🎉', lines: [{ speaker: 'Mia', text: 'Hi, Leo! I want you to meet my cousin, Sam.' }, { speaker: 'Leo', text: 'Hello, Sam! It is great to meet you.' }, { speaker: 'Mia', text: 'Sam loves playing English word games just like us.' }, { speaker: 'Leo', text: 'Wonderful! Let us all play together right now.' }] }
];

const ALPHABET_DATA = [
  { letter: 'A', word: 'Apple', emoji: '🍎' }, { letter: 'B', word: 'Ball', emoji: '⚽' }, { letter: 'C', word: 'Cat', emoji: '🐱' },
  { letter: 'D', word: 'Dog', emoji: '🐶' }, { letter: 'E', word: 'Elephant', emoji: '🐘' }, { letter: 'F', word: 'Fish', emoji: '🐠' },
  { letter: 'G', word: 'Goat', emoji: '🐐' }, { letter: 'H', word: 'Hat', emoji: '🎩' }, { letter: 'I', word: 'Ice cream', emoji: '🍦' },
  { letter: 'J', word: 'Juice', emoji: '🧃' }, { letter: 'K', word: 'Kite', emoji: '🪁' }, { letter: 'L', word: 'Lion', emoji: '🦁' },
  { letter: 'M', word: 'Monkey', emoji: '🐵' }, { letter: 'N', word: 'Nest', emoji: '🪺' }, { letter: 'O', word: 'Orange', emoji: '🍊' },
  { letter: 'P', word: 'Panda', emoji: '🐼' }, { letter: 'Q', word: 'Queen', emoji: '👑' }, { letter: 'R', word: 'Rabbit', emoji: '🐰' },
  { letter: 'S', word: 'Sun', emoji: '☀️' }, { letter: 'T', word: 'Tiger', emoji: '🐯' }, { letter: 'U', word: 'Umbrella', emoji: '☂️' },
  { letter: 'V', word: 'Violin', emoji: '🎻' }, { letter: 'W', word: 'Whale', emoji: '🐳' }, { letter: 'X', word: 'Xylophone', emoji: '🎼' },
  { letter: 'Y', word: 'Yo-yo', emoji: '🪀' }, { letter: 'Z', word: 'Zebra', emoji: '🦓' }
];

const NUMBERS_DATA = [
  { num: 0,  word: 'zero',      emoji: '⭕' }, { num: 1,  word: 'one',       emoji: '⭐', objName: 'star' }, { num: 2,  word: 'two',       emoji: '🍎', objName: 'apples' },
  { num: 3,  word: 'three',     emoji: '🎈', objName: 'balloons' }, { num: 4,  word: 'four',      emoji: '🚗', objName: 'cars' }, { num: 5,  word: 'five',      emoji: '🍓', objName: 'strawberries' },
  { num: 6,  word: 'six',       emoji: '🐥', objName: 'chicks' }, { num: 7,  word: 'seven',     emoji: '🌈', objName: 'rainbows' }, { num: 8,  word: 'eight',     emoji: '🦋', objName: 'butterflies' },
  { num: 9,  word: 'nine',      emoji: '🍪', objName: 'cookies' }, { num: 10, word: 'ten',       emoji: '⚽', objName: 'balls' }, { num: 11, word: 'eleven',    emoji: '🧁', objName: 'cupcakes' },
  { num: 12, word: 'twelve',    emoji: '🍒', objName: 'cherries' }, { num: 13, word: 'thirteen',  emoji: '🍭' }, { num: 14, word: 'fourteen',  emoji: '🐟' },
  { num: 15, word: 'fifteen',   emoji: '🌷' }, { num: 16, word: 'sixteen',   emoji: '🍊' }, { num: 17, word: 'seventeen', emoji: '💎' },
  { num: 18, word: 'eighteen',  emoji: '🐝' }, { num: 19, word: 'nineteen',  emoji: '🍀' }, { num: 20, word: 'twenty',    emoji: '🎁' },
  { num: 30, word: 'thirty',    emoji: '📦' }, { num: 40, word: 'forty',     emoji: '🧺' }, { num: 50, word: 'fifty',     emoji: '🌟' },
  { num: 60, word: 'sixty',     emoji: '🎯' }, { num: 70, word: 'seventy',   emoji: '🚀' }, { num: 80, word: 'eighty',    emoji: '🏆' },
  { num: 90, word: 'ninety',    emoji: '👑' }, { num: 100, word: 'one hundred', emoji: '💯' }
];

/********************************************************************
 * 6. BALANCED OPTION SHUFFLER & QUESTION BANK GENERATORS
 ********************************************************************/
function assignBalancedOptionOrders(questions) {
  let lastIdx = -1; let streak = 0;
  return questions.map((q, qIndex) => {
    if (q.type !== 'mcq' && q.type !== 'vocab_reading' && q.type !== 'vocab_chat') return q;
    if (!Array.isArray(q.options)) return q;
    const correctText = q.answer;
    const distractors = [...new Set(q.options.filter(o => o !== undefined && o !== null && o !== correctText))];
    const numOpts = Math.min(q.options.length, distractors.length + 1);
    for (let i = distractors.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [distractors[i], distractors[j]] = [distractors[j], distractors[i]]; }
    const candidates = [];
    for (let pos = 0; pos < numOpts; pos++) { if (streak >= 2 && pos === lastIdx) continue; candidates.push(pos); }
    const preferredPos = (qIndex + Math.floor(Math.random() * numOpts)) % numOpts;
    const targetPos = candidates.includes(preferredPos) ? preferredPos : candidates[Math.floor(Math.random() * candidates.length)];
    if (targetPos === lastIdx) { streak++; } else { lastIdx = targetPos; streak = 1; }
    const arranged = []; let dIdx = 0;
    for (let pos = 0; pos < numOpts; pos++) { if (pos === targetPos) { arranged.push(correctText); } else { arranged.push(distractors[dIdx++]); } }
    return { ...q, options: arranged, correctIndex: targetPos };
  });
}

const QUESTION_BANKS = (() => {
  const banks = {};
  const expMcqTemplates = [
    { p: 'What do you say when someone gives you a gift?', a: 'Thank you very much!', d: ['Go away now.', 'Give me two more.'], h: 'We thank people when we receive a gift.' },
    { p: 'How do you politely ask to use the restroom in class?', a: 'May I go to the restroom, please?', d: ['I am running outside!', 'Close the door now.'], h: 'Start with "May I..." and end with "please".' },
    { p: 'What should you say if you accidentally bump into a friend?', a: 'I am sorry! Are you okay?', d: ['That is your fault.', 'Look at my shoes.'], h: 'We apologize when we bump into someone.' },
    { p: 'Someone says "Thank you!" to you. What do you reply?', a: 'You are welcome!', d: ['Please help me.', 'I am hungry too.'], h: 'The polite reply to "Thank you" starts with "You are...".' },
    { p: 'You need a pencil from your classmate. What do you ask?', a: 'Can I borrow your pencil, please?', d: ['This pencil is mine now.', 'Throw the pencil here.'], h: 'Ask politely using "Can I borrow... please?".' },
    { p: 'A box is too heavy to carry alone. What do you say?', a: 'Could you help me, please?', d: ['Put the box on my head.', 'I do not like boxes.'], h: 'Ask for help politely.' },
    { p: 'What do we do right before eating our lunch?', a: 'Let us wash our hands with soap.', d: ['Let us jump on the bed.', 'Let us hide our shoes.'], h: 'Clean hands keep us healthy before meals.' },
    { p: 'Your teacher wants you to look at page five. What does she say?', a: 'Please open your book to page five.', d: ['Run around the playground.', 'Eat your lunch now.'], h: 'Think about reading a page in class.' },
    { p: 'It is nine o’clock at night and you are sleepy. What do you say?', a: 'It is time to go to bed.', d: ['It is time for breakfast.', 'Let us go to school now.'], h: 'At night when we are sleepy, we go to bed.' },
    { p: 'You want to help your mom clean up the toys. What do you say?', a: 'Can I help you put the toys away?', d: ['Make a bigger mess here.', 'Where is my bicycle?'], h: 'Offer to help put the toys away.' }
  ];
  banks['exp_quiz'] = expMcqTemplates.map((base, i) => ({ id: `exp_quiz_q${i + 1}`, type: 'mcq', prompt: base.p, speakPrompt: base.p, answer: base.a, options: [base.a, base.d[0], base.d[1]], hint: base.h }));

  const expBuilderSentences = [
    { prompt: 'Build the polite question to ask for help:', words: ['Could', 'you', 'help', 'me', 'please?'], hint: 'Start with "Could you..."' },
    { prompt: 'Build the polite sentence to borrow a book:', words: ['Can', 'I', 'borrow', 'your', 'book?'], hint: 'Start with "Can I borrow..."' },
    { prompt: 'Build the polite expression to thank your teacher:', words: ['Thank', 'you', 'very', 'much!'], hint: 'Start with "Thank you..."' },
    { prompt: 'Build the classroom permission question:', words: ['May', 'I', 'come', 'in', 'please?'], hint: 'Start with "May I..."' },
    { prompt: 'Build the apology sentence:', words: ['I', 'am', 'very', 'sorry!'], hint: 'Start with "I am..."' },
    { prompt: 'Build the hand-washing reminder:', words: ['Let', 'us', 'wash', 'our', 'hands.'], hint: 'Start with "Let us..."' },
    { prompt: 'Build the friendly reply to thank you:', words: ['You', 'are', 'very', 'welcome!'], hint: 'Start with "You are..."' },
    { prompt: 'Build the bedtime sentence:', words: ['It', 'is', 'time', 'for', 'bed.'], hint: 'Start with "It is time..."' },
    { prompt: 'Build the classroom instruction:', words: ['Please', 'open', 'your', 'English', 'book.'], hint: 'Start with "Please open..."' },
    { prompt: 'Build the polite offer at home:', words: ['Can', 'I', 'help', 'you', 'clean?'], hint: 'Start with "Can I help..."' }
  ];
  banks['exp_builder'] = expBuilderSentences.map((item, i) => ({ id: `exp_builder_q${i + 1}`, type: 'dnd', categoryMode: 'expression', prompt: item.prompt, speakPrompt: item.prompt, targetSlots: item.words, bankTiles: [...item.words].reverse(), spokenAnswer: item.words.join(' '), hint: item.hint }));

  const grtMcqTemplates = [
    { p: 'You wake up at seven o’clock in the morning. How do you greet your family?', a: 'Good morning!', d: ['Good night!', 'Goodbye tomorrow!'], h: 'In the morning, we say "Good morning!".' },
    { p: 'It is two o’clock in the afternoon. How do you greet your teacher?', a: 'Good afternoon!', d: ['Good morning!', 'Sweet dreams!'], h: 'In the afternoon, we say "Good afternoon!".' },
    { p: 'You meet a new classmate for the first time. What do you say?', a: 'Nice to meet you!', d: ['See you yesterday!', 'Go to sleep now!'], h: 'When meeting a new friend, say "Nice to meet you!".' },
    { p: 'Your friend asks, "How are you today?" What is the best reply?', a: 'I am doing great, thank you!', d: ['My name is seven.', 'Open the window.'], h: 'Tell your friend how you are doing and say thank you.' },
    { p: 'You are about to go to sleep at night. What do you say to your parents?', a: 'Good night! Sweet dreams.', d: ['Good morning, class!', 'Nice to meet you!'], h: 'Before sleeping at night, we say "Good night!".' },
    { p: 'You want to know a new friend’s name. What do you ask?', a: 'What is your name?', d: ['Where is my pencil?', 'What time is lunch?'], h: 'Ask "What is your name?".' },
    { p: 'School is finished and you are walking home. What do you say to your friends?', a: 'Goodbye! See you tomorrow!', d: ['Good morning, everyone!', 'Welcome to breakfast!'], h: 'When leaving, we say "Goodbye! See you tomorrow!".' },
    { p: 'It is six o’clock in the evening. How do you greet your neighbors?', a: 'Good evening!', d: ['Good morning!', 'Happy birthday!'], h: 'In the evening, we say "Good evening!".' },
    { p: 'How do you introduce your friend Sam to Mia?', a: 'Mia, this is my friend Sam.', d: ['Mia, close your notebook.', 'Sam is eating an apple.'], h: 'Use "this is my friend..." to introduce someone.' },
    { p: 'Someone asks, "What is your name?" How do you answer?', a: 'My name is Leo.', d: ['I am going home.', 'Thank you very much.'], h: 'Answer with "My name is...".' }
  ];
  banks['grt_quiz'] = grtMcqTemplates.map((base, i) => ({ id: `grt_quiz_q${i + 1}`, type: 'mcq', prompt: base.p, speakPrompt: base.p, answer: base.a, options: [base.a, base.d[0], base.d[1]], hint: base.h }));

  const grtBuilderSentences = [
    { prompt: 'Build the morning greeting:', words: ['Good', 'morning,', 'how', 'are', 'you?'], hint: 'Start with "Good morning,"' },
    { prompt: 'Build the sentence when meeting a new friend:', words: ['It', 'is', 'nice', 'to', 'meet', 'you!'], hint: 'Start with "It is nice..."' },
    { prompt: 'Build the question to ask someone’s name:', words: ['What', 'is', 'your', 'name?'], hint: 'Start with "What is..."' },
    { prompt: 'Build the friendly farewell for tomorrow:', words: ['Goodbye!', 'See', 'you', 'tomorrow!'], hint: 'Start with "Goodbye!"' },
    { prompt: 'Build the polite response to "How are you?":', words: ['I', 'am', 'fine,', 'thank', 'you!'], hint: 'Start with "I am fine,"' },
    { prompt: 'Build the bedtime greeting:', words: ['Good', 'night', 'and', 'sweet', 'dreams!'], hint: 'Start with "Good night..."' },
    { prompt: 'Build the self-introduction sentence:', words: ['Hello,', 'my', 'name', 'is', 'Mia.'], hint: 'Start with "Hello, my name..."' },
    { prompt: 'Build the friend introduction:', words: ['This', 'is', 'my', 'friend', 'Leo.'], hint: 'Start with "This is..."' },
    { prompt: 'Build the afternoon greeting:', words: ['Good', 'afternoon,', 'Miss', 'Sara!'], hint: 'Start with "Good afternoon,"' },
    { prompt: 'Build the welcome sentence:', words: ['Welcome', 'to', 'our', 'English', 'class!'], hint: 'Start with "Welcome to..."' }
  ];
  banks['grt_builder'] = grtBuilderSentences.map((item, i) => ({ id: `grt_builder_q${i + 1}`, type: 'dnd', categoryMode: 'greeting', prompt: item.prompt, speakPrompt: item.prompt, targetSlots: item.words, bankTiles: [...item.words].reverse(), spokenAnswer: item.words.join(' '), hint: item.hint }));

  function getEnglishNumberWord(n) {
    const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    if (n === 100) return 'one hundred';
    if (n < 20) return ones[n];
    const t = Math.floor(n / 10);
    const rem = n % 10;
    return rem === 0 ? tens[t] : `${tens[t]}-${ones[rem]}`;
  }
  window.getEnglishNumberWord = getEnglishNumberWord;

  const ALPHA_MATCH_WORDS = [
    { w: 'Ant', e: '🐜' }, { w: 'Ape', e: '🦧' }, { w: 'Apple', e: '🍎' }, { w: 'Axe', e: '🪓' },
    { w: 'Bag', e: '🎒' }, { w: 'Ball', e: '⚽' }, { w: 'Bat', e: '🦇' }, { w: 'Bear', e: '🐻' },
    { w: 'Bed', e: '🛏️' }, { w: 'Bee', e: '🐝' }, { w: 'Bell', e: '🔔' }, { w: 'Bird', e: '🐦' },
    { w: 'Boat', e: '⛵' }, { w: 'Book', e: '📖' }, { w: 'Box', e: '📦' }, { w: 'Boy', e: '👦' },
    { w: 'Bus', e: '🚌' }, { w: 'Cake', e: '🎂' }, { w: 'Camp', e: '🏕️' }, { w: 'Cap', e: '🧢' },
    { w: 'Car', e: '🚗' }, { w: 'Cat', e: '🐱' }, { w: 'Cow', e: '🐮' }, { w: 'Crab', e: '🦀' },
    { w: 'Cup', e: '🥤' }, { w: 'Deer', e: '🦌' }, { w: 'Desk', e: '🪵' }, { w: 'Dog', e: '🐶' },
    { w: 'Door', e: '🚪' }, { w: 'Drum', e: '🥁' }, { w: 'Duck', e: '🦆' }, { w: 'Egg', e: '🥚' },
    { w: 'Fan', e: '🪭' }, { w: 'Fish', e: '🐟' }, { w: 'Flag', e: '🚩' }, { w: 'Fox', e: '🦊' },
    { w: 'Frog', e: '🐸' }, { w: 'Gift', e: '🎁' }, { w: 'Girl', e: '👧' }, { w: 'Goat', e: '🐐' },
    { w: 'Gold', e: '🪙' }, { w: 'Grape', e: '🍇' }, { w: 'Hand', e: '✋' }, { w: 'Hat', e: '🎩' },
    { w: 'Hen', e: '🐔' }, { w: 'Hill', e: '⛰️' }, { w: 'Home', e: '🏠' }, { w: 'Horn', e: '📯' },
    { w: 'Horse', e: '🐴' }, { w: 'Ice', e: '🧊' }, { w: 'Jam', e: '🍯' }, { w: 'Jar', e: '🫙' },
    { w: 'Key', e: '🔑' }, { w: 'King', e: '👑' }, { w: 'Kite', e: '🪁' }, { w: 'Kiwi', e: '🥝' },
    { w: 'Lamp', e: '💡' }, { w: 'Leaf', e: '🍃' }, { w: 'Lion', e: '🦁' }, { w: 'Lock', e: '🔒' },
    { w: 'Map', e: '🗺️' }, { w: 'Milk', e: '🥛' }, { w: 'Moon', e: '🌙' }, { w: 'Mug', e: '☕' },
    { w: 'Nest', e: '🪺' }, { w: 'Net', e: '🥅' }, { w: 'Nose', e: '👃' }, { w: 'Nut', e: '🥜' },
    { w: 'Owl', e: '🦉' }, { w: 'Pan', e: '🍳' }, { w: 'Pear', e: '🍐' }, { w: 'Pen', e: '🖊️' },
    { w: 'Pig', e: '🐷' }, { w: 'Plum', e: '🫐' }, { w: 'Pot', e: '🪴' }, { w: 'Rain', e: '🌧️' },
    { w: 'Ring', e: '💍' }, { w: 'Rose', e: '🌹' }, { w: 'Seal', e: '🦭' }, { w: 'Ship', e: '🚢' },
    { w: 'Shoe', e: '👟' }, { w: 'Star', e: '⭐' }, { w: 'Sun', e: '☀️' }, { w: 'Tent', e: '⛺' },
    { w: 'Tiger', e: '🐯' }, { w: 'Toy', e: '🪀' }, { w: 'Tree', e: '🌳' }, { w: 'Tub', e: '🛁' },
    { w: 'Van', e: '🚐' }, { w: 'Vase', e: '🏺' }, { w: 'Vest', e: '🦺' }, { w: 'Wall', e: '🧱' },
    { w: 'Watch', e: '⌚' }, { w: 'Well', e: '🪣' }, { w: 'Wolf', e: '🐺' }, { w: 'Worm', e: '🪱' },
    { w: 'Yak', e: '🐂' }, { w: 'Yarn', e: '🧶' }, { w: 'Zebra', e: '🦓' }, { w: 'Zoo', e: '🦁' }
  ];

  const ALPHA_PIC_ITEMS = [
    { letter: 'A', word: 'Apple', emoji: '🍎' }, { letter: 'A', word: 'Ant', emoji: '🐜' }, { letter: 'A', word: 'Airplane', emoji: '✈️' }, { letter: 'A', word: 'Avocado', emoji: '🥑' },
    { letter: 'B', word: 'Ball', emoji: '⚽' }, { letter: 'B', word: 'Bear', emoji: '🐻' }, { letter: 'B', word: 'Banana', emoji: '🍌' }, { letter: 'B', word: 'Butterfly', emoji: '🦋' },
    { letter: 'C', word: 'Cat', emoji: '🐱' }, { letter: 'C', word: 'Car', emoji: '🚗' }, { letter: 'C', word: 'Carrot', emoji: '🥕' }, { letter: 'C', word: 'Cake', emoji: '🎂' },
    { letter: 'D', word: 'Dog', emoji: '🐶' }, { letter: 'D', word: 'Duck', emoji: '🦆' }, { letter: 'D', word: 'Dolphin', emoji: '🐬' }, { letter: 'D', word: 'Drum', emoji: '🥁' },
    { letter: 'E', word: 'Elephant', emoji: '🐘' }, { letter: 'E', word: 'Egg', emoji: '🥚' }, { letter: 'E', word: 'Eagle', emoji: '🦅' }, { letter: 'E', word: 'Earth', emoji: '🌍' },
    { letter: 'F', word: 'Fish', emoji: '🐟' }, { letter: 'F', word: 'Frog', emoji: '🐸' }, { letter: 'F', word: 'Fox', emoji: '🦊' }, { letter: 'F', word: 'Flower', emoji: '🌸' },
    { letter: 'G', word: 'Goat', emoji: '🐐' }, { letter: 'G', word: 'Grapes', emoji: '🍇' }, { letter: 'G', word: 'Guitar', emoji: '🎸' }, { letter: 'G', word: 'Giraffe', emoji: '🦒' },
    { letter: 'H', word: 'Hat', emoji: '🎩' }, { letter: 'H', word: 'Horse', emoji: '🐴' }, { letter: 'H', word: 'House', emoji: '🏠' }, { letter: 'H', word: 'Heart', emoji: '❤️' },
    { letter: 'I', word: 'Ice cream', emoji: '🍦' }, { letter: 'I', word: 'Igloo', emoji: '🛖' }, { letter: 'I', word: 'Island', emoji: '🏝️' }, { letter: 'I', word: 'Iguana', emoji: '🦎' },
    { letter: 'J', word: 'Juice', emoji: '🧃' }, { letter: 'J', word: 'Jellyfish', emoji: '🪼' }, { letter: 'J', word: 'Jacket', emoji: '🧥' }, { letter: 'J', word: 'Jam', emoji: '🍯' },
    { letter: 'K', word: 'Kite', emoji: '🪁' }, { letter: 'K', word: 'Kangaroo', emoji: '🦘' }, { letter: 'K', word: 'Key', emoji: '🔑' }, { letter: 'K', word: 'Kiwi', emoji: '🥝' },
    { letter: 'L', word: 'Lion', emoji: '🦁' }, { letter: 'L', word: 'Leaf', emoji: '🍃' }, { letter: 'L', word: 'Lemon', emoji: '🍋' }, { letter: 'L', word: 'Lollipop', emoji: '🍭' },
    { letter: 'M', word: 'Monkey', emoji: '🐵' }, { letter: 'M', word: 'Moon', emoji: '🌙' }, { letter: 'M', word: 'Mushroom', emoji: '🍄' }, { letter: 'M', word: 'Mango', emoji: '🥭' },
    { letter: 'N', word: 'Nest', emoji: '🪺' }, { letter: 'N', word: 'Nut', emoji: '🥜' }, { letter: 'N', word: 'Net', emoji: '🥅' }, { letter: 'N', word: 'Notebook', emoji: '📓' },
    { letter: 'O', word: 'Orange', emoji: '🍊' }, { letter: 'O', word: 'Owl', emoji: '🦉' }, { letter: 'O', word: 'Octopus', emoji: '🐙' }, { letter: 'O', word: 'Onion', emoji: '🧅' },
    { letter: 'P', word: 'Panda', emoji: '🐼' }, { letter: 'P', word: 'Penguin', emoji: '🐧' }, { letter: 'P', word: 'Pizza', emoji: '🍕' }, { letter: 'P', word: 'Pencil', emoji: '✏️' },
    { letter: 'Q', word: 'Queen', emoji: '👑' }, { letter: 'Q', word: 'Quill', emoji: '🪶' }, { letter: 'Q', word: 'Quilt', emoji: '🧵' }, { letter: 'Q', word: 'Question', emoji: '❓' },
    { letter: 'R', word: 'Rabbit', emoji: '🐰' }, { letter: 'R', word: 'Rainbow', emoji: '🌈' }, { letter: 'R', word: 'Rocket', emoji: '🚀' }, { letter: 'R', word: 'Ring', emoji: '💍' },
    { letter: 'S', word: 'Sun', emoji: '☀️' }, { letter: 'S', word: 'Star', emoji: '⭐' }, { letter: 'S', word: 'Strawberry', emoji: '🍓' }, { letter: 'S', word: 'Ship', emoji: '🚢' },
    { letter: 'T', word: 'Tiger', emoji: '🐯' }, { letter: 'T', word: 'Tree', emoji: '🌳' }, { letter: 'T', word: 'Tomato', emoji: '🍅' }, { letter: 'T', word: 'Train', emoji: '🚂' },
    { letter: 'U', word: 'Umbrella', emoji: '☂️' }, { letter: 'U', word: 'Unicorn', emoji: '🦄' }, { letter: 'U', word: 'UFO', emoji: '🛸' }, { letter: 'U', word: 'Ukulele', emoji: '🪕' },
    { letter: 'V', word: 'Violin', emoji: '🎻' }, { letter: 'V', word: 'Van', emoji: '🚐' }, { letter: 'V', word: 'Volcano', emoji: '🌋' }, { letter: 'V', word: 'Vase', emoji: '🏺' },
    { letter: 'W', word: 'Whale', emoji: '🐳' }, { letter: 'W', word: 'Watermelon', emoji: '🍉' }, { letter: 'W', word: 'Watch', emoji: '⌚' }, { letter: 'W', word: 'Wolf', emoji: '🐺' },
    { letter: 'X', word: 'Xylophone', emoji: '🎼' }, { letter: 'X', word: 'X-ray', emoji: '🩻' },
    { letter: 'Y', word: 'Yo-yo', emoji: '🪀' }, { letter: 'Y', word: 'Yacht', emoji: '⛵' }, { letter: 'Y', word: 'Yarn', emoji: '🧶' },
    { letter: 'Z', word: 'Zebra', emoji: '🦓' }, { letter: 'Z', word: 'Zipper', emoji: '🤐' }, { letter: 'Z', word: 'Zoo', emoji: '🦁' }
  ];

  const COUNT_OBJECTS = [
    { c: 1, name: 'star', e: '⭐' }, { c: 1, name: 'sun', e: '☀️' }, { c: 1, name: 'moon', e: '🌙' }, { c: 1, name: 'crown', e: '👑' }, { c: 1, name: 'elephant', e: '🐘' },
    { c: 2, name: 'apples', e: '🍎' }, { c: 2, name: 'cherries', e: '🍒' }, { c: 2, name: 'shoes', e: '👟' }, { c: 2, name: 'birds', e: '🐦' }, { c: 2, name: 'eyes', e: '👀' },
    { c: 3, name: 'balloons', e: '🎈' }, { c: 3, name: 'cars', e: '🚗' }, { c: 3, name: 'trees', e: '🌳' }, { c: 3, name: 'fish', e: '🐟' }, { c: 3, name: 'cats', e: '🐱' },
    { c: 4, name: 'strawberries', e: '🍓' }, { c: 4, name: 'cookies', e: '🍪' }, { c: 4, name: 'cupcakes', e: '🧁' }, { c: 4, name: 'balls', e: '⚽' }, { c: 4, name: 'dogs', e: '🐶' },
    { c: 5, name: 'chicks', e: '🐥' }, { c: 5, name: 'frogs', e: '🐸' }, { c: 5, name: 'candies', e: '🍬' }, { c: 5, name: 'hats', e: '🎩' }, { c: 5, name: 'books', e: '📖' },
    { c: 6, name: 'butterflies', e: '🦋' }, { c: 6, name: 'bees', e: '🐝' }, { c: 6, name: 'flowers', e: '🌸' }, { c: 6, name: 'carrots', e: '🥕' }, { c: 6, name: 'pencils', e: '✏️' },
    { c: 7, name: 'rainbows', e: '🌈' }, { c: 7, name: 'gems', e: '💎' }, { c: 7, name: 'lollipops', e: '🍭' }, { c: 7, name: 'umbrellas', e: '☂️' }, { c: 7, name: 'leaves', e: '🍃' },
    { c: 8, name: 'oranges', e: '🍊' }, { c: 8, name: 'mushrooms', e: '🍄' }, { c: 8, name: 'bananas', e: '🍌' }, { c: 8, name: 'bells', e: '🔔' }, { c: 8, name: 'rings', e: '💍' },
    { c: 9, name: 'clovers', e: '🍀' }, { c: 9, name: 'rockets', e: '🚀' }, { c: 9, name: 'donuts', e: '🍩' }, { c: 9, name: 'gifts', e: '🎁' }, { c: 9, name: 'ladybugs', e: '🐞' },
    { c: 10, name: 'pizzas', e: '🍕' }, { c: 10, name: 'watermelons', e: '🍉' }, { c: 10, name: 'turtles', e: '🐢' }, { c: 10, name: 'ice creams', e: '🍦' }, { c: 10, name: 'ducks', e: '🦆' },
    { c: 11, name: 'keys', e: '🔑' }, { c: 11, name: 'boats', e: '⛵' }, { c: 11, name: 'grapes', e: '🍇' }, { c: 11, name: 'socks', e: '🧦' }, { c: 11, name: 'pens', e: '🖊️' },
    { c: 12, name: 'watches', e: '⌚' }, { c: 12, name: 'robots', e: '🤖' }, { c: 12, name: 'trains', e: '🚂' }, { c: 12, name: 'guitars', e: '🎸' }, { c: 12, name: 'kites', e: '🪁' },
    { c: 13, name: 'crayons', e: '🖍️' }, { c: 13, name: 'drums', e: '🥁' }, { c: 13, name: 'hearts', e: '❤️' }, { c: 13, name: 'planes', e: '✈️' }, { c: 13, name: 'cups', e: '🥤' },
    { c: 14, name: 'coins', e: '🪙' }, { c: 14, name: 'crabs', e: '🦀' }, { c: 14, name: 'pearls', e: '🦪' }, { c: 14, name: 'houses', e: '🏠' }, { c: 14, name: 'lamps', e: '💡' },
    { c: 15, name: 'stars', e: '🌟' }, { c: 15, name: 'green apples', e: '🍏' }, { c: 15, name: 'chocolate cookies', e: '🍪' }, { c: 15, name: 'party balloons', e: '🎈' }, { c: 15, name: 'colored pencils', e: '✏️' },
    { c: 16, name: 'fresh strawberries', e: '🍓' }, { c: 16, name: 'blossoms', e: '🌺' }, { c: 16, name: 'red cherries', e: '🍒' }, { c: 16, name: 'baby chicks', e: '🐣' }, { c: 16, name: 'sweet candies', e: '🍬' },
    { c: 17, name: 'blue butterflies', e: '🦋' }, { c: 17, name: 'diamonds', e: '💎' }, { c: 17, name: 'honey bees', e: '🐝' }, { c: 17, name: 'little frogs', e: '🐸' }, { c: 17, name: 'fruit lollipops', e: '🍭' },
    { c: 18, name: 'sweet oranges', e: '🍊' }, { c: 18, name: 'lucky clovers', e: '🍀' }, { c: 18, name: 'glazed donuts', e: '🍩' }, { c: 18, name: 'tropical fish', e: '🐠' }, { c: 18, name: 'golden bells', e: '🔔' },
    { c: 19, name: 'vanilla cupcakes', e: '🧁' }, { c: 19, name: 'garden ladybugs', e: '🐞' }, { c: 19, name: 'forest mushrooms', e: '🍄' }, { c: 19, name: 'soccer balls', e: '⚽' }, { c: 19, name: 'autumn leaves', e: '🍂' },
    { c: 20, name: 'bright stars', e: '⭐' }, { c: 20, name: 'wrapped gifts', e: '🎁' }, { c: 20, name: 'sparkling hearts', e: '💖' }, { c: 20, name: 'gold coins', e: '🪙' }, { c: 20, name: 'magic gems', e: '💎' }
  ];

  const alphaChars = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const alphaUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // 1. alpha_match (100 distinct questions)
  banks['alpha_match'] = [];
  for (let i = 0; i < ALPHA_MATCH_WORDS.length; i++) {
    const item = ALPHA_MATCH_WORDS[i];
    const letters = item.w.toUpperCase().split('');
    const targetSlots = letters.map(l => l.toLowerCase());
    const unusedLetters = alphaChars.filter(c => !targetSlots.includes(c));
    const d1 = unusedLetters[(i * 3) % unusedLetters.length];
    const d2 = unusedLetters[(i * 3 + 7) % unusedLetters.length];
    let tiles = [...targetSlots, d1, d2].reverse();
    if (tiles.slice(0, targetSlots.length).join('') === targetSlots.join('')) {
      [tiles[0], tiles[tiles.length - 1]] = [tiles[tiles.length - 1], tiles[0]];
    }
    banks['alpha_match'].push({
      id: `alpha_match_q${i + 1}`,
      type: 'dnd',
      categoryMode: 'alphabet_spell',
      prompt: `Match the lowercase letters to spell "${item.w}" (${item.e}): ${letters.join(' - ')}`,
      speakPrompt: `Drag the matching lowercase letters for ${item.w}.`,
      targetSlots: targetSlots,
      bankTiles: tiles,
      wholeWord: item.w,
      spokenAnswer: item.w,
      hint: `Match uppercase ${letters.join(', ')} to lowercase ${targetSlots.join(', ')}.`
    });
  }

  // 2. alpha_order (100 distinct questions)
  banks['alpha_order'] = [];
  const alphaOrderSeqs = [];
  for (let i = 0; i <= 22; i++) alphaOrderSeqs.push([alphaUpper[i], alphaUpper[i+1], alphaUpper[i+2], alphaUpper[i+3]]);
  for (let i = 0; i <= 19; i++) alphaOrderSeqs.push([alphaUpper[i], alphaUpper[i+2], alphaUpper[i+4], alphaUpper[i+6]]);
  for (let i = 0; i <= 16; i++) alphaOrderSeqs.push([alphaUpper[i], alphaUpper[i+3], alphaUpper[i+6], alphaUpper[i+9]]);
  for (let i = 0; i <= 19; i++) alphaOrderSeqs.push([alphaUpper[i], alphaUpper[i+1], alphaUpper[i+3], alphaUpper[i+4]]);
  for (let i = 0; i <= 19; i++) alphaOrderSeqs.push([alphaUpper[i], alphaUpper[i+2], alphaUpper[i+3], alphaUpper[i+4]]);
  for (let i = 0; i < alphaOrderSeqs.length; i++) {
    const seq = alphaOrderSeqs[i];
    const bankTiles = [seq[2], seq[0], seq[3], seq[1]];
    banks['alpha_order'].push({
      id: `alpha_order_q${i + 1}`,
      type: 'dnd',
      categoryMode: 'alphabet_order',
      prompt: 'Drag these letters into the correct ABC order!',
      speakPrompt: 'Drag these letters into the correct A B C order!',
      targetSlots: seq,
      bankTiles: bankTiles,
      spokenAnswer: seq.join(', '),
      hint: `This sequence starts with the letter ${seq[0]} and ends with ${seq[3]}.`
    });
  }

  // 3. alpha_missing (100 distinct questions)
  banks['alpha_missing'] = [];
  const alphaMissDefs = [];
  for (let i = 0; i <= 22; i++) alphaMissDefs.push({ disp: `${alphaUpper[i]}  ,  ${alphaUpper[i+1]}  ,  _  ,  ${alphaUpper[i+3]}`, ans: alphaUpper[i+2], prev: alphaUpper[i+1], speak: `Which letter comes after ${LETTER_NAME_SPOKEN[alphaUpper[i+1]]}?` });
  for (let i = 0; i <= 22; i++) alphaMissDefs.push({ disp: `${alphaUpper[i]}  ,  _  ,  ${alphaUpper[i+2]}  ,  ${alphaUpper[i+3]}`, ans: alphaUpper[i+1], prev: alphaUpper[i], speak: `Which letter comes after ${LETTER_NAME_SPOKEN[alphaUpper[i]]}?` });
  for (let i = 0; i <= 22; i++) alphaMissDefs.push({ disp: `${alphaUpper[i]}  ,  ${alphaUpper[i+1]}  ,  ${alphaUpper[i+2]}  ,  _`, ans: alphaUpper[i+3], prev: alphaUpper[i+2], speak: `Which letter comes after ${LETTER_NAME_SPOKEN[alphaUpper[i+2]]}?` });
  for (let i = 0; i <= 22; i++) alphaMissDefs.push({ disp: `_  ,  ${alphaUpper[i+1]}  ,  ${alphaUpper[i+2]}  ,  ${alphaUpper[i+3]}`, ans: alphaUpper[i], prev: null, speak: `Which letter comes before ${LETTER_NAME_SPOKEN[alphaUpper[i+1]]}?` });
  for (let i = 0; i < 8; i++) alphaMissDefs.push({ disp: `${alphaUpper[i]}  ,  ${alphaUpper[i+2]}  ,  _  ,  ${alphaUpper[i+6]}`, ans: alphaUpper[i+4], prev: alphaUpper[i+2], speak: `Which letter is missing between ${LETTER_NAME_SPOKEN[alphaUpper[i+2]]} and ${LETTER_NAME_SPOKEN[alphaUpper[i+6]]}?` });
  for (let i = 0; i < alphaMissDefs.length; i++) {
    const def = alphaMissDefs[i];
    const ans = def.ans;
    const ansIdx = alphaUpper.indexOf(ans);
    const d1 = alphaUpper[(ansIdx + 4) % 26];
    const d2 = alphaUpper[(ansIdx + 11) % 26];
    banks['alpha_missing'].push({
      id: `alpha_missing_q${i + 1}`,
      type: 'mcq',
      isLetterQuestion: true,
      targetLetter: ans,
      prompt: `Which letter is missing?  ${def.disp}`,
      speakPrompt: def.speak,
      answer: ans,
      options: [ans, d1, d2],
      hint: def.prev ? `Count the alphabet: after ${def.prev} comes ${ans}!` : `Count the alphabet: before ${alphaUpper[alphaUpper.indexOf(ans) + 1]} is ${ans}!`
    });
  }

  // 4. alpha_pic (100 distinct questions)
  banks['alpha_pic'] = [];
  for (let i = 0; i < ALPHA_PIC_ITEMS.length; i++) {
    const item = ALPHA_PIC_ITEMS[i];
    const target = item.letter;
    const tIdx = alphaUpper.indexOf(target);
    const d1 = alphaUpper[(tIdx + 4) % 26];
    const d2 = alphaUpper[(tIdx + 9) % 26];
    banks['alpha_pic'].push({
      id: `alpha_pic_q${i + 1}`,
      type: 'mcq',
      isLetterQuestion: true,
      targetLetter: target,
      prompt: `<div style="display:flex; flex-direction:column; gap:6px;"><div style="font-size:3.5rem; line-height:1;">${item.emoji}</div><div>What is the first letter of "${item.word}"?</div></div>`,
      speakPrompt: `What is the first letter of ${item.word}?`,
      answer: target,
      options: [target, d1, d2],
      hint: `Look at the first letter of "${item.word}".`
    });
  }

  // 5. num_count (100 distinct questions)
  banks['num_count'] = [];
  for (let i = 0; i < COUNT_OBJECTS.length; i++) {
    const item = COUNT_OBJECTS[i];
    const count = item.c;
    const word = getEnglishNumberWord(count);
    const iconsHtml = Array(count).fill(`<span style="margin-right:8px; margin-bottom:4px;">${item.e}</span>`).join('');
    const d1 = count === 1 ? 2 : count - 1;
    const d2 = count === 20 ? 18 : (count === 1 ? 3 : count + 1);
    const d1Word = getEnglishNumberWord(d1);
    const d2Word = getEnglishNumberWord(d2);
    const ansText = `${count} (${word})`;
    banks['num_count'].push({
      id: `num_count_q${i + 1}`,
      type: 'mcq',
      prompt: `<div style="display:flex; flex-direction:column; gap:6px;"><div style="font-size:2.8rem; line-height:1.2; display:flex; flex-wrap:wrap;">${iconsHtml}</div><div>Count the ${item.name}. How many are there?</div></div>`,
      speakPrompt: `Count the ${item.name}! How many are there?`,
      answer: ansText,
      spokenAnswer: word,
      options: [ansText, `${d1} (${d1Word})`, `${d2} (${d2Word})`],
      hint: `Point and count one by one up to ${count}.`
    });
  }

  // 6. num_order (100 distinct questions)
  banks['num_order'] = [];
  const numOrderSeqs = [];
  for (let i = 0; i <= 29; i++) numOrderSeqs.push([i, i+1, i+2, i+3]);
  for (let i = 2; i <= 30; i += 2) numOrderSeqs.push([i, i+2, i+4, i+6]);
  for (let i = 1; i <= 29; i += 2) numOrderSeqs.push([i, i+2, i+4, i+6]);
  for (let i = 5; i <= 75; i += 5) numOrderSeqs.push([i, i+5, i+10, i+15]);
  numOrderSeqs.push([85, 90, 95, 100]);
  for (let i = 10; i <= 70; i += 10) numOrderSeqs.push([i, i+10, i+20, i+30]);
  const irregularSets = [
    [3, 7, 12, 18], [4, 9, 15, 22], [5, 11, 18, 26], [6, 13, 21, 30], [7, 14, 25, 35],
    [8, 17, 28, 40], [9, 19, 32, 45], [11, 23, 37, 50], [12, 26, 42, 60], [14, 29, 48, 65],
    [15, 33, 52, 70], [16, 36, 58, 75], [18, 41, 64, 80], [20, 45, 70, 88], [22, 50, 75, 92],
    [25, 55, 80, 98], [30, 60, 85, 100]
  ];
  irregularSets.forEach(s => numOrderSeqs.push(s));
  for (let i = 0; i < numOrderSeqs.length; i++) {
    const seq = numOrderSeqs[i].map(String);
    const bankTiles = [seq[2], seq[0], seq[3], seq[1]];
    banks['num_order'].push({
      id: `num_order_q${i + 1}`,
      type: 'dnd',
      categoryMode: 'number_order',
      prompt: 'Drag these numbers in order from smallest to largest!',
      speakPrompt: 'Drag these numbers in order from smallest to largest!',
      targetSlots: seq,
      bankTiles: bankTiles,
      spokenAnswer: seq.join(', '),
      hint: `Start with the smallest number (${seq[0]}) and finish with ${seq[3]}.`
    });
  }

  // 7. num_word (100 distinct questions)
  banks['num_word'] = [];
  for (let n = 1; n <= 100; n++) {
    const word = getEnglishNumberWord(n);
    let d1Num, d2Num;
    if (n === 100) { d1Num = 10; d2Num = 90; }
    else if (n <= 12) { d1Num = n + 2; d2Num = n + 5; }
    else if (n >= 13 && n <= 19) { d1Num = (n - 10) * 10; d2Num = n - 10; }
    else if (n % 10 === 0) { d1Num = (n / 10) + 10; d2Num = n === 90 ? 80 : n + 10; }
    else {
      const reversed = parseInt(String(n).split('').reverse().join(''), 10);
      d1Num = (reversed <= 100 && reversed !== n) ? reversed : (n + 1);
      d2Num = (n % 10 === 9) ? n - 1 : n + 1;
      if (d2Num === d1Num) d2Num = n - 2;
    }
    const d1 = getEnglishNumberWord(d1Num);
    const d2 = getEnglishNumberWord(d2Num);
    banks['num_word'].push({
      id: `num_word_q${n}`,
      type: 'mcq',
      prompt: `Which English word matches the number  ${n} ?`,
      speakPrompt: `Which word matches the number ${word}?`,
      answer: word,
      options: [word, d1, d2],
      hint: `The number ${n} is spelled "${word}".`
    });
  }

  // 8. num_listen (100 distinct questions)
  banks['num_listen'] = [];
  for (let n = 1; n <= 100; n++) {
    const word = getEnglishNumberWord(n);
    let d1Num, d2Num;
    if (n === 100) {
      d1Num = 10;
      d2Num = 90;
    } else {
      const rev = parseInt(String(n).split('').reverse().join(''), 10);
      if (rev <= 100 && rev !== n && rev > 0) {
        d1Num = rev;
      } else {
        d1Num = n > 10 ? n - 10 : n + 10;
      }
      d2Num = n <= 90 ? n + 1 : n - 1;
      if (d2Num === d1Num || d2Num === n) {
        d2Num = n <= 90 ? n + 2 : n - 2;
      }
    }
    const d1 = String(d1Num);
    const d2 = String(d2Num);
    banks['num_listen'].push({
      id: `num_listen_q${n}`,
      type: 'mcq',
      prompt: `🔊 Listen to the teacher and choose the correct number!`,
      speakPrompt: `Find the number ${word}.`,
      answer: String(n),
      spokenAnswer: word,
      options: [String(n), d1, d2],
      hint: `Listen for "${word}".`
    });
  }

  // 9. num_missing (100 distinct questions)
  banks['num_missing'] = [];
  const numMissDefs = [];
  for (let i = 1; i <= 25; i++) numMissDefs.push({ disp: `${i}  ,  ${i+1}  ,  _  ,  ${i+3}`, ans: i + 2, prev: i + 1, rule: 'Counting by 1' });
  for (let i = 1; i <= 25; i++) numMissDefs.push({ disp: `${i}  ,  _  ,  ${i+2}  ,  ${i+3}`, ans: i + 1, prev: i, rule: 'Counting by 1' });
  for (let i = 1; i <= 25; i++) numMissDefs.push({ disp: `${i}  ,  ${i+1}  ,  ${i+2}  ,  _`, ans: i + 3, prev: i + 2, rule: 'Counting by 1' });
  for (let i = 2; i <= 14; i += 2) numMissDefs.push({ disp: `${i}  ,  ${i+2}  ,  _  ,  ${i+6}`, ans: i + 4, prev: i + 2, rule: 'Counting by 2' });
  for (let i = 2; i <= 6; i += 2) numMissDefs.push({ disp: `${i}  ,  _  ,  ${i+4}  ,  ${i+6}`, ans: i + 2, prev: i, rule: 'Counting by 2' });
  for (let i = 1; i <= 3; i += 2) numMissDefs.push({ disp: `${i}  ,  ${i+2}  ,  _  ,  ${i+6}`, ans: i + 4, prev: i + 2, rule: 'Counting by 2' });
  for (let i = 5; i <= 30; i += 5) numMissDefs.push({ disp: `${i}  ,  ${i+5}  ,  _  ,  ${i+15}`, ans: i + 10, prev: i + 5, rule: 'Counting by 5' });
  for (let i = 5; i <= 10; i += 5) numMissDefs.push({ disp: `${i}  ,  _  ,  ${i+10}  ,  ${i+15}`, ans: i + 5, prev: i, rule: 'Counting by 5' });
  for (let i = 10; i <= 50; i += 10) numMissDefs.push({ disp: `${i}  ,  ${i+10}  ,  _  ,  ${i+30}`, ans: i + 20, prev: i + 10, rule: 'Counting by 10' });
  for (let i = 0; i < numMissDefs.length; i++) {
    const def = numMissDefs[i];
    const ansNum = def.ans;
    const ansWord = getEnglishNumberWord(ansNum);
    const d1Num = ansNum === 100 ? 90 : (ansNum + 2);
    const d2Num = ansNum <= 2 ? ansNum + 4 : (ansNum - 2);
    banks['num_missing'].push({
      id: `num_missing_q${i + 1}`,
      type: 'mcq',
      prompt: `What number is missing?   ${def.disp}`,
      speakPrompt: `What number comes after ${getEnglishNumberWord(def.prev)} in this pattern?`,
      answer: String(ansNum),
      spokenAnswer: ansWord,
      options: [String(ansNum), String(d1Num), String(d2Num)],
      hint: `${def.rule}: after ${def.prev} comes ${ansNum} (${ansWord}).`
    });
  }

  banks['grammar_sentences'] = [
    { id: 'g1', type: 'dnd', categoryMode: 'vocab_grammar', prompt: 'Arrange the sentence in the right order:', speakPrompt: 'Arrange the sentence: She is a happy girl.', targetSlots: ['She','is','a','happy','girl.'], bankTiles: ['happy','She','girl.','is','a'], spokenAnswer: 'She is a happy girl.', hint: 'Start with "She is..."' },
    { id: 'g2', type: 'dnd', categoryMode: 'vocab_grammar', prompt: 'Arrange the sentence in the right order:', speakPrompt: 'Arrange the sentence: I like sweet red apples.', targetSlots: ['I','like','sweet','red','apples.'], bankTiles: ['red','I','apples.','like','sweet'], spokenAnswer: 'I like sweet red apples.', hint: 'Start with "I like..."' },
    { id: 'g3', type: 'dnd', categoryMode: 'vocab_grammar', prompt: 'Arrange the sentence in the right order:', speakPrompt: 'Arrange the sentence: They are playing soccer.', targetSlots: ['They','are','playing','soccer.'], bankTiles: ['playing','They','soccer.','are'], spokenAnswer: 'They are playing soccer.', hint: 'Start with "They are..."' },
    { id: 'g4', type: 'dnd', categoryMode: 'vocab_grammar', prompt: 'Arrange the sentence in the right order:', speakPrompt: 'Arrange the sentence: He has a blue bicycle.', targetSlots: ['He','has','a','blue','bicycle.'], bankTiles: ['blue','He','bicycle.','has','a'], spokenAnswer: 'He has a blue bicycle.', hint: 'Start with "He has..."' },
    { id: 'g5', type: 'dnd', categoryMode: 'vocab_grammar', prompt: 'Arrange the sentence in the right order:', speakPrompt: 'Arrange the sentence: We read books every day.', targetSlots: ['We','read','books','every','day.'], bankTiles: ['books','We','day.','read','every'], spokenAnswer: 'We read books every day.', hint: 'Start with "We read..."' },
    { id: 'g6', type: 'mcq', prompt: 'Choose the correct verb:  She ___ my best friend.', speakPrompt: 'Choose the correct word: She blank my best friend.', answer: 'is', options: ['am', 'is', 'are'], correctIndex: 1, hint: 'With "She", we use "is".' },
    { id: 'g7', type: 'mcq', prompt: 'Choose the correct verb:  I ___ seven years old.', speakPrompt: 'Choose the correct word: I blank seven years old.', answer: 'am', options: ['am', 'is', 'are'], correctIndex: 0, hint: 'With "I", we use "am".' },
    { id: 'g8', type: 'mcq', prompt: 'Choose the correct verb:  They ___ reading in the library.', speakPrompt: 'Choose the correct word: They blank reading in the library.', answer: 'are', options: ['am', 'is', 'are'], correctIndex: 2, hint: 'With "They", we use "are".' },
    { id: 'g9', type: 'mcq', prompt: 'Choose the correct article:  Leo eats ___ orange.', speakPrompt: 'Choose the correct word: Leo eats blank orange.', answer: 'an', options: ['a', 'an', 'two'], correctIndex: 1, hint: '"Orange" starts with a vowel sound, so use "an".' },
    { id: 'g10', type: 'mcq', prompt: 'Choose the correct plural noun:  Three ___ are swimming.', speakPrompt: 'Choose the correct word: Three blank are swimming.', answer: 'ducks', options: ['duck', 'ducks', 'ducking'], correctIndex: 1, hint: 'More than one duck ends with -s.' }
  ];

  return banks;
})();
window.QUESTION_BANKS = QUESTION_BANKS;

const GAMES_CATALOG = {
  expressions: [
    { id: 'exp_quiz', title: 'Polite Expressions Quiz', subtitle: 'Choose the best polite expression!', icon: '💬', isVariable: true },
    { id: 'exp_builder', title: 'Expression Sentence Builder', subtitle: 'Drag words to build polite phrases!', icon: '🧩', isVariable: true }
  ],
  greetings: [
    { id: 'grt_quiz', title: 'Greetings Quiz', subtitle: 'Pick the right greeting for every time of day!', icon: '👋', isVariable: true },
    { id: 'grt_builder', title: 'Greeting Conversation Builder', subtitle: 'Build friendly greeting sentences!', icon: '🌟', isVariable: true }
  ],
  alpha_games: [
    { id: 'alpha_match', title: 'Letter Match (Aa–Zz)', subtitle: 'Match uppercase & lowercase letters!', icon: '🔤', isVariable: true },
    { id: 'alpha_order', title: 'ABC Order', subtitle: 'Drag letters into alphabetical order!', icon: '🔡', isVariable: true },
    { id: 'alpha_missing', title: 'Missing Letter', subtitle: 'Find which letter is missing in the row!', icon: '🔍', isVariable: true },
    { id: 'alpha_pic', title: 'Picture to First Letter', subtitle: 'Match cute pictures to their starting letter!', icon: '🖼️', isVariable: true }
  ],
  num_games: [
    { id: 'num_count', title: 'Count & Choose', subtitle: 'Count the objects and pick the number!', icon: '🧮', isVariable: true },
    { id: 'num_order', title: 'Number Order', subtitle: 'Drag numbers into order from smallest to largest!', icon: '📏', isVariable: true },
    { id: 'num_word', title: 'Number to Word Match', subtitle: 'Match numerals to their English number words!', icon: '🔢', isVariable: true },
    { id: 'num_listen', title: 'Listen & Choose the Number', subtitle: 'Listen to the teacher and pick the number!', icon: '🔊', isVariable: true },
    { id: 'num_missing', title: 'Missing Number Sequence', subtitle: 'Complete the missing number in the sequence!', icon: '✨', isVariable: true }
  ],
  grammar: [
    { id: 'grammar_sentences', title: 'Action & Be-Verbs', subtitle: 'Build fixed grammar sentences!', icon: '📘', isVariable: false }
  ]
};

const EXTRA_GRAMMAR_DEFS = [
  { id: 'g_sing_plur', t: 'Singular & Plural', i: '🍎', sub: 'One or many?', q: [['I have one ___.', 'apple', 'apples', 'appling'], ['Look at those three ___.', 'cats', 'cat', 'cating'], ['She has a beautiful ___.', 'dress', 'dresses', 'dressing'], ['There are five ___ on the table.', 'boxes', 'box', 'boxs'], ['I saw a cute ___ in the park.', 'dog', 'dogs', 'doges'], ['The farmer has many ___.', 'sheep', 'sheeps', 'sheepes'], ['My left ___ hurts.', 'foot', 'feet', 'foots'], ['Brush your ___ every day.', 'teeth', 'tooth', 'tooths'], ['A ___ is playing outside.', 'child', 'children', 'childs'], ['Look at the tiny ___.', 'mouse', 'mice', 'mouses']]},
  { id: 'g_a_an', t: 'A & An', i: '🅰️', sub: 'Choose A or An.', q: [['I want ___ apple.', 'an', 'a', 'the'], ['He is ___ good boy.', 'a', 'an', 'the'], ['She has ___ umbrella.', 'an', 'a', 'the'], ['It is ___ sunny day.', 'a', 'an', 'the'], ['I see ___ elephant.', 'an', 'a', 'the'], ['We have ___ big car.', 'a', 'an', 'the'], ['This is ___ igloo.', 'an', 'a', 'the'], ['Eat ___ orange every day.', 'an', 'a', 'the'], ['I read ___ book.', 'a', 'an', 'the'], ['She is ___ artist.', 'an', 'a', 'the']]},
  { id: 'g_is_are', t: 'Is & Are', i: '👯', sub: 'Which one fits?', q: [['The cat ___ sleeping.', 'is', 'are', 'am'], ['The dogs ___ playing.', 'are', 'is', 'am'], ['She ___ my best friend.', 'is', 'are', 'am'], ['They ___ going to school.', 'are', 'is', 'am'], ['He ___ a tall boy.', 'is', 'are', 'am'], ['We ___ very happy.', 'are', 'is', 'am'], ['It ___ a sunny day.', 'is', 'are', 'am'], ['My parents ___ at work.', 'are', 'is', 'am'], ['The apple ___ red.', 'is', 'are', 'am'], ['You ___ very smart!', 'are', 'is', 'am']]},
  { id: 'g_this_that', t: 'This, That, These, Those', i: '👉', sub: 'Point it out!', q: [['___ is my pen. (Here)', 'This', 'That', 'Those'], ['Look at ___ bird! (Far)', 'that', 'this', 'these'], ['___ are my shoes. (Here)', 'These', 'Those', 'This'], ['Are ___ your books? (Far)', 'those', 'these', 'that'], ['I like ___ shirt. (Here)', 'this', 'these', 'those'], ['___ stars are bright. (Far)', 'Those', 'This', 'These'], ['___ cookies are yummy. (Here)', 'These', 'That', 'This'], ['Who is ___ man? (Far)', 'that', 'this', 'those'], ['___ is a nice house. (Here)', 'This', 'These', 'Those'], ['Do you see ___ clouds? (Far)', 'those', 'this', 'that']]},
  { id: 'g_there_is', t: 'There is & There are', i: '📍', sub: 'What is there?', q: [['___ a dog in the yard.', 'There is', 'There are', 'There am'], ['___ two birds on the roof.', 'There are', 'There is', 'There am'], ['___ a big tree here.', 'There is', 'There are', 'There am'], ['___ five apples left.', 'There are', 'There is', 'There am'], ['___ some milk in the cup.', 'There is', 'There are', 'There am'], ['___ many stars tonight.', 'There are', 'There is', 'There am'], ['___ a cat under the table.', 'There is', 'There are', 'There am'], ['___ three cars in the street.', 'There are', 'There is', 'There am'], ['___ an orange on the desk.', 'There is', 'There are', 'There am'], ['___ people in the park.', 'There are', 'There is', 'There am']]},
  { id: 'g_any_few', t: 'Any, A few, Many', i: '🔢', sub: 'Quantities.', q: [['Do you have ___ pencils?', 'any', 'a few', 'much'], ['I have ___ friends.', 'many', 'any', 'much'], ['Can I have ___ cookies?', 'a few', 'any', 'much'], ['Is there ___ water left?', 'any', 'a few', 'many'], ['There are ___ people here.', 'many', 'any', 'much'], ['I only need ___ minutes.', 'a few', 'many', 'any'], ['We do not have ___ time.', 'any', 'a few', 'many'], ['She read ___ books.', 'many', 'any', 'much'], ['Just add ___ drops of milk.', 'a few', 'many', 'any'], ['Are there ___ questions?', 'any', 'much', 'a few']]},
  { id: 'g_pronouns', t: 'Pronouns', i: '🙋‍♂️', sub: 'He, She, It, Mine, Myself.', q: [['___ am seven years old.', 'I', 'Me', 'My'], ['This book is ___.', 'mine', 'my', 'me'], ['She made the cake by ___.', 'herself', 'her', 'she'], ['___ are good friends.', 'We', 'Us', 'Our'], ['That is ___ dog.', 'their', 'theirs', 'they'], ['I did it all by ___.', 'myself', 'me', 'mine'], ['Can you help ___?', 'us', 'we', 'our'], ['The cat licked ___ paw.', 'its', 'it', 'it is'], ['Is this pencil ___?', 'yours', 'your', 'you'], ['___ is playing football.', 'He', 'Him', 'His']]},
  { id: 'g_adjectives', t: 'Adjectives', i: '🎨', sub: 'Describe it!', q: [['The ___ sun is shining.', 'bright', 'brightly', 'brightness'], ['She has a ___ dress.', 'beautiful', 'beautifully', 'beauty'], ['The elephant is very ___.', 'big', 'bigness', 'bigly'], ['I ate a ___ apple.', 'sweet', 'sweetly', 'sweetness'], ['It is a ___ day.', 'cold', 'coldly', 'coldness'], ['The turtle is ___.', 'slow', 'slowly', 'slowness'], ['He is a ___ boy.', 'smart', 'smartly', 'smartness'], ['We have a ___ car.', 'fast', 'fastly', 'fastness'], ['This pillow is ___.', 'soft', 'softly', 'softness'], ['The clown is ___.', 'funny', 'funnily', 'funniness']]},
  { id: 'g_adverbs', t: 'Adverbs', i: '🏃', sub: 'How did it happen?', q: [['He runs very ___.', 'fast', 'fastly', 'fastness'], ['She sings ___.', 'beautifully', 'beautiful', 'beauty'], ['The turtle walks ___.', 'slowly', 'slow', 'slowness'], ['They played ___.', 'happily', 'happy', 'happiness'], ['Please speak ___.', 'quietly', 'quiet', 'quietness'], ['He answered ___.', 'correctly', 'correct', 'correctness'], ['The sun shines ___.', 'brightly', 'bright', 'brightness'], ['We waited ___.', 'patiently', 'patient', 'patience'], ['The baby slept ___.', 'peacefully', 'peaceful', 'peace'], ['He easily lifted it ___.', 'easily', 'easy', 'easiness']]},
  { id: 'g_prepositions', t: 'Prepositions', i: '📦', sub: 'In, On, Under, At...', q: [
    ['The cat is ___ the table.', 'under', 'in', 'at', '<div style="position:relative;height:90px;width:100px;margin:0 auto;"><div style="font-size:4rem;position:absolute;top:0;left:5px;z-index:2;">🪑</div><div style="font-size:2.5rem;position:absolute;top:55px;left:25px;">🐈</div></div>'], 
    ['The book is ___ the desk.', 'on', 'in', 'at', '<div style="position:relative;height:90px;width:100px;margin:0 auto;"><div style="font-size:2.2rem;position:absolute;top:-5px;left:25px;z-index:2;">📖</div><div style="font-size:4rem;position:absolute;top:20px;left:5px;">🪑</div></div>'], 
    ['The fish is ___ the water.', 'in', 'on', 'at', '<div style="position:relative;height:90px;width:100px;margin:0 auto;"><div style="font-size:4rem;position:absolute;top:20px;left:5px;">🌊</div><div style="font-size:2.5rem;position:absolute;top:25px;left:25px;z-index:2;">🐟</div></div>'], 
    ['We eat lunch ___ noon.', 'at', 'in', 'on', '🕛 🍽️'], 
    ['She is sitting ___ the chair.', 'on', 'in', 'at', '<div style="position:relative;height:90px;width:100px;margin:0 auto;"><div style="font-size:2.8rem;position:absolute;top:-10px;left:25px;z-index:2;">👧</div><div style="font-size:4rem;position:absolute;top:20px;left:5px;">🪑</div></div>'], 
    ['The dog jumped ___ the fence.', 'over', 'in', 'on', '<div style="position:relative;height:90px;width:120px;margin:0 auto;"><div style="font-size:4rem;position:absolute;top:20px;left:20px;">🚧</div><div style="font-size:2.5rem;position:absolute;top:-10px;left:40px;z-index:2;">🐕</div></div>'], 
    ['I live ___ a house.', 'in', 'on', 'at', '<div style="position:relative;height:90px;width:100px;margin:0 auto;"><div style="font-size:4rem;position:absolute;top:10px;left:10px;">🏠</div><div style="font-size:2.5rem;position:absolute;top:40px;left:35px;z-index:2;">🧍</div></div>'], 
    ['Look ___ the sky!', 'at', 'in', 'on', '👀 ✨ 🌌'], 
    ['The ball rolled ___ the bed.', 'under', 'on', 'in', '<div style="position:relative;height:90px;width:120px;margin:0 auto;"><div style="font-size:4rem;position:absolute;top:10px;left:10px;z-index:2;">🛏️</div><div style="font-size:1.8rem;position:absolute;top:55px;left:45px;">⚽</div></div>'], 
    ['My birthday is ___ May.', 'in', 'on', 'at', '📅 🎂']
  ]},
  { id: 'g_conjunctions', t: 'Conjunctions', i: '🔗', sub: 'And, But, Or, So...', q: [['I like apples ___ bananas.', 'and', 'but', 'so'], ['It is cold, ___ I wear a coat.', 'so', 'but', 'or'], ['Do you want tea ___ coffee?', 'or', 'and', 'but'], ['I ran fast, ___ I missed the bus.', 'but', 'so', 'or'], ['She is tired ___ happy.', 'but', 'so', 'or'], ['We can play now ___ later.', 'or', 'but', 'so'], ['He was hungry, ___ he ate a pie.', 'so', 'or', 'but'], ['I have a cat ___ a dog.', 'and', 'but', 'so'], ['Is it red ___ blue?', 'or', 'and', 'so'], ['I tried, ___ I failed.', 'but', 'and', 'so']]},
  { id: 'g_interjections', t: 'Interjections', i: '😲', sub: 'Wow! Ouch! Yay!', q: [['___! That hurts!', 'Ouch', 'Wow', 'Yay'], ['___! We won the game!', 'Yay', 'Oops', 'Ouch'], ['___! What a beautiful picture!', 'Wow', 'Ouch', 'Oops'], ['___! I dropped my pencil.', 'Oops', 'Yay', 'Wow'], ['___, be quiet please.', 'Shh', 'Yay', 'Ouch'], ['___, I did not know that!', 'Oh', 'Shh', 'Oops'], ['___! I found a coin!', 'Look', 'Ouch', 'Shh'], ['___, this is yummy!', 'Mmm', 'Ouch', 'Oops'], ['___! It is a ghost!', 'Ah', 'Yay', 'Mmm'], ['___, you did a great job!', 'Bravo', 'Ouch', 'Shh']]},
  { id: 'g_punctuation', t: 'Punctuation', i: '❓', sub: '. ? ! ,', q: [['How are you ___', '?', '.', '!'], ['I am a boy ___', '.', '?', '!'], ['Wow, that is amazing ___', '!', '?', '.'], ['I need milk ___ eggs, and bread.', ',', '.', '?'], ['What is your name ___', '?', '.', '!'], ['Watch out ___', '!', '?', '.'], ['I have a red car ___', '.', '?', '!'], ['Do you like pizza ___', '?', '.', '!'], ['I have a dog ___ a cat, and a bird.', ',', '.', '?'], ['Stop right there ___', '!', '?', '.']]},
  { id: 'g_contractions', t: 'Contractions', i: '✂️', sub: "It's, Don't, Can't...", q: [['What is short for "do not"?', 'don\'t', 'does', 'do'], ['What is short for "can not"?', 'can\'t', 'cannot', 'cans'], ['What is short for "it is"?', 'it\'s', 'its', 'it is'], ['What is short for "I am"?', 'I\'m', 'Am', 'Im'], ['What is short for "you are"?', 'you\'re', 'your', 'yours'], ['What is short for "we are"?', 'we\'re', 'were', 'where'], ['What is short for "they are"?', 'they\'re', 'their', 'there'], ['What is short for "is not"?', 'isn\'t', 'is', 'not'], ['What is short for "did not"?', 'didn\'t', 'does', 'do'], ['What is short for "will not"?', 'won\'t', 'willn\'t', 'will']]},
  { id: 'g_abbreviations', t: 'Abbreviations & Acronyms', i: '🔠', sub: 'Short forms.', q: [['What is short for "Doctor"?', 'Dr.', 'Doc.', 'Dc.'], ['What is short for "Mister"?', 'Mr.', 'Ms.', 'Mrs.'], ['What is short for "Street"?', 'St.', 'Str.', 'Sr.'], ['What is short for "Avenue"?', 'Ave.', 'Av.', 'An.'], ['What does "USA" stand for?', 'United States of America', 'United Stars', 'Under Sea Area'], ['What is short for "Monday"?', 'Mon.', 'Mo.', 'Mnd.'], ['What is short for "January"?', 'Jan.', 'Ja.', 'Jny.'], ['What is short for "Number"?', 'No.', 'Nu.', 'Nr.'], ['What is short for "Television"?', 'TV', 'Tel', 'Vis'], ['What is short for "United Kingdom"?', 'UK', 'UN', 'US']]},
  { id: 'g_ownership', t: 'Ownership', i: '🗝️', sub: "Using 's", q: [['This is the book of the boy. -> This is the ___ book.', 'boy\'s', 'boys', 'boys\'s'], ['The tail of the cat. -> The ___ tail.', 'cat\'s', 'cats', 'cats\'s'], ['The toys belonging to the children. -> The ___ toys.', 'children\'s', 'childrens', 'childrens\'s'], ['The house of my mom. -> My ___ house.', 'mom\'s', 'moms', 'moms\'s'], ['The car of my dad. -> My ___ car.', 'dad\'s', 'dads', 'dads\'s'], ['The bone of the dog. -> The ___ bone.', 'dog\'s', 'dogs', 'dogs\'s'], ['The dresses of the girls. -> The ___ dresses.', 'girls\'', 'girl\'s', 'girls\'s'], ['The nest of the bird. -> The ___ nest.', 'bird\'s', 'birds', 'birds\'s'], ['The mane of the lion. -> The ___ mane.', 'lion\'s', 'lions', 'lions\'s'], ['The crown of the king. -> The ___ crown.', 'king\'s', 'kings', 'kings\'s']]},
  { id: 'g_another', t: 'Another & The other', i: '🔄', sub: 'Which one?', q: [['I do not like this shirt. Show me ___ one.', 'another', 'the other', 'other'], ['I have two pens. One is red, ___ is blue.', 'the other', 'another', 'other'], ['Would you like ___ slice of cake?', 'another', 'the other', 'other'], ['One brother is tall, ___ is short.', 'the other', 'another', 'other'], ['My shoe is here. Where is ___ one?', 'the other', 'another', 'other'], ['Can we play ___ game?', 'another', 'the other', 'other'], ['I read one book, and now I will read ___.', 'another', 'the other', 'other'], ['One twin has brown eyes, ___ has blue eyes.', 'the other', 'another', 'other'], ['Please give me ___ chance.', 'another', 'the other', 'other'], ['Take one path, I will take ___.', 'the other', 'another', 'other']]},
  { id: 'g_wh_words', t: 'Where, When, Why, How', i: '🧭', sub: 'Question words.', q: [['___ is the park? (Location)', 'Where', 'When', 'Why'], ['___ is your birthday? (Time)', 'When', 'Where', 'Why'], ['___ are you crying? (Reason)', 'Why', 'How', 'Where'], ['___ are you today? (Condition)', 'How', 'Where', 'When'], ['___ old are you?', 'How', 'When', 'Why'], ['___ do you live?', 'Where', 'When', 'How'], ['___ did you wake up?', 'When', 'Where', 'How'], ['___ is the sky blue?', 'Why', 'When', 'Where'], ['___ do you spell your name?', 'How', 'Why', 'Where'], ['___ is my toy?', 'Where', 'When', 'How']]},
  { id: 'g_whose', t: 'Whose', i: '🕵️', sub: 'Who does it belong to?', q: [['___ jacket is this?', 'Whose', 'Who', 'Whom'], ['___ shoes are these?', 'Whose', 'Who', 'Whom'], ['Do you know ___ dog this is?', 'whose', 'who', 'whom'], ['___ book is on the table?', 'Whose', 'Who', 'Whom'], ['___ pencil is missing?', 'Whose', 'Who', 'Whom'], ['I wonder ___ car that is.', 'whose', 'who', 'whom'], ['___ turn is it next?', 'Whose', 'Who', 'Whom'], ['___ house are we visiting?', 'Whose', 'Who', 'Whom'], ['Tell me ___ bag you found.', 'whose', 'who', 'whom'], ['___ idea was this?', 'Whose', 'Who', 'Whom']]},
  { id: 'g_tobe_has', t: 'To be & Has/Have', i: '🤲', sub: 'Am/Is/Are vs Has/Have', q: [['I ___ a big dog.', 'have', 'has', 'am'], ['She ___ a red dress.', 'has', 'have', 'is'], ['He ___ my brother.', 'is', 'has', 'have'], ['They ___ a new car.', 'have', 'has', 'are'], ['I ___ very tall.', 'am', 'have', 'has'], ['We ___ happy today.', 'are', 'have', 'has'], ['It ___ a long tail.', 'has', 'is', 'have'], ['The cat ___ sleeping.', 'is', 'has', 'have'], ['You ___ a nice smile.', 'have', 'has', 'are'], ['My mom ___ cooking.', 'is', 'has', 'have']]},
  { id: 'g_modals', t: 'Modals', i: '🚦', sub: 'Can, Could, Must, Should...', q: [['Birds ___ fly.', 'can', 'must', 'should'], ['You ___ look both ways before crossing.', 'must', 'can', 'could'], ['___ I go to the bathroom, please?', 'May', 'Must', 'Should'], ['We ___ eat vegetables to be healthy.', 'should', 'can', 'may'], ['A fish ___ not walk on land.', 'cannot', 'must not', 'should not'], ['___ you help me, please?', 'Could', 'Must', 'Should'], ['I ___ run very fast.', 'can', 'must', 'should'], ['You ___ not hit others.', 'must', 'can', 'may'], ['It ___ rain tomorrow.', 'might', 'must', 'should'], ['We ___ go to sleep early.', 'should', 'can', 'may']]},
  { id: 'g_tenses', t: 'Tenses (Present, Past, Future)', i: '⏳', sub: 'When did it happen?', q: [['I ___ an apple yesterday.', 'ate', 'eat', 'will eat'], ['I ___ to the park tomorrow.', 'will go', 'go', 'went'], ['She ___ books every day.', 'reads', 'readed', 'will read'], ['We ___ soccer last week.', 'played', 'play', 'will play'], ['He ___ a song right now.', 'is singing', 'sang', 'sings'], ['They ___ pizza for dinner tonight.', 'will have', 'had', 'has'], ['I ___ my hands yesterday.', 'washed', 'wash', 'will wash'], ['The sun ___ in the morning.', 'rises', 'rose', 'will rise'], ['I ___ my homework later.', 'will do', 'did', 'do'], ['He ___ a picture yesterday.', 'drew', 'draws', 'will draw']]}
];

EXTRA_GRAMMAR_DEFS.forEach(def => {
  GAMES_CATALOG.grammar.push({ id: def.id, title: def.t, subtitle: def.sub, icon: def.i, isVariable: true });
  QUESTION_BANKS[def.id] = def.q.map((row, idx) => {
    const visualHtml = row[4] ? `<div style="font-size:3.5rem; text-align:center; margin-bottom:14px; background:#F8FAFC; border-radius:16px; padding:12px; border:2px dashed #CBD5E1;">${row[4]}</div>` : '';
    return {
      id: `${def.id}_q${idx + 1}`,
      type: 'mcq',
      prompt: `Complete the sentence:<br/><br/>${visualHtml}<strong style="color:#0284C7;font-size:1.8rem;">${row[0]}</strong>`,
      speakPrompt: row[0].replace('___', 'blank'),
      answer: row[1],
      options: [row[1], row[2], row[3]],
      hint: `Choose the correct word to fill in the blank.`
    };
  });
});

// ---- Grammar "Chat Time": one Leo & Mia dialogue per grammar topic ----
(function buildGrammarChat() {
  const fill = (row) => {
    const blank = String(row[0]); const ans = String(row[1]);
    if (blank.indexOf('___') === -1) return null;
    let t = blank.indexOf('->') !== -1 ? blank.split('->').pop().trim() : blank;
    t = t.replace(/\s*\([^)]*\)/g, '').trim();
    t = /^[.,?!]$/.test(ans) ? t.replace(/\s*___/, ans) : t.replace('___', ans);
    return t.charAt(0).toUpperCase() + t.slice(1);
  };
  GAMES_CATALOG.grammar.push({ id: 'grammar_chat', title: 'Chat Time', subtitle: 'Listen & read Leo and Mia talk!', icon: '💬', isVariable: false });
  QUESTION_BANKS['grammar_chat'] = EXTRA_GRAMMAR_DEFS.map((def) => {
    const lines = [
      { speaker: 'Leo', text: `Hi Mia! Let\u2019s practice ${def.t}.` },
      { speaker: 'Mia', text: 'Great idea, Leo! I am ready.' }
    ];
    let turn = 0;
    def.q.slice(0, 4).forEach((row) => {
      const filled = fill(row);
      if (filled) { lines.push({ speaker: turn % 2 === 0 ? 'Leo' : 'Mia', text: filled }); turn++; }
      else { lines.push({ speaker: 'Leo', text: row[0] }); lines.push({ speaker: 'Mia', text: row[1].charAt(0).toUpperCase() + row[1].slice(1) + '.' }); turn = 0; }
    });
    lines.push({ speaker: lines[lines.length - 1].speaker === 'Leo' ? 'Mia' : 'Leo', text: 'Great job! Now we know it.' });
    return { id: `grammar_chat_${def.id}`, type: 'vocab_dialogue', topicTitle: def.t, chatLines: lines, prompt: 'Listen and read the dialogue!', speakPrompt: 'Listen and read the dialogue.', hint: 'Tap any line to hear it again.' };
  });
})();

