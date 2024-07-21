import { saveFormBtn } from "../_vars.js";
import { handleSaveForm } from "../functions/handleSaveForm.js";

/**
 * Обработчик события "click" для кнопки сохранения формы.
 *
 * @function
 * @listens click
 * @see {@link handleSaveForm}
 */
saveFormBtn.addEventListener("click", handleSaveForm);
