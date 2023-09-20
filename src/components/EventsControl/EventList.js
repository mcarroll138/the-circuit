import React from "react";
import Event from "./Event";
import PropTypes from "prop-types";
import { auth } from "../../firebase.js";

function EventList(props) {
  // const [showFriendsEvents, setShowFriendsEvents] = useState(false);

  const filteredEvents = props.eventList.filter(
    (event) => auth.currentUser.email === event.eventCreator
  );
  return (
    <React.Fragment>
      <hr />
      {/* {props.eventList.map((event) => ( */}
      {filteredEvents.map((event) => (
        <Event
          whenEventClicked={props.onEventSelection}
          eventCreator={event.eventCreator}
          eventName={event.eventName}
          eventDateTime={event.eventDateTime}
          eventDetail={event.eventDetail}
          eventLocation={event.eventLocation}
          eventImage={event.eventImage}
          id={event.id}
          key={event.id}
        />
      ))}
    </React.Fragment>
  );
}

EventList.propTypes = {
  eventList: PropTypes.array,
  onEventSelection: PropTypes.func,
};

export default EventList;

//Props are the eventName, eventTime, etc
