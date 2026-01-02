const form = document.getElementById("pyq-form");
const results = document.getElementById("results");

form.addEventListener("submit", e => {
  e.preventDefault();

  const branch = document.getElementById("branch").value;
  const semester = document.getElementById("semester").value;
  const exam = document.getElementById("exam").value;
  const year = document.getElementById("year").value;

  fetch(`http://localhost:5000/api/papers?branch=${branch}&semester=${semester}&exam=${exam}&year=${year}`)
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        results.innerHTML = "<p>No papers found</p>";
      } else {
        results.innerHTML = data.map(paper => `
          <a href="http://localhost:5000/${paper.filePath.replace(/\\/g, "/")}" target="_blank">
            ${paper.subject} (${paper.year} ${paper.exam})
          </a>
        `).join("<br>");
      }
    });
});
