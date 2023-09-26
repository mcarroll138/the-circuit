import React from "react";
import Event from "./Event";
import PropTypes from "prop-types";
import { auth } from "../../firebase.js";

function parseDateTime(dateTimeString) {
  const parsedDate = new Date(dateTimeString);
  return parsedDate;
  };


function EventList(props) {
  const filteredEvents = props.eventList.filter(
    (event) => auth.currentUser.email === event.eventCreator
  );

  const allEvents = props.eventList.filter(
    (event) => auth.currentUser.email !== event.eventCreator
  );
  return (
    <React.Fragment>
      <h1>My Events</h1>
      <hr />

      {filteredEvents.map((event) => (
        <Event
          whenEventClicked={props.onEventSelection}
          eventCreator={event.eventCreator}
          eventName={event.eventName}
          // eventDateTime={new Date(event.eventDateTime)}
          eventDate={parseDateTime(event.eventDateTime).toLocaleDateString()}
          // eventTime={`${parseDateTime(event.eventDateTime).hours}:${
          //   parseDateTime(event.eventDateTime).minutes
          // }`}
          eventDateTime={event.eventDateTime}
          // eventDetail={event.eventDetail}
          // eventLocation={event.eventLocation}
          // eventImage={event.eventImage}
          id={event.id}
          key={event.id}
        />
      ))}

      <hr />
      {/* <h1>All Events</h1> */}
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
