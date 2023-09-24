import React from "react";
import { Link } from "react-router-dom";

export default function AddEventButton({ to }) {
  return (
    <div
      style={{
        width: 180,
        height: 20,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 20,
        paddingBottom: 20,
        background: "black",
        boxShadow: "6px 6px 0px #E3A9FF",
        border: "2px #E3A9FF solid",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Link to={to} style={{ textDecoration: "none" }}>
        <div
          style={{
            textAlign: "center",
            color: "#E3A9FF",
            fontSize: 24,
            fontFamily: "Courier",
            background: "black",
            textTransform: "uppercase",
            transition: "color 0.3s",
            wordWrap: "break-word",
          }}
          onMouseOver={(e) => (e.target.style.color = "#B3FFB1")}
          onMouseOut={(e) => (e.target.style.color = "#E3A9FF")}
        >
          + add event
        </div>
      </Link>
    </div>
  );
}
