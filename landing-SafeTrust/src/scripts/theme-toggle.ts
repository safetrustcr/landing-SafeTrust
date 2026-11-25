type Theme = "light" | "dark" | "system";

const btn = document.getElementById("theme-toggle-btn") as HTMLButtonElement | null;
const dropdown = document.getElementById("theme-dropdown") as HTMLElement | null;

if (!btn || !dropdown) {
  throw new Error("Theme toggle elements were not found");
}

const toggleButton = btn;
const menu = dropdown;

function isTheme(value: string | null | undefined): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

function getTheme(): Theme {
  const stored = localStorage.getItem("theme");
  return isTheme(stored) ? stored : "system";
}

function setTheme(theme: Theme): void {
  localStorage.setItem("theme", theme);
  applyTheme(theme);
  updateActive(theme);
}

function applyTheme(theme: Theme): void {
  const dark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
}

function updateActive(theme: Theme): void {
  menu.querySelectorAll<HTMLElement>(".theme-option").forEach((opt) => {
    opt.classList.toggle("active", opt.dataset.theme === theme);
  });
}

function closeDropdown(): void {
  menu.classList.remove("open");
  toggleButton.setAttribute("aria-expanded", "false");
}

toggleButton.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = menu.classList.toggle("open");
  toggleButton.setAttribute("aria-expanded", String(isOpen));
});

menu.querySelectorAll<HTMLElement>(".theme-option").forEach((item) => {
  item.addEventListener("click", () => {
    const theme = item.dataset.theme;
    if (isTheme(theme)) {
      setTheme(theme);
    }
    closeDropdown();
  });
});

document.addEventListener("click", () => {
  if (menu.classList.contains("open")) {
    closeDropdown();
  }
});

const mq = window.matchMedia("(prefers-color-scheme: dark)");
mq.addEventListener("change", () => {
  if (getTheme() === "system") {
    applyTheme("system");
  }
});

applyTheme(getTheme());
updateActive(getTheme());
