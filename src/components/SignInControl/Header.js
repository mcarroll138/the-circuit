import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.js";
import { signOut } from "firebase/auth";

function Header() {
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        console.log(auth.currentUser.displayName);
        console.log(auth.currentUser.email);
      } else {
        setUserEmail(null);
      }
    });
    return () => unsubscribe();
  }, []);
  const headerContainerStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "pink",
    padding: "10px",
  };

  const formStyles = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };
  const imgStyle = {
    objectFit: "cover",
    boarderRadius: "50%",
    height: "50px",
    width: "50px",
    borderRadius: "50%",
  };

  const buttonStyles = {
    margin: "4px",
    padding: "4px 36px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  function doSignOut(props) {
    signOut(auth);
    navigate("/sign-in");
  }
  if (userEmail !== null)
    return (
      <div style={headerContainerStyles}>
        <h2>⚡️ The Circuit ⚡️</h2>

        <form style={formStyles}>
          {/* {auth.currentUser.displayName} */}
          <button onClick={doSignOut} style={buttonStyles}>
            Sign out
          </button>
          <Link to="/">
            <button style={buttonStyles}>Events</button>
          </Link>
          <Link to="/profile">
            <button style={buttonStyles}>Friends</button>
          </Link>
          <Link to="/user-profile">
            <button style={buttonStyles}>My Profile</button>
          </Link>

          <img style={imgStyle} src={auth.currentUser.photoURL}></img>
        </form>
      </div>
    );
  else if (userEmail === null)
    return (
      <div style={headerContainerStyles}>
        <h2>⚡️ The Circuit ⚡️</h2>
        {/* {email} */}
        <form style={formStyles}>
          {/* <Link to="/">
            <button style={buttonStyles}>Home</button>
          </Link> */}

          <Link to="/sign-in">
            <button style={buttonStyles}>Sign In</button>
          </Link>

          {/* <Link to="/profile">
            <button style={buttonStyles}>MyProfile</button>
          </Link> */}
        </form>
      </div>
    );
}

export default Header;
