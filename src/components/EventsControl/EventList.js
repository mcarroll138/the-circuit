import React from "react";
import Event from "./Event";
import PropTypes from "prop-types";
import { auth } from "../../firebase.js";
import { Route, Link } from "react-router-dom";
import { useState } from "react";
import Linkify from "../Linkify";
import { useIsMobile } from "../MobileContext.js";

function EventList(props) {
  const [radio, setRadio] = useState("all");
  const isMobile = useIsMobile();

  const hostingEvents = props.eventList.filter(
    (event) => auth.currentUser.email === event.eventCreator
  );

  // const allEvents = props.eventList.filter(
  //   (event) =>
  //     event.publicPrivate !== "private" &&
  //     auth.currentUser.email !== event.eventCreator &&
  //     !event.yeahResponses &&
  //     !event.hummResponses &&
  //     !event.nahhResponses
  // );

  const newEvents = props.eventList.filter((event) => {
    const userUid = auth.currentUser.uid;
    return (
      event.publicPrivate !== "private" &&
      auth.currentUser.email !== event.eventCreator &&
      !event.yeahResponses?.includes(userUid) &&
      !event.nahhResponses?.includes(userUid) &&
      !event.hummResponses?.includes(userUid)
    );
  });

  const yeahEvents = props.eventList.filter(
    (event) =>
      event.yeahResponses && event.yeahResponses.includes(auth.currentUser.uid)
  );

  const nahhEvents = props.eventList.filter(
    (event) =>
      event.nahhResponses && event.nahhResponses.includes(auth.currentUser.uid)
  );

  const hummEvents = props.eventList.filter(
    (event) =>
      event.hummResponses && event.hummResponses.includes(auth.currentUser.uid)
  );

  return (
    <React.Fragment>
      <div
        style={{
          paddingTop: isMobile ? 6 : 32,
          paddingBottom: isMobile ? 6 : 24,
          textAlign: "center",
          color: "white",
          fontSize: isMobile ? 12 : 16,
          fontFamily: "arial",
          background: "black",
          fontWeight: "400",
          lineHeight: 2,
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
          />
          <label for="sortByAll">New Events</label>
          <input
            style={{
              marginLeft: isMobile ? 8 : 32,
            }}
            type="radio"
            id="sortByYeah"
            value="yeah"
            checked={radio === "yeah"}
            onChange={(e) => {
              setRadio(e.target.value);
            }}
          />
          <label for="sortByYeah">Yeah!</label>
          <input
            style={{
              marginLeft: isMobile ? 8 : 32,
            }}
            type="radio"
            id="sortByNahh"
            value="nahh"
            checked={radio === "nahh"}
            onChange={(e) => {
              setRadio(e.target.value);
            }}
          />
          <label for="sortByNahh">Nahh</label>
          <input
            style={{
              marginLeft: isMobile ? 8 : 32,
            }}
            type="radio"
            id="sortByHumm"
            value="humm"
            checked={radio === "humm"}
            onChange={(e) => {
              setRadio(e.target.value);
            }}
          />
          <label for="sortByHumm">Humm</label>
          <input
            style={{
              marginLeft: isMobile ? 8 : 32,
            }}
            type="radio"
            id="sortByHosting"
            value="hosting"
            checked={radio === "hosting"}
            onChange={(e) => {
              setRadio(e.target.value);
            }}
          />
          <label for="sortByHosting">Hosted by Me</label>
        </form>
      </div>
      {radio === "all" && (
        <>
          <div
            id="eventListDiv"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "black",
              flexDirection: "column",
            }}
          >
            {/* New Events  */}
            {newEvents.map((event) => (
              <Event
                whenYeahSelected={props.handleYeahEventStatus}
                whenNahhSelected={props.handleNahhEventStatus}
                whenHummSelected={props.handleHummEventStatus}
                userResponses={props.userResponses}
                whenEventClicked={props.onEventSelection}
                eventCreator={event.eventCreator}
                publicPrivate={event.publicPrivate}
                eventCreatorName={event.eventCreatorName}
                eventCreatorPhoto={event.eventCreatorPhoto}
                eventName={event.eventName}
                yeahResponses={event.yeahResponses}
                nahhResponses={event.nahhResponses}
                hummResponses={event.hummResponses}
                eventDateTime={event.eventDateTime}
                eventDetail={event.eventDetail}
                eventLocation={event.eventLocation}
                formattedPostTime={event.formattedPostTime}
                daysAgo={event.daysAgo}
                id={event.id}
                key={event.id}
              />
            ))}
          </div>
        </>
      )}
      {radio === "yeah" && (
        <>
          <div
            id="eventListDiv"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "black",
              flexDirection: "column",
            }}
          >
            {/* Attending */}
            {yeahEvents.map((event) => (
              <Event
                whenYeahSelected={props.handleYeahEventStatus}
                whenNahhSelected={props.handleNahhEventStatus}
                whenHummSelected={props.handleHummEventStatus}
                whenEventClicked={props.onEventSelection}
                eventCreator={event.eventCreator}
                publicPrivate={event.publicPrivate}
                eventCreatorName={event.eventCreatorName}
                eventCreatorPhoto={event.eventCreatorPhoto}
                eventName={event.eventName}
                yeahResponses={event.yeahResponses}
                nahhResponses={event.nahhResponses}
                hummResponses={event.hummResponses}
                userResponses={props.userResponses}
                eventDateTime={event.eventDateTime}
                eventDetail={event.eventDetail}
                eventLocation={event.eventLocation}
                daysAgo={event.daysAgo}
                formattedPostTime={event.formattedPostTime}
                id={event.id}
                key={event.id}
              />
            ))}
          </div>
        </>
      )}
      {radio === "nahh" && (
        <>
          <div
            id="eventListDiv"
            style={{
              justifyContent: "center",
              alignItems: "center",
              background: "black",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Nahh Events  */}
            {nahhEvents.map((event) => (
              <Event
                whenYeahSelected={props.handleYeahEventStatus}
                whenNahhSelected={props.handleNahhEventStatus}
                whenHummSelected={props.handleHummEventStatus}
                userResponses={props.userResponses}
                whenEventClicked={props.onEventSelection}
                eventCreator={event.eventCreator}
                publicPrivate={event.publicPrivate}
                yeahResponses={event.yeahResponses}
                nahhResponses={event.nahhResponses}
                hummResponses={event.hummResponses}
                eventCreatorName={event.eventCreatorName}
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
          </div>
        </>
      )}
      {radio === "humm" && (
        <>
          <div
            id="eventListDiv"
            style={{
              justifyContent: "center",
              alignItems: "center",
              background: "black",
              display: "flex",
              flexDirection: "column",
              // height: "80vh",
            }}
          >
            {/* Humm Events  */}
            {hummEvents.map((event) => (
              <Event
                whenYeahSelected={props.handleYeahEventStatus}
                whenNahhSelected={props.handleNahhEventStatus}
                whenHummSelected={props.handleHummEventStatus}
                yeahResponses={event.yeahResponses}
                nahhResponses={event.nahhResponses}
                hummResponses={event.hummResponses}
                whenEventClicked={props.onEventSelection}
                eventCreator={event.eventCreator}
                publicPrivate={event.publicPrivate}
                eventCreatorName={event.eventCreatorName}
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
          </div>
        </>
      )}
      {radio === "hosting" && (
        <>
          <div
            id="eventListDiv"
            style={{
              justifyContent: "center",
              alignItems: "center",
              background: "black",
              display: "flex",
              flexDirection: "column",
              // height: "80vh",
            }}
          >
            {/* Hosting  */}
            {hostingEvents.map((event) => (
              <Event
                whenYeahSelected={props.handleYeahEventStatus}
                whenNahhSelected={props.handleNahhEventStatus}
                whenHummSelected={props.handleHummEventStatus}
                yeahResponses={event.yeahResponses}
                nahhResponses={event.nahhResponses}
                hummResponses={event.hummResponses}
                whenEventClicked={props.onEventSelection}
                eventCreator={event.eventCreator}
                publicPrivate={event.publicPrivate}
                eventCreatorName={event.eventCreatorName}
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
          </div>
        </>
      )}

      {radio === "brrrah" && (
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
              {/* <div
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
              </div> */}
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
