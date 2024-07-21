import { apiClientsUrl, messages } from "../_vars.js";

/**
 * Асинхронная функция для редактирования существующего клиента на сервере.
 *
 * @async
 * @function fetchApiUpdateClient
 * @param {string} clientId - Идентификатор клиента, который нужно обновить.
 * @param {Object} updatedClient - Объект с обновленными данными клиента.
 * @returns {Promise<Object>} - Объект, содержащий информацию о результате выполнения:
 *  - success {boolean} - Успешность операции.
 *  - errors {Array<string>} - Массив ошибок, если операция не была успешной.
 */
export async function fetchApiUpdateClient(clientId, updatedClient) {
  try {
    const response = await fetch(`${apiClientsUrl}/${clientId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedClient),
    });
    if (response.ok) {
      console.log(`Клиент с ID ${clientId} успешно обновлен.`);
      return { success: true };
    } else {
      console.error(`${messages.errorUpdateClient}: ${response.status}`);
      return { success: false, errors: [messages.errorUpdateClient] };
    }
  } catch (error) {
    console.error(`${messages.errorPostDataToServer}: ${error}`);
    return { success: false, errors: [messages.errorPostDataToServer] };
  }
}
