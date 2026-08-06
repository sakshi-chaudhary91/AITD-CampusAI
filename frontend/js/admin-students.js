// ==========================================
// SEARCH STUDENTS
// ==========================================

const searchInput = document.querySelector(".search-box input");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const rows = document.querySelectorAll(".student-table tbody tr");

        rows.forEach(row => {

            row.style.display = row.innerText.toLowerCase().includes(value)
                ? ""
                : "none";

        });

    });

}

// ==========================================
// VIEW BUTTON
// ==========================================

document.querySelectorAll(".view-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        alert("Student Details page will open.");

    });

});

// ==========================================
// EDIT BUTTON
// ==========================================

document.querySelectorAll(".edit-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        alert("Edit Student feature will be available after backend integration.");

    });

});

// ==========================================
// DELETE BUTTON
// ==========================================

document.querySelectorAll(".delete-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        const confirmDelete = confirm("Delete this student?");

        if(confirmDelete){

            btn.closest("tr").remove();

        }

    });

});

// ==========================================
// ADD STUDENT BUTTON
// ==========================================

const addBtn = document.querySelector(".add-btn");

if(addBtn){

    addBtn.addEventListener("click",()=>{

        alert("Add Student Form will open.");

    });

}

// ==========================================
// PAGINATION BUTTON ACTIVE
// ==========================================

const pages = document.querySelectorAll(".table-pagination button");

pages.forEach(page=>{

    page.addEventListener("click",()=>{

        pages.forEach(btn=>btn.classList.remove("active-page"));

        page.classList.add("active-page");

    });

});

// ==========================================
// LOGOUT
// ==========================================

const logoutBtn = document.querySelector(".sidebar-bottom button");

if(logoutBtn){

    logoutBtn.addEventListener("click",()=>{

        const logout = confirm("Are you sure you want to logout?");

        if(logout){

            window.location.href="login.html";

        }

    });

}