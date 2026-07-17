const locations = {
    "Gate 1": {
        title: "🚪 Gate 1",
        image: "images/gate.jpg",
        info: `
            <b>Main Entrance</b><br><br>
            ✔ Ticket Verification<br>
            ♿ Wheelchair Accessible<br>
            🚇 Near Metro Station<br>
            🅿 Parking Zone A Nearby
        `
    },

    "Gate 2": {
        title: "⭐ Gate 2",
        image: "images/gate.jpg",
        info: `
            <b>VIP Entrance</b><br><br>
            🎟 Premium Ticket Holders<br>
            🍔 Food Court A Nearby<br>
            🚻 Restrooms Available
        `
    },

    "Gate 3": {
        title: "🚪 Gate 3",
        image: "images/gate.jpg",
        info: `
            <b>East Entrance</b><br><br>
            🚑 Medical Center Nearby<br>
            ♿ Accessible Entrance
        `
    },

    "Gate 4": {
        title: "🚪 Gate 4",
        image: "images/gate.jpg",
        info: `
            <b>West Entrance</b><br><br>
            🍕 Food Court B Nearby<br>
            🚻 Washrooms Available
        `
    },

    "Parking A": {
        title: "🚗 Parking Zone A",
        image: "images/parking.jpg",
        info: `
            <b>Parking Zone A</b><br><br>
            🅿 120 Parking Spaces Available<br>
            ⏰ Open 24 Hours<br>
            🚶 Closest to Gate 1
        `
    },

    "Parking B": {
        title: "🚗 Parking Zone B",
        image: "images/parking.jpg",
        info: `
            <b>Parking Zone B</b><br><br>
            🅿 65 Parking Spaces Available<br>
            🚶 Closest to Gate 4
        `
    },

    "Food Court A": {
        title: "🍔 Food Court A",
        image: "images/food.jpg",
        info: `
            <b>Food Court A</b><br><br>
            🍔 Fast Food<br>
            ☕ Coffee Shop<br>
            🥤 Cold Drinks
        `
    },

    "Food Court B": {
        title: "🍕 Food Court B",
        image: "images/food.jpg",
        info: `
            <b>Food Court B</b><br><br>
            🍕 Pizza<br>
            🍟 Snacks<br>
            🍦 Ice Cream
        `
    },

    Medical: {
        title: "🏥 Medical Center",
        image: "images/hospital.jpg",
        info: `
            <b>Medical Center</b><br><br>
            🚑 Emergency Services 24×7<br>
            👨‍⚕ Doctors Available<br>
            🩹 First Aid Center
        `
    },

    Metro: {
        title: "🚇 Metro Station",
        image: "images/metro.jpg",
        info: `
            <b>Metro Station</b><br><br>
            🚇 Direct Stadium Route<br>
            🚶 5 Minutes Walking Distance
        `
    }
};

/* ==================================================
   Simulated Live Crowd Data
================================================== */

const crowdData = {
    gate1: 42,
    gate2: 68,
    gate3: 84,
    gate4: 55
};

let countdown = 10;
let countdownTimer = null;
let crowdUpdateTimer = null;

/* ==================================================
   Utility Functions
================================================== */

function getElement(id) {
    if (typeof document === "undefined") {
        return null;
    }

    return document.getElementById(id);
}

function randomNumber(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}

function getCrowdStatus(value) {
    if (value < 45) {
        return {
            label: "Low",
            className: "status-low",
            recommendation:
                "Recommended for quick entry."
        };
    }

    if (value < 70) {
        return {
            label: "Moderate",
            className: "status-moderate",
            recommendation:
                "Entry conditions are currently stable."
        };
    }

    if (value < 85) {
        return {
            label: "High",
            className: "status-high",
            recommendation:
                "Consider using another entrance."
        };
    }

    return {
        label: "Critical",
        className: "status-critical",
        recommendation:
            "Avoid this gate and use a less crowded entrance."
    };
}

