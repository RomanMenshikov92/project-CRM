import { fetchApiGetClients } from "../api/fetchApiGetClients.js";

/**
 * Обработчик события "DOMContentLoaded", который вызывает функцию fetchApiGetClients после загрузки страницы.
 * @function
 * @listens DOMContentLoaded
 * @see {@link fetchApiGetClients}
 */
document.addEventListener("DOMContentLoaded", async () => {
  await fetchApiGetClients();
});
