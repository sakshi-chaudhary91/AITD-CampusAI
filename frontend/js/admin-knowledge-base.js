/* ==========================================
        AITD CAMPUSAI
        ADMIN KNOWLEDGE BASE
========================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* ======================================
            ELEMENTS
    ====================================== */

    const searchInput =
        document.querySelector(".search-box input");

    const tableBody =
        document.querySelector(".knowledge-table tbody");

    const rebuildKnowledge =
        document.getElementById("rebuildKnowledge");

    const rebuildIndex =
        document.getElementById("rebuildIndex");

    const uploadDocument =
        document.getElementById("uploadDocument");

    const clearCache =
        document.getElementById("clearCache");

    const paginationButtons =
        document.querySelectorAll(
            ".table-pagination button"
        );


    /* ======================================
            SEARCH KNOWLEDGE SOURCES
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
                        row.textContent
                            .toLowerCase();

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
            REBUILD KNOWLEDGE BUTTON
    ====================================== */

    if (rebuildKnowledge) {

        rebuildKnowledge.addEventListener(
            "click",
            function () {

                const originalHTML =
                    this.innerHTML;


                const confirmed =
                    confirm(
                        "Rebuild the complete knowledge base index?"
                    );


                if (!confirmed) {

                    return;

                }


                this.disabled = true;

                this.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Rebuilding...';


                setTimeout(
                    function () {

                        rebuildKnowledge.disabled =
                            false;

                        rebuildKnowledge.innerHTML =
                            originalHTML;


                        alert(
                            "Knowledge base rebuilt successfully."
                        );

                    },
                    1800
                );

            }
        );

    }


    /* ======================================
            REBUILD INDEX QUICK ACTION
    ====================================== */

    if (rebuildIndex) {

        rebuildIndex.addEventListener(
            "click",
            function () {

                const confirmed =
                    confirm(
                        "Do you want to rebuild the FAISS index?"
                    );


                if (!confirmed) {

                    return;

                }


                const icon =
                    this.querySelector(
                        ".fa-arrows-rotate"
                    );


                if (icon) {

                    icon.classList.add(
                        "fa-spin"
                    );

                }


                this.disabled = true;


                setTimeout(
                    function () {

                        rebuildIndex.disabled =
                            false;


                        if (icon) {

                            icon.classList.remove(
                                "fa-spin"
                            );

                        }


                        alert(
                            "FAISS index rebuilt successfully."
                        );

                    },
                    1800
                );

            }
        );

    }


    /* ======================================
            UPLOAD DOCUMENT
    ====================================== */

    if (uploadDocument) {

        uploadDocument.addEventListener(
            "click",
            function () {

                window.location.href =
                    "admin-pdf-upload.html";

            }
        );

    }


    /* ======================================
            CLEAR CACHE
    ====================================== */

    if (clearCache) {

        clearCache.addEventListener(
            "click",
            function () {

                const confirmed =
                    confirm(
                        "Are you sure you want to clear the processing cache?"
                    );


                if (!confirmed) {

                    return;

                }


                const icon =
                    this.querySelector(
                        ".fa-broom"
                    );


                if (icon) {

                    icon.classList.add(
                        "fa-spin"
                    );

                }


                this.disabled = true;


                setTimeout(
                    function () {

                        clearCache.disabled =
                            false;


                        if (icon) {

                            icon.classList.remove(
                                "fa-spin"
                            );

                        }


                        alert(
                            "Processing cache cleared successfully."
                        );

                    },
                    1000
                );

            }
        );

    }


    /* ======================================
            PAGINATION
    ====================================== */

    paginationButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {


                    /*
                        Ignore arrow buttons
                    */

                    const arrow =
                        this.querySelector(
                            ".fa-angle-left, .fa-angle-right"
                        );


                    if (arrow) {

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

        }
    );


    /* ======================================
            SIDEBAR LOGOUT
    ====================================== */

    const logoutButton =
        document.querySelector(
            ".sidebar-bottom button"
        );


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                const confirmed =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (confirmed) {

                    /*
                        Later connect this with
                        real authentication.
                    */

                    alert(
                        "Logout functionality will be connected with authentication."
                    );

                }

            }
        );

    }


});