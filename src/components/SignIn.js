import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Redirect } from "react-router";
import { auth } from "./../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import PropTypes from "prop-types";
import SignUpForm from "./UserForms/SignUpForm.js";

function SignIn(props) {
  const navigate = useNavigate();
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
  const [signInSuccess, setSignInSuccess] = useState(null);
  const [signOutSuccess, setSignOutSuccess] = useState(null);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isSignInMode, setIsSignInMode] = useState(true);
  const [isLogOffMode, setIsLogOffMode] = useState(false);
  const [userSignedIn, setUserSignedIn] = useState("");

  const renderSignUpForm = () => {
    if (isSignUpMode) {
      return (
        // <SignUpForm onNewSignUpCreation={doSignIn}/>
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
          <p>
            Return to {"    "}
            <span
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => setIsSignUpMode(false)}
            >
              Sign In
            </span>
          </p>
        </form>
      );
    }
    if (isSignInMode && auth.currentUser != null) {
      return (
        <>
          <p>`your {userSignedIn}, would you like to sign out?`</p>
          <p>
            {" "}
            <button onClick={doSignOut}>Sign out</button>
          </p>
        </>
      );
    } else {
      return (
        <form onSubmit={doSignIn} style={formStyles}>
          {signInSuccess}
          <h1>Sign In</h1>
          <input
            style={inputStyles}
            type="text"
            name="signinEmail"
            placeholder="email"
          />
          <input
            style={inputStyles}
            type="password"
            name="signinPassword"
            placeholder="Password"
          />
          <button type="submit" style={buttonStyles}>
            Sign in
          </button>
          <p>
            Don't have an account?{"    "}
            <span
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => setIsSignUpMode(true)}
            >
              Sign up now
            </span>
          </p>
        </form>
      );
    }
  };

  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLogOffMode(false);
        setIsSignInMode(true);
        setIsSignUpMode(false);
        const userEmail = event.target.email.value;
        setSignUpSuccess(
          `You've successfully signed up, with the user name of ${userCredential.user.email} as your email address.`
        );
      })
      .catch((error) => {
        signUpSuccess(`There was an error sigining up: ${error.message}!`);
      });
  }
  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // navigate("/");
        const signedInUser = userCredential.user.email;
        setSignInSuccess();
        console.log(signedInUser);
        setUserSignedIn(signedInUser);
        setIsSignInMode(false);
        setIsSignUpMode(false);
        setIsLogOffMode(true);
        console.log(signedInUser);

        // `You've successfully signed in as ${email} ${userCredential.user.email}!`
      })
      .catch((error) => {
        setSignInSuccess(`There was an error signing in: ${error.message}!`);
      });
  }
  function doSignOut() {
    signOut(auth)
      .then(function () {
        setIsSignInMode(true);
        setIsLogOffMode(false);
        setIsSignUpMode(false);
        setSignOutSuccess("You have successfully signed out!");
      })
      .catch(function (error) {
        setSignOutSuccess(`There was an error signing out: ${error.message}!`);
      });
  }
  return (
    <div style={headerContainerStyles}>
      {renderSignUpForm()}
      {userSignedIn}
      <h1>Sign Out</h1>
      {signOutSuccess}
      <button onClick={doSignOut}>Sign out</button>
    </div>
  );
}

export default SignIn;