function formatGateName(key) {
    return key.replace("gate", "Gate ");
}

/* ==================================================
   Location Information
================================================== */

function getInfoBox() {
    return getElement("infoBox");
}

function showInfo(location) {
    const data = locations[location];
    const infoBox = getInfoBox();

    if (!data || !infoBox) {
        if (infoBox) {
            infoBox.innerHTML = `
                <h2>❌ Location Not Found</h2>
                <p>Please select a valid stadium location.</p>
            `;
        }

        console.error(`Location not found: ${location}`);
        return;
    }

    let crowdInformation = "";

    if (location.startsWith("Gate")) {
        const gateKey =
            location.toLowerCase().replace(" ", "");

        const crowdValue = crowdData[gateKey];
        const crowdStatus =
            getCrowdStatus(crowdValue);

        crowdInformation = `
            <div class="info-crowd-status">
                <strong>Live Crowd Density:</strong>
                ${crowdValue}% — ${crowdStatus.label}
                <br><br>
                ${crowdStatus.recommendation}
            </div>
            <br>
        `;
    }

    infoBox.innerHTML = `
        <img
            src="${data.image}"
            class="info-image"
            alt="${data.title}"
        >

        <h2>${data.title}</h2>

        <p>
            ${crowdInformation}
            ${data.info}
        </p>
    `;
}

/* ==================================================
   Crowd Data Updates
================================================== */

function updateCrowdData() {
    crowdData.gate1 = randomNumber(30, 62);
    crowdData.gate2 = randomNumber(48, 78);
    crowdData.gate3 = randomNumber(68, 96);
    crowdData.gate4 = randomNumber(38, 75);

    updateCrowdInterface();

    countdown = 10;
}

function updateGateInterface(gateKey) {
    const value = crowdData[gateKey];
    const status = getCrowdStatus(value);
    const number = gateKey.replace("gate", "");

    const valueElement =
        getElement(`${gateKey}Value`);

    const markerValue =
        getElement(`${gateKey}MarkerValue`);

    const statusElement =
        getElement(`${gateKey}Status`);

    const progressElement =
        getElement(`${gateKey}Progress`);

    const recommendationElement =
        getElement(`${gateKey}Recommendation`);

    const crowdCard =
        getElement(`${gateKey}CrowdCard`);

    const marker =
        getElement(`${gateKey}Marker`);

    if (valueElement) {
        valueElement.textContent = `${value}%`;
    }

    if (markerValue) {
        markerValue.textContent = `${value}%`;
    }

    if (statusElement) {
        statusElement.textContent = status.label;
    }

    if (progressElement) {
        progressElement.style.width = `${value}%`;

        progressElement.parentElement?.setAttribute(
            "aria-valuenow",
            String(value)
        );
    }

    if (recommendationElement) {
        recommendationElement.textContent =
            status.recommendation;
    }

    if (crowdCard) {
        crowdCard.classList.remove(
            "status-low",
            "status-moderate",
            "status-high",
            "status-critical",
            "recommended-gate"
        );

        crowdCard.classList.add(status.className);
    }

    if (marker) {
        marker.classList.remove(
            "status-low",
            "status-moderate",
            "status-high",
            "status-critical"
        );

        marker.classList.add(status.className);

        marker.setAttribute(
            "aria-label",
            `Gate ${number}, ${value}% crowd density, ${status.label}`
        );
    }
}

