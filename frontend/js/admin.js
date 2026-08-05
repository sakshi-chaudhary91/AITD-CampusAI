// ===============================
// ACTIVE SIDEBAR MENU
// ===============================

const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        menuItems.forEach(i => i.classList.remove("active"));

        item.classList.add("active");

    });

});

// ===============================
// SEARCH BOX
// ===============================

const searchInput = document.querySelector(".search-box input");

if(searchInput){

    searchInput.addEventListener("focus", () => {

        searchInput.parentElement.style.boxShadow =
        "0 0 0 4px rgba(37,99,235,.15)";

    });

    searchInput.addEventListener("blur", () => {

        searchInput.parentElement.style.boxShadow = "none";

    });

}

// ===============================
// QUICK ACTION BUTTONS
// ===============================

const actionButtons = document.querySelectorAll(".action-card");

actionButtons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        alert(btn.innerText + " page will be available soon.");

    });

});

// ===============================
// LOGOUT
// ===============================

const logoutBtn = document.querySelector(".logout-btn");

if(logoutBtn){

    logoutBtn.addEventListener("click",()=>{

        const confirmLogout = confirm("Are you sure you want to logout?");

        if(confirmLogout){

            window.location.href = "login.html";

        }

    });

}

// ===============================
// NOTIFICATION BUTTON
// ===============================

const notificationBtn = document.querySelectorAll(".icon-btn");

notificationBtn.forEach(btn=>{

    btn.addEventListener("click",()=>{

        alert("Feature coming soon.");

    });

});