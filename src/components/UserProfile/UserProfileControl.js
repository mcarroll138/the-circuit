import React, { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";

// import { Link, useNavigate } from "react-router-dom";
// import { auth } from "../../firebase.js";

export default function AuthProfile() {
  const headerContainerStyles = {
    alignItems: "center",
    backgroundColor: "pink",
    padding: "10px",
  };

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

  const auth = getAuth();

  function profileUpdate(event) {
    event.preventDefault();
    const displayName = event.target.displayName.value;

    updateProfile(auth.currentUser, { displayName })
      .then(() => {
        //Profile Updated
      })
      .catch((error) => {
        //An error
      });
  }
  return (
    <>
      <form onSubmit={profileUpdate} style={formStyles}>
        <h1>Update Profile</h1>
        <input
          style={inputStyles}
          type="text"
          name="displayName"
          placeholder="displayName"
        />

        <button type="submit" style={buttonStyles}>
          Update
        </button>
      </form>
    </>
  );
}
