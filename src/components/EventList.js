import React from "react";
import Event from "./Event";
import PropTypes from "prop-types";

function EventList(props) {
  return (
    <React.Fragment>
      <hr />
      {props.eventList.map((event) => (
        <Event
          whenEventClicked={props.onEventSelection}
          eventName={event.eventName}
          eventDateTime={event.eventDateTime}
          eventEmail={event.eventEmail}
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

/* <Event
  eventName="Halloween Party"
  eventTime="8:00pm"
  eventDate="10/31/23"
  eventLocation="3622 SW Iowa St PDX"
/>

<Event
  eventName="Birthday Party"
  eventTime="8:00pm"
  eventDate="9/21/23"
  eventLocation="3622 N Mlk Blvd St PDX"
/> */
