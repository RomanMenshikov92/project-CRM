import { apiClientsUrl, messages, loader, loaderHeader } from "../_vars.js";
import { renderClientsTable } from "../functions/renderClientsTable.js";
import { renderAutocompleteResults } from "../functions/handleSearch.js";
import {
  loadingIndicator,
  loadingIndicatorSearch,
} from "../functions/loadingIndicator.js";
import { handleSorting } from "../functions/handleHeaderSorting.js";

/**
 * Асинхронная функция для получения списка клиентов из сервера
 *
 * @async
 * @function fetchApiGetClients
 * @param {Object} client - Объект с данными клиента.
 * @returns {Promise<Array<Object>|null>} - Массив клиентов, если операция была успешной. Возвращает null, если операция не была успешной.
 */
export async function fetchApiGetClients() {
  loadingIndicator();
  try {
    const response = await fetch(`${apiClientsUrl}`);
    if (response.ok) {
      const clients = await response.json();
      console.log(
        `Список клиентов: ${clients.length} - ${messages.successListClients}`
      );
      renderClientsTable(clients);
      await handleSorting(clients);
      return clients;
    } else {
      console.error(`${messages.errorGetAllClients}: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error(`${messages.errorGetDataToServer}: ${error}`);
    return null;
  } finally {
    if (loader) {
      loader.remove();
    }
  }
}

/**
 * Асинхронная функция для получения одного клиента из сервера.
 *
 * @async
 * @function fetchApiGetCurrentClient
 * @param {string} clientId - Идентификатор клиента, который необходимо получить.
 * @returns {Promise<Object|null>} - Данные клиента, если операция была успешной. Возвращает null, если операция не была успешной.
 */
export async function fetchApiGetCurrentClient(clientId) {
  try {
    const response = await fetch(`${apiClientsUrl}/${clientId}`);
    if (response.ok) {
      const currentClient = await response.json();
      console.log(`Данные клиента с ID ${clientId} получены.`);
      return currentClient;
    } else {
      console.error(`${messages.errorGetCurrentClient}: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error(`${messages.errorGetDataToServer}: ${error}`);
    return null;
  }
}

/**
 * Асинхронная функция для получения списка клиентов по запросу поиска.
 *
 * @async
 * @function fetchApiGetClientsQuery
 * @param {string} [searchQuery=""] - Строка поискового запроса (необязательный параметр).
 * @returns {Promise<Array<Object>>} - Массив клиентов, соответствующих поисковому запросу, если операция была успешной. Возвращает пустой массив, если операция не была успешной.
 */
export async function fetchApiGetClientsQuery(searchQuery = "") {
  loadingIndicatorSearch();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const response = await fetch(
      `${apiClientsUrl}?search=${encodeURIComponent(searchQuery)}`
    );
    if (response.ok) {
      const clients = await response.json();
      console.log(
        `Список клиентов по запросу: ${clients.length} - ${messages.successListClients}`
      );
      if (clients) {
        renderAutocompleteResults(clients);
        loadingIndicatorSearch();
        if (loaderHeader) {
          loaderHeader.remove();
        }
        return clients;
      } else {
        return [];
      }
    } else {
      console.error(`${messages.errorGetAllClients}: ${response.status}`);
      return [];
    }
  } catch (error) {
    console.error(`${messages.errorGetDataToServer}: ${error}`);
    return [];
  }
}
