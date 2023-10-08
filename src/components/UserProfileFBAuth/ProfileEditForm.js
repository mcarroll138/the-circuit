import React, { useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase";

export default function ProfileEditForm({
  newDisplayName,
  setNewDisplayName,
  setEditProfile,
}) {
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

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.displayName);
        console.log(user.email);
      } else {
        console.log("error");
      }
    });
  }, []);

  const handleProfileEditFormSubmission = async (event) => {
    event.preventDefault();

    const auth = getAuth();
    try {
      await updateProfile(auth.currentUser, { displayName: newDisplayName });

      const newProfileData = {
        uid: auth.currentUser.uid,
        userProfile: auth.currentUser.email,
        displayName: newDisplayName,
        profilePhoto: auth.currentUser.photoURL,
        friends: [],
      };

      const docRef = await addDoc(collection(db, "profiles"), newProfileData);
      console.log("Document written with ID:", docRef.id);
    } catch (error) {
      console.log(error);
    }

    setEditProfile(false);
  };

  return (
    <>
      <form onSubmit={handleProfileEditFormSubmission} style={formStyles}>
        <h2>{auth.currentUser.displayName === null ? "Complete Registration" : "Update Display Name"}</h2>
        <input
          style={inputStyles}
          type="text"
          name="displayName"
          defaultValue={newDisplayName}
          onChange={(e) => setNewDisplayName(e.target.value)}
          placeholder="Display Name"
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
