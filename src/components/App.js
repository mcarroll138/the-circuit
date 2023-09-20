// import Counter from "./Counter";
// import CounterTwo from "./CounterTwo";
import React from "react";
import Header from "./SignInControl/Header";
import ProfileControl from "./ProfileControl/NewProfileForm";
import EventList from "./EventsControl/EventList";
import EventControl from "./EventsControl/EventControl";
import SignInControl from "./SignInControl/SignInControl";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ConfirmPassword from "./SignInControl/ConfirmPassword";
import NewProfileForm from "./ProfileControl/NewProfileForm";

function App() {
  const auth = getAuth();
  onAuthStateChanged(auth, (email) => {
    if (email) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = email;
      console.log(uid);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/sign-in" element={<SignInControl />} />
        <Route path="/" element={<EventControl />} />
        <Route path="/profile" element={<ProfileControl />} />
      </Routes>
    </Router>
  );
}

export default App;
