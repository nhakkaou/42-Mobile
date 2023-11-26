import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import db from "./db";

export const getNoteByEmail = async (userEmail, type) => {
  try {
    const notesRef = collection(db, "notes");
    let q = query(notesRef, where("email", "==", userEmail));
    if (type && type != "All")
      q = query(q, where("type", "==", type.toLowerCase()));
    const querySnapshot = await getDocs(q);

    const notesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return notesData;
  } catch (e) {
    throw e;
  }
};
export const deleteNote = async (id) => {
  try {
    const querySnapshot = await deleteDoc(doc(db, "notes", id));
    return querySnapshot;
  } catch (e) {
    console.log(e);
  }
};
export const addNote = async (newNote) => {
  try {
    const result = await addDoc(collection(db, "notes"), newNote);
    return result;
  } catch (error) {
    console.error("Error adding note:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};
export const addUser = async (user) => {
  try {
    const result = await addDoc(collection(db, "user"), user);
    return result;
  } catch (error) {
    console.log("Error adding note:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

export const updateNote = async (id, newNote) => {
  try {
    const notesData = await setDoc(doc(db, "notes", id), newNote);
    return notesData;
  } catch (e) {
    throw e;
  }
};
