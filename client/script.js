const list = document.getElementById("event-list");

function renderEvent(event) {
  const li = document.createElement("li");
  li.textContent = event.title;
  list.appendChild(li);
}

fetch("http://127.0.0.1:5000/events")
  .then(res => res.json())
  .then(events => events.forEach(renderEvent));

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  if (!title) return;

  fetch("http://127.0.0.1:5000/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  })
    .then(res => res.json())
    .then(event => {
      renderEvent(event);
      document.getElementById("title").value = "";
    });
});
