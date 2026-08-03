// ===============================
// ELEMENTS
// ===============================

const queriesList = document.getElementById("queriesList");
const clearQueriesBtn = document.getElementById("clearQueriesBtn");
const emptyState = document.getElementById("emptyState");
const logoutBtn = document.getElementById("logoutBtn");


// ===============================
// LOAD SAVED QUERIES
// ===============================

function loadQueries(){

    const savedQueries =
        JSON.parse(
            localStorage.getItem("campusAIQueries")
        ) || [];


    // Remove all generated query cards

    document
        .querySelectorAll(".dynamic-query")
        .forEach(card => {

            card.remove();

        });


    // No queries

    if(savedQueries.length === 0){

        emptyState.style.display = "flex";

        return;

    }


    // Queries available

    emptyState.style.display = "none";


    savedQueries.forEach(query => {

        createQueryCard(query);

    });

}


// ===============================
// CREATE QUERY CARD
// ===============================

function createQueryCard(query){

    const card =
        document.createElement("div");


    card.className =
        "query-card dynamic-query";


    card.innerHTML = `

        <div class="query-icon">

            <i class="fa-solid fa-message"></i>

        </div>


        <div class="query-info">

            <h3></h3>

            <p>
                Asked to CampusAI
            </p>

            <span class="query-time">

                <i class="fa-regular fa-clock"></i>

                ${query.time || "Recently"}

            </span>

        </div>


        <button
            class="view-query-btn"
            title="Ask Again"
        >

            <i class="fa-solid fa-arrow-right"></i>

        </button>

    `;


    // Add question safely

    card.querySelector("h3").textContent =
        query.question;


    // ===============================
    // ASK AGAIN
    // ===============================

    card
        .querySelector(".view-query-btn")
        .addEventListener(
            "click",
            function(){

                const question =
                    encodeURIComponent(
                        query.question
                    );


                window.location.href =
                    "ai-assistant.html?question=" +
                    question;

            }
        );


    // Add card before empty state

    queriesList.insertBefore(
        card,
        emptyState
    );

}


// ===============================
// CLEAR HISTORY
// ===============================

if(clearQueriesBtn){

    clearQueriesBtn.addEventListener(
        "click",
        function(){

            const savedQueries =
                JSON.parse(
                    localStorage.getItem(
                        "campusAIQueries"
                    )
                ) || [];


            if(savedQueries.length === 0){

                return;

            }


            const confirmClear =
                confirm(
                    "Are you sure you want to clear your query history?"
                );


            if(!confirmClear){

                return;

            }


            localStorage.removeItem(
                "campusAIQueries"
            );


            loadQueries();

        }
    );

}


// ===============================
// LOGOUT
// ===============================

if(logoutBtn){

    logoutBtn.addEventListener(
        "click",
        function(){

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if(confirmLogout){

                localStorage.removeItem(
                    "loggedInUser"
                );


                window.location.href =
                    "login.html";

            }

        }
    );

}


// ===============================
// INITIAL LOAD
// ===============================

loadQueries();