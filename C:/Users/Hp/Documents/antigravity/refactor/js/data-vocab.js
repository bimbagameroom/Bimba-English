window.VOCAB_THEMES = window.VOCAB_THEMES || {};
window.VOCAB_THEME_ORDER = window.VOCAB_THEME_ORDER || [];

function registerTheme(themeData) {
  window.VOCAB_THEMES[themeData.id] = themeData;
  window.VOCAB_THEME_ORDER.push(themeData.id);
}

// 1. Introducing Myself
registerTheme({
  id: 'intro_myself', title: 'Introducing Myself', icon: '👋',
  words: [
    { id: 'w1', word: 'Name', emoji: '🏷️', clue: 'What people call you.' },
    { id: 'w2', word: 'Age', emoji: '🎂', clue: 'How many years old you are.' },
    { id: 'w3', word: 'Boy', emoji: '👦', clue: 'A male child.' },
    { id: 'w4', word: 'Girl', emoji: '👧', clue: 'A female child.' },
    { id: 'w5', word: 'Friend', emoji: '🤝', clue: 'Someone you like to play with.' },
    { id: 'w6', word: 'Happy', emoji: '😊', clue: 'Feeling good and smiling.' },
    { id: 'w7', word: 'School', emoji: '🏫', clue: 'The place where you go to learn.' },
    { id: 'w8', word: 'Play', emoji: '⚽', clue: 'Having fun with toys or games.' },
    { id: 'w9', word: 'Siblings', emoji: '👫', clue: 'Your brothers and sisters.' },
    { id: 'w10', word: 'Hobby', emoji: '🎨', clue: 'Something fun you like to do in your free time.' },
    { id: 'w11', word: 'Home address', emoji: '🏠', clue: 'The street and number where you live.' },
    { id: 'w12', word: 'Student', emoji: '🧑‍🎓', clue: 'A person who studies at a school.' },
    { id: 'w13', word: 'Favorite colors', emoji: '🌈', clue: 'The colors you like the most.' },
    { id: 'w14', word: 'Favorite foods', emoji: '🍕', clue: 'The foods you like to eat the most.' },
    { id: 'w15', word: 'Goals', emoji: '🎯', clue: 'Things you want to do or achieve in the future.' }
  ],
  sentences: [
    { words: ['My', 'name', 'is', 'Leo.'] },
    { words: ['I', 'am', 'seven', 'years', 'old.'] },
    { words: ['I', 'am', 'a', 'happy', 'boy.'] },
    { words: ['She', 'is', 'a', 'smart', 'girl.'] },
    { words: ['Mia', 'is', 'my', 'best', 'friend.'] },
    { words: ['We', 'like', 'to', 'play', 'together.'] },
    { words: ['I', 'go', 'to', 'school', 'every', 'day.'] },
    { words: ['I', 'love', 'learning', 'English.'] },
    { words: ['Nice', 'to', 'meet', 'you!'] },
    { words: ['Let', 'us', 'be', 'good', 'friends.'] }
  ],
  trueFalse: [
    { text: 'Your name is what people call you.', isTrue: true },
    { text: 'A boy is a female child.', isTrue: false },
    { text: 'You go to school to learn.', isTrue: true },
    { text: 'When you are happy, you usually cry.', isTrue: false },
    { text: 'A friend is someone you like to play with.', isTrue: true },
    { text: 'Age tells us how tall you are.', isTrue: false },
    { text: 'A girl is a female child.', isTrue: true },
    { text: 'Playing is boring and not fun.', isTrue: false },
    { text: 'We use a name tag to show our name.', isTrue: true },
    { text: 'You celebrate your age on your birthday.', isTrue: true }
  ],
  story: {
    words: ['name', 'boy', 'seven', 'school', 'friend', 'play', 'happy'],
    sentences: [
      { text: 'Hello! My _ is Tom.', answer: 'name', hintPic: '🏷️' },
      { text: 'I am a little _.', answer: 'boy', hintPic: '👦' },
      { text: 'Today, I am _ years old.', answer: 'seven', hintPic: '🎂' },
      { text: 'I learn new things at _.', answer: 'school', hintPic: '🏫' },
      { text: 'Sam is my best _.', answer: 'friend', hintPic: '🤝' },
      { text: 'We like to _ with cars.', answer: 'play', hintPic: '⚽' },
      { text: 'I am a very _ kid!', answer: 'happy', hintPic: '😊' }
    ]
  },
  reading: {
    text: 'Hello! My name is Anna. I am a girl. I am eight years old. I have a good friend named Ben. We go to the same school. After school, we play in the park. We are very happy!',
    questions: [
      { q: 'What is the girl’s name?', options: ['Anna', 'Ben', 'Mia'], answer: 0 },
      { q: 'How old is Anna?', options: ['Six', 'Seven', 'Eight'], answer: 2 },
      { q: 'Who is Anna’s good friend?', options: ['Leo', 'Ben', 'Tom'], answer: 1 },
      { q: 'Where do they go together?', options: ['To school', 'To the moon', 'To sleep'], answer: 0 },
      { q: 'How do they feel?', options: ['Sad', 'Angry', 'Happy'], answer: 2 }
    ]
  },
  chat: {
    lines: [
      { speaker: 'Leo', text: 'Hi! I am Leo. What is your name?' },
      { speaker: 'Mia', text: 'Hello, Leo! My name is Mia.' },
      { speaker: 'Leo', text: 'Nice to meet you, Mia. How old are you?' },
      { speaker: 'Mia', text: 'I am eight years old.' }
    ],
    questions: [
      { q: 'What does Leo ask first?', options: ['What is your name?', 'How are you?', 'Where is the school?'], answer: 0 },
      { q: 'How old is Mia?', options: ['Six', 'Seven', 'Eight'], answer: 2 }
    ]
  }
});

// 2. Color
registerTheme({
  id: 'color', title: 'Color', icon: '🎨',
  words: [
    { id: 'w1', word: 'Red', emoji: '🍎', clue: 'The color of an apple or a stop sign.' },
    { id: 'w2', word: 'Blue', emoji: '🌊', clue: 'The color of the sky and the ocean.' },
    { id: 'w3', word: 'Yellow', emoji: '☀️', clue: 'The color of the sun and bananas.' },
    { id: 'w4', word: 'Green', emoji: '🌿', clue: 'The color of grass and leaves.' },
    { id: 'w5', word: 'Orange', emoji: '🍊', clue: 'A color mixed from red and yellow.' },
    { id: 'w6', word: 'Purple', emoji: '🍇', clue: 'The color of grapes.' },
    { id: 'w7', word: 'Black', emoji: '🐈‍⬛', clue: 'The color of the night sky.' },
    { id: 'w8', word: 'White', emoji: '☁️', clue: 'The color of snow and clouds.' },
    { id: 'w9', word: 'Pink', emoji: '🌸', clue: 'A light red color, like cotton candy.' },
    { id: 'w10', word: 'Brown', emoji: '🐻', clue: 'The color of chocolate and bears.' },
    { id: 'w11', word: 'Grey', emoji: '🐘', clue: 'The color of an elephant and rain clouds.' }
  ],
  sentences: [
    { words: ['The', 'apple', 'is', 'red.'] },
    { words: ['Look', 'at', 'the', 'blue', 'sky.'] },
    { words: ['The', 'sun', 'is', 'bright', 'yellow.'] },
    { words: ['Frogs', 'are', 'usually', 'green.'] },
    { words: ['I', 'am', 'eating', 'an', 'orange', 'carrot.'] },
    { words: ['She', 'has', 'a', 'purple', 'dress.'] },
    { words: ['The', 'cat', 'is', 'black', 'and', 'white.'] },
    { words: ['Snow', 'is', 'very', 'cold', 'and', 'white.'] },
    { words: ['Pigs', 'are', 'often', 'pink.'] },
    { words: ['The', 'bear', 'has', 'brown', 'fur.'] }
  ],
  trueFalse: [
    { text: 'The sky on a sunny day is blue.', isTrue: true },
    { text: 'Bananas are usually purple.', isTrue: false },
    { text: 'Grass and leaves are green.', isTrue: true },
    { text: 'Snow is black.', isTrue: false },
    { text: 'Strawberries and apples can be red.', isTrue: true },
    { text: 'Chocolate is usually brown.', isTrue: true },
    { text: 'A bright sun is white and pink.', isTrue: false },
    { text: 'Clouds in a nice sky are white.', isTrue: true },
    { text: 'Grapes can be purple.', isTrue: true },
    { text: 'Carrots are blue.', isTrue: false }
  ],
  story: {
    words: ['red', 'blue', 'yellow', 'green', 'orange', 'white', 'black'],
    sentences: [
      { text: 'I see a _ apple on the table.', answer: 'red', hintPic: '🍎' },
      { text: 'The sky outside is very _.', answer: 'blue', hintPic: '🌊' },
      { text: 'A big _ sun is shining.', answer: 'yellow', hintPic: '☀️' },
      { text: 'The frog in the grass is _.', answer: 'green', hintPic: '🌿' },
      { text: 'I want to eat an _ fruit.', answer: 'orange', hintPic: '🍊' },
      { text: 'Look at that fluffy _ cloud!', answer: 'white', hintPic: '☁️' },
      { text: 'At night, the room is dark and _.', answer: 'black', hintPic: '🐈‍⬛' }
    ]
  },
  reading: {
    text: 'Leo loves to paint. He has many colors. He uses blue for the sky and yellow for the sun. He mixes yellow and blue to make green! He paints green grass. Then, he paints a red house.',
    questions: [
      { q: 'What does Leo love to do?', options: ['Paint', 'Sing', 'Dance'], answer: 0 },
      { q: 'What color does he use for the sky?', options: ['Red', 'Blue', 'Green'], answer: 1 },
      { q: 'What color is the sun?', options: ['Yellow', 'Purple', 'Black'], answer: 0 },
      { q: 'What does yellow and blue make?', options: ['Orange', 'Pink', 'Green'], answer: 2 },
      { q: 'What color is the house?', options: ['White', 'Red', 'Brown'], answer: 1 }
    ]
  },
  chat: {
    lines: [
      { speaker: 'Mia', text: 'Look at my new crayons, Leo!' },
      { speaker: 'Leo', text: 'Wow! What is your favorite color?' },
      { speaker: 'Mia', text: 'My favorite color is pink. What is yours?' },
      { speaker: 'Leo', text: 'I like green because it looks like nature.' }
    ],
    questions: [
      { q: 'What does Mia have?', options: ['New crayons', 'New shoes', 'New books'], answer: 0 },
      { q: 'What is Mia’s favorite color?', options: ['Red', 'Pink', 'Yellow'], answer: 1 },
      { q: 'Why does Leo like green?', options: ['It looks like space.', 'It looks like nature.', 'It is shiny.'], answer: 1 }
    ]
  }
});

