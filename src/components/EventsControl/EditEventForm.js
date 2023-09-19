import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function EditEventForm(props) {
  const { event } = props;

  const [eventName, setEventName] = useState("");
  const [eventDateTime, setEventDateTime] = useState("");
  const [eventEmail, setEventEmail] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  useEffect(() => {
    if (event) {
      setEventName(event.eventName || "");
      setEventDateTime(event.eventDateTime || "");
      setEventEmail(event.eventEmail || "");
      setEventLocation(event.eventLocation || "");
    }
  }, [event]);

  function handleEditEventFormSubmission(event) {
    event.preventDefault();

    props.onEditEvent({
      eventName: eventName,
      eventDateTime: eventDateTime,
      eventEmail: eventEmail,
      eventLocation: eventLocation,
      id: event.id,
    });
  }

  return (
    <>
      <form onSubmit={handleEditEventFormSubmission}>
        <input
          required
          style={{ textTransform: "capitalize" }}
          type="text"
          name="eventName"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Event Name"
        />
        <input
          type="datetime-local"
          name="eventDateTime"
          value={eventDateTime}
          onChange={(e) => setEventDateTime(e.target.value)}
          placeholder="Date/Time"
        />
        <input
          type="email"
          name="eventEmail"
          value={eventEmail}
          onChange={(e) => setEventEmail(e.target.value)}
          placeholder="Email Address"
        />
        <input
          type="url"
          name="eventLocation"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
          placeholder="Google Map Link"
        />
        <button type="submit">Update Event</button>
      </form>
    </>
  );
}

EditEventForm.propTypes = {
  event: PropTypes.object,
  onEditEvent: PropTypes.func,
};
