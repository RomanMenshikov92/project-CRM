import { openModalBtn, closeModalBtn, closeModalConfirmBtn } from "../_vars.js";
import {
  openModal,
  closeModal,
  closeModalConfirm,
} from "../functions/openModal.js";

/**
 * Обработчик события "click" для кнопки открытия модального окна.
 *
 * @function
 * @listens click
 * @see {@link openModal}
 */
openModalBtn.addEventListener("click", openModal);

/**
 * Обработчик события "click" для кнопки закрытия модального окна.
 *
 * @function
 * @listens click
 * @see {@link closeModal}
 */
closeModalBtn.addEventListener("click", closeModal);

/**
 * Обработчик события "click" для кнопки закрытия модального окна с подтверждением.
 *
 * @function
 * @listens click
 * @see {@link closeModalConfirm}
 */
closeModalConfirmBtn.addEventListener("click", closeModalConfirm);
