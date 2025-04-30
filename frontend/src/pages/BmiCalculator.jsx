import React, { useState } from "react";
import { motion } from "framer-motion";
import "..//style/Bmi.css";

const getRecommendations = (category) => {
  switch (category) {
    case "Underweight":
      return {
        habits: [
          "Eat more frequently",
          "Include protein-rich foods",
          "Get adequate sleep",
        ],
        workout: [
          "Focus on strength training",
          "Perform compound exercises",
          "Start with bodyweight exercises",
        ],
        diet: [
          "Add healthy fats",
          "Increase protein intake",
          "Include complex carbs",
        ],
      };
    case "Normal":
      return {
        habits: [
          "Maintain regular meals",
          "Stay hydrated",
          "Practice mindful eating",
        ],
        workout: [
          "Mix cardio and strength",
          "Include flexibility work",
          "Try different sports",
        ],
        diet: [
          "Keep a balanced diet",
          "Control portions",
          "Eat varied vegetables",
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
          "Get sufficient sleep",
        ],
        workout: [
          "Start with walking",
          "Increase intensity gradually",
          "Try low-impact activities",
        ],
        diet: [
          "Reduce processed foods",
          "Control portions",
          "Choose lean proteins",
        ],
      };
    default:
      return { habits: [], workout: [], diet: [] };
  }
};

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

    let cat = "",
      col = "",
      rng = "";

    if (bmiValue < 18.5) {
      cat = "Underweight";
      col = "blue";
      rng = "Below 18.5";
    } else if (bmiValue < 25) {
      cat = "Normal";
      col = "green";
      rng = "18.5 - 24.9";
    } else if (bmiValue < 30) {
      cat = "Overweight";
      col = "yellow";
      rng = "25 - 29.9";
    } else if (bmiValue < 35) {
      cat = "Obesity Class I";
      col = "orange";
      rng = "30 - 34.9";
    } else if (bmiValue < 40) {
      cat = "Obesity Class II";
      col = "red";
      rng = "35 - 39.9";
    } else {
      cat = "Obesity Class III";
      col = "darkred";
      rng = "40 or greater";
    }

    setCategory(cat);
    setColor(col);
    setRange(rng);
    setRecommendations(getRecommendations(cat));
  };

  return (
    <div className="bmi-container">
      <div className="bmi-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bmi-card"
        >
          <h2 className="bmi-title">BMI Calculator</h2>
          <div className="unit-toggle">
            <button
              className={`unit-btn ${unit === "metric" ? "active" : ""}`}
              onClick={() => setUnit("metric")}
            >
              Metric (kg, cm)
            </button>
            <button
              className={`unit-btn ${unit === "imperial" ? "active" : ""}`}
              onClick={() => setUnit("imperial")}
            >
              Imperial (lbs, in)
            </button>
          </div>

          <div className="bmi-inputs">
            <div className="input-group">
              <label>Weight ({unit === "metric" ? "kg" : "lbs"})</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70"
              />
            </div>
            <div className="input-group">
              <label>Height ({unit === "metric" ? "cm" : "in"})</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="170"
              />
            </div>
            <div className="input-group">
              <label>Age (optional)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="25"
              />
            </div>
            <div className="gender-group">
              <label>Gender</label>
              <div>
                <button
                  className={`gender-btn ${gender === "male" ? "active" : ""}`}
                  onClick={() => setGender("male")}
                >
                  Male
                </button>
                <button
                  className={`gender-btn ${
                    gender === "female" ? "active" : ""
                  }`}
                  onClick={() => setGender("female")}
                >
                  Female
                </button>
              </div>
            </div>
            <button className="calculate-btn" onClick={calculateBmi}>
              Calculate BMI
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bmi-card"
        >
          {bmi && (
            <div className="result">
              <h3>Your BMI</h3>
              <p className="bmi-value">{bmi.toFixed(1)}</p>
              <p className={`bmi-category ${color}`}>{category}</p>
              <p className="bmi-range">Range: {range}</p>

              <div className="recommendations">
                <h4>Recommendations</h4>
                <div>
                  <h5>🌟 Healthy Habits</h5>
                  <ul>
                    {recommendations.habits.map((habit, i) => (
                      <li key={i}>{habit}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5>💪 Workout Tips</h5>
                  <ul>
                    {recommendations.workout.map((workout, i) => (
                      <li key={i}>{workout}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5>🥗 Diet Suggestions</h5>
                  <ul>
                    {recommendations.diet.map((diet, i) => (
                      <li key={i}>{diet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </motion.div>
        {/* BMI Categories Section */}
        <div>
          {/* BMI Categories Section */}
          <section className="bmi-section">
            <h2 className="bmi-heading">BMI Categories</h2>
            <div className="table-container">
              <table className="bmi-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>BMI Range (kg/m²)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Underweight</td>
                    <td>Less than 18.5</td>
                  </tr>
                  <tr>
                    <td>Normal weight</td>
                    <td>18.5–24.9</td>
                  </tr>
                  <tr>
                    <td>Overweight</td>
                    <td>25–29.9</td>
                  </tr>
                  <tr>
                    <td>Obesity</td>
                    <td>30 or greater</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* About BMI Section */}
          <section className="bmi-section">
            <h2 className="about-heading">About BMI</h2>
            <p className="about-text">
              Body Mass Index (BMI) is a simple calculation using a person's
              height and weight. The formula is: BMI = weight (kg) / (height
              (m))². BMI is used as a screening tool to categorize individuals
              based on weight ranges.
            </p>
            <p className="about-subheading">Limitations of BMI:</p>
            <ul className="list">
              <li>BMI doesn't differentiate between muscle and fat mass.</li>
              <li>
                It may misclassify muscular individuals as overweight or obese.
              </li>
              <li>
                It may underestimate body fat in older adults or those with low
                muscle mass.
              </li>
            </ul>
          </section>

          {/* Risks Section */}
          <section className="bmi-section">
            <h2 className="risk-heading">
              Risks of Being Overweight or Underweight
            </h2>
            <p className="about-text">
              Maintaining a healthy weight is important for overall well-being.
              Being overweight or underweight can lead to various health
              problems:
            </p>
            <div className="risk-grid">
              <div>
                <h3 className="risk-subheading">Risks of Being Overweight:</h3>
                <ul className="list">
                  <li>Heart disease and stroke</li>
                  <li>Type 2 diabetes</li>
                  <li>High blood pressure</li>
                  <li>Sleep apnea</li>
                  <li>Certain cancers</li>
                </ul>
              </div>
              <div>
                <h3 className="risk-subheading">Risks of Being Underweight:</h3>
                <ul className="list">
                  <li>Malnutrition</li>
                  <li>Osteoporosis</li>
                  <li>Weakened immune system</li>
                  <li>Fertility issues</li>
                  <li>Anemia</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
