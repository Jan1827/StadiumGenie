// ======================================
// Cached Elements
// ======================================

const chatBox = document.getElementById("chatBox");
const input = document.getElementById("question");

// ======================================
// Add Message to Chat
// ======================================

function addMessage(sender, text, id = null) {

    if (!chatBox) return;

    const message = document.createElement("p");

    if (id) {
        message.id = id;
    }

    const senderText = document.createElement("strong");
    senderText.textContent = `${sender}: `;

    message.appendChild(senderText);
    message.appendChild(document.createTextNode(text));

    chatBox.appendChild(message);

    chatBox.scrollTop = chatBox.scrollHeight;

}

// ======================================
// Ask AI
// ======================================

window.askAI = async function () {

    if (!input) return;

    const message = input.value.trim();

    if (!message) return;

    addMessage("👤 You", message);

    input.value = "";

    addMessage("🤖 AI", "Thinking...", "loading");

    try {

        const response = await fetch("http://localhost:3000/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message
            })

        });

        if (!response.ok) {

            throw new Error(`Server Error (${response.status})`);

        }

        const data = await response.json();

        document.getElementById("loading")?.remove();

        addMessage("🤖 AI", data.reply);

        speak(data.reply);

    }

    catch (error) {

        console.error("Chat Error:", error);

        document.getElementById("loading")?.remove();

        addMessage(
            "🤖 AI",
            "⚠️ Unable to connect to the StadiumGenie server."
        );

    }

};

// ======================================
// Voice Recognition
// ======================================

window.startVoice = function () {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        alert("❌ Speech Recognition is not supported in this browser.");

        return;

    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    input.placeholder = "🎤 Listening...";

    recognition.start();

    recognition.onresult = function (event) {

        input.value = event.results[0][0].transcript;

        input.placeholder = "Ask anything about the stadium...";

        askAI();

    };

    recognition.onerror = function (event) {

        input.placeholder = "Ask anything about the stadium...";

        const errors = {

            "no-speech": "🎤 No speech detected.",

            "audio-capture": "🎤 No microphone detected.",

            "not-allowed": "🎤 Microphone permission denied.",

            "network": "🌐 Network error."

        };

        alert(errors[event.error] || `Speech Error: ${event.error}`);

    };

    recognition.onend = function () {

        input.placeholder = "Ask anything about the stadium...";

    };

};

// ======================================
// AI Voice Response
// ======================================

function speak(text) {

    if (!window.speechSynthesis || !text) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.speak(speech);

}

// ======================================
// Press Enter
// ======================================

if (input) {

    input.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            askAI();

        }

    });

}

// ======================================
// Export for Jest
// ======================================

if (typeof module !== "undefined") {

    module.exports = {

        addMessage,
        speak

    };

}