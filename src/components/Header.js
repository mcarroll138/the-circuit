import React from "react";
import { Link } from "react-router-dom";

function Header() {
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

  return (
    <div style={headerContainerStyles}>
      <h2>⚡️ The Circuit ⚡️</h2>
      <form style={formStyles}>
        <input style={inputStyles} type="text" placeholder="Email" />
        <input style={inputStyles} type="password" placeholder="Password" />
        <button style={buttonStyles}>Login</button>
        <button style={buttonRegister}>Register</button>
      </form>
    </div>
  );
}

export default Header;
