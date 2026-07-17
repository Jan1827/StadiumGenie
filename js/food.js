// ===============================
// Restaurant Data
// ===============================

const restaurants = {

    A: {
        title: "🍔 Food Court A",
        image: "images/food.jpg",
        info: `
            <b>📍 Location:</b> Near Gate 2<br><br>

            ⭐ Rating: 4.8 / 5<br>

            ⏱ Waiting Time: 5 Minutes<br>

            💰 Price Range: ₹₹<br><br>

            <b>🍽 Menu</b><br><br>

            🍔 Veg Burger - ₹180<br>
            🍟 French Fries - ₹120<br>
            🌮 Veg Wrap - ₹150<br>
            🥤 Cold Drink - ₹80<br>
            🍦 Ice Cream - ₹100
        `
    },

    B: {
        title: "🍕 Food Court B",
        image: "images/food.jpg",
        info: `
            <b>📍 Location:</b> Near Gate 4<br><br>

            ⭐ Rating: 4.7 / 5<br>

            ⏱ Waiting Time: 8 Minutes<br>

            💰 Price Range: ₹₹₹<br><br>

            <b>🍽 Menu</b><br><br>

            🍕 Margherita Pizza - ₹250<br>
            🍕 Farmhouse Pizza - ₹350<br>
            🍝 White Sauce Pasta - ₹280<br>
            🥤 Soft Drink - ₹90<br>
            🍰 Brownie - ₹180
        `
    },

    Cafe: {
        title: "☕ Café Corner",
        image: "images/food.jpg",
        info: `
            <b>📍 Location:</b> Main Plaza<br><br>

            ⭐ Rating: 4.5 / 5<br>

            ⏱ Waiting Time: 2 Minutes<br>

            💰 Price Range: ₹<br><br>

            <b>🍽 Menu</b><br><br>

            ☕ Cappuccino - ₹150<br>
            ☕ Latte - ₹170<br>
            🥐 Croissant - ₹120<br>
            🍰 Chocolate Cake - ₹200<br>
            🥪 Sandwich - ₹140
        `
    }

};

// ===============================
// Cached Element
// ===============================

const menuBox = document.getElementById("menuBox");

// ===============================
// Show Restaurant Menu
// ===============================

function showMenu(place) {

    const data = restaurants[place];

    if (!data || !menuBox) return;

    menuBox.innerHTML = `
        <img
            src="${data.image}"
            class="info-image"
            alt="${data.title}">

        <h2>${data.title}</h2>

        <p>${data.info}</p>

        <button onclick="navigateFood('${data.title}')">
            🧭 Navigate
        </button>
    `;

}

// ===============================
// Navigation
// ===============================

function navigateFood(location) {

    if (!menuBox) return;

    menuBox.innerHTML = `
        <img
            src="images/food.jpg"
            class="info-image"
            alt="Restaurant Navigation">

        <h2>🧭 Navigation</h2>

        <p>

            <strong>Destination:</strong> ${location}

            <br><br>

            📏 Distance: 180 meters

            <br>

            🚶 Walking Time: 3 Minutes

            <br>

            ➜ Follow the stadium signs to reach your destination.

            <br><br>

            ✅ Route is clear.

        </p>

        <button onclick="refreshRestaurants()">
            🔄 Refresh Status
        </button>
    `;

}

// ===============================
// Refresh Restaurant Status
// ===============================

function refreshRestaurants() {

    const messages = [

        "🍔 Restaurant status updated successfully.",

        "🟢 All food courts are currently open.",

        "☕ Waiting times have been refreshed.",

        "✅ Live restaurant information updated."

    ];

    const randomIndex = Math.floor(Math.random() * messages.length);

    alert(messages[randomIndex]);

}

// ===============================
// Export for Jest
// ===============================

if (typeof module !== "undefined") {

    module.exports = {
        showMenu,
        navigateFood,
        refreshRestaurants
    };

}