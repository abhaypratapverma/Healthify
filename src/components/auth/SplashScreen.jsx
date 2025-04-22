// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import LoginPage from "./LoginPage";
// import '../../style/splashscreen.css'; // Import your CSS file for styling

// const SplashScreen = () => {
//   const [showLogin, setShowLogin] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setShowLogin(true), 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   const sentence = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         delayChildren: 0.3,
//         staggerChildren: 0.05,
//       },
//     },
//   };

//   const letter = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
//   };

//   if (showLogin) return <LoginPage />;

//   return (
//     <motion.div
//       className="splash-screen"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 1 }}
//     >
//       <div className="title-container">
//         <motion.h1
//           variants={sentence}
//           initial="hidden"
//           animate="visible"
//           className="splash-text"
//         >
//           {"Welcome to FIT".split("").map((char, index) => (
//             <motion.span key={index} variants={letter}>
//               {char === " " ? "\u00A0" : char}
//             </motion.span>
//           ))}
//         </motion.h1>
//         <motion.h1
//           variants={sentence}
//           initial="hidden"
//           animate="visible"
//           className="splash-text world"
//         >
//           {"World".split("").map((char, index) => (
//             <motion.span key={index} variants={letter}>
//               {char === " " ? "\u00A0" : char}
//             </motion.span>
//           ))}
//         </motion.h1>
//       </div>
//     </motion.div>
//   );
// };

// export default SplashScreen;
