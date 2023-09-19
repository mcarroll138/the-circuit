import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./SignInControl/Header";
import SignIn from "./SignInControl/SignInControl";
import { auth } from "./../firebase.js"; // Import your authentication logic

function App() {
  const [user, setUser] = useState(null);

  // Use useEffect to listen for changes in authentication status
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      {/* Pass the user's email to the Header component */}
      <Header email={user ? user.email : null} />
      {/* //If user truthy(exisits)then pass user email to emal variable prop otherwise pass null  */}

      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<EventControl />} />
      </Routes>
    </Router>
  );
}

export default App;
