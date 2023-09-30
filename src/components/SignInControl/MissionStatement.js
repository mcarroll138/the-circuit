import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function MissionStatement() {
  const divContainerStyle = {
      background: "black",
      color: "white",
      padding: 10,
  };
    
    const headingStyle = {
        fontSize: "48px",
        fontFamily: "courier",
        fontWeight: "400",
        alignItems: "center",
    }
    
  return (
    <div style={divContainerStyle} id="container">
      <div style={headingStyle}>
        Event Listings For Your Community
        <div>
          Welcome to the Circuit, please<Link to="/sign-in">Log In</Link>
          to access your account.
        </div>
      </div>
    </div>
  );
}
