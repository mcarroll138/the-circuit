import { updateProfile } from "firebase/auth";
import React from "react";

export default function ProfileEditForm({
  auth,
  newDisplayName,
  setNewDisplayName,
  setEditProfile,
}) {
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
  function handleProfileEditFormSubmission(event) {
    event.preventDefault();
    updateProfile(auth.currentUser, { displayName: newDisplayName })
      .then(() => {
        setEditProfile(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <form onSubmit={handleProfileEditFormSubmission} style={formStyles}>
        <h2>Update Name</h2>
        <input
          style={inputStyles}
          type="text"
          name="displayName"
          defaultValue={auth.currentUser.displayName}
          onChange={(e) => setNewDisplayName(e.target.value)}
        />

        <button type="submit" style={buttonStyles}>
          Update
        </button>
        <button style={buttonStyles} onClick={() => setEditProfile(false)}>
          Cancel
        </button>
      </form>
    </>
  );
}
