import {
  searchClients,
  searchResult,
  animationClasses,
  clearInputBtn,
} from "../_vars.js";
import { fetchApiGetClientsQuery } from "../api/fetchApiGetClients.js";

/**
 * Функция для предотвращения вызова функции несколько раз за короткий период времени
 *
 * @param {Function} func - Функция, которую необходимо ограничить.
 * @param {number} wait - Время в миллисекундах, которое нужно подождать между вызовами.
 * @returns {Function} - Декорированная функция, которая ограничена по времени вызова.
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      if (searchClients.value.trim()) {
        func(...args);
      } else {
        clearSearchInput();
      }
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Функция-обработчик события ввода текста в поле поиска.
 * Выполняет дебаунсированный запрос на получение клиентов.
 *
 * @param {Event} event - Событие ввода текста в поле поиска.
 * @returns {void} - Не возвращает значение
 */
function handleSearchInput(event) {
  const debouncedFetch = debounce((searchQuery) => {
    if (searchQuery) {
      fetchApiGetClientsQuery(searchQuery).then(renderAutocompleteResults);
      clearInputBtn.style.display = "block";
    } else {
      renderAutocompleteResults([]);
      clearSearchInput();
    }
  }, 1000);

  const currentQuery = event.target.value.trim();
  if (event.key === "Backspace" && currentQuery.length === 0) {
    return;
  }
  if (event.key === "Backspace" && currentQuery.length > 0) {
    debouncedFetch(currentQuery);
    return;
  }
  debouncedFetch(currentQuery);
}

/**
 * Функция для очистки поля поиска и результатов поиска.
 *
 * @returns {void} - Не возвращает значение
 */
function clearSearchInput() {
  searchClients.value = "";
  searchResult.innerHTML = "";
  searchResult.style.padding = "0px";
  searchResult.classList.remove(animationClasses.fadeIn);
  searchResult.classList.add(animationClasses.fadeOut);
  setTimeout(() => {
    searchResult.classList.remove(animationClasses.fadeOut);
  }, 500);
  clearInputBtn.style.display = "none";
}

/**
 * Функция для вывода результатов поиска по списку клиентов.
 *
 * @param {Array} clients - Массив объектов клиентов.
 * @returns {void} - Не возвращает значение
 */
function renderAutocompleteResults(clients) {
  searchResult.innerHTML = "";
  searchResult.style.padding = "20px";

  const title = document.createElement("h2");
  title.classList.add("header__result-search-title", "title");
  title.textContent = "Найденные результаты по вашему запросу:";

  const listClients = document.createElement("ul");
  listClients.classList.add("header__result-search-list", "list-reset");

  const noResultsMessage = document.createElement("p");
  noResultsMessage.classList.add("header__result-search-not-found");

  if (clients.length === 0) {
    noResultsMessage.textContent = "Клиенты не найдены.";
    searchResult.appendChild(title);
    searchResult.appendChild(noResultsMessage);
  } else {
    searchResult.classList.add(animationClasses.fadeIn);
    clients.forEach((client, index) => {
      const itemClient = document.createElement("li");
      itemClient.classList.add("header__result-search-item");
      const itemSpanClient = document.createElement("span");
      itemSpanClient.classList.add("header__result-search-item-id");
      itemSpanClient.textContent = `${index + 1}:`;
      itemClient.textContent = `${client.name} ${client.surname}`;
      itemClient.insertBefore(itemSpanClient, itemClient.firstChild);
      listClients.appendChild(itemClient);
    });
    searchResult.appendChild(title);
    searchResult.appendChild(listClients);
  }
}

export { renderAutocompleteResults, clearSearchInput, handleSearchInput };
