// ===============================
// SEARCH BOX
// ===============================

const searchInput = document.querySelector(".search-box input");

if (searchInput) {

    searchInput.addEventListener("focus", () => {

        searchInput.parentElement.style.boxShadow =
            "0 10px 30px rgba(37,99,235,.25)";

    });

    searchInput.addEventListener("blur", () => {

        searchInput.parentElement.style.boxShadow =
            "0 8px 25px rgba(0,0,0,.08)";

    });

}


// ===============================
// NOTIFICATION
// ===============================

const notification = document.querySelector(".notification");

if (notification) {

    notification.addEventListener("click", () => {

        window.location.href = "notices.html";

    });

}


// ===============================
// HERO BUTTONS
// ===============================

const askAIBtn = document.querySelector(".primary-btn");

if (askAIBtn) {

    askAIBtn.addEventListener("click", () => {

        window.location.href = "ai-assistant.html";

    });

}

const uploadBtn = document.querySelector(".secondary-btn");

if (uploadBtn) {

    uploadBtn.addEventListener("click", () => {

        alert("Upload Notes feature will be available soon.");

    });

}


// ===============================
// BUTTON CLICK EFFECT
// ===============================

document.querySelectorAll("button").forEach((btn) => {

    btn.addEventListener("click", () => {

        btn.style.transform = "scale(0.97)";

        setTimeout(() => {

            btn.style.transform = "scale(1)";

        }, 150);

    });

});


// ===============================
// PROFILE DROPDOWN
// ===============================

const profileBtn = document.getElementById("profileBtn");
const profileDropdown = document.getElementById("profileDropdown");

if (profileBtn && profileDropdown) {

    profileBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        profileDropdown.classList.toggle("show");

    });

}


// ===============================
// CLOSE DROPDOWN
// ===============================

document.addEventListener("click", (e) => {

    if (

        profileDropdown &&
        profileBtn &&
        !profileBtn.contains(e.target)

    ) {

        profileDropdown.classList.remove("show");

    }

});


// ===============================
// LOGOUT
// ===============================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", (e) => {

        e.preventDefault();

        const confirmLogout = confirm(
            "Are you sure you want to logout?"
        );

        if (confirmLogout) {

            localStorage.removeItem("loggedInUser");

            window.location.href = "login.html";

        }

    });

}


// ===============================
// PROFILE HOVER EFFECT
// ===============================

if (profileBtn) {

    profileBtn.addEventListener("mouseenter", () => {

        profileBtn.style.transition = ".3s";

        profileBtn.style.transform = "translateY(-2px)";

    });

    profileBtn.addEventListener("mouseleave", () => {

        profileBtn.style.transform = "translateY(0)";

    });

}

// ===============================
// QUICK ACTION CARDS
// ===============================

const actionCards = document.querySelectorAll(".action-card");

actionCards.forEach((card) => {

    card.addEventListener("click", () => {

        const title = card.querySelector("h3").innerText;

        switch (title) {

            case "AI Assistant":

                window.location.href = "ai-assistant.html";

                break;

            case "Upload Notes":

                alert("Upload Notes feature will be available soon.");

                break;

            case "Latest Notices":

                window.location.href = "notices.html";

                break;

            case "Events":

                alert("Events page coming soon.");

                break;

            default:

                break;

        }

    });

});


// ===============================
// SIDEBAR ACTIVE MENU
// ===============================

const menuItems = document.querySelectorAll(".menu li");

menuItems.forEach((item) => {

    item.addEventListener("click", () => {

        menuItems.forEach((i) => i.classList.remove("active"));

        item.classList.add("active");

    });

});


// ===============================
// FUTURE BACKEND FUNCTIONS
// ===============================

// TODO:
// Fetch Student Details
// Fetch Notices
// Fetch Events
// Fetch Chat History
// Fetch Uploaded PDFs
// Fetch Dashboard Statistics

// Example:
//
// async function loadDashboard(){
//     const response = await fetch("http://127.0.0.1:8000/dashboard");
//     const data = await response.json();
//     console.log(data);
// }

// ===============================
// SEARCH FUNCTION
// ===============================

if (searchInput) {

    searchInput.addEventListener("keydown", function (e) {

        if (e.key === "Enter") {

            const value = searchInput.value
                .trim()
                .toLowerCase();

            if (
                value.includes("ai") ||
                value.includes("chat") ||
                value.includes("assistant")
            ) {

                window.location.href = "ai-assistant.html";

            }

            else if (
                value.includes("notice") ||
                value.includes("announcement")
            ) {

                window.location.href = "notices.html";

            }

            else if (
                value.includes("query") ||
                value.includes("history")
            ) {

                window.location.href = "my-queries.html";

            }

            else if (
                value.includes("profile") ||
                value.includes("user")
            ) {

                window.location.href = "profile.html";

            }

            else if (
                value.includes("setting")
            ) {

                window.location.href = "settings.html";

            }

            else if (
                value.includes("admission")
            ) {

                window.location.href = "admission.html";

            }

            else {

                alert("No matching page found.");

            }

        }

    });

}

