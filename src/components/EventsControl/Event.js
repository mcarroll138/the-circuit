import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import { auth } from "../../firebase.js";
import Linkify from "../Linkify";
import { useIsMobile } from "../MobileContext.js";

export default function Event(props) {
  const isMobile = useIsMobile();
  const [radio, setRadio] = useState("");
  const isHostedByCurrentUser = auth.currentUser.email === props.eventCreator;
  const notHostedByCurrentUser = auth.currentUser.email !== props.eventCreator;

  const userHasRespondedYeah = props.yeahResponses.includes(
    auth.currentUser.uid
  );
  const userHasRespondedNahh = props.nahhResponses.includes(
    auth.currentUser.uid
  );
  const userHasRespondedHumm = props.hummResponses.includes(
    auth.currentUser.uid
  );
  const yeahCount = props.yeahCount;
  const dateTimeValue = props.eventDateTime.split("T");
  const dateParts = dateTimeValue[0].split("-");
  const timeParts = dateTimeValue[1].split(":");
  const formattedDate = `${dateParts[1]}.${dateParts[2]}.${dateParts[0]}`;
  const formattedTime = timeFormatAmPm();
  const publishedAgo = formatDistanceToNow(new Date(props.eventDateTime), {
    addSuffix: true,
  });
  function timeFormatAmPm() {
    let formmatedHour = parseInt(timeParts[0]);
    let amPm = "AM";

    if (formmatedHour >= 12) {
      amPm = "PM";
      if (formmatedHour > 12) {
        formmatedHour -= 12;
      }
    }
    return `${formmatedHour}:${timeParts[1]} ${amPm}`;
  }

  return (
    <>
      <div
        id="eventCard"
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: isMobile ? 10 : 20,
          width: isMobile ? 300 : 500,
          padding: "5%",
          background: "black",
          boxShadow: "6px 6px 0px white",
          borderRadius: 24,
          border: "2px white solid",
          marginBottom: 16,
        }}
      >
        <div
          id="dateAndResponseDiv"
          style={{
            height: isMobile ? 17 : 22,
            justifyContent: "space-between",
            display: "inline-flex",
          }}
        >
          <div
            id="dateDisplay"
            style={{
              color: "white",
              alignItems: "center",
              fontFamily: "Courier",
              fontSize: isMobile ? 16 : 24,
              fontWeight: "400",
              lineHeight: "100%",
              textTransform: "uppercase",
              wordWrap: "break-word",
              paddingRight: isMobile ? 2 : "10%",
            }}
          >
            {formattedDate}
          </div>
          <div
            style={{
              justifyContent: "right",
              alignItems: "center",
              // gap: 16,
              display: "flex",
            }}
          >
            <div
              id="radioResponse"
              style={{
                textAlign: "center",
                color: "#E3A9FF",
                fontSize: isMobile ? 14 : 20,
                fontFamily: "Arial",
                fontWeight: "400",
                // textDecoration: "underline",
                lineHeight: 2,
                wordWrap: "break-word",
                display: isHostedByCurrentUser ? "none" : "block",
              }}
            >
              <form
                style={{
                  // display: isHostedByCurrentUser ? "none" : "block",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  style={{
                    opacity: userHasRespondedYeah ? 0.2 : 1,
                  }}
                  type="radio"
                  id="yeah"
                  value="yeah"
                  checked={radio === "yeah"}
                  disabled={userHasRespondedYeah}
                  onChange={(e) => {
                    setRadio(e.target.value);
                    if (!userHasRespondedYeah) {
                      props.whenYeahSelected(props.id, "yeah");
                    }
                  }}
                />
                <label
                  style={{
                    color: userHasRespondedYeah ? "#B3FFB1" : "auto",
                    fontWeight: userHasRespondedYeah ? "bold" : "auto",
                    fontSize: userHasRespondedYeah ? 30 : "auto",
                    // fontSize: isMobile ? 16 : 24,
                  }}
                  htmlFor="yeah"
                >
                  Yeah!
                </label>

                <input
                  style={{
                    marginLeft: isMobile ? 2 : 32,
                    opacity: userHasRespondedNahh ? 0.2 : 1,
                  }}
                  label="not"
                  type="radio"
                  id="nahh"
                  value="nahh"
                  checked={radio === "nahh"}
                  disabled={userHasRespondedNahh}
                  onChange={(e) => {
                    setRadio(e.target.value);
                    if (!userHasRespondedNahh) {
                      props.whenNahhSelected(props.id, "nahh");
                    }
                  }}
                />
                <label
                  style={{
                    color: userHasRespondedNahh ? "#FFA1A1" : "auto",
                    fontWeight: userHasRespondedNahh ? "bold" : "auto",
                    fontSize: userHasRespondedNahh ? 30 : "auto",
                  }}
                  htmlFor="nahh"
                >
                  Nahh
                </label>

                <input
                  style={{
                    marginLeft: isMobile ? 2 : 32,
                    opacity: userHasRespondedHumm ? 0.2 : 1,
                  }}
                  type="radio"
                  id="humm"
                  value="humm"
                  checked={radio === "humm"}
                  disabled={userHasRespondedHumm}
                  onChange={(e) => {
                    setRadio(e.target.value);
                    if (!userHasRespondedHumm) {
                      props.whenHummSelected(props.id, "humm");
                    }
                  }}
                />
                <label
                  style={{
                    color: userHasRespondedHumm ? "#FFF57A" : "auto",
                    fontWeight: userHasRespondedHumm ? "bold" : "auto",
                    fontSize: userHasRespondedHumm ? 30 : "auto",
                  }}
                  htmlFor="humm"
                >
                  Humm
                </label>
              </form>
            </div>
            <div
              style={{
                textAlign: "center",
                color: "#E3A9FF",
                fontSize: 20,
                fontFamily: "Arial",
                fontWeight: "400",
                textDecoration: "underline",
                lineHeight: 2,
                wordWrap: "break-word",
              }}
            ></div>
          </div>
        </div>
        <div
          id="eventNameDiv"
          style={{
            fontFamily: "Courier",
            fontSize: isMobile ? 28 : 40,
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "100%",
            color: "#B3FFB1",
          }}
        >
          {props.eventName}
          {/* {props.yeahResponses} */}
          {props.yeahResponses.length}
        </div>
        <div
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: isMobile ? 3 : 12,
            display: "inline-flex",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: isMobile ? 20 : 24,
              fontFamily: "Courier",
              fontWeight: "400",
              lineHeight: isMobile ? 1 : 2,
              wordWrap: "break-word",
            }}
          >
            {formattedTime}
          </div>
          <div
            style={{
              color: "white",
              fontSize: isMobile ? 20 : 24,
              fontFamily: "Courier",
              fontWeight: "400",
              lineHeight: isMobile ? 1 : 2,
              wordWrap: "break-word",
            }}
          >
            @
          </div>
          <div
            style={{
              color: "#E3A9FF",
              fontSize: isMobile ? 20 : 24,
              fontFamily: "Courier",
              fontWeight: "400",
              // textDecoration: "bold",
              lineHeight: isMobile ? 1 : 2,
              wordWrap: "break-word",
            }}
          >
            {props.eventLocation}
          </div>
        </div>
        <div
          id="eventDetailDiv"
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 4,
            display: "flex",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: isMobile ? 20 : 24,
              fontFamily: "Arial",
              fontWeight: "400",
              lineHeight: 1.2,
              wordWrap: "break-word",
            }}
          >
            <Linkify>{props.eventDetail}</Linkify>...
            <a
              // href
              onClick={() => {
                props.whenEventClicked(props.id);
                console.log(props.id);
              }}
              style={{ color: "#E3A9FF" }}
              onMouseOver={(e) => (e.target.style.color = "#B3FFB1")}
              onMouseOut={(e) => (e.target.style.color = "#E3A9FF")}
            >
              more info
            </a>
          </div>
        </div>
        {/* <button
          onClick={() => {
            props.whenEventClicked(props.id);
            console.log(props.id);
          }}
          style={{
            width: 180,
            paddingTop: 20,
            paddingBottom: 20,
            background: "black",
            boxShadow: "6px 6px 6px #E3A9FF",
            border: "2px #E3A9FF solid",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            color: "white",
            cursor: "pointer",
            // display: isHostedByCurrentUser ? "block" : "none",
          }}
          onMouseOver={(e) => (e.target.style.color = "#B3FFB1")}
          onMouseOut={(e) => (e.target.style.color = "#E3A9FF")}
        >
          More Info?
        </button> */}

        <div
          style={{
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
              alt="Profile"
              style={{
                width: 48,
                height: 48,
                background: "linear-gradient(0deg, #D9D9D9 0%, #D9D9D9 100%)",
                borderRadius: 9999,
              }}
              src={props.eventCreatorPhoto}
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
                  fontSize: isMobile ? 10 : 16,
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
                  fontSize: isMobile ? 10 : 16,
                  fontFamily: "Arial",
                  fontWeight: "400",
                  textDecoration: "underline",
                  lineHeight: 2,
                  wordWrap: "break-word",
                }}
              >
                @{props.eventCreatorName}
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
                marginLeft: 4,
                color: "white",
                fontSize: isMobile ? 10 : 16,
                fontFamily: "Arial",
                fontWeight: "400",
                lineHeight: 2,
                wordWrap: "break-word",
              }}
            >
              {publishedAgo} {props.yeahResponses.length} People are going
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Event.propTypes = {
  eventName: PropTypes.string,
  eventDateTime: PropTypes.string,
  eventDetail: PropTypes.string,
  eventLocation: PropTypes.string,
  eventImage: PropTypes.object,
  formattedPostTime: PropTypes.string,
  id: PropTypes.string,
  whenEventClicked: PropTypes.func,
};

//This is the event in the list page
