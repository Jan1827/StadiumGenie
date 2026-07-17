::: {align="center"}
# 🏟 StadiumGenie

### AI Smart Stadium Assistant for FIFA World Cup 2026

```{=html}
<p>
```
An AI-powered Smart Stadium Assistant that combines
`<b>`{=html}Generative AI`</b>`{=html}, voice interaction, intelligent
navigation, parking guidance, food discovery, emergency support, and
live match information.
```{=html}
</p>
```
```{=html}
<p>
```
`<img src="https://img.shields.io/badge/HTML-5-orange?style=for-the-badge&logo=html5"/>`{=html}
`<img src="https://img.shields.io/badge/CSS-3-blue?style=for-the-badge&logo=css3"/>`{=html}
`<img src="https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge&logo=javascript"/>`{=html}
`<img src="https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js"/>`{=html}
`<img src="https://img.shields.io/badge/Jest-Tested-red?style=for-the-badge&logo=jest"/>`{=html}
`<img src="https://img.shields.io/badge/Generative_AI-OpenRouter-black?style=for-the-badge"/>`{=html}
`<img src="https://img.shields.io/badge/Responsive-Yes-success?style=for-the-badge"/>`{=html}
`<img src="https://img.shields.io/badge/Accessibility-ARIA-blueviolet?style=for-the-badge"/>`{=html}

```{=html}
</p>
```
```{=html}
<p>
```
`<a href="https://github.com/Jan1827/StadiumGenie">`{=html}
`<img src="https://img.shields.io/badge/View-GitHub-181717?style=for-the-badge&logo=github"/>`{=html}
`</a>`{=html}
```{=html}
</p>
```
:::


------------------------------------------------------------------------

## 📖 Overview

StadiumGenie is an AI-powered Smart Stadium Assistant built for the
**FIFA World Cup 2026**. It improves the match-day experience through
intelligent navigation, AI assistance, parking guidance, food discovery,
emergency support, and accessibility.

------------------------------------------------------------------------

## 📑 Table of Contents

-   Features
-   AI Integration
-   System Architecture
-   Technology Stack
-   Project Structure
-   Installation
-   Backend API
-   Testing
-   Security
-   Screenshots
-   Accessibility
-   Future Enhancements
-   Hackathon
-   Developer

------------------------------------------------------------------------

## ✨ Features

-   🤖 AI Stadium Assistant
-   🗺 Interactive Stadium Map
-   🚗 Smart Parking Finder
-   🍔 Food Discovery
-   🚑 Emergency Center
-   📅 Match Schedule
-   🎤 Voice Recognition
-   🔊 Text-to-Speech
-   📱 Responsive Design
-   ♿ Accessibility Support

------------------------------------------------------------------------

## 🤖 Generative AI

The chatbot uses a **hybrid architecture**.

1.  Searches the **local stadium knowledge base**.
2.  If no answer exists, the request is sent to **OpenRouter LLM**.
3.  The AI-generated response is returned to the user.

### AI Capabilities

-   Natural language conversations
-   OpenRouter LLM
-   Local knowledge fallback
-   Voice input
-   Speech synthesis
-   Multilingual support

------------------------------------------------------------------------

## 🏗 System Architecture

``` text
Browser
   │
Frontend (HTML/CSS/JavaScript)
   │
Express.js Backend
   ├── Local Knowledge Base
   └── OpenRouter AI
            │
      AI Response
```

------------------------------------------------------------------------

## 🛠 Technology Stack

  Technology           Purpose
  -------------------- ---------------------
  HTML5                Structure
  CSS3                 Styling
  JavaScript           Frontend
  Node.js              Backend
  Express.js           Server
  OpenRouter           Generative AI
  Jest                 Testing
  Supertest            Backend API Testing
  Helmet               Security
  Express Rate Limit   Rate Limiting

------------------------------------------------------------------------

## 📂 Project Structure

``` text
StadiumGenie/
├── css/
├── images/
├── js/
├── tests/
├── dashboard.html
├── chatbot.html
├── map.html
├── parking.html
├── food.html
├── emergency.html
├── schedule.html
├── server.js
├── jest.setup.js
├── package.json
├── README.md
```

------------------------------------------------------------------------

## 🚀 Installation

``` bash
git clone https://github.com/Jan1827/StadiumGenie.git
cd StadiumGenie
npm install
npm start
```

Open:

``` text
http://localhost:3000
```

------------------------------------------------------------------------

## 📡 Backend API

### GET /

Returns server status.

### POST /chat

``` json
{
  "message":"Where is Gate 4?",
  "language":"English"
}
```

------------------------------------------------------------------------

## 🧪 Testing

``` bash
npm test
```

Current Results

-   ✅ 6 Test Suites Passed
-   ✅ 15 Tests Passed

------------------------------------------------------------------------

## 🔒 Security

-   Helmet
-   Express Rate Limit
-   Input Validation
-   Request Size Limits
-   dotenv
-   Timeout Handling

------------------------------------------------------------------------

## 📸 Screenshots

Place your screenshots here:

-   Home
-   Dashboard
-   Map
-   AI Assistant
-   Parking
-   Food
-   Emergency
-   Schedule

------------------------------------------------------------------------

## ♿ Accessibility

-   Semantic HTML
-   ARIA Labels
-   Keyboard Navigation
-   Screen Reader Support
-   Responsive Layout

------------------------------------------------------------------------

## 🔮 Future Enhancements

-   Google Maps
-   Live Parking API
-   QR Navigation
-   AI Route Optimization
-   Push Notifications
-   Ticket Booking
-   Offline Support

------------------------------------------------------------------------

## 🏆 Hackathon

**Hack2Skill Virtual PromptWar**

Category: **Smart Stadiums & Tournament Operations**

------------------------------------------------------------------------

## 👩‍💻 Developer

**Janhavi Ojha**

------------------------------------------------------------------------

## 📜 License

MIT License

------------------------------------------------------------------------

::: {align="center"}
### ⭐ If you enjoyed this project, please consider giving it a Star!

Made with ❤️ for smarter stadium experiences.
:::