const passwordInput =
document.getElementById("adminPassword");


const loginBtn =
document.getElementById("loginBtn");


const error =
document.getElementById("error");



const ADMIN_PASSWORD = "ChangeThisPassword";



loginBtn.onclick = function(){


if(passwordInput.value === ADMIN_PASSWORD){


sessionStorage.setItem(
"adminLoggedIn",
"true"
);



window.location.href =
"admin.html";



}else{


error.innerHTML =
"Wrong password";


}



};
