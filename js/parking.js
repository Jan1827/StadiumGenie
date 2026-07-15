const parkingData = {

    "Parking Zone A": {

        title: "🅿 Parking Zone A",

        image: "images/parking.jpg",

        info: `
        <b>Status:</b> 🟢 120 Spaces Available <br><br>

        📍 North Entrance <br>
        🚶 5 Minutes Walk to Stadium <br>
        📏 350 Meters Away <br>
        ⚡ Electric Vehicle Charging Available <br>
        🎥 CCTV Surveillance <br>
        ♿ Accessible Parking <br>
        ⭐ Recommended Parking Area
        `
    },

    "Parking Zone B": {

        title: "🅿 Parking Zone B",

        image: "images/parking.jpg",

        info: `
        <b>Status:</b> 🟡 65 Spaces Available <br><br>

        📍 South Entrance <br>
        🚶 8 Minutes Walk <br>
        📏 550 Meters Away <br>
        ⚡ EV Charging Available <br>
        🚻 Restrooms Nearby
        `
    },

    "Parking Zone C": {

        title: "🅿 Parking Zone C",

        image: "images/parking.jpg",

        info: `
        <b>Status:</b> 🔴 Parking Full <br><br>

        📍 East Entrance <br>
        ❌ No Spaces Available <br>
        👉 Please use Parking Zone A instead.
        `
    }

};

// ===========================
// Show Parking Details
// ===========================

function showDetails(zone) {

    const data = parkingData[zone];

    document.getElementById("infoBox").innerHTML = `

        <img src="${data.image}" class="info-image">

        <h2>${data.title}</h2>

        <p>${data.info}</p>

        <button onclick="navigateTo('${zone}')">
            🧭 Navigate Here
        </button>

    `;
}

// ===========================
// Navigation Button
// ===========================

function navigateTo(zone){

    alert("🧭 Navigation started to " + zone + ".\n\nEstimated arrival: 5-10 minutes.");

}

// ===========================
// Refresh Parking Status
// ===========================

function refreshParking(){

    const status = [
        "🟢 Parking status updated successfully.",
        "🚗 Live parking data refreshed.",
        "✅ All parking information is now up to date."
    ];

    const random = Math.floor(Math.random() * status.length);

    alert(status[random]);

}