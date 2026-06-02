# Browser Testing Guide – Lab 14 APIs

REST APIs can be tested directly in a browser for GET requests. Open these URLs after starting the server with `npm run dev`.

---

## Prerequisites

- Server running at `http://localhost:5000`
- A modern browser: Chrome, Firefox, or Edge
- **Optional:** Install the **JSON Formatter** Chrome extension for prettier JSON output

---

## Weather API – Browser Tests

Open these URLs directly in your browser address bar:

### Valid City Requests

```
http://localhost:5000/api/weather?city=Lahore
http://localhost:5000/api/weather?city=London
http://localhost:5000/api/weather?city=New York
http://localhost:5000/api/weather?city=Tokyo
http://localhost:5000/api/weather?city=Dubai
http://localhost:5000/api/weather?city=Islamabad
http://localhost:5000/api/weather?city=Karachi
```

**Expected:** A formatted JSON response with `"success": true` and full weather data.

### Error Scenarios

```
# Missing city parameter
http://localhost:5000/api/weather

# City not found
http://localhost:5000/api/weather?city=FakeCityXYZ999

# Invalid characters
http://localhost:5000/api/weather?city=City123

# Too short
http://localhost:5000/api/weather?city=A
```

**Expected:** A JSON response with `"success": false` and a descriptive error message.

---

## News API – Browser Tests

### Valid Country Requests

```
http://localhost:5000/api/news?country=us
http://localhost:5000/api/news?country=gb
http://localhost:5000/api/news?country=au
http://localhost:5000/api/news?country=ca
http://localhost:5000/api/news?country=de
http://localhost:5000/api/news?country=in
http://localhost:5000/api/news?country=fr
http://localhost:5000/api/news?country=jp
```

**Expected:** JSON response with `"success": true` and a list of news articles.

### Error Scenarios

```
# Missing country
http://localhost:5000/api/news

# Unsupported country code
http://localhost:5000/api/news?country=xx

# Wrong format (3 letters)
http://localhost:5000/api/news?country=usa

# Empty country
http://localhost:5000/api/news?country=
```

---

## Root Endpoint

```
http://localhost:5000
```

Returns server info and available endpoints:
```json
{
  "success": true,
  "message": "Lab 14 - API Testing Server is running",
  "version": "1.0.0",
  "endpoints": {
    "weather": "GET /api/weather?city=<cityName>",
    "news": "GET /api/news?country=<countryCode>"
  }
}
```

## Health Check

```
http://localhost:5000/api/health
```

---

## How to Take Screenshots for Report

1. Open Chrome/Firefox
2. Navigate to each URL above
3. Press **F12** to open DevTools (optional, to show network tab)
4. Press **Ctrl+Shift+P** → type "screenshot" → Full Page Screenshot (Chrome)
5. Or simply use **Windows + Shift + S** (Snipping Tool) to capture the browser window
6. Include screenshots of: at least 2 successful responses + 2 error responses per API

---

## Using Browser DevTools Network Tab

For a more detailed view:
1. Press **F12** → **Network** tab
2. Clear all requests
3. Navigate to an API URL
4. Click the request in the list to see: Headers, Response, Timing
5. This gives you the HTTP status code and full response headers for your report
