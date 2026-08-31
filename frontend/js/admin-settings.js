/* ==========================================
        AITD CAMPUSAI
        ADMIN SETTINGS JS
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
            SETTINGS TABS
    ========================================== */

    const tabs = document.querySelectorAll(".settings-tab");
    const sections = document.querySelectorAll(".settings-section");

    tabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            const target = tab.getAttribute("data-target");

            /* Remove active from all tabs */
            tabs.forEach(function (item) {
                item.classList.remove("active");
            });

            /* Hide all sections */
            sections.forEach(function (section) {
                section.classList.remove("active");
            });

            /* Activate clicked tab */
            tab.classList.add("active");

            /* Show target section */
            const targetSection =
                document.getElementById(target);

            if (targetSection) {
                targetSection.classList.add("active");
            }

        });

    });


    /* ==========================================
            SAVE BUTTON
    ========================================== */

    const saveTopBtn =
        document.querySelector(".save-top-btn");

    const primaryButtons =
        document.querySelectorAll(".primary-btn");


    function showSavedMessage() {

        const oldMessage =
            document.querySelector(".save-message");

        if (oldMessage) {
            oldMessage.remove();
        }

        const message =
            document.createElement("div");

        message.className = "save-message";

        message.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>
            Settings saved successfully
        `;

        document.body.appendChild(message);


        setTimeout(function () {

            message.classList.add("show");

        }, 50);


        setTimeout(function () {

            message.classList.remove("show");

            setTimeout(function () {

                message.remove();

            }, 300);

        }, 2500);

    }


    if (saveTopBtn) {

        saveTopBtn.addEventListener(
            "click",
            showSavedMessage
        );

    }


    primaryButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            showSavedMessage
        );

    });


    /* ==========================================
            PROFILE IMAGE
    ========================================== */

    const avatarBtn =
        document.querySelector(".avatar-btn");

    const profileImage =
        document.querySelector(".profile-avatar img");


    if (avatarBtn && profileImage) {

        avatarBtn.addEventListener(
            "click",
            function () {

                const fileInput =
                    document.createElement("input");

                fileInput.type = "file";

                fileInput.accept =
                    "image/png,image/jpeg,image/jpg,image/webp";


                fileInput.addEventListener(
                    "change",
                    function (event) {

                        const file =
                            event.target.files[0];

                        if (!file) {
                            return;
                        }

                        const reader =
                            new FileReader();


                        reader.onload =
                            function (e) {

                                profileImage.src =
                                    e.target.result;

                            };


                        reader.readAsDataURL(file);

                    }
                );


                fileInput.click();

            }
        );

    }


    /* ==========================================
            CANCEL BUTTONS
    ========================================== */

    const secondaryButtons =
        document.querySelectorAll(".secondary-btn");


    secondaryButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const form =
                    button.closest(".dashboard-card");


                if (!form) {
                    return;
                }


                const inputs =
                    form.querySelectorAll(
                        "input, textarea"
                    );


                inputs.forEach(function (input) {

                    if (
                        input.type === "checkbox" ||
                        input.type === "radio"
                    ) {
                        return;
                    }

                    if (
                        input.hasAttribute("data-original")
                    ) {

                        input.value =
                            input.getAttribute(
                                "data-original"
                            );

                    }

                });

            }
        );

    });


    /* ==========================================
            STORE ORIGINAL VALUES
    ========================================== */

    const editableInputs =
        document.querySelectorAll(
            "input:not([type='checkbox']):not([type='radio']), textarea"
        );


    editableInputs.forEach(function (input) {

        if (!input.hasAttribute("data-original")) {

            input.setAttribute(
                "data-original",
                input.value
            );

        }

    });


    /* ==========================================
            PASSWORD VISIBILITY
    ========================================== */

    const passwordButtons =
        document.querySelectorAll(
            ".password-toggle"
        );


    passwordButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const input =
                    button.parentElement.querySelector(
                        "input"
                    );

                if (!input) {
                    return;
                }


                if (input.type === "password") {

                    input.type = "text";

                    button.innerHTML =
                        '<i class="fa-solid fa-eye-slash"></i>';

                } else {

                    input.type = "password";

                    button.innerHTML =
                        '<i class="fa-solid fa-eye"></i>';

                }

            }
        );

    });


    /* ==========================================
            SEARCH
    ========================================== */

    const searchInput =
        document.querySelector(
            ".search-box input"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const value =
                    searchInput.value
                        .trim()
                        .toLowerCase();


                if (!value) {
                    return;
                }


                const allText =
                    document.querySelectorAll(
                        ".settings-section"
                    );


                allText.forEach(
                    function (section) {

                        const text =
                            section.innerText
                                .toLowerCase();


                        if (text.includes(value)) {

                            section.classList.add(
                                "search-match"
                            );

                        } else {

                            section.classList.remove(
                                "search-match"
                            );

                        }

                    }
                );

            }
        );

    }


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

                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (confirmLogout) {

                    window.location.href =
                        "admin-login.html";

                }

            }
        );

    }


    /* ==========================================
            MOBILE SIDEBAR
    ========================================== */

    const sidebar =
        document.querySelector(".sidebar");


    const menuButton =
        document.querySelector(".menu-toggle");


    if (menuButton && sidebar) {

        menuButton.addEventListener(
            "click",
            function () {

                sidebar.classList.toggle(
                    "active"
                );

            }
        );

    }


    /* ==========================================
            CLOSE SIDEBAR ON MOBILE
    ========================================== */

    if (sidebar) {

        const sidebarLinks =
            sidebar.querySelectorAll(
                ".sidebar-nav a"
            );


        sidebarLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        if (
                            window.innerWidth <= 768
                        ) {

                            sidebar.classList.remove(
                                "active"
                            );

                        }

                    }
                );

            }
        );

    }


    /* ==========================================
            INITIAL TAB
    ========================================== */

    if (tabs.length > 0) {

        const activeTab =
            document.querySelector(
                ".settings-tab.active"
            );


        if (!activeTab) {

            tabs[0].classList.add("active");

        }

    }

});