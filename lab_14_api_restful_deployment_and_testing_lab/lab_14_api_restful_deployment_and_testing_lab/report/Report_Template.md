# Lab 14 – API RESTful Deployment and Testing Lab Report

**Student Name:** Aliza Zaman  
**Course:** Full Stack Programming (BSSE-V)  
**Instructor:** Mr. Sharif Hussain  
**Lab Title:** API RESTful Deployment and Testing Lab  
**Date:** _______________  
**GitHub Repository:** https://github.com/[your-username]/Full-Stack-Programming-Lab

---

## 1. Objectives

The objectives of this lab were to:

1. Design and develop two RESTful APIs using Node.js and Express.js.
2. Integrate external APIs (OpenWeatherMap and NewsAPI.org).
3. Implement clean architecture (Routes → Controllers → Services → Utilities).
4. Perform Unit Testing, Integration Testing, and System Testing using Jest and Supertest.
5. Document and test APIs using Postman and the browser.

---

## 2. Tools and Technologies Used

| Tool/Technology | Version | Purpose |
|-----------------|---------|---------|
| Node.js | LTS (20.x) | JavaScript runtime |
| Express.js | 4.x | Web framework |
| Axios | 1.x | HTTP client for external APIs |
| dotenv | 16.x | Environment variable management |
| CORS | 2.x | Cross-origin resource sharing |
| Jest | 29.x | Testing framework |
| Supertest | 7.x | HTTP endpoint testing |
| Nodemon | 3.x | Development auto-restart |
| Postman | Latest | API testing and documentation |
| VS Code | Latest | Code editor |

---

## 3. Project Architecture

### 3.1 Folder Structure

```
lab_14_api_restful_deployment_and_testing_lab/
├── backend/
│   ├── app.js                    # Express application
│   ├── server.js                 # Server entry point
│   ├── config/config.js          # Configuration
│   ├── routes/                   # Route definitions
│   ├── controllers/              # Request handlers
│   ├── services/                 # External API integration
│   ├── utils/                    # Validators and formatters
│   ├── middleware/               # Error handling
│   └── tests/                    # All test files
├── docs/                         # Documentation
└── report/                       # This report
```

### 3.2 Architecture Diagram

```
HTTP Request → Routes → Controllers → Services → External API
                                   ↓
                              Utils (Validate/Format)
                                   ↓
                           Error Middleware
                                   ↓
                          HTTP Response (JSON)
```

---

## 4. Task 1: Weather Forecast API

### 4.1 API Overview

| Field | Details |
|-------|---------|
| Endpoint | `GET /api/weather?city=<cityName>` |
| External Service | OpenWeatherMap API |
| Response Fields | City Name, Temperature, Weather Condition, Humidity, Wind |

### 4.2 Files Created

- `routes/weatherRoutes.js` – Route definition
- `controllers/weatherController.js` – Request handler
- `services/weatherService.js` – OpenWeather API call
- `utils/weatherFormatter.js` – Response formatting
- `utils/weatherValidator.js` – City name validation

### 4.3 Postman Test Screenshots

**Test 1: Successful request – `GET /api/weather?city=Lahore`**

> [Insert screenshot here]

**Test 2: Missing city – `GET /api/weather`**

> [Insert screenshot here]

**Test 3: Invalid city – `GET /api/weather?city=FakeCityXYZ999`**

> [Insert screenshot here]

### 4.4 Browser Test Screenshots

**Browser test – `http://localhost:5000/api/weather?city=London`**

> [Insert screenshot here]

---

## 5. Task 2: News Headlines API

### 5.1 API Overview

| Field | Details |
|-------|---------|
| Endpoint | `GET /api/news?country=<countryCode>` |
| External Service | NewsAPI.org |
| Response Fields | Country, Total Results, Article Count, Articles list |

### 5.2 Files Created

- `routes/newsRoutes.js` – Route definition
- `controllers/newsController.js` – Request handler
- `services/newsService.js` – NewsAPI.org API call
- `utils/newsFormatter.js` – Response formatting
- `utils/newsValidator.js` – Country code validation

