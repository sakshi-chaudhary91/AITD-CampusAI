// ===============================
// COURSE DATA
// ===============================

const courses = [

    {
        name: "B.Tech Computer Science & Engineering",
        shortName: "CSE",
        duration: "4 Years",
        eligibility: "12th with PCM",
        type: "Undergraduate",
        description:
            "A comprehensive program covering programming, data structures, databases, operating systems, computer networks and software development."
    },

    {
        name: "B.Tech Artificial Intelligence & Machine Learning",
        shortName: "AI & ML",
        duration: "4 Years",
        eligibility: "12th with PCM",
        type: "Undergraduate",
        description:
            "A specialized program focused on artificial intelligence, machine learning, data science, neural networks and intelligent systems."
    },

    {
        name: "B.Tech Electronics & Communication Engineering",
        shortName: "ECE",
        duration: "4 Years",
        eligibility: "12th with PCM",
        type: "Undergraduate",
        description:
            "Study electronic systems, communication technologies, digital systems, microprocessors and modern communication networks."
    },

    {
        name: "B.Tech Information Technology",
        shortName: "IT",
        duration: "4 Years",
        eligibility: "12th with PCM",
        type: "Undergraduate",
        description:
            "Focuses on information systems, programming, databases, web technologies, networking and modern IT infrastructure."
    }

];


// ===============================
// ELEMENTS
// ===============================

const coursesContainer =
    document.getElementById("coursesContainer");

const searchInput =
    document.getElementById("courseSearch");

const logoutBtn =
    document.getElementById("logoutBtn");


// ===============================
// RENDER COURSES
// ===============================

function renderCourses(courseList) {

    coursesContainer.innerHTML = "";

    if (courseList.length === 0) {

        coursesContainer.innerHTML = `
            <div class="course-card">
                <h3>No courses found</h3>
                <p class="course-description">
                    Try searching with a different course name.
                </p>
            </div>
        `;

        return;
    }


    courseList.forEach(course => {

        const card = document.createElement("div");

        card.className = "course-card";

        card.innerHTML = `

            <div class="course-header">

                <div class="course-icon">
                    <i class="fa-solid fa-book-open"></i>
                </div>

                <div>

                    <h3>${course.name}</h3>

                    <span>
                        ${course.shortName} • ${course.type}
                    </span>

                </div>

            </div>


            <p class="course-description">
                ${course.description}
            </p>


            <div class="course-details">

                <div class="detail-item">

                    <small>Duration</small>

                    <strong>
                        <i class="fa-regular fa-clock"></i>
                        ${course.duration}
                    </strong>

                </div>


                <div class="detail-item">

                    <small>Eligibility</small>

                    <strong>
                        <i class="fa-solid fa-user-check"></i>
                        ${course.eligibility}
                    </strong>

                </div>

            </div>


            <a href="ai-assistant.html" class="course-btn">

                Ask CampusAI

                <i class="fa-solid fa-arrow-right"></i>

            </a>

        `;

        coursesContainer.appendChild(card);

    });

}


// ===============================
// SEARCH
// ===============================

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchText =
            this.value.toLowerCase().trim();

        const filteredCourses =
            courses.filter(course =>

                course.name
                    .toLowerCase()
                    .includes(searchText)

                ||

                course.shortName
                    .toLowerCase()
                    .includes(searchText)

            );

        renderCourses(filteredCourses);

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

            window.location.href = "login.html";

        }

    });

}


// ===============================
// INITIAL LOAD
// ===============================

renderCourses(courses);