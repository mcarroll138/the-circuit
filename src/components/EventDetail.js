import React from "react";
import PropTypes from "prop-types";

export default function EventDetail(props) {
  const { event } = props;
  return (
    <>
      <h1>Event Details</h1>
      <h3>{event.eventName}</h3>
      <h3>{event.eventDateTime}</h3>
      <h3>{event.eventEmail}</h3>
      <h3>{event.eventLocation}</h3>
    </>
  );
}

EventDetail.propTypes = {
  event: PropTypes.object,
};
