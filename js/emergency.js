const emergencyData = {

    "medical":{

        title:"🏥 Medical Center",

        image:"images/hospital.jpg",

        info:`
        <b>📍 Location:</b> Beside Gate 3<br><br>

        👨‍⚕ Doctors Available: 5<br>

        🚑 Ambulances Ready: 2<br>

        🏥 ICU Beds Available: 8<br>

        💊 First Aid Available<br>

        🕒 Open 24 × 7
        `
    },

    "exit":{

        title:"🚪 Emergency Exit",

        image:"images/gate.jpg",

        info:`
        <b>📍 Nearest Exit:</b> Gate 2<br><br>

        📏 Distance: 120 meters<br>

        🚶 Walking Time: 2 Minutes<br>

        ⚡ Fastest Evacuation Route<br>

        ♿ Wheelchair Accessible
        `
    },

    "help":{

        title:"☎ Emergency Help Desk",

        image:"images/hospital.jpg",

        info:`
        <b>📞 Emergency Number:</b> +91 1800 123 456<br><br>

        🕒 Available 24 × 7<br>

        ⚡ Average Response Time: Under 2 Minutes<br>

        👮 Security Staff Always Available<br>

        🚑 Emergency Coordination Center
        `
    }

};

// =====================================
// Show Emergency Details
// =====================================

function showEmergency(type){

    const data = emergencyData[type];

    document.getElementById("emergencyBox").innerHTML = `

        <img src="${data.image}" class="info-image">

        <h2>${data.title}</h2>

        <p>${data.info}</p>

        <button onclick="navigateEmergency('${data.title}')">

            🧭 Navigate

        </button>

    `;

}

// =====================================
// Navigation
// =====================================

function navigateEmergency(destination){

    document.getElementById("emergencyBox").innerHTML = `

        <img src="images/gate.jpg" class="info-image">

        <h2>🧭 Emergency Navigation</h2>

        <p>

        <strong>Destination:</strong> ${destination}

        <br><br>

        📏 Distance: 150 meters

        <br>

        🚶 Estimated Walking Time: 2 Minutes

        <br>

        ➜ Follow the emergency signs to reach your destination safely.

        <br><br>

        ✅ Route is clear.

        </p>

        <button onclick="refreshEmergency()">

            🔄 Refresh Status

        </button>

    `;

}

// =====================================
// Emergency Call (Demo)
// =====================================

function callHelp(){

    alert(
`📞 Calling Emergency Help Desk...

Demo Mode Only

Emergency Number:
+91 1800 123 456

Medical and Security teams have been notified.`
    );

}

// =====================================
// Refresh Status
// =====================================

function refreshEmergency(){

    const messages = [

        "🟢 All emergency services are operational.",

        "🚑 Medical team is on standby.",

        "👮 Security personnel are active across the stadium.",

        "✅ Emergency status updated successfully."

    ];

    const random = Math.floor(Math.random() * messages.length);

    alert(messages[random]);

}