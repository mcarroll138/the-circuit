import React, { useEffect, useState } from "react";
import NewProfile from "./NewProfileForm";
import { db, auth } from "../../firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function ProfileControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "profiles"),
      (collectionSnapshot) => {
        const profiles = [];
        collectionSnapshot.forEach((doc) => {
          profiles.push({
            displayName: doc.data().displayName,
            email: doc.data().email,
            phoneNumber: doc.data().phoneNumber,
            photoURL: doc.data().photoURL,
            id: doc.id,
          });
        });
        setFormVisibleOnPage(true);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unSubscribe;
  }, []);
}
