import React from "react";
import Header from "./SignInControl/Header";
import ProfileControl from "./ProfileControl/ProfileControl";
import EventControl from "./EventsControl/EventControl";
import SignInControl from "./SignInControl/SignInControl";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AuthProfile from "./UserProfileFBAuth/UserProfileControl";
import NewEventForm from "./EventsControl/NewEventForm";
import { MobileProvier } from "./MobileContext";
import Footer from "./SignInControl/Footer";

function App() {
  const auth = getAuth();
  onAuthStateChanged(auth, (email) => {
    if (email) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = email;

      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  return (
    <Router>
      <MobileProvier>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            background: "black",
          }}
        >
          <Header />
          <Routes>
            <Route path="/sign-in" element={<SignInControl />} />
            <Route path="user-profile" element={<AuthProfile />} />
            {/* <Route path="/friends" element={<FriendControl />} /> */}
            <Route path="/" element={<EventControl />} />
            <Route path="new-event" element={<NewEventForm />} />
            <Route path="/profile" element={<ProfileControl />} />
          </Routes>
          <Footer />
        </div>
      </MobileProvier>
    </Router>
  );
}

export default App;
