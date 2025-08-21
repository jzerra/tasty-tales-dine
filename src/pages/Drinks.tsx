import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, ArrowUpDown, ArrowUp, ArrowDown, Wine, Sparkles } from "lucide-react";

// Import drink images
import blueLabelImg from "@/assets/blue-label-whisky.jpg";
import hennessyImg from "@/assets/hennessy-cognac.jpg";
import glenfiddichImg from "@/assets/glenfiddich-whisky.jpg";
import moetImg from "@/assets/moet-champagne.jpg";
import jamesonImg from "@/assets/jameson-whiskey.jpg";
import smirnoffImg from "@/assets/smirnoff-vodka.jpg";
import waterImg from "@/assets/water-bottle.jpg";
import macallanImg from "@/assets/macallan-whisky.jpg";
import starBeerImg from "@/assets/star-beer.jpg";
import budweiserImg from "@/assets/budweiser-bottle.jpg";
import guinnessImg from "@/assets/guinness-bottle.jpg";
import heinekenImg from "@/assets/heineken-bottle.jpg";
import pepsiImg from "@/assets/pepsi-bottle.jpg";
import monsterImg from "@/assets/monster-energy.jpg";
import hollandiaImg from "@/assets/hollandia-yogurt.jpg";
import genericBeerImg from "@/assets/generic-beer.jpg";

interface DrinkItem {
  id: number;
  name: string;
  sublabel?: string;
  price: number;
  category: string;
  image: string;
  inStock?: boolean;
}

