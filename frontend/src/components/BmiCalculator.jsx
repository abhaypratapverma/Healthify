import { useState } from "react";
import { motion } from "framer-motion";

import '../style/BmiCalculator.css';

export function BmiCalculator() {
  const [unit, setUnit] = useState("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState(null);
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [range, setRange] = useState("");
  const [color, setColor] = useState("");
  const [recommendations, setRecommendations] = useState({
    habits: [],
    workout: [],
    diet: [],
  });

  const getRecommendations = (category) => {
    switch (category) {
      case "Underweight":
        return {
          habits: [
            "Eat more frequently",
            "Include protein-rich foods",
            "Get adequate sleep"
          ],
          workout: [
            "Focus on strength training",
            "Perform compound exercises",
            "Start with bodyweight exercises"
          ],
          diet: [
            "Add healthy fats",
            "Increase protein intake",
            "Include complex carbs"
          ],
        };
      case "Normal":
        return {
          habits: [
            "Maintain regular meals",
            "Stay hydrated",
            "Practice mindful eating"
          ],
          workout: [
            "Mix cardio and strength",
            "Include flexibility work",
            "Try different sports"
          ],
          diet: [
            "Keep a balanced diet",
            "Control portions",
            "Eat varied vegetables"
          ],
        };
      case "Overweight":
      case "Obesity Class I":
      case "Obesity Class II":
      case "Obesity Class III":
        return {
          habits: [
            "Set realistic goals",
            "Track food intake",
            "Get sufficient sleep"
          ],
          workout: [
            "Start with walking",
            "Increase intensity gradually",
            "Try low-impact activities"
          ],
          diet: [
            "Reduce processed foods",
            "Control portions",
            "Choose lean proteins"
          ],
        };
      default:
        return {
          habits: [],
          workout: [],
          diet: [],
        };
    }
  };

  const calculateBmi = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    
    if (isNaN(w) || isNaN(h)) return;
    
    let bmiValue;
    if (unit === "metric") {
      bmiValue = w / ((h / 100) * (h / 100));
    } else {
      bmiValue = (w * 703) / (h * h);
    }
    
    setBmi(bmiValue);
    
    let cat;
    let col;
    let rng;
    
    if (bmiValue < 18.5) {
      cat = "Underweight";
      col = "category-underweight";
      rng = "Below 18.5";
    } else if (bmiValue < 25) {
      cat = "Normal";
      col = "category-normal";
      rng = "18.5 - 24.9";
    } else if (bmiValue < 30) {
      cat = "Overweight";
      col = "category-overweight";
      rng = "25 - 29.9";
    } else if (bmiValue < 35) {
      cat = "Obesity Class I";
      col = "category-obesity1";
      rng = "30 - 34.9";
    } else if (bmiValue < 40) {
      cat = "Obesity Class II";
      col = "category-obesity2";
      rng = "35 - 39.9";
    } else {
      cat = "Obesity Class III";
      col = "category-obesity3";
      rng = "40 or greater";
    }
    
    setCategory(cat);
    setColor(col);
    setRange(rng);
    setRecommendations(getRecommendations(cat));
  };

  return (
    <div className="bmi-calculator">
      <div className="calc-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h2 className="title-main">BMI Calculator</h2>
          
          <div className="unit-toggle">
            <button
              onClick={() => setUnit("metric")}
              className={`button-unit ${unit === "metric" ? "button-unit-active" : ""}`}
            >
              Metric (kg, cm)
            </button>
            <button
              onClick={() => setUnit("imperial")}
              className={`button-unit ${unit === "imperial" ? "button-unit-active" : ""}`}
            >
              Imperial (lbs, in)
            </button>
          </div>

          <div className="form-control">
            <label className="label">Weight ({unit === "metric" ? "kg" : "lbs"})</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="input-field"
              placeholder={unit === "metric" ? "70" : "154"}
            />
          </div>
          
          <div className="form-control">
            <label className="label">Height ({unit === "metric" ? "cm" : "in"})</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="input-field"
              placeholder={unit === "metric" ? "170" : "67"}
            />
          </div>
          
          <div className="form-control">
            <label className="label">Age (optional)</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input-field"
              placeholder="25"
            />
          </div>

          <div className="gender-toggle">
            <button
              onClick={() => setGender("male")}
              className={`button-unit ${gender === "male" ? "button-unit-active" : ""}`}
            >
              Male
            </button>
            <button
              onClick={() => setGender("female")}
              className={`button-unit ${gender === "female" ? "button-unit-active" : ""}`}
            >
              Female
            </button>
          </div>

          <button
            onClick={calculateBmi}
            className="calculate-button"
          >
            Calculate BMI
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          {bmi && (
            <div className="text-center">
              <h3 className="result-bmi">{bmi.toFixed(1)}</h3>
              <p className={`category-text ${color}`}>{category}</p>
              <p className="range-text">Range: {range}</p>

              <div className="recommendations">
                <h4 className="title-section">Recommendations</h4>
                <div className="recommendation-section">
                  <h5 className="recommendation-title">🌟 Healthy Habits</h5>
                  <ul className="recommendation-list">
                    {recommendations.habits.map((habit, index) => (
                      <li key={index} className="recommendation-item">{habit}</li>
                    ))}
                  </ul>
                </div>

                <div className="recommendation-section">
                  <h5 className="recommendation-title">💪 Workout Tips</h5>
                  <ul className="recommendation-list">
                    {recommendations.workout.map((workout, index) => (
                      <li key={index} className="recommendation-item">{workout}</li>
                    ))}
                  </ul>
                </div>

                <div className="recommendation-section">
                  <h5 className="recommendation-title">🥗 Diet Suggestions</h5>
                  <ul className="recommendation-list">
                    {recommendations.diet.map((diet, index) => (
                      <li key={index} className="recommendation-item">{diet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 className="title-section">BMI Categories</h3>
        <div className="bmi-categories">
          <div className="category-box category-box-underweight">
            <h4 className="category-title">Underweight</h4>
            <p>Below 18.5</p>
          </div>
          <div className="category-box category-box-normal">
            <h4 className="category-title">Normal</h4>
            <p>18.5 - 24.9</p>
          </div>
          <div className="category-box category-box-overweight">
            <h4 className="category-title">Overweight</h4>
            <p>25 - 29.9</p>
          </div>
          <div className="category-box category-box-obesity1">
            <h4 className="category-title">Obesity I</h4>
            <p>30 - 34.9</p>
          </div>
          <div className="category-box category-box-obesity2">
            <h4 className="category-title">Obesity II</h4>
            <p>35 - 39.9</p>
          </div>
          <div className="category-box category-box-obesity3">
            <h4 className="category-title">Obesity III</h4>
            <p>≥ 40</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="info-container"
      >
        <h3 className="title-section">About BMI</h3>
        <div className="info-text">
          <p>Body Mass Index (BMI) is a measure of body fat based on height and weight. It can help indicate if you're at a healthy weight.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="info-card">
            <h4 className="title-subsection">Special Considerations</h4>
            <ul className="info-list">
              <li>BMI may overestimate body fat in athletes and those with muscular builds</li>
              <li>BMI may underestimate body fat in older persons or those who have lost muscle mass</li>
              <li>Different ethnic groups may have different BMI thresholds for health risks</li>
            </ul>
          </div>
          <div className="info-card">
            <h4 className="title-subsection">Limitations of BMI</h4>
            <p>BMI is only an estimate that cannot take body composition into account. Factors affecting BMI accuracy include:</p>
            <ul className="info-list">
              <li>Age and sex</li>
              <li>Ethnic background</li>
              <li>Muscle mass and body composition</li>
              <li>Physical activity level</li>
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="risk-container-overweight">
          <h4 className="risk-title-overweight">Risks of Being Overweight</h4>
          <ul className="risk-list">
            <li>High blood pressure</li>
            <li>Type II diabetes</li>
            <li>Coronary heart disease</li>
            <li>Stroke</li>
            <li>Gallbladder disease</li>
            <li>Sleep apnea and breathing problems</li>
            <li>Mental health issues</li>
            <li>Decreased quality of life</li>
          </ul>
        </div>

        <div className="risk-container-underweight">
          <h4 className="risk-title-underweight">Risks of Being Underweight</h4>
          <ul className="risk-list">
            <li>Malnutrition and vitamin deficiencies</li>
            <li>Anemia</li>
            <li>Osteoporosis</li>
            <li>Decreased immune function</li>
            <li>Growth and development issues</li>
            <li>Reproductive problems</li>
            <li>Increased mortality risk</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
