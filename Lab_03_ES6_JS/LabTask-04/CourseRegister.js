const courses = new Set();

function addCourse() {
  const input = document.getElementById("courseInput");
  const courseName = input.value.trim();
  const message = document.getElementById("message");

  if (courseName === "") {
    message.textContent = "Please enter a course name.";
    message.className = "error";
    return;
  }

  // Check duplicate
  if (courses.has(courseName)) {
    message.textContent = "This course is already registered.";
    message.className = "error";
  } else {
    courses.add(courseName);
    message.textContent = "Course added successfully. Add another course.";
    message.className = "success";
  }

  // Display courses
  let output = "<h4>Registered Courses:</h4><ul>";
  for (let course of courses) {
    output += `<li>${course}</li>`;
  }
  output += `</ul><b>Total Unique Courses: ${courses.size}</b>`;

  document.getElementById("output").innerHTML = output;

  // Clear input for next entry
  input.value = "";
  input.focus();
}