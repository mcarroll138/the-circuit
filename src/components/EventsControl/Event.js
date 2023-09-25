import React from "react";
import PropTypes from "prop-types";

export default function Event(props) {
  const dateTimeValue = props.eventDateTime.split("T");
  const dateParts = dateTimeValue[0].split("-");
  const timeParts = dateTimeValue[1].split(":");

  const formattedDate = `${dateParts[1]}.${dateParts[2]}.${dateParts[0]}`;
  // const formattedTime = `${timeParts[0]}:${timeParts[0]}`;

  const formattedTime = timeFormatAmPm();

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
  console.log(formattedTime);
  console.log(formattedDate);
  return (
    <>
      <div onClick={() => props.whenEventClicked(props.id)}>
        <h3>{props.eventCreator}</h3>
        <h3>{props.eventName}</h3>
        <h3>
          {props.eventDateTime}
          {formattedDate} {formattedTime}
        </h3>
        <h3>{props.eventDetail}</h3>
        <h3>{props.eventLocation}</h3>
        <h3>{props.eventImage}</h3>
        <hr />
      </div>

      <div
        id="card"
        style={{
          width: "90%",
          height: "100%",
          padding: 40,
          background: "black",
          boxShadow: "6px 6px 0px white",
          borderRadius: 24,
          border: "2px white solid",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 20,
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
            {formattedDate}
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
            <a
              href={props.eventLocation}
              target="_blank"
              rel="noopener noreferrer"
            >
              Location
            </a>
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
            Event description goes here. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
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
                background: "linear-gradient(0deg, #D9D9D9 0%, #D9D9D9 100%)",
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
          id="editEventDiv"
          style={{
            width: 100,
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
            id="editEvent"
            style={{
              textAlign: "center",
              color: "#E3A9FF",
              fontSize: 14,
              fontFamily: "Courier",
              fontWeight: "40",
              textTransform: "uppercase",
              lineHeight: 2,
              wordWrap: "break-word",
            }}
          >
            edit event
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
  id: PropTypes.string,
  whenEventClicked: PropTypes.func,
};

//This is the event in the list page
