const chatBox = document.getElementById("chatBox");
const input = document.getElementById("question");

// ======================================
// Ask AI
// ======================================

window.askAI = async function () {

    const message = input.value.trim();

    if (!message) return;

    // Show user message
    chatBox.innerHTML += `
        <p><b>👤 You:</b> ${message}</p>
    `;

    input.value = "";

    // Loading message
    chatBox.innerHTML += `
        <p id="loading"><b>🤖 AI:</b> Thinking...</p>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        const response = await fetch("http://localhost:3000/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });

        const data = await response.json();

        const loading = document.getElementById("loading");

        if (loading) loading.remove();

        chatBox.innerHTML += `
            <p><b>🤖 AI:</b> ${data.reply}</p>
        `;

        // Speak AI reply
        speak(data.reply);

        chatBox.scrollTop = chatBox.scrollHeight;

    }

    catch (error) {

        console.error(error);

        const loading = document.getElementById("loading");

        if (loading) loading.remove();

        chatBox.innerHTML += `
            <p><b>🤖 AI:</b> ⚠️ Unable to connect to the StadiumGenie server.</p>
        `;

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

    input.placeholder = "🎤 Listening... Speak now";

    recognition.start();

    recognition.onstart = function () {

        console.log("Listening...");

    };

    recognition.onresult = function (event) {

        const transcript = event.results[0][0].transcript;

        console.log("Recognized:", transcript);

        input.value = transcript;

        input.placeholder = "Ask anything about the stadium...";

        askAI();

    };

    recognition.onerror = function (event) {

        console.log("Speech Error:", event.error);

        input.placeholder = "Ask anything about the stadium...";

        switch (event.error) {

            case "no-speech":
                alert("🎤 No speech detected.\n\nClick the microphone again and start speaking immediately.");
                break;

            case "audio-capture":
                alert("🎤 No microphone detected.");
                break;

            case "not-allowed":
                alert("🎤 Microphone permission denied.");
                break;

            case "network":
                alert("🌐 Network error while using speech recognition.");
                break;

            default:
                alert("Speech Error: " + event.error);

        }

    };

    recognition.onend = function () {

        input.placeholder = "Ask anything about the stadium...";

        console.log("Recognition ended");

    };

};

// ======================================
// AI Voice Response
// ======================================

function speak(text) {

    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";

    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;

    window.speechSynthesis.speak(speech);

}

// ======================================
// Press Enter to Send
// ======================================

input.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        askAI();

    }

});