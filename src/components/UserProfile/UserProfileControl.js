import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../../firebase.js";

export default function AuthProfile() {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
        displayName:
  }).then(() => {
            //Profile Updated
        }).catch((error) => {
      //An error
        });
        
    }
return (
  <>
    <h1>Auth Profile</h1>
  </>);
}
