import React, { useState } from "react";
import { RadioButton } from "./RadioButton";

export default function RadioButtonControl() {
  const [view, setView] = useState("All");

  const radioChangeHandler = (e) => {
    setView(e.target.value);
  };

  return (
    <div className="RadioButton">
      {/* <h1>React Component (Radio Button) Example</h1> */}
      <div className="radio-btn-container" style={{ display: "flex" }}>
        <RadioButton
          changed={radioChangeHandler}
          id="1"
          isSelected={view === "All"}
          label="All"
          value="All"
        />

        <RadioButton
          changed={radioChangeHandler}
          id="2"
          isSelected={view === "Hosting"}
          label="Hosted By Me"
          value="Hosting"
        />
        <RadioButton
          changed={radioChangeHandler}
          id="3"
          isSelected={view === "CloseFriends"}
          label="Close Friends"
          value="CloseFriends"
        />
        <RadioButton
          changed={radioChangeHandler}
          id="4"
          isSelected={view === "Attending"}
          label="Attending"
          value="Attending"
        />
      </div>
      {view === "All" && (
        <input
          style={{ marginTop: "10px" }}
          type="text"
          placeholder="Enter transaction id"
        />
      )}
      {/* <h2 style={{ marginTop: "25px" }}>
        The selected radio button value is = {view}
      </h2> */}
    </div>
  );
}
