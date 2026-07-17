/**
 * @jest-environment node
 */

const {
    TextEncoder,
    TextDecoder
} = require("util");

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const request = require("supertest");

const {
    app,
    normalizeLanguage,
    normalizeText,
    detectIntent
} = require("../server");


describe("StadiumGenie server", () => {

    test("GET / returns server status", async () => {
        const response = await request(app).get("/");

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            message: "StadiumGenie server is running.",
            status: "online"
        });
    });

    test("POST /chat rejects an empty message", async () => {
        const response = await request(app)
            .post("/chat")
            .send({
                message: "",
                language: "English"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.reply).toBe(
            "Please enter a question."
        );
    });

    test("POST /chat rejects messages longer than 2000 characters", async () => {
        const response = await request(app)
            .post("/chat")
            .send({
                message: "a".repeat(2001),
                language: "English"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.reply).toBe(
            "Message is too long."
        );
    });

    test("POST /chat returns local knowledge for Gate 4", async () => {
        const response = await request(app)
            .post("/chat")
            .send({
                originalMessage: "Where is Gate 4?",
                message: "Where is Gate 4?",
                language: "English"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.source).toBe(
            "local-knowledge"
        );
        expect(response.body.language).toBe("English");
        expect(response.body.reply).toContain("Gate 4");
    });

    test("POST /chat defaults unsupported language to English", async () => {
        const response = await request(app)
            .post("/chat")
            .send({
                originalMessage: "Where is the restroom?",
                message: "Where is the restroom?",
                language: "German"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.language).toBe("English");
        expect(response.body.reply).toContain("Restroom");
    });
});

describe("StadiumGenie utility functions", () => {

    test("normalizeLanguage returns supported language", () => {
        expect(normalizeLanguage("hindi")).toBe("Hindi");
    });

    test("normalizeLanguage defaults to English", () => {
        expect(normalizeLanguage("German")).toBe("English");
    });

    test("normalizeText removes punctuation and normalizes spaces", () => {
        expect(
            normalizeText("  Where is Gate 4?!  ")
        ).toBe("where is gate 4");
    });

    test("detectIntent identifies parking questions", () => {
        expect(
            detectIntent("Where is the parking area?")
        ).toBe("parking");
    });

    test("detectIntent returns null for unknown questions", () => {
    expect(
        detectIntent("What is the capital of France?")
    ).toBeNull();
});
})