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


// ===============================
// SCROLL
// ===============================

function scrollToBottom(){

    requestAnimationFrame(() => {

        chatMessages.scrollTop = chatMessages.scrollHeight;

    });

}


// ===============================
// CREATE USER MESSAGE
// ===============================

function addUserMessage(text){

    const message = document.createElement("div");

    message.className = "message user-message";

    message.innerHTML = `

        <div class="message-content">

            <h4>You</h4>

            <p></p>

        </div>

    `;

    message.querySelector("p").textContent = text;

    chatMessages.appendChild(message);

    scrollToBottom();
}


// ===============================
// CREATE AI MESSAGE
// ===============================

function addAIMessage(text) {

    const message = document.createElement("div");
    message.className = "message ai-message";

    // Pehle se working robot avatar ko clone karo
    const originalAvatar = document.querySelector(
        ".empty-chat-message .message-avatar"
    );

    let avatar;

    if (originalAvatar) {
        avatar = originalAvatar.cloneNode(true);
    } else {
        avatar = document.createElement("div");
        avatar.className = "message-avatar";

        const img = document.createElement("img");
        img.alt = "CampusAI";

        // Fallback path
        img.src = "assets/robot-chat.png";

        avatar.appendChild(img);
    }

    const content = document.createElement("div");
    content.className = "message-content";

    const heading = document.createElement("h4");
    heading.textContent = "CampusAI";

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

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

function showTyping() {

    const message = document.createElement("div");

    message.className = "message ai-message";
    message.id = "typingMessage";

    const originalAvatar = document.querySelector(
        ".empty-chat-message .message-avatar"
    );

    let avatar;

    if (originalAvatar) {
        avatar = originalAvatar.cloneNode(true);
    } else {
        avatar = document.createElement("div");
        avatar.className = "message-avatar";

        const img = document.createElement("img");
        img.src = "assets/robot-chat.png";
        img.alt = "CampusAI";

        avatar.appendChild(img);
    }

    const content = document.createElement("div");
    content.className = "message-content";

    const heading = document.createElement("h4");
    heading.textContent = "CampusAI";

    const dots = document.createElement("div");
    dots.className = "typing-dots";

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
// DEMO RESPONSE
// ===============================

function getDemoResponse(question){

    const text = question.toLowerCase();


    if(text.includes("admission")){

        return "🎓 I can help you with AITD admission process, eligibility, important dates and required documents. After backend integration, these details will come directly from the college knowledge base.";

    }


    if(text.includes("syllabus")){

        return "📘 I can help you find the latest semester-wise syllabus. Once the backend is connected, I'll retrieve the relevant syllabus from the AITD data.";

    }


    if(text.includes("notice")){

        return "📢 I can show you the latest college notices once the notices database is connected.";

    }


    if(text.includes("placement")){

        return "💼 I can help with placement drives, eligibility, companies and placement-related information. Real data will come through the backend.";

    }


    if(text.includes("hostel")){

        return "🏠 I can provide hostel-related information such as facilities, rules and fees after the backend is connected.";

    }


    if(text.includes("scholarship")){

        return "🎓 I can help you find scholarship information, eligibility and application details.";

    }


    return "🤖 I'm currently running in frontend demo mode. Once FastAPI, RAG and the AITD knowledge base are connected, I'll provide real answers based on your college data.";

}


// ===============================
// SEND MESSAGE
// ===============================

function sendMessage(){

    const text = messageInput.value.trim();

    if(!text){
        return;
    }


    // Hide welcome UI

    welcomeScreen.style.display = "none";

    suggestionSection.style.display = "none";


    // Add user message

    addUserMessage(text);
    saveQuery(text);

    


    // Clear input

    messageInput.value = "";


    // Add history

    addHistory(text);


    // Show typing

    showTyping();


    // Demo response

    setTimeout(() => {

        const typing = document.getElementById("typingMessage");

        if(typing){
            typing.remove();
        }

        addAIMessage(getDemoResponse(text));

    }, 1000);

}
// ===============================
// SAVE QUERY FOR MY QUERIES
// ===============================

function saveQuery(question){

    const queries =
        JSON.parse(
            localStorage.getItem("campusAIQueries")
        ) || [];


    const newQuery = {

        question: question,

        time: "Just now"

    };


    // Add newest query at the top

    queries.unshift(newQuery);


    // Keep only latest 20 queries

    const limitedQueries =
        queries.slice(0, 20);


    // Save in browser storage

    localStorage.setItem(
        "campusAIQueries",
        JSON.stringify(limitedQueries)
    );

}


// ===============================
// SEND BUTTON
// ===============================

sendBtn.addEventListener("click", sendMessage);


// ===============================
// ENTER KEY
// ===============================

messageInput.addEventListener("keydown", function(event){

    if(event.key === "Enter"){

        event.preventDefault();

        sendMessage();

    }

});


// ===============================
// SUGGESTIONS
// ===============================

const suggestionCards =
    document.querySelectorAll(".suggestion-card");


suggestionCards.forEach(card => {

    card.addEventListener("click", function(){

        const question = card.dataset.question;

        messageInput.value = question;

        sendMessage();

    });

});


// ===============================
// NEW CHAT
// ===============================

newChatBtn.addEventListener("click", function(){

    chatMessages.innerHTML = `

        <div class="empty-chat-message">

            <div class="message-avatar">

                <img
                    src="assets/robot-chat.png"
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


    welcomeScreen.style.display = "block";

    suggestionSection.style.display = "grid";


    messageInput.value = "";

    messageInput.focus();


    scrollToBottom();

});


// ===============================
// CHAT HISTORY
// ===============================

function addHistory(text){

    const item = document.createElement("div");

    item.className = "history-item";

    item.textContent = text;

    item.title = text;


    item.addEventListener("click", function(){

        messageInput.value = text;

        messageInput.focus();

    });


    historyList.prepend(item);


    // Maximum 8 history items

    while(historyList.children.length > 8){

        historyList.removeChild(historyList.lastChild);

    }

}


// ===============================
// PDF UPLOAD
// ===============================

attachBtn.addEventListener("click", function(){

    pdfUpload.click();

});


pdfUpload.addEventListener("change", function(){

    if(!pdfUpload.files.length){
        return;
    }


    const file = pdfUpload.files[0];


    welcomeScreen.style.display = "none";

    suggestionSection.style.display = "none";


    addUserMessage(`📄 ${file.name}`);


    showTyping();


    setTimeout(() => {

        const typing =
            document.getElementById("typingMessage");


        if(typing){
            typing.remove();
        }


        addAIMessage(
            "✅ PDF selected successfully. Backend integration ke baad main is PDF ko process karke uske content se questions ke answers de sakunga."
        );

    }, 1000);


    pdfUpload.value = "";

});


// ===============================
// MICROPHONE
// ===============================

micBtn.addEventListener("click", function(){

    if(!("webkitSpeechRecognition" in window)){

        alert(
            "Voice input is not supported in this browser."
        );

        return;

    }


    const recognition =
        new webkitSpeechRecognition();


    recognition.lang = "en-IN";

    recognition.continuous = false;

    recognition.interimResults = false;


    recognition.start();


    micBtn.classList.add("active");


    recognition.onresult = function(event){

        messageInput.value =
            event.results[0][0].transcript;

        messageInput.focus();

    };


    recognition.onend = function(){

        micBtn.classList.remove("active");

    };

});


// ===============================
// LOGOUT
// ===============================

const logoutBtn =
    document.getElementById("logoutBtn");


if(logoutBtn){

    logoutBtn.addEventListener("click", function(){

        const confirmLogout =
            confirm("Are you sure you want to logout?");


        if(confirmLogout){

            localStorage.removeItem("loggedInUser");

            window.location.href = "login.html";

        }

    });

}


// ===============================
// BACKEND READY FUNCTION
// ===============================

async function askBackend(question){

    /*
    const response = await fetch(
        "http://127.0.0.1:8000/chat",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                question:question
            })
        }
    );

    if(!response.ok){
        throw new Error("Backend request failed");
    }

    const data = await response.json();

    return data.answer;
    */

}


// ===============================
// INITIAL FOCUS
// ===============================

window.addEventListener("load", function(){

    messageInput.focus();

});