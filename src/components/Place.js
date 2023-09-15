import React from "react";
import PropTypes from "prop-types";

export default function Place(props) {
    return (
        <>
      <h3>Place:</h3>
      <h3>{props.placeName}</h3>
      <h3>{props.placeTime}</h3>
      <h3>{props.placeDate}</h3>
      <h3>{props.placeLocation}</h3>
    </>
  );
}

Place.propTypes = {
    placeName: PropTypes.string.isRequired,
    placeTime: PropTypes.string.isRequired,
    placeDate: PropTypes.string.isRequired,
    placeLocation: PropTypes.string.isRequired
};