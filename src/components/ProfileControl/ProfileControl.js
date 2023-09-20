import React, { useEffect, useState } from "react";
import NewProfileForm from "./NewProfileForm";
import ProfileList from "./ProfileList";
import ProfileDetail from "./ProfileDetail";
import { db, auth } from "../../firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function ProfileControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(true);
  const [mainProfileList, setMainProfileList] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "profiles"),
      (collectionSnapshot) => {
        const profiles = [];
        collectionSnapshot.forEach((doc) => {
          profiles.push({
            userProfile: doc.data().userProfile,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            birthdate: doc.data().birthdate,
            privateProfile: doc.data().privateProfile,
            id: doc.id,
          });
        });
        setMainProfileList(profiles);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unSubscribe;
  }, []);

  const handleClick = () => {
    if (selectedProfile != null) {
      setFormVisibleOnPage(false);
      setSelectedProfile(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  };

  const handleAddingNewProfileToList = async (newProfileData) => {
    await addDoc(collection(db, "profiles"), newProfileData);
    setFormVisibleOnPage(false);
  };

  const hangleChangingSelectedProfile = (id) => {
    const selection = mainProfileList.filter((profile) => profile.id === id)[0];
    setSelectedProfile(selection);
  };

  const handleDeletingProfile = async (id) => {
    await deleteDoc(doc(db, "profiles", id));
    setSelectedProfile(null);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleEditingProfileInList = async (profileToEdit) => {
    const profileRef = doc(db, "profiles", profileToEdit.id);
    await updateDoc(profileRef, profileToEdit);
    setEditing(false);
    setSelectedProfile(null);
  };
  if (auth.currentUser == null) {
    return (
      <>
        <h1>You must be logged in to view user's profiles</h1>
      </>
    );
  } else if (auth.currentUser != null) {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (error) {
      currentlyVisibleState = <p>There was an error: {error}</p>;
    } else if (editing && selectedProfile !== null) {
      currentlyVisibleState = (
        <ProfileDetail
          profile={selectedProfile}
          onClickingDelete={handleDeletingProfile}
          onClickingEdit={handleEditClick}
        />
      );
      buttonText = "Return to Profile List";
    } else if (formVisibleOnPage) {
      currentlyVisibleState = (
        <NewProfileForm onNewProfileCreation={handleAddingNewProfileToList} />
      );
      buttonText = "Return to Profile List";
    } else {
      currentlyVisibleState = (
        <ProfileList
          onProfileSelection={handleChangingSelectedProfile}
          profileList={mainProfileList}
        />
      );
      buttonText = "Add a Profile";
    }
    return (
      <>
        {currentlyVisibleState}
        {error ? null : <button onClick={handleClick}>{buttonText}</button>}
      </>
    );
  }
}
// add my profile
// view all others profiles
//maybe a public/ private setting?
