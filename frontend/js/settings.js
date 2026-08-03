// ===============================
// ELEMENTS
// ===============================

const editBtn =
document.getElementById("editBtn");

const darkMode =
document.getElementById("darkMode");

const languageSelect =
document.getElementById("languageSelect");

const changePasswordBtn =
document.getElementById("changePasswordBtn");

const privacyBtn =
document.getElementById("privacyBtn");

const logoutBtn =
document.getElementById("logoutBtn");

const logoutAccountBtn =
document.getElementById("logoutAccountBtn");



// ===============================
// LOAD SETTINGS
// ===============================

window.addEventListener("DOMContentLoaded", () => {

    // Dark Mode
    const savedDark =
    localStorage.getItem("darkMode");

    if(savedDark === "true"){

        darkMode.checked = true;

    }

    // Language
    const savedLanguage =
    localStorage.getItem("language");

    if(savedLanguage){

        languageSelect.value =
        savedLanguage;

    }

});



// ===============================
// EDIT PROFILE
// ===============================

editBtn.addEventListener("click", () => {

    alert(
        "Edit Profile feature will be available soon."
    );

});



// ===============================
// DARK MODE
// ===============================

darkMode.addEventListener("change", () => {

    localStorage.setItem(
        "darkMode",
        darkMode.checked
    );

    alert(
        "Dark Mode feature will be available soon."
    );

});



// ===============================
// LANGUAGE
// ===============================

languageSelect.addEventListener("change", () => {

    localStorage.setItem(
        "language",
        languageSelect.value
    );

    alert(
        "Language changed to " +
        languageSelect.value
    );

});



// ===============================
// CHANGE PASSWORD
// ===============================

changePasswordBtn.addEventListener("click", () => {

    alert(
        "Change Password feature will be available soon."
    );

});



// ===============================
// PRIVACY
// ===============================

privacyBtn.addEventListener("click", () => {

    alert(
        "Privacy Policy page coming soon."
    );

});



// ===============================
// LOGOUT FUNCTION
// ===============================

function logout(){

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



// ===============================
// LOGOUT EVENTS
// ===============================

logoutBtn.addEventListener(
    "click",
    logout
);

logoutAccountBtn.addEventListener(
    "click",
    logout
);