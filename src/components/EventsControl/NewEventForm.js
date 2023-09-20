import React from "react";
import PropTypes from "prop-types";
import { auth } from "../../firebase.js";

export default function NewEventForm(props) {
  function handleNewEventFormSubmission(event) {
    event.preventDefault();

    props.onNewEventCreation({
      eventCreator: event.target.eventCreator.value,
      eventName: event.target.eventName.value,
      eventDateTime: event.target.eventDateTime.value,
      eventEmail: event.target.eventEmail.value,
      eventLocation: event.target.eventLocation.value,
      // eventImage: event.target.eventImage.files[0],
    });
  }
  return (
    <>
      <form
        onSubmit={handleNewEventFormSubmission}
        encType="multipart/form-data"
      >
        <input
          type="hidden"
          name="eventCreator"
          value={auth.currentUser.email}
        />
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
        {/* <input type="file" name="eventImage" placeholder="upload image" /> */}
        <button type="submit">Party Time</button>
      </form>
    </>
  );
}
NewEventForm.propTypes = {
  onNewEventCreation: PropTypes.func,
};
//Left off at step 5
