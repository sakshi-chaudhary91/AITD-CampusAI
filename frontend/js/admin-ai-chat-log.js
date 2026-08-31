// ==========================================
//        AI CHAT LOGS JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // ELEMENTS
    // ==========================================

    const searchInput = document.querySelector(".search-box input");

    const statusFilter = document.getElementById("statusFilter");

    const dateFilter = document.getElementById("dateFilter");

    const resetFilter = document.querySelector(".reset-filter");

    const clearLogsBtn = document.querySelector(".clear-btn");

    const tableRows = document.querySelectorAll(
        ".chat-table tbody tr"
    );

    const paginationButtons = document.querySelectorAll(
        ".table-pagination button"
    );


    // ==========================================
    // SEARCH FUNCTION
    // ==========================================

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const searchValue =
                searchInput.value.toLowerCase().trim();

            tableRows.forEach(function (row) {

                const rowText =
                    row.textContent.toLowerCase();

                if (rowText.includes(searchValue)) {

                    row.style.display = "";

                } else {

                    row.style.display = "none";

                }

            });

        });

    }


    // ==========================================
    // STATUS FILTER
    // ==========================================

    if (statusFilter) {

        statusFilter.addEventListener("change", function () {

            const selectedStatus =
                statusFilter.value.toLowerCase();

            tableRows.forEach(function (row) {

                const statusElement =
                    row.querySelector(".chat-status");

                if (!statusElement) return;

                const statusText =
                    statusElement.textContent
                    .trim()
                    .toLowerCase();

                if (
                    selectedStatus === "all" ||
                    statusText.includes(selectedStatus)
                ) {

                    row.style.display = "";

                } else {

                    row.style.display = "none";

                }

            });

        });

    }


    // ==========================================
    // DATE FILTER
    // ==========================================

    if (dateFilter) {

        dateFilter.addEventListener("change", function () {

            const selectedDate =
                dateFilter.value;

            /*
                Demo UI:
                Since the current HTML contains
                static sample dates, this filter
                provides basic visual filtering.
            */

            if (selectedDate === "all") {

                tableRows.forEach(function (row) {

                    row.style.display = "";

                });

                return;

            }

            tableRows.forEach(function (row) {

                const dateElement =
                    row.querySelector(".date-time span");

                if (!dateElement) return;

                const dateText =
                    dateElement.textContent
                    .trim()
                    .toLowerCase();

                let showRow = true;

                if (selectedDate === "today") {

                    showRow =
                        dateText.includes("31 aug 2026");

                }

                else if (selectedDate === "week") {

                    showRow =
                        dateText.includes("31 aug 2026") ||
                        dateText.includes("30 aug 2026");

                }

                else if (selectedDate === "month") {

                    showRow =
                        dateText.includes("aug 2026");

                }

                row.style.display =
                    showRow ? "" : "none";

            });

        });

    }


    // ==========================================
    // RESET FILTER
    // ==========================================

    if (resetFilter) {

        resetFilter.addEventListener("click", function () {

            if (statusFilter) {

                statusFilter.value = "all";

            }

            if (dateFilter) {

                dateFilter.value = "all";

            }

            if (searchInput) {

                searchInput.value = "";

            }

            tableRows.forEach(function (row) {

                row.style.display = "";

            });

        });

    }


    // ==========================================
    // VIEW CONVERSATION
    // ==========================================

    const viewButtons =
        document.querySelectorAll(".view-btn");

    viewButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const row =
                button.closest("tr");

            if (!row) return;

            const conversationId =
                row.querySelector(".conversation-id");

            const studentName =
                row.querySelector(".student-info h4");

            const messagePreview =
                row.querySelector(".message-preview");

            const messageCount =
                row.querySelector(".message-count");

            if (!conversationId) return;

            const id =
                conversationId.textContent.trim();

            const student =
                studentName
                    ? studentName.textContent.trim()
                    : "Unknown Student";

            const message =
                messagePreview
                    ? messagePreview.textContent.trim()
                    : "No message available";

            const messages =
                messageCount
                    ? messageCount.textContent.trim()
                    : "0";

            alert(
                "Conversation Details\n\n" +
                "ID: " + id + "\n" +
                "Student: " + student + "\n" +
                "Messages: " + messages + "\n\n" +
                message
            );

        });

    });


    // ==========================================
    // DELETE SINGLE CHAT
    // ==========================================

    const deleteButtons =
        document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const row =
                button.closest("tr");

            if (!row) return;

            const conversationId =
                row.querySelector(".conversation-id");

            const id =
                conversationId
                    ? conversationId.textContent.trim()
                    : "this conversation";

            const confirmed =
                confirm(
                    "Are you sure you want to delete " +
                    id +
                    "?"
                );

            if (confirmed) {

                row.remove();

            }

        });

    });


    // ==========================================
    // CLEAR ALL LOGS
    // ==========================================

    if (clearLogsBtn) {

        clearLogsBtn.addEventListener(
            "click",
            function () {

                const confirmed =
                    confirm(
                        "Are you sure you want to clear all AI chat logs?"
                    );

                if (!confirmed) return;

                const tbody =
                    document.querySelector(
                        ".chat-table tbody"
                    );

                if (tbody) {

                    tbody.innerHTML = "";

                }

                alert(
                    "All chat logs have been cleared."
                );

            }
        );

    }


    // ==========================================
    // PAGINATION
    // ==========================================

    paginationButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            if (
                button.querySelector(
                    ".fa-angle-left"
                )
            ) {

                return;

            }

            if (
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

        });

    });


    // ==========================================
    // LOGOUT
    // ==========================================

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

                    window.location.href =
                        "admin-login.html";

                }

            }
        );

    }

});