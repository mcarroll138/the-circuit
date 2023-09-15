import React from "react";
import Event from "./Event";
import Place from "./Place";
import PropTypes from "prop-types";

export default function EventList(props) {
  return (
    <>
      <hr />
      {props.eventList.map((event, index) => (
        <Event
          eventName={event.eventName}
          eventDateTime={event.eventDateTime}
          eventEmail={event.eventEmail}
          eventLocation={event.eventLocation}
          key={index}
        />
      ))}

      <p>thank you for coming to </p>
    </>
  );
}

EventList.propTypes = {
  eventList: PropTypes.array,
};

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
