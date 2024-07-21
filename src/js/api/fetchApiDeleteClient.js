import { apiClientsUrl, messages } from "../_vars.js";

/**
 * Асинхронная функция для удаления клиента из базы данных на сервере.
 *
 * @async
 * @function fetchApiDeleteClient
 * @param {string} clientId - Идентификатор клиента, который необходимо удалить.
 * @returns {Promise<Object>} - Объект, содержащий информацию о результате выполнения:
 *  - success {boolean} - Успешность операции.
 *  - errors {Array<string>} - Массив ошибок, если операция не была успешной.
 */
export async function fetchApiDeleteClient(clientId) {
  try {
    const response = await fetch(`${apiClientsUrl}/${clientId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log(`Клиент с ID ${clientId} успешно удален.`);
      return { success: true };
    } else {
      console.error(`${messages.errorDeleteClient}: ${response.status}`);
      return { success: false, errors: [messages.errorUpdateClient] };
    }
  } catch (error) {
    console.error(`${messages.errorPostDataToServer}: ${error}`);
    return { success: false, errors: [messages.errorPostDataToServer] };
  }
}
