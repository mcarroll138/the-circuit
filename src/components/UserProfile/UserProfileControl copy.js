import React, { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

// import { auth } from "../../firebase.js";

export default function AuthProfile() {
  const ContainerStyles = {
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
  const [editProfile, setEditProfile] = useState(false);
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
    <div style={ContainerStyles}>
      {editProfile ? (
        <form onSubmit={profileUpdate} style={formStyles}>
          <h2>Update Profile</h2>
          <input
            style={inputStyles}
            type="text"
            name="displayName"
            placeholder="Display Name"
          />

          <button
            type="submit"
            style={buttonStyles}
            onClick={() => setEditProfile(false)}
          >
            Update
          </button>
        </form>
      ) : (
        <div>
          <h1>Profile Information</h1>
          <h3>{auth.currentUser.displayName}</h3>
          <h3>{auth.currentUser.email}</h3>
          <h3>{auth.currentUser.photoURL} </h3>
          <p>
            <button style={buttonStyles} onClick={() => setEditProfile(true)}>
              Update Profile
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

