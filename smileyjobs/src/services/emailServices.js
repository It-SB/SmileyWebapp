// services/emailService.js
import { getFunctions, httpsCallable } from "firebase/functions";
import app from "../firebase/firebase.config"; // Adjust the import based on your file structure

const functions = getFunctions(app);

export const sendEmail = async ({ to, subject, text }) => {
  const sendEmailFunction = httpsCallable(functions, "sendEmail");

  await sendEmailFunction({ to, subject, text });
};
