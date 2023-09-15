import React from "react";
import NewEventForm from "./NewEventForm";
import EventList from "./EventList";
import EventDetail from "./EventDetail";

export default class EventControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      mainEventList: [],
      selectedEvent: null,
    };
  }
  handleClick = () => {
    if (this.state.selectedEvent != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedEvent: null,
      });
    } else {
      this.setState((prevState) => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  };

  handleAddingNewEventToList = (newEvent) => {
    const newMainEventList = this.state.mainEventList.concat(newEvent);
    this.setState({
      mainEventList: newMainEventList,
      formVisibleOnPage: false,
    });
  };

  handleChangingSelectedEvent = (id) => {
    const selectedEvent = this.state.mainEventList.filter(
      (event) => event.id === id
    )[0];
    this.setState({ selectedEvent: selectedEvent });
  };

  handleDeletingTicket = (id) => {
    const newMainEventList = this.state.mainEventList.filter(
      (event) => event.id !== id
    );
    this.setState({
      mainEventList: newMainEventList,
      selectedEvent: null,
    });
  };

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.selectedEvent != null) {
      currentlyVisibleState = (
        <EventDetail
          event={this.state.selectedEvent}
          onClickingDelete={this.handleDeletingTicket}
        />
      );
      buttonText = "Return to Event List";
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = (
        <NewEventForm onNewEventCreation={this.handleAddingNewEventToList} />
      );
      buttonText = "Return to Event List";
    } else {
      currentlyVisibleState = (
        <EventList
          eventList={this.state.mainEventList}
          onEventSelection={this.handleChangingSelectedEvent}
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

// export default class EventControl extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       formVisibleOnPage: false,
//       mainEventList: [],
//     };
//   }

//   handleClick = () => {
//     this.setState((prevState) => ({
//       formVisibleOnPage: !prevState.formVisibleOnPage,
//     }));
//   };

//   handleAddingNewEventToList = (newEvent) => {
//     const newMainEventList = this.state.mainEventList.concat(newEvent);
//     this.setState({
//       mainEventList: newMainEventList,
//       formVisibleOnPage: false,
//     });
//   };

//   render() {
//     let currentlyVisibleState = null;
//     let buttonText = null;
//     if (this.state.formVisibleOnPage) {
//       currentlyVisibleState = (
//         <NewEventForm onNewEventCreation={this.handleAddingNewEventToList} />
//       );
//       buttonText = "Return to Event List";
//     } else {
//       currentlyVisibleState = (
//         <EventList eventList={this.state.mainEventList} />
//       );
//       buttonText = "Add Event";
//     }
//     return (
//       <>
//         {currentlyVisibleState}
//         <button onClick={this.handleClick}>{buttonText}</button>
//       </>
//     );
//   }
// }
