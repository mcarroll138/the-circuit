import React from "react";
import NewEventForm from "./NewEventForm";
import EventList from "./EventList";

export default class EventControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      mainEventList: [],
    };
  }
  handleClick = () => {
    this.setState((prevState) => ({
      formVisibleOnPage: !prevState.formVisibleOnPage,
    }));
  };

  handleAddingNewEventToList = (newEvent) => {
    const newMainEventList = this.state.mainEventList.concat(newEvent);
    this.setState({
      mainEventList: newMainEventList,
      formVisibleOnPage: false,
    });
  };

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewEventForm />;
      buttonText = "Return to Event List";
    } else {
      currentlyVisibleState = (
        <EventList eventList={this.state.mainEventList} />
      );
      buttonText = "Add an Event";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>;
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
