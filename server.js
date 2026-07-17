require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// =====================================================
// Supported Languages
// =====================================================

const supportedLanguages = [
    "English",
    "Hindi",
    "Spanish",
    "French"
];

function normalizeLanguage(language) {

    if (typeof language !== "string") {
        return "English";
    }

    const matchedLanguage = supportedLanguages.find(
        (item) =>
            item.toLowerCase() === language.toLowerCase()
    );

    return matchedLanguage || "English";
}

// =====================================================
// Multilingual Stadium Knowledge Base
// =====================================================

const stadiumKnowledge = {

    English: {

        gate1:
            "🚪 Gate 1 is the main entrance of the stadium.",

        gate2:
            "⭐ Gate 2 is the VIP entrance.",

        gate3:
            "➡️ Gate 3 is the east entrance. The Medical Center is beside this gate.",

        gate4:
            "🚪 Gate 4 is the west entrance. Walk along the main concourse and follow the overhead signs marked “West Entrance.” Food Court B is located next to Gate 4.",

        restroom:
            "🚻 Restroom A is near Gate 1.\n🚻 Restroom B is beside Food Court B near Gate 4.",

        parking:
            "🚗 Parking Zone A is on the north side and is closest to Gate 1.\n🚗 Parking Zone B is on the south side and is recommended for Gate 4 visitors.",

        medical:
            "🏥 The Medical Center is beside Gate 3 and remains open throughout the event.",

        wheelchair:
            "♿ Wheelchair-accessible entrances are available at Gate 1 and Gate 3. Elevators are available near both entrances.",

        metro:
            "🚇 The Metro Station is approximately a five-minute walk from Gate 1.",

        bus:
            "🚌 The bus stop is located outside Gate 2.",

        taxi:
            "🚖 Taxi pick-up and drop-off is available near Parking Zone A.",

        food:
            "🍔 Food Court A is near Gate 2.\n🍕 Food Court B is near Gate 4.",

        emergency:
            "🚨 In an emergency, contact the nearest stadium staff member immediately. Emergency exits are available near every gate.",

        schedule:
            "📅 Today’s Demo Match\n\n🇮🇳 India vs 🇧🇷 Brazil\n🕢 Kick-off: 7:30 PM\n🏟 Demo Stadium"
    },

    Hindi: {

        gate1:
            "🚪 गेट 1 स्टेडियम का मुख्य प्रवेश द्वार है।",

        gate2:
            "⭐ गेट 2 वीआईपी प्रवेश द्वार है।",

        gate3:
            "➡️ गेट 3 पूर्वी प्रवेश द्वार है। मेडिकल सेंटर इसी गेट के पास स्थित है।",

        gate4:
            "🚪 गेट 4 पश्चिमी प्रवेश द्वार है। मुख्य कॉनकोर्स पर आगे बढ़ें और ऊपर लगे ‘West Entrance’ संकेतों का पालन करें। फूड कोर्ट B गेट 4 के पास स्थित है।",

        restroom:
            "🚻 शौचालय A गेट 1 के पास है।\n🚻 शौचालय B गेट 4 के पास फूड कोर्ट B के बगल में है।",

        parking:
            "🚗 पार्किंग ज़ोन A उत्तर दिशा में है और गेट 1 के सबसे पास है।\n🚗 पार्किंग ज़ोन B दक्षिण दिशा में है और गेट 4 के दर्शकों के लिए बेहतर है।",

        medical:
            "🏥 मेडिकल सेंटर गेट 3 के पास है और पूरे कार्यक्रम के दौरान खुला रहेगा।",

        wheelchair:
            "♿ व्हीलचेयर के लिए सुलभ प्रवेश गेट 1 और गेट 3 पर उपलब्ध हैं। दोनों गेटों के पास लिफ्ट भी उपलब्ध हैं।",

        metro:
            "🚇 मेट्रो स्टेशन गेट 1 से लगभग पाँच मिनट की पैदल दूरी पर है।",

        bus:
            "🚌 बस स्टॉप गेट 2 के बाहर स्थित है।",

        taxi:
            "🚖 टैक्सी पिक-अप और ड्रॉप-ऑफ की सुविधा पार्किंग ज़ोन A के पास उपलब्ध है।",

        food:
            "🍔 फूड कोर्ट A गेट 2 के पास है।\n🍕 फूड कोर्ट B गेट 4 के पास है।",

        emergency:
            "🚨 आपात स्थिति में तुरंत नज़दीकी स्टेडियम कर्मचारी से संपर्क करें। प्रत्येक गेट के पास आपातकालीन निकास उपलब्ध हैं।",

        schedule:
            "📅 आज का डेमो मैच\n\n🇮🇳 भारत बनाम 🇧🇷 ब्राज़ील\n🕢 मैच शुरू होने का समय: शाम 7:30 बजे\n🏟 डेमो स्टेडियम"
    },

    Spanish: {

        gate1:
            "🚪 La Puerta 1 es la entrada principal del estadio.",

        gate2:
            "⭐ La Puerta 2 es la entrada VIP.",

        gate3:
            "➡️ La Puerta 3 es la entrada este. El centro médico está junto a esta puerta.",

        gate4:
            "🚪 La Puerta 4 es la entrada oeste. Camina por el pasillo principal y sigue las señales que indican “West Entrance”. La zona de comida B está junto a la Puerta 4.",

        restroom:
            "🚻 El baño A está cerca de la Puerta 1.\n🚻 El baño B está junto a la zona de comida B, cerca de la Puerta 4.",

        parking:
            "🚗 El estacionamiento A está en el lado norte y es el más cercano a la Puerta 1.\n🚗 El estacionamiento B está en el lado sur y se recomienda para los visitantes de la Puerta 4.",

        medical:
            "🏥 El centro médico está junto a la Puerta 3 y permanece abierto durante todo el evento.",

        wheelchair:
            "♿ Hay entradas accesibles para sillas de ruedas en las Puertas 1 y 3. También hay ascensores cerca de ambas entradas.",

        metro:
            "🚇 La estación de metro está aproximadamente a cinco minutos a pie de la Puerta 1.",

        bus:
            "🚌 La parada de autobús está fuera de la Puerta 2.",

        taxi:
            "🚖 La zona de recogida y bajada de taxis está cerca del estacionamiento A.",

        food:
            "🍔 La zona de comida A está cerca de la Puerta 2.\n🍕 La zona de comida B está cerca de la Puerta 4.",

        emergency:
            "🚨 En caso de emergencia, contacta inmediatamente al miembro del personal del estadio más cercano. Hay salidas de emergencia cerca de cada puerta.",

        schedule:
            "📅 Partido de demostración de hoy\n\n🇮🇳 India vs 🇧🇷 Brasil\n🕢 Inicio: 7:30 p. m.\n🏟 Estadio de demostración"
    },

    French: {

        gate1:
            "🚪 La porte 1 est l’entrée principale du stade.",

        gate2:
            "⭐ La porte 2 est l’entrée VIP.",

        gate3:
            "➡️ La porte 3 est l’entrée est. Le centre médical se trouve à côté de cette porte.",

        gate4:
            "🚪 La porte 4 est l’entrée ouest. Avancez dans le hall principal et suivez les panneaux indiquant « West Entrance ». L’aire de restauration B se trouve à côté de la porte 4.",

        restroom:
            "🚻 Les toilettes A se trouvent près de la porte 1.\n🚻 Les toilettes B se trouvent à côté de l’aire de restauration B, près de la porte 4.",

        parking:
            "🚗 Le parking A se trouve du côté nord et est le plus proche de la porte 1.\n🚗 Le parking B se trouve du côté sud et est recommandé aux visiteurs de la porte 4.",

        medical:
            "🏥 Le centre médical se trouve à côté de la porte 3 et reste ouvert pendant toute la durée de l’événement.",

        wheelchair:
            "♿ Des entrées accessibles aux fauteuils roulants sont disponibles aux portes 1 et 3. Des ascenseurs sont également disponibles près de ces deux entrées.",

        metro:
            "🚇 La station de métro se trouve à environ cinq minutes à pied de la porte 1.",

        bus:
            "🚌 L’arrêt de bus se trouve à l’extérieur de la porte 2.",

        taxi:
            "🚖 La zone de prise en charge et de dépose des taxis se trouve près du parking A.",

        food:
            "🍔 L’aire de restauration A se trouve près de la porte 2.\n🍕 L’aire de restauration B se trouve près de la porte 4.",

        emergency:
            "🚨 En cas d’urgence, contactez immédiatement le membre du personnel du stade le plus proche. Des sorties de secours sont disponibles près de chaque porte.",

        schedule:
            "📅 Match de démonstration d’aujourd’hui\n\n🇮🇳 Inde contre 🇧🇷 Brésil\n🕢 Coup d’envoi : 19 h 30\n🏟 Stade de démonstration"
    }
};

