import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { serverTimestamp } from "firebase/firestore";
import { auth } from "../../firebase.js";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

export default function EditEventForm() {
  // const AutoFill = () => {
  const [address, setAddress] = useState("");
  console.log(address);
  const handleChange = (value) => {
    setAddress(value);
  };

  const handleSelect = (value) => {
    setAddress(value);
  };

  return (
    <div>
      <GooglePlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeHolder: "Enter Address",
              })}
            />
            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const style = suggestion.active
                  ? { backgroundColor: "red", cursor: "pointer" }
                  : { backgroundColor: "white", cursor: "pointer" };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </GooglePlacesAutocomplete>
    </div>
  );
}

//   const { event } = props;

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
//       setEventName(event.eventName || "");
//       setEventDateTime(event.eventDateTime || "");
//       setEventDetail(event.eventDetail || "");
//       setEventLocation(event.eventLocation || "");
//     }
//   }, [event]);

//   function handleEditEventFormSubmission(event) {
//     console.log("Event Id", event.id);
//     event.preventDefault();
//     props.onEditEvent({
//       eventCreator: event.target.eventCreator.value,
//       eventCreatorPhoto: event.target.eventCreatorPhoto.value,
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
//           name="eventCreatorPhoto"
//           value={auth.currentUser.photoURL}
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
//           type="datetime-local"
//           name="eventDateTime"
//           placeholder="Date/Time"
//         />

//         <input
//           style={inputStyles}
//           type="text"
//           name="eventDetail"
//           placeholder="Event Details"
//         />
//         <input
//           style={inputStyles}
//           type="text"
//           name="eventLocation"
//           placeholder="Google Map Link"
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
