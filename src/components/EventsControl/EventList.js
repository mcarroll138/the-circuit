import React from "react";
import Event from "./Event";
import PropTypes from "prop-types";
import { auth } from "../../firebase.js";
import { Route, Link } from "react-router-dom";
import { useState } from "react";
import AddEventButton from "./AddEventButton";

function EventList(props) {
  const [radio, setRadio] = useState("all");

  const hostingEvents = props.eventList.filter(
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
          // zIndex: "100",
          background: "black",
        }}
      >
        <AddEventButton to="new-event" />
      </div>

      <div
        style={{
          textAlign: "center",
          color: "#E3A9FF",
          fontSize: 24,
          fontFamily: "Courier",
          background: "black",
          fontWeight: "400",
          textDecoration: "underline",
          lineHeight: 2,
          wordWrap: "break-word",
        }}
      >
        <form
          style={{
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <input
            type="radio"
            id="sortByAll"
            value="all"
            checked={radio === "all"}
            onChange={(e) => {
              setRadio(e.target.value);
            }}
            // defaultChecked={radio === "all"}
          />
          <label for="sortByAll">All</label>

          <input
            type="radio"
            id="sortByHosting"
            value="hosting"
            checked={radio === "hosting"}
            onChange={(e) => {
              setRadio(e.target.value);
            }}
          />
          <label for="sortByHosting">Hosted by Me</label>
          <input
            type="radio"
            id="sortByCloseFriends"
            value="closeFriends"
            checked={radio === "closeFriends"}
            onChange={(e) => {
              setRadio(e.target.value);
            }}
          />
          <label for="sortByCloseFriends">Close Friends</label>
          <input
            type="radio"
            id="sortByAttending"
            value="attending"
            checked={radio === "attending"}
            onChange={(e) => {
              setRadio(e.target.value);
            }}
          />
          <label for="sortByAttending">Attending</label>
        </form>
      </div>
      {radio === "all" && (
        <>
          {/* All Events  */}
          {allEvents.map((event) => (
            <Event
              whenEventClicked={props.onEventSelection}
              eventCreator={event.eventCreator}
              eventCreatorPhoto={event.eventCreatorPhoto}
              eventName={event.eventName}
              eventDateTime={event.eventDateTime}
              eventDetail={event.eventDetail}
              eventLocation={event.eventLocation}
              formattedPostTime={event.formattedPostTime}
              daysAgo={event.daysAgo}
              id={event.id}
              key={event.id}
            />
          ))}
        </>
      )}
      {radio === "hosting" && (
        <>
          {/* Hosted By Me */}
          {hostingEvents.map((event) => (
            <Event
              whenEventClicked={props.onEventSelection}
              eventCreator={event.eventCreator}
              eventCreatorPhoto={event.eventCreatorPhoto}
              eventName={event.eventName}
              eventDateTime={event.eventDateTime}
              eventDetail={event.eventDetail}
              eventLocation={event.eventLocation}
              daysAgo={event.daysAgo}
              formattedPostTime={event.formattedPostTime}
              id={event.id}
              key={event.id}
            />
          ))}
        </>
      )}
      {radio === "closeFriends" && (
        <>
          <div
            style={{
              width: "100%",
              height: "100%",
              padding: 48,
              background: "black",
              boxShadow: "6px 6px 0px white",
              borderRadius: 24,
              border: "2px white solid",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 32,
              display: "inline-flex",
            }}
          >
            <div
              style={{
                width: 604,
                height: 2,
                justifyContent: "space-between",
                alignItems: "center",
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  color: "white",
                  fontSize: 24,
                  fontFamily: "Courier",
                  // fontWeight: "200",
                  textTransform: "uppercase",
                  lineHeight: 2,
                  wordWrap: "break-word",
                }}
              >
                Day of week, month XX
              </div>
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 16,
                  display: "flex",
                }}
              >
                <div
                  style={{
                    paddingLeft: 12,
                    paddingRight: 12,
                    // paddingTop: 10,
                    // paddingBottom: 10,
                    background: "#B3FFB1",
                    borderRadius: 100,
                    // justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 10,
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      color: "black",
                      fontSize: 20,
                      fontFamily: "Arial",
                      fontWeight: "400",
                      lineHeight: 2,
                      wordWrap: "break-word",
                    }}
                  >
                    Yeah!
                  </div>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    color: "#E3A9FF",
                    fontSize: 16,
                    fontFamily: "Arial",
                    fontWeight: "400",
                    textDecoration: "underline",
                    lineHeight: 2,
                    wordWrap: "break-word",
                  }}
                >
                  Nahh
                </div>
                <div
                  style={{
                    textAlign: "center",
                    color: "#E3A9FF",
                    fontSize: 16,
                    fontFamily: "Arial",
                    fontWeight: "400",
                    textDecoration: "underline",
                    lineHeight: 2,
                    wordWrap: "break-word",
                  }}
                >
                  Humm
                </div>
              </div>
            </div>
            <div
              style={{
                width: 604,
                color: "#B3FFB1",
                fontSize: 40,
                fontFamily: "Courier",
                fontWeight: "400",
                lineHeight: 2,
                wordWrap: "break-word",
              }}
            >
              Name of event
            </div>
            <div
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 12,
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  color: "white",
                  fontSize: 24,
                  fontFamily: "Courier",
                  fontWeight: "400",
                  lineHeight: 2,
                  wordWrap: "break-word",
                }}
              >
                X-Xpm
              </div>
              <div
                style={{
                  color: "white",
                  fontSize: 24,
                  fontFamily: "Courier",
                  fontWeight: "400",
                  lineHeight: 2,
                  wordWrap: "break-word",
                }}
              >
                @
              </div>
              <div
                style={{
                  color: "#E3A9FF",
                  fontSize: 24,
                  fontFamily: "Courier",
                  fontWeight: "400",
                  textDecoration: "underline",
                  lineHeight: 2,
                  wordWrap: "break-word",
                }}
              >
                Location
              </div>
            </div>
            <div
              style={{
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 16,
                display: "flex",
              }}
            >
              <div
                style={{
                  width: 604,
                  height: 68,
                  color: "white",
                  fontSize: 24,
                  fontFamily: "Arial",
                  fontWeight: "400",
                  lineHeight: 2,
                  wordWrap: "break-word",
                }}
              >
                Event description goes here. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
              </div>
              <div
                style={{
                  width: 604,
                  color: "#E3A9FF",
                  fontSize: 16,
                  fontFamily: "Arial",
                  fontWeight: "400",
                  textDecoration: "underline",
                  lineHeight: 2,
                  wordWrap: "break-word",
                }}
              >
                Read more
              </div>
            </div>
            <div
              style={{
                color: "#B3FFB1",
                fontSize: 16,
                fontFamily: "Arial",
                fontWeight: "400",
                lineHeight: 2,
                wordWrap: "break-word",
              }}
            >
              X close friends are a yeah!
            </div>
            <div
              style={{
                width: 604,
                justifyContent: "space-between",
                alignItems: "center",
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  height: 48,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 16,
                  display: "flex",
                }}
              >
                <img
                  style={{
                    width: 48,
                    height: 48,
                    background:
                      "linear-gradient(0deg, #D9D9D9 0%, #D9D9D9 100%)",
                    borderRadius: 9999,
                  }}
                  src="https://via.placeholder.com/48x48"
                />
                <div
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 4,
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontFamily: "Arial",
                      fontWeight: "400",
                      lineHeight: 2,
                      wordWrap: "break-word",
                    }}
                  >
                    Hosted by
                  </div>
                  <div
                    style={{
                      color: "#E3A9FF",
                      fontSize: 16,
                      fontFamily: "Arial",
                      fontWeight: "400",
                      textDecoration: "underline",
                      lineHeight: 2,
                      wordWrap: "break-word",
                    }}
                  >
                    @xxxxxxxx
                  </div>
                </div>
              </div>
              <div
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 16,
                  display: "flex",
                }}
              >
                <div
                  style={{
                    color: "#999999",
                    fontSize: 16,
                    fontFamily: "Arial",
                    fontWeight: "400",
                    lineHeight: 2,
                    wordWrap: "break-word",
                  }}
                >
                  Posted X days ago
                </div>
              </div>
            </div>
            <div
              style={{
                width: 604,
                paddingLeft: 24,
                paddingRight: 24,
                paddingTop: 20,
                paddingBottom: 20,
                background: "black",
                boxShadow: "6px 6px 0px #E3A9FF",
                border: "2px #E3A9FF solid",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  color: "#E3A9FF",
                  fontSize: 24,
                  fontFamily: "Courier",
                  fontWeight: "400",
                  textTransform: "uppercase",
                  lineHeight: 2,
                  wordWrap: "break-word",
                }}
              >
                edit event
              </div>
            </div>
          </div>

          <h2>Hosting</h2>
        </>
      )}
    </React.Fragment>
  );
}

EventList.propTypes = {
  eventList: PropTypes.array,
  onEventSelection: PropTypes.func,
};

export default EventList;

//Props are the eventName, eventTime, etc
