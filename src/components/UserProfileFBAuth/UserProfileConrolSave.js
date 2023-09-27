import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
// import { Link, useNavigate } from "react-router-dom";

// import { auth } from "../../firebase.js";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

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
  const imgStyle = {
    objectFit: "cover",
    boarderRadius: "50%",
    height: "100px",
    width: "100px",
    borderRadius: "50%",
    // display: "inline",
    // margin: "0 auto",
    // height: "100%",
    // width: "auto",
  };

  const auth = getAuth();
  const storage = getStorage();
  const [editProfile, setEditProfile] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(
    auth.currentUser.displayName
  );
  const [editProfileImage, setEditProfileImage] = useState(
    auth.currentUser.photoURL
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function profileImageUpdate(event) {
    event.preventDefault();
    if (!selectedImage) {
      return;
    }

    const fileRef = ref(storage, "profile/" + auth.currentUser.uid + "png");
    console.log(fileRef);
    setLoading(true);
    await uploadBytes(fileRef, selectedImage);
    const photoURL = await getDownloadURL(fileRef);
    await updateProfile(auth.currentUser, { photoURL });
    setLoading(false);
    alert("File Uploaded");

    setEditProfileImage(false);
  }
  function handleImageChange(event) {
    setSelectedImage(event.target.files[0]);
  }

  //   async function profileImageUpdate(file, currentUser, setLoading) {

  function profileNameUpdate(event) {
    event.preventDefault();
    updateProfile(auth.currentUser, { displayName: newDisplayName })
      .then(() => {
        setEditProfile(false);
        //Profile Updated
      })
      .catch((error) => {
        //An error
      });
  }

  if (editProfile) {
    return (
      <form onSubmit={profileNameUpdate} style={formStyles}>
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
    );
  }
  if (editProfileImage === true) {
    return (
      <form onSubmit={profileImageUpdate} style={formStyles}>
        <h2>Update Image</h2>

        <input type="file" onChange={handleImageChange} />

        <button type="submit" style={buttonStyles}>
          Update
        </button>
        <button style={buttonStyles} onClick={() => setEditProfileImage(false)}>
          Cancel
        </button>
      </form>
    );
  } else {
    return (
      <div style={ContainerStyles}>
        <h1>Profile Information</h1>
        <h3>User Name: {auth.currentUser.displayName}</h3>
        <h3>Email: {auth.currentUser.email}</h3>
        <div>
          <h3>
            <img
              style={imgStyle}
              src={auth.currentUser.photoURL}
              alt="Profile"
            ></img>{" "}
          </h3>
        </div>
        <p>
          <button style={buttonStyles} onClick={() => setEditProfile(true)}>
            Update Display Name
          </button>

          <button
            style={buttonStyles}
            onClick={() => setEditProfileImage(true)}
          >
            Update Profile Photo
          </button>
        </p>
      </div>
    );
  }
}