import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "8px",
        justifyContent: "space-between",
        background: "black",
        height: "80px",
        width: "auto",
              color: "white",
        
      }}
    >
      <p>I am a footer</p>
    </div>
  );
}
