import React, { useState } from "react";
import NewEventForm from "./NewEventForm";
import EditEventForm from "./EditEventForm";
import EventList from "./EventList";
import EventDetail from "./EventDetail";

export default function EventControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainEventList, setMainEventList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editing, setEditing] = useState(false);

  const handleClick = () => {
    if (selectedEvent != null) {
      setFormVisibleOnPage(false);
      setSelectedEvent(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  };

  const handleAddingNewEventToList = (newEvent) => {
    const newMainEventList = mainEventList.concat(newEvent);
    setMainEventList(newMainEventList);
    setFormVisibleOnPage(false);
  };

  const handleChangingSelectedEvent = (id) => {
    const selction = mainEventList.filter((event) => event.id === id)[0];
    setSelectedEvent(selction);
  };

  const handleDeletingEvent = (id) => {
    const newMainEventList = mainEventList.filter((event) => event.id !== id);
    setMainEventList(newMainEventList);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleEditingEventInList = (eventToEdit) => {
    const editedMainEventList = mainEventList
      .filter((event) => event.id !== selectedEvent.id)
      .concat(eventToEdit);
    setMainEventList(editedMainEventList);
    setEditing(false);
    setSelectedEvent(null);
  };

  let currentlyVisibleState = null;
  let buttonText = null;

  if (editing && selectedEvent !== null) {
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
      <button onClick={handleClick}>{buttonText}</button>
    </React.Fragment>
  );
}
