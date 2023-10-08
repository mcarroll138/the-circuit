import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EventImage from "../../assets/EventImage.jpg";
import EventListImage from "../../assets/EventList.jpg";
import FriendListImage from "../../assets/FriendList.jpg";

export default function MissionStatement() {
  const mainDivContainerStyle = {
    background: "black",
    color: "white",
    padding: 20,
    // border: "2px solid white",
    //     borderRadius: "4px",
  };

  const secondaryDivContainerStyle = {
    display: "flex",
    fontSize: 36,
    // padding: 20,
    // width: 400,
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "black",
    justifyContent: "space-between",
    marginBottom: 50,
  };

  const headingStyle = {
    fontSize: "48px",
    fontFamily: "courier",
    fontWeight: "400",
    alignItems: "center",
    // justifyContent: "center",
    marginBottom: 70,
  };

  const bodyTextStyle = {
    fontSize: "24px",
    fontFamily: "arial",
    marginBottom: 40,
    marginTop: 20,
  };
  return (
    <div style={mainDivContainerStyle} id="container">
      <div style={headingStyle}>
        Event Listings For Your Community
        <div style={bodyTextStyle}>
          Ready to join our community?{" "}
          <Link style={{ color: "#4287f5" }} to="/sign-in">
          Sign up
          </Link>{" "}
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
          <div>
            {" "}
            <img
              alt="Single Event"
              style={{
                width: 300,
                height: 300,
              }}
              src={EventImage}
            />
          </div>
        </div>
        <div style={secondaryDivContainerStyle}>
          <div>
            {" "}
            <img
              alt="Friend List"
              style={{
                width: 250,
                height: 250,
                marginRight: 20,
                flex: "flex",
                flexDirection: "column",
              }}
              src={FriendListImage}
            />
          </div>
          <div>
            <p>Create Events</p>
            <p style={{ fontSize: 16 }}>
              Create an event to share with the community or an intimate
              gathering with your friends.
            </p>
          </div>
        </div>
        <div style={secondaryDivContainerStyle}>
          <div>
            <p>One Place For Events</p>
            <p style={{ fontSize: 16 }}>
              The Circuit is your one place for all your social events. View all
              public events and friend's events.
            </p>
          </div>
          <div>
            {" "}
            <img
              alt="Event List"
              style={{
                width: 300,
                height: 500,
                flex: "flex",
                flexDirection: "column",
              }}
              src={EventListImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
