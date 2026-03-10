import './App.css';

function StudentCard({ name, rollNo, department, university, color, position }) {
  return (
    <div className={`student-card ${position}`} style={{ background: color }}>
      <h2 className="card-name">👤 {name}</h2>
      <p className="card-rollno">🎟️ Roll No: {rollNo}</p>
      <p className="card-info">🏛️ {department}</p>
      <p className="card-info">🎓 {university}</p>
    </div>
  );
}

function App() {
  const students = [
    { name: 'Urwa Kashaf', rollNo: '211610', department: 'Software Engineering', university: 'Air University', color: '#ffb74d', position: 'left' },
    { name: 'Hudda Ibrar', rollNo: '211621', department: 'AI & Machine Learning', university: 'Air University', color: '#4db6ac', position: 'center' },
    { name: 'Muhammad Shahwaiz', rollNo: '211635', department: 'Cyber Security', university: 'Air University', color: '#64b5f6', position: 'right' },
  ];

  return (
    <div className="app">
      <header>
        <h1 className="fancy-heading">✨ Student Profiles ✨</h1>
        <p className="subtitle">Air University — BSSE-VI</p>
      </header>
      <div className="card-stair">
        {students.map((s, i) => (
          <StudentCard key={i} {...s} />
        ))}
      </div>
    </div>
  );
}

export default App;