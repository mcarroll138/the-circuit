import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  return (
    <div
      style={{
        background: "black",
        height: "45px",
        width: "auto",
        color: "white",
        padding: "8px",
        // position: "sticky",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexShrink: 0,
          justifyContent: "space-between",
          alignItems: "center",
          width: "auto",
          color: "white",
          fontSize: 12,
          fontFamily: "Arial",
          //   backgroundColor: "black",
          //   background: "black",
          //   height: "80px",
        }}
      >
        <p>Help</p> <p>About Us</p> <p>Careers</p>
      </div>
      <div style={{ fontSize: "10px", fontFamily: "Arial", paddingBottom: 1 }}>
        © 2023 The Circuit
      </div>
    </div>
  );
}
