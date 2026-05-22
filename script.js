const config = window.PORTFOLIO_CONFIG || {};

const get = (selector) => document.querySelector(selector);
const getAll = (selector) => Array.from(document.querySelectorAll(selector));

function setTextBindings() {
  document.title = `${config.name || "Resume Portfolio"} | Portfolio`;
  const githubUsername = normalizeGitHubUsername(config.githubUsername);
  setProfilePhoto();

  getAll("[data-bind]").forEach((element) => {
    const key = element.dataset.bind;
    if (config[key]) {
      element.textContent = config[key];
    }
  });

  getAll("[data-bind-href]").forEach((element) => {
    const type = element.dataset.bindHref;
    const urls = {
      github: githubUsername
        ? `https://github.com/${githubUsername}`
        : "#github",
      linkedin: config.linkedinUrl || "#",
      email: config.email ? `mailto:${config.email}` : "#"
    };
    element.href = urls[type] || "#";
  });
}

function setProfilePhoto() {
  const photo = get("#profilePhoto");
  const fallback = get("#photoFallback");

  if (!photo || !fallback) {
    return;
  }

  if (!config.avatarUrl) {
    photo.hidden = true;
    fallback.hidden = false;
    return;
  }

  photo.src = config.avatarUrl;
  photo.hidden = false;
  fallback.hidden = true;
  photo.addEventListener("error", () => {
    photo.hidden = true;
    fallback.hidden = false;
  });
}

function tagList(tags) {
  return (tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
}

function renderSkills() {
  const groups = normalizeSkillGroups(config.skills || []);

  get("#skillsList").innerHTML = groups
    .map(
      (group) => `
        <div class="skill-group">
          <h4>${escapeHtml(group.section)}</h4>
          <div class="tag-list">${tagList(group.items)}</div>
        </div>
      `
    )
    .join("");
}

function normalizeSkillGroups(skills) {
  if (!skills.length) {
    return [];
  }

  if (typeof skills[0] === "string") {
    return [{ section: "Skills", items: skills }];
  }

  if (skills[0].section && skills[0].items) {
    return skills;
  }

  return skills.flatMap((group) =>
    Object.entries(group).map(([section, items]) => ({
      section,
      items
    }))
  );
}

function renderExperience() {
  const list = get("#experienceList");
  list.innerHTML = (config.experience || [])
    .map(
      (item) => `
        <div class="experience-item">
          <h3>${escapeHtml(item.title)}</h3>
          <p><strong>${escapeHtml(item.company)}</strong>${item.period ? ` | ${escapeHtml(item.period)}` : ""}</p>
          ${renderExperienceDetails(item.details)}
        </div>
      `
    )
    .join("");
}

function renderExperienceDetails(details) {
  if (Array.isArray(details)) {
    return `
      <ul class="experience-list">
        ${details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join("")}
      </ul>
    `;
  }

  return `<p>${escapeHtml(details)}</p>`;
}

function renderFeaturedProjects() {
  const list = get("#featuredProjects");
  list.innerHTML = (config.featuredProjects || [])
    .map(
      (project) => `
        <article class="project-card">
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.description)}</p>
          ${renderProjectHighlights(project.highlights)}
          ${
            project.tools
              ? `<div class="project-tools"><strong>Tools</strong><div class="tag-list">${tagList(project.tools)}</div></div>`
              : ""
          }
          <div class="card-links">
            ${project.github ? `<a href="${project.github}" target="_blank" rel="noreferrer">GitHub</a>` : ""}
            ${project.source ? `<a href="${project.source}">Notebook</a>` : ""}
            ${project.live ? `<a href="${project.live}" target="_blank" rel="noreferrer">Live</a>` : ""}
          </div>
        </article>
      `
    )
    .join("");
}

function renderProjectHighlights(highlights) {
  if (!Array.isArray(highlights) || !highlights.length) {
    return "";
  }

  return `
    <div class="project-results">
      <strong>Key results</strong>
      <ul>
        ${highlights.map((highlight) => `<li>${escapeHtml(highlight)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function setupCheckIns() {
  setupVisitorVisibility();

  const form = get("#checkInForm");
  const note = get("#formNote");
  const visitorList = get("#visitorList");
  const key = "portfolio-checkins";

  const readCheckIns = () => JSON.parse(localStorage.getItem(key) || "[]");
  const writeCheckIns = (items) => localStorage.setItem(key, JSON.stringify(items));

  function render() {
    const items = readCheckIns();
    if (!items.length) {
      visitorList.innerHTML = "";
      return;
    }
    visitorList.innerHTML = items
      .slice(0, 8)
      .map(
        (item) => `
          <div class="visitor-card">
            <strong>${escapeHtml(item.name)}</strong>
            <span>${escapeHtml(item.company || "Visitor")} | ${escapeHtml(item.date)}</span>
            ${item.message ? `<p>${escapeHtml(item.message)}</p>` : ""}
          </div>
        `
      )
      .join("");
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const checkIn = {
      name: data.name.trim(),
      company: data.company.trim(),
      message: data.message.trim(),
      date: new Date().toLocaleString()
    };

    if (!checkIn.name) {
      return;
    }

    if (config.checkInEndpoint) {
      await fetch(config.checkInEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkIn)
      });
    }

    writeCheckIns([checkIn, ...readCheckIns()].slice(0, 40));
    form.reset();
    note.textContent = "Thanks. Your check-in was recorded.";
    render();
  });

  render();
}

function setupVisitorVisibility() {
  const section = get("#visitors");
  if (!section) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const showVisitors = window.location.hash === "#visitors" || params.get("admin") === "1";
  section.hidden = !showVisitors;
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return entities[character];
  });
}

setTextBindings();
renderSkills();
renderExperience();
renderFeaturedProjects();
setupCheckIns();

function normalizeGitHubUsername(value = "") {
  return String(value)
    .trim()
    .replace(/^https?:\/\/github\.com\//i, "")
    .replace(/^github\.com\//i, "")
    .replace(/^@/, "")
    .split("/")[0];
}
