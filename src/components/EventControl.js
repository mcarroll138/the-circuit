import React, { useEffect, useState } from "react";
import NewEventForm from "./NewEventForm";
import EditEventForm from "./EditEventForm";
import EventList from "./EventList";
import EventDetail from "./EventDetail";
import { db, auth } from "./../firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

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
        collectionSnapshot.forEach((doc) => {
          events.push({
            eventName: doc.data().eventName,
            eventDateTime: doc.data().eventDateTime,
            eventEmail: doc.data().eventEmail,
            eventLocation: doc.data().eventLocation,
            eventImage: doc.data().eventImage,
            id: doc.id,
          });
        });
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
    const selction = mainEventList.filter((event) => event.id === id)[0];
    setSelectedEvent(selction);
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
        <h1>You must be logged in to access your calendar</h1>
      </>
    );
  } else if (auth.currentUser != null) {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (error) {
      currentlyVisibleState = <p>There was an error: {error}</p>;
    } else if (editing && selectedEvent !== null) {
      currentlyVisibleState = (
        <EditEventForm
          event={selectedEvent}
          onEditEvent={handleEditingEventInList}
        />
      );
      buttonText = "Return to Event List";
    } else if (selectedEvent != null) {
      currentlyVisibleState = (
        <EventDetail
          event={selectedEvent}
          onClickingDelete={handleDeletingEvent}
          onClickingEdit={handleEditClick}
        />
      );
      buttonText = "Return to Event List";
    } else if (formVisibleOnPage) {
      currentlyVisibleState = (
        <NewEventForm onNewEventCreation={handleAddingNewEventToList} />
      );
      buttonText = "Return to Event List";
    } else {
      currentlyVisibleState = (
        <EventList
          onEventSelection={handleChangingSelectedEvent}
          eventList={mainEventList}
        />
      );
      buttonText = "Add an Event";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        {error ? null : <button onClick={handleClick}>{buttonText}</button>}
      </React.Fragment>
    );
  }
}
