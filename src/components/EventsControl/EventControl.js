import React, { useEffect, useState } from "react";
import NewEventForm from "./NewEventForm";
import EditEventForm from "./EditEventForm";
import EventList from "./EventList";
import EventDetail from "./EventDetail";
import { db, auth } from "../../firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import MissionStatement from "../SignInControl/MissionStatement";

export default function EventControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainEventList, setMainEventList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);
  const [eventStatusListStatus, setEventStatusListStatus] = useState([]);
  const [loadingEventStatusList, setLoadingEventStatusList] = useState(true);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "events"),
      (collectionSnapshot) => {
        const events = [];
        const currentDate = new Date();
        collectionSnapshot.forEach((doc) => {
          const eventData = doc.data();
          const eventDateTime = new Date(eventData.eventDateTime);
          const timeDifference = eventDateTime - currentDate;
          events.push({
            ...doc.data(),
            timeDifference: timeDifference,
            id: doc.id,
          });
        });
        events.sort((a, b) => a.timeDifference - b.timeDifference);
        setMainEventList(events);
      },
      (error) => {
        setError(error.message);
      }
    );
    // const eventStatusUnSubscribe = onSnapshot(
    //   collection(db, "profiles", auth.currentUser.uid, "eventStatus"),
    //   (collectionSnapshot) => {
    //     const eventStatusList = [];
    //     collectionSnapshot.forEach((doc) => {
    //       eventStatusList.push({
    //         id: doc.id,
    //         ...doc.data(),
    //       });
    //     });
    //     setEventStatusListStatus(eventStatusList);
    //     setLoadingEventStatusList(false);
    //   }
    // );
    return () => {
      unSubscribe();
      // eventStatusUnSubscribe();
      // console.log(eventStatusListStatus);
    };
  }, []);

  if (auth.currentUser !== null) {
    useEffect(() => {
      const eventStatusUnSubscribe = onSnapshot(
        collection(db, "profiles", auth.currentUser.uid, "eventStatus"),
        (collectionSnapshot) => {
          const eventStatusList = [];
          collectionSnapshot.forEach((doc) => {
            eventStatusList.push({
              id: doc.id,
              ...doc.data(),
            });
          });

          setEventStatusListStatus(eventStatusList);
          setLoadingEventStatusList(false);
        }
      );
      return () => {
        eventStatusUnSubscribe();
        console.log(eventStatusListStatus);
      };
    }, []);
  }

  // const userDocRef = doc(db, "profiles", auth.currentUser.uid);
  // const eventStatusCollectionRef = collection(userDocRef, "eventStatus");
  // const handleAddingEventStatus = async (eventId, eventStatusResponse) => {
  //   await addDoc(eventStatusCollectionRef, { eventId, eventStatusResponse });
  // };

  const handleClick = () => {
    if (selectedEvent != null) {
      setFormVisibleOnPage(false);
      setSelectedEvent(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  };

  const handleAddingNewEventToList = async (newEventData) => {
    await addDoc(collection(db, "events"), newEventData);
    setFormVisibleOnPage(false);
  };

  const handleChangingSelectedEvent = (id) => {
    const selection = mainEventList.filter((event) => event.id === id)[0];
    setSelectedEvent(selection);
  };

  const handleDeletingEvent = async (id) => {
    await deleteDoc(doc(db, "events", id));
    setSelectedEvent(null);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleEditingEventInList = async (eventToEdit) => {
    const eventRef = doc(db, "events", eventToEdit.id);
    await updateDoc(eventRef, eventToEdit);
    setEditing(false);
    setSelectedEvent(null);
  };
  if (auth.currentUser === null) {
    return (
      <>
        <MissionStatement />
      </>
    );
  } else if (auth.currentUser != null) {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (error) {
      currentlyVisibleState = <p>There was an error: {error}</p>;
    } else if (editing) {
      currentlyVisibleState = (
        <EditEventForm
          event={selectedEvent}
          onEditEvent={handleEditingEventInList}
        />
      );
      buttonText = "Return to Events";
    } else if (selectedEvent != null) {
      currentlyVisibleState = (
        <EventDetail
          event={selectedEvent}
          onClickingDelete={handleDeletingEvent}
          onClickingEdit={handleEditClick}
        />
      );
      buttonText = "Return to Events";
    } else if (formVisibleOnPage) {
      currentlyVisibleState = (
        <NewEventForm onNewEventCreation={handleAddingNewEventToList} />
      );

      buttonText = "Return to Events";
    } else {
      currentlyVisibleState = (
        <EventList
          onEventSelection={handleChangingSelectedEvent}
          eventList={mainEventList}
          // handleAddingEventStatus={handleAddingEventStatus}
        />
      );

      buttonText = "+ Add Event";
    }
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "black",
            // height: "100vh",
          }}
        >
          <div
            style={{
              width: 180,
              height: 20,
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 20,
              paddingBottom: 20,
              background: "black",
              boxShadow: "6px 6px 6px #E3A9FF",
              border: "2px #E3A9FF solid",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              marginTop: 10,
            }}
          >
            {error ? null : (
              <button
                style={{
                  textAlign: "center",
                  color: "#E3A9FF",
                  fontSize: 24,
                  fontFamily: "Courier",
                  background: "black",
                  textTransform: "uppercase",
                  transition: "color 0.3s",
                  wordWrap: "break-word",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => (e.target.style.color = "#B3FFB1")}
                onMouseOut={(e) => (e.target.style.color = "#E3A9FF")}
                onClick={handleClick}
              >
                {buttonText}
              </button>
            )}
          </div>
        </div>
        <div style={{}}>{currentlyVisibleState}</div>
      </React.Fragment>
    );
  }
}

