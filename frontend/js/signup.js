// ===============================
// SHOW / HIDE PASSWORD
// ===============================

const toggleButtons = document.querySelectorAll(".toggle-password");

toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const input = btn.previousElementSibling;
        const icon = btn.querySelector("i");

        if (input.type === "password") {
            input.type = "text";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        } else {
            input.type = "password";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }
    });
});

// ===============================
// SIGNUP FORM
// ===============================

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const fullName = document.getElementById("fullname").value.trim();
    const enrollment = document.getElementById("enrollment").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Empty Fields
    if (
        fullName === "" ||
        enrollment === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    // Email Validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email.");
        return;
    }

    // Password Length
    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    // Password Match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {

        const response = await fetch("http://127.0.0.1:8000/auth/signup", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                full_name: fullName,
                enrollment_no: enrollment,
                email: email,
                password: password
            })

        });

        const data = await response.json();

        if (response.ok) {

            alert("Account Created Successfully!");

            signupForm.reset();

            window.location.href = "login.html";

        } else {

            alert(data.detail || data.message || "Signup Failed");

        }

    } catch (error) {

        console.error(error);

        alert("Cannot connect to Backend Server.");

    }

});

// ===============================
// BUTTON ANIMATION
// ===============================

const signupBtn = document.querySelector(".signup-btn");

signupBtn.addEventListener("click", () => {

    signupBtn.style.transform = "scale(0.98)";

    setTimeout(() => {
        signupBtn.style.transform = "scale(1)";
    }, 150);

});