function updateCrowdInterface() {
    Object.keys(crowdData).forEach(
        updateGateInterface
    );

    const crowdEntries =
        Object.entries(crowdData);

    const totalCrowd =
        crowdEntries.reduce(
            (total, entry) => total + entry[1],
            0
        );

    const averageCrowd =
        Math.round(totalCrowd / crowdEntries.length);

    const lowestEntry =
        [...crowdEntries].sort(
            (a, b) => a[1] - b[1]
        )[0];

    const highestEntry =
        [...crowdEntries].sort(
            (a, b) => b[1] - a[1]
        )[0];

    const recommendedGate =
        formatGateName(lowestEntry[0]);

    const highestGate =
        formatGateName(highestEntry[0]);

    const averageElement =
        getElement("averageCrowd");

    const recommendedElement =
        getElement("recommendedGate");

    const highestElement =
        getElement("highestCongestion");

    if (averageElement) {
        averageElement.textContent =
            `${averageCrowd}%`;
    }

    if (recommendedElement) {
        recommendedElement.textContent =
            recommendedGate;
    }

    if (highestElement) {
        highestElement.textContent =
            `${highestGate} (${highestEntry[1]}%)`;
    }

    const recommendedCard =
        getElement(`${lowestEntry[0]}CrowdCard`);

    recommendedCard?.classList.add(
        "recommended-gate"
    );

    updateAlert(
        highestGate,
        highestEntry[1],
        recommendedGate
    );

    updatePrediction(
        highestGate,
        highestEntry[1],
        recommendedGate
    );

    updateLastUpdatedTime();
}

function updateAlert(
    highestGate,
    highestValue,
    recommendedGate
) {
    const alertBox =
        getElement("crowdAlert");

    const alertTitle =
        getElement("alertTitle");

    const alertMessage =
        getElement("alertMessage");

    const alertIcon =
        alertBox?.querySelector(".alert-icon");

    if (
        !alertBox ||
        !alertTitle ||
        !alertMessage
    ) {
        return;
    }

    alertBox.classList.remove(
        "alert-safe",
        "alert-warning",
        "alert-critical"
    );

    if (highestValue >= 85) {
        alertBox.classList.add(
            "alert-critical"
        );

        alertTitle.textContent =
            `Critical Congestion at ${highestGate}`;

        alertMessage.textContent =
            `${highestGate} is ${highestValue}% crowded. Visitors should use ${recommendedGate} for faster and safer entry.`;

        if (alertIcon) {
            alertIcon.textContent = "🚨";
        }

        return;
    }

    if (highestValue >= 70) {
        alertBox.classList.add(
            "alert-warning"
        );

        alertTitle.textContent =
            `High Crowd Level at ${highestGate}`;

        alertMessage.textContent =
            `${highestGate} is becoming congested. ${recommendedGate} currently has the lowest crowd density.`;

        if (alertIcon) {
            alertIcon.textContent = "⚠️";
        }

        return;
    }

    alertBox.classList.add("alert-safe");

    alertTitle.textContent =
        "Crowd Conditions Stable";

    alertMessage.textContent =
        `All entrances are operating normally. ${recommendedGate} is currently the fastest entrance.`;

    if (alertIcon) {
        alertIcon.textContent = "✅";
    }
}

function updatePrediction(
    highestGate,
    highestValue,
    recommendedGate
) {
    const messageElement =
        getElement("predictionMessage");

    const confidenceElement =
        getElement("predictionConfidence");

    if (
        !messageElement ||
        !confidenceElement
    ) {
        return;
    }

    let confidence;
    let predictionMessage;

    if (highestValue >= 85) {
        confidence = randomNumber(88, 96);

        predictionMessage =
            `${highestGate} may remain critically congested during the next 15 minutes. Redirect incoming visitors toward ${recommendedGate} and deploy additional crowd-control staff.`;
    } else if (highestValue >= 70) {
        confidence = randomNumber(80, 90);

        predictionMessage =
            `${highestGate} may reach critical capacity within the next 15 minutes. Early redirection toward ${recommendedGate} is recommended.`;
    } else {
        confidence = randomNumber(72, 84);

        predictionMessage =
            `Crowd movement is currently stable. ${recommendedGate} is predicted to remain the fastest entrance during the next 15 minutes.`;
    }

    messageElement.textContent =
        predictionMessage;

    confidenceElement.textContent =
        `${confidence}%`;
}

