// =============================================
// StadiumGenie Operations AI
// =============================================

const crowdPredictions = [
    "🟢 Crowd levels are low near Gates 1 and 2.",
    "🟡 Moderate congestion detected near Gate 4.",
    "🔴 Heavy crowd detected near Gate 3. Redirect visitors.",
    "🟢 Stadium entry flow is operating normally."
];

const parkingPredictions = [
    "🟢 Parking Zone A has sufficient spaces.",
    "🟡 Parking Zone B is approximately 70% occupied.",
    "🔴 Parking Zone B is almost full. Redirect vehicles to Zone A.",
    "🟢 Shuttle parking is available on the east side."
];

const foodPredictions = [
    "🟢 Food Court A has short waiting times.",
    "🟡 Food Court B has a moderate queue.",
    "🔴 Food Court B is experiencing long queues.",
    "🟢 All food counters are operating normally."
];

const weatherPredictions = [
    "☀️ Clear weather. No operational disruption expected.",
    "🌤️ Mild cloud cover with normal stadium operations.",
    "🌧️ Light rain possible. Prepare covered waiting areas.",
    "🌡️ High temperature detected. Increase water availability."
];

const transportPredictions = [
    "🚇 Metro services are operating normally.",
    "🚌 Additional shuttle buses have been deployed.",
    "🟡 Moderate congestion detected near the metro station.",
    "🚗 Visitors should use public transport where possible."
];

const accessibilityPredictions = [
    "♿ Accessible entrances at Gates 1 and 3 are operational.",
    "🛗 All accessibility elevators are functioning normally.",
    "👷 Additional volunteers are available for accessibility support.",
    "♿ Wheelchair assistance is available near Gate 1."
];

const safetyPredictions = [
    "🟢 No active safety incidents.",
    "🚑 Medical teams are ready near Gate 3.",
    "🟡 Staff attention required near the west concourse.",
    "🛡️ Security operations are functioning normally."
];

function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function updateElement(id, content) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = content;
    }
}

// =============================================
// Update Operational Prediction Cards
// =============================================

function updateOperationalPredictions() {
    updateElement(
        "crowdPrediction",
        randomItem(crowdPredictions)
    );

    updateElement(
        "parkingPrediction",
        randomItem(parkingPredictions)
    );

    updateElement(
        "foodPrediction",
        randomItem(foodPredictions)
    );

    updateElement(
        "weatherPrediction",
        randomItem(weatherPredictions)
    );

    updateElement(
        "transportPrediction",
        randomItem(transportPredictions)
    );

    updateElement(
        "accessibilityPrediction",
        randomItem(accessibilityPredictions)
    );

    updateElement(
        "safetyPrediction",
        randomItem(safetyPredictions)
    );
}

// =============================================
// Generate AI Operations Report
// =============================================

async function generateAIReport() {
    const reportBox = document.getElementById("summaryPrediction");
    const reportButton = document.getElementById("generateReportButton");

    if (!reportBox) return;

    updateOperationalPredictions();

    reportBox.textContent =
        "🤖 StadiumGenie AI is analyzing current operations...";

    if (reportButton) {
        reportButton.disabled = true;
        reportButton.textContent = "Generating report...";
    }

    try {
        const apiUrl =
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1"
                ? "http://localhost:3000/chat"
                : "/chat";

        const response = await fetch(apiUrl, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: `You are StadiumGenie AI, an Operations Intelligence Assistant for FIFA World Cup 2026.

Generate a concise operational report for stadium organizers.

Analyze these areas:

1. Crowd management
2. Parking availability
3. Food court queues
4. Weather impact
5. Public transportation
6. Accessibility services
7. Emergency readiness
8. Sustainability recommendations

Provide practical action points and finish with an overall operational status.

Keep the report under 180 words.`
            })
        });

        if (!response.ok) {
            throw new Error(
                `Server returned status ${response.status}`
            );
        }

        const data = await response.json();

        const aiReply =
            data.reply ||
            data.response ||
            data.message ||
            data.answer;

        if (!aiReply || typeof aiReply !== "string") {
            throw new Error("The server returned an invalid AI response.");
        }

        reportBox.textContent = aiReply;
    } catch (error) {
        console.error("Operations AI error:", error);

        reportBox.textContent =
            "⚠️ The live AI report could not be generated. Operational prediction cards are still available. Confirm that the server is running on port 3000.";
    } finally {
        if (reportButton) {
            reportButton.disabled = false;
            reportButton.textContent = "🔄 Generate AI Report";
        }
    }
}

// =============================================
// Page Initialization
// =============================================

function initializeOperationsPage() {
    updateOperationalPredictions();

    const reportButton =
        document.getElementById("generateReportButton");

    if (reportButton) {
        reportButton.addEventListener(
            "click",
            generateAIReport
        );
    }

    generateAIReport();
}

if (typeof window !== "undefined") {
    window.generateAIReport = generateAIReport;
    window.updateOperationalPredictions =
        updateOperationalPredictions;

    window.addEventListener(
        "DOMContentLoaded",
        initializeOperationsPage
    );
}

// =============================================
// Jest Exports
// =============================================

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        randomItem,
        updateElement,
        updateOperationalPredictions,
        generateAIReport
    };
}