# Lab 14 – API RESTful Deployment and Testing

**Course:** Full Stack Programming (BSSE-V)  
**Instructor:** Mr. Sharif Hussain  
**Student:** Aliza Zaman  

Two production-quality REST APIs built with Node.js and Express, fully tested with Jest and Supertest.

---

## APIs

| API | Endpoint | External Service |
|-----|----------|-----------------|
| Weather Forecast | `GET /api/weather?city=<name>` | OpenWeatherMap |
| News Headlines | `GET /api/news?country=<code>` | NewsAPI.org |

---

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```
PORT=5000
OPENWEATHER_API_KEY=your_key_here
NEWS_API_KEY=your_key_here
```

**Get your API keys:**
- **OpenWeather:** https://openweathermap.org/api → Sign up → My API Keys
- **NewsAPI:** https://newsapi.org → Get API Key

### 3. Start the Server

```bash
# Production
npm start

# Development (with auto-restart)
npm run dev
```

Server starts at: **http://localhost:5000**

---

## API Reference

### Weather Forecast API

**Endpoint:** `GET /api/weather?city=<cityName>`

**Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| city | string | Yes | City name (letters, spaces, hyphens, apostrophes allowed) |

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "cityName": "Lahore",
    "country": "PK",
    "temperature": {
      "current": 35,
      "feelsLike": 40,
      "min": 33,
      "max": 37,
      "unit": "Celsius"
    },
    "weatherCondition": {
      "main": "Haze",
      "description": "haze",
      "icon": "https://openweathermap.org/img/wn/50d@2x.png"
    },
    "humidity": 80,
    "wind": { "speed": 5.5, "unit": "m/s" },
    "visibility": 5,
    "timestamp": "2024-06-01T08:30:00.000Z"
  }
}
```

**Error Response (400 - Missing City):**
```json
{
  "success": false,
  "message": "City parameter is required."
}
```

**Error Response (404 - City Not Found):**
```json
{
  "success": false,
  "message": "City \"FakeCityXYZ\" not found. Please check the city name and try again."
}
```

---

### News Headlines API

**Endpoint:** `GET /api/news?country=<countryCode>`

**Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| country | string | Yes | ISO 3166-1 alpha-2 country code (e.g., us, gb, au) |

**Supported country codes:** ae, ar, at, au, be, bg, br, ca, ch, cn, co, cu, cz, de, eg, fr, gb, gr, hk, hu, id, ie, il, in, it, jp, kr, lt, lv, ma, mx, my, ng, nl, no, nz, ph, pl, pt, ro, rs, ru, sa, se, sg, si, sk, th, tr, tw, ua, us, ve, za

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "country": "US",
    "totalResults": 38,
    "articleCount": 10,
    "articles": [
      {
        "title": "Breaking: Major market rally continues",
        "description": "US stocks hit record highs in continued rally.",
        "source": "Reuters",
        "author": "John Smith",
        "url": "https://reuters.com/article/12345",
        "publishedAt": "2024-06-01T12:00:00.000Z",
        "imageUrl": "https://reuters.com/img/12345.jpg"
      }
    ]
  }
}
```

**Error Response (400 - Missing Country):**
```json
{
  "success": false,
  "message": "Country code parameter is required. Example: GET /api/news?country=us"
}
```

**Error Response (400 - Unsupported Country):**
```json
{
  "success": false,
  "message": "Country code \"xx\" is not supported by NewsAPI."
}
```

---

## Running Tests

```bash
# All tests
npm test

# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration

# System tests only
npm run test:system

# Tests with coverage report
npm run test:coverage
```

---

## Project Structure

```
backend/
├── app.js                    # Express app (middleware + routes)
├── server.js                 # HTTP server entry point
├── .env.example              # Environment variable template
├── config/
│   └── config.js             # Centralized configuration
├── routes/
│   ├── weatherRoutes.js      # Weather route definitions
│   └── newsRoutes.js         # News route definitions
├── controllers/
│   ├── weatherController.js  # Weather request handler
│   └── newsController.js     # News request handler
├── services/
│   ├── weatherService.js     # OpenWeather API integration
│   └── newsService.js        # NewsAPI.org integration
├── utils/
│   ├── weatherFormatter.js   # Formats OpenWeather response
│   ├── weatherValidator.js   # Validates city input
│   ├── newsFormatter.js      # Formats NewsAPI response
│   └── newsValidator.js      # Validates country code input
├── middleware/
│   ├── errorHandler.js       # Centralized error handling
│   └── requestLogger.js      # HTTP request logger
└── tests/
    ├── unit/                 # Pure function tests
    │   ├── weatherFormatter.test.js
    │   ├── weatherValidator.test.js
    │   ├── newsFormatter.test.js
    │   └── newsValidator.test.js
    ├── integration/          # Route + service tests (axios mocked)
    │   ├── weather.test.js
    │   └── news.test.js
    └── system/               # Full pipeline tests (axios mocked)
        ├── weatherEndpoint.test.js
        └── newsEndpoint.test.js
```

---

## Architecture

The project follows **Clean Architecture** principles:

```
HTTP Request
     │
     ▼
  Routes          → Define URL patterns, map to controllers
     │
     ▼
  Controllers     → Handle req/res, orchestrate flow
     │
     ▼
  Services        → External API communication
     │
     ▼
  Utils           → Data validation and formatting
     │
     ▼
  Middleware      → Centralized error handling
     │
     ▼
HTTP Response
```

No business logic lives in routes. Controllers are thin orchestrators. All external API calls are isolated in services.
