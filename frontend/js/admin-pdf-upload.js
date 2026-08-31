/* ==========================================
        AITD CAMPUSAI
        ADMIN PDF UPLOAD
========================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* ======================================
            ELEMENTS
    ====================================== */

    const uploadArea =
        document.getElementById("uploadArea");

    const browseBtn =
        document.getElementById("browseBtn");

    const pdfInput =
        document.getElementById("pdfInput");

    const selectedFile =
        document.getElementById("selectedFile");

    const fileName =
        document.getElementById("fileName");

    const fileSize =
        document.getElementById("fileSize");

    const removeFile =
        document.getElementById("removeFile");

    const documentTitle =
        document.getElementById("documentTitle");

    const documentCategory =
        document.getElementById("documentCategory");

    const processPdf =
        document.getElementById("processPdf");

    const cancelUpload =
        document.getElementById("cancelUpload");

    const searchInput =
        document.querySelector(".search-box input");

    const uploadTopBtn =
        document.querySelector(".upload-top-btn");

    const tableBody =
        document.querySelector(".pdf-table tbody");


    /* ======================================
            MAX FILE SIZE
            20 MB
    ====================================== */

    const MAX_FILE_SIZE =
        20 * 1024 * 1024;


    /* ======================================
            FORMAT FILE SIZE
    ====================================== */

    function formatFileSize(bytes) {

        if (bytes < 1024 * 1024) {

            return (
                (bytes / 1024).toFixed(1) +
                " KB"
            );

        }

        return (
            (bytes / (1024 * 1024)).toFixed(2) +
            " MB"
        );

    }


    /* ======================================
            SHOW SELECTED FILE
    ====================================== */

    function showSelectedFile(file) {

        if (!file) return;


        /* ---------- CHECK PDF ---------- */

        const isPDF =
            file.type === "application/pdf" ||
            file.name.toLowerCase().endsWith(".pdf");


        if (!isPDF) {

            alert("Please select a PDF file only.");

            clearFile();

            return;

        }


        /* ---------- CHECK SIZE ---------- */

        if (file.size > MAX_FILE_SIZE) {

            alert(
                "File size must be less than 20 MB."
            );

            clearFile();

            return;

        }


        /* ---------- UPDATE UI ---------- */

        fileName.textContent =
            file.name;

        fileSize.textContent =
            formatFileSize(file.size);


        selectedFile.style.display =
            "flex";


        uploadArea.style.display =
            "none";

    }


    /* ======================================
            CLEAR FILE
    ====================================== */

    function clearFile() {

        if (pdfInput) {

            pdfInput.value = "";

        }

        if (selectedFile) {

            selectedFile.style.display =
                "none";

        }

        if (uploadArea) {

            uploadArea.style.display =
                "flex";

        }

    }


    /* ======================================
            BROWSE BUTTON
    ====================================== */

    if (browseBtn && pdfInput) {

        browseBtn.addEventListener(
            "click",
            function () {

                pdfInput.click();

            }
        );

    }


    /* ======================================
            FILE INPUT CHANGE
    ====================================== */

    if (pdfInput) {

        pdfInput.addEventListener(
            "change",
            function () {

                const file =
                    this.files[0];

                showSelectedFile(file);

            }
        );

    }


    /* ======================================
            REMOVE FILE
    ====================================== */

    if (removeFile) {

        removeFile.addEventListener(
            "click",
            function () {

                clearFile();

            }
        );

    }


    /* ======================================
            DRAG & DROP
    ====================================== */

    if (uploadArea) {


        uploadArea.addEventListener(
            "dragover",
            function (event) {

                event.preventDefault();

                uploadArea.classList.add(
                    "drag-active"
                );

            }
        );


        uploadArea.addEventListener(
            "dragleave",
            function () {

                uploadArea.classList.remove(
                    "drag-active"
                );

            }
        );


        uploadArea.addEventListener(
            "drop",
            function (event) {

                event.preventDefault();

                uploadArea.classList.remove(
                    "drag-active"
                );


                const file =
                    event.dataTransfer.files[0];


                if (!file) return;


                if (pdfInput) {

                    try {

                        const dataTransfer =
                            new DataTransfer();

                        dataTransfer.items.add(file);

                        pdfInput.files =
                            dataTransfer.files;

                    } catch (error) {

                        console.log(
                            "File input assignment unavailable."
                        );

                    }

                }


                showSelectedFile(file);

            }
        );

    }


    /* ======================================
            TOP UPLOAD BUTTON
    ====================================== */

    if (uploadTopBtn) {

        uploadTopBtn.addEventListener(
            "click",
            function () {

                document.querySelector(
                    ".upload-card"
                ).scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }


    /* ======================================
            CANCEL UPLOAD
    ====================================== */

    if (cancelUpload) {

        cancelUpload.addEventListener(
            "click",
            function () {

                clearFile();

                if (documentTitle) {

                    documentTitle.value = "";

                }

                if (documentCategory) {

                    documentCategory.selectedIndex = 0;

                }

            }
        );

    }


    /* ======================================
            PROCESS PDF
    ====================================== */

    if (processPdf) {

        processPdf.addEventListener(
            "click",
            function () {


                /* ---------- FILE CHECK ---------- */

                if (
                    !pdfInput ||
                    !pdfInput.files ||
                    !pdfInput.files.length
                ) {

                    alert(
                        "Please select a PDF file first."
                    );

                    return;

                }


                /* ---------- TITLE CHECK ---------- */

                if (
                    documentTitle &&
                    !documentTitle.value.trim()
                ) {

                    alert(
                        "Please enter the document title."
                    );

                    documentTitle.focus();

                    return;

                }


                /* ---------- CATEGORY CHECK ---------- */

                if (
                    documentCategory &&
                    !documentCategory.value
                ) {

                    alert(
                        "Please select a document category."
                    );

                    documentCategory.focus();

                    return;

                }


                /* ---------- PROCESSING STATE ---------- */

                const originalText =
                    processPdf.innerHTML;


                processPdf.disabled = true;

                processPdf.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';


                /*
                    FRONTEND DEMO ONLY

                    Later this button will send
                    the PDF to FastAPI backend.
                */

                setTimeout(
                    function () {

                        processPdf.disabled =
                            false;

                        processPdf.innerHTML =
                            originalText;


                        alert(
                            "PDF uploaded successfully. Backend processing will be connected later."
                        );


                        addDocumentToTable();


                        clearFile();


                        if (documentTitle) {

                            documentTitle.value =
                                "";

                        }


                        if (documentCategory) {

                            documentCategory.selectedIndex =
                                0;

                        }

                    },
                    1200
                );

            }
        );

    }


    /* ======================================
            ADD DOCUMENT TO TABLE
    ====================================== */

    function addDocumentToTable() {

        if (!tableBody) return;


        const file =
            pdfInput.files[0];


        if (!file) return;


        const title =
            documentTitle.value.trim();


        const category =
            documentCategory.value;


        const categoryText =
            documentCategory.options[
                documentCategory.selectedIndex
            ].text;


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <div class="document-info">

                    <div class="document-icon red">

                        <i class="fa-solid fa-file-pdf"></i>

                    </div>

                    <div>

                        <h4>
                            ${escapeHTML(title)}
                        </h4>

                        <span>
                            ${escapeHTML(file.name)}
                        </span>

                    </div>

                </div>

            </td>


            <td>

                <span class="category ${getCategoryClass(category)}">

                    ${escapeHTML(categoryText)}

                </span>

            </td>


            <td>

                ${formatFileSize(file.size)}

            </td>


            <td>

                Today

            </td>


            <td>

                <span class="status processed">

                    <i class="fa-solid fa-circle-check"></i>

                    Processed

                </span>

            </td>


            <td>

                <div class="action-buttons">

                    <button
                        class="view-btn"
                        type="button"
                        title="View"
                    >

                        <i class="fa-solid fa-eye"></i>

                    </button>


                    <button
                        class="delete-btn"
                        type="button"
                        title="Delete"
                    >

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </td>

        `;


        tableBody.prepend(row);


        attachRowActions(row);

    }


    /* ======================================
            CATEGORY CLASS
    ====================================== */

    function getCategoryClass(category) {

        if (category === "academic") {

            return "academic";

        }

        if (category === "scholarship") {

            return "scholarship";

        }

        return "admission";

    }


    /* ======================================
            ESCAPE HTML
    ====================================== */

    function escapeHTML(value) {

        const div =
            document.createElement("div");

        div.textContent =
            value;

        return div.innerHTML;

    }


    /* ======================================
            ROW ACTIONS
    ====================================== */

    function attachRowActions(row) {


        const viewButton =
            row.querySelector(".view-btn");


        const deleteButton =
            row.querySelector(".delete-btn");


        /* ---------- VIEW ---------- */

        if (viewButton) {

            viewButton.addEventListener(
                "click",
                function () {

                    const name =
                        row.querySelector(
                            ".document-info h4"
                        );


                    if (name) {

                        alert(
                            "Opening: " +
                            name.textContent.trim()
                        );

                    }

                }
            );

        }


        /* ---------- DELETE ---------- */

        if (deleteButton) {

            deleteButton.addEventListener(
                "click",
                function () {

                    const name =
                        row.querySelector(
                            ".document-info h4"
                        );


                    const documentName =
                        name
                            ? name.textContent.trim()
                            : "this document";


                    const confirmed =
                        confirm(
                            "Are you sure you want to delete " +
                            documentName +
                            "?"
                        );


                    if (confirmed) {

                        row.remove();

                    }

                }
            );

        }

    }


    /* ======================================
            EXISTING TABLE ACTIONS
    ====================================== */

    if (tableBody) {

        const rows =
            tableBody.querySelectorAll("tr");


        rows.forEach(function (row) {

            attachRowActions(row);

        });

    }


    /* ======================================
            SEARCH TABLE
    ====================================== */

    if (searchInput && tableBody) {

        searchInput.addEventListener(
            "input",
            function () {

                const value =
                    this.value
                        .toLowerCase()
                        .trim();


                const rows =
                    tableBody.querySelectorAll("tr");


                rows.forEach(function (row) {

                    const text =
                        row.textContent
                            .toLowerCase();


                    row.style.display =
                        text.includes(value)
                            ? ""
                            : "none";

                });

            }
        );

    }


    /* ======================================
            PAGINATION
    ====================================== */

    const paginationButtons =
        document.querySelectorAll(
            ".table-pagination button"
        );


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


});