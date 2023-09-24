import React from "react";
import Event from "./Event";
import PropTypes from "prop-types";
import { auth } from "../../firebase.js";
import { Route, Link } from "react-router-dom";
import { useState } from "react";
import AddEventButton from "./AddEventButton";

function EventList(props) {
  const [radio, setRadio] = useState("all");
  console.log(radio);
  const hostingEvents = props.eventList.filter(
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
            type="radio"
            id="sortByAll"
            value="all"
            checked={radio === "all"}
            onChange={(e) => {
              setRadio(e.target.value);
            }}
            defaultChecked={radio === "all"}
          />
          <label for="sortByAll">All</label>

          <input
            type="radio"
            id="sortByHosting"
            value="hosting"
            checked={radio === "hosting"}
            onChange={(e) => {
              setRadio(e.target.value);
            }}
          />
          <label for="sortByHosting">Hosted by Me</label>
          <input
            type="radio"
            id="sortByCloseFriends"
            value="closeFriends"
            checked={radio === "closeFriends"}
            onChange={(e) => {
              setRadio(e.target.value);
            }}
          />
          <label for="sortByCloseFriends">Close Friends</label>
          <input
            type="radio"
            id="sortByAttending"
            value="attending"
            checked={radio === "attending"}
            onChange={(e) => {
              setRadio(e.target.value);
            }}
          />
          <label for="sortByAttending">Attending</label>
        </form>
      </div>
      {radio === "all" && (
        <>
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
        </>
      )}
      {radio === "hosting" && (
        <>
          <h2>Hosting</h2>
          {hostingEvents.map((event) => (
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
        </>
      )}
    </React.Fragment>
  );
}

EventList.propTypes = {
  eventList: PropTypes.array,
  onEventSelection: PropTypes.func,
};

export default EventList;

//Props are the eventName, eventTime, etc
