import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.js";
import { signOut } from "firebase/auth";
import vectorImage from "../../assets/Logo.png";
import { useIsMobile } from "../MobileContext.js";
import FriendSvg from "../../assets/people-outline.svg";
import TicketSvg from "../../assets/ticket-outline.svg";
import LogOutSvg from "../../assets/log-out-outline.svg";

function Header() {
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();
  // const [isMobile, setIsMobile] = useState(window.innerWidth < 400);
  const isMobile = useIsMobile();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        console.log(auth.currentUser.displayName);
        console.log(auth.currentUser.email);
      } else {
        setUserEmail(null);
      }
    });

    // const handleResize = () => {
    //   setIsMobile(window.innerWidth < 740);
    // };

    // window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      // window.removeEventListener("resize", handleResize); // Cleanup the event listener
    };
  }, []);

  function doSignOut(props) {
    signOut(auth);
    navigate("/sign-in");
  }
  if (userEmail !== null)
    return (
      <div
        style={{
          position: "sticky",
          top: "0",
          zIndex: "100",
          marginBottom: "2px",
        }}
      >
        <div
          style={{
            display: isMobile ? "flex" : "flex",
            // flexDirection: window.innerWidth <= 740 ? "column" : "row",
            background: "black",
            height: isMobile ? "60px" : "120px",
            display: "flex",
            alignItems: "center",
            padding: "8px",
            justifyContent: "space-between",
            background: "black",
            width: "auto",
          }}
          onMouseOver={(e) => (e.target.style.color = "#B3FFB1")}
          onMouseOut={(e) => (e.target.style.color = "white")}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
            }}
          >
            <div
              style={{
                fill: "white",
                fontSize: isMobile ? 16 : 24,
                fontFamily: "Arial",
                marginLeft: isMobile ? 10 : 10,
                width: isMobile ? 30 : 90,
                paddingRight: isMobile ? 2 : 0,
                // fontWeight: "400",
                // wordWrap: "break-word",
                // lineHeight: 24,
                // paddingLeft: "10",
              }}
              onMouseOver={(e) => (e.target.style.fill = "#B3FFB1")}
              onMouseOut={(e) => (e.target.style.fill = "white")}
            >
              <img
                src={TicketSvg}
                alt="events"
                style={{
                  // display: isMobile? "block" : "none",
                  maxWidth: isMobile ? "60%" : "55%",
                  maxHeight: isMobile ? "60%" : "55%",
                  stroke: "white",
                }}
                onMouseOver={(e) => (e.target.style.color = "white")}
                onMouseOut={(e) => (e.target.style.color = "white")}
              />
              {/* Friends */}
            </div>
          </Link>
          {/* <Link
            to="/"
            style={{
              textDecoration: "none",
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: isMobile ? 16 : 24,
                fontFamily: "Arial",
                // fontWeight: "400",
                // width: isMobile ? 30 : 90,
                paddingLeft: "10",
                // lineHeight: 24,
                // wordWrap: "break-word",
              }}
            >
              <img
                src={TicketSvg}
                alt="Ticket"
                style={{
                  // display: isMobile? "block" : "none",
                  maxWidth: isMobile ? "6%" : "58%",
                  maxHeight: isMobile ? "6%" : "58%",
                }}
              />
              Events
            </div>
          </Link> */}
          <Link
            to="/profile"
            style={{
              textDecoration: "none",
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: isMobile ? 16 : 24,
                fontFamily: "Arial",
                // fontWeight: "400",
                marginLeft: isMobile ? 10 : 10,
                width: isMobile ? 30 : 90,

                // paddingLeft: "10",
                paddingRight: isMobile ? 2 : 0,
                // lineHeight: 24,
                // wordWrap: "break-word",
              }}
            >
              <img
                src={FriendSvg}
                alt="friends"
                style={{
                  // display: isMobile? "block" : "none",
                  maxWidth: isMobile ? "60%" : "55%",
                  maxHeight: isMobile ? "60%" : "55%",
                  // fill: "white",
                }}
              />
              {/* Friends */}
            </div>
          </Link>
          <div
            style={{
              color: "white",
              fontSize: 20,
              fontFamily: "Courier",
              fontWeight: "400",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "1",
            }}
          >
            <img
              src={vectorImage}
              alt="The Circuit"
              style={{
                display: isMobile ? "block" : "flex",
                background: "black",
                // height: isMobile ? 20 : 80,
                // maxWidth: isMobile ? 90 : 180,
                // maxHeight: "100%",
                maxWidth: isMobile ? "65%" : "100%",
                maxHeight: isMobile ? "65%" : "100%",
              }}
            />
          </div>
          <Link to="/user-profile">
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                alt="Profile"
                style={{
                  width: isMobile ? 30 : 60,
                  height: isMobile ? 30 : 60,
                  // width: 80,
                  paddingRight: 1,
                  // background: "linear-gradient(0deg, black 0%, black 100%)",
                  // boxShadow: "6px 6px 0px #E3A9FF",
                  borderRadius: "50%",
                  border: "2px #E3A9FF solid",
                }}
                onMouseOver={(e) =>
                  (e.target.style.boxShadow = "6px 6px 0px #B3FFB1")
                }
                onMouseOut={(e) =>
                  (e.target.style.boxShadow = "1px 1px 0px #E3A9FF")
                }
                src={auth.currentUser.photoURL}
              />
            </div>
          </Link>

          <div
            onClick={doSignOut}
            style={{
              color: "white",
              fontSize: "16px",
              fontFamily: "Arial",
              fontWeight: "400",
              textDecoration: "none",
              marginLeft: 10,
              cursor: "pointer",
              whiteSpace: "nowrap",
              // width: 80,
            }}
          >
            <img
              alt="log out"
              style={{
                width: isMobile ? 30 : 90,
                paddingRight: isMobile ? 2 : 0,
                stroke: "white",
                maxWidth: isMobile ? "60%" : "55%",
                maxHeight: isMobile ? "60%" : "55%",
                // display: isMobile? "block" : "none",
              }}
              src={LogOutSvg}
            />
            {/* Sign Out */}
          </div>
        </div>
      </div>
    );
  else if (userEmail === null)
    return (
      <div
        style={{
          position: "sticky",
          top: "0",
          zIndex: "100",
          marginBottom: "2px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px",
            justifyContent: "space-between",
            background: "black",
            height: "80px",
            width: "auto",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: 40,
              fontFamily: "Courier",
              fontWeight: "400",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "1",
            }}
          >
            <img
              src={vectorImage}
              alt="The Circuit"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
        </div>
      </div>
    );
}

