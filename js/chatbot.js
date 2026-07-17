
const chatBox =
    typeof document !== "undefined"
        ? document.getElementById("chatBox")
        : null;

const input =
    typeof document !== "undefined"
        ? document.getElementById("question")
        : null;

const languageSelect =
    typeof document !== "undefined"
        ? document.getElementById("language")
        : null;

const sendButton =
    typeof document !== "undefined"
        ? document.getElementById("sendButton")
        : null;

const voiceButton =
    typeof document !== "undefined"
        ? document.getElementById("voiceButton")
        : null;

const voiceStatus =
    typeof document !== "undefined"
        ? document.getElementById("voiceStatus")
        : null;




const languages = {

    English: {
        speech: "en-US",
        prompt: "English"
    },

    Hindi: {
        speech: "hi-IN",
        prompt: "Hindi"
    },

    Spanish: {
        speech: "es-ES",
        prompt: "Spanish"
    },

    French: {
        speech: "fr-FR",
        prompt: "French"
    }

};



function getApiUrl() {

    if (typeof window === "undefined") {

        return "http://localhost:3000/chat";

    }

    const hostname =
        window.location.hostname;

    if (
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        hostname === ""
    ) {

        return "http://localhost:3000/chat";

    }

    return "/chat";

}



function addMessage(sender, text, id = null) {

    if (!chatBox) return;

    const message = document.createElement("div");

    message.className =
        sender.includes("You")
            ? "user-message"
            : "bot-message";

    if (id) {

        message.id = id;

    }

    const strong = document.createElement("strong");

    strong.textContent = sender + ": ";

    message.appendChild(strong);

    message.appendChild(
        document.createTextNode(text)
    );

    chatBox.appendChild(message);

    chatBox.scrollTop =
        chatBox.scrollHeight;

}

// =============================================
// Selected Language
// =============================================

function getSelectedLanguage() {

    const selectedLanguage =
        languageSelect?.value || "English";

    return languages[selectedLanguage] || languages.English;

}


// =============================================
// Interface Loading State
// =============================================

function setLoadingState(isLoading) {

    if (sendButton) {

        sendButton.disabled = isLoading;

        sendButton.textContent =
            isLoading ? "Sending..." : "Send";

    }

    if (voiceButton) {

        voiceButton.disabled = isLoading;

    }

    if (input) {

        input.disabled = isLoading;

    }

}


// =============================================
// Remove Loading Message
// =============================================

function removeLoadingMessage() {

    if (typeof document === "undefined") return;

    document.getElementById("loading")?.remove();

}


// =============================================
// Ask StadiumGenie AI
// =============================================

async function askAI() {

    if (!input) return;

    const message = input.value.trim();

    if (!message) {

        input.focus();

        return;

    }

    const selectedLanguage =
        languageSelect?.value || "English";

    addMessage("👤 You", message);

    input.value = "";

    addMessage(
        "🤖 AI",
        selectedLanguage === "Hindi"
            ? "सोच रहा हूँ..."
            : selectedLanguage === "Spanish"
                ? "Pensando..."
                : selectedLanguage === "French"
                    ? "Réflexion en cours..."
                    : "Thinking...",
        "loading"
    );

    setLoadingState(true);

    try {

        const languageInstruction = `
The user has selected ${selectedLanguage} as the response language.

Answer the user's question entirely in ${selectedLanguage}.

You are StadiumGenie, an AI smart stadium assistant.

Provide clear, concise and useful stadium guidance.

You can assist with:
- stadium gates
- parking zones
- food courts
- metro and transport
- medical centres
- emergency services
- wheelchair accessibility
- match schedules
- stadium facilities

If the question involves an immediate emergency, advise the user to contact nearby stadium staff or emergency services.

User question:
${message}
        `.trim();

        const response = await fetch(getApiUrl(), {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                message: languageInstruction,

                originalMessage: message,

                language: selectedLanguage

            })

        });

        if (!response.ok) {

            throw new Error(
                `Server Error (${response.status})`
            );

        }

        const data = await response.json();

        removeLoadingMessage();

        const reply =
            data.reply ||
            data.message ||
            getErrorMessage(selectedLanguage);

        addMessage("🤖 AI", reply);

        speak(reply);

    }

    catch (error) {

        console.error(
            "StadiumGenie Chat Error:",
            error
        );

        removeLoadingMessage();

        addMessage(
            "🤖 AI",
            getConnectionErrorMessage(selectedLanguage)
        );

    }

    finally {

        setLoadingState(false);

        input.focus();

    }

}


// =============================================
// Translated Error Messages
// =============================================

function getErrorMessage(language) {

    const messages = {

        English:
            "Sorry, I could not generate a response.",

        Hindi:
            "क्षमा करें, मैं उत्तर तैयार नहीं कर सका।",

        Spanish:
            "Lo siento, no pude generar una respuesta.",

        French:
            "Désolé, je n’ai pas pu générer de réponse."

    };

    return messages[language] || messages.English;

}


