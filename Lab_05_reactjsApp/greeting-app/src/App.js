import './App.css';

function Greeting({ name, timeOfDay, bgColor }) {
  function getGreetingInfo(time) {
    switch (time.toLowerCase()) {
      case 'morning':   return { message: 'Good Morning',   emoji: '🌅', cls: 'morning' };
      case 'afternoon': return { message: 'Good Afternoon', emoji: '☀️', cls: 'afternoon' };
      case 'evening':   return { message: 'Good Evening',   emoji: '🌆', cls: 'evening' };
      case 'night':     return { message: 'Good Night',     emoji: '🌙', cls: 'night' };
      default:          return { message: 'Hello',          emoji: '👋', cls: 'morning' };
    }
  }

  const { message, emoji, cls } = getGreetingInfo(timeOfDay);

  return (
    <div
      className={`greeting-card ${cls}`}
      style={bgColor ? { background: bgColor } : {}}
    >
      <span className="greeting-emoji">{emoji}</span>
      <div className="greeting-content">
        <p className="time-label">{timeOfDay}</p>
        <h2 className="greeting-message">{message}!</h2>
        <p className="greeting-name">Welcome, <span>{name}</span> 🎉</p>
      </div>
    </div>
  );
}

function App() {
  const greetings = [
    { name: 'Ali Hassan',         timeOfDay: 'Morning',   bgColor: null },
    { name: 'Sara Ahmed',         timeOfDay: 'Afternoon', bgColor: null },
    { name: 'Musharaf Khan',      timeOfDay: 'Evening',   bgColor: null },
    { name: 'Dr. Sharif Hussain', timeOfDay: 'Night',     bgColor: null }, // removed inline bgColor
  ];

  return (
    <div className="app">
      <h1>👋 Dynamic Greeting App</h1>
      <p className="subtitle">Personalized greetings based on time of day</p>
      <div className="greeting-container">
        {greetings.map((g, i) => (
          <Greeting key={i} {...g} />
        ))}
      </div>
    </div>
  );
}

export default App;