// 3. Family
registerTheme({
  id: 'family', title: 'Family', icon: '👨‍👩‍👧‍👦',
  words: [
    { id: 'w1', word: 'Father', emoji: '👨', clue: 'Your male parent, also called Dad.' },
    { id: 'w2', word: 'Mother', emoji: '👩', clue: 'Your female parent, also called Mom.' },
    { id: 'w3', word: 'Brother', emoji: '👦', clue: 'A boy who has the same parents as you.' },
    { id: 'w4', word: 'Sister', emoji: '👧', clue: 'A girl who has the same parents as you.' },
    { id: 'w5', word: 'Grandfather', emoji: '👴', clue: 'The father of your mom or dad.' },
    { id: 'w6', word: 'Grandmother', emoji: '👵', clue: 'The mother of your mom or dad.' },
    { id: 'w7', word: 'Baby', emoji: '👶', clue: 'A very young child in the family.' },
    { id: 'w8', word: 'Family', emoji: '🏠', clue: 'Parents and children living together.' },
    { id: 'w9', word: 'Uncle', emoji: '👨‍🦱', clue: 'The brother of your mom or dad.' },
    { id: 'w10', word: 'Aunt', emoji: '👩‍🦰', clue: 'The sister of your mom or dad.' },
    { id: 'w11', word: 'Cousin', emoji: '🧒', clue: 'The child of your uncle or aunt.' }
  ],
  sentences: [
    { words: ['My', 'father', 'is', 'very', 'tall.'] },
    { words: ['My', 'mother', 'cooks', 'yummy', 'food.'] },
    { words: ['I', 'play', 'games', 'with', 'my', 'brother.'] },
    { words: ['My', 'sister', 'likes', 'to', 'read', 'books.'] },
    { words: ['Grandfather', 'tells', 'me', 'funny', 'stories.'] },
    { words: ['Grandmother', 'gives', 'me', 'warm', 'hugs.'] },
    { words: ['The', 'baby', 'is', 'sleeping', 'now.'] },
    { words: ['I', 'love', 'my', 'whole', 'family!'] },
    { words: ['We', 'eat', 'dinner', 'together', 'every', 'night.'] },
    { words: ['My', 'family', 'makes', 'me', 'happy.'] }
  ],
  trueFalse: [
    { text: 'Your mother is your female parent.', isTrue: true },
    { text: 'Your brother is an old man.', isTrue: false },
    { text: 'A baby is a very young child.', isTrue: true },
    { text: 'Your grandfather is your mother’s sister.', isTrue: false },
    { text: 'A sister is a girl with the same parents as you.', isTrue: true },
    { text: 'Your father is also called Dad.', isTrue: true },
    { text: 'Your grandmother is a young boy.', isTrue: false },
    { text: 'A family cares for each other.', isTrue: true },
    { text: 'You are older than your grandfather.', isTrue: false },
    { text: 'Your father and mother are your parents.', isTrue: true }
  ],
  story: {
    words: ['family', 'father', 'mother', 'brother', 'sister', 'baby', 'grandfather'],
    sentences: [
      { text: 'I live in a house with my big _.', answer: 'family', hintPic: '🏠' },
      { text: 'My _ goes to work in the morning.', answer: 'father', hintPic: '👨' },
      { text: 'My _ helps me with my homework.', answer: 'mother', hintPic: '👩' },
      { text: 'I play soccer with my big _.', answer: 'brother', hintPic: '👦' },
      { text: 'My little _ plays with her dolls.', answer: 'sister', hintPic: '👧' },
      { text: 'The cute _ is drinking milk.', answer: 'baby', hintPic: '👶' },
      { text: 'On Sunday, we visit my wise _.', answer: 'grandfather', hintPic: '👴' }
    ]
  },
  reading: {
    text: 'Meet Sam’s family. There are five people in his family. He lives with his mother, father, and two sisters. Sam is the only boy child. They have a baby sister who cries a lot, but they love her. Sam’s father likes to read the newspaper.',
    questions: [
      { q: 'How many people are in Sam’s family?', options: ['Three', 'Four', 'Five'], answer: 2 },
      { q: 'How many sisters does Sam have?', options: ['One', 'Two', 'Three'], answer: 1 },
      { q: 'Who is the only boy child?', options: ['Sam', 'The baby', 'The father'], answer: 0 },
      { q: 'Who cries a lot?', options: ['Sam', 'The mother', 'The baby sister'], answer: 2 },
      { q: 'What does the father like to do?', options: ['Play games', 'Read the newspaper', 'Cook dinner'], answer: 1 }
    ]
  },
  chat: {
    lines: [
      { speaker: 'Mia', text: 'Look at this picture, Leo. This is my family.' },
      { speaker: 'Leo', text: 'Who is the tall man wearing glasses?' },
      { speaker: 'Mia', text: 'That is my father. Next to him is my mother.' },
      { speaker: 'Leo', text: 'Do you have any brothers or sisters?' },
      { speaker: 'Mia', text: 'Yes, I have one little brother.' }
    ],
    questions: [
      { q: 'What does Mia show Leo?', options: ['A picture of her family', 'A toy car', 'A drawing of a dog'], answer: 0 },
      { q: 'Who is the tall man with glasses?', options: ['The brother', 'The father', 'The grandfather'], answer: 1 },
      { q: 'How many brothers does Mia have?', options: ['One', 'Two', 'None'], answer: 0 }
    ]
  }
});

// 4. Face
registerTheme({
  id: 'face', title: 'Face', icon: '😀',
  words: [
    { id: 'w1', word: 'Head', emoji: '👤', clue: 'The top part of your body.' },
    { id: 'w2', word: 'Hair', emoji: '💇', clue: 'It grows on top of your head.' },
    { id: 'w3', word: 'Eye', emoji: '👁️', clue: 'You use this to see things.' },
    { id: 'w4', word: 'Nose', emoji: '👃', clue: 'You use this to smell flowers.' },
    { id: 'w5', word: 'Ear', emoji: '👂', clue: 'You use this to hear music.' },
    { id: 'w6', word: 'Mouth', emoji: '👄', clue: 'You use this to eat and speak.' },
    { id: 'w7', word: 'Tooth', emoji: '🦷', clue: 'The hard white things inside your mouth.' },
    { id: 'w8', word: 'Tongue', emoji: '👅', clue: 'It is pink and helps you taste food.' },
    { id: 'w9', word: 'Eyebrow', emoji: '🤨', clue: 'The line of hair above your eye.' },
    { id: 'w10', word: 'Cheeks', emoji: '😊', clue: 'The soft round parts on each side of your face.' },
    { id: 'w11', word: 'Face', emoji: '😀', clue: 'The front of your head with your eyes, nose and mouth.' }
  ],
  sentences: [
    { words: ['I', 'have', 'two', 'brown', 'eyes.'] },
    { words: ['My', 'nose', 'can', 'smell', 'the', 'soup.'] },
    { words: ['I', 'hear', 'birds', 'with', 'my', 'ears.'] },
    { words: ['I', 'open', 'my', 'mouth', 'to', 'eat.'] },
    { words: ['I', 'brush', 'my', 'teeth', 'every', 'day.'] },
    { words: ['My', 'hair', 'is', 'long', 'and', 'black.'] },
    { words: ['I', 'wear', 'a', 'hat', 'on', 'my', 'head.'] },
    { words: ['I', 'taste', 'ice', 'cream', 'with', 'my', 'tongue.'] },
    { words: ['Wash', 'your', 'face', 'in', 'the', 'morning.'] },
    { words: ['Smile', 'big', 'with', 'your', 'mouth!'] }
  ],
  trueFalse: [
    { text: 'You see colors with your eyes.', isTrue: true },
    { text: 'You hear music with your nose.', isTrue: false },
    { text: 'Hair grows on your hands.', isTrue: false },
    { text: 'You chew food with your teeth.', isTrue: true },
    { text: 'Your tongue helps you taste sweet candy.', isTrue: true },
    { text: 'You smell flowers with your ears.', isTrue: false },
    { text: 'Your head is at the top of your body.', isTrue: true },
    { text: 'You have three eyes on your face.', isTrue: false },
    { text: 'You open your mouth to talk.', isTrue: true },
    { text: 'Ears are used for smelling food.', isTrue: false }
  ],
  story: {
    words: ['head', 'hair', 'eyes', 'nose', 'ears', 'mouth', 'teeth'],
    sentences: [
      { text: 'I wear a warm winter hat on my _.', answer: 'head', hintPic: '👤' },
      { text: 'I use a comb to brush my _.', answer: 'hair', hintPic: '💇' },
      { text: 'I read my favorite book with my two _.', answer: 'eyes', hintPic: '👁️' },
      { text: 'I smell the fresh cookies with my _.', answer: 'nose', hintPic: '👃' },
      { text: 'I listen to my teacher with my _.', answer: 'ears', hintPic: '👂' },
      { text: 'I say hello using my _.', answer: 'mouth', hintPic: '👄' },
      { text: 'I bite the apple with my white _.', answer: 'teeth', hintPic: '🦷' }
    ]
  },
  reading: {
    text: 'Look at the clown! He has a funny face. He paints a big red nose. He draws circles around his eyes. He has a very wide smile on his mouth. He puts on a curly wig to cover his hair.',
    questions: [
      { q: 'What does the clown paint red?', options: ['His nose', 'His ears', 'His teeth'], answer: 0 },
      { q: 'What does he draw around his eyes?', options: ['Squares', 'Circles', 'Stars'], answer: 1 },
      { q: 'Where is his wide smile?', options: ['On his head', 'On his mouth', 'On his hair'], answer: 1 },
      { q: 'What covers his hair?', options: ['A hat', 'A wig', 'A mask'], answer: 1 },
      { q: 'Is the clown’s face funny or scary?', options: ['Funny', 'Scary', 'Sleepy'], answer: 0 }
    ]
  },
  chat: {
    lines: [
      { speaker: 'Leo', text: 'My tooth is loose, Mia.' },
      { speaker: 'Mia', text: 'Wow! Is it a front tooth?' },
      { speaker: 'Leo', text: 'Yes, it is right in the middle of my mouth.' },
      { speaker: 'Mia', text: 'When it falls out, the Tooth Fairy will come!' }
    ],
    questions: [
      { q: 'What is loose on Leo?', options: ['His ear', 'His tooth', 'His nose'], answer: 1 },
      { q: 'Where is the loose tooth?', options: ['In the back', 'In the middle of his mouth', 'Under his tongue'], answer: 1 },
      { q: 'Who will come when it falls out?', options: ['The Tooth Fairy', 'Santa Claus', 'The doctor'], answer: 0 }
    ]
  }
});

