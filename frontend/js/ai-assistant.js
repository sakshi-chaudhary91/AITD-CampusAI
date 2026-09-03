// ===============================
// ELEMENTS
// ===============================

const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

const chatMessages = document.getElementById("chatMessages");

const welcomeScreen = document.getElementById("welcomeScreen");
const suggestionSection = document.getElementById("suggestionSection");

const newChatBtn = document.getElementById("newChatBtn");

const historyList = document.getElementById("historyList");

const attachBtn = document.getElementById("attachBtn");
const pdfUpload = document.getElementById("pdfUpload");

const micBtn = document.getElementById("micBtn");

const logoutBtn = document.getElementById("logoutBtn");


// ===============================
// BACKEND URL
// ===============================

const BACKEND_URL = "http://127.0.0.1:8000";


// ===============================
// SCROLL
// ===============================

function scrollToBottom(){

    requestAnimationFrame(() => {

        chatMessages.scrollTop =
            chatMessages.scrollHeight;

    });

}


// ===============================
// CREATE USER MESSAGE
// ===============================

function addUserMessage(text){

    const message =
        document.createElement("div");

    message.className =
        "message user-message";

    message.innerHTML = `

        <div class="message-content">

            <h4>You</h4>

            <p></p>

        </div>

    `;

    message.querySelector("p").textContent =
        text;

    chatMessages.appendChild(message);

    scrollToBottom();

}


// ===============================
// CREATE AI MESSAGE
// ===============================

function addAIMessage(text){

    const message =
        document.createElement("div");

    message.className =
        "message ai-message";


    const originalAvatar =
        document.querySelector(
            ".empty-chat-message .message-avatar"
        );


    let avatar;


    if(originalAvatar){

        avatar =
            originalAvatar.cloneNode(true);

    }
    else{

        avatar =
            document.createElement("div");

        avatar.className =
            "message-avatar";


        const img =
            document.createElement("img");

        img.src =
            "assets/robot-chat.png";

        img.alt =
            "CampusAI";


        avatar.appendChild(img);

    }


    const content =
        document.createElement("div");

    content.className =
        "message-content";


    const heading =
        document.createElement("h4");

    heading.textContent =
        "CampusAI";


    const paragraph =
        document.createElement("p");

    paragraph.textContent =
        text;


    content.appendChild(heading);

    content.appendChild(paragraph);


    message.appendChild(avatar);

    message.appendChild(content);


    chatMessages.appendChild(message);

    scrollToBottom();

}


// ===============================
// TYPING MESSAGE
// ===============================

function showTyping(){

    const message =
        document.createElement("div");

    message.className =
        "message ai-message";

    message.id =
        "typingMessage";


    const originalAvatar =
        document.querySelector(
            ".empty-chat-message .message-avatar"
        );


    let avatar;


    if(originalAvatar){

        avatar =
            originalAvatar.cloneNode(true);

    }
    else{

        avatar =
            document.createElement("div");

        avatar.className =
            "message-avatar";


        const img =
            document.createElement("img");

        img.src =
            "assets/robot-chat.png";

        img.alt =
            "CampusAI";


        avatar.appendChild(img);

    }


    const content =
        document.createElement("div");

    content.className =
        "message-content";


    const heading =
        document.createElement("h4");

    heading.textContent =
        "CampusAI";


    const dots =
        document.createElement("div");

    dots.className =
        "typing-dots";


    dots.innerHTML = `

        <span></span>
        <span></span>
        <span></span>

    `;


    content.appendChild(heading);

    content.appendChild(dots);


    message.appendChild(avatar);

    message.appendChild(content);


    chatMessages.appendChild(message);

    scrollToBottom();

}


// ===============================
// REMOVE TYPING MESSAGE
// ===============================

function removeTyping(){

    const typing =
        document.getElementById(
            "typingMessage"
        );


    if(typing){

        typing.remove();

    }

}


// ===============================
// ASK BACKEND
// ===============================

async function askBackend(question){

    const url =
        `${BACKEND_URL}/chatbot/ask?question=${encodeURIComponent(question)}`;


    const response =
        await fetch(url);


    if(!response.ok){

        throw new Error(
            "Backend request failed"
        );

    }


    const data =
        await response.json();


    if(!data.answer){

        throw new Error(
            "No answer received from backend"
        );

    }


    return data.answer;

}


// ===============================
// SAVE QUERY
// ===============================

function saveQuery(question){

    const queries =
        JSON.parse(
            localStorage.getItem(
                "campusAIQueries"
            )
        ) || [];


    const newQuery = {

        question: question,

        time: "Just now"

    };


    queries.unshift(newQuery);


    const limitedQueries =
        queries.slice(0, 20);


    localStorage.setItem(
        "campusAIQueries",
        JSON.stringify(
            limitedQueries
        )
    );

}


// ===============================
// SEND MESSAGE
// ===============================

