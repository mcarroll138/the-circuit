import React from "react";
import PropTypes from "prop-types";
import { auth } from "../../firebase.js";

export default function NewEventForm(props) {
  const formStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const inputStyles = {
    margin: "4px",
    padding: "4px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "12px",
  };

  const buttonStyles = {
    margin: "4px",
    padding: "4px 36px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };
  function handleNewEventFormSubmission(event) {
    event.preventDefault();

    props.onNewEventCreation({
      eventCreator: event.target.eventCreator.value,
      eventCreatorPhoto: event.target.eventCreatorPhoto.value,
      eventName: event.target.eventName.value,
      eventDateTime: event.target.eventDateTime.value,
      eventDetail: event.target.eventDetail.value,
      eventLocation: event.target.eventLocation.value,
    });
  }
  return (
    <>
      <form
        style={formStyles}
        onSubmit={handleNewEventFormSubmission}
        encType="multipart/form-data"
      >
        <input
          style={inputStyles}
          type="hidden"
          name="eventCreator"
          value={auth.currentUser.email}
        />
        <input
          style={inputStyles}
          type="hidden"
          name="eventCreatorPhoto"
          value={auth.currentUser.photoURL}
        />
        <input
          style={inputStyles}
          required
          // style={{ textTransform: "capitalize" }}
          type="text"
          name="eventName"
          placeholder="Event Name"
        />
        <input
          style={inputStyles}
          // required
          type="datetime-local"
          name="eventDateTime"
          placeholder="Date/Time"
        />

        <input
          style={inputStyles}
          // required
          type="text"
          name="eventDetail"
          placeholder="Event Details"
        />
        <input
          style={inputStyles}
          // required
          type="text"
          name="eventLocation"
          placeholder="Google Map Link"
        />
        {/* <input type="file" name="eventImage" placeholder="upload image" /> */}
        <button style={buttonStyles} type="submit">
          Party Time
        </button>
      </form>
    </>
  );
}
NewEventForm.propTypes = {
  onNewEventCreation: PropTypes.func,
};
//Left off at step 5