### 5.3 Error Handling

| Scenario | HTTP Status | Message |
|----------|-------------|---------|
| Missing country param | 400 | "Country code parameter is required" |
| Invalid format (e.g., usa) | 400 | "not a valid format. Must be exactly 2 letters" |
| Unsupported country code | 400 | "not supported by NewsAPI" |
| Invalid API key | 401 | "Invalid News API key" |
| Network failure | 503 | "Could not reach external service" |
| Rate limit exceeded | 429 | "NewsAPI rate limit exceeded" |

### 5.4 Postman Test Screenshots

**Test 1: Successful request – `GET /api/news?country=us`**

> [Insert screenshot here]

**Test 2: Missing country – `GET /api/news`**

> [Insert screenshot here]

**Test 3: Unsupported country – `GET /api/news?country=xx`**

> [Insert screenshot here]

### 5.5 Browser Test Screenshots

**Browser test – `http://localhost:5000/api/news?country=gb`**

> [Insert screenshot here]

---

## 6. Testing Using Jest

### 6.1 Test Strategy

| Test Type | Scope | Tools |
|-----------|-------|-------|
| Unit | Individual functions (formatters, validators) | Jest |
| Integration | API routes with mocked axios | Jest + Supertest |
| System | Full pipeline from request to response | Jest + Supertest |

### 6.2 Test Files

**Unit Tests:**
- `tests/unit/weatherFormatter.test.js` (15 tests)
- `tests/unit/weatherValidator.test.js` (16 tests)
- `tests/unit/newsFormatter.test.js` (17 tests)
- `tests/unit/newsValidator.test.js` (18 tests)

**Integration Tests:**
- `tests/integration/weather.test.js` (12 tests)
- `tests/integration/news.test.js` (14 tests)

**System Tests:**
- `tests/system/weatherEndpoint.test.js` (13 tests)
- `tests/system/newsEndpoint.test.js` (14 tests)

### 6.3 Jest Test Results Screenshot

**All Tests Passing (`npm test`)**

> [Insert terminal screenshot showing all tests passing here]

**Test Coverage Report (`npm run test:coverage`)**

> [Insert coverage report screenshot here]

### 6.4 Sample Test Code

```javascript
// Integration test example
it("should return 200 with formatted weather data for a valid city", async () => {
  axios.get.mockResolvedValueOnce(mockOpenWeatherSuccess);
  
  const res = await request(app).get("/api/weather?city=London");
  
  expect(res.status).toBe(200);
  expect(res.body.success).toBe(true);
  expect(res.body.data).toHaveProperty("cityName", "London");
});
```

---

## 7. Challenges and Solutions

| Challenge | Solution |
|-----------|---------|
| External API calls in tests | Used `jest.mock("axios")` to mock HTTP calls |
| Handling [Removed] articles from NewsAPI | Added filter in `newsFormatter.js` |
| Centralized error handling | Created `middleware/errorHandler.js` with AppError class |
| Different error codes from OpenWeather | Mapped status codes 404 and 401 in service layer |
| Country code validation | Used a hardcoded list of supported NewsAPI country codes |

---

## 8. GitHub Repository

**Repository URL:** https://github.com/[your-username]/Full-Stack-Programming-Lab

**Steps followed:**
1. Created GitHub account
2. Created repository named `Full-Stack-Programming-Lab`
3. Added collaborator: sharifali.aulecturer@gmail.com
4. Cloned repository locally
5. Created folder `lab_14_api_restful_deployment_and_testing_lab`
6. Pushed completed work

**Screenshot of GitHub repository:**

> [Insert GitHub repository screenshot here]

---

## 9. Conclusion

This lab provided hands-on experience in:

- Building production-quality REST APIs using Node.js and Express
- Integrating external APIs (OpenWeatherMap and NewsAPI)
- Applying clean architecture principles
- Writing comprehensive test suites with Jest and Supertest
- Handling errors gracefully with centralized middleware

The project is fully functional, all tests pass, and the codebase follows industry-standard practices.
