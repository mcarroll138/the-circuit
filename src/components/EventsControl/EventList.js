import React from "react";
import Event from "./Event";
import PropTypes from "prop-types";
import { auth } from "../../firebase.js";
// import RadioButtonControl from "./RadioButtons";

function EventList(props) {
  // const [showFriendsEvents, setShowFriendsEvents] = useState(false);

  const filteredEvents = props.eventList.filter(
    (event) => auth.currentUser.email === event.eventCreator
  );

  const allEvents = props.eventList.filter(
    (event) => auth.currentUser.email !== event.eventCreator
  );
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "sticky",
          top: "50",
          zIndex: "5000",
          background: "black",
        }}
      >
        <div
          style={{
            // marginTop: "26px",
            width: 180,
            height: 40,
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 20,
            paddingBottom: 20,
            background: "black",
            boxShadow: "6px 6px 0px #E3A9FF",
            border: "2px #E3A9FF solid",
            display: "flex",
            // justifyContent: "flex-end",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              textAlign: "center",
              color: "#E3A9FF",
              fontSize: 24,
              fontFamily: "Courier",

              textTransform: "uppercase",

              wordWrap: "break-word",
            }}
          >
            + add event
          </div>
        </div>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#E3A9FF",
            fontSize: 12,
            fontFamily: "Arial",
            fontWeight: "400",
            textDecoration: "underline",

            wordWrap: "break-word",
          }}
        >
          <div>
            <input
              type="radio"
              id="all"
              name="eventFilter"
              value="all"
              checked
            />
            <label for="all">All Events</label>
          </div>
          <div>
            <input
              type="radio"
              id="hosting"
              name="eventFilter"
              value="hosting"
            />
            <label for="hosting">Hosted By Me</label>
          </div>
          <div>
            <input
              type="radio"
              id="closeFriends"
              name="eventFilter"
              value="closeFriends"
            />
            <label for="closeFriends">Close Friends</label>
          </div>
          <div>
            <input
              type="radio"
              id="attending"
              name="eventFilter"
              value="attending"
            />
            <label for="attending">Attending</label>
          </div>
        </div>
      </div>
      <h2>My Events</h2>
      <hr />
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

      <h2>All Events</h2>
      {allEvents.map((event) => (
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
