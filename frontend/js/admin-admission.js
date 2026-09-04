document.addEventListener("DOMContentLoaded", function () {

    const BACKEND_URL = "http://127.0.0.1:8000";

    let admissions = [];
    let currentPage = 1;
    const rowsPerPage = 10;


    /* ==========================================
            ELEMENTS
    ========================================== */

    const searchInput =
        document.querySelector("#admissionSearch");

    const statusFilter =
        document.querySelector("#statusFilter");

    const courseFilter =
        document.querySelector("#courseFilter");

    const yearFilter =
        document.querySelector("#yearFilter");

    const resetButton =
        document.querySelector("#resetFilters");

    const tableBody =
        document.querySelector("#admissionTableBody");

    const newAdmissionButton =
        document.querySelector("#newAdmissionBtn");

    const viewAllButton =
        document.querySelector("#viewAllAdmissions");

    const totalAdmissions =
        document.querySelector("#totalAdmissions");

    const pendingAdmissions =
        document.querySelector("#pendingAdmissions");

    const approvedAdmissions =
        document.querySelector("#approvedAdmissions");

    const rejectedAdmissions =
        document.querySelector("#rejectedAdmissions");

    const prevPageButton =
        document.querySelector("#prevPage");

    const nextPageButton =
        document.querySelector("#nextPage");

    const paginationContainer =
        document.querySelector(".table-pagination");

    const logoutButton =
        document.querySelector(".sidebar-bottom button");


    /* ==========================================
            LOAD ADMISSIONS
    ========================================== */

    async function loadAdmissions() {

        try {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align:center;">
                        Loading admissions...
                    </td>
                </tr>
            `;

            const response = await fetch(
                `${BACKEND_URL}/admissions/`
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to load admissions."
                );
            }

            admissions = await response.json();

            updateStats();

            currentPage = 1;

            displayAdmissions();

        } catch (error) {

            console.error(
                "Admission loading error:",
                error
            );

            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align:center;">
                        Failed to load admissions.
                    </td>
                </tr>
            `;

        }

    }


    /* ==========================================
            UPDATE STATS
    ========================================== */

    function updateStats() {

        const total = admissions.length;

        const pending = admissions.filter(
            admission =>
                admission.status &&
                admission.status.toLowerCase() === "pending"
        ).length;

        const approved = admissions.filter(
            admission =>
                admission.status &&
                admission.status.toLowerCase() === "approved"
        ).length;

        const rejected = admissions.filter(
            admission =>
                admission.status &&
                admission.status.toLowerCase() === "rejected"
        ).length;


        if (totalAdmissions) {
            totalAdmissions.textContent = total;
        }

        if (pendingAdmissions) {
            pendingAdmissions.textContent = pending;
        }

        if (approvedAdmissions) {
            approvedAdmissions.textContent = approved;
        }

        if (rejectedAdmissions) {
            rejectedAdmissions.textContent = rejected;
        }

    }


    /* ==========================================
            FILTER ADMISSIONS
    ========================================== */

    function getFilteredAdmissions() {

        const searchValue = searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

        const selectedStatus = statusFilter
            ? statusFilter.value.toLowerCase()
            : "all";

        const selectedCourse = courseFilter
            ? courseFilter.value.toLowerCase()
            : "all";

        const selectedYear = yearFilter
            ? yearFilter.value.toLowerCase()
            : "all";


        return admissions.filter(function (admission) {

            const name =
                admission.applicant_name || "";

            const email =
                admission.email || "";

            const course =
                admission.course || "";

            const year =
                admission.admission_year || "";

            const status =
                admission.status || "";


            const searchableText = (
                name +
                " " +
                email +
                " " +
                course +
                " " +
                year +
                " " +
                status +
                " " +
                admission.id
            ).toLowerCase();


            const searchMatch =
                searchableText.includes(searchValue);


            const statusMatch =
                selectedStatus === "all" ||
                selectedStatus === "" ||
                status.toLowerCase() === selectedStatus;


            let courseMatch = true;

            if (
                selectedCourse !== "all" &&
                selectedCourse !== ""
            ) {

                const courseText =
                    course.toLowerCase();

                if (selectedCourse === "aiml") {

                    courseMatch =
                        courseText.includes("ai") ||
                        courseText.includes("ml");

                } else if (selectedCourse === "cse") {

                    courseMatch =
                        courseText.includes("computer") ||
                        courseText.includes("cse");

                } else if (selectedCourse === "ece") {

                    courseMatch =
                        courseText.includes("electronics") ||
                        courseText.includes("communication") ||
                        courseText.includes("ece");

                } else if (selectedCourse === "it") {

                    courseMatch =
                        courseText.includes("information") ||
                        courseText.includes("technology") ||
                        courseText.includes("it");

                } else {

                    courseMatch =
                        courseText === selectedCourse;

                }

            }


            let yearMatch = true;

            if (
                selectedYear !== "all" &&
                selectedYear !== ""
            ) {

                yearMatch =
                    year.includes(selectedYear);

            }


            return (
                searchMatch &&
                statusMatch &&
                courseMatch &&
                yearMatch
            );

        });

    }


    /* ==========================================
            DISPLAY ADMISSIONS
    ========================================== */

    function displayAdmissions() {

        const filteredAdmissions =
            getFilteredAdmissions();


        const totalPages =
            Math.max(
                1,
                Math.ceil(
                    filteredAdmissions.length /
                    rowsPerPage
                )
            );


        if (currentPage > totalPages) {
            currentPage = totalPages;
        }


        const startIndex =
            (currentPage - 1) * rowsPerPage;

        const endIndex =
            startIndex + rowsPerPage;


        const pageAdmissions =
            filteredAdmissions.slice(
                startIndex,
                endIndex
            );


        tableBody.innerHTML = "";


        if (pageAdmissions.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align:center;">
                        No admission applications found.
                    </td>
                </tr>
            `;

            updatePagination(
                filteredAdmissions.length
            );

            return;
        }


        pageAdmissions.forEach(function (admission) {

            addAdmissionRow(admission);

        });


        updatePagination(
            filteredAdmissions.length
        );

    }


    /* ==========================================
            ADD ADMISSION ROW
    ========================================== */

    function addAdmissionRow(admission) {

        const row =
            document.createElement("tr");


        const status =
            admission.status || "Pending";

        const statusClass =
            status.toLowerCase();


        const course =
            admission.course || "N/A";

        const applicantName =
            admission.applicant_name ||
            "Applicant";

        const email =
            admission.email ||
            "N/A";

        const year =
            admission.admission_year ||
            "N/A";


        row.dataset.id =
            admission.id;


        row.innerHTML = `

            <td>

                <span class="application-id">
                    ADM${String(admission.id).padStart(3, "0")}
                </span>

            </td>


            <td>

                <div class="applicant-info">

                    <img
                        src="assets/profile.png"
                        alt="Applicant"
                    >

                    <div>

                        <h4>
                            ${escapeHtml(applicantName)}
                        </h4>

                        <span>
                            ${escapeHtml(email)}
                        </span>

                    </div>

                </div>

            </td>


            <td>

                <span class="course-name">
                    ${escapeHtml(course)}
                </span>

            </td>


            <td>
                ${escapeHtml(year)}
            </td>


            <td>

                <span class="status ${statusClass}">
                    ${escapeHtml(status)}
                </span>

            </td>


            <td>

                <div class="action-buttons">

                    <button
                        class="view-btn"
                        title="View Application"
                    >
                        <i class="fa-solid fa-eye"></i>
                    </button>


                    ${
                        statusClass === "pending"
                        ?
                        `
                        <button
                            class="approve-btn"
                            title="Approve"
                        >
                            <i class="fa-solid fa-check"></i>
                        </button>

                        <button
                            class="reject-btn"
                            title="Reject"
                        >
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                        `
                        :
                        `
                        <button
                            class="edit-btn"
                            title="Edit"
                        >
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        `
                    }

                </div>

            </td>

        `;


        tableBody.appendChild(row);

    }


    /* ==========================================
            ESCAPE HTML
    ========================================== */

    function escapeHtml(value) {

        const div =
            document.createElement("div");

        div.textContent =
            String(value);

        return div.innerHTML;

    }


    /* ==========================================
            TABLE CLICK HANDLER
    ========================================== */

    tableBody.addEventListener(
        "click",
        async function (event) {

            const button =
                event.target.closest("button");

            if (!button) return;


            const row =
                button.closest("tr");

            if (!row) return;


            const admissionId =
                Number(row.dataset.id);


            const admission =
                admissions.find(
                    item =>
                        item.id === admissionId
                );


            if (!admission) return;


            /* VIEW */

            if (
                button.classList.contains(
                    "view-btn"
                )
            ) {

                viewAdmission(admission);

            }


            /* APPROVE */

            else if (
                button.classList.contains(
                    "approve-btn"
                )
            ) {

                await changeStatus(
                    admission,
                    "Approved"
                );

            }


            /* REJECT */

            else if (
                button.classList.contains(
                    "reject-btn"
                )
            ) {

                await changeStatus(
                    admission,
                    "Rejected"
                );

            }


            /* EDIT */

            else if (
                button.classList.contains(
                    "edit-btn"
                )
            ) {

                await editAdmission(
                    admission
                );

            }

        }
    );


    /* ==========================================
            VIEW ADMISSION
    ========================================== */

    function viewAdmission(admission) {

        const applicationId =
            `ADM${String(admission.id).padStart(3, "0")}`;


        alert(
            "Application Details\n\n" +

            "Application ID: " +
            applicationId +

            "\nApplicant: " +
            (admission.applicant_name || "N/A") +

            "\nEmail: " +
            (admission.email || "N/A") +

            "\nCourse: " +
            (admission.course || "N/A") +

            "\nAdmission Year: " +
            (admission.admission_year || "N/A") +

            "\nStatus: " +
            (admission.status || "Pending")
        );

    }


    /* ==========================================
            CHANGE STATUS
    ========================================== */

    async function changeStatus(
        admission,
        newStatus
    ) {

        const name =
            admission.applicant_name ||
            "this applicant";


        const confirmed =
            confirm(
                `${newStatus} admission application of ${name}?`
            );


        if (!confirmed) return;


        try {

            const response =
                await fetch(
                    `${BACKEND_URL}/admissions/${admission.id}/status?status=${encodeURIComponent(newStatus)}`,
                    {
                        method: "PATCH"
                    }
                );


            if (!response.ok) {

                const errorData =
                    await response.json()
                    .catch(() => null);

                throw new Error(
                    errorData?.detail ||
                    "Failed to update admission status."
                );

            }


            const updatedAdmission =
                await response.json();


            const index =
                admissions.findIndex(
                    item =>
                        item.id === admission.id
                );


            if (index !== -1) {

                admissions[index] =
                    updatedAdmission;

            }


            updateStats();

            displayAdmissions();


        } catch (error) {

            console.error(
                "Status update error:",
                error
            );

            alert(
                "Failed to update status.\n\n" +
                error.message
            );

        }

    }


    /* ==========================================
            EDIT ADMISSION
    ========================================== */

    async function editAdmission(
        admission
    ) {

        const name =
            prompt(
                "Applicant Name:",
                admission.applicant_name || ""
            );


        if (name === null) return;


        const email =
            prompt(
                "Email:",
                admission.email || ""
            );


        if (email === null) return;


        const course =
            prompt(
                "Course:",
                admission.course || ""
            );


        if (course === null) return;


        const year =
            prompt(
                "Admission Year:",
                admission.admission_year || "2026-27"
            );


        if (year === null) return;


        const status =
            prompt(
                "Status (Pending / Approved / Rejected):",
                admission.status || "Pending"
            );


        if (status === null) return;


        const normalizedStatus =
            normalizeStatus(status);


        if (!normalizedStatus) {

            alert(
                "Invalid status.\n\n" +
                "Use: Pending, Approved or Rejected."
            );

            return;

        }


        const data = {

            applicant_name:
                name.trim(),

            email:
                email.trim(),

            course:
                course.trim(),

            admission_year:
                year.trim(),

            status:
                normalizedStatus

        };


        try {

            const response =
                await fetch(
                    `${BACKEND_URL}/admissions/${admission.id}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(data)
                    }
                );


            if (!response.ok) {

                const errorData =
                    await response.json()
                    .catch(() => null);

                throw new Error(
                    errorData?.detail ||
                    "Failed to update admission."
                );

            }


            const updatedAdmission =
                await response.json();


            const index =
                admissions.findIndex(
                    item =>
                        item.id === admission.id
                );


            if (index !== -1) {

                admissions[index] =
                    updatedAdmission;

            }


            updateStats();

            displayAdmissions();


        } catch (error) {

            console.error(
                "Edit admission error:",
                error
            );

            alert(
                "Failed to update admission.\n\n" +
                error.message
            );

        }

    }


    /* ==========================================
            NORMALIZE STATUS
    ========================================== */

    function normalizeStatus(status) {

        const value =
            status.trim().toLowerCase();


        if (value === "pending") {
            return "Pending";
        }

        if (value === "approved") {
            return "Approved";
        }

        if (value === "rejected") {
            return "Rejected";
        }

        return null;

    }


    /* ==========================================
            NEW ADMISSION
    ========================================== */

    if (newAdmissionButton) {

        newAdmissionButton.addEventListener(
            "click",
            async function () {

                const name =
                    prompt(
                        "Applicant Name:"
                    );


                if (
                    name === null ||
                    name.trim() === ""
                ) {
                    return;
                }


                const email =
                    prompt(
                        "Applicant Email:"
                    );


                if (
                    email === null ||
                    email.trim() === ""
                ) {
                    return;
                }


                const course =
                    prompt(
                        "Course:"
                    );


                if (
                    course === null ||
                    course.trim() === ""
                ) {
                    return;
                }


                const year =
                    prompt(
                        "Admission Year:",
                        "2026-27"
                    );


                if (
                    year === null ||
                    year.trim() === ""
                ) {
                    return;
                }


                const data = {

                    applicant_name:
                        name.trim(),

                    email:
                        email.trim(),

                    course:
                        course.trim(),

                    admission_year:
                        year.trim(),

                    status:
                        "Pending"

                };


                try {

                    const response =
                        await fetch(
                            `${BACKEND_URL}/admissions/`,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(data)
                            }
                        );


                    if (!response.ok) {

                        const errorData =
                            await response.json()
                            .catch(() => null);

                        throw new Error(
                            errorData?.detail ||
                            "Failed to create admission."
                        );

                    }


                    const newAdmission =
                        await response.json();


                    admissions.unshift(
                        newAdmission
                    );


                    updateStats();

                    currentPage = 1;

                    displayAdmissions();


                    alert(
                        "Admission application created successfully."
                    );


                } catch (error) {

                    console.error(
                        "Create admission error:",
                        error
                    );

                    alert(
                        "Failed to create admission.\n\n" +
                        error.message
                    );

                }

            }
        );

    }


    /* ==========================================
            SEARCH
    ========================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                currentPage = 1;

                displayAdmissions();

            }
        );

    }


    /* ==========================================
            FILTERS
    ========================================== */

    [
        statusFilter,
        courseFilter,
        yearFilter
    ].forEach(function (filter) {

        if (filter) {

            filter.addEventListener(
                "change",
                function () {

                    currentPage = 1;

                    displayAdmissions();

                }
            );

        }

    });


    /* ==========================================
            RESET FILTERS
    ========================================== */

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            function () {

                if (searchInput) {
                    searchInput.value = "";
                }

                if (statusFilter) {
                    statusFilter.value = "all";
                }

                if (courseFilter) {
                    courseFilter.value = "all";
                }

                if (yearFilter) {
                    yearFilter.value = "all";
                }

                currentPage = 1;

                displayAdmissions();

            }
        );

    }


    /* ==========================================
            VIEW ALL
    ========================================== */

    if (viewAllButton) {

        viewAllButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                if (searchInput) {
                    searchInput.value = "";
                }

                if (statusFilter) {
                    statusFilter.value = "all";
                }

                if (courseFilter) {
                    courseFilter.value = "all";
                }

                if (yearFilter) {
                    yearFilter.value = "all";
                }

                currentPage = 1;

                displayAdmissions();

            }
        );

    }


    /* ==========================================
            PAGINATION
    ========================================== */

    function updatePagination(totalItems) {

        if (!paginationContainer) return;


        const totalPages =
            Math.max(
                1,
                Math.ceil(
                    totalItems /
                    rowsPerPage
                )
            );


        paginationContainer
            .querySelectorAll(
                ".page-number"
            )
            .forEach(
                button =>
                    button.remove()
            );


        const activeArrowButtons =
            paginationContainer.querySelectorAll(
                "#prevPage, #nextPage"
            );


        const nextButton =
            paginationContainer.querySelector(
                "#nextPage"
            );


        for (
            let page = 1;
            page <= totalPages;
            page++
        ) {

            const button =
                document.createElement("button");


            button.className =
                "page-number";


            if (page === currentPage) {
                button.classList.add(
                    "active-page"
                );
            }


            button.textContent =
                page;


            button.addEventListener(
                "click",
                function () {

                    currentPage = page;

                    displayAdmissions();

                }
            );


            if (nextButton) {

                paginationContainer.insertBefore(
                    button,
                    nextButton
                );

            } else {

                paginationContainer.appendChild(
                    button
                );

            }

        }


        if (prevPageButton) {

            prevPageButton.disabled =
                currentPage === 1;

        }


        if (nextPageButton) {

            nextPageButton.disabled =
                currentPage === totalPages;

        }

    }


    if (prevPageButton) {

        prevPageButton.addEventListener(
            "click",
            function () {

                if (currentPage > 1) {

                    currentPage--;

                    displayAdmissions();

                }

            }
        );

    }


    if (nextPageButton) {

        nextPageButton.addEventListener(
            "click",
            function () {

                const filteredAdmissions =
                    getFilteredAdmissions();


                const totalPages =
                    Math.max(
                        1,
                        Math.ceil(
                            filteredAdmissions.length /
                            rowsPerPage
                        )
                    );


                if (
                    currentPage <
                    totalPages
                ) {

                    currentPage++;

                    displayAdmissions();

                }

            }
        );

    }


    /* ==========================================
            LOGOUT
    ========================================== */

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                const confirmed =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (confirmed) {

                    window.location.href =
                        "admin-login.html";

                }

            }
        );

    }


    /* ==========================================
            INITIAL LOAD
    ========================================== */

    loadAdmissions();

});