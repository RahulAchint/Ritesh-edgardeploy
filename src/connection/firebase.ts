import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCIrFBkkP1Gl4PGB1FAYLUf_IQjsGLJkVQ",
  authDomain: "cleana-9c541.firebaseapp.com",
  projectId: "cleana-9c541",
  storageBucket: "cleana-9c541.appspot.com",
  messagingSenderId: "114932859394",
  appId: "1:114932859394:web:41f847bbbaa7fedf499d1b",
  measurementId: "G-WPZV1CL0MH",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default getFirestore(app);
