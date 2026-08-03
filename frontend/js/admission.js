// ===============================
// ELEMENTS
// ===============================

const logoutBtn = document.getElementById("logoutBtn");

const applyBtn =
document.querySelector(".link-buttons a:nth-child(1)");

const brochureBtn =
document.querySelector(".link-buttons a:nth-child(2)");

const feeBtn =
document.querySelector(".link-buttons a:nth-child(3)");

const helpBtn =
document.querySelector(".help-card a");



// ===============================
// APPLY NOW
// ===============================

if(applyBtn){

    applyBtn.addEventListener("click",function(e){

        e.preventDefault();

        alert(
            "Online Admission Portal will be available soon."
        );

    });

}



// ===============================
// BROCHURE
// ===============================

if(brochureBtn){

    brochureBtn.addEventListener("click",function(e){

        e.preventDefault();

        alert(
            "Brochure PDF will be uploaded by the Admin."
        );

    });

}



// ===============================
// FEE STRUCTURE
// ===============================

if(feeBtn){

    feeBtn.addEventListener("click",function(e){

        e.preventDefault();

        alert(
            "Fee Structure PDF will be available soon."
        );

    });

}



// ===============================
// ASK CAMPUS AI
// ===============================

if(helpBtn){

    helpBtn.addEventListener("click",function(e){

        e.preventDefault();

        window.location.href="ai-assistant.html";

    });

}



// ===============================
// FAQ ACCORDION
// ===============================

const faqItems =
document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

    const answer =
    item.querySelector("p");

    answer.style.display="none";

    item.querySelector("h4")
    .addEventListener("click",()=>{

        const isOpen =
        answer.style.display==="block";

        faqItems.forEach(f=>{

            f.querySelector("p").style.display="none";

        });

        answer.style.display=
        isOpen ? "none" : "block";

    });

});



// ===============================
// LOGOUT
// ===============================

if(logoutBtn){

    logoutBtn.addEventListener("click",function(){

        const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );

        if(confirmLogout){

            localStorage.removeItem(
                "loggedInUser"
            );

            window.location.href=
            "login.html";

        }

    });

}