async function sendMessage(){

    const text =
        messageInput.value.trim();


    if(!text){

        return;

    }


    // Hide welcome screen

    welcomeScreen.style.display =
        "none";

    suggestionSection.style.display =
        "none";


    // Add user message

    addUserMessage(text);


    // Save query

    saveQuery(text);


    // Add chat history

    addHistory(text);


    // Clear input

    messageInput.value = "";


    // Disable send button

    sendBtn.disabled = true;


    // Show typing

    showTyping();


    try{

        // Ask actual backend

        const answer =
            await askBackend(text);


        // Remove typing

        removeTyping();


        // Show actual AI answer

        addAIMessage(answer);

    }
    catch(error){

        console.error(
            "Chatbot Error:",
            error
        );


        removeTyping();


        addAIMessage(
            "Sorry, I couldn't connect to CampusAI right now. Please make sure the backend server is running."
        );

    }
    finally{

        sendBtn.disabled = false;

        messageInput.focus();

    }

}


// ===============================
// SEND BUTTON
// ===============================

sendBtn.addEventListener(
    "click",
    sendMessage
);


// ===============================
// ENTER KEY
// ===============================

messageInput.addEventListener(
    "keydown",
    function(event){

        if(event.key === "Enter"){

            event.preventDefault();

            sendMessage();

        }

    }
);


// ===============================
// SUGGESTIONS
// ===============================

const suggestionCards =
    document.querySelectorAll(
        ".suggestion-card"
    );


suggestionCards.forEach(
    card => {

        card.addEventListener(
            "click",
            function(){

                const question =
                    card.dataset.question;


                messageInput.value =
                    question;


                sendMessage();

            }
        );

    }
);


// ===============================
// NEW CHAT
// ===============================

newChatBtn.addEventListener(
    "click",
    function(){

        chatMessages.innerHTML = `

            <div class="empty-chat-message">

                <div class="message-avatar">

                    <img
                        src="assets/robot-login.png"
                        alt="CampusAI"
                    >

                </div>

                <div class="message-content">

                    <h4>CampusAI</h4>

                    <p>
                        Hello! 👋 I'm your CampusAI Assistant.
                        How can I help you?
                    </p>

                </div>

            </div>

        `;


        welcomeScreen.style.display =
            "block";


        suggestionSection.style.display =
            "grid";


        messageInput.value = "";

        messageInput.focus();


        scrollToBottom();

    }
);


// ===============================
// CHAT HISTORY
// ===============================

function addHistory(text){

    const item =
        document.createElement("div");


    item.className =
        "history-item";


    item.textContent =
        text;


    item.title =
        text;


    item.addEventListener(
        "click",
        function(){

            messageInput.value =
                text;

            messageInput.focus();

        }
    );


    historyList.prepend(item);


    // Maximum 8 history items

    while(
        historyList.children.length > 8
    ){

        historyList.removeChild(
            historyList.lastChild
        );

    }

}


// ===============================
// LOAD SAVED HISTORY
// ===============================

function loadHistory(){

    const queries =
        JSON.parse(
            localStorage.getItem(
                "campusAIQueries"
            )
        ) || [];


    queries
        .slice(0, 8)
        .reverse()
        .forEach(query => {

            addHistory(
                query.question
            );

        });

}


// ===============================
// PDF UPLOAD
// ===============================

attachBtn.addEventListener(
    "click",
    function(){

        pdfUpload.click();

    }
);


pdfUpload.addEventListener(
    "change",
    function(){

        if(!pdfUpload.files.length){

            return;

        }


        const file =
            pdfUpload.files[0];


        welcomeScreen.style.display =
            "none";


        suggestionSection.style.display =
            "none";


        addUserMessage(
            `📄 ${file.name}`
        );


        showTyping();


        setTimeout(
            function(){

                removeTyping();


                addAIMessage(
                    "PDF upload from the student chat is not connected yet. Please use the Admin PDF Upload section to add documents to the CampusAI knowledge base."
                );

            },
            700
        );


        pdfUpload.value = "";

    }
);


// ===============================
// MICROPHONE
// ===============================

micBtn.addEventListener(
    "click",
    function(){

        if(
            !(
                "webkitSpeechRecognition"
                in window
            )
        ){

            alert(
                "Voice input is not supported in this browser."
            );

            return;

        }


        const recognition =
            new webkitSpeechRecognition();


        recognition.lang =
            "en-IN";


        recognition.continuous =
            false;


        recognition.interimResults =
            false;


        recognition.start();


        micBtn.classList.add(
            "active"
        );


        recognition.onresult =
            function(event){

                messageInput.value =
                    event.results[0][0]
                        .transcript;

                messageInput.focus();

            };


        recognition.onend =
            function(){

                micBtn.classList.remove(
                    "active"
                );

            };


        recognition.onerror =
            function(){

                micBtn.classList.remove(
                    "active"
                );

            };

    }
);


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

window.addEventListener(
    "load",
    function(){

        loadHistory();

        messageInput.focus();

    }
);