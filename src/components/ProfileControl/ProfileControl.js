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
  getDoc,
  setDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

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

export default function UserProfile() {
  const [radio, setRadio] = useState("mightKnow");
  const [profiles, setProfiles] = useState([]);
  const [friendListUid, setFriendListUid] = useState([]);
  const [friendRequest, setFriendRequest] = useState([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [loadingFriendList, setLoadingFriendList] = useState(true);
  const [friendList, setFriendList] = useState([]);
  const [
    pendingOutgoingFriendRequestProfiles,
    setPendingOutgoingFriendRequestProfiles,
  ] = useState([]);

  const [
    pendingIncommingFriendRequestProfiles,
    setPendingIncommingFriendRequestProfiles,
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
      friendsCollectionRef,
      (collectionSnapshot) => {
        const friendList = [];

        collectionSnapshot.forEach((doc) => {
          friendList.push({
            // id: friendRequest.id,
            ...doc.data(),
          });
        });

        setLoadingFriendList(false);
        setFriendList(friendList);
      }
    );

    const sentFriendRequestUnsubscribe = onSnapshot(
      sentRequestsCollectionRef,
      (collectionSnapshot) => {
        const sentRequestsList = [];

        collectionSnapshot.forEach((doc) => {
          sentRequestsList.push({
            // id: friendRequest.id,
            ...doc.data(),
          });
        });

        setLoadingFriendList(false);
        setPendingOutgoingFriendRequestProfiles(sentRequestsList);
      }
    );

    const friendRequestUnsubscribe = onSnapshot(
      friendRequestCollectionRef,
      (collectionSnapshot) => {
        const friendRequestsList = [];

        collectionSnapshot.forEach((doc) => {
          friendRequestsList.push({
            // id: friendRequest.id,
            ...doc.data(),
          });
        });

        setLoadingFriendList(false);
        setPendingIncommingFriendRequestProfiles(friendRequestsList);
      }
    );

    return () => {
      friendListUnsubscribe();
      sentFriendRequestUnsubscribe();
      friendRequestUnsubscribe();
    };
  }, []);

  const userDocRef = doc(db, "profiles", auth.currentUser.uid);
  const friendsCollectionRef = collection(userDocRef, "friends");
  // const currentFriendRef = collection(friendRequestCollectionRef, "friendData");
  const friendRequestCollectionRef = collection(userDocRef, "friendRequest");
  const sentRequestsCollectionRef = collection(userDocRef, "sentRequests");

  const handleFriendRequest = async (newFriendRequestData) => {
    try {
      if (newFriendRequestData.recipientUid) {
        //The logged in user sending the request
        const sentRequestsRef = doc(
          userDocRef,
          "sentRequests",
          newFriendRequestData.recipientUid
        );
        await setDoc(sentRequestsRef, {
          displayName: newFriendRequestData.recipientUserName,
          photoUrl: newFriendRequestData.profilePhoto,
          uid: newFriendRequestData.recipientUid,
          status: "requested",
        });

        // The person recieivng the request
        const recipientRequestsRef = doc(
          db,
          "profiles",
          newFriendRequestData.recipientUid,
          "friendRequest",
          auth.currentUser.uid
        );
        await setDoc(recipientRequestsRef, {
          displayName: auth.currentUser.displayName,
          photoUrl: auth.currentUser.photoURL,
          uid: auth.currentUser.uid,
          status: "pending",
        });
      } else {
        console.log("no photo updated");
      }
    } catch (error) {
      console.log("Error creating friend request", error);
    }
  };

  const handleAcceptingFriendRequest = async (friendData) => {
    const senderUserDocRef = doc(db, "profiles", friendData.uid);
    try {
      //delete the incomming friend request from logged in users profile
      await deleteDoc(doc(userDocRef, "friendRequest", friendData.uid));

      //delete the outgoing friend request from the sender with the current user's Id
      await deleteDoc(
        doc(senderUserDocRef, "sentRequests", auth.currentUser.uid)
      );

      // const userFriendDocRef = collection(userDocRef, friendData.uid);
      // const userFriendDocRef = doc(db, "profiles", friendData.uid);
      // await setDoc(userFriendDocRef, {
      //   userName: friendData.userName,
      //   uid: friendData.uid,
      // });

      // adding friend to logged in user
      const userFriendDocRef = doc(
        db,
        "profiles",
        auth.currentUser.uid,
        "friends",
        friendData.uid
      );
      await setDoc(userFriendDocRef, {
        uid: friendData.uid,
        userName: friendData.userName,
      });

      //adding friend to the sender's friend list
      const loggedInFriendDocRef = doc(
        db,
        "profiles",
        friendData.uid,
        "friends",
        auth.currentUser.uid
      );
      await setDoc(loggedInFriendDocRef, {
        uid: auth.currentUser.uid,
        userName: auth.currentUser.displayName,
      });

      // await addDoc(collection(userDocRef, "friends"), {
      //   uid: friendData.uid,
      //   userName: friendData.userName,
      // });
      // await addDoc(collection(senderUserDocRef, "friends"), {
      //   uid: auth.currentUser.uid,
      //   userName: auth.currentUser.displayName,
      // });
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleFollowingPublicAccount = async (friendUid) => {
    await addDoc(friendsCollectionRef, {
      friendUid,
    });
  };

  const handleCancelFriendRequest = async (uid) => {
    try {
      const friendRequestQuery = query(
        collection(userDocRef, "sentRequests"),
        where("uid", "==", uid),
        where("status", "==", "requested")
      );

      const querySnapshot = await getDocs(friendRequestQuery);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });

        console.log("Friend Request(s) Cancelled Successfully");
      } else {
        console.log("No Friend Request to Cancel");
      }
    } catch (error) {
      console.log("Error Cancelling Request:", error);
    }
  };

  const handleRemovingFriend = async (uid) => {
    try {
      // Delete the friend from logged-in user's friend list
      await deleteDoc(doc(userDocRef, "friends", uid));

      // Delete the friend from the friend's friend list
      const friendUserDocRef = doc(db, "profiles", uid);
      await deleteDoc(doc(friendUserDocRef, "friends", auth.currentUser.uid));

      console.log("Friend Removed Successfully");
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  const filteredProfiles = profiles.filter(
    (profile) => auth.currentUser.uid === profile.uid
  );

  const peopleYouMayKnowProfiles = profiles.filter((profile) => {
    if (profile.uid === auth.currentUser.uid) {
      return false; // Exclude the current user's profile
    }

    // Check if the profile is already a friend
    const isFriend = friendList.some(
      (friendData) => friendData.uid === profile.uid
    );

    // Check if an incoming friend request exists (sent to the current user)
    const hasIncomingRequest = pendingIncommingFriendRequestProfiles.some(
      (request) => request.uid === profile.uid
    );

    // Check if an outgoing friend request exists (sent by the current user)
    const hasOutgoingRequest = pendingOutgoingFriendRequestProfiles.some(
      (request) => request.uid === profile.uid
    );

    // Exclude the profile if it's a friend or there's a friend request
    return !isFriend && !hasIncomingRequest && !hasOutgoingRequest;
  });

  const peopleYouKnowProfiles = profiles.filter((profile) => {
    const isFriend = friendList.some((friends) => {
      const isNotMatch = friends.uid === profile.uid;
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
                            recipientUid: profile.uid,
                            recipientUserName: profile.displayName,
                            recipientEmail: profile.userProfile,
                            profilePhoto: profile.profilePhoto,
                          };
                          handleFriendRequest(newFriendRequestData);
                          console.log(pendingOutgoingFriendRequestProfiles);
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
            <p>New Requests</p>
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
              {pendingIncommingFriendRequestProfiles.map((request) => (
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
                        src={request.photoUrl}
                      ></img>
                    </div>
                    <div>
                      <div>{request.status}</div>
                      <div>{request.displayName}</div>
                      <button
                        style={buttonStyles}
                        onClick={() => {
                          const friendData = {
                            uid: request.uid,
                            userName: request.displayName,
                          };
                          handleAcceptingFriendRequest(friendData);
                          console.log(request.uid);
                        }}
                      >
                        + Accept Request
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                        src={request.photoUrl}
                      ></img>
                    </div>
                    <div>
                      <div>{request.displayName}</div>
                      <div>{request.recipientEmail}</div>
                      <button
                        style={buttonStyles}
                        onClick={() => {
                          handleCancelFriendRequest(request.uid);
                          console.log(request.recipientUid);
                        }}
                      >
                        Cancel Request
                      </button>
                    </div>
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
