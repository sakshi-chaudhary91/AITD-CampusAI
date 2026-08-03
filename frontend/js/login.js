// ===============================
// PASSWORD SHOW / HIDE
// ===============================

const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {

    const icon = togglePassword.querySelector("i");

    if (password.type === "password") {

        password.type = "text";

        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    } else {

        password.type = "password";

        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

    }

});


// ===============================
// STUDENT / ADMIN TOGGLE
// ===============================

const studentBtn = document.getElementById("studentBtn");
const adminBtn = document.getElementById("adminBtn");

let userRole = "student";

studentBtn.addEventListener("click", () => {

    userRole = "student";

    studentBtn.classList.add("active");
    adminBtn.classList.remove("active");

});

adminBtn.addEventListener("click", () => {

    userRole = "admin";

    adminBtn.classList.add("active");
    studentBtn.classList.remove("active");

});


// ===============================
// LOGIN FORM
// ===============================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = document.querySelector('input[type="email"]').value.trim();
    const pass = password.value.trim();

    if (email === "" || pass === "") {

        alert("Please fill all fields.");

        return;
    }

    if (!email.includes("@")) {

        alert("Enter a valid email.");

        return;
    }

    // Future Backend Integration
    console.log("Role :", userRole);
    console.log("Email :", email);
    console.log("Password :", pass);

    alert("Login Successful (Frontend Demo)");

});


// ===============================
// BUTTON RIPPLE EFFECT
// ===============================

const loginBtn = document.querySelector(".login-btn");

loginBtn.addEventListener("click", function () {

    loginBtn.style.transform = "scale(0.97)";

    setTimeout(() => {

        loginBtn.style.transform = "scale(1)";

    }, 150);

});