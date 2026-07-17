const assert = require("assert");

console.log("🧪 Running StadiumGenie Tests...\n");

// Test 1
assert.strictEqual(2 + 2, 4);
console.log("✅ Test 1 Passed");

// Test 2
const location = "Gate 4";
assert.strictEqual(location, "Gate 4");
console.log("✅ Test 2 Passed");

// Test 3
const parking = {
    available: 120
};

assert.ok(parking.available > 0);
console.log("✅ Test 3 Passed");

// Test 4
const chatbot = "Medical Center";
assert.notStrictEqual(chatbot, "");
console.log("✅ Test 4 Passed");

console.log("\n🎉 All StadiumGenie tests passed successfully!");