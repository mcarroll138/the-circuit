import React from "react";
import Profile from "./Profile.js";
import PropTypes from "prop-types";
import { auth } from "../../firebase.js";

export default function ProfileList(props) {
  return (
    <React.Fragment>
      <hr />

      {filteredProfiles.map((profile) => (
        <Profile
          whenProfileClicked={props.onProfileSelection}
          userProfile={profile.userProfile}
          firstName={profile.firstName}
          lastName={profile.lastName}
          birthdate={profile.birthdate}
          id={profile.id}
          key={profile.id}
        />
      ))}
    </React.Fragment>
  );
}

ProfileList.propTypes = {
  profileList: PropTypes.array,
  onProfileSelection: PropTypes.func,
};
