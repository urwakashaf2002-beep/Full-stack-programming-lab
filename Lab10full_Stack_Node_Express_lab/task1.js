const express = require('express');
const app = express();

// Updated Student Data
const students = [
  "Urwa Kashaf",
  "Aliza Zaman",
  "Sameen Ayyaz",
  "Aminah Asif"
];

app.get('/', (req, res) => {

  const list = students.map(s => `<li>${s}</li>`).join("");

  res.send(`
    <html>
    <head>
      <title>Student List</title>
      <style>
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #2a8096, #88b6d3);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .container {
          background: white;
          padding: 30px;
          border-radius: 15px;
          width: 350px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          text-align: center;
        }

        h2 {
          margin-bottom: 20px;
          color: #333;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        li {
          background: #f5f7fa;
          margin: 10px 0;
          padding: 12px;
          border-radius: 8px;
          font-weight: 500;
          transition: 0.3s;
        }

        li:hover {
          background: #3a8bad;
          color: white;
          transform: scale(1.05);
        }
      </style>
    </head>

    <body>
      <div class="container">
        <h2>🎓 Student List</h2>
        <ul>
          ${list}
        </ul>
      </div>
    </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Task 1 running at http://localhost:3000");
});