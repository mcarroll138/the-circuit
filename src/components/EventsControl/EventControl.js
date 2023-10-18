import React, { useEffect, useState } from "react";
import NewEventForm from "./NewEventForm";
import EditEventForm from "./EditEventForm";
import EventList from "./EventList";
import { Link, useNavigate } from "react-router-dom";
import EventDetail from "./EventDetail";
import { db, auth } from "../../firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import MissionStatement from "../SignInControl/MissionStatement";
import { useIsMobile } from "../MobileContext.js";

export default function EventControl() {
  const isMobile = useIsMobile();
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainEventList, setMainEventList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "events"),
      (collectionSnapshot) => {
        const events = [];
        const currentDate = new Date();
        collectionSnapshot.forEach((doc) => {
          const eventData = doc.data();
          const eventDateTime = new Date(eventData.eventDateTime);
          const timeDifference = eventDateTime - currentDate;
          events.push({
            ...doc.data(),
            timeDifference: timeDifference,
            id: doc.id,
          });
        });
        events.sort((a, b) => a.timeDifference - b.timeDifference);
        setMainEventList(events);
      },
      (error) => {
        setError(error.message);
      }
    );

    return () => {
      unSubscribe();
    };
  }, []);

  const handleYeahClick = async (eventId) => {
    const eventRef = doc(db, "events", eventId);
    const eventDoc = await getDoc(eventRef);
    const eventData = eventDoc.data();
    const userUid = auth.currentUser.uid;
    // const yeahResponses = eventData.yeahResponses || [];
    // const nahhResponses = eventData.nahhResponses || [];
    // const hummResponses = eventData.hummResponses || [];

    if (
      eventData.yeahResponses &&
      eventData.yeahResponses.includes(auth.currentUser.uid)
    ) {
      const updatedYeahArray = eventData.yeahResponses.filter(
        (uid) => uid !== userUid
      );
      await updateDoc(eventRef, { yeahResponses: updatedYeahArray });
    } else {
      const updatedYeahArray = [...(eventData.yeahResponses || []), userUid];
      await updateDoc(eventRef, { yeahResponses: updatedYeahArray });
      const updatedNahhArray = (eventData.nahhResponses || []).filter(
        (uid) => uid !== userUid
      );
      const updatedHummArray = (eventData.hummResponses || []).filter(
        (uid) => uid !== userUid
      );

      await updateDoc(eventRef, { nahhResponses: updatedNahhArray });
      await updateDoc(eventRef, { hummResponses: updatedHummArray });
    }
  };

  const handleNahhClick = async (eventId) => {
    const eventRef = doc(db, "events", eventId);
    const eventDoc = await getDoc(eventRef);
    const eventData = eventDoc.data();
    const userUid = auth.currentUser.uid;
   
    if (
      eventData.nahhResponses &&
      eventData.nahhResponses.includes(auth.currentUser.uid)
    ) {
      const updatedNahhArray = eventData.nahhResponses.filter(
        (uid) => uid !== userUid
      );
      await updateDoc(eventRef, { nahhResponses: updatedNahhArray });
    } else {
      const updatedNahhArray = [...(eventData.nahhResponses || []), userUid];
      await updateDoc(eventRef, { nahhResponses: updatedNahhArray });
      const updatedYeahArray = (eventData.yeahResponses || []).filter(
        (uid) => uid !== userUid
      );
      const updatedHummArray = (eventData.hummResponses || []).filter(
        (uid) => uid !== userUid
      );
      await updateDoc(eventRef, { hummResponses: updatedHummArray });
      await updateDoc(eventRef, { yeahResponses: updatedYeahArray });
    }
  };

  const handleHummClick = async (eventId) => {
    const eventRef = doc(db, "events", eventId);
    const eventDoc = await getDoc(eventRef);
    const eventData = eventDoc.data();
    const userUid = auth.currentUser.uid;
  
    if (
      eventData.hummResponses &&
      eventData.hummResponses.includes(auth.currentUser.uid)
    ) {
      const updatedHummArray = eventData.hummResponses.filter(
        (uid) => uid !== userUid
      );
      await updateDoc(eventRef, { hummResponses: updatedHummArray });
    } else {
      const updatedHummArray = [...(eventData.hummResponses || []), userUid];
      await updateDoc(eventRef, { hummResponses: updatedHummArray });
      const updatedYeahArray = (eventData.yeahResponses || []).filter(
        (uid) => uid !== userUid
      );
      const updatedNahhArray = (eventData.nahhResponses || []).filter(
        (uid) => uid !== userUid
      );
      await updateDoc(eventRef, { nahhResponses: updatedNahhArray });
      await updateDoc(eventRef, { yeahResponses: updatedYeahArray });
    }
  };

  const handleClick = () => {
    if (selectedEvent != null) {
      setFormVisibleOnPage(false);
      setSelectedEvent(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  };

  const handleAddingNewEventToList = async (newEventData) => {
    await addDoc(collection(db, "events"), newEventData);
    setFormVisibleOnPage(false);
  };

  const handleChangingSelectedEvent = (id) => {
    const selection = mainEventList.filter((event) => event.id === id)[0];
    setSelectedEvent(selection);
  };

  const handleDeletingEvent = async (id) => {
    await deleteDoc(doc(db, "events", id));
    setSelectedEvent(null);
  };

  const handleEditClick = () => {
    setEditing(true);
    // console.log(eventToEdit);
  };

  const handleEditingEventInList = async (eventToEdit) => {
    // const eventRef = doc(db, "events", eventToEdit.id);
    await updateDoc(db, "events", eventToEdit);

    // const eventRef = doc(db, "events", eventToEdit.id);
    // await updateDoc(eventRef, eventToEdit);
    setEditing(false);
    setSelectedEvent(null);
  };
  if (auth.currentUser === null) {
    return (
      <>
        <MissionStatement />
      </>
    );
  } else if (
    auth.currentUser.photoURL === null ||
    auth.currentUser.displayName === null
  ) {
    return (
      <>
        <div
          style={{
            height: "80vh",
            alignItems: "center",
            background: "black",
            fontSize: 32,
            // width: 200,
            // padding: 20,
            display: "flex",
            flexDirection: "column",
            color: "white",
            // textDecorationColor: "green",
            // borderRadius: "25px",
            // border: "6px solid #ccc",
            // margin: 10,
          }}
        >
          <Link style={{ color: "blueviolet" }} to="/user-profile">
            Please Finish Registering
          </Link>
        </div>
      </>
    );
  } else if (auth.currentUser != null) {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (error) {
      currentlyVisibleState = <p>There was an error: {error}</p>;
    } else if (editing) {
      currentlyVisibleState = (
        <EditEventForm
          event={selectedEvent}
          onEditEvent={handleEditingEventInList}
        />
      );
      buttonText = "- Back";
    } else if (selectedEvent != null) {
      currentlyVisibleState = (
        <EventDetail
          event={selectedEvent}
          onClickingDelete={handleDeletingEvent}
          onClickingEdit={handleEditClick}
        />
      );
      buttonText = "- Back";
    } else if (formVisibleOnPage) {
      currentlyVisibleState = (
        <NewEventForm onNewEventCreation={handleAddingNewEventToList} />
      );

      buttonText = "- Back";
    } else {
      currentlyVisibleState = (
        <EventList
          onEventSelection={handleChangingSelectedEvent}
          eventList={mainEventList}
          handleYeahEventStatus={handleYeahClick}
          handleNahhEventStatus={handleNahhClick}
          handleHummEventStatus={handleHummClick}
        />
      );
      buttonText = "+ Add Event";
    }
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "black",
            // height: "100vh",
          }}
        >
          <div
            style={{
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
              marginTop: 10,
            }}
          >
            {error ? null : (
              <button
                style={{
                  // textAlign: "center",
                  color: "#E3A9FF",
                  fontSize: isMobile ? 13 : 24,
                  fontFamily: "Courier",
                  background: "black",
                  textTransform: "uppercase",
                  transition: "color 0.3s",
                  // wordWrap: "break-word",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => (e.target.style.color = "#B3FFB1")}
                onMouseOut={(e) => (e.target.style.color = "#E3A9FF")}
                onClick={handleClick}
              >
                {buttonText}
              </button>
            )}
          </div>
        </div>
        <div style={{}}>{currentlyVisibleState}</div>
      </React.Fragment>
    );
  }
}