const Drinks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showInStockOnly, setShowInStockOnly] = useState(true);

  const drinkItems: DrinkItem[] = [
    // Whisky
    { id: 1, name: "Glenviddich 15 yrs", price: 85000, category: "Whisky", image: glenfiddichImg, inStock: true },
    { id: 2, name: "Glenviddich 12 years", price: 56000, category: "Whisky", image: glenfiddichImg, inStock: true },
    { id: 3, name: "Glenviddich", price: 120000, category: "Whisky", image: glenfiddichImg, inStock: false },
    { id: 4, name: "Glenfiddich 21 years", price: 33000, category: "Whisky", image: glenfiddichImg, inStock: true },
    { id: 5, name: "White walker", price: 35000, category: "Whisky", image: blueLabelImg, inStock: true },
    { id: 6, name: "John bannermans", price: 18000, category: "Whisky", image: blueLabelImg, inStock: true },
    { id: 7, name: "William Lawson", price: 13500, category: "Whisky", image: blueLabelImg, inStock: true },
    { id: 8, name: "Start chaser", price: 8000, category: "Whisky", image: blueLabelImg, inStock: false },
    { id: 9, name: "Singleron 12 yrs", price: 54000, category: "Whisky", image: blueLabelImg, inStock: true },
    { id: 10, name: "Singleron 15 yrs", price: 89000, category: "Whisky", image: blueLabelImg, inStock: true },
    { id: 11, name: "Fisher whisky", price: 9500, category: "Whisky", image: blueLabelImg, inStock: true },
    { id: 12, name: "Grants", price: 15500, category: "Whisky", image: blueLabelImg, inStock: true },
    { id: 13, name: "Black and white", price: 12600, category: "Whisky", image: blueLabelImg, inStock: true },
    { id: 14, name: "James daniels", price: 31000, category: "Whisky", image: jamesonImg, inStock: true },
    { id: 15, name: "Red label", price: 24500, category: "Whisky", image: blueLabelImg, inStock: true },
    { id: 16, name: "Jack Williams", price: 10000, category: "Whisky", image: blueLabelImg, inStock: true },
    { id: 17, name: "Ballantines", price: 14000, category: "Whisky", image: blueLabelImg, inStock: true },
    { id: 18, name: "Glenmorangle", price: 40000, category: "Whisky", image: "/lovable-uploads/db7c3637-4dc3-479f-accf-a55dcf3a7d82.png", inStock: true },
    { id: 19, name: "King kestral", sublabel: "(whisky)", price: 5500, category: "Whisky", image: "/lovable-uploads/85c09523-ab85-485a-b535-d33b37162dff.png", inStock: true },
    { id: 20, name: "Blue label", price: 320000, category: "Whisky", image: blueLabelImg, inStock: true },
    { id: 21, name: "Black label", price: 43000, category: "Whisky", image: "/lovable-uploads/a9632573-945b-4518-8b48-cf16c1fc7a0d.png", inStock: true },
    { id: 22, name: "Gold label", price: 57000, category: "Whisky", image: "/lovable-uploads/96f751a1-9c84-484e-9c12-17f22f2d8d23.png", inStock: true },
    { id: 23, name: "8pm", price: 9600, category: "Whisky", image: "/lovable-uploads/a393c55c-d38a-41a4-bb52-2cd0958d51c5.png", inStock: true },
    { id: 24, name: "Brother and barrel", price: 6000, category: "Whisky", image: blueLabelImg, inStock: false },
    { id: 25, name: "Macallan", price: 155000, category: "Whisky", image: "/lovable-uploads/6563ee7a-b020-4cad-9440-4fa7c7124c6d.png", inStock: true },

    // Cognac / Brandy / Irish
    { id: 26, name: "Hennessy vs", price: 55000, category: "Cognac / Brandy / Irish", image: hennessyImg, inStock: true },
    { id: 27, name: "Hennessy", price: 89000, category: "Cognac / Brandy / Irish", image: hennessyImg, inStock: true },
    { id: 28, name: "Remy martins", price: 76000, category: "Cognac / Brandy / Irish", image: "/lovable-uploads/c8cfe2ea-cd54-4ca8-86eb-78141bfd87fa.png", inStock: true },
    { id: 29, name: "Martel vsop", price: 46000, category: "Cognac / Brandy / Irish", image: "/lovable-uploads/c3f4f575-7d27-48c7-b92f-46e67bcf116f.png", inStock: true },
    { id: 30, name: "Martel blue Swift", price: 75000, category: "Cognac / Brandy / Irish", image: "/lovable-uploads/c3f4f575-7d27-48c7-b92f-46e67bcf116f.png", inStock: false },
    { id: 31, name: "Jameson Black barrel", price: 35000, category: "Cognac / Brandy / Irish", image: jamesonImg, inStock: true },
    { id: 32, name: "Jameson Green", price: 22500, category: "Cognac / Brandy / Irish", image: jamesonImg, inStock: true },

    // Vodka / Gin / Rum / Aperitif
    { id: 33, name: "Smirnoff vodka", price: 7000, category: "Vodka / Gin / Rum / Aperitif", image: smirnoffImg, inStock: true },
    { id: 34, name: "Gordon's", price: 5500, category: "Vodka / Gin / Rum / Aperitif", image: "/lovable-uploads/9e595134-b2aa-4924-b25d-baaada649f2f.png", inStock: true },
    { id: 35, name: "Small Gordon's", price: 1500, category: "Vodka / Gin / Rum / Aperitif", image: "/lovable-uploads/9e595134-b2aa-4924-b25d-baaada649f2f.png", inStock: true },
    { id: 36, name: "King kestral gin", price: 4500, category: "Vodka / Gin / Rum / Aperitif", image: "/lovable-uploads/80d4c165-43b4-4ac7-a88f-81250f7137aa.png", inStock: true },
    { id: 37, name: "Captain Morgan", price: 8000, category: "Vodka / Gin / Rum / Aperitif", image: "/lovable-uploads/8bfec613-7e56-410f-8e2c-387fa4ace758.png", inStock: true },
    { id: 38, name: "Small campari", price: 6000, category: "Vodka / Gin / Rum / Aperitif", image: "/lovable-uploads/e9cd42ce-ac0d-45af-9684-2d0d3478cfb8.png", inStock: true },
    { id: 39, name: "Big campari", price: 23500, category: "Vodka / Gin / Rum / Aperitif", image: "/lovable-uploads/e9cd42ce-ac0d-45af-9684-2d0d3478cfb8.png", inStock: true },

    // Wine (Still & Sparkling)
    { id: 40, name: "Four cousins", price: 8500, category: "Wine (Still & Sparkling)", image: "/lovable-uploads/2d2d13cb-e15a-43d6-81b7-af3e79eeb40a.png", inStock: true },
    { id: 41, name: "Torley", price: 10000, category: "Wine (Still & Sparkling)", image: "/lovable-uploads/7d21a2ab-7f78-4451-ac55-2821ad04877d.png", inStock: true },
    { id: 42, name: "Blue nun", price: 9000, category: "Wine (Still & Sparkling)", image: "/lovable-uploads/59dea6f5-6815-4944-aa16-5c0a6c8fdd59.png", inStock: true },
    { id: 43, name: "Don royal", price: 6000, category: "Wine (Still & Sparkling)", image: "/lovable-uploads/9e3da718-c165-4a22-acf9-ba35d68ceb8e.png", inStock: true },
    { id: 44, name: "Leon del sol", price: 5500, category: "Wine (Still & Sparkling)", image: moetImg, inStock: false },
    { id: 45, name: "Cavatina", price: 8000, category: "Wine (Still & Sparkling)", image: "/lovable-uploads/04d3eb0d-eb16-4a32-acd8-a8dd4944b43f.png", inStock: true },
    { id: 46, name: "Friends and family", price: 10000, category: "Wine (Still & Sparkling)", image: "/lovable-uploads/be19b752-e8fb-49d6-adc8-9574e57d35e9.png", inStock: true },
    { id: 47, name: "Red training", price: 12000, category: "Wine (Still & Sparkling)", image: "/lovable-uploads/717ef759-79be-433c-b3cf-a5ded7aa5921.png", inStock: true },
    { id: 48, name: "Chamdor", price: 7800, category: "Wine (Still & Sparkling)", image: "/lovable-uploads/61dd1b5d-acce-448c-bd72-c1538c0b8536.png", inStock: true },
    { id: 49, name: "4th Street", price: 5900, category: "Wine (Still & Sparkling)", image: "/lovable-uploads/6687acd0-2b95-43d0-adfe-ed6c09935145.png", inStock: true },
    { id: 50, name: "Asconi Agor", price: 9500, category: "Wine (Still & Sparkling)", image: "/lovable-uploads/91cfeeb3-2352-489e-9d8d-1c86f81020b5.png", inStock: true },
    { id: 51, name: "Andre", price: 10500, category: "Wine (Still & Sparkling)", image: moetImg, inStock: true },

    // Champagne / Premium Sparkling
    { id: 52, name: "Moet", price: 135000, category: "Champagne / Premium Sparkling", image: moetImg, inStock: true },
    { id: 53, name: "Belaire", price: 54200, category: "Champagne / Premium Sparkling", image: "/lovable-uploads/fb7d9c67-c3f9-49e7-be89-d56b031512a2.png", inStock: true },

    // Tequila
    { id: 54, name: "Casamigos", price: 105000, category: "Tequila", image: "/lovable-uploads/38bf0450-7b25-4acb-bad9-d8db4dfe1f32.png", inStock: true },
    { id: 55, name: "Don julio", price: 336000, category: "Tequila", image: smirnoffImg, inStock: false },

    // Bitters / Herbal
    { id: 56, name: "Origin bitters", price: 6000, category: "Bitters / Herbal", image: "/lovable-uploads/7b152f4e-a4f7-4123-9f37-0ad5ed0b3e9c.png", inStock: true },

    // Others / To Verify
    { id: 57, name: "Velvet", price: 17000, category: "Others / To Verify", image: "/lovable-uploads/0b6f73bc-5897-4d4a-9627-f67d1dfec427.png", inStock: true },
    { id: 58, name: "Mausa", price: 12000, category: "Others / To Verify", image: "/lovable-uploads/2081214d-e456-4b0b-9dfe-dd94310cbe67.png", inStock: true },
    { id: 59, name: "Portal", price: 12000, category: "Others / To Verify", image: "/lovable-uploads/e272a79a-e84d-4364-8386-7ce70a50437c.png", inStock: true },
    { id: 60, name: "Small imperial", price: 1500, category: "Others / To Verify", image: "/lovable-uploads/2a30492e-a3cb-4f1f-9b0b-64012f773ca8.png", inStock: true },

    // Beer & Local Beverages
    { id: 62, name: "Star", price: 1700, category: "Beer & Local Beverages", image: starBeerImg, inStock: true },
    { id: 63, name: "Budweiser", price: 1700, category: "Beer & Local Beverages", image: budweiserImg, inStock: true },
    { id: 64, name: "Ginger Champion", price: 1400, category: "Beer & Local Beverages", image: genericBeerImg, inStock: true },
    { id: 65, name: "Life", price: 1400, category: "Beer & Local Beverages", image: genericBeerImg, inStock: true },
    { id: 66, name: "Origin Beer", price: 1700, category: "Beer & Local Beverages", image: genericBeerImg, inStock: true },
    { id: 67, name: "Medium Legend", price: 1400, category: "Beer & Local Beverages", image: genericBeerImg, inStock: true },
    { id: 68, name: "Fayrous", price: 1200, category: "Beer & Local Beverages", image: genericBeerImg, inStock: true },
    { id: 69, name: "Double Black", price: 1400, category: "Beer & Local Beverages", image: genericBeerImg, inStock: true },
    { id: 70, name: "Small Ice", price: 1400, category: "Beer & Local Beverages", image: genericBeerImg, inStock: true },
    { id: 71, name: "Small Stout", price: 1400, category: "Beer & Local Beverages", image: guinnessImg, inStock: true },
    { id: 72, name: "Big Heineken", price: 1700, category: "Beer & Local Beverages", image: heinekenImg, inStock: true },
    { id: 73, name: "Medium Stout", price: 1400, category: "Beer & Local Beverages", image: guinnessImg, inStock: true },
    { id: 74, name: "Champion Beer", price: 1400, category: "Beer & Local Beverages", image: genericBeerImg, inStock: true },
    { id: 75, name: "33 Beer", price: 1400, category: "Beer & Local Beverages", image: genericBeerImg, inStock: true },
    { id: 76, name: "Trophy Stout", price: 1400, category: "Beer & Local Beverages", image: guinnessImg, inStock: true },
    { id: 77, name: "Tiger", price: 1400, category: "Beer & Local Beverages", image: genericBeerImg, inStock: true },
    { id: 78, name: "Hero", price: 1400, category: "Beer & Local Beverages", image: genericBeerImg, inStock: true },
    { id: 79, name: "Guinness Malt", price: 1400, category: "Beer & Local Beverages", image: guinnessImg, inStock: true },
    { id: 80, name: "Smoot Stout", price: 1700, category: "Beer & Local Beverages", image: guinnessImg, inStock: true },
    { id: 81, name: "Desperados", price: 1700, category: "Beer & Local Beverages", image: genericBeerImg, inStock: true },
    { id: 82, name: "Origin Better (S/S)", price: 1700, category: "Beer & Local Beverages", image: genericBeerImg, inStock: true },
    { id: 83, name: "Gulder", price: 1700, category: "Beer & Local Beverages", image: genericBeerImg, inStock: true },
    { id: 84, name: "Medium Heniken", price: 1400, category: "Beer & Local Beverages", image: heinekenImg, inStock: true },
    { id: 85, name: "Bullet", price: 2500, category: "Beer & Local Beverages", image: genericBeerImg, inStock: true },
    { id: 86, name: "Fearless", price: 1000, category: "Beer & Local Beverages", image: genericBeerImg, inStock: true },
    { id: 87, name: "Climax Proof Beer", price: 1000, category: "Beer & Local Beverages", image: genericBeerImg, inStock: true },
    { id: 88, name: "Legend Twist", price: 1700, category: "Beer & Local Beverages", image: genericBeerImg, inStock: true },
    { id: 89, name: "Star Radler", price: 1400, category: "Beer & Local Beverages", image: starBeerImg, inStock: true },
    { id: 90, name: "Big Legend", price: 2200, category: "Beer & Local Beverages", image: genericBeerImg, inStock: true },
    { id: 91, name: "Flying Fish/PamLyoske", price: 1400, category: "Beer & Local Beverages", image: genericBeerImg, inStock: true },
    { id: 92, name: "Exotic", price: 2500, category: "Beer & Local Beverages", image: genericBeerImg, inStock: true },
    { id: 93, name: "Big Stout", price: 2200, category: "Beer & Local Beverages", image: guinnessImg, inStock: true },

    // Soft Drinks & Non-Alcoholic
    { id: 94, name: "Pet Pepsi", price: 500, category: "Soft Drinks & Non-Alcoholic", image: pepsiImg, inStock: true },
    { id: 95, name: "Pet Coke", price: 500, category: "Soft Drinks & Non-Alcoholic", image: pepsiImg, inStock: true },
    { id: 96, name: "Pet Amstel", price: 500, category: "Soft Drinks & Non-Alcoholic", image: genericBeerImg, inStock: true },
    { id: 97, name: "Pet Teem Lemon", price: 500, category: "Soft Drinks & Non-Alcoholic", image: pepsiImg, inStock: true },
    { id: 98, name: "Pet Spirit", price: 500, category: "Soft Drinks & Non-Alcoholic", image: pepsiImg, inStock: true },
    { id: 99, name: "Pet Teem Soda", price: 500, category: "Soft Drinks & Non-Alcoholic", image: pepsiImg, inStock: true },
    { id: 100, name: "Pet Mirinda Pineapple", price: 500, category: "Soft Drinks & Non-Alcoholic", image: pepsiImg, inStock: true },
    { id: 101, name: "Schweppes", price: 1200, category: "Soft Drinks & Non-Alcoholic", image: pepsiImg, inStock: true },
    { id: 102, name: "Hollandia Yogurt", price: 2500, category: "Soft Drinks & Non-Alcoholic", image: hollandiaImg, inStock: true },
    { id: 103, name: "Monster", price: 2500, category: "Soft Drinks & Non-Alcoholic", image: monsterImg, inStock: true },

    // Water
    { id: 61, name: "Water", price: 500, category: "Water", image: waterImg, inStock: true },
  ];

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'Beer & Local Beverages', name: 'Beer & Local' },
    { id: 'Soft Drinks & Non-Alcoholic', name: 'Soft Drinks' },
    { id: 'Whisky', name: 'Whisky' },
    { id: 'Cognac / Brandy / Irish', name: 'Cognac / Brandy' },
    { id: 'Vodka / Gin / Rum / Aperitif', name: 'Vodka / Gin / Rum' },
    { id: 'Wine (Still & Sparkling)', name: 'Wine' },
    { id: 'Champagne / Premium Sparkling', name: 'Champagne' },
    { id: 'Tequila', name: 'Tequila' },
    { id: 'Bitters / Herbal', name: 'Bitters' },
    { id: 'Others / To Verify', name: 'Others' },
    { id: 'Water', name: 'Water' },
  ];

  const filteredAndSortedItems = useMemo(() => {
    let filtered = drinkItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (item.sublabel && item.sublabel.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesStock = !showInStockOnly || item.inStock !== false;
      
      return matchesSearch && matchesCategory && matchesStock;
    });

    if (sortOrder === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [drinkItems, searchQuery, activeCategory, sortOrder, showInStockOnly]);

  const groupedItems = useMemo(() => {
    const groups: { [key: string]: DrinkItem[] } = {};
    filteredAndSortedItems.forEach(item => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredAndSortedItems]);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (categoryId !== 'all') {
      document.getElementById(`category-${categoryId}`)?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px w-12 bg-primary"></div>
              <Wine className="h-6 w-6 text-primary" />
              <div className="h-px w-12 bg-primary"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Drinks Menu
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Premium whisky, wines, spirits & more.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search drinks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Price Sort */}
              <div className="flex gap-2">
                <Button
                  variant={sortOrder === 'asc' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? null : 'asc')}
                >
                  <ArrowUp className="h-4 w-4 mr-1" />
                  Low to High
                </Button>
                <Button
                  variant={sortOrder === 'desc' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === 'desc' ? null : 'desc')}
                >
                  <ArrowDown className="h-4 w-4 mr-1" />
                  High to Low
                </Button>
              </div>
            </div>

            {/* Stock Filter */}
            <div className="mb-6">
              <Button
                variant={showInStockOnly ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowInStockOnly(!showInStockOnly)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Show only items in stock
              </Button>
            </div>

            {/* Category Tabs */}
            <div className="w-full overflow-x-auto">
              <div className="flex gap-2 pb-4 min-w-max">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleCategoryClick(category.id)}
                    className="whitespace-nowrap"
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Drinks Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {activeCategory === 'all' ? (
              // Show grouped by category
              Object.entries(groupedItems).map(([categoryName, items]) => (
                <div key={categoryName} id={`category-${categoryName}`} className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-primary">
                    {categoryName}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map((item) => (
                      <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-4">
                          <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-muted/20 to-muted/40">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors">
                                  {item.name}
                                </h3>
                                {item.sublabel && (
                                  <p className="text-xs text-muted-foreground">{item.sublabel}</p>
                                )}
                              </div>
                              {item.inStock === false && (
                                <Badge variant="secondary" className="text-xs">
                                  Out of Stock
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-primary">
                                ₦{item.price.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              // Show current category only
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedItems.map((item) => (
                  <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-4">
                      <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-muted/20 to-muted/40">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors">
                              {item.name}
                            </h3>
                            {item.sublabel && (
                              <p className="text-xs text-muted-foreground">{item.sublabel}</p>
                            )}
                          </div>
                          {item.inStock === false && (
                            <Badge variant="secondary" className="text-xs">
                              Out of Stock
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-primary">
                            ₦{item.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer Disclaimer */}
      <section className="py-8 bg-muted/30 border-t">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              * Some items may be out of stock. Prices subject to change.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Drinks;
