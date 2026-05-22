const config = window.PORTFOLIO_CONFIG || {};

const get = (selector) => document.querySelector(selector);
const getAll = (selector) => Array.from(document.querySelectorAll(selector));

function setTextBindings() {
  document.title = `${config.name || "Resume Portfolio"} | Portfolio`;
  getAll("[data-bind]").forEach((element) => {
    const key = element.dataset.bind;
    if (config[key]) {
      element.textContent = config[key];
    }
  });

  getAll("[data-bind-href]").forEach((element) => {
    const type = element.dataset.bindHref;
    const urls = {
      github: config.githubUsername
        ? `https://github.com/${config.githubUsername}`
        : "#github",
      linkedin: config.linkedinUrl || "#",
      email: config.email ? `mailto:${config.email}` : "#"
    };
    element.href = urls[type] || "#";
  });
}

function tagList(tags) {
  return (tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
}

function renderSkills() {
  get("#skillsList").innerHTML = tagList(config.skills || []);
}

function renderExperience() {
  const list = get("#experienceList");
  list.innerHTML = (config.experience || [])
    .map(
      (item) => `
        <div class="experience-item">
          <h3>${escapeHtml(item.title)}</h3>
          <p><strong>${escapeHtml(item.company)}</strong> | ${escapeHtml(item.period)}</p>
          <p>${escapeHtml(item.details)}</p>
        </div>
      `
    )
    .join("");
}

function renderFeaturedProjects() {
  const list = get("#featuredProjects");
  list.innerHTML = (config.featuredProjects || [])
    .map(
      (project) => `
        <article class="project-card">
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.description)}</p>
          <div class="tag-list">${tagList(project.tags)}</div>
          <div class="card-links">
            ${project.source ? `<a href="${project.source}">Source</a>` : ""}
            ${project.live ? `<a href="${project.live}">Live</a>` : ""}
          </div>
        </article>
      `
    )
    .join("");
}

async function loadGitHubRepos() {
  const username = config.githubUsername;
  const repoList = get("#repoList");
  const repoStatus = get("#repoStatus");

  if (!username || username === "your-github-username") {
    repoStatus.textContent = "Add your GitHub username in config.js to load repositories.";
    repoList.innerHTML = "";
    return;
  }

  repoStatus.textContent = "Loading GitHub repositories...";

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=6`
    );
    if (!response.ok) {
      throw new Error("GitHub request failed");
    }
    const repos = await response.json();
    repoStatus.textContent = `${repos.length} recent repositories from @${username}`;
    repoList.innerHTML = repos.map(renderRepoCard).join("");
  } catch (error) {
    repoStatus.textContent =
      "Could not load GitHub repositories. Check the username or network connection.";
    repoList.innerHTML = "";
  }
}

function renderRepoCard(repo) {
  const description = repo.description || "No description added yet.";
  const language = repo.language || "Code";
  return `
    <article class="repo-card">
      <h3>${escapeHtml(repo.name)}</h3>
      <p>${escapeHtml(description)}</p>
      <div class="repo-meta">
        <span>${escapeHtml(language)}</span>
        <span>${repo.stargazers_count} stars</span>
        <span>${repo.forks_count} forks</span>
      </div>
      <div class="card-links">
        <a href="${repo.html_url}" target="_blank" rel="noreferrer">Repository</a>
        ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noreferrer">Live</a>` : ""}
      </div>
    </article>
  `;
}

function setupCheckIns() {
  const form = get("#checkInForm");
  const note = get("#formNote");
  const visitorList = get("#visitorList");
  const key = "portfolio-checkins";

  const readCheckIns = () => JSON.parse(localStorage.getItem(key) || "[]");
  const writeCheckIns = (items) => localStorage.setItem(key, JSON.stringify(items));

  function render() {
    const items = readCheckIns();
    if (!items.length) {
      visitorList.innerHTML =
        '<p class="form-note">No check-ins yet. Published sites can send these to your email or database.</p>';
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
loadGitHubRepos();
setupCheckIns();
