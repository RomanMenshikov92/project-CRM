import { confirmDeleteFormBtn, confirmCancelFormBtn } from "../_vars.js";
import { handleDeleteConfirmForm } from "../functions/handleDeleteConfirmForm.js";
import { closeModalConfirm } from "../functions/openModal.js";

/**
 * Обработчик события "click" для кнопки подтверждения удаления
 *
 * @function
 * @listens click
 * @see {@link handleDeleteConfirmForm}
 */
confirmDeleteFormBtn.addEventListener("click", handleDeleteConfirmForm);

/**
 * Обработчик события "click" для кнопки отмены удаления.
 *
 * @function
 * @listens click
 * @see {@link closeModalConfirm}
 */
confirmCancelFormBtn.addEventListener("click", closeModalConfirm);
