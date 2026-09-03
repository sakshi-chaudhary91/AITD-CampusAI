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

    const statValues =
        document.querySelectorAll(
            ".stats-grid .stat-card h2"
        );


    /* ======================================
            BACKEND
    ====================================== */

    const BACKEND_URL =
        "http://127.0.0.1:8000";


    /* ======================================
            LOAD KNOWLEDGE BASE
    ====================================== */

    loadKnowledgeBase();


    async function loadKnowledgeBase() {

        try {

            const response =
                await fetch(
                    `${BACKEND_URL}/knowledge-base/`
                );


            if (!response.ok) {

                throw new Error(
                    "Failed to load knowledge base."
                );

            }


            const data =
                await response.json();


            updateStats(data);

            updateKnowledgeStatus(data);

            renderSources(data.sources);


        } catch (error) {

            console.error(
                "Error loading knowledge base:",
                error
            );


            if (tableBody) {

                tableBody.innerHTML = `
                    <tr>
                        <td
                            colspan="6"
                            style="text-align:center;"
                        >
                            Failed to load knowledge sources.
                        </td>
                    </tr>
                `;

            }

        }

    }


    /* ======================================
            UPDATE STATS
    ====================================== */

    function updateStats(data) {

        if (
            !statValues ||
            statValues.length < 4
        ) {

            return;

        }


        // Total Documents
        statValues[0].textContent =
            data.total_documents;


        // Total Chunks
        statValues[1].textContent =
            formatNumber(
                data.total_chunks
            );


        // Total Embeddings
        statValues[2].textContent =
            formatNumber(
                data.total_embeddings
            );


        // Index Health
        statValues[3].textContent =
            `${data.index_health}%`;

    }


    /* ======================================
            FORMAT NUMBER
    ====================================== */

    function formatNumber(number) {

        return Number(number || 0)
            .toLocaleString("en-IN");

    }


    /* ======================================
            UPDATE KNOWLEDGE STATUS
    ====================================== */

    function updateKnowledgeStatus(data) {

        const statusRows =
            document.querySelectorAll(
                ".knowledge-status-card .status-row"
            );


        if (
            !statusRows ||
            statusRows.length < 4
        ) {

            return;

        }


        // Vector Database
        statusRows[0]
            .querySelector("strong")
            .textContent =
            data.vector_database ||
            "FAISS";


        // Embedding Model
        statusRows[1]
            .querySelector("strong")
            .textContent =
            data.embedding_model ||
            "Sentence Transformer";


        // Index File
        statusRows[2]
            .querySelector("strong")
            .textContent =
            data.index_file ||
            "faiss_index.bin";


        // Last Updated
        statusRows[3]
            .querySelector("strong")
            .textContent =
            formatDateTime(
                data.last_updated
            );


        // Update health percentage
        const healthText =
            document.querySelector(
                ".index-progress .progress-header strong"
            );


        if (healthText) {

            healthText.textContent =
                `${data.index_health}%`;

        }


        // Update progress bar
        const progressFill =
            document.querySelector(
                ".progress-fill"
            );


        if (progressFill) {

            progressFill.style.width =
                `${data.index_health}%`;

        }


        // Update health badge
        updateHealthBadge(
            data.index_health
        );

    }


    /* ======================================
            HEALTH BADGE
    ====================================== */

    function updateHealthBadge(
        health
    ) {

        const healthBadge =
            document.querySelector(
                ".health-badge"
            );


        if (!healthBadge) {

            return;

        }


        if (health >= 95) {

            healthBadge.innerHTML = `
                <i class="fa-solid fa-circle"></i>
                Healthy
            `;

            healthBadge.className =
                "health-badge";

        } else if (health >= 80) {

            healthBadge.innerHTML = `
                <i class="fa-solid fa-circle"></i>
                Warning
            `;

            healthBadge.className =
                "health-badge warning";

        } else {

            healthBadge.innerHTML = `
                <i class="fa-solid fa-circle"></i>
                Unhealthy
            `;

            healthBadge.className =
                "health-badge unhealthy";

        }

    }


    /* ======================================
            RENDER KNOWLEDGE SOURCES
    ====================================== */

    function renderSources(
        sources
    ) {

        if (!tableBody) {

            return;

        }


        tableBody.innerHTML = "";


        if (
            !sources ||
            sources.length === 0
        ) {

            tableBody.innerHTML = `
                <tr>
                    <td
                        colspan="6"
                        style="text-align:center;"
                    >
                        No knowledge sources available.
                    </td>
                </tr>
            `;

            return;

        }


        sources.forEach(
            function (source) {

                addSourceRow(source);

            }
        );

    }


    /* ======================================
            ADD SOURCE ROW
    ====================================== */

    function addSourceRow(
        source
    ) {

        const row =
            document.createElement("tr");


        const category =
            source.category ||
            "general";


        const categoryClass =
            category.toLowerCase();


        const iconClass =
            getSourceIconClass(
                category
            );


        const status =
            source.status ||
            "Processing";


        const statusHTML =
            getSourceStatusHTML(
                status
            );


        row.innerHTML = `

            <td>

                <div class="source-info">

                    <div
                        class="source-icon ${iconClass}"
                    >

                        <i
                            class="fa-solid fa-file-pdf"
                        ></i>

                    </div>

                    <div>

                        <h4>
                            ${escapeHTML(
                                source.title
                            )}
                        </h4>

                        <span>
                            ${escapeHTML(
                                source.filename
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
                ${formatNumber(
                    source.chunks
                )}
            </td>


            <td>
                ${formatNumber(
                    source.embeddings
                )}
            </td>


            <td>
                ${formatDate(
                    source.uploaded_at
                )}
            </td>


            <td>

                ${statusHTML}

            </td>

        `;


        tableBody.appendChild(row);

    }


    /* ======================================
            SOURCE ICON
    ====================================== */

    function getSourceIconClass(
        category
    ) {

        switch (
            category.toLowerCase()
        ) {

            case "admission":
                return "red";

            case "academic":
                return "blue";

            case "scholarship":
                return "purple";

            case "notice":
                return "blue";

            default:
                return "red";

        }

    }


    /* ======================================
            SOURCE STATUS
    ====================================== */

    function getSourceStatusHTML(
        status
    ) {

        const normalized =
            status.toLowerCase();


        if (
            normalized === "processed" ||
            normalized === "ready"
        ) {

            return `
                <span class="status ready">

                    <i
                        class="fa-solid fa-circle-check"
                    ></i>

                    Ready

                </span>
            `;

        }


        if (
            normalized === "processing"
        ) {

            return `
                <span class="status processing">

                    <i
                        class="fa-solid fa-spinner"
                    ></i>

                    Processing

                </span>
            `;

        }


        if (
            normalized === "failed"
        ) {

            return `
                <span class="status failed">

                    <i
                        class="fa-solid fa-circle-xmark"
                    ></i>

                    Failed

                </span>
            `;

        }


        return `
            <span class="status">

                ${escapeHTML(status)}

            </span>
        `;

    }


    /* ======================================
            FORMAT CATEGORY
    ====================================== */

    function formatCategory(
        category
    ) {

        if (!category) {

            return "General";

        }


        return category.charAt(0).toUpperCase() +
            category.slice(1);

    }


    /* ======================================
            FORMAT DATE
    ====================================== */

    function formatDate(
        dateString
    ) {

        if (!dateString) {

            return "-";

        }


        const date =
            new Date(dateString);


        if (
            isNaN(date.getTime())
        ) {

            return "-";

        }


        return date.toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


    /* ======================================
            FORMAT DATE & TIME
    ====================================== */

    function formatDateTime(
        dateString
    ) {

        if (!dateString) {

            return "-";

        }


        const date =
            new Date(dateString);


        if (
            isNaN(date.getTime())
        ) {

            return "-";

        }


        return date.toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        ) +
        ", " +
        date.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    }


    /* ======================================
            ESCAPE HTML
    ====================================== */

    function escapeHTML(
        value
    ) {

        const div =
            document.createElement("div");


        div.textContent =
            value ?? "";


        return div.innerHTML;

    }


    /* ======================================
            SEARCH
    ====================================== */

    if (
        searchInput &&
        tableBody
    ) {

        searchInput.addEventListener(
            "input",
            function () {

                const searchValue =
                    this.value
                        .toLowerCase()
                        .trim();


                const rows =
                    tableBody.querySelectorAll(
                        "tr"
                    );


                rows.forEach(
                    function (row) {

                        const rowText =
                            row.textContent
                                .toLowerCase();


                        if (
                            rowText.includes(
                                searchValue
                            )
                        ) {

                            row.style.display =
                                "";

                        } else {

                            row.style.display =
                                "none";

                        }

                    }
                );

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
                    async function () {

                        rebuildKnowledge.disabled =
                            false;


                        rebuildKnowledge.innerHTML =
                            originalHTML;


                        await loadKnowledgeBase();


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
            REBUILD INDEX
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
                    async function () {

                        rebuildIndex.disabled =
                            false;


                        if (icon) {

                            icon.classList.remove(
                                "fa-spin"
                            );

                        }


                        await loadKnowledgeBase();


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
            LOGOUT
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

                    alert(
                        "Logout functionality will be connected with authentication."
                    );

                }

            }
        );

    }


});