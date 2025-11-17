import type { Card, CardIcon, GameMode, Player } from "@/hooks/useGameState";

export const AVAILABLE_ICONS: CardIcon[] = [
  // ❤️ Emotions & Human
  "Heart",
  "Brain",
  "Star",
  "Crown",
  "Trophy",
  "Medal",
  "Gift",
  "Rose",
  "BicepsFlexed",
  "BedDouble",

  // 🌍 Nature & Elements
  "Sun",
  "Moon",
  "Cloud",
  "Flame",
  "Leaf",
  "Flower",
  "Feather",
  "Mountain",
  "Fish",
  "Rabbit",
  "Bird",

  // ☕ Everyday Life & Objects
  "Coffee",
  "BookA",
  "Calendar1",
  "Watch",
  "Smartphone",
  "Key",
  "Umbrella",
  "Palette",
  "Music",
  "Lightbulb",

  // ⚙️ Tools & Machines
  "Camera",
  "Briefcase",
  "Bus",
  "Helicopter",
  "Tractor",
  "Rocket",
  "EvCharger",
  "FireExtinguisher",

  // 🛡️ Protection & Strength
  "Shield",
  "Anchor",
  "Flag",
  "ChessKnight",

  // 🌐 Concepts & Tech
  "Wifi",
  "Target",
  "Globe",
  "Aperture",
  "DraftingCompass",
  "Disc3",
  "Radio",
  "Bug",
  "Hexagon",

  // 🌀 Abstract / Misc
  "Eye",
  "Wind",
  "Compass",
  "Box",
];

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const generateCards = (cardCount: number): Card[] => {
  const pairCount = cardCount / 2;
  const selectedIcons = AVAILABLE_ICONS.slice(0, pairCount);


  const nonIdCards:Omit<Card,"id">[] = selectedIcons.map((icon)=>[{
        icon,
        isFlipped: false,
        isMatched: false,
      },
      {
        icon,
        isFlipped: false,
        isMatched: false,
      }]).flatMap(e=>e)


  const cards: Card[] = shuffleArray(nonIdCards).map((ele,index)=>({...ele, id: index}));
  return cards;
};

export const createPlayer = (
  index: number,
  isBot: boolean,
  name?: string
): Player => ({
  id: index,
  name: isBot ? `Bot` : name || `Player ${index}`,
  score: 0,
  isBot,
});

export const createPlayers = (
  playerCount: number,
  mode?: GameMode,
): Player[] => {
  if (mode === "bot") {
    return [createPlayer(1, false, "Me"), createPlayer(2, true)];
  }

  return Array.from({ length: playerCount }, (_, i) =>
    createPlayer(i + 1, false)
  );
};

export const boardWidth = (noOfCards: number) => {
  if (noOfCards <= 20) return "w-sm";
 
  return "";
};


export const userColors = [
  {
    backgroundColor: 'bg-blue-500',
    textColor: 'text-white',
  },
  {
    backgroundColor: 'bg-purple-500',
    textColor: 'text-white',
  },
  {
    backgroundColor: 'bg-pink-500',
    textColor: 'text-white',
  },
  {
    backgroundColor: 'bg-green-500',
    textColor: 'text-white',
  },
  {
    backgroundColor: 'bg-orange-500',
    textColor: 'text-white',
  },
  {
    backgroundColor: 'bg-red-500',
    textColor: 'text-white',
  },
  {
    backgroundColor: 'bg-indigo-500',
    textColor: 'text-white',
  },
  {
    backgroundColor: 'bg-cyan-500',
    textColor: 'text-white',
  },
]


export  const playSound = (type: 'tap' | 'match' | 'winner') => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const now = audioContext.currentTime

    if (type === 'tap') {
      // Tap sound - short beep
      const osc = audioContext.createOscillator()
      const gain = audioContext.createGain()
      osc.connect(gain)
      gain.connect(audioContext.destination)
      osc.frequency.setValueAtTime(800, now)
      gain.gain.setValueAtTime(0.3, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1)
      osc.start(now)
      osc.stop(now + 0.1)
    } else if (type === 'match') {
      const frequencies = [1200, 900, 600]
      frequencies.forEach((freq, i) => {
        const osc = audioContext.createOscillator()
        const gain = audioContext.createGain()
        osc.connect(gain)
        gain.connect(audioContext.destination)
        osc.frequency.setValueAtTime(freq, now + i * 0.12)
        gain.gain.setValueAtTime(0.35, now + i * 0.12)
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.12)
        osc.start(now + i * 0.12)
        osc.stop(now + i * 0.12 + 0.12)
      })
    } else if (type === 'winner') {
      // Winner sound - triumphant ascending sequence
      const frequencies = [523, 587, 659, 784, 1047]; // C, D, E, G, C (major happy tune)
    frequencies.forEach((freq, i) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.type = 'triangle'; // softer & more musical tone
      const start = now + i * 0.35;
      const duration = 0.3;

      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.3, start);
      gain.gain.exponentialRampToValueAtTime(0.01, start + duration);

      osc.start(start);
      osc.stop(start + duration);
    });
    }
  }

  export const sleep=(ms:number=1000)=>new Promise((res)=>setTimeout(res,ms))