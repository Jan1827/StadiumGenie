

const weatherList = [

    "☀️ 31°C Sunny",

    "⛅ 29°C Partly Cloudy",

    "🌦 27°C Light Rain",

    "🌤 30°C Clear Sky",

    "🌥 28°C Cloudy"

];

function updateWeather(){

    const random =
        Math.floor(Math.random()*weatherList.length);

    document.getElementById("weatherText").innerHTML =
        weatherList[random];

}

updateWeather();

setInterval(updateWeather,10000);


// ============================
// Crowd Status
// ============================

const crowdList=[

"🟢 Low",

"🟡 Moderate",

"🔴 Heavy"

];

function updateCrowd(){

const random=Math.floor(Math.random()*crowdList.length);

document.getElementById("crowdText").innerHTML=
crowdList[random];

}

updateCrowd();

setInterval(updateCrowd,12000);