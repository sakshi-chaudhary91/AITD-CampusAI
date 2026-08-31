/* ==========================================
        AITD CAMPUSAI — ADMIN NOTICES
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
            ELEMENTS
    ========================================== */

    const searchInput = document.querySelector(".search-box input");

    const categorySelect = document.querySelector("#categoryFilter");

    const statusSelect = document.querySelector("#statusFilter");

    const resetButton = document.querySelector(".reset-btn");

    const noticeRows = document.querySelectorAll(
        ".notice-table tbody tr"
    );

    const paginationButtons = document.querySelectorAll(
        ".table-pagination button"
    );

    const addButton = document.querySelector(".add-btn");


    /* ==========================================
            SEARCH + FILTER
    ========================================== */

    function filterNotices() {

        const searchValue = searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

        const categoryValue = categorySelect
            ? categorySelect.value.toLowerCase()
            : "all";

        const statusValue = statusSelect
            ? statusSelect.value.toLowerCase()
            : "all";


        noticeRows.forEach(function (row) {

            const rowText = row.textContent.toLowerCase();

            let categoryMatch = true;
            let statusMatch = true;
            let searchMatch = true;


            /* ---------- SEARCH ---------- */

            if (searchValue !== "") {

                searchMatch = rowText.includes(searchValue);

            }


            /* ---------- CATEGORY ---------- */

            if (categoryValue !== "all") {

                const categoryElement =
                    row.querySelector(".category");

                if (categoryElement) {

                    categoryMatch =
                        categoryElement.textContent
                            .toLowerCase()
                            .trim()
                            .includes(categoryValue);

                } else {

                    categoryMatch = false;

                }

            }


            /* ---------- STATUS ---------- */

            if (statusValue !== "all") {

                const statusElement =
                    row.querySelector(".status");

                if (statusElement) {

                    statusMatch =
                        statusElement.textContent
                            .toLowerCase()
                            .trim()
                            .includes(statusValue);

                } else {

                    statusMatch = false;

                }

            }


            /* ---------- FINAL RESULT ---------- */

            if (
                searchMatch &&
                categoryMatch &&
                statusMatch
            ) {

                row.style.display = "";

            } else {

                row.style.display = "none";

            }

        });

    }


    /* ==========================================
            SEARCH EVENT
    ========================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterNotices
        );

    }


    /* ==========================================
            CATEGORY FILTER
    ========================================== */

    if (categorySelect) {

        categorySelect.addEventListener(
            "change",
            filterNotices
        );

    }


    /* ==========================================
            STATUS FILTER
    ========================================== */

    if (statusSelect) {

        statusSelect.addEventListener(
            "change",
            filterNotices
        );

    }


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

                if (categorySelect) {

                    categorySelect.value = "all";

                }

                if (statusSelect) {

                    statusSelect.value = "all";

                }

                filterNotices();

            }
        );

    }


    /* ==========================================
            ADD NOTICE BUTTON
    ========================================== */

    if (addButton) {

        addButton.addEventListener(
            "click",
            function () {

                alert(
                    "Create Notice feature will be connected to the backend soon."
                );

            }
        );

    }


    /* ==========================================
            VIEW BUTTON
    ========================================== */

    const viewButtons =
        document.querySelectorAll(".view-btn");

    viewButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const row =
                    button.closest("tr");

                if (!row) return;


                const noticeTitle =
                    row.querySelector(
                        ".notice-info h4"
                    );


                if (noticeTitle) {

                    alert(
                        "Viewing Notice:\n\n" +
                        noticeTitle.textContent.trim()
                    );

                }

            }
        );

    });


    /* ==========================================
            EDIT BUTTON
    ========================================== */

    const editButtons =
        document.querySelectorAll(".edit-btn");

    editButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const row =
                    button.closest("tr");

                if (!row) return;


                const noticeTitle =
                    row.querySelector(
                        ".notice-info h4"
                    );


                if (noticeTitle) {

                    alert(
                        "Edit Notice:\n\n" +
                        noticeTitle.textContent.trim()
                    );

                }

            }
        );

    });


    /* ==========================================
            DELETE BUTTON
    ========================================== */

    const deleteButtons =
        document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const row =
                    button.closest("tr");

                if (!row) return;


                const noticeTitle =
                    row.querySelector(
                        ".notice-info h4"
                    );


                const title =
                    noticeTitle
                        ? noticeTitle.textContent.trim()
                        : "this notice";


                const confirmed =
                    confirm(
                        "Are you sure you want to delete:\n\n" +
                        title +
                        "?"
                    );


                if (confirmed) {

                    row.remove();

                }

            }
        );

    });


    /* ==========================================
            PAGINATION
    ========================================== */

    paginationButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const buttonText =
                    button.textContent.trim();


                /* Ignore arrow buttons */

                if (
                    buttonText === "" ||
                    button.querySelector(
                        ".fa-angle-left"
                    ) ||
                    button.querySelector(
                        ".fa-angle-right"
                    )
                ) {

                    return;

                }


                paginationButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active-page"
                        );

                    }
                );


                button.classList.add(
                    "active-page"
                );


                console.log(
                    "Notice page:",
                    buttonText
                );

            }
        );

    });


    /* ==========================================
            INITIAL FILTER
    ========================================== */

    filterNotices();

});