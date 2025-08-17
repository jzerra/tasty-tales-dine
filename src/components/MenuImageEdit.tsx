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
  afangSoup: "/lovable-uploads/b50c7ee7-fe5d-40dc-b75c-fa32d5a99d36.png",
  egusiSoup: "/lovable-uploads/e804b85c-9158-49fe-a2b1-aa99197c2003.png",
  fisherManSoup: "/lovable-uploads/e89cd784-5b1a-4145-a9fd-33e2ecd93acd.png",
  vegetableSoup: "/lovable-uploads/59043c54-7a35-4ca8-b935-59329723f552.png",
  bangaSoup: "/lovable-uploads/e16e4339-8f2c-446d-9d01-1c24e2063258.png",
  whiteSoup: "/lovable-uploads/1a9ea0f3-8d1e-4cf9-afff-d767903a650c.png",
  seafoodOkra: "/lovable-uploads/49a1dc0d-6042-47ea-8e6a-12188b11a478.png",

  // Chewable  
  goatMeatPepperSoup: "/lovable-uploads/21fcaa50-02ab-4f53-b217-ea65c4003480.png",
  catfishPepperSoup: "/lovable-uploads/c5e8accb-8cb7-43d3-b277-c0a79df2e022.png",
  pepperedKpomo: "/lovable-uploads/4719cca8-5c59-4905-bbe8-ba773a95f392.png",
  saucedSnail: "/lovable-uploads/b92e17e5-f7ad-4938-8d85-2c06796e8ba8.png",
  isieEwu: "/lovable-uploads/6828ad80-c96f-4aaa-bbbf-b1c0401c30f9.png",
  nkwobi: "/lovable-uploads/d4a3bef3-1c81-4758-887f-c7445fc38ead.png",
  grilledChicken: "/lovable-uploads/f241924b-781c-4942-bdf5-9cbeaca2fc62.png",
  grilledFish: "/lovable-uploads/e044f780-835a-4f10-8fd3-a882395e3ffa.png",
  bolle: "/lovable-uploads/05d2f13b-3172-42c0-b663-72ed88e37292.png",

  // Pastries
  meatPie: meatPieImg, // Keep this one
  chinChin: "/lovable-uploads/516c6f5f-d06e-492a-b9e0-3ade3c858d8c.png",
  samosa: meatPieImg, // Replace with actual samosa image
  eggRoll: meatPieImg, // Replace with actual egg roll image
  panCake: meatPieImg, // Replace with actual pancake image
  doughnuts: meatPieImg, // Replace with actual doughnuts image
  fishPie: meatPieImg, // Replace with actual fish pie image
  springRolls: meatPieImg, // Replace with actual spring rolls image
  puffPuff: meatPieImg, // Replace with actual puff puff image
  cupCake: meatPieImg, // Replace with actual cupcake image

  // Rice dishes
  friedRice: "/lovable-uploads/221f8004-06fe-4670-b3a9-673828a58c32.png",
  jollofRice: "/lovable-uploads/24c6c594-9522-46e2-90a9-30c222daeee2.png",

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