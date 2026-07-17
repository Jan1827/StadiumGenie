// =============================================
// StadiumGenie Volunteer AI Assistant
// =============================================

const fallbackBriefings = [
    `📍 Crowd: Moderate congestion near Gate 4.
👥 Staffing: Deploy 3 additional volunteers to the west entrance.
🚗 Parking: Redirect new vehicles from Zone B to Zone A.
🍔 Food: Food Court B has longer queues; guide visitors to Food Court A.
♿ Accessibility: Keep assistance staff available at Gates 1 and 3.
🚑 Safety: Medical and security teams are operating normally.
📢 Announcement: Encourage visitors to use the metro after the match.`,

    `📍 Crowd: Entry flow is currently stable.
👥 Staffing: Assign two volunteers near Gate 3 for visitor guidance.
🚗 Parking: Zone A has available spaces; Zone B is filling quickly.
🍔 Food: Food Court A has the shortest waiting time.
♿ Accessibility: Wheelchair support is available near Gate 1.
🚑 Safety: No active incidents have been reported.
📢 Announcement: Remind visitors to keep emergency routes clear.`,

    `📍 Crowd: Heavy movement expected near the main concourse.
👥 Staffing: Move four volunteers from Gate 2 to Gate 4.
🚗 Parking: Recommend public transport for late arrivals.
🍔 Food: Open an additional counter at Food Court B.
♿ Accessibility: Check elevators near Gates 1 and 3.
🚑 Safety: Medical teams remain ready near Gate 3.
📢 Announcement: Direct departing spectators toward the south exit.`
];

function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function getVolunteerReportBox() {
    return document.getElementById("volunteerReport");
}

function getVolunteerButton() {
    return document.getElementById("generateVolunteerButton");
}

function getApiUrl() {
    const hostname = window.location.hostname;
    const port = window.location.port;

    // When the page is served by the Express server
    if (port === "3000") {
        return "/chat";
    }

    // When opened through VS Code Live Server
    if (
        hostname === "localhost" ||
        hostname === "127.0.0.1"
    ) {
        return "http://localhost:3000/chat";
    }

    // For deployment
    return "/chat";
}

function displayFallbackBriefing() {
    const reportBox = getVolunteerReportBox();

    if (!reportBox) return;

    reportBox.textContent = randomItem(fallbackBriefings);
}

async function generateVolunteerReport() {
    const reportBox = getVolunteerReportBox();
    const button = getVolunteerButton();

    if (!reportBox) return;

    reportBox.textContent =
        "🤖 StadiumGenie AI is preparing the volunteer briefing...";

    if (button) {
        button.disabled = true;
        button.textContent = "Generating briefing...";
    }

    try {
        const response = await fetch(getApiUrl(), {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: `You are StadiumGenie AI, a volunteer coordinator for FIFA World Cup 2026.

Generate a concise operational briefing for stadium volunteers.

Include:

- Current crowd hotspots
- Gates requiring additional staff
- Parking guidance
- Food court queue information
- Accessibility assistance
- Emergency readiness
- Recommended volunteer deployment
- One important visitor announcement

Use clear action points and keep the response under 170 words.`
            })
        });

        if (!response.ok) {
            throw new Error(
                `Server request failed with status ${response.status}`
            );
        }

        const data = await response.json();

        const aiReply =
            data.reply ||
            data.response ||
            data.answer ||
            data.message;

        if (!aiReply || typeof aiReply !== "string") {
            throw new Error("No valid AI reply was returned.");
        }

        reportBox.textContent = aiReply;
    } catch (error) {
        console.error("Volunteer AI request failed:", error);

        reportBox.textContent =
            "⚠️ Live AI is currently unavailable. Showing a simulated operational briefing:\n\n" +
            randomItem(fallbackBriefings);
    } finally {
        if (button) {
            button.disabled = false;
            button.textContent = "🤖 Generate AI Briefing";
        }
    }
}

function initializeVolunteerPage() {
    const button = getVolunteerButton();

    if (button) {
        button.addEventListener(
            "click",
            generateVolunteerReport
        );
    }

    displayFallbackBriefing();
}

// Browser initialization
if (typeof window !== "undefined") {
    window.generateVolunteerReport =
        generateVolunteerReport;

    window.addEventListener(
        "DOMContentLoaded",
        initializeVolunteerPage
    );
}

// Jest exports
if (
    typeof module !== "undefined" &&
    module.exports
) {
    module.exports = {
        randomItem,
        getApiUrl,
        displayFallbackBriefing,
        generateVolunteerReport
    };
}