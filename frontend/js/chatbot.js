// =============================
// ELEMENTS
// =============================

const chatBody = document.getElementById("chatBody");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// =============================
// RESPONSES
// =============================

const responses = {

    "admission":
`🎓 Admission Process

• Online Registration
• Document Verification
• Counselling
• Fee Submission

🔒 Login to access personalized admission guidance.`,

    "courses":
`📚 Courses Available

• CSE
• AI & ML
• IT
• EL
• CH
• BT

Login to explore complete syllabus.`,

    "fees":
`💰 Fee Details

Fees depend on course and category.

Please login for complete fee structure.`,

    "scholarships":
`🎁 Scholarships

• UP Scholarship
• Pragati Scholarship

Login for eligibility details.`,

    "notices":
`📢 Latest Notices

Latest notices are available after login.

This is a demo chatbot.`,

    "hostel":
`🏠 Hostel Facility

Separate hostel available for boys and girls.

Login to know availability.`,

    "placement":
`💼 Placements

CampusAI helps students with placement information.

Login for placement statistics.`,

    "hello":
`👋 Hello!

Welcome to CampusAI Demo.

How can I help you today?`

};

// =============================
// ADD USER MESSAGE
// =============================

function addUserMessage(text){

    chatBody.innerHTML += `

    <div class="message">

        <div class="avatar">
            👤
        </div>

        <div class="message-content">

            <h4>You</h4>

            <p>${text}</p>

        </div>

    </div>

    `;

    scrollBottom();

}

// =============================
// TYPING
// =============================

function typing(){

    chatBody.innerHTML += `

    <div class="message" id="typing">

        <div class="avatar">
            🤖
        </div>

        <div class="message-content">

            <h4>CampusAI</h4>

            <p>Typing...</p>

        </div>

    </div>

    `;

    scrollBottom();

}

// =============================
// REMOVE TYPING
// =============================

function removeTyping(){

    const typing=document.getElementById("typing");

    if(typing){

        typing.remove();

    }

}

// =============================
// BOT MESSAGE
// =============================

function addBotMessage(message){

    chatBody.innerHTML += `

    <div class="message">

        <div class="avatar">
            🤖
        </div>

        <div class="message-content">

            <h4>CampusAI</h4>

            <p>${message.replace(/\n/g,"<br>")}</p>

            <br>

            <a href="login.html"
            style="
            color:#2563EB;
            font-weight:600;
            ">
            🔒 Login for Full CampusAI
            </a>

        </div>

    </div>

    `;

    scrollBottom();

}

// =============================
// SEND MESSAGE
// =============================

function sendMessage(){

    const text=input.value.trim();

    if(text==="") return;

    addUserMessage(text);

    input.value="";

    typing();

    setTimeout(()=>{

        removeTyping();

        let msg=text.toLowerCase();

        let reply=

`Sorry 😅

This is a demo version of CampusAI.

Please login to use the complete AI Assistant.`;

        for(let key in responses){

            if(msg.includes(key)){

                reply=responses[key];

                break;

            }

        }

        addBotMessage(reply);

    },1000);

}

// =============================
// SEND BUTTON
// =============================

sendBtn.addEventListener("click",sendMessage);

// =============================
// ENTER
// =============================

input.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        sendMessage();

    }

});

// =============================
// QUICK BUTTONS
// =============================

document.querySelectorAll(".quick-btn").forEach(btn=>{

    btn.addEventListener("click",()=>{

        input.value=btn.innerText;

        sendMessage();

    });

});

// =============================
// SCROLL
// =============================

function scrollBottom(){

    chatBody.scrollTop=chatBody.scrollHeight;

}