// 5. Body
registerTheme({
  id: 'body', title: 'Body', icon: '🧍',
  words: [
    { id: 'w1', word: 'Neck', emoji: '🧣', clue: 'It connects your head to your shoulders.' },
    { id: 'w2', word: 'Shoulder', emoji: '🤷', clue: 'The top part of your arms near your neck.' },
    { id: 'w3', word: 'Arm', emoji: '💪', clue: 'You have two of these to reach for things.' },
    { id: 'w4', word: 'Hand', emoji: '🖐️', clue: 'You use this to hold a pencil or wave hello.' },
    { id: 'w5', word: 'Finger', emoji: '👆', clue: 'You have ten of these on your hands.' },
    { id: 'w6', word: 'Leg', emoji: '🦵', clue: 'You use these to walk and run.' },
    { id: 'w7', word: 'Knee', emoji: '🧎', clue: 'The joint in the middle of your leg that bends.' },
    { id: 'w8', word: 'Foot', emoji: '🦶', clue: 'You wear a shoe on this.' },
    { id: 'w9', word: 'Stomach', emoji: '🫃', clue: 'Food goes here when you eat. It rumbles when you are hungry.' },
    { id: 'w10', word: 'Hips', emoji: '💃', clue: 'You move these when you dance or swing a hula hoop.' },
    { id: 'w11', word: 'Chest', emoji: '🫁', clue: 'The front of your body, below your neck. Your heart is inside.' },
    { id: 'w12', word: 'Thigh', emoji: '🍗', clue: 'The top part of your leg, between your hip and your knee.' },
    { id: 'w13', word: 'Calf', emoji: '🦿', clue: 'The back part of your leg, between your knee and your foot.' },
    { id: 'w14', word: 'Toes', emoji: '👣', clue: 'You have ten of these on your feet.' }
  ],
  sentences: [
    { words: ['I', 'have', 'two', 'long', 'arms.'] },
    { words: ['I', 'wave', 'hello', 'with', 'my', 'hand.'] },
    { words: ['I', 'can', 'run', 'fast', 'with', 'my', 'legs.'] },
    { words: ['Put', 'the', 'shoe', 'on', 'your', 'foot.'] },
    { words: ['I', 'have', 'ten', 'fingers', 'on', 'my', 'hands.'] },
    { words: ['I', 'wear', 'a', 'scarf', 'around', 'my', 'neck.'] },
    { words: ['My', 'knee', 'bends', 'when', 'I', 'jump.'] },
    { words: ['I', 'carry', 'a', 'bag', 'on', 'my', 'shoulder.'] },
    { words: ['Clap', 'your', 'hands', 'together!'] },
    { words: ['Stomp', 'your', 'feet', 'on', 'the', 'floor!'] }
  ],
  trueFalse: [
    { text: 'You wear a shoe on your foot.', isTrue: true },
    { text: 'Your knee is in the middle of your arm.', isTrue: false },
    { text: 'You have ten fingers.', isTrue: true },
    { text: 'You wave hello with your leg.', isTrue: false },
    { text: 'Your neck connects your head to your body.', isTrue: true },
    { text: 'You run using your arms.', isTrue: false },
    { text: 'You hold a pencil with your hand.', isTrue: true },
    { text: 'You carry a backpack on your shoulders.', isTrue: true },
    { text: 'You have three legs.', isTrue: false },
    { text: 'Your finger is part of your hand.', isTrue: true }
  ],
  story: {
    words: ['neck', 'shoulders', 'arms', 'hands', 'fingers', 'legs', 'feet'],
    sentences: [
      { text: 'It is cold, so I put a scarf around my _.', answer: 'neck', hintPic: '🧣' },
      { text: 'My backpack is heavy on my _.', answer: 'shoulders', hintPic: '🤷' },
      { text: 'I stretch my two _ up high.', answer: 'arms', hintPic: '💪' },
      { text: 'I wash my _ with soap and water.', answer: 'hands', hintPic: '🖐️' },
      { text: 'I count to ten using my _.', answer: 'fingers', hintPic: '👆' },
      { text: 'I use my strong _ to jump over the log.', answer: 'legs', hintPic: '🦵' },
      { text: 'I put warm socks on my _.', answer: 'feet', hintPic: '🦶' }
    ]
  },
  reading: {
    text: 'It is time for gym class! The teacher says, "Stand up and stretch!" First, we reach our arms up high. Next, we bend our knees and touch our feet with our fingers. Finally, we jump up on our legs and clap our hands.',
    questions: [
      { q: 'What class is it time for?', options: ['Gym class', 'Art class', 'Math class'], answer: 0 },
      { q: 'What do they reach up high?', options: ['Their feet', 'Their arms', 'Their knees'], answer: 1 },
      { q: 'What do they bend?', options: ['Their neck', 'Their knees', 'Their fingers'], answer: 1 },
      { q: 'What do they touch with their fingers?', options: ['Their head', 'Their shoulders', 'Their feet'], answer: 2 },
      { q: 'What do they do at the end?', options: ['Go to sleep', 'Jump and clap hands', 'Sit down'], answer: 1 }
    ]
  },
  chat: {
    lines: [
      { speaker: 'Leo', text: 'Ouch! I fell down while running.' },
      { speaker: 'Mia', text: 'Oh no! Did you hurt your leg?' },
      { speaker: 'Leo', text: 'Yes, I scraped my knee on the ground.' },
      { speaker: 'Mia', text: 'Let us go wash it and put a bandage on it.' }
    ],
    questions: [
      { q: 'What happened to Leo?', options: ['He fell down.', 'He lost a shoe.', 'He found a toy.'], answer: 0 },
      { q: 'What part of his body did he scrape?', options: ['His arm', 'His knee', 'His finger'], answer: 1 },
      { q: 'What will they put on the scrape?', options: ['A hat', 'A bandage', 'A sticker'], answer: 1 }
    ]
  }
});

