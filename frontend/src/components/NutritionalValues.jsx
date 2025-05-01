import { useState } from 'react';
import '../style/NutritionalValues.css';

// Sample data for food items
const vegFoods = {
  "Grains & Flours": [
    {
      id: 1,
      name: 'Rice (Basmati)',
      image: '🍚',
      calories: 130,
      protein: 2.7,
      carbs: 28,
      fat: 0.3,
      iron: 0.2,
      calcium: 10,
      vitaminB12: 0
    },
    {
      id: 2,
      name: 'Brown Rice',
      image: '🍚',
      calories: 111,
      protein: 2.6,
      carbs: 23,
      fat: 0.9,
      iron: 0.5,
      calcium: 10,
      vitaminB12: 0
    },
    {
      id: 3,
      name: 'Wheat Flour (Atta)',
      image: '🌾',
      calories: 340,
      protein: 13.2,
      carbs: 71.2,
      fat: 2.5,
      iron: 5.3,
      calcium: 41,
      vitaminB12: 0
    },
    {
      id: 4,
      name: 'Refined Flour (Maida)',
      image: '🌾',
      calories: 364,
      protein: 10.3,
      carbs: 76.3,
      fat: 0.9,
      iron: 1.8,
      calcium: 23,
      vitaminB12: 0
    },
    {
      id: 5,
      name: 'Semolina (Sooji)',
      image: '🌾',
      calories: 360,
      protein: 12.7,
      carbs: 72.8,
      fat: 1.0,
      iron: 1.2,
      calcium: 8,
      vitaminB12: 0
    },
    {
      id: 6,
      name: 'Pearl Millet (Bajra)',
      image: '🌾',
      calories: 378,
      protein: 11.6,
      carbs: 67.0,
      fat: 5.0,
      iron: 8.0,
      calcium: 42,
      vitaminB12: 0
    },
    {
      id: 7,
      name: 'Sorghum (Jowar)',
      image: '🌾',
      calories: 329,
      protein: 10.4,
      carbs: 72.1,
      fat: 1.9,
      iron: 4.5,
      calcium: 25,
      vitaminB12: 0
    },
    {
      id: 8,
      name: 'Finger Millet (Ragi)',
      image: '🌾',
      calories: 336,
      protein: 7.3,
      carbs: 72.0,
      fat: 1.3,
      iron: 3.9,
      calcium: 344,
      vitaminB12: 0
    }
  ],
  "Pulses & Legumes": [
    {
      id: 9,
      name: 'Yellow Moong Dal',
      image: '🌱',
      calories: 347,
      protein: 24.5,
      carbs: 59.9,
      fat: 1.2,
      iron: 4.4,
      calcium: 58,
      vitaminB12: 0
    },
    {
      id: 10,
      name: 'Red Lentils (Masoor Dal)',
      image: '🌱',
      calories: 343,
      protein: 25.0,
      carbs: 59.1,
      fat: 1.1,
      iron: 7.5,
      calcium: 51,
      vitaminB12: 0
    },
    {
      id: 11,
      name: 'Black Gram (Urad Dal)',
      image: '🌱',
      calories: 341,
      protein: 24.0,
      carbs: 58.2,
      fat: 1.4,
      iron: 7.6,
      calcium: 154,
      vitaminB12: 0
    },
    {
      id: 12,
      name: 'Split Chickpeas (Chana Dal)',
      image: '🌱',
      calories: 360,
      protein: 22.5,
      carbs: 60.3,
      fat: 5.0,
      iron: 5.3,
      calcium: 58,
      vitaminB12: 0
    },
    {
      id: 13,
      name: 'Kidney Beans (Rajma)',
      image: '🌱',
      calories: 333,
      protein: 23.7,
      carbs: 60.5,
      fat: 0.8,
      iron: 6.7,
      calcium: 143,
      vitaminB12: 0
    },
    {
      id: 14,
      name: 'Chickpeas (Kabuli Chana)',
      image: '🌱',
      calories: 364,
      protein: 19.3,
      carbs: 60.7,
      fat: 6.0,
      iron: 4.3,
      calcium: 105,
      vitaminB12: 0
    },
    {
      id: 15,
      name: 'Black-Eyed Peas (Lobiya)',
      image: '🌱',
      calories: 343,
      protein: 23.9,
      carbs: 60.1,
      fat: 1.7,
      iron: 8.6,
      calcium: 130,
      vitaminB12: 0
    }
  ],
  "Vegetables": [
    {
      id: 16,
      name: 'Potato',
      image: '🥔',
      calories: 77,
      protein: 2.0,
      carbs: 17.0,
      fat: 0.1,
      iron: 0.8,
      calcium: 10,
      vitaminB12: 0
    },
    {
      id: 17,
      name: 'Onion',
      image: '🧅',
      calories: 40,
      protein: 1.1,
      carbs: 9.3,
      fat: 0.1,
      iron: 0.2,
      calcium: 23,
      vitaminB12: 0
    },
    {
      id: 18,
      name: 'Tomato',
      image: '🍅',
      calories: 18,
      protein: 0.9,
      carbs: 3.9,
      fat: 0.2,
      iron: 0.5,
      calcium: 10,
      vitaminB12: 0
    },
    {
      id: 19,
      name: 'Carrot',
      image: '🥕',
      calories: 41,
      protein: 0.9,
      carbs: 9.6,
      fat: 0.2,
      iron: 0.3,
      calcium: 33,
      vitaminB12: 0
    },
    {
      id: 20,
      name: 'Cabbage',
      image: '🥬',
      calories: 25,
      protein: 1.3,
      carbs: 5.8,
      fat: 0.1,
      iron: 0.6,
      calcium: 40,
      vitaminB12: 0
    },
    {
      id: 21,
      name: 'Cauliflower',
      image: '🥦',
      calories: 25,
      protein: 1.9,
      carbs: 5.0,
      fat: 0.1,
      iron: 0.4,
      calcium: 22,
      vitaminB12: 0
    },
    {
      id: 22,
      name: 'Peas',
      image: '🌱',
      calories: 81,
      protein: 5.4,
      carbs: 14.5,
      fat: 0.4,
      iron: 1.5,
      calcium: 25,
      vitaminB12: 0
    },
    {
      id: 23,
      name: 'Spinach (Palak)',
      image: '🥬',
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
      iron: 2.7,
      calcium: 99,
      vitaminB12: 0
    },
    {
      id: 24,
      name: 'Fenugreek Leaves (Methi)',
      image: '🌿',
      calories: 49,
      protein: 4.4,
      carbs: 6.0,
      fat: 0.9,
      iron: 1.9,
      calcium: 395,
      vitaminB12: 0
    },
    {
      id: 25,
      name: 'Bottle Gourd (Lauki)',
      image: '🥒',
      calories: 14,
      protein: 0.6,
      carbs: 3.2,
      fat: 0.1,
      iron: 0.4,
      calcium: 20,
      vitaminB12: 0
    },
    {
      id: 26,
      name: 'Bitter Gourd (Karela)',
      image: '🥒',
      calories: 17,
      protein: 1.0,
      carbs: 3.7,
      fat: 0.2,
      iron: 0.4,
      calcium: 20,
      vitaminB12: 0
    },
    {
      id: 27,
      name: 'Okra (Bhindi)',
      image: '🌿',
      calories: 33,
      protein: 1.9,
      carbs: 7.5,
      fat: 0.2,
      iron: 0.8,
      calcium: 82,
      vitaminB12: 0
    },
    {
      id: 28,
      name: 'Eggplant (Brinjal)',
      image: '🍆',
      calories: 25,
      protein: 1.0,
      carbs: 5.7,
      fat: 0.2,
      iron: 0.2,
      calcium: 18,
      vitaminB12: 0
    }
  ],
  "Fruits": [
    {
      id: 29,
      name: 'Banana',
      image: '🍌',
      calories: 89,
      protein: 1.1,
      carbs: 22.8,
      fat: 0.3,
      iron: 0.3,
      calcium: 5,
      vitaminB12: 0
    },
    {
      id: 30,
      name: 'Mango',
      image: '🥭',
      calories: 60,
      protein: 0.8,
      carbs: 15.0,
      fat: 0.4,
      iron: 0.2,
      calcium: 11,
      vitaminB12: 0
    },
    {
      id: 31,
      name: 'Apple',
      image: '🍎',
      calories: 52,
      protein: 0.3,
      carbs: 13.8,
      fat: 0.2,
      iron: 0.1,
      calcium: 6,
      vitaminB12: 0
    },
    {
      id: 32,
      name: 'Papaya',
      image: '🍈',
      calories: 43,
      protein: 0.5,
      carbs: 10.8,
      fat: 0.3,
      iron: 0.1,
      calcium: 20,
      vitaminB12: 0
    },
    {
      id: 33,
      name: 'Pomegranate',
      image: '🍎',
      calories: 83,
      protein: 1.7,
      carbs: 18.7,
      fat: 1.2,
      iron: 0.3,
      calcium: 10,
      vitaminB12: 0
    },
    {
      id: 34,
      name: 'Guava',
      image: '🍏',
      calories: 68,
      protein: 2.6,
      carbs: 14.3,
      fat: 1.0,
      iron: 0.3,
      calcium: 18,
      vitaminB12: 0
    },
    {
      id: 35,
      name: 'Coconut',
      image: '🥥',
      calories: 354,
      protein: 3.3,
      carbs: 15.2,
      fat: 33.5,
      iron: 2.4,
      calcium: 14,
      vitaminB12: 0
    }
  ],
  "Dairy": [
    {
      id: 36,
      name: 'Milk',
      image: '🥛',
      calories: 42,
      protein: 3.3,
      carbs: 5.0,
      fat: 1.0,
      iron: 0.1,
      calcium: 120,
      vitaminB12: 0.4
    },
    {
      id: 37,
      name: 'Curd (Yogurt/Dahi)',
      image: '🥛',
      calories: 59,
      protein: 3.3,
      carbs: 4.7,
      fat: 3.3,
      iron: 0.1,
      calcium: 149,
      vitaminB12: 0.3
    },
    {
      id: 38,
      name: 'Paneer (Cottage Cheese)',
      image: '🧀',
      calories: 265,
      protein: 18.3,
      carbs: 4.3,
      fat: 20.8,
      iron: 1.2,
      calcium: 208,
      vitaminB12: 0.5
    },
    {
      id: 39,
      name: 'Ghee (Clarified Butter)',
      image: '🧈',
      calories: 900,
      protein: 0,
      carbs: 0,
      fat: 100,
      iron: 0,
      calcium: 0,
      vitaminB12: 0.5
    },
    {
      id: 40,
      name: 'Butter',
      image: '🧈',
      calories: 717,
      protein: 0.9,
      carbs: 0.1,
      fat: 81.1,
      iron: 0,
      calcium: 24,
      vitaminB12: 0.2
    }
  ],
  "Oils & Fats": [
    {
      id: 41,
      name: 'Mustard Oil',
      image: '🧴',
      calories: 884,
      protein: 0,
      carbs: 0,
      fat: 100,
      iron: 0,
      calcium: 0,
      vitaminB12: 0
    },
    {
      id: 42,
      name: 'Sunflower Oil',
      image: '🧴',
      calories: 884,
      protein: 0,
      carbs: 0,
      fat: 100,
      iron: 0,
      calcium: 0,
      vitaminB12: 0
    },
    {
      id: 43,
      name: 'Groundnut Oil',
      image: '🧴',
      calories: 884,
      protein: 0,
      carbs: 0,
      fat: 100,
      iron: 0,
      calcium: 0,
      vitaminB12: 0
    },
    {
      id: 44,
      name: 'Coconut Oil',
      image: '🧴',
      calories: 884,
      protein: 0,
      carbs: 0,
      fat: 100,
      iron: 0,
      calcium: 0,
      vitaminB12: 0
    }
  ],
  "Spices & Condiments": [
    {
      id: 45,
      name: 'Turmeric (Haldi)',
      image: '🧂',
      calories: 354,
      protein: 7.8,
      carbs: 64.9,
      fat: 9.9,
      iron: 41.4,
      calcium: 183,
      vitaminB12: 0
    },
    {
      id: 46,
      name: 'Red Chili Powder',
      image: '🌶️',
      calories: 282,
      protein: 12.0,
      carbs: 56.6,
      fat: 14.0,
      iron: 7.8,
      calcium: 125,
      vitaminB12: 0
    },
    {
      id: 47,
      name: 'Coriander Powder',
      image: '🌿',
      calories: 279,
      protein: 12.4,
      carbs: 54.2,
      fat: 4.8,
      iron: 17.9,
      calcium: 709,
      vitaminB12: 0
    },
    {
      id: 48,
      name: 'Cumin Seeds (Jeera)',
      image: '🧂',
      calories: 375,
      protein: 17.8,
      carbs: 44.2,
      fat: 22.3,
      iron: 66.4,
      calcium: 931,
      vitaminB12: 0
    },
    {
      id: 49,
      name: 'Mustard Seeds (Rai)',
      image: '🧂',
      calories: 508,
      protein: 26.1,
      carbs: 28.1,
      fat: 36.2,
      iron: 8.1,
      calcium: 266,
      vitaminB12: 0
    },
    {
      id: 50,
      name: 'Fenugreek Seeds (Methi Dana)',
      image: '🧂',
      calories: 323,
      protein: 23.0,
      carbs: 58.3,
      fat: 6.4,
      iron: 33.5,
      calcium: 176,
      vitaminB12: 0
    },
    {
      id: 51,
      name: 'Asafoetida (Hing)',
      image: '🧂',
      calories: 297,
      protein: 4.0,
      carbs: 67.7,
      fat: 1.1,
      iron: 39.5,
      calcium: 90,
      vitaminB12: 0
    },
    {
      id: 52,
      name: 'Garam Masala',
      image: '🧂',
      calories: 375,
      protein: 15.7,
      carbs: 53.3,
      fat: 16.0,
      iron: 30.0,
      calcium: 410,
      vitaminB12: 0
    }
  ],
  "Nuts & Seeds": [
    {
      id: 53,
      name: 'Cashews',
      image: '🥜',
      calories: 553,
      protein: 18.2,
      carbs: 30.2,
      fat: 43.8,
      iron: 6.7,
      calcium: 37,
      vitaminB12: 0
    },
    {
      id: 54,
      name: 'Almonds',
      image: '🥜',
      calories: 579,
      protein: 21.1,
      carbs: 21.6,
      fat: 49.9,
      iron: 3.7,
      calcium: 269,
      vitaminB12: 0
    },
    {
      id: 55,
      name: 'Peanuts',
      image: '🥜',
      calories: 567,
      protein: 25.8,
      carbs: 16.1,
      fat: 49.2,
      iron: 4.6,
      calcium: 92,
      vitaminB12: 0
    },
    {
      id: 56,
      name: 'Sesame Seeds',
      image: '🧂',
      calories: 573,
      protein: 17.7,
      carbs: 23.4,
      fat: 49.7,
      iron: 14.6,
      calcium: 975,
      vitaminB12: 0
    },
    {
      id: 57,
      name: 'Poppy Seeds',
      image: '🧂',
      calories: 525,
      protein: 18.0,
      carbs: 28.0,
      fat: 42.0,
      iron: 9.8,
      calcium: 1438,
      vitaminB12: 0
    }
  ]
};

