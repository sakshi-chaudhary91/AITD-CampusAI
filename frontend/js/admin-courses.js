/* ==========================================
        ADMIN COURSES PAGE
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
            SEARCH COURSES
    ========================================== */

    const searchInput = document.querySelector(".search-box input");
    const courseRows = document.querySelectorAll(".course-table tbody tr");

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const searchValue = this.value.toLowerCase().trim();

            courseRows.forEach(function (row) {

                const rowText = row.textContent.toLowerCase();

                if (rowText.includes(searchValue)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }

            });

        });

    }


    /* ==========================================
            ADD COURSE BUTTON
    ========================================== */

    const addButton = document.querySelector(".add-btn");

    if (addButton) {

        addButton.addEventListener("click", function () {

            alert("Add Course feature will be connected to the backend.");

        });

    }


    /* ==========================================
            VIEW COURSE
    ========================================== */

    const viewButtons = document.querySelectorAll(".view-btn");

    viewButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const row = this.closest("tr");

            if (!row) return;

            const courseName =
                row.querySelector(".course-info h4")?.textContent ||
                "Course";

            alert("Viewing course: " + courseName);

        });

    });


    /* ==========================================
            EDIT COURSE
    ========================================== */

    const editButtons = document.querySelectorAll(".edit-btn");

    editButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const row = this.closest("tr");

            if (!row) return;

            const courseName =
                row.querySelector(".course-info h4")?.textContent ||
                "Course";

            alert("Edit course: " + courseName);

        });

    });


    /* ==========================================
            DELETE COURSE
    ========================================== */

    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const row = this.closest("tr");

            if (!row) return;

            const courseName =
                row.querySelector(".course-info h4")?.textContent ||
                "Course";

            const confirmDelete = confirm(
                "Are you sure you want to delete " +
                courseName +
                "?"
            );

            if (confirmDelete) {

                row.remove();

            }

        });

    });


    /* ==========================================
            PAGINATION
    ========================================== */

    const paginationButtons =
        document.querySelectorAll(".table-pagination button");

    paginationButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const pageNumber = this.textContent.trim();

            if (
                pageNumber !== "" &&
                !isNaN(pageNumber)
            ) {

                paginationButtons.forEach(function (btn) {

                    btn.classList.remove("active-page");

                });

                this.classList.add("active-page");

            }

        });

    });


    /* ==========================================
            RESET SEARCH / FILTERS
    ========================================== */

    const resetButton = document.querySelector(".reset-btn");

    if (resetButton) {

        resetButton.addEventListener("click", function () {

            if (searchInput) {
                searchInput.value = "";
            }

            const selects =
                document.querySelectorAll(".filter-group select");

            selects.forEach(function (select) {
                select.selectedIndex = 0;
            });

            courseRows.forEach(function (row) {
                row.style.display = "";
            });

        });

    }


    /* ==========================================
            FILTER COURSES
    ========================================== */

    const filterSelects =
        document.querySelectorAll(".filter-group select");

    filterSelects.forEach(function (select) {

        select.addEventListener("change", function () {

            applyFilters();

        });

    });


    function applyFilters() {

        const selects =
            document.querySelectorAll(".filter-group select");

        if (selects.length === 0) return;

        const branchFilter =
            selects[0]?.value.toLowerCase() || "";

        const yearFilter =
            selects[1]?.value.toLowerCase() || "";

        courseRows.forEach(function (row) {

            const rowText =
                row.textContent.toLowerCase();

            let showRow = true;

            if (
                branchFilter &&
                branchFilter !== "all" &&
                !rowText.includes(branchFilter)
            ) {
                showRow = false;
            }

            if (
                yearFilter &&
                yearFilter !== "all" &&
                !rowText.includes(yearFilter)
            ) {
                showRow = false;
            }

            row.style.display =
                showRow ? "" : "none";

        });

    }


    /* ==========================================
            SIDEBAR MOBILE SUPPORT
    ========================================== */

    const sidebar =
        document.querySelector(".sidebar");

    if (sidebar) {

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                sidebar.classList.remove("active");

            }

        });

    }

});