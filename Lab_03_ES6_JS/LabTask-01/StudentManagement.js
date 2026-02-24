class Student {
  constructor(id, name, semester, courses) {
    this.id = id;
    this.name = name;
    this.semester = semester;
    this.courses = courses;
  }

  getDetails() {
    return `
      <div class="student-card">
        <h2>${this.name}</h2>
        <p><strong>ID:</strong> ${this.id}</p>
        <p><strong>Semester:</strong> ${this.semester}</p>
        <p><strong>Courses:</strong> ${this.courses.join(", ")}</p>
      </div>
    `;
  }
}

const students = [
  new Student(1, "Urwa Kashaf", "Spring 2026", ["Math", "Physics", "CS"]),
  new Student(2, "Aliza Khan Zaman", "Fall 2025", ["Biology", "Chemistry"]),
  new Student(3, "Sameen Ayyaz", "Summer 2026", ["Economics", "Statistics"])
];

const container = document.getElementById("student-container");
container.innerHTML = students.map(s => s.getDetails()).join("");