import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function MissionStatement() {
  const mainDivContainerStyle = {
    background: "black",
    color: "white",
    padding: 20,
  };

  const secondaryDivContainerStyle = {
    display: "flex",
    fontSize: 36,
    // padding: 20,
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "black",
    justifyContent: "space-between",
  };

  const headingStyle = {
    fontSize: "48px",
    fontFamily: "courier",
    fontWeight: "400",
    alignItems: "center",
  };

  const bodyTextStyle = {
    fontSize: "24px",
    fontFamily: "arial",
  };
  return (
    <div style={mainDivContainerStyle} id="container">
      <div style={headingStyle}>
        Event Listings For Your Community
        <div style={bodyTextStyle}>
          Ready to join our community? Sign up <Link to="/sign-in">here</Link>
          to get started.
        </div>
        <div style={secondaryDivContainerStyle}>
          <div>
            <p>Access Local Events</p>
            <p style={{ fontSize: 16 }}>
              Access and share events in your community. Share events with
              fiends and family.
            </p>
          </div>
          <div>PhotoHere</div>
        </div>
        <div style={secondaryDivContainerStyle}>
          <div>
            <p>Create Events</p>
            <p style={{ fontSize: 16 }}>
              Create an event to share with others. Control invite list by
              making event private or open to all.
            </p>
          </div>
          <div>PhotoHere</div>
        </div>
        <div style={secondaryDivContainerStyle}>
          <div>
            <p>One Place For Events</p>
            <p style={{ fontSize: 16 }}>
              The Circuit is your one place for all your social events. View all
              public events and friend's events.
            </p>
          </div>
          <div>PhotoHere</div>
        </div>
      </div>
    </div>
  );
}
