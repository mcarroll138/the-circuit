import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";

import { collection, addDoc, onSnapshot } from "firebase/firestore";

// import ProfilePhoto from "./ProfilePhoto";

export default function UserProfile() {
  const [radio, setRadio] = useState("mightKnow");
  const [userProfile, setUserProfile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  console.log(radio);

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
        {/* <ProfilePhoto /> */}
        <h1>Finish Registration before contiunine</h1>
        <form onSubmit={handleFormSubmit}>
          <input type="text" name="userEmail" value={auth.currentUser.email} />
          <input type="text" name="uid" value={auth.currentUser.uid} />
          <input
            type="text"
            name="userPhoto"
            value={auth.currentUser.photoURL}
          />
          <input type="text" name="displayName" placeholder="Display Name" />
          <button type="submit">Complete Registration</button>
        </form>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <div>
          <form
            style={{
              paddingLeft: 16,
              paddingRight: 16,
              background: "black",
              color: "white",
            }}
          >
            <input
              type="radio"
              id="sortByAllFriends"
              value="allFriends"
              checked={radio === "allFriends"}
              onChange={(e) => {
                setRadio(e.target.value);
              }}
            />
            <label for="sortByAll">All Friends</label>

            <input
              type="radio"
              id="sortByCloseFriends"
              value="closeFriends"
              checked={radio === "closeFriends"}
              onChange={(e) => {
                setRadio(e.target.value);
              }}
            />
            <label for="sortByCloseFriends">Close Friends</label>
            <input
              type="radio"
              id="sortByMightKnow"
              value="mightKnow"
              checked={radio === "mightKnow"}
              onChange={(e) => {
                setRadio(e.target.value);
              }}
              defaultChecked={radio === "mightKnow"}
            />
            <label for="sortByMightKnow">Might Know</label>
          </form>

          {radio === "allFriends" && (
            <>
              <div style={{
                background: "black",
                color: "white",
              }}>
              </div>
                <p>People you may know</p>
              <div
                id="container"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  background: "black",
                  // alignItems: "center",
                  // // height: "100vh",
                  // width: 200,
                  // display: "flex",
                  // flexDirection: "column",
                  // color: "white",
                  // borderRadius: "25px",
                }}
              >
                {allProfiles.map((profile) => (
                  <div
                    key={profile.id}
                    style={{
                      flex: "1 0 auto",
                      // background: "black",
                    }}
                  >
                    <div
                      style={{
                        // display: "flex",
                        // flexDirection: "row",
                        // justifyContent: "center",
                        alignItems: "center",
                        background: "black",
                        width: 200,
                        padding: 20,
                        display: "flex",
                        flexDirection: "column",
                        color: "white",
                        borderRadius: "25px",
                        border: "6px solid #ccc",
                      }}
                    >
                      <div>
                        <img style={imgStyle} src={profile.profilePhoto}></img>
                      </div>
                      <div>{profile.displayName}</div>
                      <div>
                        <button>Add Friend</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {radio === "closeFriends" && (
            <>
              <h3>People you may know</h3>
              {filteredProfiles.map((profile) => (
                <ul key={profile.id}>
                  <hr />
                  <p>
                    <img style={imgStyle} src={profile.profilePhoto}></img>
                    {profile.displayName} <button>Add Friend</button>
                  </p>
                </ul>
              ))}
            </>
          )}
          {radio === "mightKnow" && (
            <>
              <h3>People you may know</h3>
              {allProfiles.map((profile) => (
                <ul key={profile.id}>
                  <hr />
                  <p>
                    <img style={imgStyle} src={profile.profilePhoto}></img>
                    {profile.displayName} <button>Add Friend</button>
                  </p>
                </ul>
              ))}
            </>
          )}
        </div>
      </React.Fragment>
    );
  }
}