const nonVegFoods = [
  {
    id: 1,
    name: 'Salmon',
    image: '🐟',
    calories: 206,
    protein: 22,
    carbs: 0,
    fat: 13,
    iron: 0.3,
    calcium: 13,
    vitaminB12: 2.6
  },
  {
    id: 2,
    name: 'Chicken Breast',
    image: '🍗',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    iron: 1.1,
    calcium: 15,
    vitaminB12: 0.3
  },
  {
    id: 3,
    name: 'Eggs',
    image: '🥚',
    calories: 155,
    protein: 13,
    carbs: 1.1,
    fat: 11,
    iron: 1.8,
    calcium: 56,
    vitaminB12: 1.1
  },
  {
    id: 5,
    name: 'Mutton',
    image: '🍖',
    calories: 294,
    protein: 25,
    carbs: 0,
    fat: 21,
    iron: 2.7,
    calcium: 20,
    vitaminB12: 2.0
  },
  {
    id: 5,
    name: 'Tuna',
    image: '🐠',
    calories: 132,
    protein: 28,
    carbs: 0,
    fat: 1.3,
    iron: 1.6,
    calcium: 10,
    vitaminB12: 2.5
  },
  {
    id: 6,
    name: 'Shrimp',
    image: '🦐',
    calories: 99,
    protein: 24,
    carbs: 0.2,
    fat: 0.3,
    iron: 2.6,
    calcium: 52,
    vitaminB12: 1.9
  }
];

