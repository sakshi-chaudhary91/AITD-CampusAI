document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // DOM ELEMENTS
    // ===============================

    const uploadArea = document.getElementById("uploadArea");
    const browseBtn = document.getElementById("browseBtn");
    const pdfInput = document.getElementById("pdfInput");

    const selectedFile = document.getElementById("selectedFile");
    const fileName = document.getElementById("fileName");
    const fileSize = document.getElementById("fileSize");
    const removeFile = document.getElementById("removeFile");

    const documentTitle = document.getElementById("documentTitle");
    const documentCategory = document.getElementById("documentCategory");

    const processPdf = document.getElementById("processPdf");
    const cancelUpload = document.getElementById("cancelUpload");

    const tableBody = document.querySelector(".pdf-table tbody");
    const searchInput = document.querySelector(".search-box input");

    const statValues =
        document.querySelectorAll(".stats-grid .stat-card h2");

    const BACKEND_URL = "http://127.0.0.1:8000";

    const MAX_FILE_SIZE = 20 * 1024 * 1024;

    let currentFile = null;


    // ===============================
    // INITIAL LOAD
    // ===============================

    loadDocuments();
    loadStats();


    // ===============================
    // LOAD DOCUMENTS
    // ===============================

    async function loadDocuments() {

        try {

            const response = await fetch(
                `${BACKEND_URL}/upload/`
            );

            if (!response.ok) {

                throw new Error(
                    "Failed to load documents."
                );

            }

            const documents = await response.json();

            renderDocuments(documents);

        } catch (error) {

            console.error(
                "Error loading documents:",
                error
            );

            if (tableBody) {

                tableBody.innerHTML = `
                    <tr>
                        <td colspan="6" style="text-align:center;">
                            Failed to load documents.
                        </td>
                    </tr>
                `;

            }

        }

    }


    // ===============================
    // LOAD STATS
    // ===============================

    async function loadStats() {

        try {

            const response = await fetch(
                `${BACKEND_URL}/upload/stats`
            );

            if (!response.ok) {

                throw new Error(
                    "Failed to load PDF statistics."
                );

            }

            const stats = await response.json();

            updateStats(stats);

        } catch (error) {

            console.error(
                "Error loading stats:",
                error
            );

        }

    }


    // ===============================
    // UPDATE STATS
    // ===============================

    function updateStats(stats) {

        if (!statValues || statValues.length < 4) {

            return;

        }


        // Total PDFs
        statValues[0].textContent =
            stats.total_pdfs;


        // Processed
        statValues[1].textContent =
            stats.processed;


        // Processing
        statValues[2].textContent =
            stats.processing;


        // Storage
        statValues[3].textContent =
            formatStorage(
                stats.storage_bytes
            );

    }


    // ===============================
    // FORMAT STORAGE
    // ===============================

    function formatStorage(bytes) {

        if (!bytes || bytes <= 0) {

            return "0 MB";

        }


        const mb = bytes / (1024 * 1024);


        if (mb < 1024) {

            return `${mb.toFixed(1)} MB`;

        }


        const gb = mb / 1024;

        return `${gb.toFixed(1)} GB`;

    }


    // ===============================
    // RENDER DOCUMENTS
    // ===============================

    function renderDocuments(documents) {

        if (!tableBody) {

            return;

        }


        tableBody.innerHTML = "";


        if (!documents || documents.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align:center;">
                        No documents uploaded yet.
                    </td>
                </tr>
            `;

            return;

        }


        documents.forEach(document => {

            addDocumentRow(document);

        });

    }


    // ===============================
    // ADD DOCUMENT ROW
    // ===============================

    function addDocumentRow(doc) {

    const row = document.createElement("tr");

    const status =
        doc.status || "Processing";

    const statusClass =
        status.toLowerCase();

    const category =
        doc.category || "general";

    const categoryClass =
        category.toLowerCase();

    const iconClass =
        getDocumentIconClass(category);

    row.innerHTML = `

        <td>
            <div class="document-info">

                <div class="document-icon ${iconClass}">
                    <i class="fa-solid fa-file-pdf"></i>
                </div>

                <div>
                    <h4>
                        ${escapeHTML(doc.title)}
                    </h4>

                    <span>
                        ${escapeHTML(doc.filename)}
                    </span>
                </div>

            </div>
        </td>

        <td>
            <span class="category ${categoryClass}">
                ${formatCategory(category)}
            </span>
        </td>

        <td>
            ${formatFileSize(doc.file_size)}
        </td>

        <td>
            ${formatDate(doc.uploaded_at)}
        </td>

        <td>
            ${getStatusHTML(status)}
        </td>

        <td>
            <div class="action-buttons">

                <button
                    class="view-btn"
                    title="View"
                    data-id="${doc.id}"
                >
                    <i class="fa-solid fa-eye"></i>
                </button>

                <button
                    class="delete-btn"
                    title="Delete"
                    data-id="${doc.id}"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>
        </td>

    `;

    tableBody.appendChild(row);
}


    // ===============================
    // DOCUMENT ICON COLOR
    // ===============================

    function getDocumentIconClass(category) {

        switch (category.toLowerCase()) {

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


    // ===============================
    // FORMAT CATEGORY
    // ===============================

    function formatCategory(category) {

        if (!category) {

            return "General";

        }


        return category.charAt(0).toUpperCase() +
            category.slice(1);

    }


    // ===============================
    // STATUS HTML
    // ===============================

    function getStatusHTML(status) {

        const normalized =
            status.toLowerCase();


        if (normalized === "processed") {

            return `
                <span class="status processed">

                    <i class="fa-solid fa-circle-check"></i>

                    Processed

                </span>
            `;

        }


        if (normalized === "processing") {

            return `
                <span class="status processing">

                    <i class="fa-solid fa-spinner"></i>

                    Processing

                </span>
            `;

        }


        if (normalized === "failed") {

            return `
                <span class="status failed">

                    <i class="fa-solid fa-circle-xmark"></i>

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


    // ===============================
    // FORMAT DATE
    // ===============================

    function formatDate(dateString) {

        if (!dateString) {

            return "-";

        }


        const date = new Date(dateString);


        if (isNaN(date.getTime())) {

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


    // ===============================
    // FORMAT FILE SIZE
    // ===============================

    function formatFileSize(bytes) {

        if (!bytes || bytes <= 0) {

            return "0 B";

        }


        if (bytes < 1024) {

            return `${bytes} B`;

        }


        if (bytes < 1024 * 1024) {

            return `${(bytes / 1024).toFixed(1)} KB`;

        }


        if (bytes < 1024 * 1024 * 1024) {

            return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

        }


        return `${(
            bytes / (1024 * 1024 * 1024)
        ).toFixed(1)} GB`;

    }


    // ===============================
    // ESCAPE HTML
    // ===============================

    function escapeHTML(value) {

        const div =
            document.createElement("div");

        div.textContent =
            value ?? "";

        return div.innerHTML;

    }


    // ===============================
    // BROWSE BUTTON
    // ===============================

    if (browseBtn) {

        browseBtn.addEventListener(
            "click",
            () => {

                pdfInput.click();

            }
        );

    }


    // ===============================
    // FILE INPUT
    // ===============================

    if (pdfInput) {

        pdfInput.addEventListener(
            "change",
            () => {

                if (pdfInput.files.length > 0) {

                    handleFile(
                        pdfInput.files[0]
                    );

                }

            }
        );

    }


    // ===============================
    // HANDLE FILE
    // ===============================

    function handleFile(file) {

        if (
            file.type !== "application/pdf" &&
            !file.name.toLowerCase().endsWith(".pdf")
        ) {

            alert(
                "Please select a PDF file."
            );

            clearFile();

            return;

        }


        if (file.size > MAX_FILE_SIZE) {

            alert(
                "File size must be less than 20 MB."
            );

            clearFile();

            return;

        }


        currentFile = file;


        if (fileName) {

            fileName.textContent =
                file.name;

        }


        if (fileSize) {

            fileSize.textContent =
                formatFileSize(file.size);

        }


        if (selectedFile) {

            selectedFile.style.display =
                "flex";

        }

    }


    // ===============================
    // REMOVE FILE
    // ===============================

    if (removeFile) {

        removeFile.addEventListener(
            "click",
            () => {

                clearFile();

            }
        );

    }


    function clearFile() {

        currentFile = null;


        if (pdfInput) {

            pdfInput.value = "";

        }


        if (fileName) {

            fileName.textContent = "";

        }


        if (fileSize) {

            fileSize.textContent = "";

        }


        if (selectedFile) {

            selectedFile.style.display =
                "none";

        }

    }


    // ===============================
    // DRAG & DROP
    // ===============================

    if (uploadArea) {

        uploadArea.addEventListener(
            "dragover",
            (event) => {

                event.preventDefault();

                uploadArea.classList.add(
                    "drag-over"
                );

            }
        );


        uploadArea.addEventListener(
            "dragleave",
            () => {

                uploadArea.classList.remove(
                    "drag-over"
                );

            }
        );


        uploadArea.addEventListener(
            "drop",
            (event) => {

                event.preventDefault();

                uploadArea.classList.remove(
                    "drag-over"
                );


                const files =
                    event.dataTransfer.files;


                if (files.length > 0) {

                    handleFile(
                        files[0]
                    );

                }

            }
        );

    }


    // ===============================
    // PROCESS PDF
    // ===============================

    if (processPdf) {

        processPdf.addEventListener(
            "click",
            async () => {

                if (!currentFile) {

                    alert(
                        "Please select a PDF file."
                    );

                    return;

                }


                const title =
                    documentTitle.value.trim();


                if (!title) {

                    alert(
                        "Please enter document title."
                    );

                    documentTitle.focus();

                    return;

                }


                const category =
                    documentCategory.value;


                if (!category) {

                    alert(
                        "Please select a category."
                    );

                    documentCategory.focus();

                    return;

                }


                processPdf.disabled = true;


                const originalText =
                    processPdf.textContent;


                processPdf.textContent =
                    "Processing...";


                const formData =
                    new FormData();


                formData.append(
                    "file",
                    currentFile
                );


                formData.append(
                    "title",
                    title
                );


                formData.append(
                    "category",
                    category
                );


                try {

                    const response =
                        await fetch(
                            `${BACKEND_URL}/upload/`,
                            {
                                method: "POST",
                                body: formData
                            }
                        );


                    const data =
                        await response.json();


                    if (!response.ok) {

                        throw new Error(
                            data.detail ||
                            "PDF upload failed."
                        );

                    }


                    alert(
                        "PDF uploaded and processed successfully."
                    );


                    // Refresh table
                    await loadDocuments();


                    // Refresh statistics
                    await loadStats();


                    // Clear form
                    clearFile();


                    documentTitle.value = "";

                    documentCategory.value = "";


                } catch (error) {

                    console.error(
                        "Upload error:",
                        error
                    );


                    alert(
                        "PDF upload failed.\n\n" +
                        error.message
                    );


                } finally {

                    processPdf.disabled =
                        false;


                    processPdf.textContent =
                        originalText;

                }

            }
        );

    }


    // ===============================
    // CANCEL
    // ===============================

    if (cancelUpload) {

        cancelUpload.addEventListener(
            "click",
            () => {

                clearFile();

                documentTitle.value = "";

                documentCategory.value = "";

            }
        );

    }


    // ===============================
    // TABLE ACTIONS
    // ===============================

    if (tableBody) {

        tableBody.addEventListener(
            "click",
            (event) => {

                const viewButton =
                    event.target.closest(
                        ".view-btn"
                    );


                const deleteButton =
                    event.target.closest(
                        ".delete-btn"
                    );


                // ===========================
                // VIEW
                // ===========================

                if (viewButton) {

                    const row =
                        viewButton.closest("tr");


                    if (!row) {

                        return;

                    }


                    const title =
                        row.querySelector(
                            ".document-info h4"
                        )?.textContent ||
                        "Document";


                    alert(
                        `Document: ${title}`
                    );

                }


                // ===========================
                // DELETE
                // ===========================

                if (deleteButton) {

                    const row =
                        deleteButton.closest("tr");


                    if (!row) {

                        return;

                    }


                    const confirmDelete =
                        confirm(
                            "Are you sure you want to delete this document?"
                        );


                    if (confirmDelete) {

                        // UI only for now
                        row.remove();

                    }

                }

            }
        );

    }


    // ===============================
    // SEARCH
    // ===============================

    if (searchInput && tableBody) {

        searchInput.addEventListener(
            "input",
            () => {

                const searchTerm =
                    searchInput.value
                        .toLowerCase()
                        .trim();


                const rows =
                    tableBody.querySelectorAll(
                        "tr"
                    );


                rows.forEach(row => {

                    const text =
                        row.textContent
                            .toLowerCase();


                    if (
                        text.includes(
                            searchTerm
                        )
                    ) {

                        row.style.display =
                            "";

                    } else {

                        row.style.display =
                            "none";

                    }

                });

            }
        );

    }

});