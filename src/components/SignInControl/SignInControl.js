import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Redirect } from "react-router";
import { auth } from "../../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import PropTypes from "prop-types";

import Header from "./Header.js";

function SignInControl(props) {
  const navigate = useNavigate();

  const headerContainerStyles = {
    color: "white",
    fontSize: 20,
    fontFamily: "courier",
    fontWeight: "400",
    alignItems: "center",
    backgroundColor: "black",
    padding: "10px",
    height: 720,
  };

  const formStyles = {
    display: "flex",
    padding: "20px 24px",
    flexDirection: "column",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "black",
  };

  const inputStyles = {
    color: "gray",
    fontFamily: "arial",
    fontSize: "14px",
    fontStyle: "normal",
    backgroundColor: "black",
    width: "300px",
    gap: "2px",
    margin: "4px",
    padding: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };
  const noAccount = {
    color: "white",
    fontSize: "10",
    fontFamily: "arial",
  };
  const buttonStyles = {
    margin: "4px",
    padding: "10px 36px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    border: "1px solid white",
    cursor: "pointer",
    fontSize: "16px",
  };

  const [signUpSuccess, setSignUpSuccess] = useState(null);
  const [signInSuccess, setSignInSuccess] = useState(null);
  const [signOutSuccess, setSignOutSuccess] = useState(null);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isSignInMode, setIsSignInMode] = useState(true);
  const [isLogOffMode, setIsLogOffMode] = useState(false);
  const [userSignedIn, setUserSignedIn] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const renderSignUpForm = () => {
    if (isSignUpMode) {
      return (
        <form onSubmit={doSignUp} style={formStyles}>
          {signUpSuccess}
          <h1>Sign Up</h1>

          <input
            required
            style={inputStyles}
            type="text"
            id="email"
            placeholder="Email"
          />
          <input
            required
            style={inputStyles}
            type="password"
            name="password"
            placeholder="Password"
          />
          <input
            required
            style={inputStyles}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {passwordMismatch && (
            <p style={{ color: "red" }}>Passwords do not match</p>
          )}

          <button type="submit" style={buttonStyles}>
            Sign Up
          </button>
          <p style={noAccount}>
            Return to {"    "}
            <span
              style={{
                color: "gray",
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
    } else {
      return (
        <form onSubmit={doSignIn} style={formStyles}>
          {signInSuccess}
          <h1>Sign In</h1>
          <input
            style={inputStyles}
            type="text"
            name="signinEmail"
            placeholder="Email"
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
          <p style={noAccount}>
            Don't have an account?{"    "}
            <span
              style={{
                color: "grey",
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

    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigate("/user-profile");
          setSignUpSuccess(
            `You've successfully signed up, with the user name of as your email address.`
          );
        })
        .catch((error) => {
          setSignUpSuccess(`There was an error sigining up: ${error.message}!`);
        });
    } else {
      setPasswordMismatch(true);
    }
  }

  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const signedInUser = userCredential.user.email;
        setSignInSuccess();
        setUserSignedIn(signedInUser);
        setIsSignInMode(false);
        setIsSignUpMode(false);
        setIsLogOffMode(true);
        navigate("/");
      })
      .catch((error) => {
        setSignInSuccess(`There was an error signing in: ${error.message}!`);
      });
  }
  function doSignOut(props) {
    signOut(auth)
      .then(function () {
        setIsSignInMode(true);
        setIsLogOffMode(false);
        setIsSignUpMode(false);
        navigate("sign-in");
        setSignOutSuccess("You have successfully signed out!");
      })
      .catch(function (error) {
        setSignOutSuccess(`There was an error signing out: ${error.message}!`);
      });
  }
  return <div style={headerContainerStyles}>{renderSignUpForm()}</div>;
}

export default SignInControl;

SignInControl.propTypes = {
  dosignOut: PropTypes.func,
};
