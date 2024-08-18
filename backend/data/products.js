const products = [
    {
      "id": 1,
      "name": "Organic Apples",
      "price": 3.99,
      "description": "Fresh and organic apples, perfect for a healthy snack.",
      "image": "https://www.orgpick.com/cdn/shop/articles/Apple_1024x1024.jpg?v=1547124407",
      "quantity": 10,
      "category": "Fruits",
      "rating": 3.5,
      "brand": "Nature's Best"
    },
    {
      "id": 2,
      "name": "Whole Wheat Bread",
      "price": 2.49,
      "description": "Whole wheat bread with no added preservatives.",
      "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsallysbakingaddiction.com%2Fwhole-wheat-bread%2F&psig=AOvVaw3Z1GuM143dazA94AwLuiKb&ust=1722186267630000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLCPyvjZx4cDFQAAAAAdAAAAABAQ",
      "quantity": 20,
      "category": "Bakery",
      "rating": 4.7,
      "brand": "Baker's Delight"
    },
    {
      "id": 3,
      "name": "Almond Milk",
      "price": 2.99,
      "description": "Creamy and delicious almond milk, ideal for lactose intolerance.",
      "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwoodsfoodservice.co.uk%2Fmlka30-almond-milk-1-litre.html&psig=AOvVaw1NvexMWhe-UU7heaMe08Gt&ust=1722186161477000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCODft8rZx4cDFQAAAAAdAAAAABAE",
      "quantity": 15,
      "category": "Dairy Alternatives",
      "rating": 4.6,
      "brand": "Almond Dream"
    },
    {
      "id": 4,
      "name": "Brown Rice",
      "price": 1.89,
      "description": "High-quality brown rice, perfect for a nutritious meal.",
      "image": "https://www.google.com/imgres?q=brownrice&imgurl=https%3A%2F%2Fsunnywoodrice.com%2Fwp-content%2Fuploads%2F2019%2F10%2F4809010955890_Jordan-Farms-Brown-800g-FRONT.jpg&imgrefurl=https%3A%2F%2Fsunnywoodrice.com%2Fproduct%2Fjordan-farms-brown-rice%2F&docid=shqEc2VXDyhdFM&tbnid=mrerjQaZCEY-5M&vet=12ahUKEwigmba12ceHAxV0e2wGHXprDBYQM3oECFoQAA..i&w=2000&h=2000&hcb=2&ved=2ahUKEwigmba12ceHAxV0e2wGHXprDBYQM3oECFoQAA",
      "quantity": 25,
      "category": "Grains",
      "rating": 4.4,
      "brand": "Healthy Grains"
    },
    {
      "id": 5,
      "name": "Organic Chicken Breast",
      "price": 9.99,
      "description": "Free-range organic chicken breast, tender and juicy.",
      "image": "https://example.com/images/organic_chicken_breast.jpg",
      "quantity": 12,
      "category": "Meat",
      "rating": 4.8,
      "brand": "Farm Fresh"
    },
    {
      "id": 6,
      "name": "Greek Yogurt",
      "price": 1.29,
      "description": "Rich and creamy Greek yogurt with live cultures.",
      "image": "https://example.com/images/greek_yogurt.jpg",
      "quantity": 30,
      "category": "Dairy",
      "rating": 4.6,
      "brand": "Yogurtland"
    },
    {
      "id": 7,
      "name": "Spinach",
      "price": 2.49,
      "description": "Fresh and nutritious spinach, perfect for salads.",
      "image": "https://eadn-wc01-4177395.nxedge.io/wp-content/uploads/2020/05/iStock-916931074-2-scaled.jpg",
      "quantity": 18,
      "category": "Vegetables",
      "rating": 4.7,
      "brand": "Green Leaf"
    },
    {
      "id": 8,
      "name": "Peanut Butter",
      "price": 3.79,
      "description": "Smooth peanut butter, great for sandwiches and snacks.",
      "image": "https://example.com/images/peanut_butter.jpg",
      "quantity": 22,
      "category": "Condiments",
      "rating": 4.5,
      "brand": "Nutty Spread"
    },
    {
      "id": 9,
      "name": "Organic Eggs",
      "price": 4.49,
      "description": "Free-range organic eggs with rich yolks.",
      "image": "https://example.com/images/organic_eggs.jpg",
      "quantity": 14,
      "category": "Dairy",
      "rating": 4.8,
      "brand": "Happy Hens"
    },
    {
      "id": 10,
      "name": "Avocados",
      "price": 1.99,
      "description": "Creamy and nutritious avocados, great for salads and sandwiches.",
      "image": "https://img.freepik.com/premium-photo/green-goodness-ripe-avocado-nutrientrich-super-vegan-food-delicious-healthy-creations_926199-943180.jpg",
      "quantity": 28,
      category: "Fruits",
      "rating": 4.7,
      "brand": "Green Goodness"
    },
    {
      "id": 11,
      "name": "Tomato Sauce",
      "price": 2.29,
      "description": "Rich tomato sauce, perfect for pasta dishes.",
      "image": "https://example.com/images/tomato_sauce.jpg",
      "quantity": 35,
      "category": "Sauces",
      "rating": 4.3,
      "brand": "Sauce Supreme"
    },
    {
      "id": 12,
      "name": "Quinoa",
      "price": 4.99,
      "description": "Nutritious and versatile quinoa, ideal for a healthy meal.",
      "image": "https://example.com/images/quinoa.jpg",
      "quantity": 16,
      "category": "Grains",
      "rating": 4.6,
      "brand": "Healthy Harvest"
    },
    {
      "id": 13,
      "name": "Frozen Berries",
      "price": 3.49,
      "description": "A mix of frozen berries, perfect for smoothies and desserts.",
      "image": "https://example.com/images/frozen_berries.jpg",
      "quantity": 27,
      "category": "Frozen",
      "rating": 4.8,
      "brand": "Berry Bliss"
    },
    {
      "id": 14,
      "name": "Coconut Oil",
      "price": 5.99,
      "description": "Pure coconut oil, ideal for cooking and baking.",
      "image": "https://example.com/images/coconut_oil.jpg",
      "quantity": 12,
      "category": "Oils",
      "rating": 4.7,
      "brand": "Tropical Treasures"
    },
    {
      "id": 15,
      "name": "Organic Carrots",
      "price": 2.29,
      "description": "Fresh organic carrots, crunchy and sweet.",
      "image": "https://example.com/images/organic_carrots.jpg",
      "quantity": 20,
      "category": "Vegetables",
      "rating": 4.6,
      "brand": "Nature's Best"
    },
    {
      "id": 16,
      "name": "Oats",
      "price": 3.19,
      "description": "Healthy oats for breakfast, great with fruits and nuts.",
      "image": "https://example.com/images/oats.jpg",
      "quantity": 30,
      "category": "Grains",
      "rating": 4.5,
      "brand": "Morning Fresh"
    },
    {
      "id": 17,
      "name": "Cucumber",
      "price": 1.29,
      "description": "Fresh cucumbers, perfect for salads and snacks.",
      "image": "https://example.com/images/cucumber.jpg",
      "quantity": 25,
      "category": "Vegetables",
      "rating": 4.4,
      "brand": "Green Leaf"
    },
    {
      "id": 18,
      "name": "Whole Grain Pasta",
      "price": 2.99,
      "description": "Whole grain pasta, a healthier alternative to regular pasta.",
      "image": "https://example.com/images/whole_grain_pasta.jpg",
      "quantity": 18,
      "category": "Pasta",
      "rating": 4.6,
      "brand": "Pasta Perfection"
    },
    {
      "id": 19,
      "name": "Chia Seeds",
      "price": 6.49,
      "description": "Nutritious chia seeds, great for adding to smoothies and yogurt.",
      "image": "https://example.com/images/chia_seeds.jpg",
      "quantity": 14,
      "category": "Seeds",
      "rating": 4.7,
      "brand": "Super Foods"
    },
    {
      "id": 20,
      "name": "Maple Syrup",
      "price": 7.99,
      "description": "Pure maple syrup, perfect for pancakes and waffles.",
      "image": "https://example.com/images/maple_syrup.jpg",
      "quantity": 8,
      "category": "Sweeteners",
      "rating": 4.8,
      "brand": "Sweet Harvest"
    },
    {
      "id": 21,
      "name": "Garlic Powder",
      "price": 1.79,
      "description": "Garlic powder, a versatile seasoning for various dishes.",
      "image": "https://example.com/images/garlic_powder.jpg",
      "quantity": 40,
      "category": "Spices",
      "rating": 4.5,
      "brand": "Flavorful Spices"
    },
    {
      "id": 22,
      "name": "Dried Lentils",
      "price": 3.29,
      "description": "Nutritious dried lentils, ideal for soups and stews.",
      "image": "https://example.com/images/dried_lentils.jpg",
      "quantity": 22,
      "category": "Legumes",
      "rating": 4.6,
      "brand": "Harvest Beans"
    },
    {
      "id": 23,
      "name": "Canned Tuna",
      "price": 2.49,
      "description": "Canned tuna in olive oil, great for quick meals.",
      "image": "https://example.com/images/canned_tuna.jpg",
      "quantity": 25,
      "category": "Canned Goods",
      "rating": 4.4,
      "brand": "Ocean's Bounty"
    },
    {
      "id": 24,
      "name": "Olive Oil",
      "price": 5.79,
      "description": "Extra virgin olive oil, perfect for cooking and dressings.",
      "image": "https://example.com/images/olive_oil.jpg",
      "quantity": 10,
      "category": "Oils",
      "rating": 4.7,
      "brand": "Mediterranean Essentials"
    },
    {
      "id": 25,
      "name": "Granola Bars",
      "price": 4.49,
      "description": "Healthy granola bars, great for a quick snack.",
      "image": "https://example.com/images/granola_bars.jpg",
      "quantity": 30,
      "category": "Snacks",
      "rating": 4.6,
      "brand": "Snack Attack"
    },
    {
      "id": 26,
      "name": "Coconut Water",
      "price": 2.89,
      "description": "Refreshing coconut water, ideal for hydration.",
      "image": "https://example.com/images/coconut_water.jpg",
      "quantity": 16,
      "category": "Beverages",
      "rating": 4.5,
      "brand": "Tropical Treats"
    },
    {
      "id": 27,
      "name": "Tomato Paste",
      "price": 1.99,
      "description": "Concentrated tomato paste, essential for sauces.",
      "image": "https://example.com/images/tomato_paste.jpg",
      "quantity": 28,
      "category": "Sauces",
      "rating": 4.4,
      "brand": "Sauce Master"
    },
    {
      "id": 28,
      "name": "Sweet Potatoes",
      "price": 2.79,
      "description": "Nutritious sweet potatoes, ideal for roasting and baking.",
      "image": "https://th.bing.com/th/id/OIP.X_CL9U4vuQ_8toa1Vn2lSQHaE8?rs=1&pid=ImgDetMain",
      "quantity": 18,
      "category": "Vegetables",
      "rating": 4.6,
      "brand": "Root Harvest"
    },
    {
      "id": 29,
      "name": "Soy Sauce",
      "price": 2.59,
      "description": "Savory soy sauce, perfect for Asian dishes.",
      "image": "https://example.com/images/soy_sauce.jpg",
      "quantity": 30,
      "category": "Condiments",
      "rating": 4.5,
      "brand": "Asian Flavors"
    },
    {
      "id": 30,
      "name": "Whole Wheat Crackers",
      "price": 3.29,
      "description": "Crunchy whole wheat crackers, great for snacking.",
      "image": "https://example.com/images/whole_wheat_crackers.jpg",
      "quantity": 20,
      "category": "Snacks",
      "rating": 4.6,
      "brand": "Crunchy Bites"
    },
    {
      "id": 31,
      "name": "Rice Cakes",
      "price": 2.99,
      "description": "Light and crispy rice cakes, perfect for a light snack.",
      "image": "https://example.com/images/rice_cakes.jpg",
      "quantity": 15,
      "category": "Snacks",
      "rating": 4.4,
      "brand": "Healthy Munch"
    },
    {
      "id": 32,
      "name": "Dark Chocolate",
      "price": 3.99,
      "description": "Rich dark chocolate with a high cocoa content.",
      "image": "https://example.com/images/dark_chocolate.jpg",
      "quantity": 10,
      "category": "Confectionery",
      "rating": 4.8,
      "brand": "Choco Delight"
    },
    {
      "id": 33,
      "name": "Green Tea",
      "price": 4.49,
      "description": "Refreshing green tea, great for relaxation.",
      "image": "https://example.com/images/green_tea.jpg",
      "quantity": 25,
      "category": "Beverages",
      "rating": 4.7,
      "brand": "Tea Time"
    },
    {
      "id": 34,
      "name": "Canned Beans",
      "price": 1.89,
      "description": "Canned beans, great for quick and easy meals.",
      "image": "https://example.com/images/canned_beans.jpg",
      "quantity": 30,
      "category": "Canned Goods",
      "rating": 4.3,
      "brand": "Bean Harvest"
    },
    {
      "id": 35,
      "name": "Almond Flour",
      "price": 6.29,
      "description": "Finely ground almond flour, ideal for baking.",
      "image": "https://example.com/images/almond_flour.jpg",
      "quantity": 12,
      "category": "Baking",
      "rating": 4.6,
      "brand": "Nutty Bakers"
    },
    {
      "id": 36,
      "name": "Hummus",
      "price": 3.49,
      "description": "Creamy and flavorful hummus, great with pita and veggies.",
      "image": "https://example.com/images/hummus.jpg",
      "quantity": 18,
      "category": "Dips",
      "rating": 4.7,
      "brand": "Mediterranean Delights"
    },
    {
      "id": 37,
      "name": "Apple Cider Vinegar",
      "price": 3.79,
      "description": "Organic apple cider vinegar, great for dressings and health.",
      "image": "https://example.com/images/apple_cider_vinegar.jpg",
      "quantity": 15,
      "category": "Condiments",
      "rating": 4.5,
      "brand": "Pure Nature"
    },
    {
      "id": 38,
      "name": "Peaches",
      "price": 2.99,
      "description": "Juicy peaches, perfect for snacking or desserts.",
      "image": "https://img.freepik.com/premium-photo/illustration-freshly-peaches-peach-tree_1034098-463.jpg",
      "quantity": 25,
      "category": "Fruits",
      "rating": 4.6,
      "brand": "Fresh Harvest"
    },
    {
      "id": 39,
      "name": "Pita Bread",
      "price": 2.49,
      "description": "Soft pita bread, perfect for sandwiches and wraps.",
      "image": "https://example.com/images/pita_bread.jpg",
      "quantity": 22,
      "category": "Bakery",
      "rating": 4.4,
      "brand": "Baker's Choice"
    },
    {
      "id": 40,
      "name": "Black Beans",
      "price": 1.79,
      "description": "Canned black beans, ideal for various dishes.",
      "image": "https://example.com/images/black_beans.jpg",
      "quantity": 30,
      "category": "Canned Goods",
      "rating": 4.5,
      "brand": "Beanery"
    },
    {
      "id": 41,
      "name": "Cabbage",
      "price": 1.89,
      "description": "Fresh cabbage, great for salads and stir-fries.",
      "image": "https://example.com/images/cabbage.jpg",
      "quantity": 20,
      "category": "Vegetables",
      "rating": 4.4,
      "brand": "Green Farms"
    },
    {
      "id": 42,
      "name": "Cashew Nuts",
      "price": 5.49,
      "description": "Roasted cashew nuts, perfect for snacking.",
      "image": "https://example.com/images/cashew_nuts.jpg",
      "quantity": 14,
      "category": "Nuts",
      "rating": 4.6,
      "brand": "Nut Haven"
    },
    {
      "id": 43,
      "name": "Pancake Mix",
      "price": 4.19,
      "description": "Easy-to-make pancake mix for a quick breakfast.",
      "image": "https://example.com/images/pancake_mix.jpg",
      "quantity": 25,
      "category": "Baking",
      "rating": 4.5,
      "brand": "Morning Magic"
    },
    {
      "id": 44,
      "name": "Kale",
      "price": 2.99,
      "description": "Fresh kale, ideal for salads and smoothies.",
      "image": "https://example.com/images/kale.jpg",
      "quantity": 18,
      "category": "Vegetables",
      "rating": 4.6,
      "brand": "Green Leaf"
    },
    {
      "id": 45,
      "name": "Soy Milk",
      "price": 2.99,
      "description": "Creamy soy milk, ideal for lactose-free diets.",
      "image": "https://example.com/images/soy_milk.jpg",
      "quantity": 20,
      "category": "Dairy Alternatives",
      "rating": 4.5,
      "brand": "Soy Life"
    },
    {
      "id": 46,
      "name": "Ginger Root",
      "price": 1.99,
      "description": "Fresh ginger root, great for adding flavor to dishes.",
      "image": "https://example.com/images/ginger_root.jpg",
      "quantity": 22,
      "category": "Vegetables",
      "rating": 4.6,
      "brand": "Spice World"
    },
    {
      "id": 47,
      "name": "Granulated Sugar",
      "price": 1.79,
      "description": "Granulated sugar, a staple for baking and sweetening.",
      "image": "https://example.com/images/granulated_sugar.jpg",
      "quantity": 30,
      "category": "Sweeteners",
      "rating": 4.4,
      "brand": "Sweet Life"
    },
    {
      "id": 48,
      "name": "Avocado Oil",
      "price": 6.49,
      "description": "Pure avocado oil, perfect for cooking and dressing.",
      "image": "https://example.com/images/avocado_oil.jpg",
      "quantity": 12,
      "category": "Oils",
      "rating": 4.7,
      "brand": "Green Oil"
    },
    {
      "id": 49,
      "name": "Barbecue Sauce",
      "price": 3.49,
      "description": "Savory barbecue sauce, great for grilling and marinades.",
      "image": "https://example.com/images/barbecue_sauce.jpg",
      "quantity": 25,
      "category": "Sauces",
      "rating": 4.6,
      "brand": "Grill Master"
    },
    {
      "id": 50,
      "name": "Apple Juice",
      "price": 3.29,
      "description": "Refreshing apple juice, ideal for a thirst-quenching drink.",
      "image": "https://example.com/images/apple_juice.jpg",
      "quantity": 20,
      "category": "Beverages",
      "rating": 4.5,
      "brand": "Fruit Splash"
    }
  ]
  
export default products;