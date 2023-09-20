import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
function Header() {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
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

  const inputStyles = {
    margin: "4px",
    padding: "4px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "12px",
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

  const buttonRegister = {
    margin: "4px",
    padding: "4px 36px",
    backgroundColor: "yellow",
    color: "black",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };
  function doSignOut(props) {
    signOut(auth);
  }
  if (userEmail !== null)
    return (
      <div style={headerContainerStyles}>
        <h1>⚡️ The Circuit ⚡️</h1>
        {/* {email} */}
        <form style={formStyles}>
          Logged in as {userEmail}
          <button onClick={doSignOut} style={buttonStyles}>
            Sign out
          </button>
          <Link to="/">
            <button style={buttonStyles}>Home</button>
          </Link>
          <Link to="/profile">
            <button style={buttonStyles}>MyProfile</button>
          </Link>
        </form>
      </div>
    );
  else if (userEmail === null)
    return (
      <div style={headerContainerStyles}>
        <h2>⚡️ The Circuit ⚡️</h2>
        {/* {email} */}
        <form style={formStyles}>
          <Link to="/">
            <button style={buttonStyles}>Home</button>
          </Link>

          <Link to="/sign-in">
            <button style={buttonStyles}>Sign In</button>
          </Link>

          <Link to="/profile">
            <button style={buttonStyles}>MyProfile</button>
          </Link>
        </form>
      </div>
    );
}

export default Header;