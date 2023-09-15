import React, { useState } from "react";
import NewEventForm from "./NewEventForm";
import EditEventForm from "./EditEventForm";
import EventList from "./EventList";
import EventDetail from "./EventDetail";

export default function EventControl(){
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainEventList, setMainEventList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editing, setEditing] = useState(false);

 const handleClick = () => {
    if (this.state.selectedEvent != null) {
     
        setFormVisibleOnPage(false);
        this.setState({
          formVisibleOnPage: false,
          selectedEvent: null,
        });
      }else {
        setFormVisibleOnPage(!formVisibleOnPage);
    }
  }
    

  const handleAddingNewEventToList = (newEvent) => {
    const newMainEventList = this.state.mainEventList.concat(newEvent);
     setMainEventList(newMainEventList);
     setFormVisibleOnPage(false)
  };

  const handleChangingSelectedEvent = (id) => {
    const selectedEvent = this.state.mainEventList.filter(
      (event) => event.id === id
    )[0];
    this.setState({ selectedEvent: selectedEvent });
  };

  const handleDeletingTicket = (id) => {
    const newMainEventList = mainEventList.filter(
      (event) => event.id !== id
    );
    setMainEventList(newMainEventList);
  };

  const handleEditClick = () => {
        this.setState({ editing: true });
  };

 const handleEditingEventInList = (eventToEdit) => {
    const editedMainEventList = mainEventList
      .filter((event) => event.id !== this.state.selectedEvent.id)
      .concat(eventToEdit);
    
      setMainEventList(editedMainEventList);
      
  };

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editing && this.state.selectedEvent !== null) {
      currentlyVisibleState = (
        <EditEventForm
          event={this.state.selectedEvent}
          onEditEvent={this.handleEditingEventInList}
        />
      );

      buttonText = "Return to Event List";
    } else if (this.state.selectedEvent != null) {
      currentlyVisibleState = (
        <EventDetail
          event={this.state.selectedEvent}
          onClickingDelete={this.handleDeletingTicket}
          onClickingEdit={this.handleEditClick}
        />
      );
      buttonText = "Return to Event List";
    } else if (formVisibleOnPage) {
      currentlyVisibleState = (
        <NewEventForm onNewEventCreation={this.handleAddingNewEventToList} />
      );
      buttonText = "Return to Event List";
    } else {
      currentlyVisibleState = (
        <EventList
        onEventSelection={this.handleChangingSelectedEvent}
          eventList={mainEventList}
        />
      );
      buttonText = "Add an Event";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}
