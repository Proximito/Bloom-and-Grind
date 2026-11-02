// Seed catalog: 35 products in 5 categories. Descriptions are our own; images are generated SVGs in /public/products.

export type SeedProduct = {
  slug: string;
  name: string;
  category: string; // category slug
  price: number; // lei
  stock: number;
  description: string;
  origin?: string;
  process?: string;
  roast?: "LIGHT" | "MEDIUM" | "DARK";
  brew: string[];
};

export const categories = [
  { slug: "filter-coffee", name: "Filter coffee" },
  { slug: "espresso-coffee", name: "Espresso coffee" },
  { slug: "brewers", name: "Brewers" },
  { slug: "grinders-scales", name: "Grinders & scales" },
  { slug: "accessories", name: "Accessories" },
];

const FILTER = ["pour-over", "immersion", "cold-brew"];
const ESPRESSO = ["espresso", "moka"];

export const products: SeedProduct[] = [
  // Filter coffee (250 g bags)
  { slug: "ethiopia-guji-natural", name: "Ethiopia Guji, natural", category: "filter-coffee", price: 68, stock: 14, origin: "Ethiopia", process: "Natural", roast: "LIGHT", brew: FILTER,
    description: "Sun-dried in the cherry, so the cup is sweet and jammy: blueberry, strawberry and a cocoa finish. Best as a pour-over with a slightly coarser grind." },
  { slug: "kenya-nyeri-aa", name: "Kenya Nyeri AA, washed", category: "filter-coffee", price: 74, stock: 9, origin: "Kenya", process: "Washed", roast: "LIGHT", brew: FILTER,
    description: "Bright and juicy with blackcurrant, grapefruit and a tea-like body. A coffee for people who like their filter lively." },
  { slug: "colombia-huila-washed", name: "Colombia Huila, washed", category: "filter-coffee", price: 62, stock: 2, origin: "Colombia", process: "Washed", roast: "MEDIUM", brew: FILTER,
    description: "Red apple, caramel and milk chocolate. Balanced and forgiving, a good first bag for a new dripper." },
  { slug: "rwanda-gicumbi-washed", name: "Rwanda Gicumbi, washed", category: "filter-coffee", price: 66, stock: 11, origin: "Rwanda", process: "Washed", roast: "LIGHT", brew: FILTER,
    description: "Floral aroma, red berries and a clean, sweet finish. Shines in a flat-bottom dripper." },
  { slug: "costa-rica-tarrazu-honey", name: "Costa Rica Tarrazú, honey", category: "filter-coffee", price: 70, stock: 7, origin: "Costa Rica", process: "Honey", roast: "MEDIUM", brew: FILTER,
    description: "Part of the fruit stays on during drying, giving honey sweetness, peach and a round body." },
  { slug: "guatemala-huehuetenango", name: "Guatemala Huehuetenango, washed", category: "filter-coffee", price: 64, stock: 0, origin: "Guatemala", process: "Washed", roast: "MEDIUM", brew: FILTER,
    description: "Toffee, orange and almond with a crisp acidity. Great in a plunger press as well as a pour-over." },
  { slug: "panama-boquete-geisha", name: "Panama Boquete Geisha, washed", category: "filter-coffee", price: 140, stock: 4, origin: "Panama", process: "Washed", roast: "LIGHT", brew: ["pour-over"],
    description: "Jasmine, bergamot and peach in a delicate, tea-like cup. A small lot for special mornings." },

  // Espresso coffee (250 g bags)
  { slug: "brazil-cerrado-natural", name: "Brazil Cerrado, natural", category: "espresso-coffee", price: 55, stock: 25, origin: "Brazil", process: "Natural", roast: "MEDIUM", brew: ESPRESSO,
    description: "Hazelnut, dark chocolate and low acidity. Smooth on its own and very good with milk." },
  { slug: "house-espresso-blend", name: "House espresso blend", category: "espresso-coffee", price: 58, stock: 30, origin: "Brazil and Colombia", process: "Natural and washed", roast: "MEDIUM", brew: ESPRESSO,
    description: "Our everyday blend: cocoa, caramel and a hint of red fruit. Made to taste good across a wide range of grind settings." },
  { slug: "india-monsooned-malabar", name: "India Monsooned Malabar", category: "espresso-coffee", price: 60, stock: 12, origin: "India", process: "Monsooned", roast: "DARK", brew: ESPRESSO,
    description: "Beans aged in monsoon winds for a heavy body, spice and very low acidity. Classic in a moka pot." },
  { slug: "peru-cajamarca", name: "Peru Cajamarca, washed", category: "espresso-coffee", price: 59, stock: 8, origin: "Peru", process: "Washed", roast: "MEDIUM", brew: ESPRESSO,
    description: "Milk chocolate, plum and a creamy texture. A gentle single origin for espresso beginners." },
  { slug: "colombia-decaf-sugarcane", name: "Colombia decaf, sugarcane process", category: "espresso-coffee", price: 63, stock: 10, origin: "Colombia", process: "Sugarcane decaf", roast: "MEDIUM", brew: [...ESPRESSO, "pour-over"],
    description: "Decaffeinated with a natural sugarcane process: brown sugar, cherry and cocoa without the late-night caffeine." },
  { slug: "sumatra-mandheling", name: "Sumatra Mandheling, wet-hulled", category: "espresso-coffee", price: 61, stock: 1, origin: "Indonesia", process: "Wet-hulled", roast: "DARK", brew: ESPRESSO,
    description: "Earthy, cedar and dark chocolate with a syrupy body. Holds up well in milk drinks." },
  { slug: "honduras-marcala", name: "Honduras Marcala, washed", category: "espresso-coffee", price: 57, stock: 16, origin: "Honduras", process: "Washed", roast: "MEDIUM", brew: ESPRESSO,
    description: "Brown sugar, walnut and orange. A clean, sweet espresso that also works as a filter." },

  // Brewers
  { slug: "ceramic-cone-dripper-02", name: "Ceramic cone dripper, size 02", category: "brewers", price: 95, stock: 18, brew: ["pour-over"],
    description: "Spiral ribs and one large hole give you control over flow. Brews 1–4 cups; uses size 02 cone filters." },
  { slug: "flat-bottom-dripper", name: "Flat-bottom dripper, steel", category: "brewers", price: 160, stock: 6, brew: ["pour-over"],
    description: "Three small holes and a flat bed for an even extraction that is easy to repeat. Uses wave-style filters." },
  { slug: "plunger-press-600", name: "Plunger press, 600 ml", category: "brewers", price: 120, stock: 12, brew: ["immersion"],
    description: "Double-wall glass and a fine steel mesh. Four minutes of steeping, then press: full body, no paper." },
  { slug: "pressure-brewer-travel", name: "Hand pressure brewer", category: "brewers", price: 185, stock: 9, brew: ["immersion", "pour-over"],
    description: "Steep, then press through a paper filter for a clean, concentrated cup in two minutes. Light enough for travel." },
  { slug: "glass-pour-over-carafe", name: "Glass pour-over carafe, 600 ml", category: "brewers", price: 210, stock: 5, brew: ["pour-over"],
    description: "Brewer and server in one piece of borosilicate glass, with a wooden collar. Brews up to 4 cups." },
  { slug: "stovetop-moka-pot-3", name: "Stovetop moka pot, 3 cups", category: "brewers", price: 135, stock: 14, brew: ["moka"],
    description: "Aluminium body, works on gas and electric hobs. Strong, espresso-like coffee without a machine." },
  { slug: "cold-brew-bottle-1l", name: "Cold brew bottle, 1 L", category: "brewers", price: 99, stock: 0, brew: ["cold-brew"],
    description: "Fill the mesh core with coarse coffee, add cold water, wait 12–18 hours. Fits in a fridge door." },

  // Grinders & scales
  { slug: "hand-grinder-steel-burrs", name: "Hand grinder, steel burrs", category: "grinders-scales", price: 320, stock: 8, brew: ["pour-over", "immersion", "moka"],
    description: "Conical stainless-steel burrs and 36 click settings, from French press to fine filter." },
  { slug: "travel-hand-grinder", name: "Travel hand grinder", category: "grinders-scales", price: 210, stock: 11, brew: ["pour-over", "immersion"],
    description: "Slim enough to fit inside a pressure brewer. Grinds 20 g in under a minute." },
  { slug: "electric-burr-grinder", name: "Electric burr grinder", category: "grinders-scales", price: 890, stock: 4, brew: ["pour-over", "immersion", "espresso", "moka"],
    description: "Flat burrs, 40 settings and a timer button. One grinder from espresso to cold brew." },
  { slug: "espresso-grinder-pro", name: "Espresso grinder, stepless", category: "grinders-scales", price: 1450, stock: 2, brew: ["espresso"],
    description: "Stepless adjustment and low retention for fine-tuning espresso shot by shot." },
  { slug: "coffee-scale-timer", name: "Coffee scale with timer", category: "grinders-scales", price: 140, stock: 15, brew: ["pour-over", "espresso"],
    description: "0.1 g precision up to 2 kg, built-in timer and a heat-proof pad. Weigh coffee and water as you pour." },
  { slug: "pocket-scale", name: "Pocket scale, 0.1 g", category: "grinders-scales", price: 75, stock: 20, brew: ["pour-over", "immersion", "espresso"],
    description: "Fits next to an espresso cup. Weighs doses up to 500 g." },
  { slug: "grinder-cleaning-brush", name: "Grinder cleaning brush", category: "grinders-scales", price: 25, stock: 40, brew: [],
    description: "Soft bristles and a wooden handle to clear old grounds from burrs and chutes." },

  // Accessories
  { slug: "paper-filters-02", name: "Paper cone filters 02, 100 pcs", category: "accessories", price: 24, stock: 60, brew: ["pour-over"],
    description: "White oxygen-bleached paper for size 02 cone drippers. Rinse once before brewing." },
  { slug: "gooseneck-kettle-1l", name: "Gooseneck kettle, 1 L", category: "accessories", price: 230, stock: 7, brew: ["pour-over"],
    description: "A thin spout for a slow, steady pour. Stovetop, stainless steel, with a thermometer in the lid." },
  { slug: "electric-gooseneck-kettle", name: "Electric gooseneck kettle", category: "accessories", price: 420, stock: 3, brew: ["pour-over"],
    description: "Set the exact temperature from 40 to 100 °C and hold it for an hour." },
  { slug: "glass-server-600", name: "Glass server, 600 ml", category: "accessories", price: 85, stock: 13, brew: ["pour-over"],
    description: "Heat-resistant glass with ml marks. Sits under any cone or flat dripper." },
  { slug: "double-wall-cups-2", name: "Double-wall glass cups, 2 pcs", category: "accessories", price: 48, stock: 22, brew: [],
    description: "Keep coffee hot and fingers cool. 230 ml each." },
  { slug: "bean-canister-vacuum", name: "Vacuum bean canister, 0.4 L", category: "accessories", price: 110, stock: 9, brew: [],
    description: "Pump the lid to push the air out and keep 250 g of beans fresh for longer." },
  { slug: "milk-pitcher-350", name: "Milk frothing pitcher, 350 ml", category: "accessories", price: 65, stock: 1, brew: ["espresso"],
    description: "Pointed spout for latte art and measurement lines inside. Stainless steel." },
];

export const deliveryMethods = [
  { name: "Home courier, 1–2 days", priceBani: 2000 },
  { name: "Parcel locker, 1–3 days", priceBani: 1200 },
];
