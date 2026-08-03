import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

const submitBtn = document.getElementById("submitBtn");

if (submitBtn) {

  submitBtn.addEventListener("click", async () => {

    const message = document.getElementById("message").value.trim();
    const paperColor = document.getElementById("paperColor").value;
    const paperStyle = document.getElementById("paperStyle").value;

    if (message === "") {
      alert("Please write your message.");
      return;
    }

    try {

      await addDoc(collection(db, "messages"), {

        message,
        paperColor,
        paperStyle,

        reply: "",

        status: "pending",

        createdAt: serverTimestamp()

      });

      alert("Your anonymous message has been sent ❤️");

      document.getElementById("message").value = "";

    } catch (error) {

      console.error(error);

      alert("Something went wrong.");

    }

  });

}