function updateLastUpdatedTime() {
    const lastUpdatedElement =
        getElement("lastUpdated");

    if (!lastUpdatedElement) {
        return;
    }

    const currentTime =
        new Date().toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );

    lastUpdatedElement.textContent =
        `Updated at ${currentTime}`;
}

/* ==================================================
   Countdown
================================================== */

function updateCountdown() {
    const countdownElement =
        getElement("updateCountdown");

    if (!countdownElement) {
        return;
    }

    countdownElement.textContent =
        countdown === 1
            ? "1 second"
            : `${countdown} seconds`;

    countdown -= 1;

    if (countdown < 1) {
        countdown = 10;
    }
}

/* ==================================================
   Event Listeners
================================================== */

function addLocationListeners() {
    if (typeof document === "undefined") {
        return;
    }

    const locationCards =
        document.querySelectorAll(
            ".location-card[data-location]"
        );

    const heatmapMarkers =
        document.querySelectorAll(
            ".heatmap-marker[data-location]"
        );

    locationCards.forEach((card) => {
        const location =
            card.dataset.location;

        card.addEventListener(
            "click",
            () => showInfo(location)
        );

        card.addEventListener(
            "keydown",
            (event) => {
                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {
                    event.preventDefault();
                    showInfo(location);
                }
            }
        );
    });

    heatmapMarkers.forEach((marker) => {
        const location =
            marker.dataset.location;

        marker.addEventListener(
            "click",
            () => showInfo(location)
        );
    });
}
/* ==================================================
   AI Route Optimizer
================================================== */

const routeNetwork = {

    Metro: {
        "Gate 1": 4,
        "Gate 2": 5,
        "Gate 3": 6,
        "Gate 4": 5
    },

    "Parking A": {
        "Gate 1": 2,
        "Gate 2": 4
    },

    "Parking B": {
        "Gate 4": 2,
        "Gate 3": 3
    },

    "Gate 1": {
        "Food Court A": 2,
        Medical: 3,
        Metro: 4
    },

    "Gate 2": {
        "Food Court A": 1,
        Medical: 2,
        Metro: 5
    },

    "Gate 3": {
        Medical: 1,
        "Food Court B": 2
    },

    "Gate 4": {
        "Food Court B": 1,
        Metro: 5
    }

};

function getGateCrowd(location){

    if(location==="Gate 1") return crowdData.gate1;
    if(location==="Gate 2") return crowdData.gate2;
    if(location==="Gate 3") return crowdData.gate3;
    if(location==="Gate 4") return crowdData.gate4;

    return 0;

}

function chooseBestGate(priority){

    const gates=[

        {name:"Gate 1",crowd:crowdData.gate1},
        {name:"Gate 2",crowd:crowdData.gate2},
        {name:"Gate 3",crowd:crowdData.gate3},
        {name:"Gate 4",crowd:crowdData.gate4}

    ];

    if(priority==="least-crowded"){

        gates.sort((a,b)=>a.crowd-b.crowd);

        return gates[0];

    }

    if(priority==="accessible"){

        return gates.find(
            g=>g.name==="Gate 1"
        );

    }

    gates.sort((a,b)=>a.crowd-b.crowd);

    return gates[0];

}

/* ==================================================
   Route Calculation and Result Display
================================================== */

function getRouteCrowdLevel(crowdValue) {
    return getCrowdStatus(crowdValue);
}

function createRouteSteps(start, destination, priority) {
    const destinationIsGate = destination.startsWith("Gate");
    const startIsGate = start.startsWith("Gate");

    if (start === destination) {
        return [start];
    }

    if (startIsGate || destinationIsGate) {
        return [start, destination];
    }

    const bestGate = chooseBestGate(priority);

    return [
        start,
        bestGate.name,
        destination
    ];
}

function calculateRouteDistance(routeSteps) {
    const segmentCount = Math.max(
        routeSteps.length - 1,
        1
    );

    return segmentCount * 180 + randomNumber(40, 120);
}

