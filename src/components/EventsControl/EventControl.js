import React, { useEffect, useState } from "react";
import NewEventForm from "./NewEventForm";
import EditEventForm from "./EditEventForm";
import EventList from "./EventList";
import EventDetail from "./EventDetail";
import { db, auth } from "../../firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";
import AddEventButton from "./AddEventButton";

export default function EventControl() {
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
            eventCreator: doc.data().eventCreator,
            eventCreatorPhoto: doc.data().eventCreatorPhoto,
            eventName: doc.data().eventName,
            eventDateTime: doc.data().eventDateTime,
            eventDetail: doc.data().eventDetail,
            eventLocation: doc.data().eventLocation,
            eventImage: doc.data().eventImage,
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
    return () => unSubscribe();
  }, []);

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
  };

  const handleEditingEventInList = async (eventToEdit) => {
    const eventRef = doc(db, "events", eventToEdit.id);
    await updateDoc(eventRef, eventToEdit);
    setEditing(false);
    setSelectedEvent(null);
  };
  if (auth.currentUser == null) {
    return (
      <>
        <h1>Welcome to the Circuit, please log in to access your account.</h1>
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
      buttonText = "Return to Events";
    } else if (selectedEvent != null) {
      currentlyVisibleState = (
        <EventDetail
          event={selectedEvent}
          onClickingDelete={handleDeletingEvent}
          onClickingEdit={handleEditClick}
        />
      );
      buttonText = "Return to Events";
    } else if (formVisibleOnPage) {
      currentlyVisibleState = (
        <NewEventForm onNewEventCreation={handleAddingNewEventToList} />
      );

      buttonText = "Return to Events";
    } else {
      currentlyVisibleState = (
        <EventList
          onEventSelection={handleChangingSelectedEvent}
          eventList={mainEventList}
        />
      );
      console.log(auth.currentUser.email);
      buttonText = "+ Add Event";
    }
    return (
      <React.Fragment>
        <div style={{
            display: "flex",
            justifyContent: "center",
          alignItems: "center",
          background: "black",
            // height: "100vh",
        }}>
          <div
            style={{
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
            }}
            // onMouseOver={(e) => (e.target.style.color = "#B3FFB1")}
            // onMouseOut={(e) => (e.target.style.color = "#E3A9FF")}
          >
            {error ? null : (
              <button
                style={{
                  textAlign: "center",
                  color: "#E3A9FF",
                  fontSize: 24,
                  fontFamily: "Courier",
                  background: "black",
                  textTransform: "uppercase",
                  transition: "color 0.3s",
                  wordWrap: "break-word",
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
