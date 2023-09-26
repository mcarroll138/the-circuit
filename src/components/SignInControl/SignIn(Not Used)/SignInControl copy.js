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
import SignUpForm from "./SignIn(Not Used)/SignUpForm.js";
import Header from "./Header.js";

function SignInControl(props) {
  const navigate = useNavigate();

  // const headerContainerStyles = {
  //   alignItems: "center",
  //   backgroundColor: "pink",
  //   padding: "10px",
  // };

  // const formStyles = {
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  // };

  // const inputStyles = {
  //   margin: "4px",
  //   padding: "4px",
  //   border: "1px solid #ccc",
  //   borderRadius: "4px",
  //   fontSize: "12px",
  // };

  // const buttonStyles = {
  //   margin: "4px",
  //   padding: "4px 36px",
  //   backgroundColor: "#007bff",
  //   color: "#fff",
  //   border: "none",
  //   borderRadius: "4px",
  //   cursor: "pointer",
  // };

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
        <form onSubmit={doSignUp}>
          <h1>Sign Up</h1>

          <input required type="text" id="email" placeholder="Email" />
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
          />
          <button type="submit">Sign Up</button>
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
    } else {
      return (
        <>
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              background: "black",
            }}
          >
            <form onSubmit={doSignIn}>
              {signInSuccess}

              <h1
                style={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: "courier",
                  fontSize: 40,
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "100%",
                }}
              >
                Sign In
              </h1>
              <input
                style={{
                  width: 412,
                  flexshrink: 0,
                  color: "#999",
                  fontFamily: "arial",
                  fontSize: 24,
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "140%",
                  padding: 24,
                  justifyContent: "center",
                }}
                type="text"
                name="signinEmail"
                placeholder="email"
              />
              <input
                style={{
                  width: 412,
                  flexshrink: 0,
                  color: "#999",
                  fontFamily: "arial",
                  fontSize: 24,
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "140%",
                  padding: 24,
                }}
                type="password"
                name="signinPassword"
                placeholder="Password"
              />
              <button type="submit">Sign in</button>
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
            {/* <div style={{width: 1440, height: 120, left: 0, top: 0, position: 'absolute'}}>
        <div style={{width: 1440, height: 120, left: 0, top: 0, position: 'absolute', background: 'black'}} />
        <div style={{width: 304.94, height: 40, left: 568, top: 40, position: 'absolute'}}>
        <div style={{width: 26.64, height: 39.76, left: 0, top: 0.12, position: 'absolute', background: 'white'}}></div>
        <div style={{width: 23.05, height: 39.76, left: 29.62, top: 0.12, position: 'absolute', background: 'white'}}></div>
        <div style={{width: 23.25, height: 39.75, left: 57.46, top: 0.12, position: 'absolute', background: 'white'}}></div>
        <div style={{width: 25.54, height: 40, left: 111.72, top: 0, position: 'absolute', background: 'white'}}></div>
        <div style={{width: 25.84, height: 39.75, left: 139.55, top: 0.12, position: 'absolute', background: 'white'}}></div>
        <div style={{width: 23.97, height: 39.76, left: 169.58, top: 0.12, position: 'absolute', background: 'white'}}></div>
        <div style={{width: 25.54, height: 40, left: 195.21, top: 0, position: 'absolute', background: 'white'}}></div>
        <div style={{width: 25.29, height: 39.76, left: 223.32, top: 0.12, position: 'absolute', background: 'white'}}></div>
        <div style={{width: 25.84, height: 39.75, left: 250.88, top: 0.12, position: 'absolute', background: 'white'}}></div>
        <div style={{width: 26.63, height: 39.76, left: 278.32, top: 0.12, position: 'absolute', background: 'white'}}></div> */}
          </div>
        </>
      );
    }
  };

  function doSignUp(event) {
    event.preventDefault();
    // const displayName = event.target.displayName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLogOffMode(false);
        setIsSignInMode(true);
        setIsSignUpMode(false);
        // console.log(displayName);
        const userEmail = event.target.email.value;
        setSignUpSuccess(
          `You've successfully signed up, with the user name of as your email address.`
        );
      })
      .catch((error) => {
        setSignUpSuccess(`There was an error sigining up: ${error.message}!`);
      });
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
        // `You've successfully signed in as ${email} ${userCredential.user.email}!`
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
  return <div>{renderSignUpForm()}</div>;
}

export default SignInControl;

SignInControl.propTypes = {
  dosignOut: PropTypes.func,
};
