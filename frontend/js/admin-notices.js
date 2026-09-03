/* ==========================================
        AITD CAMPUSAI — ADMIN NOTICES
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
            ELEMENTS
    ========================================== */

    const searchInput =
        document.querySelector(".search-box input");

    const filterSelects =
        document.querySelectorAll(".filter-group select");

    const categorySelect =
        filterSelects[0];

    const statusSelect =
        filterSelects[1];

    const resetButton =
        document.querySelector(".reset-btn");

    const tableBody =
        document.querySelector(".notice-table tbody");

    const paginationButtons =
        document.querySelectorAll(
            ".table-pagination button"
        );

    const addButton =
        document.querySelector(".add-btn");

    const statValues =
        document.querySelectorAll(
            ".stats-grid .stat-card h2"
        );

    const BACKEND_URL =
        "http://127.0.0.1:8000";

    let notices = [];
    let editingNoticeId = null;


    /* ==========================================
            LOAD NOTICES
    ========================================== */

    loadNotices();


    async function loadNotices() {

        try {

            const response =
                await fetch(
                    `${BACKEND_URL}/notices/`
                );

            if (!response.ok) {

                throw new Error(
                    "Failed to load notices."
                );

            }

            notices =
                await response.json();

            updateStats();

            renderNotices();

        } catch (error) {

            console.error(
                "Error loading notices:",
                error
            );

            if (tableBody) {

                tableBody.innerHTML = `
                    <tr>
                        <td
                            colspan="7"
                            style="text-align:center;"
                        >
                            Failed to load notices.
                        </td>
                    </tr>
                `;

            }

        }

    }


    /* ==========================================
            UPDATE STATS
    ========================================== */

    function updateStats() {

        if (
            !statValues ||
            statValues.length < 4
        ) {

            return;

        }

        const totalNotices =
            notices.length;

        const published =
            notices.length;

        const scheduled = 0;

        const drafts = 0;

        statValues[0].textContent =
            totalNotices;

        statValues[1].textContent =
            published;

        statValues[2].textContent =
            scheduled;

        statValues[3].textContent =
            drafts;

    }


    /* ==========================================
            RENDER NOTICES
    ========================================== */

    function renderNotices() {

        if (!tableBody) {

            return;

        }

        tableBody.innerHTML = "";

        if (
            !notices ||
            notices.length === 0
        ) {

            tableBody.innerHTML = `
                <tr>
                    <td
                        colspan="7"
                        style="text-align:center;"
                    >
                        No notices available.
                    </td>
                </tr>
            `;

            return;

        }

        notices.forEach(
            function (notice, index) {

                addNoticeRow(
                    notice,
                    index
                );

            }
        );

        applyFilters();

    }


    /* ==========================================
            ADD NOTICE ROW
    ========================================== */

    function addNoticeRow(
        notice,
        index
    ) {

        const row =
            document.createElement("tr");

        const noticeId =
            "NT" +
            String(
                notice.id
            ).padStart(
                3,
                "0"
            );

        const category =
            notice.category ||
            "general";

        const categoryClass =
            category
                .toLowerCase()
                .replace(
                    /\s+/g,
                    "-"
                );

        const iconClass =
            getNoticeIconClass(
                category
            );

        row.dataset.noticeId =
            notice.id;

        row.innerHTML = `

            <td>

                <span class="notice-id">
                    ${noticeId}
                </span>

            </td>

            <td>

                <div class="notice-info">

                    <div
                        class="notice-icon ${iconClass}"
                    >

                        <i
                            class="fa-solid fa-file-lines"
                        ></i>

                    </div>

                    <div>

                        <h4>
                            ${escapeHTML(
                                notice.title
                            )}
                        </h4>

                        <span>
                            ${escapeHTML(
                                notice.description
                            )}
                        </span>

                    </div>

                </div>

            </td>

            <td>

                <span
                    class="category ${categoryClass}"
                >

                    ${formatCategory(
                        category
                    )}

                </span>

            </td>

            <td>
                Admin Office
            </td>

            <td>
                -
            </td>

            <td>

                <span
                    class="status published"
                >
                    Published
                </span>

            </td>

            <td>

                <div class="action-buttons">

                    <button
                        class="view-btn"
                        data-id="${notice.id}"
                    >

                        <i
                            class="fa-solid fa-eye"
                        ></i>

                    </button>

                    <button
                        class="edit-btn"
                        data-id="${notice.id}"
                    >

                        <i
                            class="fa-solid fa-pen"
                        ></i>

                    </button>

                    <button
                        class="delete-btn"
                        data-id="${notice.id}"
                    >

                        <i
                            class="fa-solid fa-trash"
                        ></i>

                    </button>

                </div>

            </td>

        `;

        tableBody.appendChild(row);

    }


    /* ==========================================
            CATEGORY ICON
    ========================================== */

    function getNoticeIconClass(
        category
    ) {

        const normalized =
            category.toLowerCase();

        switch (normalized) {

            case "academic":
                return "blue";

            case "exam":
            case "examination":
                return "orange";

            case "event":
            case "events":
                return "purple";

            case "placement":
                return "orange";

            case "general":
                return "green";

            default:
                return "blue";

        }

    }


    /* ==========================================
            FORMAT CATEGORY
    ========================================== */

    function formatCategory(
        category
    ) {

        if (!category) {

            return "General";

        }

        return category
            .charAt(0)
            .toUpperCase() +
            category.slice(1);

    }


    /* ==========================================
            ESCAPE HTML
    ========================================== */

    function escapeHTML(
        value
    ) {

        const div =
            document.createElement(
                "div"
            );

        div.textContent =
            value ?? "";

        return div.innerHTML;

    }


    /* ==========================================
            FILTER NOTICES
    ========================================== */

    function applyFilters() {

        if (!tableBody) {

            return;

        }

        const searchValue =
            searchInput
                ? searchInput.value
                    .toLowerCase()
                    .trim()
                : "";

        const categoryValue =
            categorySelect
                ? categorySelect.value
                    .toLowerCase()
                : "all";

        const statusValue =
            statusSelect
                ? statusSelect.value
                    .toLowerCase()
                : "all";

        const rows =
            tableBody.querySelectorAll(
                "tr"
            );

        rows.forEach(
            function (row) {

                if (
                    !row.dataset.noticeId
                ) {

                    return;

                }

                const rowText =
                    row.textContent
                        .toLowerCase();

                const categoryElement =
                    row.querySelector(
                        ".category"
                    );

                const statusElement =
                    row.querySelector(
                        ".status"
                    );

                const rowCategory =
                    categoryElement
                        ? categoryElement
                            .textContent
                            .toLowerCase()
                            .trim()
                        : "";

                const rowStatus =
                    statusElement
                        ? statusElement
                            .textContent
                            .toLowerCase()
                            .trim()
                        : "";

                const searchMatch =
                    searchValue === "" ||
                    rowText.includes(
                        searchValue
                    );

                const categoryMatch =
                    categoryValue === "all" ||
                    rowCategory.includes(
                        categoryValue
                    );

                const statusMatch =
                    statusValue === "all" ||
                    rowStatus.includes(
                        statusValue
                    );

                row.style.display =
                    searchMatch &&
                    categoryMatch &&
                    statusMatch
                        ? ""
                        : "none";

            }
        );

    }


    /* ==========================================
            SEARCH
    ========================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            applyFilters
        );

    }


    /* ==========================================
            CATEGORY FILTER
    ========================================== */

    if (categorySelect) {

        categorySelect.addEventListener(
            "change",
            applyFilters
        );

    }


    /* ==========================================
            STATUS FILTER
    ========================================== */

    if (statusSelect) {

        statusSelect.addEventListener(
            "change",
            applyFilters
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

                    categorySelect.value =
                        "all";

                }

                if (statusSelect) {

                    statusSelect.value =
                        "all";

                }

                applyFilters();

            }
        );

    }


    /* ==========================================
            VIEW NOTICE
    ========================================== */

    if (tableBody) {

        tableBody.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        ".view-btn"
                    );

                if (!button) {

                    return;

                }

                const id =
                    Number(
                        button.dataset.id
                    );

                const notice =
                    notices.find(
                        function (item) {

                            return item.id === id;

                        }
                    );

                if (!notice) {

                    return;

                }

                alert(
                    "Notice:\n\n" +
                    notice.title +
                    "\n\n" +
                    notice.description
                );

            }
        );

    }


    /* ==========================================
            EDIT NOTICE
    ========================================== */

    if (tableBody) {

        tableBody.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        ".edit-btn"
                    );

                if (!button) {

                    return;

                }

                const id =
                    Number(
                        button.dataset.id
                    );

                const notice =
                    notices.find(
                        function (item) {

                            return item.id === id;

                        }
                    );

                if (!notice) {

                    return;

                }

                openEditModal(notice);

            }
        );

    }


    /* ==========================================
            DELETE NOTICE
    ========================================== */

    if (tableBody) {

        tableBody.addEventListener(
            "click",
            async function (event) {

                const button =
                    event.target.closest(
                        ".delete-btn"
                    );

                if (!button) {

                    return;

                }

                const id =
                    Number(
                        button.dataset.id
                    );

                const notice =
                    notices.find(
                        function (item) {

                            return item.id === id;

                        }
                    );

                if (!notice) {

                    return;

                }

                const confirmed =
                    confirm(
                        "Are you sure you want to delete:\n\n" +
                        notice.title +
                        "?"
                    );

                if (!confirmed) {

                    return;

                }


                button.disabled =
                    true;


                try {

                    const response =
                        await fetch(
                            `${BACKEND_URL}/notices/${id}`,
                            {
                                method:
                                    "DELETE"
                            }
                        );


                    const data =
                        await response.json();


                    if (!response.ok) {

                        throw new Error(
                            data.detail ||
                            "Failed to delete notice."
                        );

                    }


                    await loadNotices();


                    alert(
                        "Notice deleted successfully!"
                    );


                } catch (error) {

                    console.error(
                        "Delete notice error:",
                        error
                    );


                    alert(
                        "Failed to delete notice.\n\n" +
                        error.message
                    );


                    button.disabled =
                        false;

                }

            }
        );

    }


    /* ==========================================
            CREATE NOTICE MODAL
    ========================================== */

    createNoticeModal();


    function createNoticeModal() {

        const modal =
            document.createElement(
                "div"
            );

        modal.id =
            "createNoticeModal";

        modal.innerHTML = `

            <div
                id="noticeModalOverlay"
                style="
                    position:fixed;
                    inset:0;
                    background:rgba(0,0,0,0.45);
                    display:none;
                    align-items:center;
                    justify-content:center;
                    z-index:9999;
                    padding:20px;
                "
            >

                <div
                    style="
                        background:white;
                        width:100%;
                        max-width:520px;
                        border-radius:16px;
                        padding:28px;
                        box-shadow:0 20px 50px rgba(0,0,0,0.20);
                        font-family:Poppins,sans-serif;
                    "
                >

                    <div
                        style="
                            display:flex;
                            justify-content:space-between;
                            align-items:center;
                            margin-bottom:22px;
                        "
                    >

                        <div>

                            <h2
                                id="noticeModalTitle"
                                style="
                                    margin:0;
                                    color:#172554;
                                    font-size:22px;
                                "
                            >
                                Create Notice
                            </h2>

                            <p
                                style="
                                    margin:5px 0 0;
                                    color:#64748b;
                                    font-size:13px;
                                "
                            >
                                Create a new campus announcement.
                            </p>

                        </div>

                        <button
                            type="button"
                            id="closeNoticeModal"
                            style="
                                border:none;
                                background:#f1f5f9;
                                width:36px;
                                height:36px;
                                border-radius:50%;
                                cursor:pointer;
                                font-size:18px;
                                color:#475569;
                            "
                        >
                            &times;
                        </button>

                    </div>


                    <form id="createNoticeForm">

                        <div
                            style="
                                margin-bottom:18px;
                            "
                        >

                            <label
                                style="
                                    display:block;
                                    margin-bottom:7px;
                                    font-size:14px;
                                    font-weight:500;
                                    color:#334155;
                                "
                            >
                                Notice Title
                            </label>

                            <input
                                type="text"
                                id="noticeTitle"
                                placeholder="Enter notice title"
                                required
                                style="
                                    width:100%;
                                    box-sizing:border-box;
                                    padding:12px 14px;
                                    border:1px solid #cbd5e1;
                                    border-radius:9px;
                                    outline:none;
                                    font-family:Poppins,sans-serif;
                                    font-size:14px;
                                "
                            >

                        </div>


                        <div
                            style="
                                margin-bottom:18px;
                            "
                        >

                            <label
                                style="
                                    display:block;
                                    margin-bottom:7px;
                                    font-size:14px;
                                    font-weight:500;
                                    color:#334155;
                                "
                            >
                                Category
                            </label>

                            <select
                                id="noticeCategory"
                                required
                                style="
                                    width:100%;
                                    box-sizing:border-box;
                                    padding:12px 14px;
                                    border:1px solid #cbd5e1;
                                    border-radius:9px;
                                    outline:none;
                                    font-family:Poppins,sans-serif;
                                    font-size:14px;
                                    background:white;
                                "
                            >

                                <option value="">
                                    Select Category
                                </option>

                                <option value="academic">
                                    Academic
                                </option>

                                <option value="exam">
                                    Examination
                                </option>

                                <option value="event">
                                    Events
                                </option>

                                <option value="placement">
                                    Placement
                                </option>

                                <option value="general">
                                    General
                                </option>

                            </select>

                        </div>


                        <div
                            style="
                                margin-bottom:22px;
                            "
                        >

                            <label
                                style="
                                    display:block;
                                    margin-bottom:7px;
                                    font-size:14px;
                                    font-weight:500;
                                    color:#334155;
                                "
                            >
                                Description
                            </label>

                            <textarea
                                id="noticeDescription"
                                placeholder="Enter notice description"
                                required
                                rows="5"
                                style="
                                    width:100%;
                                    box-sizing:border-box;
                                    padding:12px 14px;
                                    border:1px solid #cbd5e1;
                                    border-radius:9px;
                                    outline:none;
                                    resize:vertical;
                                    font-family:Poppins,sans-serif;
                                    font-size:14px;
                                "
                            ></textarea>

                        </div>


                        <div
                            style="
                                display:flex;
                                justify-content:flex-end;
                                gap:10px;
                            "
                        >

                            <button
                                type="button"
                                id="cancelNotice"
                                style="
                                    padding:11px 20px;
                                    border:1px solid #cbd5e1;
                                    background:white;
                                    color:#475569;
                                    border-radius:9px;
                                    cursor:pointer;
                                    font-family:Poppins,sans-serif;
                                    font-weight:500;
                                "
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                id="saveNotice"
                                style="
                                    padding:11px 20px;
                                    border:none;
                                    background:#2563eb;
                                    color:white;
                                    border-radius:9px;
                                    cursor:pointer;
                                    font-family:Poppins,sans-serif;
                                    font-weight:500;
                                "
                            >
                                Create Notice
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        `;

        document.body.appendChild(modal);


        const overlay =
            document.getElementById(
                "noticeModalOverlay"
            );

        const closeButton =
            document.getElementById(
                "closeNoticeModal"
            );

        const cancelButton =
            document.getElementById(
                "cancelNotice"
            );

        const form =
            document.getElementById(
                "createNoticeForm"
            );

        const modalTitle =
            document.getElementById(
                "noticeModalTitle"
            );

        const saveButton =
            document.getElementById(
                "saveNotice"
            );


        /* ==========================================
                OPEN CREATE MODAL
        ========================================== */

        if (addButton) {

            addButton.addEventListener(
                "click",
                function () {

                    editingNoticeId =
                        null;

                    modalTitle.textContent =
                        "Create Notice";

                    saveButton.textContent =
                        "Create Notice";

                    form.reset();

                    overlay.style.display =
                        "flex";

                }
            );

        }


        /* ==========================================
                CLOSE MODAL
        ========================================== */

        function closeModal() {

            overlay.style.display =
                "none";

            editingNoticeId =
                null;

            form.reset();

            modalTitle.textContent =
                "Create Notice";

            saveButton.textContent =
                "Create Notice";

        }


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeModal
            );

        }


        if (cancelButton) {

            cancelButton.addEventListener(
                "click",
                closeModal
            );

        }


        if (overlay) {

            overlay.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target === overlay
                    ) {

                        closeModal();

                    }

                }
            );

        }


        /* ==========================================
                SUBMIT CREATE / EDIT
        ========================================== */

        if (form) {

            form.addEventListener(
                "submit",
                async function (event) {

                    event.preventDefault();


                    const title =
                        document
                            .getElementById(
                                "noticeTitle"
                            )
                            .value
                            .trim();


                    const category =
                        document
                            .getElementById(
                                "noticeCategory"
                            )
                            .value;


                    const description =
                        document
                            .getElementById(
                                "noticeDescription"
                            )
                            .value
                            .trim();


                    if (
                        !title ||
                        !category ||
                        !description
                    ) {

                        alert(
                            "Please fill all fields."
                        );

                        return;

                    }


                    const currentEditingId =
                        editingNoticeId;


                    const isEditing =
                        currentEditingId !== null;


                    saveButton.disabled =
                        true;


                    saveButton.textContent =
                        isEditing
                            ? "Saving..."
                            : "Creating...";


                    try {

                        let response;


                        /* ==================================
                                EDIT EXISTING NOTICE
                        ================================== */

                        if (
                            isEditing
                        ) {

                            response =
                                await fetch(
                                    `${BACKEND_URL}/notices/${currentEditingId}`,
                                    {
                                        method:
                                            "PUT",

                                        headers: {
                                            "Content-Type":
                                                "application/json"
                                        },

                                        body:
                                            JSON.stringify({
                                                title:
                                                    title,

                                                category:
                                                    category,

                                                description:
                                                    description
                                            })
                                    }
                                );

                        }


                        /* ==================================
                                CREATE NEW NOTICE
                        ================================== */

                        else {

                            response =
                                await fetch(
                                    `${BACKEND_URL}/notices/`,
                                    {
                                        method:
                                            "POST",

                                        headers: {
                                            "Content-Type":
                                                "application/json"
                                        },

                                        body:
                                            JSON.stringify({
                                                title:
                                                    title,

                                                category:
                                                    category,

                                                description:
                                                    description
                                            })
                                    }
                                );

                        }


                        const data =
                            await response.json();


                        if (!response.ok) {

                            throw new Error(
                                data.detail ||
                                "Request failed."
                            );

                        }


                        closeModal();


                        await loadNotices();


                        alert(
                            isEditing
                                ? "Notice updated successfully!"
                                : "Notice created successfully!"
                        );


                    } catch (error) {

                        console.error(
                            "Notice save error:",
                            error
                        );


                        alert(
                            "Failed to save notice.\n\n" +
                            error.message
                        );

                    } finally {

                        saveButton.disabled =
                            false;

                        saveButton.textContent =
                            "Create Notice";

                    }

                }
            );

        }


        /* ==========================================
                OPEN EDIT MODAL
        ========================================== */

        window.openEditModal =
            function (notice) {

                editingNoticeId =
                    notice.id;


                modalTitle.textContent =
                    "Edit Notice";


                saveButton.textContent =
                    "Save Changes";


                document
                    .getElementById(
                        "noticeTitle"
                    )
                    .value =
                        notice.title || "";


                document
                    .getElementById(
                        "noticeCategory"
                    )
                    .value =
                        notice.category || "";


                document
                    .getElementById(
                        "noticeDescription"
                    )
                    .value =
                        notice.description || "";


                overlay.style.display =
                    "flex";

            };

    }


    /* ==========================================
            PAGINATION
    ========================================== */

    paginationButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    if (
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

                }
            );

        }
    );


    /* ==========================================
            LOGOUT
    ========================================== */

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

                    alert(
                        "Logout functionality will be connected with authentication."
                    );

                }

            }
        );

    }

});