# Jest Testing Guide – Lab 14 APIs

Complete guide to running, understanding, and interpreting Jest tests for this project.

---

## What is Jest?

**Jest** is a JavaScript testing framework developed by Meta. It provides:
- Test runner
- Assertion library (`expect`)
- Mocking (`jest.mock`)
- Code coverage reports

**Supertest** is an HTTP assertion library that allows testing Express routes without starting a real server.

---

## Test Types in This Project

### Unit Tests (`tests/unit/`)

Test individual **pure functions** in isolation. No HTTP calls, no Express, no external dependencies.

| File | What It Tests |
|------|--------------|
| `weatherFormatter.test.js` | `formatWeatherData()` – raw API → structured object |
| `weatherValidator.test.js` | `validateCity()` – input validation logic |
| `newsFormatter.test.js` | `formatNewsData()`, `formatArticle()` – response formatting |
| `newsValidator.test.js` | `validateCountryCode()` – country code validation |

### Integration Tests (`tests/integration/`)

Test **API routes end-to-end** using Supertest. Axios (the HTTP client) is mocked so no real API calls are made.

| File | What It Tests |
|------|--------------|
| `weather.test.js` | All Weather API route scenarios |
| `news.test.js` | All News API route scenarios |

### System Tests (`tests/system/`)

Test the **complete request pipeline** — from incoming HTTP request through routing, validation, service, formatter, and back to response. Validates that all layers work together correctly.

| File | What It Tests |
|------|--------------|
| `weatherEndpoint.test.js` | Full Weather API pipeline |
| `newsEndpoint.test.js` | Full News API pipeline |

---

## How to Run Tests

```bash
cd backend

# Install dependencies first
npm install

# Run ALL tests
npm test

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration

# Run only system tests
npm run test:system

# Run tests with coverage report
npm run test:coverage
```

---

## Understanding Test Output

### Passing Tests

```
PASS tests/unit/weatherFormatter.test.js
  weatherFormatter - formatWeatherData()
    ✓ should return a formatted object with all required fields (3 ms)
    ✓ should correctly map city name from API response (1 ms)
    ✓ should round temperature values to whole numbers (1 ms)
    ...

Test Suites: 1 passed, 1 total
Tests:       15 passed, 15 total
```

### Failing Tests

```
FAIL tests/unit/weatherFormatter.test.js
  ● weatherFormatter - formatWeatherData() › should round temperature values

    expect(received).toBe(expected)
    Expected: 33
    Received: 32

      ✕ should round temperature values to whole numbers
```

---

## Coverage Report

After running `npm run test:coverage`, a coverage report is generated in `backend/coverage/`.

Open `coverage/lcov-report/index.html` in your browser to view:

| Metric | Meaning |
|--------|---------|
| Statements | % of code statements executed |
| Branches | % of if/else branches covered |
| Functions | % of functions called |
| Lines | % of lines executed |

**Target coverage:** > 80% across all files.

---

## How Jest Mocking Works

In integration and system tests, `axios` is mocked using `jest.mock("axios")`. This means:

1. No real HTTP requests go to OpenWeather or NewsAPI
2. Tests run without API keys
3. Tests are deterministic (same output every time)
4. Tests work offline

```javascript
// How mocking is set up in tests
jest.mock("axios");
const axios = require("axios");

// Tell axios what to return when called
axios.get.mockResolvedValueOnce({ data: { name: "London", ... } });

// Now when weatherService calls axios.get(), it gets our fake data
const res = await request(app).get("/api/weather?city=London");
```

---

## Test Assertions Reference

| Assertion | What It Checks |
|-----------|---------------|
| `expect(x).toBe(y)` | Strict equality (===) |
| `expect(x).toEqual(y)` | Deep equality (objects) |
| `expect(x).toBeDefined()` | Value is not undefined |
| `expect(x).toBeNull()` | Value is null |
| `expect(x).toHaveProperty('key')` | Object has a property |
| `expect(x).toMatch(/pattern/)` | String matches regex |
| `expect(fn).toThrow(msg)` | Function throws with message |
| `expect(x).toHaveBeenCalled()` | Mock function was called |
| `expect(x).not.toHaveBeenCalled()` | Mock was NOT called |
| `expect(arr).toHaveLength(n)` | Array has n items |
| `expect(x).toBeInstanceOf(Class)` | x is instance of Class |

---

## Common Test Structure

```javascript
describe("Module Name - functionName()", () => {
  // Runs before each test in this block
  beforeEach(() => { /* setup */ });

  // Runs after each test (cleanup mocks)
  afterEach(() => { jest.clearAllMocks(); });

  it("should do something specific", () => {
    // Arrange: set up test data
    const input = "Lahore";

    // Act: call the function
    const result = validateCity(input);

    // Assert: verify the result
    expect(result).toBe("Lahore");
  });
});
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `Cannot find module` | Run `npm install` |
| Tests timeout | Check `testTimeout` in package.json (default 15s) |
| All tests fail with env error | Tests don't need real API keys (axios is mocked) |
| `jest: command not found` | Run `npx jest` instead |
| Port already in use | Tests use Supertest and don't start a real server |

---

## Screenshots for Report

To capture Jest output for your report:

```bash
# Run tests and save output to a file
npm test > test-results.txt 2>&1

# Or run with verbose flag
npm test -- --verbose > test-results.txt 2>&1
```

Then open `test-results.txt` and copy the output into your report, or take a screenshot of the terminal.
