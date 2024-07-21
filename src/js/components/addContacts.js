import { addContactBtn } from "../_vars.js";
import { handleAddContact } from "../functions/handleAddContact.js";

/**
 * Обработчик события "click" для кнопки добавления контакта
 *
 * @function
 * @listens click
 * @see {@link handleAddContact}
 */
addContactBtn.addEventListener("click", handleAddContact);
