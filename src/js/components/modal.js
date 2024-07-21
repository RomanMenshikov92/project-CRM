import {
  modalWindow,
  modalConfirmDelete,
  openModalBtn,
  closeModalBtn,
  closeModalConfirmBtn,
} from "../_vars.js";
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

/**
 * Обработчик события "click" для закрытия модального окна при клике вне его содержимого.
 *
 * @function
 * @listens click
 * @see {@link closeModal}
 */
modalWindow.addEventListener("click", (event) => {
  if (event.target === modalWindow) {
    closeModal();
  }
});

/**
 * Обработчик события "click" для закрытия модального окна с подтверждением при клике вне его содержимого.
 *
 * @function
 * @listens click
 * @see {@link closeModalConfirm}
 */
modalConfirmDelete.addEventListener("click", (event) => {
  if (event.target === modalWindow) {
    closeModalConfirm();
  }
});