function calculateRouteTime(distance, crowdValue, priority) {
    const walkingTime = distance / 75;
    const crowdDelay = crowdValue / 30;

    let priorityAdjustment = 0;

    if (priority === "least-crowded") {
        priorityAdjustment = -1;
    }

    if (priority === "accessible") {
        priorityAdjustment = 1;
    }

    return Math.max(
        2,
        Math.round(
            walkingTime +
            crowdDelay +
            priorityAdjustment
        )
    );
}

function getRouteGate(routeSteps) {
    return routeSteps.find((step) =>
        step.startsWith("Gate")
    );
}

function createRouteExplanation({
    gate,
    crowdValue,
    crowdStatus,
    priority,
    avoidCrowds,
    timeSaved
}) {
    const priorityText = {
        fastest:
            "The route was selected to minimize total walking and waiting time.",

        "least-crowded":
            "The route was selected using the entrance with the lowest live crowd density.",

        accessible:
            "The route prioritizes accessible entrances and safer movement areas."
    };

    let explanation =
        `${priorityText[priority]} `;

    if (gate) {
        explanation +=
            `${gate} currently has ${crowdValue}% crowd density, classified as ${crowdStatus.label.toLowerCase()}. `;
    }

    if (avoidCrowds) {
        explanation +=
            "Highly congested areas were avoided wherever possible. ";
    }

    explanation +=
        `The recommended route may save approximately ${timeSaved} minute${timeSaved === 1 ? "" : "s"} compared with a congested alternative.`;

    return explanation;
}

function displayRouteResult(routeData) {
    const routeResult =
        getElement("routeResult");

    const routeTitle =
        getElement("routeTitle");

    const routeSteps =
        getElement("routeSteps");

    const routeTime =
        getElement("routeTime");

    const routeDistance =
        getElement("routeDistance");

    const routeCrowd =
        getElement("routeCrowd");

    const routeSavings =
        getElement("routeSavings");

    const routeExplanation =
        getElement("routeExplanation");

    const routeStatusBadge =
        getElement("routeStatusBadge");

    if (
        !routeResult ||
        !routeTitle ||
        !routeSteps
    ) {
        return;
    }

    routeResult.classList.remove(
        "route-result-hidden"
    );

    routeTitle.textContent =
        `${routeData.start} to ${routeData.destination}`;

    routeSteps.innerHTML =
        routeData.steps
            .map((step, index) => {
                const arrow =
                    index <
                    routeData.steps.length - 1
                        ? `
                            <span
                                class="route-step-arrow"
                                aria-hidden="true"
                            >
                                →
                            </span>
                        `
                        : "";

                return `
                    <div class="route-step">
                        <span class="route-step-location">
                            ${step}
                        </span>

                        ${arrow}
                    </div>
                `;
            })
            .join("");

    if (routeTime) {
        routeTime.textContent =
            `${routeData.time} min`;
    }

    if (routeDistance) {
        routeDistance.textContent =
            `${routeData.distance} m`;
    }

    if (routeCrowd) {
        routeCrowd.textContent =
            routeData.crowdStatus.label;
    }

    if (routeSavings) {
        routeSavings.textContent =
            `${routeData.timeSaved} min`;
    }

    if (routeExplanation) {
        routeExplanation.textContent =
            routeData.explanation;
    }

    if (routeStatusBadge) {
        routeStatusBadge.textContent =
            `${routeData.crowdStatus.label} Crowd`;

        routeStatusBadge.classList.remove(
            "status-low",
            "status-moderate",
            "status-high",
            "status-critical"
        );

        routeStatusBadge.classList.add(
            routeData.crowdStatus.className
        );
    }

    routeResult.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}

function showRouteError(message) {
    const routeResult =
        getElement("routeResult");

    if (!routeResult) {
        return;
    }

    routeResult.classList.remove(
        "route-result-hidden"
    );

    routeResult.innerHTML = `
        <div class="route-error">
            ❌ ${message}
        </div>
    `;
}