// 6. House
registerTheme({
  id: 'house', title: 'House', icon: '🏡',
  words: [
    { id: 'w1', word: 'House', emoji: '🏡', clue: 'A building where a family lives.' },
    { id: 'w2', word: 'Living room', emoji: '🛋️', clue: 'The room where you sit on the sofa and watch TV.' },
    { id: 'w3', word: 'Bedroom', emoji: '🛏️', clue: 'The room where you sleep in a bed.' },
    { id: 'w4', word: 'Bathroom', emoji: '🛁', clue: 'The room where you wash and take a bath.' },
    { id: 'w5', word: 'Kitchen', emoji: '🍳', clue: 'The room where you cook food.' },
    { id: 'w6', word: 'Dining room', emoji: '🍽️', clue: 'The room where you eat dinner at a table.' },
    { id: 'w7', word: 'Garden', emoji: '🌷', clue: 'The place outside with grass and flowers.' },
    { id: 'w8', word: 'Door', emoji: '🚪', clue: 'You open this to enter the house.' },
    { id: 'w9', word: 'Roof', emoji: '🏠', clue: 'The top of the house that keeps out the rain.' },
    { id: 'w10', word: 'Window', emoji: '🪟', clue: 'You look through this glass to see outside.' },
    { id: 'w11', word: 'Table', emoji: '🪵', clue: 'You put food or books on this flat piece of furniture.' },
    { id: 'w12', word: 'Chair', emoji: '🪑', clue: 'You sit on this at the table.' },
    { id: 'w13', word: 'Cupboard', emoji: '🗄️', clue: 'A place with doors where you keep plates and food.' },
    { id: 'w14', word: 'Wall', emoji: '🧱', clue: 'A side of a room that holds up the roof.' },
    { id: 'w15', word: 'Floor', emoji: '🧹', clue: 'The surface you walk on inside the house.' },
    { id: 'w16', word: 'Clock', emoji: '🕐', clue: 'It tells you what time it is.' },
    { id: 'w17', word: 'Lamp', emoji: '💡', clue: 'It gives you light when it is dark.' },
    { id: 'w18', word: 'Bed', emoji: '🛌', clue: 'You lie down on this to sleep at night.' },
    { id: 'w19', word: 'Pillow', emoji: '😴', clue: 'A soft cushion you rest your head on.' },
    { id: 'w20', word: 'Bolster', emoji: '💤', clue: 'A long, round pillow you hug or put beside you in bed.' },
    { id: 'w21', word: 'Blanket', emoji: '🧶', clue: 'A soft cover that keeps you warm in bed.' },
    { id: 'w22', word: 'Spoon', emoji: '🥄', clue: 'You use this to eat soup or ice cream.' },
    { id: 'w23', word: 'Fork', emoji: '🍴', clue: 'You use this to pick up food like pasta.' },
    { id: 'w24', word: 'Plate', emoji: '🍛', clue: 'A flat dish you put your food on.' },
    { id: 'w25', word: 'Bowl', emoji: '🥣', clue: 'A round dish for soup or cereal.' },
    { id: 'w26', word: 'Knife', emoji: '🔪', clue: 'You use this to cut food. Be careful, it is sharp!' },
    { id: 'w27', word: 'Stove', emoji: '🔥', clue: 'You cook food on top of this in the kitchen.' },
    { id: 'w28', word: 'Glass', emoji: '🥛', clue: 'You drink water or milk from this.' },
    { id: 'w29', word: 'Refrigerator', emoji: '🧊', clue: 'A cold machine that keeps food fresh.' },
    { id: 'w30', word: 'Towel', emoji: '🧖', clue: 'You dry your body with this after a bath.' },
    { id: 'w31', word: 'Toothbrush', emoji: '🪥', clue: 'You use this to clean your teeth.' },
    { id: 'w32', word: 'Toothpaste', emoji: '🦷', clue: 'You put this on your brush to clean your teeth.' },
    { id: 'w33', word: 'Sink', emoji: '🚰', clue: 'You wash your hands in this. It has a tap.' },
    { id: 'w34', word: 'Soap', emoji: '🧼', clue: 'You use this with water to get clean.' },
    { id: 'w35', word: 'Shower', emoji: '🚿', clue: 'Water falls from above to wash your body.' }
  ],
  sentences: [
    { words: ['We', 'live', 'in', 'a', 'big', 'house.'] },
    { words: ['I', 'sleep', 'in', 'my', 'quiet', 'bedroom.'] },
    { words: ['Mom', 'cooks', 'dinner', 'in', 'the', 'kitchen.'] },
    { words: ['We', 'watch', 'TV', 'in', 'the', 'living', 'room.'] },
    { words: ['I', 'wash', 'my', 'hands', 'in', 'the', 'bathroom.'] },
    { words: ['We', 'eat', 'at', 'the', 'dining', 'room', 'table.'] },
    { words: ['I', 'water', 'the', 'flowers', 'in', 'the', 'garden.'] },
    { words: ['Please', 'close', 'the', 'front', 'door.'] },
    { words: ['My', 'house', 'has', 'many', 'windows.'] },
    { words: ['I', 'love', 'my', 'cozy', 'home.'] }
  ],
  trueFalse: [
    { text: 'You sleep in the kitchen.', isTrue: false },
    { text: 'You cook food in the kitchen.', isTrue: true },
    { text: 'The garden is inside the bedroom.', isTrue: false },
    { text: 'You watch TV in the living room.', isTrue: true },
    { text: 'You take a bath in the bathroom.', isTrue: true },
    { text: 'We eat meals in the dining room.', isTrue: true },
    { text: 'You sleep in a bed in the bedroom.', isTrue: true },
    { text: 'You open a window to walk into the house.', isTrue: false },
    { text: 'Flowers grow in the garden.', isTrue: true },
    { text: 'A house is a place where you live.', isTrue: true }
  ],
  story: {
    words: ['door', 'living room', 'kitchen', 'dining room', 'bathroom', 'bedroom', 'garden'],
    sentences: [
      { text: 'I open the front _ to enter my house.', answer: 'door', hintPic: '🚪' },
      { text: 'I sit on the sofa in the _.', answer: 'living room', hintPic: '🛋️' },
      { text: 'Mom is cooking eggs in the _.', answer: 'kitchen', hintPic: '🍳' },
      { text: 'We eat our breakfast in the _.', answer: 'dining room', hintPic: '🍽️' },
      { text: 'I brush my teeth in the _.', answer: 'bathroom', hintPic: '🛁' },
      { text: 'At night, I go to sleep in my _.', answer: 'bedroom', hintPic: '🛏️' },
      { text: 'In the morning, I play outside in the _.', answer: 'garden', hintPic: '🌷' }
    ]
  },
  reading: {
    text: 'Welcome to Mia’s house. It has a red door. Inside, the living room is very bright. Next to it is the kitchen, where her dad cooks pasta. Upstairs, there is a blue bathroom and Mia’s bedroom. Behind the house is a small garden with a swing.',
    questions: [
      { q: 'What color is the front door?', options: ['Red', 'Blue', 'Green'], answer: 0 },
      { q: 'Who cooks pasta in the kitchen?', options: ['Mia', 'Her dad', 'Her mom'], answer: 1 },
      { q: 'What color is the bathroom?', options: ['Pink', 'White', 'Blue'], answer: 2 },
      { q: 'Where is Mia’s bedroom?', options: ['Upstairs', 'In the garden', 'In the kitchen'], answer: 0 },
      { q: 'What is in the garden?', options: ['A car', 'A swing', 'A pool'], answer: 1 }
    ]
  },
  chat: {
    lines: [
      { speaker: 'Leo', text: 'Where are you, Mia?' },
      { speaker: 'Mia', text: 'I am in the kitchen getting a snack.' },
      { speaker: 'Leo', text: 'Can you bring me some juice to the living room?' },
      { speaker: 'Mia', text: 'Sure! I will bring it to the sofa right now.' }
    ],
    questions: [
      { q: 'Where is Mia?', options: ['In the bedroom', 'In the kitchen', 'In the garden'], answer: 1 },
      { q: 'Where is Leo?', options: ['In the bathroom', 'In the living room', 'Outside'], answer: 1 },
      { q: 'What does Leo want?', options: ['An apple', 'Some juice', 'A sandwich'], answer: 1 }
    ]
  }
});

