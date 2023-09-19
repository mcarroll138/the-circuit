import React, { useState } from "react";
import PropTypes from "prop-types";

export default function SignUpForm(props) {
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

  function handleNewSignUpFormSubmission(event) {
    event.preventDefault();

    props.onNewSignUpCreation({
      email: event.target.email.value,
    });
  }
  return (
    <>
      <form onSubmit={handleNewSignUpFormSubmission} style={formStyles}>
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
    </>
  );
}

SignUpForm.propTypes = {
  onNewSignUpCreation: PropTypes.func,
};
