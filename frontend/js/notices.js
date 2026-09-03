// ======================================
// BACKEND URL
// ======================================

const BACKEND_URL = "http://127.0.0.1:8000";



// ======================================
// ELEMENTS
// ======================================

const noticeContainer =
    document.getElementById("noticeContainer");

const searchNotice =
    document.getElementById("searchNotice");

const logoutBtn =
    document.getElementById("logoutBtn");



// ======================================
// NOTICE DATA
// ======================================

let notices = [];



// ======================================
// LOAD NOTICES FROM BACKEND
// ======================================

async function loadNotices() {

    try {

        const response =
            await fetch(`${BACKEND_URL}/notices/`);

        if (!response.ok) {

            throw new Error("Failed to fetch notices.");

        }

        notices = await response.json();

        displayNotices(notices);

    }

    catch (error) {

        console.error("Error loading notices:", error);

        noticeContainer.innerHTML = `

            <div class="no-notice">

                <i class="fa-solid fa-circle-info"></i>

                <h2>Unable to Load Notices</h2>

                <p>
                    Please try again later.
                </p>

            </div>

        `;

    }

}



// ======================================
// DISPLAY NOTICES
// ======================================

function displayNotices(data) {

    noticeContainer.innerHTML = "";

    if (data.length === 0) {

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


    data.forEach(notice => {

        const date = notice.created_at
            ? new Date(notice.created_at).toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                }
            )
            : "Date not available";


        noticeContainer.innerHTML += `

            <div class="notice-card">

                <h3>
                    ${notice.title}
                </h3>


                <div class="notice-meta">

                    <span class="notice-tag">

                        ${notice.category}

                    </span>


                    <span class="notice-date">

                        <i class="fa-regular fa-calendar"></i>

                        ${date}

                    </span>

                </div>


                <p>

                    ${notice.description}

                </p>


                <div class="notice-buttons">

                    <a
                        href="#"
                        class="view-btn"
                        onclick="viewNotice(event, ${notice.id})">

                        <i class="fa-solid fa-eye"></i>

                        View PDF

                    </a>


                    <a
                        href="#"
                        class="download-btn"
                        onclick="downloadNotice(event, ${notice.id})">

                        <i class="fa-solid fa-download"></i>

                        Download

                    </a>

                </div>

            </div>

        `;

    });

}



// ======================================
// VIEW NOTICE
// ======================================

function viewNotice(event, noticeId) {

    event.preventDefault();

    const notice =
        notices.find(item => item.id === noticeId);

    if (!notice) {

        return;

    }

    alert(

        `Notice\n\n` +

        `Title: ${notice.title}\n\n` +

        `Category: ${notice.category}\n\n` +

        `Description:\n${notice.description}`

    );

}



// ======================================
// DOWNLOAD NOTICE
// ======================================

function downloadNotice(event, noticeId) {

    event.preventDefault();

    const notice =
        notices.find(item => item.id === noticeId);

    if (!notice) {

        return;

    }

    const content =

        `AITD CampusAI Notice\n\n` +

        `Title: ${notice.title}\n` +

        `Category: ${notice.category}\n\n` +

        `${notice.description}`;


    const blob =
        new Blob(
            [content],
            { type: "text/plain" }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        `${notice.title}.txt`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

}



// ======================================
// SEARCH
// ======================================

searchNotice.addEventListener("input", () => {

    const value =
        searchNotice.value
            .toLowerCase()
            .trim();


    const filtered =
        notices.filter(notice => {

            const title =
                (notice.title || "")
                    .toLowerCase();

            const category =
                (notice.category || "")
                    .toLowerCase();

            const description =
                (notice.description || "")
                    .toLowerCase();


            return (

                title.includes(value) ||

                category.includes(value) ||

                description.includes(value)

            );

        });


    displayNotices(filtered);

});



// ======================================
// LOGOUT
// ======================================

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        if (confirm("Do you want to logout?")) {

            window.location.href =
                "login.html";

        }

    });

}



// ======================================
// INITIAL LOAD
// ======================================

loadNotices();