export default Header;

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { auth } from "../../firebase.js";
// import { signOut } from "firebase/auth";
// import vectorImage from "../../assets/Logo.png";

// function Header() {
//   const [userEmail, setUserEmail] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUserEmail(user.email);
//         console.log(auth.currentUser.displayName);
//         console.log(auth.currentUser.email);
//       } else {
//         setUserEmail(null);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   function doSignOut(props) {
//     signOut(auth);
//     navigate("/sign-in");
//   }
//   if (userEmail !== null)
//     return (
//       <div
//         style={{
//           position: "sticky",
//           top: "0",
//           zIndex: "100",
//           marginBottom: "2px",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             padding: "8px",
//             justifyContent: "space-between",
//             background: "black",
//             height: "80px",
//             width: "auto",
//           }}
//           onMouseOver={(e) => (e.target.style.color = "#B3FFB1")}
//           onMouseOut={(e) => (e.target.style.color = "white")}
//         >
//           <Link
//             to="/"
//             style={{
//               textDecoration: "none",
//             }}
//           >
//             <div
//               style={{
//                 color: "white",
//                 fontSize: 24,
//                 fontFamily: "Arial",
//                 fontWeight: "400",
//                 width: 90,
//                 paddingLeft: "10",
//                 // lineHeight: 24,
//                 // wordWrap: "break-word",
//               }}
//             >
//               Events
//             </div>
//           </Link>
//           <Link
//             to="/profile"
//             style={{
//               textDecoration: "none",
//             }}
//           >
//             <div
//               style={{
//                 color: "white",
//                 fontSize: 24,
//                 fontFamily: "Arial",
//                 fontWeight: "400",
//                 marginLeft: "20px",
//                 width: 90,
//                 paddingLeft: "10",
//                 // lineHeight: 24,
//                 wordWrap: "break-word",
//               }}
//             >
//               Friends
//             </div>
//           </Link>
//           <div
//             style={{
//               color: "white",
//               fontSize: 20,
//               fontFamily: "Courier",
//               fontWeight: "400",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               flex: "1",
//             }}
//           >
//             <img
//               src={vectorImage}
//               alt="The Circuit"
//               // style={{ maxWidth: "100%", maxHeight: "100%" }}
//             />
//           </div>
//           <Link to="/user-profile">
//             <div
//               style={{
//                 marginLeft: "auto",
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               <img
//                 alt="Profile"
//                 style={{
//                   width: 60,
//                   height: 60,
//                   // width: 80,
//                   paddingRight: 1,
//                   background: "linear-gradient(0deg, black 0%, black 100%)",
//                   boxShadow: "6px 6px 0px #E3A9FF",
//                   borderRadius: "50%",
//                   border: "2px #E3A9FF solid",
//                 }}
//                 src={auth.currentUser.photoURL}
//               />
//             </div>
//           </Link>

//           <div
//             onClick={doSignOut}
//             style={{
//               color: "white",
//               fontSize: "16px",
//               fontFamily: "Arial",
//               fontWeight: "400",
//               textDecoration: "none",
//               marginLeft: "50px",
//               cursor: "pointer",
//               whiteSpace: "nowrap",
//               width: 80,
//             }}
//           >
//             Sign Out
//           </div>
//         </div>
//       </div>
//     );
//   else if (userEmail === null)
//     return (
//       <div
//         style={{
//           position: "sticky",
//           top: "0",
//           zIndex: "100",
//           marginBottom: "2px",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             padding: "8px",
//             justifyContent: "space-between",
//             background: "black",
//             height: "80px",
//             width: "auto",
//           }}
//         >
//           <div
//             style={{
//               color: "white",
//               fontSize: 40,
//               fontFamily: "Courier",
//               fontWeight: "400",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               flex: "1",
//             }}
//           >
//             <img
//               src={vectorImage}
//               alt="The Circuit"
//               style={{ maxWidth: "100%", maxHeight: "100%" }}
//             />
//           </div>
//         </div>
//       </div>
//     );
// }

// export default Header;
