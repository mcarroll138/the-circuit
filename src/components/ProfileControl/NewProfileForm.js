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
          name="firstName"
          placeholder="First Name"
        />
          <input
          required
          type="text"
          name="lastName"
          placeholder="Last Name"
        />
          <input
          required
          type="date"
          name="birthdate"
          placeholder="Birth Date"
        />
      <label>
          Private Profile
          <input required type="checkbox" name="privateProfile" />
        </label>
      </form>
    </>
  );
}

NewProfile.propTypes = {
  onNewProfileCreation: PropTypes.func,
};
