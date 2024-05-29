// userCollection.ts

import firebaseAdmin from "../config/firebaseConfig";
import db from '../config/firebaseConfig';


export const updateUserInFirestore = async (userId: string, data: any) => {
  await db.collection("USERS").doc(userId).update(data);
};

export const fetchUserFromFirestore = async (userId: string) => {
  const userRef = await db.collection("USERS").doc(userId).get();
  return userRef.data();
};
