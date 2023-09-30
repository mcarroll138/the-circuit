import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  return (
    <div
      style={{
        background: "black",
        height: "80px",
        width: "auto",
        color: "white",
        padding: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexShrink: 0,
        //   backgroundColor: "black",
          justifyContent: "space-between",
          alignItems: "center",

        //   background: "black",
          //   height: "80px",
          width: "auto",
          color: "white",
        }}
      >
        <p>Help</p> <p>About Us</p> <p>Careers</p>
      </div>
      <div>© 2023 The Circuit</div>
    </div>
  );
}
