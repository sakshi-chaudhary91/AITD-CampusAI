/* ==========================================
        AITD CAMPUSAI
        ADMIN SCHOLARSHIPS PAGE
========================================== */


/* ==========================================
        DOM READY
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ======================================
            ELEMENTS
    ====================================== */

    const searchInput =
        document.querySelector(".search-box input");

    const scholarshipTable =
        document.querySelector(".scholarship-table");

    const tableBody =
        scholarshipTable
            ? scholarshipTable.querySelector("tbody")
            : null;

    const resetBtn =
        document.querySelector(".reset-btn");

    const filterSelects =
        document.querySelectorAll(".filter-group select");

    const addBtn =
        document.querySelector(".add-btn");

    const paginationButtons =
        document.querySelectorAll(
            ".table-pagination button"
        );


    /* ======================================
            SEARCH SCHOLARSHIPS
    ====================================== */

    if (searchInput && tableBody) {

        searchInput.addEventListener(
            "input",
            function () {

                const searchValue =
                    this.value
                        .toLowerCase()
                        .trim();

                const rows =
                    tableBody.querySelectorAll("tr");

                rows.forEach(function (row) {

                    const rowText =
                        row.textContent.toLowerCase();

                    if (
                        rowText.includes(searchValue)
                    ) {

                        row.style.display = "";

                    } else {

                        row.style.display = "none";

                    }

                });

            }
        );

    }


    /* ======================================
            FILTER SCHOLARSHIPS
    ====================================== */

    function applyFilters() {

        if (!tableBody) return;

        const rows =
            tableBody.querySelectorAll("tr");

        const selectedValues = [];

        filterSelects.forEach(function (select) {

            selectedValues.push(
                select.value.toLowerCase()
            );

        });


        rows.forEach(function (row) {

            const rowText =
                row.textContent.toLowerCase();

            let showRow = true;


            selectedValues.forEach(function (value) {

                if (
                    value &&
                    value !== "all" &&
                    !rowText.includes(value)
                ) {

                    showRow = false;

                }

            });


            row.style.display =
                showRow ? "" : "none";

        });

    }


    /* ======================================
            FILTER EVENTS
    ====================================== */

    filterSelects.forEach(function (select) {

        select.addEventListener(
            "change",
            applyFilters
        );

    });


    /* ======================================
            RESET FILTERS
    ====================================== */

    if (resetBtn) {

        resetBtn.addEventListener(
            "click",
            function () {

                filterSelects.forEach(
                    function (select) {

                        select.selectedIndex = 0;

                    }
                );


                if (searchInput) {

                    searchInput.value = "";

                }


                if (tableBody) {

                    const rows =
                        tableBody.querySelectorAll("tr");

                    rows.forEach(function (row) {

                        row.style.display = "";

                    });

                }

            }
        );

    }


    /* ======================================
            ADD SCHOLARSHIP BUTTON
    ====================================== */

    if (addBtn) {

        addBtn.addEventListener(
            "click",
            function () {

                alert(
                    "Add Scholarship feature will be connected to the backend."
                );

            }
        );

    }


    /* ======================================
            VIEW BUTTON
    ====================================== */

    const viewButtons =
        document.querySelectorAll(".view-btn");

    viewButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const row =
                    this.closest("tr");

                if (!row) return;

                const scholarshipName =
                    row.querySelector(
                        ".scholarship-info h4"
                    );

                if (scholarshipName) {

                    alert(
                        "Viewing scholarship: " +
                        scholarshipName.textContent.trim()
                    );

                }

            }
        );

    });


    /* ======================================
            EDIT BUTTON
    ====================================== */

    const editButtons =
        document.querySelectorAll(".edit-btn");

    editButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const row =
                    this.closest("tr");

                if (!row) return;

                const scholarshipName =
                    row.querySelector(
                        ".scholarship-info h4"
                    );

                if (scholarshipName) {

                    alert(
                        "Edit scholarship: " +
                        scholarshipName.textContent.trim()
                    );

                }

            }
        );

    });


    /* ======================================
            DELETE BUTTON
    ====================================== */

    const deleteButtons =
        document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const row =
                    this.closest("tr");

                if (!row) return;


                const scholarshipName =
                    row.querySelector(
                        ".scholarship-info h4"
                    );


                const name =
                    scholarshipName
                        ? scholarshipName.textContent.trim()
                        : "this scholarship";


                const confirmed =
                    confirm(
                        "Are you sure you want to delete " +
                        name +
                        "?"
                    );


                if (confirmed) {

                    row.remove();

                }

            }
        );

    });


    /* ======================================
            PAGINATION
    ====================================== */

    paginationButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const isArrow =
                    this.querySelector(
                        ".fa-angle-left, .fa-angle-right"
                    );


                if (isArrow) {

                    return;

                }


                paginationButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active-page"
                        );

                    }
                );


                this.classList.add(
                    "active-page"
                );

            }
        );

    });


    /* ======================================
            TABLE ROW HOVER ACCESSIBILITY
    ====================================== */

    if (tableBody) {

        const rows =
            tableBody.querySelectorAll("tr");

        rows.forEach(function (row) {

            row.addEventListener(
                "click",
                function () {

                    rows.forEach(
                        function (otherRow) {

                            otherRow.classList.remove(
                                "selected-row"
                            );

                        }
                    );

                    this.classList.add(
                        "selected-row"
                    );

                }
            );

        });

    }


    /* ======================================
            ESC KEY
            CLEAR SEARCH
    ====================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                searchInput
            ) {

                searchInput.value = "";

                searchInput.dispatchEvent(
                    new Event("input")
                );

            }

        }
    );

});