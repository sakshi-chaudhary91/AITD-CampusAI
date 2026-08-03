// ===============================
// ELEMENTS
// ===============================

const editProfileBtn =
document.getElementById("editProfileBtn");

const changePasswordBtn =
document.getElementById("changePasswordBtn");

const logoutBtn =
document.getElementById("logoutBtn");

const profileName =
document.querySelector(".profile-details h2");

const profileEmail =
document.querySelectorAll(".info-row strong")[1];



// ===============================
// LOAD USER DATA
// ===============================

const user =
JSON.parse(
localStorage.getItem("loggedInUser")
);

if(user){

    if(profileName){

        profileName.textContent =
        user.name || "Student";

    }

    if(profileEmail){

        profileEmail.textContent =
        user.email || "student@email.com";

    }

}



// ===============================
// EDIT PROFILE
// ===============================

if(editProfileBtn){

editProfileBtn.addEventListener(
"click",

function(){

alert(
"Edit Profile feature will be available soon."
);

}

);

}



// ===============================
// CHANGE PASSWORD
// ===============================

if(changePasswordBtn){

changePasswordBtn.addEventListener(
"click",

function(){

alert(
"Change Password feature will be available soon."
);

}

);

}



// ===============================
// LOGOUT
// ===============================

if(logoutBtn){

logoutBtn.addEventListener(
"click",

function(){

const confirmLogout =
confirm(
"Are you sure you want to logout?"
);

if(confirmLogout){

localStorage.removeItem(
"loggedInUser"
);

window.location.href =
"login.html";

}

}

);

}