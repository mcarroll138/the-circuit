import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "./../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

function SignIn() {
  const headerContainerStyles = {
    alignItems: "center",
    backgroundColor: "pink",
    padding: "10px",
  };

  const formStyles = {
    display: "flex",
    flexDirection: "column",
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

  const [signUpSuccess, setSignUpSuccess] = useState(null);


  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignUpSuccess(
          `You've successfully signed up, with the user name of ${userCredential.user.email} as your email address.`
        );
      })
      .catch((error) => {
        signUpSuccess(`There was an error sigining up: ${error.message}!`);
      });
  }

  return (
    <div style={headerContainerStyles}>
      <form onSubmit={doSignUp} style={formStyles}>
        <h1>Sign Up</h1>
        <input
          style={inputStyles}
          type="text"
          name="email"
          placeholder="Email"
        />
        <input
          style={inputStyles}
          type="password"
          name="password"
          placeholder="Password"
        />
        <button type="submit" style={buttonStyles}>
          Sign Up
        </button>
     </form>
    </div>
  );
}

export default SignIn;
