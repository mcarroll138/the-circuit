import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { serverTimestamp } from "firebase/firestore";
import { auth } from "../../firebase.js";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const style = {
  container: {
      width: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      fontFamily: 'inherit'
  },
  fullWidth: {
      width: '100%',
      fontFamily: 'inherit',
      boxSizing: 'border-box'
  },
  fullLabel: {
      width: '100%',
      boxSizing: 'border-box',
      fontFamily: 'inherit'
  },
  halfLabel: {
      width: '49%',
      boxSizing: 'border-box',
      fontFamily: 'inherit'
  },
  button: {
      width: '100%',
      fontFamily: 'inherit',
      boxSizing: 'border-box'
  }
}

const EditEventForm = ({ placesKey, inputId, setAddress, required }) => {
  //input state
  const [input, setInput] = useState("");
  const [addressName, setAddressName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postCode, setPostCode] = useState("");
  const [formattedAddress, setFormattedAddress] = useState("");

  //functionally clear all state
  const clear = (e) => {
    if (e) e.preventDefault();
    setInput("");
    setAddressName("");
    setStreet("");
    setCity("");
    setCountry("");
    setPostCode("");
    setFormattedAddress("");
  };

  //on mount, load google auto complete
  useEffect(() => {
    const renderGoogle = () => {
      window[inputId] = new window.google.maps.places.Autocomplete(
        document.getElementById(inputId),
        {}
      );
      const handlePlaceSelect = () => {
        const place = window[inputId].getPlace();
        clear();
        setFormattedAddress(place.formatted_address);
        for (const component of place.address_components) {
          const type = component.types[0];
          switch (type) {
            case "street_number":
              setAddressName(component.long_name);
              break;
            case "premise":
              addressName === ""
                ? setAddressName(component.long_name)
                : setAddressName(component.long_name + ", " + addressName);
              break;
            case "route":
              setStreet(component.long_name);
              break;
            case "postal_town":
              setCity(component.long_name);
              break;
            case "administrative_area_level_2":
              city === "" && component.long_name === "Greater London"
                ? setCity("London")
                : setCity(component.long_name);
              break;
            case "neighborhood":
              if (city === "") setCity(component.long_name);
              break;
            case "country":
              setCountry(component.long_name);
              break;
            case "postal_code":
              setPostCode(component.long_name);
              break;
            default:
              console.log("irrelevant component type");
              break;
          }
        }
      };

      //listen for place change in input field
      window[inputId].addListener("place_changed", handlePlaceSelect);
    };

    //if places script is already found then listen for load and then renderGoogle
    let found = document.getElementById("placesScript") ? true : false;
    if (!found) {
      const script = document.createElement("script");
      script.id = "placesScript";
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=" +
        placesKey +
        "&libraries=places";
      script.async = true;
      script.onload = () => renderGoogle();
      document.body.appendChild(script);
    }
    if (found) {
      document
        .getElementById("placesScript")
        .addEventListener("load", renderGoogle);
    }
  }, [placesKey, inputId, addressName, city]);

  //return address object to parent for your use case
  useEffect(() => {
    const addressObject = {
      formattedAddress: formattedAddress,
      addressName: addressName,
      street: street,
      city: city,
      country: country,
      postCode: postCode,
    };
    setAddress(addressObject);
  }, [
    formattedAddress,
    addressName,
    street,
    city,
    country,
    postCode,
    setAddress,
  ]);

  //listen for mobile screen size
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const screenSize = (e) => {
      const w = e.target.innerWidth;
      w < 600 ? setMobile(true) : setMobile(false);
    };
    window.addEventListener("resize", screenSize);
  }, []);

  return (
    <div style={style.container}>
      <label style={style.fullLabel}>
        Location Search:
        <input
          id={inputId}
          type="text"
          style={style.fullWidth}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </label>
      <label style={!mobile ? style.halfLabel : style.fullLabel}>
        Number or House Name:
        <input
          id="addressName"
          type="text"
          style={style.fullWidth}
          value={addressName || ""}
          onChange={(e) => setAddressName(e.target.value)}
          required={required && required}
        />
      </label>
      <label style={!mobile ? style.halfLabel : style.fullLabel}>
        Street:
        <input
          id="street"
          type="text"
          style={style.fullWidth}
          value={street || ""}
          onChange={(e) => setStreet(e.target.value)}
        />
      </label>
      <label style={!mobile ? style.halfLabel : style.fullLabel}>
        City:
        <input
          id="city"
          type="text"
          style={style.fullWidth}
          value={city || ""}
          onChange={(e) => setCity(e.target.value)}
          required={required && required}
        />
      </label>
      <label style={!mobile ? style.halfLabel : style.fullLabel}>
        Country:
        <input
          id="country"
          type="text"
          style={style.fullWidth}
          value={country || ""}
          onChange={(e) => setCountry(e.target.value)}
          required={required && required}
        />
      </label>
      <label style={!mobile ? style.halfLabel : style.fullLabel}>
        Post Code:
        <input
          id="postCode"
          type="text"
          style={style.fullWidth}
          value={postCode || ""}
          onChange={(e) => setPostCode(e.target.value)}
          required={required && required}
        />
      </label>
      <button style={style.button} onClick={(e) => clear(e)}>
        Clear Address
      </button>
    </div>
  );
};

export default EditEventForm;
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
