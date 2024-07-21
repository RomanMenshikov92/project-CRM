import { contactWrapper, saveFormBtn, messages, btnWrapper } from "../_vars.js";
import { openModalConfirm, closeModal } from "../functions/openModal.js";
import { handleAddContact } from "../functions/handleAddContact.js";
import { fetchApiUpdateClient } from "../api/fetchApiUpdateClient.js";
import { fetchApiGetClients } from "../api/fetchApiGetClients.js";
import {
  displayErrors,
  validateFormAndCollectErrors,
  setDisabledState,
  setDisabledSaveForm,
} from "./handleSaveForm.js";
import { loadingIndicatorActions } from "../functions/loadingIndicator.js";
import {
  handleSorting,
  resetHeaderStyles,
} from "../functions/handleHeaderSorting.js";

/**
 * Функция для обработки редактирования формы
 *
 * @param {Object} clientData - Объект с данными клиента.
 * @param {string} clientData.id - ID клиента
 * @param {string} clientData.surname - Фамилия клиента
 * @param {string} clientData.name - Имя клиента
 * @param {string} clientData.lastName - Отчество клиента
 * @param {Array<Object>} clientData.contacts - контакты клиента
 * @returns {void} - Не возвращает значение
 */
function handleEditForm(clientData) {
  setTitle("Изменить данные");
  setClientID(clientData.id);

  hideDefaultButtons();

  setClientDataInFormFields(clientData);

  const saveFormEditBtn = createAndAppendButton(
    btnWrapper,
    "saveFormEdit",
    ["modal__form-btn-save-edit", "btn-reset"],
    "Сохранить"
  );
  const btnDeleteClient = createAndAppendButton(
    btnWrapper,
    "",
    ["modal__form-btn-delete", "btn-reset"],
    "Удалить клиента"
  );

  addEventListeners(clientData, saveFormEditBtn, btnDeleteClient);
}

/**
 * Функция для изменения текста в заголовке
 *
 * @param {string} title - Новый заголовок
 * @returns {HTMLElement} - Элемент заголовка
 */
function setTitle(title) {
  const titleEdit = document.querySelector(".modal__title");
  titleEdit.textContent = title;
  return titleEdit;
}

/**
 * Функция для создания текста ID к заголовку
 *
 * @param {string} id - ID клиента
 * @returns {HTMLElement} - Элемент с ID клиента
 */
function setClientID(id) {
  const titleEdit = document.querySelector(".modal__title");
  const idClientForm = document.createElement("span");
  idClientForm.classList.add("modal__title-span-id");
  idClientForm.textContent = `ID: ${id}`;
  titleEdit.appendChild(idClientForm);
  return idClientForm;
}

/**
 * Функция для установки скрытия элементов
 *
 * @returns {void} - Не возвращает значение
 */
function hideDefaultButtons() {
  saveFormBtn.style.display = "none";
  const btnCancelHidden = document.querySelector(".modal__form-btn-cancel");
  btnCancelHidden.style.display = "none";
}

/**
 * Функция для ввода клиентских данных в поля формы
 *
 * @param {Object} clientData - Данные клиента
 * @param {string} clientData.surname - Фамилия клиента
 * @param {string} clientData.name - Имя клиента
 * @param {string} clientData.lastName - Отчество клиента
 * @param {Array<Object>} clientData.contacts - Контакты клиента
 * @returns {void} - Не возвращает значение
 */
function setClientDataInFormFields(clientData) {
  document.getElementById("surname").value = clientData.surname;
  document.getElementById("firstname").value = clientData.name;
  document.getElementById("lastname").value = clientData.lastName;
  contactWrapper.innerHTML = "";
  clientData.contacts.forEach((contact) => {
    handleAddContact(contact);
  });
}

/**
 * Функция для создания и добавления новой кнопки
 *
 * @param {HTMLElement} parent - Родительский элемент, в который будет добавлена кнопка
 * @param {string} id - ID кнопки
 * @param {string[]} classes - Классы, которые будут добавлены к кнопке
 * @param {string} textContent - Текст кнопки
 * @returns {HTMLButtonElement} - Созданная кнопка
 */
function createAndAppendButton(parent, id, classes, textContent) {
  let button = parent.querySelector(`.${classes[0]}`);
  if (button) {
    button.remove();
  }
  button = document.createElement("button");
  button.type = "button";
  button.id = id;
  button.classList.add(...classes);
  button.textContent = textContent;
  parent.appendChild(button);
  return button;
}

/**
 * Функция для добавления прослушивателей событий к кнопкам
 *
 * @param {Object} clientData - Данные клиента
 * @param {HTMLButtonElement} saveFormEditBtn - Кнопка сохранения формы
 * @param {HTMLButtonElement} btnDeleteClient - Кнопка удаления клиента
 * @returns {void} - Не возвращает значение
 */
function addEventListeners(clientData, saveFormEditBtn, btnDeleteClient) {
  btnDeleteClient.addEventListener("click", function () {
    openModalConfirm(clientData.id);
  });

  saveFormEditBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    const saveEditButton = e.target;
    const originalSaveEditButtonHtml = saveEditButton.innerHTML;
    loadingIndicatorActions(null, null, null, saveEditButton, null, null);
    setDisabledState(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { errors, contacts, firstname, surname, lastname } =
      validateFormAndCollectErrors();

    const updatedClientData = {
      ...clientData,
      name: firstname,
      surname: surname,
      lastName: lastname,
      contacts: contacts,
    };

    if (errors.length > 0) {
      saveEditButton.innerHTML = originalSaveEditButtonHtml;
      displayErrors(errors);
      setDisabledState(false);
      setDisabledSaveForm(true);
      return;
    }

    try {
      await updateClientData(
        updatedClientData,
        saveEditButton,
        originalSaveEditButtonHtml
      );
      setDisabledState(false);
      setDisabledSaveForm(false);
    } catch (error) {
      saveEditButton.innerHTML = originalSaveEditButtonHtml;
      displayErrors([error.message]);
      setDisabledState(false);
    }
  });
}

/**
 * Асинхронная функция для отправки запроса на сервер и получение полного списка
 *
 * @async
 * @function updateClientData
 * @param {Object} updatedClientData - Обновленные данные клиента
 * @param {HTMLButtonElement} saveEditButton - Кнопка сохранения формы
 * @param {string} originalSaveEditButtonHtml - Исходный HTML-код кнопки сохранения формы
 * @returns {Promise<void>} - не возвращает значение-промис
 */
async function updateClientData(
  updatedClientData,
  saveEditButton,
  originalSaveEditButtonHtml
) {
  try {
    const [resultEdit] = await Promise.all([
      await fetchApiUpdateClient(updatedClientData.id, updatedClientData),
      new Promise((resolve) => setTimeout(resolve, 1000)),
    ]);

    saveEditButton.innerHTML = originalSaveEditButtonHtml;

    if (resultEdit.success) {
      closeModal();
      const updatedClients = await fetchApiGetClients();
      resetHeaderStyles();
      await handleSorting(updatedClients);
    } else {
      displayErrors([messages.errorUpdateClient]);
    }
  } catch (error) {
    saveEditButton.innerHTML = originalSaveEditButtonHtml;
    throw new Error("Ошибка при изменении данных клиента.");
  }
}

export { handleEditForm };