function calculateOptimizedRoute(
    start,
    destination,
    priority,
    avoidCrowds
) {
    if (!start || !destination) {
        throw new Error(
            "Please select both a starting location and destination."
        );
    }

    if (start === destination) {
        throw new Error(
            "Starting location and destination cannot be the same."
        );
    }

    const steps =
        createRouteSteps(
            start,
            destination,
            priority
        );

    const gate =
        getRouteGate(steps);

    const crowdValue =
        gate
            ? getGateCrowd(gate)
            : Math.round(
                Object.values(crowdData).reduce(
                    (total, value) =>
                        total + value,
                    0
                ) /
                Object.values(crowdData).length
            );

    const crowdStatus =
        getRouteCrowdLevel(crowdValue);

    const distance =
        calculateRouteDistance(steps);

    const time =
        calculateRouteTime(
            distance,
            crowdValue,
            priority
        );

    const congestedAlternativeTime =
        time +
        Math.max(
            1,
            Math.round(crowdValue / 25)
        );

    const timeSaved =
        congestedAlternativeTime - time;

    return {
        start,
        destination,
        priority,
        avoidCrowds,
        steps,
        gate,
        crowdValue,
        crowdStatus,
        distance,
        time,
        timeSaved,
        explanation:
            createRouteExplanation({
                gate,
                crowdValue,
                crowdStatus,
                priority,
                avoidCrowds,
                timeSaved
            })
    };
}

function handleRouteOptimization(event) {
    event.preventDefault();

    const startElement =
        getElement("startLocation");

    const destinationElement =
        getElement("destinationLocation");

    const priorityElement =
        getElement("routePriority");

    const avoidCrowdsElement =
        getElement("avoidCrowds");

    const submitButton =
        document.querySelector(
            ".optimize-route-btn"
        );

    if (
        !startElement ||
        !destinationElement ||
        !priorityElement
    ) {
        return;
    }

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent =
            "🧠 Analysing Live Crowd Data...";
    }

    window.setTimeout(() => {
        try {
            const routeData =
                calculateOptimizedRoute(
                    startElement.value,
                    destinationElement.value,
                    priorityElement.value,
                    Boolean(
                        avoidCrowdsElement?.checked
                    )
                );

            displayRouteResult(routeData);
        } catch (error) {
            showRouteError(error.message);
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent =
                    "🧠 Optimize My Route";
            }
        }
    }, 700);
}

function addRouteOptimizerListener() {
    const form =
        getElement("routeOptimizerForm");

    if (!form) {
        return;
    }

    form.addEventListener(
        "submit",
        handleRouteOptimization
    );
}
/* ==================================================
   Initialization
================================================== */

function initializeMapPage() {
    addLocationListeners();
    addRouteOptimizerListener();

    updateCrowdInterface();
    updateCountdown();

    countdownTimer = setInterval(
        updateCountdown,
        1000
    );

    crowdUpdateTimer = setInterval(
        updateCrowdData,
        10000
    );
}

if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeMapPage
        );
    } else {
        initializeMapPage();
    }
}

if (typeof window !== "undefined") {
    window.showInfo = showInfo;
}

/* ==================================================
   Jest Exports
================================================== */

if (
    typeof module !== "undefined" &&
    module.exports
) {
    module.exports = {
        locations,
        crowdData,
        getGateCrowd,
chooseBestGate,
createRouteSteps,
calculateRouteDistance,
calculateRouteTime,
calculateOptimizedRoute,
displayRouteResult,
handleRouteOptimization,
addRouteOptimizerListener,
        randomNumber,
        getCrowdStatus,
        formatGateName,
        showInfo,
        updateCrowdData,
        updateGateInterface,
        updateCrowdInterface,
        updateAlert,
        updatePrediction,
        initializeMapPage
    };
}