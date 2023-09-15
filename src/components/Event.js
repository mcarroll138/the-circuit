import React from "react";
import PropTypes from "prop-types";

export default function Event(props) {
  return (
    <>
      <div onClick={() => props.whenEventClicked(props.id)}></div>

      <h3>{props.eventName}</h3>
      <h3>{props.eventDateTime}</h3>
      <h3>{props.eventEmail}</h3>
      <h3>{props.eventLocation}</h3>
    </>
  );
}

Event.propTypes = {
  eventName: PropTypes.string,
  eventDateTime: PropTypes.string,
  eventEmail: PropTypes.string,
  eventLocation: PropTypes.string,
  id: PropTypes.string,
  whenEventClicked: PropTypes.func,
};