// =====================================================
// Keyword Matching
// =====================================================

const intentKeywords = {

    gate1: [
        "gate 1",
        "gate one",
        "गेट 1",
        "गेट एक",
        "puerta 1",
        "porte 1"
    ],

    gate2: [
        "gate 2",
        "gate two",
        "गेट 2",
        "गेट दो",
        "puerta 2",
        "porte 2"
    ],

    gate3: [
        "gate 3",
        "gate three",
        "गेट 3",
        "गेट तीन",
        "puerta 3",
        "porte 3"
    ],

    gate4: [
        "gate 4",
        "gate four",
        "गेट 4",
        "गेट चार",
        "puerta 4",
        "porte 4"
    ],

    restroom: [
        "restroom",
        "washroom",
        "toilet",
        "bathroom",
        "शौचालय",
        "टॉयलेट",
        "बाथरूम",
        "baño",
        "aseo",
        "toilettes"
    ],

    parking: [
        "parking",
        "park",
        "पार्किंग",
        "estacionamiento",
        "aparcamiento",
        "parking"
    ],

    medical: [
        "medical",
        "doctor",
        "hospital",
        "first aid",
        "मेडिकल",
        "डॉक्टर",
        "अस्पताल",
        "प्राथमिक उपचार",
        "centro médico",
        "médico",
        "hôpital",
        "centre médical",
        "premiers secours"
    ],

    food: [
        "food",
        "restaurant",
        "canteen",
        "eat",
        "hungry",
        "फूड",
        "खाना",
        "भोजन",
        "रेस्टोरेंट",
        "comida",
        "restaurante",
        "manger",
        "nourriture",
        "restaurant"
    ],

    metro: [
        "metro",
        "train",
        "मेट्रो",
        "ट्रेन",
        "tren",
        "métro"
    ],

    bus: [
        "bus",
        "बस",
        "autobús"
    ],

    taxi: [
        "taxi",
        "cab",
        "टैक्सी",
        "कैब"
    ],

    wheelchair: [
        "wheelchair",
        "accessible",
        "disabled",
        "accessibility",
        "व्हीलचेयर",
        "दिव्यांग",
        "सुलभ",
        "silla de ruedas",
        "accesible",
        "fauteuil roulant",
        "accessible"
    ],

    emergency: [
        "emergency",
        "urgent help",
        "danger",
        "आपातकाल",
        "आपात स्थिति",
        "मदद चाहिए",
        "खतरा",
        "emergencia",
        "ayuda urgente",
        "urgence",
        "danger"
    ],

    schedule: [
        "schedule",
        "match",
        "fixture",
        "kickoff",
        "kick-off",
        "मैच",
        "शेड्यूल",
        "समय",
        "partido",
        "horario",
        "calendario",
        "match",
        "programme",
        "horaire"
    ]
};

