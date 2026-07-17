
const insightContainer =
    typeof document !== "undefined"
        ? document.getElementById("insightContainer")
        : null;




const liveStadiumData = {

    crowd: {
        gate1: 42,
        gate2: 68,
        gate3: 84,
        gate4: 55
    },

    parking: {
        zoneA: 91,
        zoneB: 63
    },

    foodQueues: {
        foodCourtA: 12,
        foodCourtB: 24
    },

    transport: {
        metroWait: 6,
        busWait: 10
    },

    safety: {
        activeIncidents: 0,
        medicalRequests: 1
    },

    sustainability: {
        recyclingRate: 74,
        energyUsage: 66,
        publicTransportUsage: 71
    }

};




function randomNumber(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}


function getApiUrl() {

    if (typeof window === "undefined") {
        return "http://localhost:3000/chat";
    }

    const hostname = window.location.hostname;

    if (
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        hostname === ""
    ) {
        return "http://localhost:3000/chat";
    }

    return "/chat";

}




function updateLiveData() {

    liveStadiumData.crowd.gate1 =
        randomNumber(35, 60);

    liveStadiumData.crowd.gate2 =
        randomNumber(55, 80);

    liveStadiumData.crowd.gate3 =
        randomNumber(75, 95);

    liveStadiumData.crowd.gate4 =
        randomNumber(40, 70);

    liveStadiumData.parking.zoneA =
        randomNumber(80, 98);

    liveStadiumData.parking.zoneB =
        randomNumber(45, 75);

    liveStadiumData.foodQueues.foodCourtA =
        randomNumber(5, 18);

    liveStadiumData.foodQueues.foodCourtB =
        randomNumber(15, 30);

    liveStadiumData.transport.metroWait =
        randomNumber(3, 10);

    liveStadiumData.transport.busWait =
        randomNumber(5, 15);

    liveStadiumData.safety.activeIncidents =
        randomNumber(0, 1);

    liveStadiumData.safety.medicalRequests =
        randomNumber(0, 3);

    liveStadiumData.sustainability.recyclingRate =
        randomNumber(68, 86);

    liveStadiumData.sustainability.energyUsage =
        randomNumber(55, 80);

    liveStadiumData.sustainability.publicTransportUsage =
        randomNumber(60, 82);

}




function buildInsightPrompt() {

    return `
You are StadiumGenie AI, an intelligent stadium operations analyst.

Analyze the following live stadium data:

Crowd density:
- Gate 1: ${liveStadiumData.crowd.gate1}%
- Gate 2: ${liveStadiumData.crowd.gate2}%
- Gate 3: ${liveStadiumData.crowd.gate3}%
- Gate 4: ${liveStadiumData.crowd.gate4}%

Parking occupancy:
- Zone A: ${liveStadiumData.parking.zoneA}%
- Zone B: ${liveStadiumData.parking.zoneB}%

Food queue waiting time:
- Food Court A: ${liveStadiumData.foodQueues.foodCourtA} minutes
- Food Court B: ${liveStadiumData.foodQueues.foodCourtB} minutes

Public transport:
- Metro wait: ${liveStadiumData.transport.metroWait} minutes
- Bus wait: ${liveStadiumData.transport.busWait} minutes

Safety:
- Active incidents: ${liveStadiumData.safety.activeIncidents}
- Medical requests: ${liveStadiumData.safety.medicalRequests}

Sustainability:
- Recycling rate: ${liveStadiumData.sustainability.recyclingRate}%
- Energy usage: ${liveStadiumData.sustainability.energyUsage}%
- Public transport usage: ${liveStadiumData.sustainability.publicTransportUsage}%

Generate a concise stadium operations report with these exact sections:

1. Crowd Management
2. Parking
3. Food and Concessions
4. Transport
5. Safety
6. Sustainability
7. Priority Recommendation

Keep the response under 220 words.
Give practical recommendations.
Do not invent additional stadium locations.
    `.trim();

}



function showLoading() {

    if (!insightContainer) return;

    insightContainer.innerHTML = `
        <div class="insight-loading">
            <h2>🤖 Generating AI Insights...</h2>
            <p>
                Analysing crowd, parking, food,
                transport, safety and sustainability data.
            </p>
        </div>
    `;

}




function showError(message) {

    if (!insightContainer) return;

    insightContainer.innerHTML = `
        <div class="insight-error">
            <h2>⚠️ Unable to Generate Insights</h2>
            <p>${escapeHtml(message)}</p>
        </div>
    `;

}




function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}




function displayInsights(reply) {

    if (!insightContainer) return;

    const safeReply = escapeHtml(reply);

    const formattedReply = safeReply
        .replace(
            /(\d+\.\s+[^\n]+)/g,
            "<h3>$1</h3>"
        )
        .replace(/\n/g, "<br>");

    insightContainer.innerHTML = `
        <section class="insight-report">

            <div class="report-header">
                <h2>🧠 AI Operational Report</h2>
                <span>Live Stadium Intelligence</span>
            </div>

            <div class="report-content">
                ${formattedReply}
            </div>

            <div class="report-footer">
                Generated using simulated live stadium data.
            </div>

        </section>
    `;

}




