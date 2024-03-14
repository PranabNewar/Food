import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useState } from "react";

export const storeDataInFire = async (user) => {
  console.log(user, "userDetails in function");

  const userExist = await getDocs(collection(db, "Users"));
  let isUser = false;
  const users = userExist.docs.map((doc) => ({
    user: doc.data(),
    id: doc.id,
  }));
  users.map((res) => {
    console.log(res, "inside map");
    if (res.user.user_id === user.uid) {
      isUser = true;
      return;
    }
  });

  console.log(isUser, "existing user");
  if (!isUser) {
    const data = await addDoc(collection(db, "Users"), {
      user_id: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });
    console.log(data, "userdetails in function");
    return data;
  }
};
