import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";


import {
db
} from "./firebase.js";



const message =
document.getElementById("message");


const sendBtn =
document.getElementById("sendBtn");


const result =
document.getElementById("result");



sendBtn.onclick = async ()=>{


const text = message.value.trim();



if(!text){

alert("Please write something.");

return;

}



try{


const conversation = await addDoc(

collection(db,"conversations"),

{

createdAt: serverTimestamp(),

status:"waiting"

}

);




await addDoc(

collection(db,"conversations",
conversation.id,
"messages"),

{

sender:"anonymous",

text:text,

createdAt:serverTimestamp()

}

);



const link =
`${window.location.origin}/chat.html?id=${conversation.id}`;



result.innerHTML = `

Message sent successfully.

<br><br>

Save this private link:

<br>

<a href="${link}">
${link}
</a>

`;



message.value="";



}catch(error){

console.error(error);

alert("Error sending message");

}



};
