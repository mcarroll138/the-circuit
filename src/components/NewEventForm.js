import React from "react";
import PropTypes from "prop-types";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

export default function NewEventForm(props) {
  function handleNewEventFormSubmission(event) {
    event.preventDefault();

    props.onNewEventCreation({
      eventName: event.target.eventName.value,
      eventDateTime: event.target.eventDateTime.value,
      eventEmail: event.target.eventEmail.value,
      eventLocation: event.target.eventLocation.value,
    });
  }
  return (
    <>
      <form onSubmit={handleNewEventFormSubmission}>
        <input
          required
          style={{ textTransform: "capitalize" }}
          type="text"
          name="eventName"
          placeholder="Event Name"
        />
        <input
          // required
          type="datetime-local"
          name="eventDateTime"
          placeholder="Date/Time"
        />
        <input
          // required
          type="email"
          // pattern=".+@globe.com"
          name="eventEmail"
          placeholder="Email Address"
        />
        <input
          // required
          type="url"
          name="eventLocation"
          placeholder="Google Map Link"
        />
        <button type="submit">Party Time</button>
      </form>
    </>
  );
}
NewEventForm.propTypes = {
  onNewEventCreation: PropTypes.func,
};
//Left off at step 5
