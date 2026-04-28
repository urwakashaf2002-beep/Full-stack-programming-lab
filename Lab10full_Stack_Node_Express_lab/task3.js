const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Dynamic User</title>
        <style>
          body {
            font-family: 'Segoe UI', sans-serif;
            background: #0f172a;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          .box {
            text-align: center;
          }
          a {
            color: #38bdf8;
            text-decoration: none;
            font-size: 18px;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h2>Dynamic User Page</h2>
          <p>Try:</p>
          <a href="/user/Urwa">/user/Urwa</a>
        </div>
      </body>
    </html>
  `);
});

app.get('/user/:name', (req, res) => {

  const name = req.params.name;

  res.send(`
    <html>
    <head>
      <title>User Profile</title>
      <style>
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background: radial-gradient(circle at top, #1e293b, #020617);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          color: white;
        }

        .profile-card {
          backdrop-filter: blur(15px);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          width: 350px;
          box-shadow: 0 0 30px rgba(56, 189, 248, 0.3);
        }

        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #38bdf8, #6366f1);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 30px;
          font-weight: bold;
          margin: 0 auto 20px;
        }

        h1 {
          margin: 10px 0;
        }

        p {
          color: #cbd5f5;
        }

        .btn {
          margin-top: 20px;
          display: inline-block;
          padding: 10px 20px;
          border-radius: 25px;
          background: linear-gradient(90deg, #38bdf8, #6366f1);
          color: white;
          text-decoration: none;
          transition: 0.3s;
        }

        .btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 10px #38bdf8;
        }
      </style>
    </head>

    <body>
      <div class="profile-card">

        <div class="avatar">
          ${name.charAt(0).toUpperCase()}
        </div>

        <h1>Hello, ${name}</h1>
        <p>Welcome to your personalized profile page ✨</p>

        <a href="/" class="btn">Go Back</a>

      </div>
    </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Task 3 running at http://localhost:3000");
});