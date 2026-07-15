const matches = {

    "india":{

        title:"🇮🇳 India vs 🇧🇷 Brazil",

        image:"images/stadium.jpg",

        info:`
        <b>📍 Venue:</b> Demo Stadium<br><br>

        🕢 Kickoff: 7:30 PM<br>

        🌤 Weather: 29°C Sunny<br>

        👥 Crowd: Moderate<br>

        🎫 Tickets: Available<br>

        ⏳ Countdown: 2 Hours 15 Minutes<br>

        🏆 Group Stage Match
        `
    },

    "argentina":{

        title:"🇦🇷 Argentina vs 🇫🇷 France",

        image:"images/stadium.jpg",

        info:`
        <b>📍 Venue:</b> Arena Alpha<br><br>

        🕘 Kickoff: 9:00 PM<br>

        🌤 Weather: 24°C Cloudy<br>

        👥 Crowd: High<br>

        🎫 Tickets: Sold Out<br>

        ⏳ Countdown: 3 Hours 45 Minutes<br>

        🏆 Group Stage Match
        `
    },

    "spain":{

        title:"🇪🇸 Spain vs 🇩🇪 Germany",

        image:"images/stadium.jpg",

        info:`
        <b>📍 Venue:</b> National Arena<br><br>

        🕕 Kickoff: 6:00 PM<br>

        🌤 Weather: 26°C Clear<br>

        👥 Crowd: Low<br>

        🎫 Tickets: Available<br>

        ⏳ Countdown: 1 Hour 10 Minutes<br>

        🏆 Group Stage Match
        `
    }

};

// =====================================
// Show Match Details
// =====================================

function showMatch(team){

    const data = matches[team];

    document.getElementById("matchBox").innerHTML = `

        <img src="${data.image}" class="info-image">

        <h2>${data.title}</h2>

        <p>${data.info}</p>

        <button onclick="navigateMatch('${data.title}')">

            🧭 Navigate to Stadium

        </button>

    `;

}

// =====================================
// Navigate
// =====================================

function navigateMatch(destination){

    document.getElementById("matchBox").innerHTML = `

        <img src="images/stadium.jpg" class="info-image">

        <h2>🧭 Navigation</h2>

        <p>

        <strong>Destination:</strong> ${destination}

        <br><br>

        📏 Distance: 450 meters

        <br>

        🚶 Walking Time: 6 Minutes

        <br>

        🚇 Nearest Metro: Gate 1 Station

        <br>

        🚗 Parking Recommended: Zone A

        <br><br>

        ✅ Route is clear.

        </p>

        <button onclick="refreshMatches()">

            🔄 Refresh Schedule

        </button>

    `;

}

// =====================================
// Refresh Schedule
// =====================================

function refreshMatches(){

    const messages = [

        "⚽ Live match schedule updated successfully.",

        "🟢 No delays reported for today's matches.",

        "🌤 Weather information refreshed.",

        "🎫 Ticket availability updated.",

        "✅ Tournament information is up to date."

    ];

    const random = Math.floor(Math.random() * messages.length);

    alert(messages[random]);

}