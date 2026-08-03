if(sessionStorage.getItem("adminLoggedIn") !== "true"){

window.location.href="admin-login.html";

}

import {

collection,
getDocs,
addDoc,
query,
orderBy,
serverTimestamp

}

from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";


import {

db

}

from "./firebase.js";



const conversationList =
document.getElementById("conversationList");


const chatSection =
document.getElementById("chatSection");


const adminChatBox =
document.getElementById("adminChatBox");


const adminReply =
document.getElementById("adminReply");


const sendAdminReply =
document.getElementById("sendAdminReply");



let currentConversation = null;



async function loadConversations(){


const snapshot =
await getDocs(
collection(db,"conversations")
);



conversationList.innerHTML="";



snapshot.forEach((doc)=>{


const button =
document.createElement("button");



button.innerHTML =
"Open Conversation " + doc.id;



button.onclick=()=>{

openConversation(doc.id);

};



conversationList.appendChild(button);



});


}



async function openConversation(id){


currentConversation=id;


chatSection.style.display="block";



const q=query(

collection(
db,
"conversations",
id,
"messages"
),

orderBy("createdAt")

);



const snapshot =
await getDocs(q);



adminChatBox.innerHTML="";



snapshot.forEach((msg)=>{


const data =
msg.data();



adminChatBox.innerHTML += `

<p>

<b>${data.sender}:</b>

${data.text}

</p>

`;



});


}



sendAdminReply.onclick=async()=>{


if(!currentConversation){

return;

}



await addDoc(

collection(

db,

"conversations",

currentConversation,

"messages"

),

{

sender:"admin",

text:adminReply.value,

createdAt:serverTimestamp()

}

);



adminReply.value="";


openConversation(currentConversation);



};



loadConversations();

const logoutBtn =
document.getElementById("logoutBtn");


if(logoutBtn){

logoutBtn.onclick = function(){

sessionStorage.removeItem(
"adminLoggedIn"
);


window.location.href =
"admin-login.html";


};

}
