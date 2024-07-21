import { apiClientsUrl, messages } from "../_vars.js";

/**
 * Асинхронная функция для отправки данных нового клиента на сервер.
 *
 * @async
 * @function fetchApiPostClient
 * @param {Object} client - Объект с данными клиента.
 * @returns {Promise<Object>} - Объект, содержащий информацию о результате выполнения:
 *  - success {boolean} - Успешность операции.
 *  - errors {Array<string>} - Массив ошибок, если операция не была успешной.
 */
export async function fetchApiPostClient(client) {
  try {
    const response = await fetch(`${apiClientsUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    });
    const data = await response.json();
    if (response.ok) {
      console.log(`${client.name} - ${messages.successAddClient}`);
      return { success: true };
    } else {
      console.error(`${messages.errorPostAddClient}: ${response.status}`);
      return {
        success: false,
        errors: data.errors || [messages.errorFromServerUndefined],
      };
    }
  } catch (error) {
    console.error(`${messages.errorPostDataToServer}: ${error}`);
    return { success: false, errors: [messages.errorFromServerUndefined] };
  }
}
