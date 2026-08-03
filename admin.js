// ===============================
// FIREBASE IMPORTS
// ===============================

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";


import { db } from "./firebase.js";


// ===============================
// ELEMENT
// ===============================

const messageList = document.getElementById("messageList");


// ===============================
// LOAD MESSAGES
// ===============================

async function loadMessages() {


    if (!messageList) {

        console.error("messageList element not found");

        return;

    }


    messageList.innerHTML = "Loading messages...";


    try {


        const q = query(
            collection(db, "messages"),
            orderBy("createdAt", "desc")
        );


        const snapshot = await getDocs(q);


        messageList.innerHTML = "";


        if (snapshot.empty) {


            messageList.innerHTML =
            "<p>No confessions yet.</p>";


            return;

        }



        snapshot.forEach((item) => {


            const data = item.data();


            const div = document.createElement("div");


            div.innerHTML = `

                <h3>Anonymous Confession</h3>

                <p>
                    ${data.message || "No message"}
                </p>


                <textarea 
                    id="reply-${item.id}" 
                    placeholder="Write reply..."
                >${data.reply || ""}</textarea>


                <br><br>


                <button onclick="saveReply('${item.id}')">
                    Save Reply
                </button>


                <button onclick="deleteMessage('${item.id}')">
                    Delete
                </button>


                <hr>

            `;


            messageList.appendChild(div);


        });



    } catch(error) {


        console.error("Firebase Error:", error);


        messageList.innerHTML =
        "<p>Error loading messages.</p>";


    }


}



// ===============================
// SAVE REPLY
// ===============================

window.saveReply = async function(id) {


    const reply =
    document.getElementById(`reply-${id}`).value;



    try {


        await updateDoc(
            doc(db, "messages", id),
            {
                reply: reply,
                status: "replied"
            }
        );


        alert("Reply saved!");


    } catch(error) {


        console.error(error);

        alert("Failed to save reply");


    }


};



// ===============================
// DELETE MESSAGE
// ===============================

window.deleteMessage = async function(id) {


    if(confirm("Delete this confession?")) {


        try {


            await deleteDoc(
                doc(db, "messages", id)
            );


            loadMessages();


        } catch(error) {


            console.error(error);

        }


    }


};



// ===============================
// START
// ===============================

loadMessages();
