import React from "react";
import PropTypes from "prop-types";

export default function NewEventForm(props) {
  function handleNewEventFormSubmission(event) {
    event.preventDefault();
  }
  return (
    <>
      <form onSubmit={handleNewEventFormSubmission}>
        <input
          required
          autoCapitalize="words"
          type="text"
          name="eventName"
          placeholder="Event Name"
        />
        <input
          required
          type="datetime-local"
          name="eventDateTime"
          placeholder="Date/Time"
        />
        <input
          required
          type="email"
          pattern=".+@globex\.com"
          name="eventEmail"
          placeholder="Email Address"
        />
        <input
          required
          type="url"
          name="eventLocation"
          placeholder="Google Map Link"
        />
      </form>
    </>
  );
}
NewEventForm.propTypes = {
  onNewEventCreation: PropTypes.func,
};
//Left off at step 5
