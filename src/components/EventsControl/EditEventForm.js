import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function EditEventForm(props) {
  const { event } = props;

  const [eventName, setEventName] = useState("");
  const [eventDateTime, setEventDateTime] = useState("");
  const [eventDetail, setEventDetail] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  useEffect(() => {
    if (event) {
      setEventName(event.eventName || "");
      setEventDateTime(event.eventDateTime || "");
      setEventDetail(event.eventDetail || "");
      setEventLocation(event.eventLocation || "");
    }
  }, [event]);

  function handleEditEventFormSubmission(event) {
    console.log("Event Id", event.id);
    event.preventDefault();
    props.onEditEvent({
      eventName: event.target.eventName,
      eventDateTime: event.target.eventDateTime,
      eventDetail: event.target.eventDetail,
      eventLocation: event.target.eventLocation,
      // id: event.id,
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
          name="eventDetail"
          value={eventDetail}
          onChange={(e) => setEventDetail(e.target.value)}
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
