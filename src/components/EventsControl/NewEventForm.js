import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { db, auth } from "../../firebase.js";
import {
  serverTimestamp,
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";
import { differenceInDays } from "date-fns";

export default function NewEventForm(props) {
  const [radio, setRadio] = useState("mightKnow");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [friendListUid, setFriendListUid] = useState([]);
  const [inviteFriend, setInviteFriend] = useState([]);
  const [name, setName] = useState("");
  
  console.log(inviteFriend);
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

    backgroundColor: "black",
    padding: "10px",
    height: 720,
  };

  const formStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 25,
    border: "1px solid #ccc",
    borderRadius: "4px",
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
  const buttonStylesSmall = {
    width: 10,
    height: 4,
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
  const checkboxStyles = {
    margin: "4px",
    padding: "4px",
    border: "12px solid #ccc",
    borderRadius: "4px",
    fontSize: "12px",
    width: 380,
    fontSize: 12,
    background: "white",
    color: "gray",
  };
  const imgStyle = {
    objectFit: "cover",
    boarderRadius: "50%",
    height: "50px",
    width: "50px",
    borderRadius: "50%",
  };
  const [fullForm, setFullForm] = useState(false);
  const [radioPrivate, setRadioPrivate] = useState("public");

  console.log(radioPrivate);
  function handleNewEventFormSubmission(event) {
    event.preventDefault();

    props.onNewEventCreation({
      privateEvent: event.target.privateEvent.value,
      // private: event.target.private.value,
      eventCreator: event.target.eventCreator.value,
      eventCreatorName: event.target.eventCreatorName.value,
      eventCreatorPhoto: event.target.eventCreatorPhoto.value,

      eventName: event.target.eventName.value,
      eventDateTime: event.target.eventDateTime.value,
      eventDetail: event.target.eventDetail.value,
      eventLocation: event.target.eventLocation.value,
      // longForm: event.target.longForm.value,
      // drinkingAge: event.target.drinkingAge.value,
      // familyFriendly: event.target.familyFriendly.value,
      // soberEvent: event.target.soberEvent.value,
      // daysAgo: daysAgo,
      timeOpen: serverTimestamp(),
    });
  }
  if (fullForm === false) {
    return (
      <>
        <div style={formDivStyles}>
          <form
            style={formStyles}
            onSubmit={handleNewEventFormSubmission}
            encType="multipart/form-data"
          >
            <input
              style={inputStyles}
              type="hidden"
              name="eventCreator"
              value={auth.currentUser.email}
            />
            <input
              style={inputStyles}
              type="text"
              name="eventCreatorName"
              value={auth.currentUser.displayName}
            />
            <input
              style={inputStyles}
              type="hidden"
              name="eventCreatorPhoto"
              value={auth.currentUser.photoURL}
            />

            <div style={checkboxStyles}>
              <label>
                Private Event
                <input type="checkbox" name="privateEvent" />
              </label>
            </div>
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

            <button style={buttonStyles} onClick={() => setFullForm(true)}>
              View More
            </button>
            <button style={buttonStyles} type="submit">
              Party Time
            </button>
          </form>

          {/* <div
            style={{
              background: "black",
              color: "white",
            }}
          ></div>

          <div
            id="container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "end",
              overflowY: "auto",
              height: "400px",
              // flexWrap: "wrap",
              // flexDirection: "row",
              // justifyContent: "flex-start",
              // background: "black",

              // paddingLeft: 20,
              // height: "100%",
            }}
          >
            {peopleYouKnowProfiles.map((profile) => (
              <div
                key={profile.uid}
                style={
                  {
                    // flex: "1 0 auto",
                  }
                }
              >
                <div
                  id="youKnowCards"
                  style={{
                    alignItems: "center",
                    background: "black",
                    // width: 100,
                    // height: 100,
                    textSize: "8px",
                    // padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    color: "white",
                    overflow: "auto",
                    // borderRadius: "25px",
                    // border: "6px solid #ccc",
                    // margin: 10,
                  }}
                >
                  <div>
                    <img
                      alt="Profile"
                      style={imgStyle}
                      src={profile.profilePhoto}
                    ></img>
                  </div>
                  <div style={{ textSize: 8 }}>{profile.displayName}</div>
                  <div>
                    <button
                      style={buttonStylesSmall}
                      onClick={() => {
                        handleInvitingFriend(profile.uid);
                      }}
                    >
                      Invite
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </>
    );
    // } else {
    //   return (
    //     <>
    //       <div style={formDivStyles}>
    //         <form
    //           style={formStyles}
    //           onSubmit={handleNewEventFormSubmission}
    //           encType="multipart/form-data"
    //         >
    //           <input
    //             style={inputStyles}
    //             type="hidden"
    //             name="eventCreator"
    //             value={auth.currentUser.email}
    //           />
    //           <input
    //             style={inputStyles}
    //             type="hidden"
    //             name="eventCreatorName"
    //             value={auth.currentUser.displayName}
    //           />
    //           <input
    //             style={inputStyles}
    //             type="hidden"
    //             name="eventCreatorPhoto"
    //             value={auth.currentUser.photoURL}
    //           />{" "}
    //           <div style={checkboxStyles}>
    //             <label>
    //               Private Event
    //               <input type="checkbox" name="privateEvent" />
    //             </label>
    //           </div>
    //           <input
    //             style={inputStyles}
    //             required
    //             // style={{ textTransform: "capitalize" }}
    //             type="text"
    //             name="eventName"
    //             placeholder="Event Name"
    //           />
    //           <input
    //             style={inputStyles}
    //             // required
    //             type="datetime-local"
    //             name="eventDateTime"
    //             placeholder="Date/Time"
    //           />
    //           <input
    //             style={inputStyles}
    //             // required
    //             type="text"
    //             name="eventDetail"
    //             placeholder="Event Details"
    //           />
    //           <input
    //             style={inputStyles}
    //             // required
    //             type="text"
    //             name="eventLocation"
    //             placeholder="Location"
    //           />
    //           <input
    //             style={inputStyles}
    //             // required
    //             type="text"
    //             name="longForm"
    //             placeholder="Website Link"
    //           />
    //           <div
    //             style={{
    //               display: "flex",
    //               flexDirection: "column",
    //               justifyContent: "space-between",
    //               alignItems: "center",
    //               width: 320,
    //             }}
    //           >
    //             <div style={checkboxStyles}>
    //               <label>
    //                 21+
    //                 <input type="checkbox" name="drinkingAge" />
    //               </label>
    //             </div>
    //             <div style={checkboxStyles}>
    //               <label>
    //                 Family Friendly
    //                 <input type="checkbox" name="familyFriendly" />
    //               </label>
    //             </div>
    //             <div style={checkboxStyles}>
    //               <label>
    //                 Sober Event
    //                 <input type="checkbox" name="soberEvent" />
    //               </label>
    //             </div>
    //           </div>
    //           <button style={buttonStyles} onClick={() => setFullForm(false)}>
    //             View less
    //           </button>
    //           <button style={buttonStyles} type="submit">
    //             Party Time
    //           </button>
    //         </form>
    //       </div>
    //     </>
    //   );
    // }
  }
}
NewEventForm.propTypes = {
  onNewEventCreation: PropTypes.func,
};
