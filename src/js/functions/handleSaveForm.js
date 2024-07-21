import { fetchApiPostClient } from "../api/fetchApiPostClient.js";
import { fetchApiGetClients } from "../api/fetchApiGetClients.js";
import { closeModal } from "../functions/openModal.js";
import {
  clientForm,
  messages,
  styles,
  animationClasses,
  saveFormBtn,
} from "../_vars.js";
import { loadingIndicatorActions } from "../functions/loadingIndicator.js";
import {
  handleSorting,
  resetHeaderStyles,
} from "../functions/handleHeaderSorting.js";

/**
 * Асинхронная функция-обработчик для клика по кнопке сохранения формы
 *
 * @async
 * @function handleSaveForm
 * @param {Event} e - Событие клика на кнопке сохранения формы
 * @returns {Promise<void>} - Асинхронная функция, возвращающая Promise
 */
async function handleSaveForm(e) {
  e.preventDefault();

  const saveButton = e.target;
  const originalSaveButtonHtml = saveButton.innerHTML;

  loadingIndicatorActions(null, null, saveButton, null, null);
  setDisabledState(true);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { errors, contacts, firstname, surname, lastname } =
    validateFormAndCollectErrors();

  const newClient = {
    name: firstname,
    surname: surname,
    lastName: lastname,
    contacts: contacts,
  };

  if (errors.length > 0) {
    saveButton.innerHTML = originalSaveButtonHtml;
    displayErrors(errors);
    setDisabledState(false);
    setDisabledSaveForm(true);
    return;
  }

  try {
    await createClientData(newClient, saveButton, originalSaveButtonHtml);
    setDisabledState(false);
    setDisabledSaveForm(false);
  } catch (error) {
    saveButton.innerHTML = originalSaveButtonHtml;
    displayErrors([error.message]);
    setDisabledState(false);
    setDisabledSaveForm(false);
  }
}

/**
 * Функция для валидации контактов.
 *
 * @param {HTMLElement[]} contactElements - Массив элементов контактов.
 * @returns {Object} - Объект с результатами валидации контактов.
 */
function validateContacts(contactElements) {
  let allContactsValid = true;
  const contacts = [];
  contactElements.forEach((contactElement) => {
    const selectOption = contactElement.querySelector("select").value.trim();
    const selectValue = contactElement.querySelector("input").value.trim();
    const inputElement = contactElement.querySelector("input");
    if (selectOption && selectValue) {
      contacts.push({
        type: selectOption,
        value: selectValue,
      });
    } else {
      allContactsValid = false;
      inputElement.style.borderColor = styles.errorBorderColor;
    }
  });
  return { allContactsValid, contacts };
}

/**
 * Функция для отображения ошибок.
 *
 * @param {string[]} errors - Массив ошибок.
 * @returns {void}
 */
function displayErrors(errors) {
  const errorContainer =
    document.querySelector(".modal__form-error") ||
    document.createElement("ul");
  errorContainer.innerHTML = "";
  errorContainer.classList.add("modal__form-error", "list-reset");
  errors.forEach((error) => {
    const errorItem = document.createElement("li");
    errorItem.className = "modal__form-error-item";
    errorItem.textContent = error;
    errorContainer.appendChild(errorItem);
  });
  if (!document.querySelector(".modal__form-error")) {
    const formWrapperBtnElement = document.querySelector(
      ".modal__form-wrapper-btn"
    );
    clientForm.insertBefore(errorContainer, formWrapperBtnElement);
    errorContainer.classList.add(animationClasses.fadeIn);
  }
}

/**
 * Функция для удаления контейнера с ошибками.
 *
 * @returns {void}
 */
function removeErrorContainer() {
  const errorContainer = document.querySelector(".modal__form-error");
  if (errorContainer) {
    errorContainer.classList.add(animationClasses.fadeOut);
    errorContainer.addEventListener("animationend", () => {
      errorContainer.remove();
    });
  }
}

/**
 * Функция для сброса стилей ошибок.
 *
 * @returns {void}
 */
function resetErrorStyles() {
  document.getElementById("surname").style.borderColor =
    styles.defaultBorderColor;
  document.getElementById("firstname").style.borderColor =
    styles.defaultBorderColor;
  const contactElements = document.querySelectorAll(
    ".modal__form-add-wrapper-item"
  );
  contactElements.forEach((contactElement) => {
    const inputElement = contactElement.querySelector("input");
    inputElement.style.borderColor = styles.defaultBorderColor;
  });
}

/**
 * Функция для установки слушателей на поля ввода для удаления контейнера с ошибками.
 *
 * @returns {void}
 */
