import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import ProfileEditForm from "./ProfileEditForm";

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
    borderRadius: "50%",
    height: "100px",
    width: "100px",
    borderRadius: "50%",
    // display: "inline",
    // margin: "0 auto",
    // height: "100%",
    // width: "auto",
  };

  const imageCropper = {
    // width: "100px",
    // height: "100px",
    // position: "relative",
    // overflow: "hidden",
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

  if (editProfile) {
    return (
      <ProfileEditForm
        auth={auth}
        newDisplayName={newDisplayName}
        setNewDisplayName={setNewDisplayName}
        editProfile={editProfile}
        setEditProfile={setEditProfile}
      />
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
        <div style={imageCropper}>
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
