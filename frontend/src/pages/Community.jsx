import React from "react";
import "../style/community.css"; // Make sure you create this CSS file

const Community = () => {
  const posts = [
    {
      user: "Anjali Sharma",
      content: "Started my yoga journey today! Feeling refreshed! 🧘‍♀️",
      likes: 34,
      comments: 5,
    },
    {
      user: "Rahul Verma",
      content: "Completed 10,000 steps 7 days in a row! Let's go! 🚶‍♂️💪",
      likes: 52,
      comments: 12,
    },
  ];

  const trending = [
    "30-Day Plank Challenge",
    "Healthy Meal Preps",
    "Best Yoga Poses for Beginners",
    "Morning Motivation Routine",
  ];

  const topContributors = [
    { name: "Priya Gupta", posts: 120 },
    { name: "Sahil Khan", posts: 95 },
    { name: "Nina Roy", posts: 88 },
  ];

  return (
    <div className="community-page">
      {/* Sidebar */}
      <aside className="community-sidebar">
        <div className="sidebar-section">
          <h3>Trending Topics</h3>
          <ul>
            {trending.map((topic, index) => (
              <li key={index}>#{topic}</li>
            ))}
          </ul>
        </div>

        <div className="sidebar-section">
          <h3>Top Contributors</h3>
          <ul>
            {topContributors.map((user, index) => (
              <li key={index}>
                {user.name} ({user.posts} posts)
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar-section">
          <h3>Quote of the Day</h3>
          <p>“Take care of your body. It's the only place you have to live.”</p>
        </div>
      </aside>

      {/* Main Feed */}
      <main className="community-feed">
        <h2>Community Feed</h2>

        {posts.map((post, index) => (
          <div className="post-card" key={index}>
            <h4>{post.user}</h4>
            <p>{post.content}</p>
            <div className="post-actions">
              <span>👍 {post.likes} Likes</span>
              <span>💬 {post.comments} Comments</span>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Community;