function generateFallbackInsights() {

    const highestCrowdEntry =
        Object.entries(liveStadiumData.crowd)
            .sort((a, b) => b[1] - a[1])[0];

    const highestCrowdGate =
        highestCrowdEntry[0]
            .replace("gate", "Gate ");

    const highestCrowdValue =
        highestCrowdEntry[1];

    const preferredParking =
        liveStadiumData.parking.zoneA <
        liveStadiumData.parking.zoneB
            ? "Zone A"
            : "Zone B";

    const shorterFoodQueue =
        liveStadiumData.foodQueues.foodCourtA <
        liveStadiumData.foodQueues.foodCourtB
            ? "Food Court A"
            : "Food Court B";

    const safetyStatus =
        liveStadiumData.safety.activeIncidents === 0
            ? "No active safety incidents are currently reported."
            : "One active incident requires staff attention.";

    return `
1. Crowd Management
${highestCrowdGate} has the highest crowd level at ${highestCrowdValue}%. Redirect visitors toward less crowded entrances and deploy additional staff near the busiest gate.

2. Parking
Parking Zone A is ${liveStadiumData.parking.zoneA}% occupied, while Zone B is ${liveStadiumData.parking.zoneB}% occupied. Direct incoming vehicles toward ${preferredParking}.

3. Food and Concessions
Food Court A has an estimated wait of ${liveStadiumData.foodQueues.foodCourtA} minutes, while Food Court B has a ${liveStadiumData.foodQueues.foodCourtB}-minute wait. Recommend ${shorterFoodQueue} to visitors.

4. Transport
Metro wait time is approximately ${liveStadiumData.transport.metroWait} minutes and bus wait time is ${liveStadiumData.transport.busWait} minutes.

5. Safety
${safetyStatus} Current medical requests: ${liveStadiumData.safety.medicalRequests}.

6. Sustainability
The recycling rate is ${liveStadiumData.sustainability.recyclingRate}%, with ${liveStadiumData.sustainability.publicTransportUsage}% of visitors using public transport.

7. Priority Recommendation
Reduce congestion at ${highestCrowdGate} and guide visitors toward lower-occupancy parking and food areas.
    `.trim();

}



async function generateInsights() {

    if (!insightContainer) return;

    updateLiveData();

    showLoading();

    const button =
    typeof document !== "undefined"
        ? document.getElementById(
            "generateInsightsButton"
        )
        : null;

    if (button) {

        button.disabled = true;
        button.textContent =
            "Generating Insights...";

    }

    try {

        const response = await fetch(getApiUrl(), {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                message: buildInsightPrompt(),

                originalMessage:
                    "Generate an AI stadium operations insight report from the provided live data.",

                language: "English"

            })

        });

        if (!response.ok) {

            throw new Error(
                `Server Error (${response.status})`
            );

        }

        const data = await response.json();

        const reply =
            data.reply ||
            data.message;

        if (!reply) {

            throw new Error(
                "The server returned an empty response."
            );

        }

        displayInsights(reply);

    }

    catch (error) {

        console.error(
            "Insights Error:",
            error
        );

        const fallbackReport =
            generateFallbackInsights();

        displayInsights(fallbackReport);

    }

    finally {

        if (button) {

            button.disabled = false;
            button.textContent =
                "Generate AI Insights";

        }

    }

}


function initializeInsightsPage() {

    if (!insightContainer) return;

    insightContainer.innerHTML = `
        <section class="insight-welcome">

            <h2>
                📊 Ready to Analyse Stadium Operations
            </h2>

            <p>
                Generate an AI report using simulated live data from
                crowd, parking, food, transport, safety and sustainability.
            </p>

            <div class="insight-preview">

                <span>👥 Crowd Density</span>
                <span>🚗 Parking</span>
                <span>🍔 Food Queues</span>
                <span>🚇 Transport</span>
                <span>🚨 Safety</span>
                <span>🌱 Sustainability</span>

            </div>

        </section>
    `;

    const generateButton =
        document.getElementById("generateInsightsButton");

    generateButton?.addEventListener(
        "click",
        generateInsights
    );

}

if (typeof document !== "undefined") {

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initializeInsightsPage
        );

    } else {

        initializeInsightsPage();

    }

}


if (typeof window !== "undefined") {

    window.generateInsights =
        generateInsights;

}


if (
    typeof module !== "undefined" &&
    module.exports
) {

    module.exports = {

        liveStadiumData,
        randomNumber,
        getApiUrl,
        updateLiveData,
        buildInsightPrompt,
        escapeHtml,
        generateFallbackInsights,
        generateInsights,
        initializeInsightsPage

    };

}