import React from "react";
import PropTypes from "prop-types";
import { auth } from "../../firebase.js";

export default function NewProfileForm(props) {
  function handleNewProfileFormSubmission(event) {
    event.preventDefault();
    console.log("form submitted");
    const newUserProfile = event.target.userProfile.value;
    const newFirstName = event.target.firstName.value;
    const newLastName = event.target.lastName.value;

    console.log("User Profile:", newUserProfile);
    console.log("First Name:", newFirstName);
    console.log("Last Name:", newLastName);
    props.onNewProfileCreation({
      userProfile: event.target.userProfile.value,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      // birthdate: event.target.birthdate.value,
      // privateProfile: event.target.privateProfile.value,
    });
  }
  return (
    <>
      <form
        onSubmit={handleNewProfileFormSubmission}
        encType="multipart/form-data"
      >
        <input type="text" name="userProfile" value={auth.currentUser.email} />
        <input required type="text" name="firstName" placeholder="First Name" />
        <input required type="text" name="lastName" placeholder="Last Name" />
        {/* <label>
          Birthday
          <input required type="date" name="birthdate" label="Birth Date" />
        </label> */}
        {/* <label>
          Private Profile
          <input type="checkbox" name="privateProfile" value="true" />
        </label> */}
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
}
NewProfileForm.propTypes = {
  onNewProfileCreation: PropTypes.func,
};
