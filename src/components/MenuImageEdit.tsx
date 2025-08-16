// MENU IMAGES FOR EASY EDITING
// Replace the image imports below with your own menu images
// Each category should have relevant images for better visual appeal

// SOUP DISHES IMAGES - Replace these paths with your soup images
import afangSoupImg from "@/assets/afang-soup.jpg";
import egusiSoupImg from "@/assets/egusi-soup.jpg";
import pepperSoupImg from "@/assets/pepper-soup.jpg";
import meatPieImg from "@/assets/meat-pie.jpg";
import grilledCatfishImg from "@/assets/grilled-catfish.jpg";

// ADDITIONAL IMAGES NEEDED - Add these to your assets folder:
// For Chewable category:
// - goat-meat-pepper-soup.jpg
// - catfish-pepper-soup.jpg  
// - peppered-kpomo.jpg
// - sauced-snail.jpg
// - isie-ewu.jpg
// - nkwobi.jpg
// - grilled-chicken.jpg
// - bolle.jpg

// For Pastries category:
// - chin-chin.jpg
// - samosa.jpg
// - egg-roll.jpg
// - pancake.jpg
// - doughnuts.jpg
// - fish-pie.jpg
// - spring-rolls.jpg
// - puff-puff.jpg
// - cupcake.jpg

// For Wines & Spirits category:
// - red-wine.jpg
// - white-wine.jpg
// - whiskey.jpg
// - vodka.jpg

// MENU IMAGE EXPORTS
export const menuImages = {
  // Dishes
  afangSoup: afangSoupImg,
  egusiSoup: egusiSoupImg,
  fisherManSoup: afangSoupImg, // Replace with actual fisher soup image
  vegetableSoup: egusiSoupImg, // Replace with actual vegetable soup image
  bangaSoup: afangSoupImg, // Replace with actual banga soup image
  whiteSoup: egusiSoupImg, // Replace with actual white soup image
  seafoodOkra: afangSoupImg, // Replace with actual seafood okra image

  // Chewable  
  goatMeatPepperSoup: pepperSoupImg, // Replace with actual goat meat image
  catfishPepperSoup: grilledCatfishImg, // Replace with actual catfish soup image
  pepperedKpomo: pepperSoupImg, // Replace with actual kpomo image
  saucedSnail: pepperSoupImg, // Replace with actual snail image
  isieEwu: pepperSoupImg, // Replace with actual isie ewu image
  nkwobi: pepperSoupImg, // Replace with actual nkwobi image
  grilledChicken: grilledCatfishImg, // Replace with actual grilled chicken image
  grilledFish: grilledCatfishImg, // Keep or replace with different fish image
  bolle: grilledCatfishImg, // Replace with actual bolle image

  // Pastries
  meatPie: meatPieImg, // Keep this one
  chinChin: meatPieImg, // Replace with actual chin chin image
  samosa: meatPieImg, // Replace with actual samosa image
  eggRoll: meatPieImg, // Replace with actual egg roll image
  panCake: meatPieImg, // Replace with actual pancake image
  doughnuts: meatPieImg, // Replace with actual doughnuts image
  fishPie: meatPieImg, // Replace with actual fish pie image
  springRolls: meatPieImg, // Replace with actual spring rolls image
  puffPuff: meatPieImg, // Replace with actual puff puff image
  cupCake: meatPieImg, // Replace with actual cupcake image

  // Wines & Spirits
  redWine: meatPieImg, // Replace with actual wine bottle image
  whiteWine: meatPieImg, // Replace with actual white wine image
  whiskey: meatPieImg, // Replace with actual whiskey image
  vodka: meatPieImg, // Replace with actual vodka image
};

// INSTRUCTIONS FOR IMAGE REPLACEMENT:
// 1. Add your new images to the src/assets folder
// 2. Import them at the top of this file (like the examples above)
// 3. Update the menuImages object to use your new imports
// 4. The menu will automatically use these images

export default menuImages;