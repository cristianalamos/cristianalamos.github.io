// Light/dark toggle: light by default; the visitor's choice is remembered.
const toggle = document.querySelector("[data-theme-toggle]");

function storedTheme() {
  try {
    const theme = localStorage.getItem("theme");
    return theme === "light" || theme === "dark" ? theme : null;
  } catch (error) {
    return null;
  }
}

function activeTheme() {
  return storedTheme() || "light";
}

function refreshToggle() {
  const isDark = activeTheme() === "dark";
  const label = `Switch to ${isDark ? "light" : "dark"} mode`;
  toggle.classList.toggle("is-dark", isDark);
  toggle.setAttribute("aria-label", label);
  toggle.title = label;
}

if (toggle) {
  refreshToggle();
  toggle.addEventListener("click", () => {
    const next = activeTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch (error) {}
    refreshToggle();
  });
}

// Fade sections in as they scroll into view.
const sections = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("in"), i * 90);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  sections.forEach((el) => observer.observe(el));
  document.documentElement.classList.add("reveal-motion");
}

// "Abstract" text buttons toggle the same dropdown as the magnifier.
document.querySelectorAll("[data-toggle-details]").forEach((button) => {
  const details = button.closest(".paper-entry").querySelector(".paper-details");
  const sync = () => button.setAttribute("aria-expanded", String(details.open));
  sync();
  button.addEventListener("click", () => {
    details.open = !details.open;
  });
  details.addEventListener("toggle", sync);
});
