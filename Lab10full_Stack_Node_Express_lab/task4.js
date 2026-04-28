const express = require('express');
const app = express();

app.get('/', (req, res) => {

  res.send(`
    <html>
    <head>
      <title>My Portfolio</title>

      <style>
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background: #fdf6e3; /* soft cream background */
          color: #333;
        }

        /* Navbar */
        nav {
          display: flex;
          justify-content: space-between;
          padding: 20px 50px;
          background: #ffb347; /* warm orange header */
          color: #fff;
        }

        nav h2 {
          margin: 0;
          color: #fff;
        }

        nav a {
          color: #fff;
          text-decoration: none;
          margin-left: 20px;
          transition: 0.3s;
        }

        nav a:hover {
          color: #333;
        }

        /* Hero Section */
        .hero {
          text-align: center;
          padding: 100px 20px;
        }

        .hero h1 {
          font-size: 40px;
          margin-bottom: 10px;
          color: #d35400;
        }

        .hero span {
          color: #27ae60; /* green highlight */
        }

        .hero p {
          color: #555;
        }

        /* Skills Section */
        .skills {
          padding: 50px;
          text-align: center;
        }

        .skills h2 {
          margin-bottom: 20px;
          color: #2c3e50;
        }

        .skill-list {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .skill {
          background: #ffeaa7;
          padding: 15px 25px;
          border-radius: 10px;
          border: 1px solid #f39c12;
          color: #2c3e50;
          font-weight: bold;
        }

        /* Footer */
        footer {
          text-align: center;
          padding: 20px;
          background: #ffb347;
          color: #fff;
        }
      </style>
    </head>

    <body>

      <!-- Navbar -->
      <nav>
        <h2>MyPortfolio</h2>
        <div>
          <a href="#">Home</a>
          <a href="#">Skills</a>
          <a href="#">Contact</a>
        </div>
      </nav>

      <!-- Hero -->
      <section class="hero">
        <h1>Hello, I'm <span>Urwa Kashaf</span></h1>
        <p>A passionate student learning Full Stack Development 🚀</p>
      </section>

      <!-- Skills -->
      <section class="skills">
        <h2>My Skills</h2>

        <div class="skill-list">
          <div class="skill">HTML</div>
          <div class="skill">CSS</div>
          <div class="skill">JavaScript</div>
          <div class="skill">Node.js</div>
          <div class="skill">Express.js</div>
        </div>
      </section>

      <!-- Footer -->
      <footer>
        <p>© 2026 Urwa Kashaf | All Rights Reserved</p>
      </footer>

    </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Task 4 running at http://localhost:3000");
});
