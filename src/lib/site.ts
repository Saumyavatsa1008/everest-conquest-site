/**
 * Central content for the Everest Conquest site.
 * All copy + game data drawn from the official box, promo art and how-to video.
 */

export const SITE = {
  name: "Everest Conquest",
  tagline: "Race to the top. Victory awaits.",
  subtitle:
    "A competitive strategy board game about climbing the highest mountain in the world — Mount Everest.",
  designedBy: "Designed by a Mount Everest climber",
  amazonUrl:
    "https://www.amazon.in/Everest-Conquest-Management-Expedition-Inter-generational/dp/B0GF2R1M6B",
  flipkartUrl:
    "https://www.flipkart.com/everest-conquest-na-strategy-war-board-game/p/itme21efd99a7caa",
  email: "hello@everestconquest.game",
};

export const STATS = [
  { value: 8848, suffix: " m", label: "Summit to conquer", from: 0 },
  { value: 6, prefix: "2–", suffix: "", label: "Players", from: 2 },
  { value: 14, prefix: "Ages ", suffix: "+", label: "And up", from: 0 },
  { value: 120, prefix: "60–", suffix: " min", label: "Play time", from: 60 },
];

export const PILLARS = [
  {
    icon: "mountain",
    title: "Real-time challenges",
    text: "A thrilling journey from Kathmandu that mirrors a real expedition — navigate icy crevasses, battle avalanches and make life-or-death decisions.",
  },
  {
    icon: "dice",
    title: "Risk & strategy",
    text: "Manage your Everest Dollars, gear up with the right equipment and time your moves with the weather dice. Every choice can make or break your climb.",
  },
  {
    icon: "trophy",
    title: "Triumph awaits",
    text: "Acclimatise, push through the O₂ Zone and be the first to plant your flag on the 8,848 m summit. Do you have what it takes?",
  },
];

/** Stops along the climb — Kathmandu base to the summit. */
export const JOURNEY = [
  { stage: "START", name: "Kathmandu", note: "Gather your gear and begin the expedition." },
  { stage: "Trek", name: "Glacier Walk", note: "Cross treacherous ice fields toward base camp." },
  { stage: "Camp 1", name: "Training Day", note: "A Sherpa can show you a shortcut — for a fee." },
  { stage: "Camp 2", name: "Acclimatise", note: "Lose 2 turns to adjust — or negate with medical training." },
  { stage: "Camp 3", name: "Rest Day", note: "Pay for energy. Move ahead if you have insurance." },
  { stage: "Camp 4", name: "O₂ Zone", note: "Spend one O₂ token per turn to move beyond this point." },
  { stage: "SUMMIT", name: "8,848 m", note: "Plant your flag. Victory awaits the first to the top." },
];

export const COMPONENTS = [
  {
    title: "The Board",
    text: "A winding expedition route from Kathmandu to the summit, packed with camps, hazards and shortcuts.",
    image: "/images/components-flat.jpeg",
    accent: "var(--teal)",
  },
  {
    title: "Equipment Cards",
    text: "14 general + 4 special items — ladders, ice axes, oxygen, blizzard tents and avalanche bags. Gear up or perish.",
    image: "/images/box-open.jpeg",
    accent: "var(--orange)",
  },
  {
    title: "Everest Dollars",
    text: "$50 to $10,000 in expedition currency. Hire Sherpas, buy quick rides and fund your ascent.",
    image: "/images/box-hero.jpeg",
    accent: "var(--gold)",
  },
];

/** Real game cards (background-removed) for the scrolling marquee. */
export const CARDS = Array.from(
  { length: 23 },
  (_, i) => `/images/equipment/EquipmentCard_${String(i * 2 + 1).padStart(2, "0")}.png`
);

/** "What's inside the box" — flip cards: front image → tap → video of the real component. */
export const INSIDE_BOX = [
  { title: "Board", image: "/images/inside/board.jpg", video: "/video/inside/board.mp4" },
  { title: "Equipment Cards", image: "/images/inside/equipment.png", video: "/video/inside/equipment.mp4" },
  { title: "Everest Dollars", image: "/images/inside/dollars.png", video: "/video/inside/dollars.mp4" },
  { title: "Movement Cards", image: "/images/inside/movement.png", video: "/video/inside/movement.mp4" },
  { title: "Oxygen Tokens", image: "/images/inside/oxygen.png", video: "/video/inside/oxygen.mp4" },
  { title: "Players", image: "/images/inside/players.png", video: "/video/inside/players.mp4" },
  { title: "Weather Dice", image: "/images/inside/dice.png", video: "/video/inside/dice.mp4" },
];

export const RULES = [
  {
    icon: "cloud",
    title: "Weather Dice",
    text: "Roll a “Good Weather Day” to move beyond key points. Storms force you to acclimatise — lose 2 turns unless you have medical training.",
  },
  {
    icon: "wind",
    title: "Frostbite Danger",
    text: "Reach the frostbite zone and you must apply frostbite cream. No cream? Lose 2 turns to recover.",
  },
  {
    icon: "footprints",
    title: "Sherpa Shortcuts",
    text: "A Sherpa can reveal a shortcut for −$2000, or grab a quick plane ride for −$200 to leap ahead of rivals.",
  },
  {
    icon: "heart-pulse",
    title: "O₂ & Rescue",
    text: "Above Camp 4 you burn one O₂ token per turn. Keep a Rescue Team card in case of emergencies.",
  },
];

export const FAQ = [
  {
    q: "How many people can play?",
    a: "Everest Conquest is built for 2 to 6 players, and is recommended for ages 14 and up.",
  },
  {
    q: "How long does a game take?",
    a: "A full expedition runs roughly 60 to 120 minutes depending on player count and how aggressively you race.",
  },
  {
    q: "Is there real strategy, or is it just luck?",
    a: "Both. The weather dice add tension, but managing money, equipment, oxygen and timing is what separates summiteers from those who turn back.",
  },
  {
    q: "Who designed it?",
    a: "Everest Conquest was designed by an actual Mount Everest climber, so the journey mirrors the real-time challenges of a genuine expedition.",
  },
];

export const GALLERY = [
  { src: "/images/box-hero.jpeg", alt: "Everest Conquest box with game components" },
  { src: "/images/promo-race.jpeg", alt: "Race to the top — victory awaits" },
  { src: "/images/box-angle.jpeg", alt: "Everest Conquest box, angled view" },
  { src: "/images/box-open.jpeg", alt: "Open box showing card decks and rule book" },
  { src: "/images/components-flat.jpeg", alt: "Full game laid out — board, cards, money, dice" },
  { src: "/images/poster-key.jpeg", alt: "Everest Conquest key art" },
];
