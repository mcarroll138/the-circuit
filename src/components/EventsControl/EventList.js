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
