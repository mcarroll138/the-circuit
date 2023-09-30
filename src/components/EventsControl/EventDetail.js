import React from "react";
import PropTypes from "prop-types";

export default function EventDetail(props) {
  const { event, onClickingDelete } = props;
  return (
    <>
    <h1>{event.eventName}</h1>
      
      <h3>Hosted By {event.eventCreator}</h3>
      {/* <h3><img src={event.eventCreatorPhoto}></img></h3> */}
      <h3>{event.eventDateTime}</h3>
      <h3>{event.eventDetail}</h3>
      <h3>{event.eventLocation}</h3>
      <h3>   {event.eventImage}</h3>
      <button onClick={props.onClickingEdit}>Edit Event</button>
      <button onClick={() => onClickingDelete(event.id)}>Delete Event</button>
      <hr />
    </>
  );
}

EventDetail.propTypes = {
  event: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
};
