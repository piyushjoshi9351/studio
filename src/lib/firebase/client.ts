import { initializeApp, getApps, getApp } from "firebase/app";
import { firebaseConfig } from "./config";

// Initialize Firebase
export const clientApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
