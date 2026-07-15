// ===========================
// Stadium Location Data
// ===========================

const locations = {

    "Gate 1": {
        title: "🚪 Gate 1",
        image: "images/gate.jpg",
        info: `
            <b>Main Entrance</b><br><br>
            ✔ Ticket Verification<br>
            ♿ Wheelchair Accessible<br>
            🚇 2 Minutes from Metro Station<br>
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

    "Medical": {
        title: "🏥 Medical Center",
        image: "images/hospital.jpg",
        info: `
            <b>Medical Center</b><br><br>
            🚑 Emergency Services 24×7<br>
            👨‍⚕ Doctors Available<br>
            🩹 First Aid Center
        `
    },

    "Metro": {
        title: "🚇 Metro Station",
        image: "images/metro.jpg",
        info: `
            <b>Metro Station</b><br><br>
            🚇 Direct Stadium Route<br>
            🚶 5 Minutes Walking Distance
        `
    }

};

// ===========================
// Show Location Information
// ===========================

function showInfo(location) {

    const data = locations[location];

    // Prevent errors if the location name is wrong
    if (!data) {

        document.getElementById("infoBox").innerHTML = `
            <h2>❌ Location Not Found</h2>
            <p>Please select a valid stadium location.</p>
        `;

        console.error("Location not found:", location);
        return;
    }

    document.getElementById("infoBox").innerHTML = `
        <img src="${data.image}" class="info-image" alt="${data.title}">
        <h2>${data.title}</h2>
        <p>${data.info}</p>
    `;
}