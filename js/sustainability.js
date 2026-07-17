

async function generateAIReport() {

    const reportBox = document.getElementById("summaryPrediction");

    if (!reportBox) return;

    reportBox.textContent = "🤖 AI is analyzing sustainability data...";

    try {

        const response = await fetch("http://localhost:3000/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                message: `You are an AI Sustainability Manager for FIFA World Cup 2026.

Analyze the stadium operations and generate a sustainability report covering:

1. Waste Management
2. Energy Consumption
3. Water Conservation
4. Carbon Footprint
5. Public Transport Usage
6. Recycling Initiatives
7. Green Recommendations

Return the response in short bullet points under 200 words.`

            })

        });

        if (!response.ok) {
            throw new Error("Server Error");
        }

        const data = await response.json();

        reportBox.textContent = data.reply;

    }

    catch (error) {

        console.error(error);

        reportBox.textContent =
            "⚠ Unable to generate AI sustainability report.";

    }

}



window.onload = generateAIReport;



if (typeof module !== "undefined") {

    module.exports = {
        generateAIReport
    };

}