// ===============================
// LOAD USER NAME
// ===============================

const savedUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

if (savedUser) {

    // Top profile name
    const profileName =
        document.querySelector(".profile span");

    if (profileName) {

        profileName.textContent = savedUser.name;

    }

    // Dropdown name
    const dropdownName =
        document.querySelector(".profile-header h4");

    if (dropdownName) {

        dropdownName.textContent = savedUser.name;

    }

    // Hero section
    const heroName =
        document.querySelector(".hero-left h1 span");

    if (heroName) {

        heroName.textContent = savedUser.name;

    }

}
// ===============================
// LOAD PROFILE IMAGE
// ===============================

const profileImages =
    document.querySelectorAll(".profile img, .profile-header img");

const savedPhoto =
    localStorage.getItem("profilePhoto");

if (savedPhoto) {

    profileImages.forEach((img) => {

        img.src = savedPhoto;

    });

}

// ===============================
// DASHBOARD STATS
// ===============================

const statNumbers =
    document.querySelectorAll(".stat-info h2");

if(statNumbers.length >= 4){

    statNumbers[0].textContent =
        localStorage.getItem("pdfCount") || 0;

    statNumbers[1].textContent =
        localStorage.getItem("chatCount") || 0;

    statNumbers[2].textContent =
        localStorage.getItem("noticeCount") || 0;

    statNumbers[3].textContent =
        localStorage.getItem("eventCount") || 0;

}

// ===============================
// DEFAULT DATA
// ===============================

if(!localStorage.getItem("pdfCount")){

    localStorage.setItem("pdfCount",24);

}

if(!localStorage.getItem("chatCount")){

    localStorage.setItem("chatCount",183);

}

if(!localStorage.getItem("noticeCount")){

    localStorage.setItem("noticeCount",8);

}

if(!localStorage.getItem("eventCount")){

    localStorage.setItem("eventCount",5);

}

// ===============================
// RECENT ACTIVITY
// ===============================

const activityContainer =
    document.getElementById("activityContainer");

if(activityContainer){

    const activities =
        JSON.parse(
            localStorage.getItem("recentActivities")
        ) || [];

    if(activities.length === 0){

        activityContainer.innerHTML = `

        <div class="activity-card">

            <div class="activity-icon">

                <i class="fa-solid fa-circle-info"></i>

            </div>

            <div class="activity-content">

                <h4>No Recent Activity</h4>

                <p>Your activities will appear here.</p>

            </div>

        </div>

        `;

    }

    else{

        activities.forEach(activity=>{

            activityContainer.innerHTML += `

            <div class="activity-card">

                <div class="activity-icon">

                    <i class="${activity.icon}"></i>

                </div>

                <div class="activity-content">

                    <h4>${activity.title}</h4>

                    <p>${activity.time}</p>

                </div>

            </div>

            `;

        });

    }

}

function saveActivity(title, icon){

    const activities =
        JSON.parse(
            localStorage.getItem("recentActivities")
        ) || [];

    activities.unshift({

        title,
        icon,
        time:"Just now"

    });

    localStorage.setItem(

        "recentActivities",

        JSON.stringify(
            activities.slice(0,10)
        )

    );

}

// ===============================
// UPCOMING EVENTS
// ===============================

const eventContainer =
document.getElementById("eventContainer");

const events =
JSON.parse(localStorage.getItem("campusEvents")) || [];

if(eventContainer){

    if(events.length===0){

        eventContainer.innerHTML=`
        <div class="event-item">

            <div class="event-info">

                <h4>No Upcoming Events</h4>

                <p>Stay Tuned</p>

            </div>

        </div>`;
    }

    else{

        events.slice(0,3).forEach(event=>{

            eventContainer.innerHTML+=`

            <div class="event-item">

                <div class="event-date">

                    <h3>${event.day}</h3>

                    <span>${event.month}</span>

                </div>

                <div class="event-info">

                    <h4>${event.title}</h4>

                    <p>${event.time}</p>

                </div>

            </div>`;

        });

    }

}

// ===============================
// UPCOMING EVENTS
// ===============================

const eventContainer =
document.getElementById("eventContainer");

const events =
JSON.parse(localStorage.getItem("campusEvents")) || [];

if(eventContainer){

    if(events.length===0){

        eventContainer.innerHTML=`
        <div class="event-item">

            <div class="event-info">

                <h4>No Upcoming Events</h4>

                <p>Stay Tuned</p>

            </div>

        </div>`;
    }

    else{

        events.slice(0,3).forEach(event=>{

            eventContainer.innerHTML+=`

            <div class="event-item">

                <div class="event-date">

                    <h3>${event.day}</h3>

                    <span>${event.month}</span>

                </div>

                <div class="event-info">

                    <h4>${event.title}</h4>

                    <p>${event.time}</p>

                </div>

            </div>`;

        });

    }

}