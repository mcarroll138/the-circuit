import React from "react";
import PropTypes from "prop-types";

export default function Profile(props) {
  return (
    <>
      <div onClick={() => props.whenProfileClicked(props.id)}>
        <h3>{props.userProfile}</h3>
        <h3>{props.firstName}</h3>
        <h3>{props.lastName}</h3>
        <h3>{props.birthdate}</h3>
        <hr />
      </div>
    </>
  );
}

Profile.propTypes = {
  userProfile: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  birthdate: PropTypes.string,
  id: PropTypes.string,
  whenProfileClicked: PropTypes.func,
};
