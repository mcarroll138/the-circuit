import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.js";
import { signOut } from "firebase/auth";
import vectorImage from "../../assets/Logo.png";

function Header() {
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

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
    return () => unsubscribe();
  }, []);

  function doSignOut(props) {
    signOut(auth);
    navigate("/sign-in");
  }
  if (userEmail !== null)
    return (
      <div
        style={{
          // position: "sticky",
          // top: "0",
          // zIndex: "100",
          marginBottom: "26px",
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
              fontSize: 24,
              fontFamily: "Arial",
              fontWeight: "700",
              // lineHeight: 24,
              wordWrap: "break-word",
            }}
          >
            Events
          </div>
          <div
            style={{
              color: "#E3A9FF",
              fontSize: 24,
              fontFamily: "Arial",
              fontWeight: "400",
              textDecoration: "underline",
              marginLeft: "20px",
              lineHeight: 24,
              wordWrap: "break-word",
            }}
          >
            Friends
          </div>
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
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              style={{
                width: 60,
                height: 60,
                background: "linear-gradient(0deg, black 0%, black 100%)",
                boxShadow: "6px 6px 0px #E3A9FF",
                borderRadius: "50%",
                border: "2px #E3A9FF solid",
              }}
              src={auth.currentUser.photoURL}
            />
          </div>

          <div
            onClick={doSignOut}
            style={{
              color: "#E3A9FF",
              fontSize: "16px",
              fontFamily: "Arial",
              fontWeight: "400",
              textDecoration: "underline",
              marginLeft: "10px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Sign Out
          </div>
        </div>
      </div>
    );
  else if (userEmail === null)
    return (
      <div>
        <h2>⚡️ The Circuit ⚡️</h2>
        {/* {email} */}
        <form>
          <Link to="/sign-in">
            <button>Sign In</button>
          </Link>
        </form>
      </div>
    );
}

export default Header;

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { auth } from "../../firebase.js";
// import { signOut } from "firebase/auth";

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
//   const headerContainerStyles = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "pink",
//     padding: "10px",
//   };

//   const formStyles = {
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//   };
//   const imgStyle = {
//     objectFit: "cover",
//     boarderRadius: "50%",
//     height: "50px",
//     width: "50px",
//     borderRadius: "50%",
//   };

//   const buttonStyles = {
//     margin: "4px",
//     padding: "4px 36px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   };

//   function doSignOut(props) {
//     signOut(auth);
//     navigate("/sign-in");
//   }
//   if (userEmail !== null)
//     return (
//       <div style={headerContainerStyles}>
//         <h2>⚡️ The Circuit ⚡️</h2>

//         <form style={formStyles}>
//           {/* {auth.currentUser.displayName} */}
//           <button onClick={doSignOut} style={buttonStyles}>
//             Signd out
//           </button>
//           <Link to="/">
//             <button style={buttonStyles}>Events</button>
//           </Link>
//           <Link to="/profile">
//             <button style={buttonStyles}>Friends</button>
//           </Link>
//           <Link to="/user-profile">
//             <button style={buttonStyles}>My Profile</button>
//           </Link>

//           <img style={imgStyle} src={auth.currentUser.photoURL}></img>
//         </form>
//       </div>
//     );
//   else if (userEmail === null)
//     return (
//       <div style={headerContainerStyles}>
//         <h2>⚡️ The Circuit ⚡️</h2>
//         {/* {email} */}
//         <form style={formStyles}>
//           {/* <Link to="/">
//             <button style={buttonStyles}>Home</button>
//           </Link> */}

//           <Link to="/sign-in">
//             <button style={buttonStyles}>Sign In</button>
//           </Link>

//           {/* <Link to="/profile">
//             <button style={buttonStyles}>MyProfile</button>
//           </Link> */}
//         </form>
//       </div>
//     );
// }

// export default Header;
