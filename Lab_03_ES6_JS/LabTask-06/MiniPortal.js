class Student {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.courses = new Set();
  }
}

const students = new Map();

const s1 = new Student(1, "Urwa");
s1.courses.add("AI");
s1.courses.add("Web");

students.set(s1.id, s1);

function saveData() {
  document.getElementById("status").innerText = "Saving...";

  new Promise(resolve => {
    setTimeout(() => resolve("Data Saved Successfully"), 2000);
  }).then(msg => {
    document.getElementById("status").innerText = msg;
  });
}