import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
// import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  onSnapshot,
  // doc,
  // updateDoc,
  // deleteDoc,
} from "firebase/firestore";
// import Profile from "./Profile";
import ProfilePhoto from "./ProfilePhoto";

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "profiles"),
      (collectionSnapshot) => {
        const profileList = [];
        collectionSnapshot.forEach((doc) => {
          profileList.push({
            // userProfile: doc.data().userProfile,
            // firstName: doc.data().firstName,
            // lastName: doc.data().lastName,
            // birthdate: doc.data().birthdate,
            // privateProfile: doc.data().privateProfile,
            id: doc.id,
            ...doc.data(),
          });
        });
        setProfiles(profileList);
        setLoading(false);
      }
    );
    return () => unSubscribe;
  }, []);
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newProfileData = {
      uid: auth.currentUser.uid,
      userProfile: auth.currentUser.email,
      displayName: auth.currentUser.displayName,
      profilePhoto: auth.currentUser.photoURL,
    };
    try {
      const docRef = await addDoc(collection(db, "profiles"), newProfileData);
      console.log("Document written with ID:", docRef.id);

      // Clear the form fields after submission
      setUserProfile("");
      setFirstName("");
      setLastName("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

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
  };
  const filteredProfiles = profiles.filter(
    (profile) => auth.currentUser.uid === profile.uid
  );

  const allProfiles = profiles.filter(
    (profile) => auth.currentUser.uid !== profile.uid
  );

  const filteredProfilePhoto = imageUrls.filter((imageUrl) =>
    imageUrl.includes(auth.currentUser.email)
  );

  if (filteredProfiles.length === 0) {
    return (
      <div>
        <ProfilePhoto />
        <h1>Update Profile</h1>
        <form style={formStyles} onSubmit={handleFormSubmit}>
          <input type="text" name="uid" value={auth.currentUser.uid} />
          <input
            type="text"
            name="userEmail"
            value={auth.currentUser.email}
            // onChange={(e) => setUserProfile(e.target.value)}
          />
          <input
            type="text"
            name="userPhoto"
            value={auth.currentUser.photoURL}
          />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <button type="submit">Update Profile</button>
        </form>
      </div>
    );
  } else {
    return (
      // navigate("/sign-in")
      <div style={ContainerStyles}>
        <h3>Your Profile</h3>

        {filteredProfiles.map((profile) => (
          <ul key={profile.id}>
            <p>
              {profile.displayName}{" "}
              <img style={imgStyle} src={profile.profilePhoto}></img>
            </p>
          </ul>
        ))}
        <h3>Circuit List</h3>
        {allProfiles.map((profile) => (
          <ul key={profile.id}>
            <hr />
            <p>
              {profile.displayName}{" "}
              <img style={imgStyle} src={profile.profilePhoto}></img>
            </p>
          </ul>
        ))}
      </div>
    );
  }
}

// return (
//   <>
//     {filteredProfiles.map((profile) => (
//       <Profile
//         firstName={profile.firstName}
//         lastName={profile.lastName}
//       />
//     ))}
//   </>
{
  /* <h2>Profiles</h2>
{loading ? (
<p>Loading profiles...</p>
) : (
)}  */
}
// import React, { useEffect, useState } from "react";
// import NewProfileForm from "./NewProfileForm";
// import ProfileList from "./ProfileList";
// import ProfileDetail from "./ProfileDetail";
// import { db, auth } from "../../firebase.js";
// import {
//   collection,
//   addDoc,
//   onSnapshot,
//   doc,
//   updateDoc,
//   deleteDoc,
// } from "firebase/firestore";

// function ProfileControl() {
//   const [formVisibleOnPage, setFormVisibleOnPage] = useState(true);
//   const [mainProfileList, setMainProfileList] = useState([]);
//   const [selectedProfile, setSelectedProfile] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [error, setError] = useState(null);

//   const handleClick = () => {
//     if (selectedProfile != null) {
//       setFormVisibleOnPage(false);
//       setSelectedProfile(null);
//       setEditing(false);
//     } else {
//       setFormVisibleOnPage(!formVisibleOnPage);
//     }
//   };

//   const handleAddingNewProfileToList = async (newProfileData) => {
//     await addDoc(collection(db, "profiles"), newProfileData);
//     setFormVisibleOnPage(false);
//   };

//   const hangleChangingSelectedProfile = (id) => {
//     const selection = mainProfileList.filter((profile) => profile.id === id)[0];
//     setSelectedProfile(selection);
//   };

//   const handleDeletingProfile = async (id) => {
//     await deleteDoc(doc(db, "profiles", id));
//     setSelectedProfile(null);
//   };

//   const handleEditClick = () => {
//     setEditing(true);
//   };

//   const handleEditingProfileInList = async (profileToEdit) => {
//     const profileRef = doc(db, "profiles", profileToEdit.id);
//     await updateDoc(profileRef, profileToEdit);
//     setEditing(false);
//     setSelectedProfile(null);
//   };
//   if (auth.currentUser == null) {
//     return (
//       <>
//         <h1>You must be logged in to view user's profiles</h1>
//       </>
//     );
//   } else if (auth.currentUser != null) {
//     let currentlyVisibleState = null;
//     let buttonText = null;
//     if (error) {
//       currentlyVisibleState = <p>There was an error: {error}</p>;
//     } else if (editing && selectedProfile !== null) {
//       currentlyVisibleState = (
//         <ProfileDetail
//           profile={selectedProfile}
//           onClickingDelete={handleDeletingProfile}
//           onClickingEdit={handleEditClick}
//         />
//       );
//       buttonText = "Return to Profile List";
//     } else if (formVisibleOnPage) {
//       currentlyVisibleState = (
//         <NewProfileForm onProfileCreation={handleAddingNewProfileToList} />
//       );
//       buttonText = "Return to Profile List";
//     } else {
//       currentlyVisibleState = (
//         <ProfileList
//           onProfileSelection={handleChangingSelectedProfile}
//           profileList={mainProfileList}
//         />
//       );
//       buttonText = "Add a Profile";
//     }
//     return (
//       <>
//         {currentlyVisibleState}
//         {error ? null : <button onClick={handleClick}>{buttonText}</button>}
//       </>
//     );
//   }
// }

// export default ProfileControl;
// add my profile
// view all others profiles
//maybe a public/ private setting?