// import React, { useEffect, useState } from "react";
// import NewEventForm from "./NewEventForm";
// import EditEventForm from "./EditEventForm";
// import EventList from "./EventList";
// import EventDetail from "./EventDetail";
// import { db, auth } from "../../firebase.js";
// import {
//   collection,
//   addDoc,
//   onSnapshot,
//   doc,
//   getDocs,
//   query,
//   where,
//   updateDoc,
//   deleteDoc,
// } from "firebase/firestore";
// import { formatDistanceToNow } from "date-fns";
// import { Link, useNavigate } from "react-router-dom";
// import MissionStatement from "../SignInControl/MissionStatement";

// export default function EventControl() {
//   const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
//   const [mainEventList, setMainEventList] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [error, setError] = useState(null);
//   const [eventStatusListStatus, setEventStatusListStatus] = useState([]);
//   const [loadingEventStatusList, setLoadingEventStatusList] = useState(true);

//   useEffect(() => {
//     const unSubscribe = onSnapshot(
//       collection(db, "events"),
//       (collectionSnapshot) => {
//         const events = [];
//         const currentDate = new Date();
//         collectionSnapshot.forEach((doc) => {
//           const eventData = doc.data();
//           const eventDateTime = new Date(eventData.eventDateTime);
//           const timeDifference = eventDateTime - currentDate;
//           events.push({
//             ...doc.data(),
//             timeDifference: timeDifference,
//             id: doc.id,
//           });
//         });
//         events.sort((a, b) => a.timeDifference - b.timeDifference);
//         setMainEventList(events);
//       },
//       (error) => {
//         setError(error.message);
//       }
//     );
//     const eventStatusUnSubscribe = onSnapshot(
//       collection(db, "profiles", auth.currentUser.uid, "eventStatus"),
//       (collectionSnapshot) => {
//         const eventStatusList = [];
//         collectionSnapshot.forEach((doc) => {
//           eventStatusList.push({
//             id: doc.id,
//             ...doc.data(),
//           });
//         });
//         setEventStatusListStatus(eventStatusList);
//         setLoadingEventStatusList(false);
//       }
//     );
//     return () => {
//       unSubscribe();
//       eventStatusUnSubscribe();
//     };
//   }, []);