function normalizeText(text) {

    if (typeof text !== "string") {
        return "";
    }

    return text
        .toLowerCase()
        .replace(/[?.!,¿¡;:।]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function containsKeyword(message, keywords) {

    return keywords.some(
        (keyword) =>
            message.includes(
                normalizeText(keyword)
            )
    );
}

function detectIntent(message) {

    const normalizedMessage =
        normalizeText(message);

    for (const [intent, keywords] of Object.entries(intentKeywords)) {

        if (
            containsKeyword(
                normalizedMessage,
                keywords
            )
        ) {
            return intent;
        }
    }

    return null;
}

// =====================================================
// Error Messages
// =====================================================

function getMessage(language, messageType) {

    const messages = {

        English: {
            empty:
                "Please enter a question.",
            unavailable:
                "⚠️ The AI service is temporarily unavailable.",
            noResponse:
                "⚠️ The AI could not generate a response.",
            configuration:
                "⚠️ The AI service is not configured. Please check the OpenRouter API key."
        },

        Hindi: {
            empty:
                "कृपया अपना प्रश्न दर्ज करें।",
            unavailable:
                "⚠️ एआई सेवा फिलहाल उपलब्ध नहीं है।",
            noResponse:
                "⚠️ एआई उत्तर तैयार नहीं कर सका।",
            configuration:
                "⚠️ एआई सेवा कॉन्फ़िगर नहीं है। कृपया OpenRouter API कुंजी जाँचें।"
        },

        Spanish: {
            empty:
                "Escribe una pregunta.",
            unavailable:
                "⚠️ El servicio de IA no está disponible temporalmente.",
            noResponse:
                "⚠️ La IA no pudo generar una respuesta.",
            configuration:
                "⚠️ El servicio de IA no está configurado. Comprueba la clave de OpenRouter."
        },

        French: {
            empty:
                "Veuillez saisir une question.",
            unavailable:
                "⚠️ Le service d’IA est temporairement indisponible.",
            noResponse:
                "⚠️ L’IA n’a pas pu générer de réponse.",
            configuration:
                "⚠️ Le service d’IA n’est pas configuré. Vérifiez la clé API OpenRouter."
        }
    };

    return (
        messages[language]?.[messageType] ||
        messages.English[messageType]
    );
}

// =====================================================
// Chat Endpoint
// =====================================================

app.post("/chat", async (req, res) => {

    const language =
        normalizeLanguage(req.body.language);

    /*
     * The frontend sends:
     *
     * message         = complete AI instruction
     * originalMessage = actual question entered by the user
     *
     * We must use originalMessage for local keyword detection.
     */

    const rawUserMessage =
        req.body.originalMessage ||
        req.body.message ||
        "";

    const userMessage =
        normalizeText(rawUserMessage);

    console.log("--------------------------------");
    console.log("Language:", language);
    console.log("Original user question:", rawUserMessage);

    if (!userMessage) {

        return res.status(400).json({
            reply: getMessage(language, "empty")
        });
    }

    // =================================================
    // Instant Local Stadium Response
    // =================================================

    const detectedIntent =
        detectIntent(userMessage);

    if (detectedIntent) {

        console.log(
            "Local knowledge intent:",
            detectedIntent
        );

        return res.json({
            reply:
                stadiumKnowledge[language][detectedIntent],
            source: "local-knowledge",
            language
        });
    }

    // =================================================
    // OpenRouter AI Fallback
    // =================================================

    if (!process.env.OPENROUTER_API_KEY) {

        console.error(
            "OPENROUTER_API_KEY is missing."
        );

        return res.status(503).json({
            reply: getMessage(
                language,
                "configuration"
            )
        });
    }

    try {

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    Authorization:
                        `Bearer ${process.env.OPENROUTER_API_KEY}`,

                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    model: "openrouter/auto",

                    messages: [

                        {
                            role: "system",

                            content: `
You are StadiumGenie, a smart AI assistant for a FIFA World Cup stadium.

The selected response language is ${language}.

You must answer entirely in ${language}, even when the user asks the question in another language.

Keep the response clear, polite and under 120 words.

You may assist with:
- football and match information
- travel and public transport
- crowd management
- stadium safety
- accessibility
- visitor experience
- general stadium guidance

Do not invent exact stadium locations or layouts.

For immediate emergencies, tell the visitor to contact the nearest stadium staff member or emergency service.
                            `.trim()
                        },

                        {
    role: "user",
    content:
        req.body.message ||
        rawUserMessage
}
                    ]
                })
            }
        );

        const data =
            await response.json();

        console.log(
            "OpenRouter status:",
            response.status
        );

        if (!response.ok) {

            console.error(
                "OpenRouter error:",
                JSON.stringify(data, null, 2)
            );

            return res
                .status(response.status)
                .json({
                    reply:
                        data.error?.message ||
                        getMessage(
                            language,
                            "unavailable"
                        )
                });
        }

        const reply =
            data.choices?.[0]?.message?.content?.trim();

        if (!reply) {

            return res.json({
                reply: getMessage(
                    language,
                    "noResponse"
                )
            });
        }

        return res.json({
            reply,
            source: "openrouter-ai",
            language
        });

    } catch (error) {

        console.error(
            "AI service error:",
            error
        );

        return res.status(500).json({
            reply: getMessage(
                language,
                "unavailable"
            )
        });
    }
});

// =====================================================
// Health Check
// =====================================================

app.get("/", (req, res) => {

    res.json({
        message:
            "StadiumGenie server is running.",
        status: "online"
    });
});

// =====================================================
// Start Server
// =====================================================

const PORT =
    process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `🚀 StadiumGenie Server running on http://localhost:${PORT}`
    );
});