import React from "react";

const AddEventButton = ({ onClick }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "sticky",
        top: "50",
        zIndex: "5000",
      }}
    >
      <div
        style={{
          // marginTop: "26px",
          width: 180,
          height: 40,
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 20,
          paddingBottom: 20,
          background: "black",
          boxShadow: "6px 6px 0px #E3A9FF",
          border: "2px #E3A9FF solid",
          display: "flex",
          // justifyContent: "flex-end",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "#E3A9FF",
            fontSize: 24,
            fontFamily: "Courier",
            fontWeight: "400",
            textTransform: "uppercase",
            lineHeight: 24,
            wordWrap: "break-word",
          }}
        >
          + add event
        </div>
      </div>
    </div>
  );
};

export default AddEventButton;