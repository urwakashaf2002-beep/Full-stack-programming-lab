// Step 1: Student objects
const students = [
  { name: "Urwa", age: 23, semester: 6, courses: ["AI", "DB"] },
  { name: "Aliza", age: 21, semester: 4, courses: ["OS", "CN"] },
  { name: "Shahwaiz", age: 19, semester: 2, courses: ["Math", "PF"] }
];

// Step 2: Convert to JSON
const jsonData = JSON.stringify(students);

// Step 3: Convert back to objects
const parsedStudents = JSON.parse(jsonData);

// Step 4 & 5: Display using destructuring and innerHTML
const container = document.getElementById("students");

parsedStudents.forEach(({ name, age, semester, courses }) => {
  container.innerHTML += `
    <div class="card">
      <h3>${name}</h3>
      <p><span>Age:</span> ${age}</p>
      <p><span>Semester:</span> ${semester}</p>
      <p><span>Courses:</span> ${courses.join(", ")}</p>
    </div>
  `;
});