function getConnectionErrorMessage(language) {

    const messages = {

        English:
            "⚠️ Unable to connect to the StadiumGenie server. Please make sure the server is running.",

        Hindi:
            "⚠️ StadiumGenie सर्वर से कनेक्ट नहीं हो सका। कृपया सुनिश्चित करें कि सर्वर चल रहा है।",

        Spanish:
            "⚠️ No se pudo conectar con el servidor de StadiumGenie. Comprueba que el servidor esté funcionando.",

        French:
            "⚠️ Impossible de se connecter au serveur StadiumGenie. Vérifiez que le serveur fonctionne."

    };

    return messages[language] || messages.English;

}


// =============================================
// Voice Status
// =============================================

function updateVoiceStatus(message) {

    if (voiceStatus) {

        voiceStatus.textContent = message;

    }

}


// =============================================
// Start Voice Recognition
// =============================================

function startVoice() {

    if (
        typeof window === "undefined" ||
        !input
    ) {
        return;
    }

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        updateVoiceStatus(
            "❌ Speech recognition is not supported in this browser."
        );

        return;

    }

    const selectedLanguage =
        getSelectedLanguage();

    const recognition =
        new SpeechRecognition();

    recognition.lang =
        selectedLanguage.speech;

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.maxAlternatives = 1;

    input.placeholder = "🎤 Listening...";

    updateVoiceStatus(
        `🎤 Listening in ${languageSelect?.value || "English"}...`
    );

    if (voiceButton) {

        voiceButton.disabled = true;

        voiceButton.textContent = "⏹";

    }

    try {

        recognition.start();

    }

    catch (error) {

        console.error(
            "Speech recognition error:",
            error
        );

        resetVoiceInterface();

    }


    recognition.onresult = function (event) {

        const transcript =
            event.results?.[0]?.[0]?.transcript;

        if (!transcript) return;

        input.value = transcript;

        updateVoiceStatus(
            `✅ Heard: ${transcript}`
        );

        askAI();

    };


    recognition.onerror = function (event) {

        const errors = {

            "no-speech":
                "🎤 No speech was detected. Please try again.",

            "audio-capture":
                "🎤 No microphone was detected.",

            "not-allowed":
                "🎤 Microphone permission was denied.",

            "service-not-allowed":
                "🎤 Speech recognition service is unavailable.",

            "network":
                "🌐 A network error interrupted voice recognition.",

            "aborted":
                "🎤 Voice recognition was stopped."

        };

        updateVoiceStatus(
            errors[event.error] ||
            `🎤 Speech error: ${event.error}`
        );

    };


    recognition.onend = function () {

        resetVoiceInterface();

    };

}


// =============================================
// Reset Voice Interface
// =============================================

function resetVoiceInterface() {

    if (input) {

        input.placeholder =
            "Ask your question...";

    }

    if (voiceButton) {

        voiceButton.disabled = false;

        voiceButton.textContent = "🎤";

    }

}


// =============================================
// Speak AI Response
// =============================================

function speak(text) {

    if (
        typeof window === "undefined" ||
        !window.speechSynthesis ||
        !text
    ) {
        return;
    }

    window.speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(text);

    const selectedLanguage =
        getSelectedLanguage();

    speech.lang =
        selectedLanguage.speech;

    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;

    const availableVoices =
        window.speechSynthesis.getVoices();

    const matchingVoice =
        availableVoices.find((voice) =>
            voice.lang
                .toLowerCase()
                .startsWith(
                    selectedLanguage.speech
                        .split("-")[0]
                        .toLowerCase()
                )
        );

    if (matchingVoice) {

        speech.voice = matchingVoice;

    }

    window.speechSynthesis.speak(speech);

}


// =============================================
// Language Change
// =============================================

function handleLanguageChange() {

    const language =
        languageSelect?.value || "English";

    const placeholders = {

        English:
            "Ask your question...",

        Hindi:
            "अपना प्रश्न पूछें...",

        Spanish:
            "Escribe tu pregunta...",

        French:
            "Posez votre question..."

    };

    if (input) {

        input.placeholder =
            placeholders[language] ||
            placeholders.English;

    }

    updateVoiceStatus(
        `🌐 Response language changed to ${language}.`
    );

}


// =============================================
// Initialize Chatbot
// =============================================

function initializeChatbot() {

    if (typeof document === "undefined") {

        return;

    }

    const chatForm =
        document.getElementById("chatForm");

    chatForm?.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            askAI();

        }
    );

    voiceButton?.addEventListener(
        "click",
        startVoice
    );

    languageSelect?.addEventListener(
        "change",
        handleLanguageChange
    );

    input?.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                askAI();

            }

        }
    );

}


// =============================================
// Start After Page Loads
// =============================================

if (typeof document !== "undefined") {

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeChatbot
        );

    }

    else {

        initializeChatbot();

    }

}


// =============================================
// Make Functions Available to HTML
// =============================================

if (typeof window !== "undefined") {

    window.askAI = askAI;

    window.startVoice = startVoice;

    window.speak = speak;

}


// =============================================
// Jest / Node Exports
// =============================================

if (
    typeof module !== "undefined" &&
    module.exports
) {

    module.exports = {

        languages,

        addMessage,

        getApiUrl,

        getSelectedLanguage,

        setLoadingState,

        removeLoadingMessage,

        getErrorMessage,

        getConnectionErrorMessage,

        updateVoiceStatus,

        askAI,

        startVoice,

        resetVoiceInterface,

        speak,

        handleLanguageChange,

        initializeChatbot

    };

}