const FoodCard = ({ food }) => {
  return (
    <div className="food-card">
      <div className="food-card-inner">
        <div className="food-card-front">
          <div className="food-emoji">{food.image}</div>
          <h3 className="food-name">{food.name}</h3>
          <p className="food-calories">{food.calories} kcal</p>
          <p className="food-serving">per 100g</p>
        </div>
        
        <div className="food-card-back">
          <h3 className="food-name-back">{food.name}</h3>
          <div className="nutrition-info">
            <div className="macros">
              <div className="macro-row">
                <span>Calories:</span>
                <span>{food.calories} kcal</span>
              </div>
              <div className="macro-row">
                <span>Protein:</span>
                <span>{food.protein}g</span>
              </div>
              <div className="macro-row">
                <span>Carbs:</span>
                <span>{food.carbs}g</span>
              </div>
              <div className="macro-row">
                <span>Fat:</span>
                <span>{food.fat}g</span>
              </div>
            </div>
            
            <div className="micros">
              <div className="micro-row">
                <span>Iron:</span>
                <span>{food.iron}mg</span>
              </div>
              <div className="micro-row">
                <span>Calcium:</span>
                <span>{food.calcium}mg</span>
              </div>
              <div className="micro-row">
                <span>Vitamin B12:</span>
                <span>{food.vitaminB12}µg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Category component for vegetarian food sections
const FoodCategory = ({ title, foods }) => {
  return (
    <div className="food-category">
      <h2 className="category-title">{title}</h2>
      <div className="food-cards-grid">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
};

// Main component
export default function NutritionalValuesPage() {
  const [activeTab, setActiveTab] = useState('veg');
  const [activeVegCategory, setActiveVegCategory] = useState('all');
  
  // Function to render vegetarian food categories
  const renderVegFoods = () => {
    if (activeVegCategory === 'all') {
      return Object.entries(vegFoods).map(([category, foods]) => (
        <FoodCategory key={category} title={category} foods={foods} />
      ));
    } else {
      return (
        <FoodCategory 
          title={activeVegCategory} 
          foods={vegFoods[activeVegCategory] || []} 
        />
      );
    }
  };
  
  // Function to render non-vegetarian foods
  const renderNonVegFoods = () => {
    return (
      <div className="food-category">
        <h2 className="category-title">Non-Vegetarian Foods</h2>
        <div className="food-cards-grid">
          {nonVegFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="nutrition-app">
      <div className="container">
        <header className="app-header">
          <h1 className="app-title">Nutritional Values</h1>
          <p className="app-description">Explore the nutritional content of various foods</p>
        </header>
        
        {/* Main Tabs */}
        <div className="main-tabs">
          <button 
            className={`tab ${activeTab === 'veg' ? 'active-veg' : ''}`}
            onClick={() => setActiveTab('veg')}
          >
            Vegetarian
          </button>
          <button 
            className={`tab ${activeTab === 'nonveg' ? 'active-nonveg' : ''}`}
            onClick={() => setActiveTab('nonveg')}
          >
            Non-Vegetarian
          </button>
        </div>
        
        {/* Vegetarian Category Filter */}
        {activeTab === 'veg' && (
          <div className="category-filter">
            <button 
              className={`filter-btn ${activeVegCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveVegCategory('all')}
            >
              All Categories
            </button>
            {Object.keys(vegFoods).map((category) => (
              <button 
                key={category}
                className={`filter-btn ${activeVegCategory === category ? 'active' : ''}`}
                onClick={() => setActiveVegCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}
        
        {/* Food Cards */}
        <div className="food-content">
          {activeTab === 'veg' ? renderVegFoods() : renderNonVegFoods()}
        </div>
      </div>
    </div>
  );
}