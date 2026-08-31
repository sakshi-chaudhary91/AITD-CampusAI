document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
            SEARCH
    ========================================== */

    const searchInput = document.querySelector(".search-box input");
    const tableRows = document.querySelectorAll(".admission-table tbody tr");

    if (searchInput) {
        searchInput.addEventListener("input", function () {

            const searchValue = this.value.toLowerCase().trim();

            tableRows.forEach(function (row) {

                const rowText = row.textContent.toLowerCase();

                row.style.display =
                    rowText.includes(searchValue) ? "" : "none";

            });
        });
    }


    /* ==========================================
            STATUS FILTER
    ========================================== */

    const statusFilter = document.querySelector("#statusFilter");

    if (statusFilter) {

        statusFilter.addEventListener("change", function () {

            applyFilters();

        });

    }


    /* ==========================================
            COURSE FILTER
    ========================================== */

    const courseFilter = document.querySelector("#courseFilter");

    if (courseFilter) {

        courseFilter.addEventListener("change", function () {

            applyFilters();

        });

    }


    /* ==========================================
            APPLY FILTERS
    ========================================== */

    function applyFilters() {

        const searchValue = searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

        const selectedStatus = statusFilter
            ? statusFilter.value.toLowerCase()
            : "all";

        const selectedCourse = courseFilter
            ? courseFilter.value.toLowerCase()
            : "all";


        tableRows.forEach(function (row) {

            const rowText = row.textContent.toLowerCase();

            const statusElement = row.querySelector(".status");

            const rowStatus = statusElement
                ? statusElement.textContent.toLowerCase().trim()
                : "";

            const searchMatch =
                rowText.includes(searchValue);

            const statusMatch =
                selectedStatus === "all" ||
                selectedStatus === "" ||
                rowStatus === selectedStatus;

            const courseMatch =
                selectedCourse === "all" ||
                selectedCourse === "" ||
                rowText.includes(selectedCourse);


            if (
                searchMatch &&
                statusMatch &&
                courseMatch
            ) {

                row.style.display = "";

            } else {

                row.style.display = "none";

            }

        });

    }


    /* ==========================================
            RESET FILTERS
    ========================================== */

    const resetButton = document.querySelector(".reset-btn");

    if (resetButton) {

        resetButton.addEventListener("click", function () {

            if (searchInput) {
                searchInput.value = "";
            }

            if (statusFilter) {
                statusFilter.value = "all";
            }

            if (courseFilter) {
                courseFilter.value = "all";
            }

            tableRows.forEach(function (row) {

                row.style.display = "";

            });

        });

    }


    /* ==========================================
            VIEW APPLICATION
    ========================================== */

    const viewButtons = document.querySelectorAll(".view-btn");

    viewButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const row = this.closest("tr");

            if (!row) return;

            const nameElement =
                row.querySelector(".applicant-info h4");

            const idElement =
                row.querySelector(".application-id");

            const name = nameElement
                ? nameElement.textContent.trim()
                : "Applicant";

            const applicationId = idElement
                ? idElement.textContent.trim()
                : "N/A";

            alert(
                "Application Details\n\n" +
                "Application ID: " +
                applicationId +
                "\nApplicant: " +
                name
            );

        });

    });


    /* ==========================================
            APPROVE APPLICATION
    ========================================== */

    const approveButtons =
        document.querySelectorAll(".approve-btn");

    approveButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const row = this.closest("tr");

            if (!row) return;

            const nameElement =
                row.querySelector(".applicant-info h4");

            const statusElement =
                row.querySelector(".status");

            const name = nameElement
                ? nameElement.textContent.trim()
                : "this applicant";


            const confirmed = confirm(
                "Approve admission application of " +
                name +
                "?"
            );


            if (!confirmed) return;


            if (statusElement) {

                statusElement.textContent = "Approved";

                statusElement.classList.remove(
                    "pending",
                    "rejected"
                );

                statusElement.classList.add(
                    "approved"
                );

            }


            /* Hide approve button */

            this.style.display = "none";


            /* Show reject button if present */

            const rejectButton =
                row.querySelector(".reject-btn");

            if (rejectButton) {
                rejectButton.style.display = "flex";
            }

        });

    });


    /* ==========================================
            REJECT APPLICATION
    ========================================== */

    const rejectButtons =
        document.querySelectorAll(".reject-btn");

    rejectButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const row = this.closest("tr");

            if (!row) return;

            const nameElement =
                row.querySelector(".applicant-info h4");

            const statusElement =
                row.querySelector(".status");

            const name = nameElement
                ? nameElement.textContent.trim()
                : "this applicant";


            const confirmed = confirm(
                "Reject admission application of " +
                name +
                "?"
            );


            if (!confirmed) return;


            if (statusElement) {

                statusElement.textContent = "Rejected";

                statusElement.classList.remove(
                    "pending",
                    "approved"
                );

                statusElement.classList.add(
                    "rejected"
                );

            }


            /* Hide reject button */

            this.style.display = "none";


            /* Show approve button */

            const approveButton =
                row.querySelector(".approve-btn");

            if (approveButton) {
                approveButton.style.display = "flex";
            }

        });

    });


    /* ==========================================
            EDIT APPLICATION
    ========================================== */

    const editButtons =
        document.querySelectorAll(".edit-btn");

    editButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const row = this.closest("tr");

            if (!row) return;

            const nameElement =
                row.querySelector(".applicant-info h4");

            const name = nameElement
                ? nameElement.textContent.trim()
                : "Applicant";

            alert(
                "Edit Application\n\n" +
                "Applicant: " +
                name
            );

        });

    });


    /* ==========================================
            PAGINATION
    ========================================== */

    const paginationButtons =
        document.querySelectorAll(
            ".table-pagination button"
        );


    paginationButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const isArrow =
                this.querySelector(".fa-angle-left") ||
                this.querySelector(".fa-angle-right");


            if (isArrow) {
                return;
            }


            paginationButtons.forEach(function (btn) {

                btn.classList.remove("active-page");

            });


            this.classList.add("active-page");

        });

    });


    /* ==========================================
            LOGOUT
    ========================================== */

    const logoutButton =
        document.querySelector(".sidebar-bottom button");


    if (logoutButton) {

        logoutButton.addEventListener("click", function () {

            const confirmed = confirm(
                "Are you sure you want to logout?"
            );


            if (confirmed) {

                window.location.href =
                    "admin-login.html";

            }

        });

    }

});