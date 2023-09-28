import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";

import {
  collection,
  addDoc,
  getDoc,
  onSnapshot,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";

// import ProfilePhoto from "./ProfilePhoto";

export default function UserProfile() {
  const [radio, setRadio] = useState("mightKnow");
  const [userProfile, setUserProfile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [friendListUid, setFriendListUid] = useState([]);

  useEffect(() => {
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
        setLoading(false);
      }
    );
    const friendListUnSubscribe = onSnapshot(
      collection(db, "profiles", auth.currentUser.uid, "friends"),
      (collectionSnapshot) => {
        const friendList = [];
        collectionSnapshot.forEach((doc) => {
          friendList.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setFriendListUid(friendList);
        setLoading(false);
      }
    );
    return () => {
      unSubscribe();
      friendListUnSubscribe();
    };
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newProfileData = {
      uid: auth.currentUser.uid,
      userProfile: auth.currentUser.email,
      displayName: auth.currentUser.displayName,
      profilePhoto: auth.currentUser.photoURL,
      friends: [],
    };
    try {
      const docRef = await addDoc(collection(db, "profiles"), newProfileData);
      console.log("Document written with ID:", docRef.id);

      // Clear the form fields after submission
      setUserProfile("");
      setFirstName("");
      setLastName("");
    } catch (error) {}
  };

  const userDocRef = doc(db, "profiles", auth.currentUser.uid);

  const friendsCollectionRef = collection(userDocRef, "friends");

  const handleAddingNewFriend = async (friendUid) => {
    await addDoc(friendsCollectionRef, {
      friendUid,
    });
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
    border: "12px solid #ccc",
    borderRadius: "4px",
    fontSize: "12px",
    width: 380,
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
  const peopleYouMayKnowProfiles = profiles.filter((profile) => {
    const isNotFriend = !friendListUid.some((friend) => {
      const isMatch = friend.friendUid === profile.uid;
      return isMatch;
    });
    return isNotFriend;
  });

  const peopleYouKnowProfiles = profiles.filter((profile) => {
    const isFriend = friendListUid.some((friend) => {
      const isNotMatch = friend.friendUid === profile.uid;
      return isNotMatch;
    });
    return isFriend;
  });

  if (filteredProfiles.length === 0) {
    return (
      <div
        style={{
          background: "black",
          height: "100vh",
        }}
      >
        <div
          style={{
            borderRadius: "25px",
            border: "2px solid #ccc",
            background: "black",
            color: "white",
            padding: 32,
            textAlign: "center",
            color: "white",
            fontSize: 16,
            fontFamily: "arial",
            background: "black",
            fontWeight: "400",
            lineHeight: 2,
          }}
        >
          {/* <ProfilePhoto /> */}
          <h1>Please Enter a Display Name</h1>
          <form style={formStyles} onSubmit={handleFormSubmit}>
            <input
              style={inputStyles}
              type="hidden"
              name="userEmail"
              value={auth.currentUser.email}
            />
            <input
              style={inputStyles}
              type="hidden"
              name="uid"
              value={auth.currentUser.uid}
            />
            <input
              style={inputStyles}
              type="hidden"
              name="userPhoto"
              value={auth.currentUser.photoURL}
            />
            <input
              style={inputStyles}
              type="text"
              name="displayName"
              placeholder="Display Name"
            />
            <button style={buttonStyles} type="submit">
              Complete Registration
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <div
          style={{
            background: "black",
            color: "white",
            // paddingLeft: 32,
            // paddingRight: 32,
            textAlign: "center",
            color: "white",
            fontSize: 16,
            fontFamily: "arial",
            background: "black",
            fontWeight: "400",
            lineHeight: 2,
            height: "100vh",
          }}
        >
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
              <div
                style={{
                  background: "black",
                  color: "white",
                }}
              ></div>
              <p>Friends</p>
              <div
                id="container"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  background: "black",
                  height: "100%",
                }}
              >
                {peopleYouKnowProfiles.map((profile) => (
                  <div
                    key={profile.uid}
                    style={{
                      flex: "1 0 auto",
                    }}
                  >
                    <div
                      style={{
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
                        {/* <button
                          onClick={() => {
                            handleAddingNewFriend(profile.uid);
                          }}
                        >
                          Add Friend
                        </button> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {radio === "mightKnow" && (
            <>
              <div
                style={{
                  background: "black",
                  color: "white",
                }}
              ></div>
              <p>Friends</p>
              <div
                id="container"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  background: "black",
                  height: "100%",
                }}
              >
                {peopleYouMayKnowProfiles.map((profile) => (
                  <div
                    key={profile.uid}
                    style={{
                      flex: "1 0 auto",
                    }}
                  >
                    <div
                      style={{
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
                        <button
                          style={buttonStyles}
                          // onClick={() => setFriendUid(profile.uid)}
                          onClick={() => {
                            handleAddingNewFriend(profile.uid);
                            // setFriendListUid(profile.uid);
                          }}
                        >
                          Add Friend
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </React.Fragment>
    );
  }
}
