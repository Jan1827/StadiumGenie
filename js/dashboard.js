

const weatherList = [
    "☀️ 31°C Sunny",
    "⛅ 29°C Partly Cloudy",
    "🌦 27°C Light Rain",
    "🌤 30°C Clear Sky",
    "🌥 28°C Cloudy"
];

const crowdList = [
    "🟢 Low",
    "🟡 Moderate",
    "🔴 Heavy"
];



function getWeatherElement() {
    return (typeof document !== "undefined")
        ? document.getElementById("weatherText")
        : null;
}

function getCrowdElement() {
    return (typeof document !== "undefined")
        ? document.getElementById("crowdText")
        : null;
}

function getDateElement() {
    return (typeof document !== "undefined")
        ? document.getElementById("currentDate")
        : null;
}

function getTimeElement() {
    return (typeof document !== "undefined")
        ? document.getElementById("currentTime")
        : null;
}



function updateWeather() {

    const weatherElement = getWeatherElement();

    if (!weatherElement) return;

    const randomIndex = Math.floor(Math.random() * weatherList.length);

    weatherElement.textContent = weatherList[randomIndex];

}


function updateCrowd() {

    const crowdElement = getCrowdElement();

    if (!crowdElement) return;

    const randomIndex = Math.floor(Math.random() * crowdList.length);

    crowdElement.textContent = crowdList[randomIndex];

}


function updateDateTime() {

    const dateElement = getDateElement();
    const timeElement = getTimeElement();

    const now = new Date();

    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString();
    }

    if (timeElement) {
        timeElement.textContent = now.toLocaleTimeString();
    }

}


if (typeof document !== "undefined") {

    updateWeather();
    updateCrowd();
    updateDateTime();

    setInterval(updateWeather, 10000);
    setInterval(updateCrowd, 12000);
    setInterval(updateDateTime, 1000);

}


if (typeof module !== "undefined") {
    module.exports = {
        updateWeather,
        updateCrowd,
        updateDateTime
    };
}