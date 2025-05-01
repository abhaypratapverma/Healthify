const handleLogout = () => {
  localStorage.removeItem("token"); // Remove token
  alert("Logged out successfully!");
  navigate("/auth"); // Redirect to login page
};