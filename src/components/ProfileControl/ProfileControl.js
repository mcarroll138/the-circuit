import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { Link } from "react-router-dom";
import vectorImage from "../../assets/Logo.png";
import {
  addDoc,
  collection,
  deleteDoc,
  onSnapshot,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";

export default function UserProfile() {
  const [radio, setRadio] = useState("mightKnow");
  const [profiles, setProfiles] = useState([]);
  const [friendListUid, setFriendListUid] = useState([]);
  const [friendRequest, setFriendRequest] = useState([]);
  const [loadingFriendRequestList, setLoadingFriendRequestList] =
    useState(true);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [loadingFriendList, setLoadingFriendList] = useState(true);


  const [
    pendingOutgoingFriendRequestProfiles,
    setPendingOutgoingFriendRequestProfiles,
  ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileList = [];
        const collectionSnapshot = await getDocs(collection(db, "profiles"));
        collectionSnapshot.forEach((doc) => {
          profileList.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setProfiles(profileList);
        setLoadingProfiles(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();

    const friendListUnsubscribe = onSnapshot(
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
        setLoadingFriendList(false);
      }
    );

    const friendRequestUnsubscribe = onSnapshot(
      collection(db, "friendRequest"),
      (collectionSnapshot) => {
        const friendRequest = [];
        const outgoingFriendRequests = [];

        collectionSnapshot.forEach((doc) => {
          const request = {
            id: doc.id,
            ...doc.data(),
          };

          if (request.senderUid === auth.currentUser.uid) {
            outgoingFriendRequests.push(request);
          }

          friendRequest.push(request);
        });

        setFriendRequest(friendRequest);
        setPendingOutgoingFriendRequestProfiles(outgoingFriendRequests);

        setLoadingFriendRequestList(false);
      }
    );

     return () => {
      friendListUnsubscribe();
      friendRequestUnsubscribe();
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
    } catch (error) {
      console.error("Error creating profile: ", error);
    }
  };

  const userDocRef = doc(db, "profiles", auth.currentUser.uid);
  const friendsCollectionRef = collection(userDocRef, "friends");

  const handleFriendRequest = async (newFriendRequestData) => {
    await addDoc(collection(db, "friendRequest"), {
      senderUid: auth.currentUser.uid,
      senderEmail: auth.currentUser.email,
      recipientUid: newFriendRequestData.recipientUid,
      recipientEmail: newFriendRequestData.recipientEmail,
      status: "pending",
    });
  };

  const handleAddingNewFriend = async (friendUid) => {
    await addDoc(friendsCollectionRef, {
      friendUid,
    });
  };

  const handleRemovingFriend = async (friendUid) => {
    try {
      const friendQuery = query(
        friendsCollectionRef,
        where("friendUid", "==", friendUid)
      );
      const querySnapshot = await getDocs(friendQuery);

      if (!querySnapshot.empty) {
        const friendDoc = querySnapshot.docs[0];
        await deleteDoc(friendDoc.ref);
        console.log("Friend Removed Successfully");
        console.log(`Logged in as ${auth.currentUser.uid}`);
      } else {
        console.log("Friend Not Found");
      }
    } catch (error) {
      console.error("Error Removing Friend: ", error);
    }
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
    borderRadius: "50%",
    height: "100px",
    width: "100px",
  };

  const filteredProfiles = profiles.filter(
    (profile) => auth.currentUser.uid === profile.uid
  );

  const peopleYouMayKnowProfiles = profiles.filter((profile) => {
    const isNotCurrentUser = profile.uid !== auth.currentUser.uid;
    const hasPendingRequest = pendingOutgoingFriendRequestProfiles.some(
      (request) => {
        return request.recipientUid === profile.uid;
      }
    );
    const isNotFriend = !friendListUid.some((friend) => {
      const isMatch = friend.friendUid === profile.uid;
      return isMatch;
    });
    return isNotFriend && isNotCurrentUser && !hasPendingRequest;
  });

  const peopleYouKnowProfiles = profiles.filter((profile) => {
    const isFriend = friendListUid.some((friend) => {
      const isNotMatch = friend.friendUid === profile.uid;
      return isNotMatch;
    });
    return isFriend;
  });

  if (loadingProfiles || loadingFriendList) {
    return (
      <div
        style={{
          backgroundColor: "black",
          color: "white",
        }}
      >
        <img src={vectorImage} alt="The Circuit" />
        Thank you for being a friend...
      </div>
    );
  }
  if (filteredProfiles.length === 0) {
    return (
      <div
        style={{
          height: "80vh",
          alignItems: "center",
          background: "black",
          fontSize: 32,
          display: "flex",
          flexDirection: "column",
          color: "white",
        }}
      >
        <Link style={{ color: "blueviolet" }} to="/user-profile">
          Please Finish Registering
        </Link>
      </div>
    );
  } else {
    return (
      <div
        style={{
          background: "black",
          color: "white",
          textAlign: "center",
          fontSize: 16,
          fontFamily: "arial",
          fontWeight: "400",
          lineHeight: 2,
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
          <label htmlFor="sortByAll">All Friends</label>

          <input
            type="radio"
            id="sortByMightKnow"
            value="mightKnow"
            checked={radio === "mightKnow"}
            onChange={(e) => {
              setRadio(e.target.value);
            }}
          />
          <label htmlFor="sortByMightKnow">Might Know</label>

          <input
            type="radio"
            id="sortByFriendRequest"
            value="friendRequest"
            checked={radio === "friendRequest"}
            onChange={(e) => {
              setRadio(e.target.value);
            }}
          />
          <label htmlFor="sortByFriendRequest">Friend Requests</label>
        </form>

        {radio === "allFriends" && (
          <>
            <div></div>
            <p>Friends</p>
            <div
              id="container"
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "flex-start",
                background: "black",
                paddingLeft: 20,
              }}
            >
              {peopleYouKnowProfiles.map((profile) => (
                <div key={profile.uid}>
                  <div
                    id="youKnowCards"
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
                      margin: 10,
                    }}
                  >
                    <div>
                      <img
                        alt="Profile"
                        style={imgStyle}
                        src={profile.profilePhoto}
                      ></img>
                    </div>
                    <div>{profile.displayName}</div>
                    <div>
                      <button
                        style={buttonStyles}
                        onClick={() => {
                          handleRemovingFriend(profile.uid);
                          console.log(profile.uid);
                        }}
                      >
                        Remove Friend
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {radio === "mightKnow" && (
          <>
            <div></div>
            <p>People You Might Know</p>
            <div
              id="container"
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "flex-start",
                background: "black",
                paddingLeft: "1%",
              }}
            >
              {peopleYouMayKnowProfiles.map((profile) => (
                <div key={profile.uid}>
                  <div
                    id="mightKnowCards"
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
                      margin: 10,
                    }}
                  >
                    <div>
                      <img
                        alt="Profile"
                        style={imgStyle}
                        src={profile.profilePhoto}
                      ></img>
                    </div>
                    <div>{profile.displayName}</div>
                    <div>
                      <button
                        style={buttonStyles}
                        onClick={() => {
                          const newFriendRequestData = {
                            requestedUid: auth.currentUser.uid,
                            requestedEmail: auth.currentUser.email,
                            recipientUid: profile.uid,
                            recipientEmail: profile.userProfile,
                            status: "pending",
                          };
                          handleFriendRequest(newFriendRequestData);
                        }}
                      >
                        Send Friend Request
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {radio === "friendRequest" && (
          <>
            <div></div>
            <p>Pending Outgoing Requests</p>
            <div
              id="container"
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "flex-start",
                background: "black",
                paddingLeft: 20,
              }}
            >
              {pendingOutgoingFriendRequestProfiles.map((request) => (
                <div key={request.id}>
                  <div
                    id="youKnowCards"
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
                      margin: 10,
                    }}
                  >
                    <div>
                      <img
                        alt="Profile"
                        style={imgStyle}
                        src={request.recipientProfilePhoto}
                      ></img>
                    </div>
                    <div>
                      <button
                        style={buttonStyles}
                        onClick={() => {
                          handleRemovingFriend(request.recipientUid);
                          console.log(request.recipientUid);
                        }}
                      >
                        Remove Friend
                      </button>
                    </div>
                    <div>{request.recipientEmail}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}
