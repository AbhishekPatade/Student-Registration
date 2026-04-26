const fieldIds = ["name","email","phone","course","year","college","skills","gender","resume"];

function updateProgress() {
  const total = fieldIds.length;
  let filled = 0;
  fieldIds.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.value.trim()) filled++;
  });
  const pct = Math.round((filled / total) * 100);
  document.getElementById("progressBar").style.width = pct + "%";
  document.getElementById("progressLabel").textContent = pct + "% complete";
}

function renderSkillTags() {
  const val = document.getElementById("skills").value;
  const container = document.getElementById("skillTags");
  const tags = val.split(",").map(s => s.trim()).filter(Boolean);
  container.innerHTML = "";
  tags.forEach(tag => {
    const span = document.createElement("span");
    span.className = "skill-tag";
    span.textContent = tag;
    container.appendChild(span);
  });
}

fieldIds.forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("input", updateProgress);
  el.addEventListener("change", updateProgress);
  el.addEventListener("blur", () => {
    const group = el.closest(".field-group");
    if (!group) return;
    if (el.required && !el.value.trim()) {
      group.classList.add("has-error");
      group.classList.remove("is-valid");
    } else if (el.value.trim()) {
      group.classList.remove("has-error");
      group.classList.add("is-valid");
    }
  });
  el.addEventListener("focus", () => {
    const group = el.closest(".field-group");
    if (group) group.classList.remove("has-error");
  });
});

document.getElementById("skills").addEventListener("input", renderSkillTags);

document.getElementById("regForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  let valid = true;
  ["name","email","phone","course","year","gender"].forEach(id => {
    const el = document.getElementById(id);
    const group = el && el.closest(".field-group");
    if (el && el.required && !el.value.trim()) {
      valid = false;
      if (group) { group.classList.add("has-error"); group.classList.remove("is-valid"); }
    }
  });
  if (!valid) return;

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    course: document.getElementById("course").value,
    year: document.getElementById("year").value,
    college: document.getElementById("college").value,
    skills: document.getElementById("skills").value,
    gender: document.getElementById("gender").value,
    resume: document.getElementById("resume").value
  };

  const btn = document.getElementById("submitBtn");
  const msgEl = document.getElementById("msg");

  btn.classList.add("loading");
  btn.disabled = true;
  msgEl.className = "msg-box";
  msgEl.textContent = "";

  try {
    const res = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (res.ok) {
      msgEl.textContent = "✅ " + result.message;
      msgEl.className = "msg-box success show";
    } else {
      msgEl.textContent = "❌ " + result.message;
      msgEl.className = "msg-box error show";
    }
  } catch (err) {
    msgEl.textContent = "❌ Server Error";
    msgEl.className = "msg-box error show";
  } finally {
    btn.classList.remove("loading");
    btn.disabled = false;
  }
});

updateProgress();