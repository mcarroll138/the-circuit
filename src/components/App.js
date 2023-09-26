// import Counter from "./Counter";
// import CounterTwo from "./CounterTwo";
// import ConfirmPassword from "./SignInControl/ConfirmPassword";
// import NewProfileForm from "./ProfileControl/NewProfileForm";
// import EventList from "./EventsControl/EventList";
import React from "react";
import Header from "./SignInControl/Header";
import ProfileControl from "./ProfileControl/ProfileControl";
import EventControl from "./EventsControl/EventControl";
import SignInControl from "./SignInControl/SignInControl";
import UserProfile from "./UserProfileFBAuth/UserProfileControl.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AuthProfile from "./UserProfileFBAuth/UserProfileControl";
import NewEventForm from "./EventsControl/NewEventForm";

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
        <Route path="user-profile" element={<AuthProfile />} />
        {/* <Route path="/friends" element={<FriendControl />} /> */}
        <Route path="/" element={<EventControl />} />
        <Route path="new-event" element={<NewEventForm />} />
        <Route path="/profile" element={<ProfileControl />} />
      </Routes>
    </Router>
  );
}

export default App;
