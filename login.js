import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD-b33PO1HYtFM6lKUjO9MLgYI4blii6Wk",
  authDomain: "anonymous-inbox-bd967.firebaseapp.com",
  projectId: "anonymous-inbox-bd967",
  storageBucket: "anonymous-inbox-bd967.firebasestorage.app",
  messagingSenderId: "791533468635",
  appId: "1:791533468635:web:a241c872d0ef44244f85fe"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("loginBtn").addEventListener("click", async () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{

        await signInWithEmailAndPassword(auth,email,password);

        window.location.href="admin.html";

    }catch(error){

        document.getElementById("error").innerText="Invalid email or password.";

    }

});
