import {

collection,
addDoc,
getDocs,
query,
orderBy,
serverTimestamp

}

from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";


import {
db
}

from "./firebase.js";



const params =
new URLSearchParams(window.location.search);


const conversationId =
params.get("id");



const chatBox =
document.getElementById("chatBox");


const reply =
document.getElementById("reply");


const sendReply =
document.getElementById("sendReply");



async function loadChat(){


const q=query(

collection(
db,
"conversations",
conversationId,
"messages"
),

orderBy("createdAt")

);



const snapshot =
await getDocs(q);



chatBox.innerHTML="";



snapshot.forEach((msg)=>{


const data =
msg.data();



chatBox.innerHTML += `

<p>

<b>${data.sender}:</b>

${data.text}

</p>

`;



});


}



sendReply.onclick=async()=>{


await addDoc(

collection(
db,
"conversations",
conversationId,
"messages"
),

{

sender:"anonymous",

text:reply.value,

createdAt:serverTimestamp()

}

);



reply.value="";


loadChat();



};



loadChat();
