import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function NewProfile(props) {
  function handleNewProfileSubmission(event) {
    event.preventDefault();

    props.onNewProfileCreation({
      displayName: event.target.displayName.value,
      email: event.target.email.value,
      phoneNumber: event.target.phoneNumber.value,
      photoURL: event.target.photoURL.value,
    });
  }
  return (
    <>
      <h1>Update Profile</h1>
      <form onSubmit={handleNewProfileSubmission}>
        <input
          required
          type="text"
          name="displayName"
          placeholder="Diplay Name"
        />
        <input required type="email" name="email" placeholder="Email Address" />
        <input
          required
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
        />
        <input type="url" name="photoURL" placeholder="Photo URL" />
      </form>
    </>
  );
}

NewProfile.propTypes = {
  onNewProfileCreation: PropTypes.func,
};