function setListenersToInputFields() {
  const inputElements = clientForm.querySelectorAll("input, select");
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      removeErrorContainer();
      resetErrorStyles();
      setDisabledSaveForm(false);
    });
  });
}

/**
 * Функция для проверки формы и сбора ошибок.
 *
 * @returns {Object} - Объект с результатами валидации формы.
 */
function validateFormAndCollectErrors() {
  const lastname = document.getElementById("lastname").value.trim();
  const firstname = document.getElementById("firstname").value.trim();
  const surname = document.getElementById("surname").value.trim();
  const contactElements = document.querySelectorAll(
    ".modal__form-add-wrapper-item"
  );

  const { allContactsValid, contacts } = validateContacts(contactElements);

  const errors = [];
  if (!surname) {
    errors.push(messages.missingSurname);
    document.getElementById("surname").style.borderColor =
      styles.errorBorderColor;
  }
  if (!firstname) {
    errors.push(messages.missingFirstname);
    document.getElementById("firstname").style.borderColor =
      styles.errorBorderColor;
  }
  if (!allContactsValid) {
    errors.push(messages.incompleteContacts);
  }

  setListenersToInputFields();

  if (errors.length === 0) {
    setDisabledSaveForm(false);
  }

  return { errors, contacts, firstname, surname, lastname };
}

/**
 * Функция для установки атрибуты disabled для сохранение формы.
 *
 * @param {boolean} isDisabled - Флаг, указывающий, нужно ли отключить кнопку сохранения формы.
 * @returns {void}
 */
function setDisabledSaveForm(isDisabled) {
  if (saveFormBtn) {
    saveFormBtn.disabled = isDisabled;
  }
  const saveFormEditBtn = document.getElementById("saveFormEdit");
  if (saveFormEditBtn) {
    saveFormEditBtn.disabled = isDisabled;
  }
}

/**
 * Функция для установки атрибута disabled для всех элементов input и select.
 *
 * @param {boolean} isDisabled - Флаг, указывающий, нужно ли отключить элементы формы.
 * @returns {void}
 */
function setDisabledState(isDisabled) {
  const inputElements = document.querySelectorAll(
    ".modal__form-wrapper-input, .modal__form-add-wrapper-input"
  );
  const selectElements = document.querySelectorAll(
    ".modal__form-add-wrapper-item"
  );

  const btnAddContactsElement = document.querySelectorAll(
    ".modal__form-add-btn"
  );

  const btnDeleteElement = document.querySelectorAll(".modal__form-btn-delete");

  const btnCancelElement = document.querySelectorAll(".modal__form-btn-cancel");

  inputElements.forEach((input) => {
    input.disabled = isDisabled;
  });

  selectElements.forEach((select) => {
    if (isDisabled) {
      select.classList.add("modal__form-add-wrapper-item--disabled");
    } else {
      select.classList.remove("modal__form-add-wrapper-item--disabled");
    }
  });

  btnAddContactsElement.forEach((btnAddContact) => {
    btnAddContact.disabled = isDisabled;
  });

  btnDeleteElement.forEach((btnDelete) => {
    btnDelete.disabled = isDisabled;
  });

  btnCancelElement.forEach((btnCancel) => {
    btnCancel.disabled = isDisabled;
  });
}

/**
 * Асинхронная функция для отправки запроса на сервер и получение полного списка.
 *
 * @async
 * @function createClientData
 * @param {Object} newClient - Объект с данными нового клиента.
 * @param {HTMLElement} saveButton - Кнопка сохранения формы.
 * @param {string} originalSaveButtonHtml - Исходный HTML-код кнопки сохранения формы.
 * @returns {Promise<void>} - Асинхронная функция, возвращающая Promise.
 */
async function createClientData(newClient, saveButton, originalSaveButtonHtml) {
  try {
    const [resultCreate] = await Promise.all([
      fetchApiPostClient(newClient),
      new Promise((resolve) => setTimeout(resolve, 1000)),
    ]);

    saveButton.innerHTML = originalSaveButtonHtml;

    if (resultCreate.success) {
      closeModal();
      const createdClients = await fetchApiGetClients();
      resetHeaderStyles();
      await handleSorting(createdClients);
    } else {
      displayErrors([messages.errorPostAddClient]);
    }
  } catch (error) {
    saveButton.innerHTML = originalSaveButtonHtml;
    throw new Error("Ошибка при создании данных клиента.");
  }
}

export {
  handleSaveForm,
  removeErrorContainer,
  resetErrorStyles,
  displayErrors,
  setListenersToInputFields,
  validateContacts,
  validateFormAndCollectErrors,
  setDisabledState,
  setDisabledSaveForm,
};
