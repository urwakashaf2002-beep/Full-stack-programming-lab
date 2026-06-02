# Postman Testing Guide – Lab 14 APIs

This guide covers how to test both APIs using Postman.

---

## Setup

1. Download and install Postman: https://www.postman.com/downloads
2. Start the server: `npm run dev` (in the `backend/` folder)
3. Base URL: `http://localhost:5000`

---

## Weather Forecast API Tests

### Test 1: Successful Weather Request (Valid City)

| Field | Value |
|-------|-------|
| Method | GET |
| URL | `http://localhost:5000/api/weather?city=Lahore` |

**Expected Response (200 OK):**
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

**Screenshot:** Take a screenshot of the Postman request and 200 response for your report.

---

### Test 2: Missing City Parameter

| Field | Value |
|-------|-------|
| Method | GET |
| URL | `http://localhost:5000/api/weather` |

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "City parameter is required."
}
```

---

### Test 3: Invalid City (Not Found)

| Field | Value |
|-------|-------|
| Method | GET |
| URL | `http://localhost:5000/api/weather?city=FakeCityXYZ999` |

**Expected Response (404 Not Found):**
```json
{
  "success": false,
  "message": "City \"FakeCityXYZ999\" not found. Please check the city name and try again."
}
```

---

### Test 4: City with Numbers (Validation Error)

| Field | Value |
|-------|-------|
| Method | GET |
| URL | `http://localhost:5000/api/weather?city=City123` |

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "City name contains invalid characters. Use only letters, spaces, hyphens, or apostrophes."
}
```

---

### Test 5: Other Valid Cities

Try these to verify the API works across locations:
- `http://localhost:5000/api/weather?city=London`
- `http://localhost:5000/api/weather?city=New York`
- `http://localhost:5000/api/weather?city=Tokyo`
- `http://localhost:5000/api/weather?city=Dubai`
- `http://localhost:5000/api/weather?city=Islamabad`

---

## News Headlines API Tests

### Test 1: Successful News Request (Valid Country)

| Field | Value |
|-------|-------|
| Method | GET |
| URL | `http://localhost:5000/api/news?country=us` |

**Expected Response (200 OK):**
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
        "description": "US stocks hit record highs.",
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

---

### Test 2: Missing Country Parameter

| Field | Value |
|-------|-------|
| Method | GET |
| URL | `http://localhost:5000/api/news` |

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Country code parameter is required. Example: GET /api/news?country=us"
}
```

---

### Test 3: Unsupported Country Code

| Field | Value |
|-------|-------|
| Method | GET |
| URL | `http://localhost:5000/api/news?country=xx` |

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Country code \"xx\" is not supported by NewsAPI. Supported codes include: us, gb, au, ca, in, pk, de, fr, jp, etc."
}
```

---

### Test 4: Invalid Format (3-letter code)

| Field | Value |
|-------|-------|
| Method | GET |
| URL | `http://localhost:5000/api/news?country=usa` |

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "\"usa\" is not a valid format. Country code must be exactly 2 letters (e.g., \"us\", \"pk\", \"gb\")."
}
```

---

### Test 5: Other Valid Countries

- `http://localhost:5000/api/news?country=gb` (United Kingdom)
- `http://localhost:5000/api/news?country=au` (Australia)
- `http://localhost:5000/api/news?country=ca` (Canada)
- `http://localhost:5000/api/news?country=de` (Germany)
- `http://localhost:5000/api/news?country=in` (India)

---

## Health Check

| Field | Value |
|-------|-------|
| Method | GET |
| URL | `http://localhost:5000/api/health` |

**Expected Response (200 OK):**
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2024-06-01T10:00:00.000Z",
  "uptime": "45s"
}
```

---

## Postman Collection Export

To save your tests as a collection:
1. Click the `+` button to open a new request
2. Enter the URL and click **Send**
3. Click **Save** → Save to a collection named "Lab 14 API Tests"
4. Repeat for all test cases above
5. Export collection: `...` → Export → Collection v2.1 (for submission)
