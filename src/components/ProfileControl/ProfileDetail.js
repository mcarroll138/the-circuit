import React from "react";
import PropTypes from "prop-types";

export default function ProfileDetail(props) {
  const { profile, onClickingDelete } = props;
  return (
    <>
      <h1>Profile Details</h1>
      <h3>{profile.userProfile}</h3>
      <h3>{profile.firstName}</h3>
      <h3>{profile.lastName}</h3>
      <h3>{profile.birthdate}</h3>
      <h3>{profile.privateProfile}</h3>
      <button onClick={props.onClickingEdit}>Edit Profile</button>
      <button onClick={() => onClickingDelete(profile.id)}>
        Delete Profile
      </button>
      <hr />
    </>
  );
}

ProfileDetail.propTypes = {
  profile: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
};
