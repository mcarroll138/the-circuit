// import Counter from "./Counter";
// import CounterTwo from "./CounterTwo";
import React from "react";
import Header from "./Header";
import EventList from "./EventList";
import EventControl from "./EventControl";
import SignIn from "./SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<EventControl />} />
      </Routes>
    </Router>
  );
}

export default App;
