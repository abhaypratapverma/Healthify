import React from "react";
import { useNavigate } from "react-router-dom";
import "../../style/consultancy.css"; // Import CSS file
import drpriya from "../../assets/consultancy/dr_priya.jpg"; // Example of a valid local image

const consultants = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    specialization: "Nutrition Specialist",
    experience: "8 years experience",
    image: drpriya, // Local image
    rating: 4.5, // Added rating
    description: "Expert in weight loss, diet planning, and overall health management.",
  },
  {
    id: 2,
    name: "Rahul Mehra",
    specialization: "Certified Gym Trainer",
    experience: "5 years experience",
    image: "https://picsum.photos/200/300?random=1", // Placeholder image
    rating: 4.0, // Added rating
    description: "Strength training, fat loss programs, and customized workout plans.",
  },
  {
    id: 3,
    name: "Ankita Verma",
    specialization: "Yoga Instructor",
    experience: "6 years experience",
    image: "https://picsum.photos/200/300?random=2", // Placeholder image
    rating: 4.8, // Added rating
    description: "Expert in yoga therapy, mindfulness, and body flexibility improvement.",
  },
  {
    id: 4,
    name: "Dr. Rohan Gupta",
    specialization: "Physiotherapist",
    experience: "10 years experience",
    image: "https://picsum.photos/200/300?random=3", // Placeholder image
    rating: 4.2, // Added rating
    description: "Specializes in rehabilitation, sports injuries, and pain management.",
  },
  {
    id: 5,
    name: "Sakshi Jain",
    specialization: "Mental Health Counselor",
    experience: "7 years experience",
    image: "https://picsum.photos/200/300?random=4", // Placeholder image
    rating: 4.7, // Added rating
    description: "Expert in stress management, anxiety, and emotional well-being.",
  },
  {
    id: 6,
    name: "Vikram Singh",
    specialization: "Fitness Coach",
    experience: "4 years experience",
    rating: 4.7, // Added rating
    image: "https://picsum.photos/200/300?random=5", // Placeholder image
    description: "Specializes in functional training and personalized fitness plans.",
  },
  {
    id: 7,
    name: "Dr. Neha Bansal",
    specialization: "Dietitian",
    experience: "9 years experience",
    rating: 4.7, // Added rating
    image: "https://picsum.photos/200/300?random=6", // Placeholder image
    description: "Expert in clinical nutrition and dietary management.",
  },
  {
    id: 8,
    name: "Amit Kumar",
    specialization: "Wellness Coach",
    experience: "3 years experience",
    rating: 4.7, // Added rating
    image: "https://picsum.photos/200/300?random=7", // Placeholder image
    description: "Focuses on holistic health and lifestyle changes.",
  },
  {
    id: 9,
    name: "Pooja Desai",
    specialization: "Health Educator",
    experience: "5 years experience",
    rating: 4.7, // Added rating
    image: "https://picsum.photos/200/300?random=8", // Placeholder image
    description: "Specializes in community health and wellness education.",
  },
  {
    id: 10,
    name: "Karan Mehta",
    specialization: "Sports Nutritionist",
    experience: "6 years experience",
    rating: 4.7, // Added rating
    image: "https://picsum.photos/200/300?random=9", // Placeholder image
    description: "Expert in nutrition for athletes and performance enhancement.",
  },
  {
    id: 11,
    name: "Riya Kapoor",
    specialization: "Pilates Instructor",
    experience: "4 years experience",
    rating: 4.7, // Added rating
    image: "https://picsum.photos/200/300?random=10", // Placeholder image
    description: "Specializes in core strength and flexibility training.",
  },
  {
    id: 12,
    name: "Siddharth Rao",
    specialization: "Cardiac Rehabilitation Specialist",
    experience: "7 years experience",
    rating: 4.7, // Added rating
    image: "https://picsum.photos/200/300?random=11", // Placeholder image
    description: "Expert in heart health and recovery programs.",
  },
];

const Consultancy = () => {
  const navigate = useNavigate();

  const handleMoreInfo = (consultant) => {
    navigate(`/consultants/${consultant.id}`, { state: { consultant } });
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars)
          .fill()
          .map((_, index) => (
            <span key={`full-${index}`} className="star full-star">★</span>
          ))}
        {halfStar && <span className="star half-star">★</span>}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <span key={`empty-${index}`} className="star empty-star">★</span>
          ))}
      </>
    );
  };

  return (
    <div className="consultancy-container">
      <h1 className="consultancy-title">Meet Our Experts</h1>

      <div className="consultants-grid">
        {consultants.map((consultant) => (
          <div key={consultant.id} className="consultant-card">
            <div className="consultant-image">
              <img src={consultant.image} alt={consultant.name} />
            </div>
            <h2 className="consultant-name">{consultant.name}</h2>
            <p className="consultant-specialization">{consultant.specialization}</p>
            <p className="consultant-experience">{consultant.experience}</p>
            {consultant.rating && (
              <div className="consultant-rating">
                {renderStars(consultant.rating)}
                <span className="rating-value">({consultant.rating})</span>
              </div>
            )}
            <button
              onClick={() => handleMoreInfo(consultant)}
              className="more-info-button"
            >
              More Info
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Consultancy;
