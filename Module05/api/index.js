import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import moment from "moment";
import db from "./db";

export const getNoteByEmail = async (userEmail, date) => {
  try {
    const notesRef = collection(db, "notes");
    let q = query(notesRef, where("email", "==", userEmail));
    if (date) q = query(q, where("date", "==", new Date(date)));

    const querySnapshot = await getDocs(q);
    const notesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return notesData;
  } catch (e) {
    console.error("Error fetching notes:", e);
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
    let { title, content, email, type, date } = newNote;
    const result = await addDoc(collection(db, "notes"), {
      title,
      content,
      email,
      type,
      date,
    });
    return result;
  } catch (error) {
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
export const getUser = async (email) => {
  try {
    const notesRef = collection(db, "user");
    let q = query(notesRef, where("email", "==", email));
    const result = await getDocs(q);
    const entries = result.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return entries;
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

export const getLastTwoEntries = async (userEmail) => {
  try {
    const notesRef = collection(db, "notes");
    let q = query(notesRef, where("email", "==", userEmail));
    q = query(notesRef, orderBy("date", "desc"), limit(2));
    const snapshot = await getDocs(q);
    const entries = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return entries;
  } catch (error) {
    console.error("Error fetching last two entries:", error);
  }
};

// Fetch type data
export const geTypeData = async (userEmail) => {
  try {
    if (!userEmail) return [];
    const types = {
      angry: 0,
      sad: 0,
      happy: 0,
      none: 0,
    };
    const allEntries = await getNoteByEmail(userEmail);
    allEntries.reduce((acc, entry) => {
      types[entry.type] = (types[entry.type] || 0) + 1;
    }, {});

    const totalEntries = allEntries.length;
    const typesWithPercentage = Object.entries(types).map((item) => ({
      type: item[0],
      count: item[1],
      percentage: (item[1] / totalEntries) * 100,
    }));
    return typesWithPercentage;
  } catch (error) {
    console.error("Error fetching type data:", error);
  }
};