//   const userDocRef = doc(db, "profiles", auth.currentUser.uid);
//   const eventStatusCollectionRef = collection(userDocRef, "eventStatus");
//   const handleAddingEventStatus = async (eventId, eventStatusResponse) => {
//     await addDoc(eventStatusCollectionRef, { eventId, eventStatusResponse });
//   };

//   const handleClick = () => {
//     if (selectedEvent != null) {
//       setFormVisibleOnPage(false);
//       setSelectedEvent(null);
//       setEditing(false);
//     } else {
//       setFormVisibleOnPage(!formVisibleOnPage);
//     }
//   };

//   const handleAddingNewEventToList = async (newEventData) => {
//     await addDoc(collection(db, "events"), newEventData);
//     setFormVisibleOnPage(false);
//   };

//   const handleChangingSelectedEvent = (id) => {
//     const selection = mainEventList.filter((event) => event.id === id)[0];
//     setSelectedEvent(selection);
//   };

//   const handleDeletingEvent = async (id) => {
//     await deleteDoc(doc(db, "events", id));
//     setSelectedEvent(null);
//   };

//   const handleEditClick = () => {
//     setEditing(true);
//   };

//   const handleEditingEventInList = async (eventToEdit) => {
//     const eventRef = doc(db, "events", eventToEdit.id);
//     await updateDoc(eventRef, eventToEdit);
//     setEditing(false);
//     setSelectedEvent(null);
//   };
//   if (auth.currentUser === null) {
//     return (
//       <>
//         <MissionStatement />
//       </>
//     );
//   } else if (auth.currentUser != null) {
//     let currentlyVisibleState = null;
//     let buttonText = null;
//     if (error) {
//       currentlyVisibleState = <p>There was an error: {error}</p>;
//     } else if (editing) {
//       currentlyVisibleState = (
//         <EditEventForm
//           event={selectedEvent}
//           onEditEvent={handleEditingEventInList}
//         />
//       );
//       buttonText = "Return to Events";
//     } else if (selectedEvent != null) {
//       currentlyVisibleState = (
//         <EventDetail
//           event={selectedEvent}
//           onClickingDelete={handleDeletingEvent}
//           onClickingEdit={handleEditClick}
//         />
//       );
//       buttonText = "Return to Events";
//     } else if (formVisibleOnPage) {
//       currentlyVisibleState = (
//         <NewEventForm onNewEventCreation={handleAddingNewEventToList} />
//       );

//       buttonText = "Return to Events";
//     } else {
//       currentlyVisibleState = (
//         <EventList
//           onEventSelection={handleChangingSelectedEvent}
//           eventList={mainEventList}
//           handleAddingEventStatus={handleAddingEventStatus}
//         />
//       );
//       console.log(auth.currentUser.uid);
//       buttonText = "+ Add Event";
//     }
//     return (
//       <React.Fragment>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             background: "black",
//             // height: "100vh",
//           }}
//         >
//           <div
//             style={{
//               width: 180,
//               height: 20,
//               paddingLeft: 24,
//               paddingRight: 24,
//               paddingTop: 20,
//               paddingBottom: 20,
//               background: "black",
//               boxShadow: "6px 6px 6px #E3A9FF",
//               border: "2px #E3A9FF solid",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               gap: 10,
//               marginTop: 10,
//             }}
//           >
//             {error ? null : (
//               <button
//                 style={{
//                   textAlign: "center",
//                   color: "#E3A9FF",
//                   fontSize: 24,
//                   fontFamily: "Courier",
//                   background: "black",
//                   textTransform: "uppercase",
//                   transition: "color 0.3s",
//                   wordWrap: "break-word",
//                   border: "none",
//                   cursor: "pointer",
//                 }}
//                 onMouseOver={(e) => (e.target.style.color = "#B3FFB1")}
//                 onMouseOut={(e) => (e.target.style.color = "#E3A9FF")}
//                 onClick={handleClick}
//               >
//                 {buttonText}
//               </button>
//             )}
//           </div>
//         </div>
//         <div style={{}}>{currentlyVisibleState}</div>
//       </React.Fragment>
//     );
//   }
// }
