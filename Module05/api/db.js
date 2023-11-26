// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtxCkLoOMn6c7uximqKcZNMLZUge0RTD0", // Auth / General Use
  appId: "1:910353348664:android:539fe689e8af4658b64ecd", // General Use
  projectId: "diaryapp-290f4", // General Use
  authDomain: "YOUR_APP.firebaseapp.com", // Auth with popup/redirect
  databaseURL: "firebase-adminsdk-t7xq1@diaryapp-290f4.iam.gserviceaccount.com", // Realtime Database
  storageBucket: "diaryapp-290f4.appspot.com", // Storage
  messagingSenderId: "910353348664", // Cloud Messaging
  measurementId: "G-12345", // Analytics
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
const db = getFirestore(app);
// db?.settings({ experimentalForceLongPolling: true });
export default db;
