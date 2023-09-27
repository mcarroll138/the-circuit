import React from "react";
import PropTypes from "prop-types";
import { auth } from "../../firebase.js";
import { serverTimestamp } from "firebase/firestore";
import { differenceInDays } from "date-fns";

export default function NewEventForm(props) {
  const formDivStyles = {
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    color: "white",
    fontSize: 20,
    fontFamily: "courier",
    fontWeight: "400",

    backgroundColor: "black",
    padding: "10px",
    height: 720,
  
  };

  const formStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 25,
  };

  const inputStyles = {
    margin: "4px",
    padding: "4px",
    border: "12px solid #ccc",
    borderRadius: "4px",
    fontSize: "12px",
    width: 380,
  };

  const buttonStyles = {
    width: 180,
    height: 20,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 20,
    paddingBottom: 20,
    background: "black",
    boxShadow: "6px 6px 6px #E3A9FF",
    border: "2px #E3A9FF solid",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    color: "white",
  };
  function handleNewEventFormSubmission(event) {
    event.preventDefault();
    // const currentDate = new Date();
    // const eventDateTime = new Date(event.targe.eventDateTime.value);
    // const daysAgo = differenceInDays(currentDate, eventDateTime);
    props.onNewEventCreation({
      eventCreator: event.target.eventCreator.value,
      eventCreatorPhoto: event.target.eventCreatorPhoto.value,
      eventName: event.target.eventName.value,
      eventDateTime: event.target.eventDateTime.value,
      eventDetail: event.target.eventDetail.value,
      eventLocation: event.target.eventLocation.value,
      // daysAgo: daysAgo,
      timeOpen: serverTimestamp(),
    });
  }
  return (
    <>
      <div style={formDivStyles}>
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
      </div>
    </>
  );
}
NewEventForm.propTypes = {
  onNewEventCreation: PropTypes.func,
};
//Left off at step 5
