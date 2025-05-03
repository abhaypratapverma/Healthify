import '../style/NutritionalValues.css';
import { useEffect, useState } from "react";

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

export default function NutritionalValuesPage() {
  const [activeTab, setActiveTab] = useState('veg');
  const [activeVegCategory, setActiveVegCategory] = useState('all');
  const [vegFoods, setVegFoods] = useState({});
  const [nonVegFoods, setNonVegFoods] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/food')
      .then(response => response.json())
      .then(data => {
        const transformedVegFoods = {};
        const transformedNonVegFoods = [];

        data.forEach(category => {
          if (category.category.toLowerCase() === 'nonveg') {
            // Add all non-veg items to a flat list
            transformedNonVegFoods.push(...category.items);
          } else {
            // Group veg items by category
            transformedVegFoods[category.category] = category.items;
          }
        });

        setVegFoods(transformedVegFoods);
        setNonVegFoods(transformedNonVegFoods);
      })
      .catch(error => console.error('Error fetching food data:', error));
  }, []);

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
