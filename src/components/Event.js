import React from "react";
import PropTypes from "prop-types";

export default function Event(props) {
  return (
    <>
      <h3>Event:</h3>
      <h3>{props.eventName}</h3>
      <h3>{props.eventTime}</h3>
      <h3>{props.eventDate}</h3>
      <h3>{props.eventLocation}</h3>
    </>
  );
}

Event.propTypes = {
  eventName: PropTypes.string,
  eventTime: PropTypes.string,
  eventDate: PropTypes.string,
  eventLocation: PropTypes.string,
};
