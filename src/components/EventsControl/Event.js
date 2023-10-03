import React from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import { auth } from "../../firebase.js";
import Linkify from "../Linkify";

export default function Event(props) {
  const isHostedByCurrentUser = auth.currentUser.email === props.eventCreator;
  const notHostedByCurrentUser = auth.currentUser.email !== props.eventCreator;
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
          gap: 20,
          width: 500,
          padding: "5%",
          background: "black",
          boxShadow: "6px 6px 0px white",
          borderRadius: 24,
          border: "2px white solid",
        }}
      >
        <div
          id="dateAndResponseDiv"
          style={{
            height: 22,
            justifyContent: "space-between",
            display: "inline-flex",
          }}
        >
          <div
            id="dateDisplay"
            style={{
              color: "white",
              fontFamily: "Courier",
              fontSize: "24px",
              fontWeight: "400",
              lineHeight: "100%",
              textTransform: "uppercase",
              wordWrap: "break-word",
              paddingRight: "30%",
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
            >
              Yeah!
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
            <div
              style={{
                paddingLeft: 20,
                textAlign: "center",
                color: "#E3A9FF",
                fontSize: 20,
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
                paddingLeft: 20,
                textAlign: "center",
                color: "#E3A9FF",
                fontSize: 20,
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
          id="eventNameDiv"
          style={{
            fontFamily: "Courier",
            fontSize: "40px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "100%",
            color: "#B3FFB1",
          }}
        >
          {props.eventName}
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
            {formattedTime}
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
              fontSize: 24,
              fontFamily: "Arial",
              fontWeight: "400",
              lineHeight: 1.2,
              wordWrap: "break-word",
            }}
            
          >
            <Linkify>{props.eventDetail}</Linkify>
          </div>
        </div>
        <button
          onClick={() => props.whenEventClicked(props.id)}
          style={{
            width: 180,
            // height: 20,
            // paddingLeft: 24,
            // paddingRight: 24,
            paddingTop: 20,
            paddingBottom: 20,
            background: "black",
            boxShadow: "6px 6px 6px #E3A9FF",
            border: "2px #E3A9FF solid",
            // display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            color: "white",
            cursor: "pointer",
            display: isHostedByCurrentUser ? "block" : "none",
          }}
          onMouseOver={(e) => (e.target.style.color = "#B3FFB1")}
          onMouseOut={(e) => (e.target.style.color = "#E3A9FF")}
        >
          Change Event?
        </button>

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
                fontSize: 16,
                fontFamily: "Arial",
                fontWeight: "400",
                lineHeight: 2,
                wordWrap: "break-word",
              }}
            >
              {publishedAgo}
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
