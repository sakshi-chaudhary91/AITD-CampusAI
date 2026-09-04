// ===============================
// SCHOLARSHIP DATA
// ===============================

const scholarships = [

    {
        name: "Post Matric Scholarship",
        provider: "Government Scholarship",
        amount: "As per scheme",
        eligibility: "Eligible students",
        deadline: "Check official portal",
        description:
            "Financial assistance for eligible students pursuing higher education after matriculation."
    },

    {
        name: "National Scholarship Scheme",
        provider: "Government of India",
        amount: "As per scheme",
        eligibility: "Eligible students",
        deadline: "Check official portal",
        description:
            "A scholarship opportunity for students meeting the eligibility requirements of the national scholarship scheme."
    },

    {
        name: "Merit Based Scholarship",
        provider: "Institute / Merit",
        amount: "As per institute rules",
        eligibility: "Meritorious students",
        deadline: "As announced",
        description:
            "Scholarship support for students demonstrating strong academic performance and meeting institute criteria."
    },

    {
        name: "State Government Scholarship",
        provider: "State Government",
        amount: "As per scheme",
        eligibility: "Eligible state students",
        deadline: "As announced",
        description:
            "Financial assistance available under applicable state government scholarship schemes."
    }

];


// ===============================
// ELEMENTS
// ===============================

const scholarshipsContainer =
    document.getElementById("scholarshipsContainer");

const searchInput =
    document.getElementById("scholarshipSearch");

const logoutBtn =
    document.getElementById("logoutBtn");


// ===============================
// RENDER SCHOLARSHIPS
// ===============================

function renderScholarships(scholarshipList) {

    scholarshipsContainer.innerHTML = "";

    if (scholarshipList.length === 0) {

        scholarshipsContainer.innerHTML = `

            <div class="scholarship-card">

                <h3>No scholarships found</h3>

                <p class="scholarship-description">

                    Try searching with a different scholarship name.

                </p>

            </div>

        `;

        return;
    }


    scholarshipList.forEach(scholarship => {

        const card =
            document.createElement("div");

        card.className =
            "scholarship-card";


        card.innerHTML = `

            <div class="scholarship-header">

                <div class="scholarship-icon">

                    <i class="fa-solid fa-award"></i>

                </div>


                <div>

                    <h3>
                        ${scholarship.name}
                    </h3>

                    <span>
                        ${scholarship.provider}
                    </span>

                </div>

            </div>


            <p class="scholarship-description">

                ${scholarship.description}

            </p>


            <div class="scholarship-details">


                <div class="detail-item">

                    <small>Benefit</small>

                    <strong>

                        <i class="fa-solid fa-indian-rupee-sign"></i>

                        ${scholarship.amount}

                    </strong>

                </div>


                <div class="detail-item">

                    <small>Eligibility</small>

                    <strong>

                        <i class="fa-solid fa-user-check"></i>

                        ${scholarship.eligibility}

                    </strong>

                </div>


                <div class="detail-item">

                    <small>Deadline</small>

                    <strong>

                        <i class="fa-regular fa-calendar"></i>

                        ${scholarship.deadline}

                    </strong>

                </div>


            </div>


            <a
                href="ai-assistant.html"
                class="apply-btn"
            >

                Ask CampusAI

                <i class="fa-solid fa-arrow-right"></i>

            </a>

        `;


        scholarshipsContainer.appendChild(card);

    });

}


// ===============================
// SEARCH
// ===============================

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchText =
            this.value.toLowerCase().trim();


        const filteredScholarships =
            scholarships.filter(scholarship =>

                scholarship.name
                    .toLowerCase()
                    .includes(searchText)

                ||

                scholarship.provider
                    .toLowerCase()
                    .includes(searchText)

            );


        renderScholarships(filteredScholarships);

    });

}


// ===============================
// LOGOUT
// ===============================

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        const confirmLogout =
            confirm("Are you sure you want to logout?");


        if (confirmLogout) {

            localStorage.removeItem("loggedInUser");

            window.location.href =
                "login.html";

        }

    });

}


// ===============================
// INITIAL LOAD
// ===============================

renderScholarships(scholarships);