import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { db, auth } from "../../firebase.js";
import { serverTimestamp, collection, onSnapshot } from "firebase/firestore";
import { differenceInDays } from "date-fns";
import { useIsMobile } from "../MobileContext.js";

export default function NewEventForm(props) {
  // const [radio, setRadio] = useState("mightKnow");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [friendListUid, setFriendListUid] = useState([]);
  const [inviteFriend, setInviteFriend] = useState([]);
  const [name, setName] = useState("");
  const isMobile = useIsMobile();

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

  const peopleYouKnowProfiles = profiles.filter((profile) => {
    const isFriend = friendListUid.some((friend) => {
      const isNotMatch = friend.friendUid === profile.uid;
      return isNotMatch;
    });
    return isFriend;
  });

  const handleInvitingFriend = (uid) => {
    setInviteFriend([...inviteFriend, uid]);
  };

  const formDivStyles = {
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    color: "white",
    fontSize: 20,
    fontFamily: "courier",
    fontWeight: "400",
    // padding: "10px",
    // height: 720,
  };

  const formStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 23,
    // paddingTop: 25,
    // border: "1px solid #ccc",
    border: "none",
    borderRadius: "4px",
    // width: 30,
  };

  const inputStyles = {
    margin: "4px",
    padding: "4px",
    border: "12px solid #ccc",
    borderRadius: "4px",
    fontSize: "12px",
    width: 340,
  };

  const buttonStyles = {
    width: isMobile ? 110 : 180,
    height: isMobile ? 0 : 20,
    paddingLeft: isMobile ? 1 : 24,
    paddingRight: isMobile ? 1 : 24,
    paddingTop: 14,
    paddingBottom: 14,
    background: "black",
    boxShadow: "6px 6px 6px #E3A9FF",
    border: "2px #E3A9FF solid",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 15,
    color: "white",
  };

  const [privateForm, setPrivateForm] = useState(false);
  // const [radioPrivate, setRadioPrivate] = useState("public");

  function handleNewEventFormSubmission(event) {
    event.preventDefault();

    props.onNewEventCreation({
      eventCreatorUid: event.target.eventCreatorUid.value,
      eventCreator: event.target.eventCreator.value,
      eventCreatorName: event.target.eventCreatorName.value,
      eventCreatorPhoto: event.target.eventCreatorPhoto.value,
      publicPrivate: event.target.publicPrivate.value,
      eventName: event.target.eventName.value,
      eventDateTime: event.target.eventDateTime.value,
      eventDetail: event.target.eventDetail.value,
      eventLocation: event.target.eventLocation.value,
      yeahResponses: [],
      nahhResponses: [],
      hummResponses: [],
      timeOpen: serverTimestamp(),
    });
  }
  if (privateForm === false) {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            background: "black",
            alignItems: "center",
          }}
        >
          <button
            style={buttonStyles}
            onClick={() => setPrivateForm(true)}
            onMouseOver={(e) => (e.target.style.color = "#B3FFB1")}
            onMouseOut={(e) => (e.target.style.color = "#E3A9FF")}
          >
            Make Private?
          </button>
        </div>
        <div style={formDivStyles}>
          <form
            style={formStyles}
            onSubmit={handleNewEventFormSubmission}
            encType="multipart/form-data"
          >
            Public Event
            <input
              style={inputStyles}
              type="hidden"
              name="eventCreatorUid"
              value={auth.currentUser.uid}
            />
            <input
              style={inputStyles}
              type="hidden"
              name="eventCreator"
              value={auth.currentUser.email}
            />
            <input
              style={inputStyles}
              type="hidden"
              name="eventCreatorName"
              value={auth.currentUser.displayName}
            />
            <input
              style={inputStyles}
              type="hidden"
              name="eventCreatorPhoto"
              value={auth.currentUser.photoURL}
            />
            <input
              style={inputStyles}
              type="hidden"
              name="publicPrivate"
              value="public"
            />
            <input
              style={inputStyles}
              required
              type="text"
              name="eventName"
              placeholder="Event Name"
            />
            <input
              style={inputStyles}
              required
              type="datetime-local"
              name="eventDateTime"
              placeholder="Date/Time"
            />
            <input
              style={inputStyles}
              required
              type="text"
              rows="5"
              name="eventDetail"
              placeholder="Event Details"
            />
            <input
              style={inputStyles}
              // required
              type="text"
              name="eventLocation"
              placeholder="Location"
            />
            <button
              style={buttonStyles}
              type="submit"
              onMouseOver={(e) => (e.target.style.color = "#B3FFB1")}
              onMouseOut={(e) => (e.target.style.color = "#E3A9FF")}
            >
              Party Time
            </button>
          </form>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            background: "black",
            alignItems: "center",
          }}
        >
          <button
            style={buttonStyles}
            onClick={() => setPrivateForm(false)}
            onMouseOver={(e) => (e.target.style.color = "#B3FFB1")}
            onMouseOut={(e) => (e.target.style.color = "#E3A9FF")}
          >
            Make Public?
          </button>
        </div>
        <div style={formDivStyles}>
          <form
            style={formStyles}
            onSubmit={handleNewEventFormSubmission}
            encType="multipart/form-data"
          >
            Private Event
            <input
              style={inputStyles}
              type="hidden"
              name="eventCreatorUid"
              value={auth.currentUser.uid}
            />
            <input
              style={inputStyles}
              type="hidden"
              name="eventCreator"
              value={auth.currentUser.email}
            />
            <input
              style={inputStyles}
              type="hidden"
              name="eventCreatorName"
              value={auth.currentUser.displayName}
            />
            <input
              style={inputStyles}
              type="hidden"
              name="eventCreatorPhoto"
              value={auth.currentUser.photoURL}
            />
            <input
              style={inputStyles}
              type="hidden"
              name="publicPrivate"
              value="private"
            />
            <input
              style={inputStyles}
              required
              type="text"
              name="eventName"
              placeholder="Event Name"
            />
            <input
              style={inputStyles}
              required
              type="datetime-local"
              name="eventDateTime"
              placeholder="Date/Time"
            />
            <input
              style={inputStyles}
              required
              type="text"
              rows="5"
              name="eventDetail"
              placeholder="Event Details"
            />
            <input
              style={inputStyles}
              // required
              type="text"
              name="eventLocation"
              placeholder="Location"
            />
            <button
              style={buttonStyles}
              type="submit"
              onMouseOver={(e) => (e.target.style.color = "#B3FFB1")}
              onMouseOut={(e) => (e.target.style.color = "#E3A9FF")}
            >
              Party Time
            </button>
          </form>
        </div>
      </>
    );
  }
}

NewEventForm.propTypes = {
  onNewEventCreation: PropTypes.func,
};
