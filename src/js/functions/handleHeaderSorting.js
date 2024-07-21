import { idCol, idFullname, idDateCreation, idLatestChange } from "../_vars.js";
import { renderClientsTable } from "./renderClientsTable.js";

/**
 * Объект для отслеживания состояния сортировки
 *
 * @type {Object}
 * @property {string} id - Состояние сортировки по id
 * @property {string} fullname - Состояние сортировки по полному имени
 * @property {string} dateCreation - Состояние сортировки по дате создания
 * @property {string} latestChange - Состояние сортировки по дате последнего изменения
 */
const sortState = {
  id: "asc",
  fullname: "asc",
  dateCreation: "asc",
  latestChange: "asc",
};

/**
 * Функция для сортировки массива клиентов
 *
 * @param {Object[]} clients - Массив клиентов
 * @param {string} column - Колонка, по которой нужно отсортировать
 * @param {string} order - Порядок сортировки ('asc' или 'desc')
 * @returns {Object[]} - Отсортированный массив клиентов
 */
function sortClients(clients, column, order) {
  return clients.sort((a, b) => {
    let aValue = a[column];
    let bValue = b[column];

    if (column === "fullname") {
      aValue = `${a.name} ${a.surname} ${a.lastName}`.trim();
      bValue = `${b.name} ${b.surname} ${b.lastName}`.trim();
    } else if (column === "dateCreation") {
      aValue = new Date(a.createdAt);
      bValue = new Date(b.createdAt);
    } else if (column === "latestChange") {
      aValue = new Date(a.updatedAt);
      bValue = new Date(b.updatedAt);
    }

    if (aValue < bValue) {
      return order === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });
}

/**
 * Функция для обработки по клику на заголовки
 *
 * @param {string} column - Колонка, по которой нужно отсортировать
 * @param {Object[]} clients - Массив клиентов
 * @param {HTMLElement} element - Элемент заголовка, на который был совершен клик
 * @returns {Function} - Функция обработчик клика
 */
function handleHeaderClick(column, clients, element) {
  return function () {
    resetHeaderStyles();
    const newOrder = sortState[column] === "asc" ? "desc" : "asc";
    sortState[column] = newOrder;
    toggleSortIcon(element, newOrder);
    toggleHeaderTextColor(element);
    const sortedClients = sortClients(clients, column, newOrder);
    renderClientsTable(sortedClients, newOrder, column);
  };
}

/**
 * Функция для изменения иконки сортировки
 *
 * @param {HTMLElement} element - Элемент заголовка, на который был совершен клик
 * @param {string} order - Порядок сортировки ('asc' или 'desc')
 * @returns {void} - Не возвращает значение
 */
function toggleSortIcon(element, order) {
  const icon = element.querySelector(".listing__thead-th-icon");
  if (order === "desc") {
    icon.classList.add("listing__thead-th-icon--rotate");
  } else {
    icon.classList.remove("listing__thead-th-icon--rotate");
  }
}

/**
 * Функция для изменения цвета текста заголовка
 *
 * @param {HTMLElement} element - Элемент заголовка, на который был совершен клик
 * @returns {void} - Не возвращает значение
 */
function toggleHeaderTextColor(element) {
  const textElement = element.querySelector(".listing__thead-th-text");
  const iconElement = element.querySelector(".listing__thead-th-icon");

  textElement.style.color = "#9873ff";
  textElement.style.opacity = 1;
  iconElement.style.opacity = 1;
}

/**
 * Функция для сброса стилей заголовков
 *
 * @returns {void} - Не возвращает значение
 */
function resetHeaderStyles() {
  const headers = document.querySelectorAll(".listing__thead-th");
  headers.forEach((header) => {
    const icon = header.querySelector(".listing__thead-th-icon");
    const text = header.querySelector(".listing__thead-th-text");
    if (icon) {
      icon.classList.remove("listing__thead-th-icon--rotate");
    }
    if (text) {
      text.style.color = "";
      text.style.opacity = "";
    }
  });
}

/**
 * Функция для удаления старых обработчиков событий
 *
 * @param {Object[]} clients - Массив клиентов
 * @returns {void} - Не возвращает значение
 */
function removeEventListeners(clients) {
  idCol.removeEventListener("click", handleHeaderClick("id", clients, idCol));
  idFullname.removeEventListener(
    "click",
    handleHeaderClick("fullname", clients, idFullname)
  );
  idDateCreation.removeEventListener(
    "click",
    handleHeaderClick("dateCreation", clients, idDateCreation)
  );
  idLatestChange.removeEventListener(
    "click",
    handleHeaderClick("latestChange", clients, idLatestChange)
  );
}

/**
 * Функция для обновления обработчиков событий с новым массивом клиентов
 *
 * @param {Object[]} newClients - Новый массив клиентов
 * @returns {void} - Не возвращает значение
 */
function updateEventListeners(newClients) {
  removeEventListeners(newClients);
  idCol.addEventListener("click", handleHeaderClick("id", newClients, idCol));
  idFullname.addEventListener(
    "click",
    handleHeaderClick("fullname", newClients, idFullname)
  );
  idDateCreation.addEventListener(
    "click",
    handleHeaderClick("dateCreation", newClients, idDateCreation)
  );
  idLatestChange.addEventListener(
    "click",
    handleHeaderClick("latestChange", newClients, idLatestChange)
  );
}

/**
 * Асинхронная функция сортировки
 *
 * @async
 * @function handleSorting
 * @param {Object[]} clients - Массив клиентов
 * @returns {Promise<void>} - Асинхронная функция, возвращающая Promise
 */
async function handleSorting(clients) {
  toggleSortIcon(idCol, "asc");
  toggleSortIcon(idFullname, "asc");
  toggleSortIcon(idDateCreation, "asc");
  toggleSortIcon(idLatestChange, "asc");
  updateEventListeners(clients);
}

export { handleSorting, resetHeaderStyles };
