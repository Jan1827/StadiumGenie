// ===========================
// Parking Information
// ===========================

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
// Cached DOM Element
// ===========================

const infoBox = document.getElementById("infoBox");

// ===========================
// Show Parking Details
// ===========================

function showDetails(zone) {

    const data = parkingData[zone];

    if (!data || !infoBox) return;

    infoBox.innerHTML = `
        <img
            src="${data.image}"
            class="info-image"
            alt="${data.title}">

        <h2>${data.title}</h2>

        <p>${data.info}</p>

        <button onclick="navigateTo('${zone}')">
            🧭 Navigate Here
        </button>
    `;

}

// ===========================
// Navigation
// ===========================

function navigateTo(zone) {

    alert(
        `🧭 Navigation started to ${zone}.\n\nEstimated arrival: 5–10 minutes.`
    );

}

// ===========================
// Refresh Parking Status
// ===========================

function refreshParking() {

    const messages = [
        "🟢 Parking status updated successfully.",
        "🚗 Live parking data refreshed.",
        "✅ All parking information is up to date."
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);

    alert(messages[randomIndex]);

}

// ===========================
// Export for Jest Testing
// ===========================

if (typeof module !== "undefined") {
    module.exports = {
        showDetails,
        navigateTo,
        refreshParking
    };
}