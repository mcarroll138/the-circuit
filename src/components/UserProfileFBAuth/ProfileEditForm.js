import React, { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
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

  const [currentDisplayName, setCurrentDisplayName] = useState("");
  const [profiles, setProfiles] = useState([]);

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
    const unSubscribe = onSnapshot(
      collection(db, "profiles"),
      (collectionSnapshot) => {
        const profileList = [];
        collectionSnapshot.forEach((doc) => {
          profileList.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setProfiles(profileList);
      }
    );
    return () => {
      unSubscribe();
    };
  }, []);

  const handleProfileEditFormSubmission = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    setCurrentDisplayName(auth.currentUser.displayName);

    const userProfileEmail = auth.currentUser.email;
    const profileWithEmail = profiles.find(
      (profile) => profile.userProfile === userProfileEmail
    );

    if (currentDisplayName !== profileWithEmail?.displayName) {
      try {
        await updateProfile(auth.currentUser, { displayName: newDisplayName });

        if (!profileWithEmail) {
          // Profile doesn't exist, create a new one
          const newProfileData = {
            uid: auth.currentUser.uid,
            userProfile: userProfileEmail,
            displayName: newDisplayName,
            profilePhoto: auth.currentUser.photoURL,
            friends: [],
          };

          const profileDocRef = doc(db, "profiles", auth.currentUser.uid);
          await setDoc(profileDocRef, newProfileData);

          // Create the "friendRequest" collection with an initial document
          const friendRequestCollectionRef = collection(
            profileDocRef,
            "friendRequest"
          );
          await addDoc(friendRequestCollectionRef, {
            initialData: "initialize",
          });
          console.log("Profile and Friend Request collection created.");
        } else {
          // Profile exists and is updated
          const profileDocRef = query(
            collection(db, "profiles"),
            where("userProfile", "==", userProfileEmail)
          );
          const profileDocs = await getDocs(profileDocRef);
          if (!profileDocs.empty) {
            profileDocs.forEach(async (profileDoc) => {
              await updateDoc(profileDoc.ref, { displayName: newDisplayName });
              console.log("Profile updated in Firestore.");
            });
          }
        }

        setEditProfile(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Display name not updated.");
      setEditProfile(false);
    }
  };

  return (
    <>
      <form onSubmit={handleProfileEditFormSubmission} style={formStyles}>
        <h2>
          {auth.currentUser.displayName === null
            ? "Complete Registration"
            : "Update Display Name"}
        </h2>
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
