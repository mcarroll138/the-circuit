import React from "react";
import PropTypes from "prop-types";
import { auth } from "../../firebase.js";
import FriendSvg from "../../assets/people-outline.svg";
import CircuitSvg from "../../assets/Logo.svg";
import { useIsMobile } from "../MobileContext.js";
import Linkify from "../Linkify.js";

export default function EventDetail(props) {
  const {
    event,
    onClickingDelete,
    // formattedTime,
    friendProfiles,
    // formattedDate,
  } = props;

  const dateTimeValue = event.eventDateTime.split("T");
  const dateParts = dateTimeValue[0].split("-");
  const timeParts = dateTimeValue[1].split(":");
  const formattedDate = `${dateParts[1]}.${dateParts[2]}.${dateParts[0]}`;
  const formattedTime = timeFormatAmPm();
  // const publishedAgo = formatDistanceToNow(new Date(props.eventDateTime), {
  //   addSuffix: true,
  // });
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

  const hostDivStyle = {
    background: "white",
    // color: "white",
  };
  const buttonStyles = {
    width: 180,
    height: 20,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 20,
    paddingBottom: 20,
    background: "black",
    boxShadow: "6px 6px 6px #E3A9FF",
    border: "2px #E3A9FF solid",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    color: "white",
  };
  const dateFormat = formattedDate;
  const friendsWhoRespondedYeah = friendProfiles.filter((profile) =>
    event.yeahResponses.includes(profile.uid)
  );
  const friendsWhoRespondedNahh = friendProfiles.filter((profile) =>
    event.nahhResponses.includes(profile.uid)
  );

  const friendsWhoRespondedHumm = friendProfiles.filter((profile) =>
    event.hummResponses.includes(profile.uid)
  );

  // .filter((profile) => profile.uid !== auth.currentUser.uid);

  const isMobile = useIsMobile();
  if (auth.currentUser.email !== event.eventCreator) {
    return (
      <>
        <div
          id="container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center",
            background: "black",
            paddingLeft: "1%",
          }}
        >
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
                  gap: 16,
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
              {event.eventName}
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
                {event.eventLocation}
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
                {event.eventDetail}
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
              <h3>
                RSVPs <br></br>Yeahs!: {event.yeahResponses.length}
                <div
                  style={{
                    // height: 48,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 16,
                    display: "flex",
                  }}
                >
                  {friendsWhoRespondedYeah.map((friend) => (
                    <div key={friend.uid}>
                      <img
                        src={friend.profilePhoto}
                        alt={friend.displayName}
                        style={{
                          width: 48,
                          height: 48,
                          background:
                            "linear-gradient(0deg, #D9D9D9 0%, #D9D9D9 100%)",
                          borderRadius: 9999,
                        }}
                      />
                      {/* <p>{friend.displayName}</p> */}
                    </div>
                  ))}
                </div>{" "}
                Nahhs: {event.nahhResponses.length}{" "}
                <div
                  style={{
                    // height: 48,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 16,
                    display: "flex",
                  }}
                >
                  {friendsWhoRespondedNahh.map((friend) => (
                    <div key={friend.uid}>
                      <img
                        src={friend.profilePhoto}
                        alt={friend.displayName}
                        style={{
                          width: 48,
                          height: 48,
                          background:
                            "linear-gradient(0deg, #D9D9D9 0%, #D9D9D9 100%)",
                          borderRadius: 9999,
                        }}
                      />
                      {/* <p>{friend.displayName}</p> */}
                    </div>
                  ))}
                </div>
                Humm: {event.hummResponses.length}{" "}
                <div
                  style={{
                    // height: 48,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 16,
                    display: "flex",
                  }}
                >
                  {friendsWhoRespondedHumm.map((friend) => (
                    <div key={friend.uid}>
                      <img
                        src={friend.profilePhoto}
                        alt={friend.displayName}
                        style={{
                          width: 48,
                          height: 48,
                          background:
                            "linear-gradient(0deg, #D9D9D9 0%, #D9D9D9 100%)",
                          borderRadius: 9999,
                        }}
                      />
                      {/* <p>{friend.displayName}</p> */}
                    </div>
                  ))}
                </div>{" "}
              </h3>
              
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
                  alt="Profile"
                  style={{
                    width: 48,
                    height: 48,
                    background:
                      "linear-gradient(0deg, #D9D9D9 0%, #D9D9D9 100%)",
                    borderRadius: 9999,
                  }}
                  src={event.eventCreatorPhoto}
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
                      // textDecoration: "underline",
                      lineHeight: 2,
                      wordWrap: "break-word",
                    }}
                  >
                    {event.eventCreatorName}
                  </div>
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
                Posted {props.formattedPostTime}X days ago
              </div>
            </div>
          </div>
        </div>

        {/* <div style={hostDivStyle}>
          <h1>{event.eventName}</h1>
          <h3>Hosted By {event.eventCreatorName}</h3>

          <h3>{event.formattedPostTime}</h3>
          <h3>{event.eventDetail}</h3>
          <h3>{event.eventLocation}</h3>
          <h3> {event.eventImage}</h3>
          <h3>
            RSVPs <br></br>Yeahs! :{event.yeahResponses.length}
            <div
              style={{
                // height: 48,
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 16,
                display: "flex",
              }}
            >
              {friendsWhoRespondedYeah.map((friend) => (
                <div key={friend.uid}>
                  <img
                    src={friend.profilePhoto}
                    alt={friend.displayName}
                    style={{
                      width: 48,
                      height: 48,
                      background:
                        "linear-gradient(0deg, #D9D9D9 0%, #D9D9D9 100%)",
                      borderRadius: 9999,
                    }}
                  />
                  <p>{friend.displayName}</p>
                </div>
              ))}
            </div>{" "}
            <br></br>Nahhs: {event.nahhResponses.length} <br></br>Humm:{" "}
            {event.hummResponses.length}
          </h3>

          <button style={buttonStyles} onClick={props.onClickingEdit}>
            Edit Event
          </button>
          <button
            style={buttonStyles}
            onClick={() => onClickingDelete(event.id)}
          >
            Delete Event
          </button>
          <hr />
        </div> */}
      </>
    );
  } else {
    return (
      <>
        <div
          id="container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center",
            background: "black",
            // paddingLeft: 20,
          }}
        >
          <div
            id="eventCard"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // justifyContent: "flex-start",
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
                    display: props.isHostedByCurrentUser ? "none" : "block",
                  }}
                ></div>
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
              {event.eventName}

              {/* {event.yeahResponses.length} */}
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
                {event.eventLocation}
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
                <Linkify>{event.eventDetail}</Linkify>...
              </div>
            </div>

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
                    background:
                      "linear-gradient(0deg, #D9D9D9 0%, #D9D9D9 100%)",
                    borderRadius: 9999,
                  }}
                  src={event.eventCreatorPhoto}
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
                    @{event.eventCreatorName}
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
                  {/* {props.publishedAgo} {props.yeahResponses.length} People are */}
                  going
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      // <>
      //   <div
      //     id="eventCard"
      //     style={{
      //       display: "inline-flex",
      //       flexDirection: "column",
      //       alignItems: "flex-start",
      //       justifyContent: "flex-start",
      //       gap: 20,
      //       width: 500,
      //       padding: "5%",
      //       background: "black",
      //       boxShadow: "6px 6px 0px white",
      //       borderRadius: 24,
      //       border: "2px white solid",
      //     }}
      //   >
      //     <div
      //       id="dateAndResponseDiv"
      //       style={{
      //         height: 22,
      //         justifyContent: "space-between",
      //         display: "inline-flex",
      //       }}
      //     >
      //       <div
      //         id="dateDisplay"
      //         style={{
      //           color: "white",
      //           fontFamily: "Courier",
      //           fontSize: "24px",
      //           fontWeight: "400",
      //           lineHeight: "100%",
      //           textTransform: "uppercase",
      //           wordWrap: "break-word",
      //           paddingRight: "30%",
      //         }}
      //       >
      //         {event.eventDateTime}
      //       </div>
      //       <div
      //         style={{
      //           justifyContent: "right",
      //           alignItems: "center",
      //           gap: 16,
      //           display: "flex",
      //         }}
      //       >
      //         <div
      //           style={{
      //             textAlign: "center",
      //             color: "#E3A9FF",
      //             fontSize: 20,
      //             fontFamily: "Arial",
      //             fontWeight: "400",
      //             textDecoration: "underline",
      //             lineHeight: 2,
      //             wordWrap: "break-word",
      //           }}
      //         >
      //           Yeah!
      //         </div>
      //         <div
      //           style={{
      //             textAlign: "center",
      //             color: "#E3A9FF",
      //             fontSize: 20,
      //             fontFamily: "Arial",
      //             fontWeight: "400",
      //             textDecoration: "underline",
      //             lineHeight: 2,
      //             wordWrap: "break-word",
      //           }}
      //         ></div>
      //         <div
      //           style={{
      //             textAlign: "center",
      //             color: "#E3A9FF",
      //             fontSize: 20,
      //             fontFamily: "Arial",
      //             fontWeight: "400",
      //             textDecoration: "underline",
      //             lineHeight: 2,
      //             wordWrap: "break-word",
      //           }}
      //         >
      //           Nahh
      //         </div>
      //         <div
      //           style={{
      //             textAlign: "center",
      //             color: "#E3A9FF",
      //             fontSize: 20,
      //             fontFamily: "Arial",
      //             fontWeight: "400",
      //             textDecoration: "underline",
      //             lineHeight: 2,
      //             wordWrap: "break-word",
      //           }}
      //         >
      //           Humm
      //         </div>
      //       </div>
      //     </div>
      //     <div
      //       id="eventNameDiv"
      //       style={{
      //         fontFamily: "Courier",
      //         fontSize: "40px",
      //         fontStyle: "normal",
      //         fontWeight: "400",
      //         lineHeight: "100%",
      //         color: "#B3FFB1",
      //       }}
      //     >
      //       {event.eventName}
      //     </div>
      //     <div
      //       style={{
      //         justifyContent: "flex-start",
      //         alignItems: "flex-start",
      //         gap: 12,
      //         display: "inline-flex",
      //       }}
      //     >
      //       <div
      //         style={{
      //           color: "white",
      //           fontSize: 24,
      //           fontFamily: "Courier",
      //           fontWeight: "400",
      //           lineHeight: 2,
      //           wordWrap: "break-word",
      //         }}
      //       >
      //         {/* {formattedTime} */}
      //       </div>
      //       <div
      //         style={{
      //           color: "white",
      //           fontSize: 24,
      //           fontFamily: "Courier",
      //           fontWeight: "400",
      //           lineHeight: 2,
      //           wordWrap: "break-word",
      //         }}
      //       >
      //         @
      //       </div>
      //       <div
      //         style={{
      //           color: "#E3A9FF",
      //           fontSize: 24,
      //           fontFamily: "Courier",
      //           fontWeight: "400",
      //           textDecoration: "underline",
      //           lineHeight: 2,
      //           wordWrap: "break-word",
      //         }}
      //       >
      //         {event.eventLocation}
      //       </div>
      //     </div>
      //     <div
      //       id="eventDetailDiv"
      //       style={{
      //         flexDirection: "column",
      //         justifyContent: "flex-start",
      //         alignItems: "flex-start",
      //         gap: 4,
      //         display: "flex",
      //       }}
      //     >
      //       <div
      //         style={{
      //           color: "white",
      //           fontSize: 24,
      //           fontFamily: "Arial",
      //           fontWeight: "400",
      //           lineHeight: 1.2,
      //           wordWrap: "break-word",
      //         }}
      //       >
      //         {event.eventDetail}
      //       </div>
      //     </div>
      //     <div
      //       onClick={() => props.whenEventClicked(props.id)}
      //       style={{
      //         width: 604,
      //         color: "#E3A9FF",
      //         fontSize: 16,
      //         fontFamily: "Arial",
      //         fontWeight: "400",
      //         textDecoration: "underline",
      //         lineHeight: 2,
      //         wordWrap: "break-word",
      //         cursor: "pointer",
      //       }}
      //       onMouseOver={(e) => (e.target.style.color = "#B3FFB1")}
      //       onMouseOut={(e) => (e.target.style.color = "#E3A9FF")}
      //     >
      //       Read more
      //     </div>
      //     <div
      //       style={{
      //         color: "#B3FFB1",
      //         fontSize: 16,
      //         fontFamily: "Arial",
      //         fontWeight: "400",
      //         lineHeight: 2,
      //         wordWrap: "break-word",
      //       }}
      //     >
      //       X close friends are a yeah!
      //     </div>
      //     <div
      //       style={{
      //         width: 604,
      //         justifyContent: "space-between",
      //         alignItems: "center",
      //         display: "inline-flex",
      //       }}
      //     >
      //       <div
      //         style={{
      //           height: 48,
      //           justifyContent: "flex-start",
      //           alignItems: "center",
      //           gap: 16,
      //           display: "flex",
      //         }}
      //       >
      //         <img
      //           alt="Profile"
      //           style={{
      //             width: 48,
      //             height: 48,
      //             background: "linear-gradient(0deg, #D9D9D9 0%, #D9D9D9 100%)",
      //             borderRadius: 9999,
      //           }}
      //           src={props.eventCreatorPhoto}
      //         />

      //         <div
      //           style={{
      //             justifyContent: "flex-start",
      //             alignItems: "center",
      //             gap: 4,
      //             display: "flex",
      //           }}
      //         >
      //           <div
      //             style={{
      //               color: "white",
      //               fontSize: 16,
      //               fontFamily: "Arial",
      //               fontWeight: "400",
      //               lineHeight: 2,
      //               wordWrap: "break-word",
      //             }}
      //           >
      //             Hosted by
      //           </div>
      //           <div
      //             style={{
      //               color: "#E3A9FF",
      //               fontSize: 16,
      //               fontFamily: "Arial",
      //               fontWeight: "400",
      //               textDecoration: "underline",
      //               lineHeight: 2,
      //               wordWrap: "break-word",
      //             }}
      //           >
      //             @{props.eventCreator}
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //     <div
      //       style={{
      //         justifyContent: "flex-start",
      //         alignItems: "flex-start",
      //         gap: 16,
      //         display: "flex",
      //       }}
      //     >
      //       <div
      //         style={{
      //           color: "#999999",
      //           fontSize: 16,
      //           fontFamily: "Arial",
      //           fontWeight: "400",
      //           lineHeight: 2,
      //           wordWrap: "break-word",
      //         }}
      //       >
      //         Posted {props.formattedPostTime}X days ago
      //       </div>
      //     </div>
      //   </div>
      // </>
    );
  }
}
EventDetail.propTypes = {
  event: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
  friendProfiles: PropTypes.array,
};
