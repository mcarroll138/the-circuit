import React from "react";
import PropTypes from "prop-types";

export default function Event(props) {
  return (
    <>
      <div onClick={() => props.whenEventClicked(props.id)}>
        <h3>{props.eventCreator}</h3>
        <h3>{props.eventName}</h3>
        <h3>{props.eventDateTime}</h3>
        <h3>{props.eventDetail}</h3>
        <h3>{props.eventLocation}</h3>
        <h3>{props.eventImage}</h3>
        <hr />
      </div>
    </>
  );
}

Event.propTypes = {
  eventName: PropTypes.string,
  eventDateTime: PropTypes.string,
  eventDetail: PropTypes.string,
  eventLocation: PropTypes.string,
  eventImage: PropTypes.object,
  id: PropTypes.string,
  whenEventClicked: PropTypes.func,
};


//This is the event in the list page