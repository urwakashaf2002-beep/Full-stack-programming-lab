const express = require('express');
const app = express();

// Reusable template with active highlighting and richer content
const page = (title, message, activePage, extraContent="") => `
<html>
<head>
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background: #f3f4f6; /* soft gray background */
      color: #333;
    }

    /* Navbar */
    nav {
      background: #444; /* darker header line */
      padding: 15px;
      display: flex;
      justify-content: center;
      gap: 15px;
    }

    nav a {
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 20px;
      font-weight: 500;
      transition: 0.3s;
      color: #fff;
    }

    /* Different button colors */
    nav a:nth-child(1) { background: #ff7f50; }   /* coral */
    nav a:nth-child(2) { background: #3cb371; }   /* medium sea green */
    nav a:nth-child(3) { background: #4682b4; }   /* steel blue */

    nav a:hover {
      opacity: 0.85;
      transform: translateY(-2px);
    }

    /* Active Page */
    .active {
      border: 2px solid #fff;
    }

    /* Content */
    .container {
      padding: 40px;
      max-width: 800px;
      margin: auto;
    }

    h1 {
      margin-bottom: 10px;
      color: #222;
    }

    p {
      color: #555;
      margin-bottom: 20px;
    }

    section {
      margin-top: 25px;
      background: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }

    ul {
      list-style: disc;
      padding-left: 20px;
      color: #444;
    }
  </style>
</head>

<body>

  <nav>
    <a href="/home" class="${activePage === 'home' ? 'active' : ''}">Home</a>
    <a href="/about" class="${activePage === 'about' ? 'active' : ''}">About</a>
    <a href="/contact" class="${activePage === 'contact' ? 'active' : ''}">Contact</a>
  </nav>

  <div class="container">
    <h1>${title}</h1>
    <p>${message}</p>
    ${extraContent}
  </div>

</body>
</html>
`;

// Routes with richer content
app.get('/', (req, res) => {
  res.send(page("Welcome", "Use the navigation buttons above", ""));
});

app.get('/home', (req, res) => {
  res.send(page("Home Page", "Welcome Home", "home", `
    <section>
      <h2>Lab Highlights</h2>
      <p>Here's what we're working on this week:</p>
      <ul>
        <li>Building smart IoT devices</li>
        <li>Experimenting with hydroponic kits</li>
        <li>Learning modern web frameworks</li>
      </ul>
    </section>
  `));
});

app.get('/about', (req, res) => {
  res.send(page("About Page", "This is About Page", "about", `
    <section>
      <h2>Our Mission</h2>
      <p>We aim to combine technology and sustainability to create innovative solutions for modern living.</p>
    </section>
    <section>
      <h2>Team Members</h2>
      <ul>
        <li>Urwa Kashaf</li>
        <li>Minahil Asif</li>
        <li>Aliza Zaman</li>
        <li>Laiba Hamid</li>
      </ul>
    </section>
  `));
});

app.get('/contact', (req, res) => {
  res.send(page("Contact Page", "Contact us here", "contact", `
    <section>
      <h2>Get in Touch</h2>
      <p>You can reach us via email or visit our lab during working hours.</p>
      <ul>
        <li>Email: lab@example.com</li>
        <li>Location: XYZ University, Islamabad</li>
        <li>Hours: Mon–Fri, 9 AM – 5 PM</li>
      </ul>
    </section>
  `));
});

// Server
app.listen(3000, () => {
  console.log("Task 2 running at http://localhost:3000");
});
