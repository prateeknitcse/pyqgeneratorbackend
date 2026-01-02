const form = document.getElementById("pyq-form");
const results = document.getElementById("results");

form.addEventListener("submit", e => {
  e.preventDefault();

  const branch = document.getElementById("branch").value;
  const semester = document.getElementById("semester").value;
  const exam = document.getElementById("exam").value;
  const year = document.getElementById("year").value;
  const subjectSelect = document.getElementById("subject");

document.getElementById("branch").addEventListener("change", fetchSubjects);
document.getElementById("semester").addEventListener("change", fetchSubjects);

function fetchSubjects() {
  const branch = document.getElementById("branch").value;
  const semester = document.getElementById("semester").value;

  if (!branch || !semester) return;

  fetch(`http://localhost:5000/api/papers/subjects?branch=${branch}&semester=${semester}`)
    .then(res => res.json())
    .then(subjects => {
      subjectSelect.innerHTML = `<option value="">Select Subject</option>`;
      subjects.forEach(sub => {
        subjectSelect.innerHTML += `<option value="${sub}">${sub}</option>`;
      });
    });
}


  fetch(`http://localhost:5000/api/papers?branch=${branch}&semester=${semester}&exam=${exam}&year=${year}`)
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        results.innerHTML = "<p>No papers found</p>";
      } else {
        results.innerHTML = data.map(paper => `
          <a href="${paper.fileUrl}"
 target="_blank">
            ${paper.subject} (${paper.year} ${paper.exam})
          </a>
        `).join("<br>");
      }
    });
});
