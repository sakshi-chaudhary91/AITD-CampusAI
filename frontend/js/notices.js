// ======================================
// NOTICE DATA
// ======================================

const notices = [

    {
        title: "Semester Examination Schedule",

        category: "Exam",

        date: "30 July 2026",

        description:
        "The examination schedule for the upcoming semester has been released. Students are advised to check the timetable carefully.",

        pdf: "#"
    },

    {
        title: "TCS Placement Drive",

        category: "Placement",

        date: "28 July 2026",

        description:
        "TCS is visiting the campus for placements. Eligible students can register before the last date.",

        pdf: "#"
    },

    {
        title: "Hostel Fee Notice",

        category: "Hostel",

        date: "25 July 2026",

        description:
        "Students staying in the hostel must submit the hostel fee before the due date.",

        pdf: "#"
    },

    {
        title: "Admission 2026 Updates",

        category: "Admission",

        date: "22 July 2026",

        description:
        "Admission process for the new academic session has started. Check eligibility and required documents.",

        pdf: "#"
    }

];



// ======================================
// ELEMENTS
// ======================================

const noticeContainer =
document.getElementById("noticeContainer");

const searchNotice =
document.getElementById("searchNotice");



// ======================================
// DISPLAY NOTICES
// ======================================

function displayNotices(data){

    noticeContainer.innerHTML = "";

    if(data.length===0){

        noticeContainer.innerHTML = `

        <div class="no-notice">

            <i class="fa-solid fa-circle-info"></i>

            <h2>No Notice Found</h2>

            <p>
                Try searching with another keyword.
            </p>

        </div>

        `;

        return;
    }

    data.forEach(notice=>{

        noticeContainer.innerHTML += `

        <div class="notice-card">

            <h3>${notice.title}</h3>

            <div class="notice-meta">

                <span class="notice-tag">

                    ${notice.category}

                </span>

                <span class="notice-date">

                    <i class="fa-regular fa-calendar"></i>

                    ${notice.date}

                </span>

            </div>

            <p>

                ${notice.description}

            </p>

            <div class="notice-buttons">

                <a
                    href="${notice.pdf}"
                    target="_blank"
                    class="view-btn">

                    <i class="fa-solid fa-eye"></i>

                    View PDF

                </a>

                <a
                    href="${notice.pdf}"
                    download
                    class="download-btn">

                    <i class="fa-solid fa-download"></i>

                    Download

                </a>

            </div>

        </div>

        `;

    });

}



// ======================================
// SEARCH
// ======================================

searchNotice.addEventListener("input",()=>{

    const value =
    searchNotice.value.toLowerCase();

    const filtered =
    notices.filter(notice=>

        notice.title
        .toLowerCase()
        .includes(value)

        ||

        notice.category
        .toLowerCase()
        .includes(value)

    );

    displayNotices(filtered);

});



// ======================================
// LOGOUT
// ======================================

const logoutBtn =
document.getElementById("logoutBtn");

if(logoutBtn){

    logoutBtn.addEventListener("click",()=>{

        if(confirm("Do you want to logout?")){

            window.location.href="login.html";

        }

    });

}



// ======================================
// INITIAL LOAD
// ======================================

displayNotices(notices);