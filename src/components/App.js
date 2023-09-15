// import Counter from "./Counter";
// import CounterTwo from "./CounterTwo";
import React from "react";
import Header from "./Header";
import EventList from "./EventList";
import EventControl from "./EventControl";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Header />
      <EventControl />
      {/* <Counter />
      <CounterTwo /> */}
    </React.Fragment>
  );
}

export default App;
