import { modalWindow, clientForm, modalConfirmDelete } from "../_vars.js";
import {
  removeErrorContainer,
  resetErrorStyles,
  setDisabledSaveForm,
} from "../functions/handleSaveForm.js";
import { clearContacts } from "../functions/handleAddContact.js";

/**
 * Функция для открытия модального окна
 *
 * @returns {void} - Не возвращает значение
 */
function openModal() {
  modalWindow.classList.add("modal--open");
}

/**
 * Функция для закрытия модального окна
 *
 * @returns {void} - Не возвращает значение
 */
function closeModal() {
  modalWindow.classList.remove("modal--open");
  clientForm.reset();
  removeErrorContainer();
  resetErrorStyles();
  clearContacts();
  setDisabledSaveForm(false);

  const titleEdit = document.querySelector(".modal__title");
  const btnSaveHidden = document.querySelector(".modal__form-btn-save");
  const btnEditClient = document.querySelector(".modal__form-btn-save-edit");
  const btnCancelHidden = document.querySelector(".modal__form-btn-cancel");
  const btnDeleteClient = document.querySelector(".modal__form-btn-delete");
  const idClientForm = document.querySelector(".modal__title-span-id");

  setTimeout(() => {
    titleEdit && (titleEdit.textContent = "Новый клиент");
    btnSaveHidden && (btnSaveHidden.style.display = "block");
    btnCancelHidden && (btnCancelHidden.style.display = "block");
    btnEditClient && btnEditClient.remove();
    btnDeleteClient && btnDeleteClient.remove();
    idClientForm && idClientForm.remove();
  }, 1000);
}

/**
 * Функция для открытия модального окна с подтверждением удаления клиента.
 *
 * @param {string} clientId - ID клиента, который нужно удалить.
 * @returns {void} - Не возвращает значение
 */
function openModalConfirm(clientId) {
  modalConfirmDelete.dataset.clientId = clientId;
  modalConfirmDelete.classList.add("modal--open");
}

/**
 * Функция для закрытия модального окна с подтверждением удаления клиента
 *
 * @returns {void} - Не возвращает значение
 */
function closeModalConfirm() {
  modalConfirmDelete.classList.remove("modal--open");
}

export { openModal, closeModal, openModalConfirm, closeModalConfirm };
