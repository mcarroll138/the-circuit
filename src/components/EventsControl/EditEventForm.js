// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import { serverTimestamp } from "firebase/firestore";
// import { auth } from "../../firebase.js";

// export default function EditEventForm(props) {
//     const { event } = props;
//   const [eventName, setEventName] = useState("");
//   const [eventDateTime, setEventDateTime] = useState("");
//   const [eventDetail, setEventDetail] = useState("");
//   const [eventLocation, setEventLocation] = useState("");
//   const formDivStyles = {
//     backgroundColor: "black",
//     display: "flex",
//     justifyContent: "center",
//     color: "white",
//     fontSize: 20,
//     fontFamily: "courier",
//     fontWeight: "400",

//     backgroundColor: "black",
//     padding: "10px",
//     height: 720,
//   };

//   const formStyles = {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     paddingTop: 25,
//   };

//   const inputStyles = {
//     margin: "4px",
//     padding: "4px",
//     border: "12px solid #ccc",
//     borderRadius: "4px",
//     fontSize: "12px",
//     width: 380,
//   };

//   const buttonStyles = {
//     width: 180,
//     height: 20,
//     paddingLeft: 24,
//     paddingRight: 24,
//     paddingTop: 20,
//     paddingBottom: 20,
//     background: "black",
//     boxShadow: "6px 6px 6px #E3A9FF",
//     border: "2px #E3A9FF solid",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 10,
//     color: "white",
//   };

//   useEffect(() => {
//     if (event) {
//       setEventName(props.eventName || "");
//       setEventDateTime(props.eventDateTime || "");
//       setEventDetail(props.eventDetail || "");
//       setEventLocation(props.eventLocation || "");
//     }
//   }, [props]);

//   function handleEditEventFormSubmission(event) {
//     console.log("Event Id", event.id);
//     event.preventDefault();
//     props.onEditEvent({
//       eventCreator: event.target.eventCreator.value,
//       eventCreatorName: event.target.eventCreatorName.value,
//       eventCreatorPhoto: event.target.eventCreatorPhoto.value,
//       publicPrivate: event.target.publicPrivate.value,
//       eventName: event.target.eventName.value,
//       eventDateTime: event.target.eventDateTime.value,
//       eventDetail: event.target.eventDetail.value,
//       eventLocation: event.target.eventLocation.value,
//       // daysAgo: daysAgo,
//       timeOpen: serverTimestamp(),
//     });
//   }

//   return (
//     <>
//       <form onSubmit={handleEditEventFormSubmission}>
//         <input
//           style={inputStyles}
//           type="hidden"
//           name="eventCreator"
//           value={auth.currentUser.email}
//         />
//         <input
//           style={inputStyles}
//           type="hidden"
//           name="eventCreatorName"
//           value={auth.currentUser.displayName}
//         />
//         <input
//           style={inputStyles}
//           type="hidden"
//           name="eventCreatorPhoto"
//           value={auth.currentUser.photoURL}
//         />
//         <input
//           style={inputStyles}
//           type="hidden"
//           name="publicPrivate"
//           value="public"
//         />
//         <input
//           style={inputStyles}
//           required
//           type="text"
//           name="eventName"
//           placeholder="Event Name"
//         />
//         <input
//           style={inputStyles}
//           required
//           type="datetime-local"
//           name="eventDateTime"
//           placeholder="Date/Time"
//         />
//         <input
//           style={inputStyles}
//           required
//           type="text"
//           rows="5"
//           name="eventDetail"
//           placeholder="Event Details"
//         />
//         <input
//           style={inputStyles}
//           // required
//           type="text"
//           name="eventLocation"
//           placeholder="Location"
//         />
//         <button type="submit">Update Event</button>
//       </form>
//     </>
//   );
// }

// EditEventForm.propTypes = {
//   event: PropTypes.object,
//   onEditEvent: PropTypes.func,
// };