// PROGRAMMATICALLY GENERATE THE 29 REMAINING THEMES TO KEEP CODE CONCISE
const extraThemesList = [
  { id: 'school', title: 'School', icon: '🎒', words: ['Class', 'Math', 'Pen', 'Book', 'Desk', 'Bag', 'Ruler', 'Eraser', 'Schoolyard', 'Teacher’s room', 'Canteen', 'School clinic', 'Student', 'Teacher', 'Headmaster', 'Classmate', 'Whiteboard', 'Flag', 'Pencil', 'Sharpener', 'Color pencil', 'Notebook', 'Sketchbook', 'Scissors', 'Glue', 'Tape', 'Pencil case', 'Highlighter', 'English', 'Science', 'Geography', 'History', 'Art', 'Music', 'Computer', 'P.E.'], emojis: ['🏫','➕','🖊️','📖','🪑','🎒','📏','🧽', '🛝', '🚪', '🍽️', '🏥', '🧑‍🎓', '🧑‍🏫', '👨‍💼', '🧑‍🤝‍🧑', '📋', '🚩', '✏️', '🔧', '🖍️', '📓', '🎨', '✂️', '🧴', '📎', '👝', '🖊️', '🔤', '🔬', '🌍', '📜', '🖌️', '🎵', '💻', '🏃'] },
  { id: 'animals', title: 'Animals', icon: '🦁', words: ['Lion', 'Bug', 'Fish', 'Bird', 'Bear', 'Tiger', 'Frog', 'Deer', 'Dog', 'Cat', 'Rabbit', 'Elephant', 'Dolphin', 'Giraffe', 'Snake', 'Crocodile', 'Gorilla', 'Hippo', 'Kangaroo', 'Monkey', 'Panda', 'Penguin', 'Zebra', 'Pigeon', 'Eagle', 'Owl', 'Butterfly', 'Bee', 'Mosquito', 'Fly', 'Spider', 'Ant', 'Cockroach', 'Starfish', 'Turtle', 'Jellyfish', 'Squid', 'Octopus', 'Shrimp', 'Seahorse', 'Clam', 'Seal', 'Whale', 'Shark', 'Cub', 'Kitten', 'Chick', 'Calf', 'Fawn', 'Puppy', 'Duckling', 'Tadpole', 'Foal', 'Joey', 'Piglet', 'Bunny', 'Lamb'], emojis: ['🦁','🐛','🐟','🐦','🐻','🐯','🐸','🦌','🐶','🐱','🐰','🐘','🐬','🦒','🐍','🐊','🦍','🦛','🦘','🐵','🐼','🐧','🦓','🕊️','🦅','🦉','🦋','🐝','🦟','🪰','🕷️','🐜','🪳','⭐','🐢','🪼','🦑','🐙','🦐','🐴🌊','🦪','🦭','🐋','🦈','🐻‍❄️','😺','🐥','🐮','🦌🍼','🐕','🦆','🫧🐸','🐴','🦘🍼','🐷','🐇','🐑'] },
  { id: 'fruits', title: 'Fruits', icon: '🍎', words: ['Apple', 'Banana', 'Grape', 'Melon', 'Peach', 'Lemon', 'Berry', 'Plum', 'Cherry', 'Orange', 'Pear', 'Strawberry', 'Watermelon', 'Blueberry', 'Kiwi', 'Avocado', 'Dragon Fruit', 'Guava', 'Lychee', 'Mango', 'Pineapple', 'Star Fruit'], emojis: ['🍎','🍌','🍇','🍈','🍑','🍋','🍓','🫐','🍒','🍊','🍐','🍓','🍉','🫐','🥝','🥑','🐉','🍏','🔴','🥭','🍍','⭐'] },
  { id: 'vegetables', title: 'Vegetables', icon: '🥦', words: ['Carrot', 'Corn', 'Pea', 'Onion', 'Potato', 'Tomato', 'Garlic', 'Bean', 'Spinach', 'Lettuce', 'Cabbage', 'Leek', 'Asparagus', 'Broccoli', 'Cauliflower', 'Cucumber', 'Eggplant', 'Chilli', 'Pumpkin'], emojis: ['🥕','🌽','🫛','🧅','🥔','🍅','🧄','🫘','🌿','🥬','🥗','🎋','🌱','🥦','🌼','🥒','🍆','🌶️','🎃'] },
  { id: 'foods', title: 'Foods & Drinks', icon: '🍔', words: ['Burger', 'Pizza', 'Cake', 'Milk', 'Juice', 'Bread', 'Egg', 'Soup', 'Chicken', 'Beef', 'Fish', 'Sausage', 'Shrimp', 'Tuna', 'Sushi', 'Cheese', 'Yogurt', 'Rice', 'Pasta', 'Noodles', 'Sandwich', 'Tacos', 'Ramen', 'French Fries', 'Popcorn', 'Chips', 'Cookie', 'Chocolate', 'Ice Cream', 'Doughnut', 'Brownie', 'Water', 'Coffee', 'Tea', 'Fruit Juice', 'Smoothies', 'Hot Chocolate', 'Soda', 'Milkshake'], emojis: ['🍔','🍕','🍰','🥛','🧃','🍞','🥚','🥣','🍗','🥩','🐟','🌭','🍤','🥫','🍣','🧀','🥄','🍚','🍝','🥢','🥪','🌮','🍜','🍟','🍿','🥔','🍪','🍫','🍦','🍩','🟫','💧','☕','🍵','🍊','🍹','🍫☕','🥤','🧋'] },
  { id: 'hospital', title: 'Hospital', icon: '🏥', words: ['Nurse', 'Doctor', 'Bed', 'Pill', 'Shot', 'Band', 'Xray', 'Cast', 'Ambulance', 'Emergency room', 'Operating room', 'Ward', 'Pharmacy', 'Stethoscope', 'Thermometer', 'Blood pressure', 'Injection', 'Patient', 'Surgeon', 'Dentist', 'Pharmacist', 'Check-up', 'Take medicine', 'Rest', 'Recover'], emojis: ['👩‍⚕️','👨‍⚕️','🛏️','💊','💉','🩹','🩻','🤕','🚑','🚨','😷','🛌','⚕️','🩺','🌡️','🩸','💉','🤒','🥼','🦷','🧪','📋','💊','😴','💪'] },
  { id: 'health', title: 'Health', icon: '🤒', words: ['Cold', 'Cough', 'Fever', 'Ache', 'Pain', 'Sick', 'Hurt', 'Headache', 'Sore throat', 'Stomachache', 'Toothache', 'Runny nose', 'Broken arm', 'Broken leg', 'Backache', 'Diarrhea', 'Asthma', 'Bump', 'Sunburn', 'Bloody nose', 'Cut', 'Bruise', 'Sneeze', 'Fatigue', 'Dizziness'], emojis: ['🤧','🗣️','🤒','🤕','🩹','🤢','😭', '🤯', '😷', '🤮', '🦷', '👃', '🦴', '🩼', '🧍', '🚽', '🫁', '🔴', '🌞', '🩸', '✂️', '🟣', '💨', '😩', '😵‍💫'] },
  { id: 'occupations', title: 'Occupations', icon: '👮', words: ['Cop', 'Chef', 'Vet', 'Pilot', 'Judge', 'Baker', 'Guard', 'Maid', 'Artist', 'Doctor', 'Teacher', 'Farmer', 'Firefighter', 'Singer', 'Dancer', 'Nurse'], emojis: ['👮','👨‍🍳','🐕‍🦺','👨‍✈️','⚖️','🥖','💂','🧹','🎨','👨‍⚕️','👩‍🏫','👨‍🌾','👨‍🚒','🎤','💃','👩‍⚕️'] },
  { id: 'transportation', title: 'Transportation', icon: '🚗', words: ['Car', 'Bus', 'Train', 'Boat', 'Ship', 'Jet', 'Taxi', 'Airplane', 'Helicopter', 'Hot air balloon', 'Rocket', 'Spaceship', 'Truck', 'Fire truck', 'Ambulance', 'Motorcycle', 'Bicycle', 'Submarine'], emojis: ['🚗','🚌','🚆','⛵','🚢','✈️','🚕','🛩️','🚁','🎈','🚀','🛸','🚚','🚒','🚑','🏍️','🚴','🤿'] },
  { id: 'town', title: 'Town', icon: '🏙️', words: ['Bank', 'Park', 'Mall', 'Shop', 'Pool', 'Post', 'Zoo', 'Cafe', 'Hospital', 'Fire station', 'Library', 'Museum', 'School', 'Supermarket', 'Police office'], emojis: ['🏦','🌲','🏬','🏪','🏊','🏤','🦁','☕','🏥','🚒','📚','🏛️','🏫','🛒','👮'] },
  { id: 'hobbies', title: 'Hobbies', icon: '🎨', words: ['Drawing', 'Knitting', 'Photography', 'Running', 'Swimming', 'Cycling', 'Dancing', 'Climbing', 'Hiking', 'Gardening', 'Fishing', 'Camping', 'Reading', 'Listening to music', 'Baking', 'Singing', 'Playing games', 'Cooking', 'Watching TV', 'Shopping'], emojis: ['🖍️', '🧶', '📷', '🏃', '🏊', '🚴', '💃', '🧗', '🥾', '🌱', '🎣', '⛺', '📖', '🎧', '🧁', '🎤', '🎮', '🍳', '📺', '🛍️'] },
  { id: 'sports', title: 'Sports', icon: '⚽', words: ['Football', 'Basketball', 'Volleyball', 'Baseball', 'Tennis', 'Badminton', 'Table tennis', 'Running', 'Swimming', 'Gymnastics', 'Cycling', 'Boxing', 'Karate', 'Taekwondo', 'Golf', 'Ice hockey', 'Skiing', 'Ice skating', 'Surfing', 'Horse riding', 'Bowling', 'Archery'], emojis: ['⚽','🏀','🏐','⚾','🎾','🏸','🏓','🏃','🏊','🤸','🚴','🥊','🥋','🥋','⛳','🏒','⛷️','⛸️','🏄','🏇','🎳','🏹'] },
  { id: 'action', title: 'Action Verbs', icon: '🏃', words: ['Run', 'Walk', 'Talk', 'Eat', 'Play', 'Jump', 'Read', 'Sleep', 'Sit', 'Stand', 'Drink', 'Work', 'Listen', 'Watch', 'Write', 'Drive', 'Sing', 'Dance', 'Shout', 'Cry', 'Laugh', 'Cook', 'Study', 'Help', 'Draw', 'Swim', 'Go', 'Explain', 'Finish', 'Hug', 'Yawn', 'Knock', 'Call', 'Clap', 'Kick', 'Throw', 'Wash', 'Ride', 'Wear', 'See', 'Hear', 'Taste', 'Feel'], emojis: ['🏃','🚶','🗣️','🍽️','⚽','🦘','📖','😴', '🪑', '🧍', '🥤', '💼', '🎧', '⌚', '✍️', '🚗', '🎤', '💃', '📢', '😭', '😂', '🍳', '📚', '🤝', '🎨', '🏊', '➡️', '💡', '🏁', '🤗', '🥱', '🚪', '📞', '👏', '🦵', '🤾', '🧼', '🚴', '🧥', '👁️', '👂', '👅', '🤲'] },
  { id: 'clothes', title: 'Clothes', icon: '👕', words: ['Shirt', 'Pant', 'Shoe', 'Sock', 'Coat', 'Hat', 'Dress', 'Skirt', 'T-shirt', 'Jeans', 'Sweater', 'Jacket', 'Shorts', 'Raincoat', 'Boots', 'Slippers', 'Flip-flops', 'High heels', 'Sneakers'], emojis: ['👔','👖','👞','🧦','🧥','🎩','👗','🥻','👕','👖','🧶','🧥','🩳','☔','👢','🥿','🩴','👠','👟'] },
  { id: 'accessories', title: 'Accessories', icon: '🕶️', words: ['Ring', 'Watch', 'Belt', 'Tie', 'Bag', 'Pin', 'Bow', 'Cap', 'Hair band', 'Earrings', 'Necklace', 'Bracelet', 'Glasses', 'Sunglasses', 'Scarf', 'Gloves'], emojis: ['💍','⌚','🥋','👔','👜','🧷','🎀','🧢','💇‍♀️','👂','📿','🔗','👓','🕶️','🧣','🧤'] },
  { id: 'calendar', title: 'Calendar', icon: '📅', words: ['Day', 'Week', 'Month', 'Year', 'Time', 'Date', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Today', 'Tomorrow', 'Yesterday', 'Before', 'After', 'First', 'Last', 'Next', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], emojis: ['🌞', '📅', '🗓️', '🎆', '⏱️', '📝', '😴', '🌮', '🐫', '⚡', '🎉', '🎈', '😌', '📍', '🔜', '🔙', '⏪', '⏩', '🥇', '🏁', '➡️', '❄️', '💝', '🍀', '🌧️', '🌸', '☀️', '🏖️', '🌻', '🍂', '🎃', '🦃', '🎄'], sentences: [{"words": ["This", "is", "a", "day."]}, {"words": ["This", "is", "a", "week."]}, {"words": ["This", "is", "a", "month."]}, {"words": ["This", "is", "a", "year."]}, {"words": ["What", "time", "is", "it?"]}, {"words": ["What", "is", "the", "date?"]}, {"words": ["Today", "is", "Monday."]}, {"words": ["Today", "is", "Tuesday."]}, {"words": ["Today", "is", "Wednesday."]}, {"words": ["Today", "is", "Thursday."]}, {"words": ["Today", "is", "Friday."]}, {"words": ["Today", "is", "Saturday."]}, {"words": ["Today", "is", "Sunday."]}, {"words": ["Today", "is", "a", "nice", "day."]}, {"words": ["See", "you", "tomorrow."]}, {"words": ["I", "was", "busy", "yesterday."]}, {"words": ["Wash", "before", "you", "eat."]}, {"words": ["Play", "after", "school."]}, {"words": ["I", "am", "first."]}, {"words": ["He", "is", "last."]}, {"words": ["Who", "is", "next?"]}, {"words": ["It", "is", "in", "January."]}, {"words": ["It", "is", "in", "February."]}, {"words": ["It", "is", "in", "March."]}, {"words": ["It", "is", "in", "April."]}, {"words": ["It", "is", "in", "May."]}, {"words": ["It", "is", "in", "June."]}, {"words": ["It", "is", "in", "July."]}, {"words": ["It", "is", "in", "August."]}, {"words": ["It", "is", "in", "September."]}, {"words": ["It", "is", "in", "October."]}, {"words": ["It", "is", "in", "November."]}, {"words": ["It", "is", "in", "December."]}, {"words": ["I", "like", "it", "very", "much."]}, {"words": ["We", "can", "see", "it", "now."]}], trueFalse: [{"text": "Is Monday a day?", "isTrue": true}, {"text": "Does a week have seven days?", "isTrue": true}, {"text": "Is May a month?", "isTrue": true}, {"text": "Does a year have twelve months?", "isTrue": true}, {"text": "Can a clock tell the time?", "isTrue": true}, {"text": "Is the fifth of May a date?", "isTrue": true}, {"text": "Is Monday a day of the week?", "isTrue": true}, {"text": "Does Tuesday come after Monday?", "isTrue": true}, {"text": "Is Wednesday a month?", "isTrue": false}, {"text": "Is Thursday a day of the week?", "isTrue": true}, {"text": "Does Friday come before Saturday?", "isTrue": true}, {"text": "Is Saturday a month?", "isTrue": false}, {"text": "Is Sunday a day of the week?", "isTrue": true}, {"text": "Is today before tomorrow?", "isTrue": true}, {"text": "Does tomorrow come after today?", "isTrue": true}, {"text": "Is yesterday before today?", "isTrue": true}, {"text": "Does before mean earlier?", "isTrue": true}, {"text": "Does after mean earlier?", "isTrue": false}, {"text": "Is first the number one place?", "isTrue": true}, {"text": "Is last the number one place?", "isTrue": false}, {"text": "Does next mean coming soon after this?", "isTrue": true}, {"text": "Is January a month?", "isTrue": true}, {"text": "Is February a day?", "isTrue": false}, {"text": "Is March a month?", "isTrue": true}, {"text": "Is April a month?", "isTrue": true}, {"text": "Is May a day of the week?", "isTrue": false}, {"text": "Is June a month?", "isTrue": true}, {"text": "Is July a month?", "isTrue": true}, {"text": "Is August a month?", "isTrue": true}, {"text": "Is September a month?", "isTrue": true}, {"text": "Is October a day?", "isTrue": false}, {"text": "Is November a month?", "isTrue": true}, {"text": "Is December a month?", "isTrue": true}, {"text": "Is the sky green?", "isTrue": false}, {"text": "Are apples red?", "isTrue": true}], story: {"words": ["week", "year", "month", "monday", "tomorrow", "yesterday", "before"], "sentences": [{"text": "There are seven days in a _.", "answer": "week", "hintPic": "📅"}, {"text": "There are twelve months in a _.", "answer": "year", "hintPic": "🎆"}, {"text": "January is the first _.", "answer": "month", "hintPic": "🗓️"}, {"text": "The school week starts on _.", "answer": "monday", "hintPic": "😴"}, {"text": "The day after today is _.", "answer": "tomorrow", "hintPic": "🔜"}, {"text": "The day before today is _.", "answer": "yesterday", "hintPic": "🔙"}, {"text": "Friday comes _ Saturday.", "answer": "before", "hintPic": "⏪"}]} },
  { id: 'weather', title: 'Weather & Seasons', icon: '☀️', words: ['Sun', 'Rain', 'Snow', 'Wind', 'Cloud', 'Storm', 'Hot', 'Cold', 'Sunny', 'Cloudy', 'Rainy', 'Windy', 'Partly cloudy', 'Stormy', 'Snowy', 'Rainbow', 'Foggy', 'Umbrella', 'Warm', 'Wet', 'Freezing', 'Snowman', 'Thunder', 'Spring', 'Summer', 'Fall', 'Winter'], emojis: ['☀️','🌧️','❄️','🌬️','☁️','⛈️','🥵','🥶','🌞','🌥️','🌦️','💨','⛅','🌩️','🌨️','🌈','🌫️','☂️','🌡️','💦','🧊','⛄','⚡','🌸','🏖️','🍂','🧣'],
    sentences: [{ words: ['The', 'sun', 'is', 'bright.'] }, { words: ['It', 'is', 'raining.'] }, { words: ['Snow', 'is', 'white.'] }, { words: ['The', 'wind', 'is', 'strong.'] }, { words: ['I', 'see', 'a', 'cloud.'] }, { words: ['The', 'storm', 'is', 'loud.'] }, { words: ['The', 'sun', 'is', 'hot.'] }, { words: ['Ice', 'is', 'cold.'] }, { words: ['It', 'is', 'a', 'sunny', 'day.'] }, { words: ['It', 'is', 'a', 'cloudy', 'day.'] }, { words: ['It', 'is', 'a', 'rainy', 'day.'] }, { words: ['It', 'is', 'a', 'windy', 'day.'] }, { words: ['It', 'is', 'partly', 'cloudy.'] }, { words: ['It', 'is', 'a', 'stormy', 'night.'] }, { words: ['It', 'is', 'a', 'snowy', 'day.'] }, { words: ['I', 'see', 'a', 'rainbow.'] }, { words: ['It', 'is', 'a', 'foggy', 'morning.'] }, { words: ['I', 'have', 'an', 'umbrella.'] }, { words: ['The', 'soup', 'is', 'warm.'] }, { words: ['My', 'socks', 'are', 'wet.'] }, { words: ['I', 'am', 'freezing.'] }, { words: ['We', 'made', 'a', 'snowman.'] }, { words: ['I', 'hear', 'thunder.'] }, { words: ['Flowers', 'bloom', 'in', 'spring.'] }, { words: ['Summer', 'is', 'hot.'] }, { words: ['Leaves', 'fall', 'in', 'fall.'] }, { words: ['Winter', 'is', 'cold.'] }],
    trueFalse: [{ text: 'The sun is hot.', isTrue: true }, { text: 'Is snow warm?', isTrue: false }, { text: 'Is rain wet?', isTrue: true }, { text: 'Does the wind blow?', isTrue: true }, { text: 'Is a cloud on the ground?', isTrue: false }, { text: 'Is a storm loud?', isTrue: true }, { text: 'Is fire hot?', isTrue: true }, { text: 'Is ice cold?', isTrue: true }, { text: 'Is it sunny when the sun is out?', isTrue: true }, { text: 'Is a cloudy sky full of clouds?', isTrue: true }, { text: 'Do we get wet on a rainy day?', isTrue: true }, { text: 'Is it windy when the wind blows?', isTrue: true }, { text: 'Is it partly cloudy when some clouds are in the sky?', isTrue: true }, { text: 'Is a stormy day calm and quiet?', isTrue: false }, { text: 'Does it snow on a snowy day?', isTrue: true }, { text: 'Can we see a rainbow after rain and sun?', isTrue: true }, { text: 'Is it easy to see far on a foggy day?', isTrue: false }, { text: 'Do we use an umbrella in the rain?', isTrue: true }, { text: 'Is a warm bath cold?', isTrue: false }, { text: 'Is water wet?', isTrue: true }, { text: 'Is freezing very cold?', isTrue: true }, { text: 'Is a snowman made of snow?', isTrue: true }, { text: 'Is thunder a loud sound?', isTrue: true }, { text: 'Do flowers bloom in spring?', isTrue: true }, { text: 'Is summer cold?', isTrue: false }, { text: 'Do leaves fall in fall?', isTrue: true }, { text: 'Is winter cold?', isTrue: true }] },
  { id: 'shapes', title: 'Shapes', icon: '🔺', words: ['Star', 'Box', 'Ring', 'Line', 'Dot', 'Cube', 'Cone', 'Oval', 'Circle', 'Square', 'Triangle', 'Rectangle', 'Diamond', 'Pentagon', 'Heart', 'Crescent', 'Arrow'], emojis: ['⭐', '⬜', '⭕', '➖', '•', '🧊', '🍦', '🥚', '🔵', '🟦', '🔺', '▬', '🔷', '⬟', '❤️', '🌙', '➡️'] },
  { id: 'solar', title: 'Solar System', icon: '🪐', words: ['Sun', 'Moon', 'Star', 'Mars', 'Earth', 'Space', 'Rock', 'Dust', 'Mercury', 'Venus', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Telescope', 'Meteor', 'Astronaut', 'Rocket'], emojis: ['☀️','🌙','⭐','🔴','🌍','🌌','🪨','💨','⚪','🟡','🟠','🪐','🔵','🌊','🔭','☄️','👨‍🚀','🚀'] },
  { id: 'geography', title: 'Geography', icon: '⛰️', words: ['Hill', 'Lake', 'Sea', 'Cave', 'Rock', 'Sand', 'Sky', 'High', 'Land', 'Field', 'Mountain', 'Volcano', 'Deserts', 'Forest', 'River', 'Pond', 'Stream', 'Waterfall', 'Valley', 'Ocean', 'Island', 'Beach'], emojis: ['⛰️','🏞️','🌊','🦇','🪨','🏖️','🌤️','🔝','🌍','🌾','🗻','🌋','🏜️','🌲','🏞️','🦆','💧','💦','🏔️','🌊','🏝️','🏖️'] },
  { id: 'feelings', title: 'Feelings', icon: '😃', words: ['Sad', 'Shy', 'Calm', 'Proud', 'Tired', 'Bored', 'Happy', 'Excited', 'Angry', 'Sleepy', 'Worried', 'Shocked', 'Afraid', 'Scared', 'Hungry', 'Thirsty'], emojis: ['😢','🫣','😌','😤','🥱','😒','😀','🤩','😡','😴','😟','😲','😨','😱','🤤','🥤'] },
  { id: 'senses', title: 'Five Senses', icon: '👁️', words: ['See', 'Hear', 'Smell', 'Taste', 'Touch', 'Look', 'Feel', 'Sound', 'Eyes', 'Ears', 'Nose', 'Tongue', 'Skin', 'Hands', 'Flavors'], emojis: ['👁️','👂','👃','👅','🖐️','👀','❤️','🎵','👁️','👂','👃','👅','🤚','🖐️','🍦'] },
  { id: 'opposite', title: 'Opposite Words', icon: '↔️', words: ['Hot', 'Cold', 'Big', 'Small', 'Fast', 'Slow', 'Up', 'Down', 'Tall', 'Short', 'Weak', 'Strong', 'Soft', 'Hard', 'Heavy', 'Light', 'Full', 'Empty', 'Dirty', 'Clean', 'Go', 'Stop', 'Open', 'Close', 'Push', 'Pull', 'Wet', 'Dry', 'New', 'Old', 'On', 'Off', 'Day', 'Night'], emojis: ['🔥', '🧊', '🐘', '🐜', '🐆', '🐢', '⬆️', '⬇️', '🦒', '🐭', '🥀', '💪', '🧸', '🪨', '🏋️', '🪶', '🥛', '🫙', '🐷', '🧼', '🟢', '🛑', '📖', '📕', '🛒', '🪢', '💦', '🌵', '🆕', '👴', '💡', '📴', '☀️', '🌙'],
    sentences: [{'words': ['The', 'fire', 'is', 'hot.']}, {'words': ['The', 'ice', 'is', 'cold.']}, {'words': ['The', 'elephant', 'is', 'big.']}, {'words': ['The', 'ant', 'is', 'small.']}, {'words': ['The', 'cheetah', 'is', 'fast.']}, {'words': ['The', 'turtle', 'is', 'slow.']}, {'words': ['The', 'arrow', 'goes', 'up.']}, {'words': ['The', 'arrow', 'goes', 'down.']}, {'words': ['The', 'giraffe', 'is', 'tall.']}, {'words': ['The', 'mouse', 'is', 'short.']}, {'words': ['The', 'flower', 'is', 'weak.']}, {'words': ['He', 'is', 'strong.']}, {'words': ['The', 'bear', 'is', 'soft.']}, {'words': ['The', 'rock', 'is', 'hard.']}, {'words': ['The', 'box', 'is', 'heavy.']}, {'words': ['The', 'feather', 'is', 'light.']}, {'words': ['The', 'glass', 'is', 'full.']}, {'words': ['The', 'jar', 'is', 'empty.']}, {'words': ['The', 'pig', 'is', 'dirty.']}, {'words': ['The', 'soap', 'is', 'clean.']}, {'words': ['Green', 'means', 'go.']}, {'words': ['Red', 'means', 'stop.']}, {'words': ['Open', 'the', 'book.']}, {'words': ['Close', 'the', 'book.']}, {'words': ['Push', 'the', 'cart.']}, {'words': ['Pull', 'the', 'rope.']}, {'words': ['The', 'rain', 'is', 'wet.']}, {'words': ['The', 'desert', 'is', 'dry.']}, {'words': ['I', 'have', 'a', 'new', 'toy.']}, {'words': ['He', 'is', 'an', 'old', 'man.']}, {'words': ['The', 'light', 'is', 'on.']}, {'words': ['The', 'phone', 'is', 'off.']}, {'words': ['The', 'sun', 'is', 'out', 'in', 'the', 'day.']}, {'words': ['The', 'moon', 'is', 'out', 'at', 'night.']}].concat([{ words: ['I', 'like', 'it', 'very', 'much.'] }, { words: ['We', 'can', 'see', 'it', 'now.'] }]),
    trueFalse: [{'text': 'The fire is hot.', 'isTrue': true}, {'text': 'Is ice hot?', 'isTrue': false}, {'text': 'An elephant is big.', 'isTrue': true}, {'text': 'An ant is big.', 'isTrue': false}, {'text': 'A cheetah is fast.', 'isTrue': true}, {'text': 'Is a turtle fast?', 'isTrue': false}, {'text': 'Is up the same as down?', 'isTrue': false}, {'text': 'A giraffe is tall.', 'isTrue': true}, {'text': 'Is a mouse tall?', 'isTrue': false}, {'text': 'A strong man can lift a lot.', 'isTrue': true}, {'text': 'A rock is soft.', 'isTrue': false}, {'text': 'A feather is light.', 'isTrue': true}, {'text': 'Is a feather heavy?', 'isTrue': false}, {'text': 'An empty jar has nothing in it.', 'isTrue': true}, {'text': 'A full glass has no water.', 'isTrue': false}, {'text': 'A pig can be dirty.', 'isTrue': true}, {'text': 'Soap makes things dirty.', 'isTrue': false}, {'text': 'Green means go.', 'isTrue': true}, {'text': 'Red means go.', 'isTrue': false}, {'text': 'You can open a book.', 'isTrue': true}, {'text': 'You pull a door to open it.', 'isTrue': true}, {'text': 'Is rain dry?', 'isTrue': false}, {'text': 'A desert is dry.', 'isTrue': true}, {'text': 'A new toy is old.', 'isTrue': false}, {'text': 'Is a lamp on when you turn it off?', 'isTrue': false}, {'text': 'The sun is out at night.', 'isTrue': false}, {'text': 'The moon is out at night.', 'isTrue': true}, {'text': 'Is the day the opposite of the night?', 'isTrue': true}, {'text': 'Is hot the opposite of cold?', 'isTrue': true}, {'text': 'Is small the opposite of big?', 'isTrue': true}, {'text': 'Is stop the opposite of go?', 'isTrue': true}, {'text': 'Is open the opposite of close?', 'isTrue': true}, {'text': 'Is push the opposite of pull?', 'isTrue': true}, {'text': 'Is old the opposite of new?', 'isTrue': true}] },
  { id: 'my_day', title: 'My Day', icon: '⏰', words: ['Wake', 'Wash', 'Eat', 'Go', 'Work', 'Play', 'Rest', 'Sleep', 'Get up', 'Have breakfast', 'Have lunch', 'Have dinner', 'Brush', 'Get dressed', 'School', 'Friends', 'Do', 'Homework', 'Take a shower', 'Bed', 'Face', 'Teeth', 'Ready', 'Watch TV', 'Time'], emojis: ['🌅', '🧼', '🍳', '🚶', '💼', '🎮', '🛋️', '🛌', '⏰', '🥞', '🥪', '🍝', '🪥', '👕', '🏫', '🧑‍🤝‍🧑', '✅', '📚', '🚿', '🛏️', '😊', '🦷', '🎒', '📺', '🕒'],
    sentences: [{'words': ['I', 'wake', 'up', 'early.']}, {'words': ['I', 'wash', 'my', 'hands.']}, {'words': ['We', 'eat', 'lunch.']}, {'words': ['I', 'go', 'home.']}, {'words': ['Dad', 'goes', 'to', 'work.']}, {'words': ['I', 'play', 'with', 'toys.']}, {'words': ['I', 'rest', 'on', 'the', 'sofa.']}, {'words': ['I', 'sleep', 'at', 'night.']}, {'words': ['I', 'get', 'up', 'at', 'seven.']}, {'words': ['I', 'have', 'breakfast', 'at', 'home.']}, {'words': ['We', 'have', 'lunch', 'at', 'school.']}, {'words': ['We', 'have', 'dinner', 'at', 'night.']}, {'words': ['I', 'brush', 'my', 'teeth.']}, {'words': ['I', 'get', 'dressed', 'for', 'school.']}, {'words': ['I', 'like', 'my', 'school.']}, {'words': ['My', 'friends', 'play', 'with', 'me.']}, {'words': ['I', 'do', 'my', 'homework.']}, {'words': ['I', 'finish', 'my', 'homework.']}, {'words': ['I', 'take', 'a', 'shower.']}, {'words': ['I', 'go', 'to', 'bed.']}, {'words': ['I', 'wash', 'my', 'face.']}, {'words': ['I', 'have', 'clean', 'teeth.']}, {'words': ['I', 'am', 'ready', 'for', 'school.']}, {'words': ['I', 'watch', 'TV', 'at', 'night.']}, {'words': ['It', 'is', 'time', 'to', 'sleep.']}],
    trueFalse: [{'text': 'I wake up in the morning.', 'isTrue': true}, {'text': 'Do we eat breakfast at night?', 'isTrue': false}, {'text': 'We have lunch in the middle of the day.', 'isTrue': true}, {'text': 'We have dinner in the evening.', 'isTrue': true}, {'text': 'We brush our teeth.', 'isTrue': true}, {'text': 'We get dressed before school.', 'isTrue': true}, {'text': 'Do we go to school on a bed?', 'isTrue': false}, {'text': 'Friends play together.', 'isTrue': true}, {'text': 'Do we do homework in the shower?', 'isTrue': false}, {'text': 'We take a shower to get clean.', 'isTrue': true}, {'text': 'We sleep in a bed.', 'isTrue': true}, {'text': 'We wash our face with water.', 'isTrue': true}, {'text': 'Teeth help us eat.', 'isTrue': true}, {'text': 'We watch TV with our feet.', 'isTrue': false}, {'text': 'Is a clock for time?', 'isTrue': true}, {'text': 'Are we ready when we are not prepared?', 'isTrue': false}] },
  { id: 'tree', title: 'Growing a Tree', icon: '🌱', words: ['Seed', 'Root', 'Leaf', 'Branch', 'Tree', 'Wood', 'Sprout', 'Trunk', 'Flower', 'Petals', 'Fruit', 'Thick', 'Absorb', 'Water', 'Grow', 'Bloom', 'Fallen'], emojis: ['🌰','🪢','🍃','🪵','🌳','🪵','🌱','🌲','🌷','🌸','🍎','📚','🧽','💧','📈','🌺','🍂'],
    sentences: [{'words': ['A', 'seed', 'is', 'in', 'the', 'ground.']}, {'words': ['The', 'root', 'goes', 'down.']}, {'words': ['A', 'sprout', 'comes', 'out.']}, {'words': ['The', 'trunk', 'is', 'thick.']}, {'words': ['The', 'roots', 'absorb', 'water.']}, {'words': ['The', 'tree', 'will', 'grow.']}, {'words': ['The', 'flower', 'has', 'petals.']}, {'words': ['Flowers', 'bloom', 'in', 'spring.']}, {'words': ['Fruit', 'grows', 'on', 'the', 'tree.']}, {'words': ['A', 'fallen', 'leaf', 'is', 'on', 'the', 'ground.']}],
    trueFalse: [{'text': 'A seed grows into a tree.', 'isTrue': true}, {'text': 'Roots absorb water.', 'isTrue': true}, {'text': 'A sprout is a small new plant.', 'isTrue': true}, {'text': 'A tree trunk is thick.', 'isTrue': true}, {'text': 'A flower has petals.', 'isTrue': true}, {'text': 'Fruit can grow on a tree.', 'isTrue': true}, {'text': 'Flowers bloom only at night.', 'isTrue': false}, {'text': 'A fallen leaf is still on the branch.', 'isTrue': false}, {'text': 'A tree can grow without water.', 'isTrue': false}, {'text': 'A thin stick is thick.', 'isTrue': false}] },
  { id: 'birthday', title: 'Birthday Party', icon: '🎂', words: ['Cake', 'Gift', 'Card', 'Bow', 'Hat', 'Toy', 'Song', 'Wish', 'Candle', 'Balloon', 'Ribbon', 'Party', 'Congratulations'], emojis: ['🎂', '🎁', '💌', '🎀', '🥳', '🧸', '🎶', '✨', '🕯️', '🎈', '🎗️', '🎉', '👏'],
    sentences: [{ words: ['This', 'is', 'a', 'cake.'] }, { words: ['This', 'is', 'a', 'gift.'] }, { words: ['This', 'is', 'a', 'card.'] }, { words: ['This', 'is', 'a', 'bow.'] }, { words: ['This', 'is', 'a', 'hat.'] }, { words: ['This', 'is', 'a', 'toy.'] }, { words: ['This', 'is', 'a', 'song.'] }, { words: ['This', 'is', 'a', 'wish.'] }, { words: ['This', 'is', 'a', 'candle.'] }, { words: ['This', 'is', 'a', 'balloon.'] }, { words: ['This', 'is', 'a', 'ribbon.'] }, { words: ['This', 'is', 'a', 'party.'] }, { words: ['Say', 'congratulations!'] }, { words: ['I', 'like', 'it', 'very', 'much.'] }, { words: ['We', 'can', 'see', 'it', 'now.'] }],
    trueFalse: [{ text: 'Is this a cake?', isTrue: true }, { text: 'Is this a gift?', isTrue: true }, { text: 'Is this a card?', isTrue: true }, { text: 'Is this a bow?', isTrue: true }, { text: 'Is this a hat?', isTrue: true }, { text: 'Is this a toy?', isTrue: true }, { text: 'Is this a song?', isTrue: true }, { text: 'Is this a wish?', isTrue: true }, { text: 'Is this a candle?', isTrue: true }, { text: 'Is this a balloon?', isTrue: true }, { text: 'Is this a ribbon?', isTrue: true }, { text: 'Is this a party?', isTrue: true }, { text: 'Do we say congratulations at a party?', isTrue: true }, { text: 'Is the sky green?', isTrue: false }, { text: 'Are apples red?', isTrue: true }] },
  { id: 'camping', title: 'Camping', icon: '⛺', words: ['Tent', 'Fire', 'Wood', 'Bug', 'Star', 'Moon', 'Bag', 'Path', 'Flashlight', 'Barbeque', 'Campfire', 'Sleeping bag'], emojis: ['⛺','🔥','🪵','🐛','⭐','🌙','🎒','🛤️','🔦','🍖','🏕️','🛌'] },
  { id: 'playground', title: 'Playground', icon: '🛝', words: ['Slide', 'Swing', 'Sand', 'Ball', 'Run', 'Jump', 'Play', 'Fun', 'Seesaw', 'Sandbox', 'Sandcastle', 'Jungle gym', 'Monkey bars'], emojis: ['🛝','🐒','🏖️','⚽','🏃','🤸','🪁','😆','⚖️','🪣','🏰','🧗','🐵'] },
  { id: 'toys', title: 'Toys', icon: '🧸', words: ['Doll', 'Car', 'Block', 'Bear', 'Ball', 'Kite', 'Train', 'Game', 'Board game', 'Dice', 'Puzzle', 'Robot', 'Spinning top', 'Rocking horse', 'Yo-yo'], emojis: ['🎎','🚗','🧱','🧸','🏀','🪁','🚆','🎮','♟️','🎲','🧩','🤖','🌀','🎠','🪀'] }
];

const CAL_PROPER = new Set(['monday','tuesday','wednesday','thursday','friday','saturday','sunday','january','february','march','april','may','june','july','august','september','october','november','december']);
const PLURAL_WORDS = new Set(['jeans', 'shorts', 'boots', 'slippers', 'flip-flops', 'high heels', 'sneakers', 'earrings', 'glasses', 'sunglasses', 'gloves', 'eyes', 'ears', 'hands', 'flavors']);
extraThemesList.forEach((t) => {
  registerTheme({
    id: t.id, title: t.title, icon: t.icon,
    words: t.words.map((w, i) => ({ id: 'w' + (i + 1), word: w, emoji: t.emojis[i], clue: `Let's learn about the word ${CAL_PROPER.has(w.toLowerCase()) ? w : w.toLowerCase()}.` })),
    sentences: t.sentences || t.words.map((w) => (PLURAL_WORDS.has(w.toLowerCase()) ? { words: ['These', 'are', w.toLowerCase() + '.'] } : { words: ['This', 'is', /^[aeiou]/i.test(w) ? 'an' : 'a', w.toLowerCase() + '.'] })).concat([
      { words: ['I', 'like', 'it', 'very', 'much.'] }, { words: ['We', 'can', 'see', 'it', 'now.'] }
    ]),
    trueFalse: t.trueFalse || t.words.map((w) => ({ text: PLURAL_WORDS.has(w.toLowerCase()) ? `Are these ${w.toLowerCase()}?` : `Is this ${/^[aeiou]/i.test(w) ? 'an' : 'a'} ${w.toLowerCase()}?`, isTrue: true })).concat([
      { text: 'Is the sky green?', isTrue: false }, { text: 'Are apples red?', isTrue: true }
    ]),
    story: t.story || {
      words: t.words.slice(0, 7).map(w => w.toLowerCase()),
      sentences: t.words.slice(0, 7).map((w, i) => ({ text: 'Here is a _.', answer: w.toLowerCase(), hintPic: t.emojis[i] }))
    },
    reading: {
      text: `Welcome to the ${t.title} lesson. We will learn many words today! Everyone is excited to practice English.`,
      questions: [
        { q: 'What lesson is this?', options: [t.title, 'Math lesson', 'Art lesson'], answer: 0 },
        { q: 'Are we learning words?', options: ['Yes', 'No', 'Maybe'], answer: 0 },
        { q: 'How many words?', options: ['Many words', 'No words', 'Three words'], answer: 0 },
        { q: 'Who is excited?', options: ['Everyone', 'Nobody', 'The cat'], answer: 0 },
        { q: 'What are we practicing?', options: ['English', 'Sleeping', 'Cooking'], answer: 0 }
      ]
    },
    chat: {
      lines: [
        { speaker: 'Leo', text: `Hi Mia, let's learn about ${t.title}.` },
        { speaker: 'Mia', text: `Great idea, Leo! I love ${t.title}.` }
      ],
      questions: [
        { q: 'Who wants to learn?', options: ['Leo', 'The dog', 'The teacher'], answer: 0 },
        { q: `Does Mia love ${t.title}?`, options: ['Yes', 'No', 'She hates it'], answer: 0 }
      ]
    }
  });
});

