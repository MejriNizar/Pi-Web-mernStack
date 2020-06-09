
import * as firebase from "firebase/app";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBF2y9Uy7FL8R1zlLt_s6oUnxwNZuxlK6I",
    authDomain: "pi-web-mernstak.firebaseapp.com",
    databaseURL: "https://pi-web-mernstak.firebaseio.com",
    projectId: "pi-web-mernstak",
    storageBucket: "pi-web-mernstak.appspot.com",
    messagingSenderId: "738645050185",
    appId: "1:738645050185:web:6b279f58c887fd8ec35098",
    measurementId: "G-SQES5SPS7S"});
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey(
    "BAf-clh5pmmb3fTKUaKg267qnPrIpJqqAOqRaE7DRMQ8SxNbjOgXfSe3-D5y796z-UM2-Ap-yYVI4R9ZaC_WvPc"
    );
export { messaging };