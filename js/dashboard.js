// ============================
// Weather Status
// ============================

const weatherList = [
    "☀️ 31°C Sunny",
    "⛅ 29°C Partly Cloudy",
    "🌦 27°C Light Rain",
    "🌤 30°C Clear Sky",
    "🌥 28°C Cloudy"
];

const weatherElement = document.getElementById("weatherText");

function updateWeather() {

    if (!weatherElement) return;

    const randomIndex = Math.floor(Math.random() * weatherList.length);

    weatherElement.textContent = weatherList[randomIndex];

}

updateWeather();

setInterval(updateWeather, 10000);


// ============================
// Crowd Status
// ============================

const crowdList = [
    "🟢 Low",
    "🟡 Moderate",
    "🔴 Heavy"
];

const crowdElement = document.getElementById("crowdText");

function updateCrowd() {

    if (!crowdElement) return;

    const randomIndex = Math.floor(Math.random() * crowdList.length);

    crowdElement.textContent = crowdList[randomIndex];

}

updateCrowd();

setInterval(updateCrowd, 12000);


// ============================
// Current Date & Time
// ============================

const dateElement = document.getElementById("currentDate");
const timeElement = document.getElementById("currentTime");

function updateDateTime() {

    const now = new Date();

    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString();
    }

    if (timeElement) {
        timeElement.textContent = now.toLocaleTimeString();
    }

}

updateDateTime();

setInterval(updateDateTime, 1000);