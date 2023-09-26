import React, { useEffect } from "react";
import { db, auth } from "../../firebase";
import { collection, addDoc, updateDoc, onSnapshot } from "firebase/firestore";

export default function FriendList() {
    useEffect(() => {
        const unSubscribe = onSnapshot(collection(db, "profiles"),
            (collectionSnapshot) => {
                const profileList = [];
                collectionSnapshot.forEach((doc) => {
                    profileList.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
            });
    })
}