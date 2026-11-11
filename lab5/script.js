"use strict";

/* ============================================================
   Лабораторна 5. Ajax-взаємодія з сервером (fetch + JSON)
   Усі маніпуляції з контентом відбуваються на одній сторінці.
   ============================================================ */

const DATA_DIR = "data/";
const CATEGORIES_URL = DATA_DIR + "categories.json";
const CURRENCY = "₴";

const content = document.getElementById("content");
const navCatalog = document.getElementById("nav-catalog");

// Лічильник запитів: відповідь застарілого запиту не перезапише новіший вміст
let lastRequestId = 0;

/* ---------- Ajax-запит ---------- */

async function loadJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("HTTP " + response.status + " " + response.statusText + " (" + url + ")");
  }
  return response.json();
}

/* ---------- Допоміжні функції для DOM ---------- */

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (key === "text") node.textContent = value;
    else if (key === "dataset") Object.assign(node.dataset, value);
    else node.setAttribute(key, value);
  }
  node.append(...children);
  return node;
}

function actionLink(text, dataset, className = "") {
  const attrs = { href: "#", dataset, text };
  if (className) attrs.class = className;
  return el("a", attrs);
}

function setContent(...nodes) {
  content.replaceChildren(...nodes);
}

function setActiveNav(isCatalog) {
  navCatalog.classList.toggle("active", isCatalog);
}

function showLoading() {
  setContent(el("p", { class: "status", text: "Завантаження…" }));
}

function showError(error) {
  console.error(error);
  setContent(
    el("div", { class: "error" },
      el("strong", { text: "Не вдалося завантажити дані. " }),
      document.createTextNode(error.message),
      el("p", { text: "Якщо сторінку відкрито через file://, запустіть її через локальний сервер (Live Server) або GitHub Pages." })
    )
  );
}

/* ---------- Відображення ---------- */

function renderCategoryList(categories) {
  const list = el("ul", { class: "category-list" });
  for (const category of categories) {
    const item = el("li", {}, actionLink(category.name, { action: "category", shortname: category.shortname }));
    if (category.notes) item.append(el("span", { class: "notes", text: category.notes }));
    list.append(item);
  }
  // Посилання Specials — після переліку категорій
  const specials = actionLink("Specials", { action: "specials" }, "specials-link");
  return [list, el("p", {}, specials)];
}

function renderCategory(data, titlePrefix = "") {
  const products = el("div", { class: "products" });
  for (const item of data.items) {
    const img = el("img", {
      src: "https://placehold.co/200x200/png?text=" + encodeURIComponent(item.shortname),
      alt: item.name,
      width: "200",
      height: "200",
      loading: "lazy"
    });
    products.append(
      el("article", { class: "product" },
        img,
        el("div", {},
          el("h3", { text: item.name }),
          el("p", { text: item.description }),
          el("span", { class: "price", text: item.price.toLocaleString("uk-UA") + " " + CURRENCY })
        )
      )
    );
  }
  return [
    el("h2", { text: titlePrefix + data.category }),
    products,
    actionLink("← До каталогу", { action: "catalog" }, "back-link")
  ];
}

/* ---------- Сценарії (виклики Ajax) ---------- */

async function showHome() {
  const requestId = ++lastRequestId;
  setActiveNav(false);
  const hero = el("section", { class: "hero" },
    el("h1", { text: "Ласкаво просимо до TechShop!" }),
    el("p", { text: "Це односторінковий застосунок: каталог завантажується з JSON-файлів за допомогою Ajax без перезавантаження сторінки." })
  );
  const catalogBox = el("section", {}, el("p", { class: "status", text: "Завантаження каталогу…" }));
  setContent(hero, catalogBox);
  try {
    const categories = await loadJSON(CATEGORIES_URL);
    if (requestId !== lastRequestId) return;
    catalogBox.replaceChildren(el("h2", { text: "Категорії" }), ...renderCategoryList(categories));
  } catch (error) {
    if (requestId === lastRequestId) showError(error);
  }
}

async function showCatalog() {
  const requestId = ++lastRequestId;
  setActiveNav(true);
  showLoading();
  try {
    const categories = await loadJSON(CATEGORIES_URL);
    if (requestId !== lastRequestId) return;
    setContent(el("h2", { text: "Каталог" }), ...renderCategoryList(categories));
  } catch (error) {
    if (requestId === lastRequestId) showError(error);
  }
}

async function showCategory(shortname, titlePrefix = "") {
  const requestId = ++lastRequestId;
  setActiveNav(true);
  showLoading();
  try {
    const data = await loadJSON(DATA_DIR + shortname + ".json");
    if (requestId !== lastRequestId) return;
    setContent(...renderCategory(data, titlePrefix));
  } catch (error) {
    if (requestId === lastRequestId) showError(error);
  }
}

async function showSpecials() {
  const requestId = ++lastRequestId;
  setActiveNav(true);
  showLoading();
  try {
    const categories = await loadJSON(CATEGORIES_URL);
    // Випадковий вибір категорії за допомогою Math.random()
    const randomIndex = Math.floor(Math.random() * categories.length);
    const randomCategory = categories[randomIndex];
    const data = await loadJSON(DATA_DIR + randomCategory.shortname + ".json");
    if (requestId !== lastRequestId) return;
    setContent(...renderCategory(data, "Specials: "));
  } catch (error) {
    if (requestId === lastRequestId) showError(error);
  }
}

/* ---------- Обробка кліків (делегування подій) ---------- */

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-action]");
  if (!link) return;
  event.preventDefault(); // не переходимо за href="#" і не перезавантажуємо сторінку

  switch (link.dataset.action) {
    case "catalog":  showCatalog(); break;
    case "category": showCategory(link.dataset.shortname); break;
    case "specials": showSpecials(); break;
  }
});

/* ---------- Старт ---------- */

showHome();
