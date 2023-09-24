import React from "react";
import Event from "./Event";
import PropTypes from "prop-types";
import { auth } from "../../firebase.js";
import { Route, Link } from "react-router-dom";
import { useState } from "react";
import AddEventButton from "./AddEventButton";

function EventList(props) {
  const [radio, setRadio] = useState("");
  const filteredEvents = props.eventList.filter(
    (event) => auth.currentUser.email === event.eventCreator
  );

  const allEvents = props.eventList.filter(
    (event) => auth.currentUser.email !== event.eventCreator
  );
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "sticky",
          top: "50",
          // zIndex: "100",
          background: "black",
        }}
      >
        <AddEventButton to="new-event" />
       
      </div>

      <div
        style={{
          textAlign: "center",
          color: "#E3A9FF",
          fontSize: 24,
          fontFamily: "Courier",
          background: "black",
          fontWeight: "400",
          textDecoration: "underline",
          lineHeight: 2,
          wordWrap: "break-word",
        }}
      >
        <form
          style={{
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <input
            inline
            label="Response A"
            type="radio"
            id="radioA"
            value="radioA"
            checked={radio === "radioA"}
            onChange={(e) => {
              setRadio(e.target.value);
            }}
          />
          <label for="hosting">All</label>

          <input
            inline
            label="Response B"
            type="radio"
            id="radioB"
            value="radioB"
            checked={radio === "radioB"}
            onChange={(e) => {
              setRadio(e.target.value);
            }}
          />
          <label for="hosting">Hosted by Me</label>
          <input
            inline
            label="Response C"
            type="radio"
            id="radioC"
            value="radioC"
            checked={radio === "radioC"}
            onChange={(e) => {
              setRadio(e.target.value);
            }}
          />
          <label for="hosting">Close Friends</label>
          <input
            inline
            label="Response D"
            type="radio"
            id="radioD"
            value="radioD"
            checked={radio === "radioD"}
            onChange={(e) => {
              setRadio(e.target.value);
            }}
          />
          <label for="hosting">Attending</label>
        </form>
      </div>

      <h2>All Events</h2>
      {allEvents.map((event) => (
        <Event
          whenEventClicked={props.onEventSelection}
          eventCreator={event.eventCreator}
          eventName={event.eventName}
          eventDateTime={event.eventDateTime}
          eventDetail={event.eventDetail}
          eventLocation={event.eventLocation}
          eventImage={event.eventImage}
          id={event.id}
          key={event.id}
        />
      ))}
    </React.Fragment>
  );
}

EventList.propTypes = {
  eventList: PropTypes.array,
  onEventSelection: PropTypes.func,
};

export default EventList;

//Props are the eventName, eventTime, etc
