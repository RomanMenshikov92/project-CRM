import {
  contactWrapper,
  formAdd,
  MAX_CONTACTS,
  styles,
  animationClasses,
} from "../_vars.js";
import { applyMask } from "../vendor/inputMask.js";
import {
  removeErrorContainer,
  resetErrorStyles,
  setDisabledSaveForm,
} from "../functions/handleSaveForm.js";

/**
 * Функция для обработки добавления нового контакта элемента
 *
 * @param {Object} contact - Объект с информацией о контакте.
 * @param {string} contact.type - Тип контакта.
 * @param {string} contact.value - Значение контакта.
 * @returns {void} - Не возвращает значение
 */
function handleAddContact(contact) {
  contactWrapper.style.maxHeight = styles.maxHeightFull;
  contactWrapper.style.marginBottom = "25px";
  formAdd.style.padding = "25px 0 18px 0";

  const contactInputWrapper = createContactInputWrapper(contact);
  contactWrapper.appendChild(contactInputWrapper);

  const selectStyledElement = contactInputWrapper.querySelector(
    ".modal__form-add-wrapper-select-custom"
  );
  const selectElement = contactInputWrapper.querySelector(
    ".modal__form-add-wrapper-select-old"
  );
  const selectIcon = contactInputWrapper.querySelector(
    ".modal__form-add-wrapper-icon-arrow"
  );
  const optionListElement = contactInputWrapper.querySelector(
    ".modal__form-add-wrapper-select-options"
  );

  const deleteIconBtn = contactInputWrapper.querySelector(
    ".modal__form-add-wrapper-btn-closing"
  );

  selectStyledElement.addEventListener("click", (e) => {
    e.stopPropagation();
    activeSelector(e.target, selectIcon);
  });

  optionListElement.addEventListener("click", (e) => {
    const input = contactInputWrapper.querySelector(
      ".modal__form-add-wrapper-input"
    );
    const newValue = e.target.innerText;
    const valueToSelect = e.target.getAttribute("data-value");
    selectElement.value = valueToSelect;
    selectStyledElement.innerText = newValue;
    applyMask(input, valueToSelect);
    unActiveSelector(selectIcon, selectStyledElement, optionListElement);
  });

  document.addEventListener("click", (e) => {
    if (!selectStyledElement.contains(e.target)) {
      unActiveSelector(selectIcon, selectStyledElement, optionListElement);
    }
  });

  deleteIconBtn.addEventListener("click", () => {
    handleRemoveContact(contactInputWrapper);
    removeErrorContainer();
    resetErrorStyles();
    setDisabledSaveForm(false);
  });

  const contactItems = contactWrapper.querySelectorAll(
    ".modal__form-add-wrapper-item"
  );
  if (contactItems.length >= MAX_CONTACTS) {
    addContactBtn.style.display = styles.displayNone;
  }
}

/**
 * Функция для обработки удаления контакта
 *
 * @param {HTMLElement} contactInputWrapper - Элемент контакта, который нужно удалить
 * @returns {void} - Не возвращает значение
 */
function handleRemoveContact(contactInputWrapper) {
  contactInputWrapper.classList.add(animationClasses.fadeOut);
  contactInputWrapper.addEventListener("animationend", () => {
    contactWrapper.removeChild(contactInputWrapper);
    updateContactWrapperStyle();
  });
}

/**
 * Функция для создания элемента ввода контакта
 *
 * @param {Object} contact - Объект с информацией о контакте
 * @param {string} contact.type - Тип контакта (телефон, email и т.д.)
 * @param {string} contact.value - Значение контакта
 * @returns {HTMLElement} - Созданный элемент контакта
 */
function createContactInputWrapper(contact) {
  const contactInputWrapper = document.createElement("div");
  contactInputWrapper.className = "modal__form-add-wrapper-item";
  contactInputWrapper.classList.add(animationClasses.fadeIn);
  setTimeout(() => {
    contactInputWrapper.classList.remove(animationClasses.fadeIn);
  }, 1000);

  const selectHTML = `
    <select class="modal__form-add-wrapper-select-old input-reset" id="mySelectId">
      <option value="phone">Телефон</option>
      <option value="additionalPhone">Доп.телефон</option>
      <option value="email">Email</option>
      <option value="vk">VK</option>
      <option value="facebook">Facebook</option>
      <option value="other">Другое</option>
    </select>
    <svg class="modal__form-add-wrapper-icon-arrow" aria-hidden="true">
      <use xlink:href="img/sprite.svg#Arrow_select"></use>
    </svg>
  `;

  const selectElement = document.createElement("div");
  selectElement.className = "modal__form-add-wrapper-select";
  selectElement.innerHTML = selectHTML;

  const selectStyled = document.createElement("div");
  selectStyled.className = "modal__form-add-wrapper-select-custom";
  selectStyled.innerText = "Телефон";

  const optionList = document.createElement("ul");
  optionList.className = "modal__form-add-wrapper-select-options list-reset";

  const select = selectElement.querySelector("select");
  for (const option of select.options) {
    const optionListItem = document.createElement("li");
    optionListItem.className = "modal__form-add-wrapper-select-options-item";
    optionListItem.setAttribute("data-value", option.value);
    optionListItem.innerText = option.text;
    optionList.appendChild(optionListItem);
  }

  selectElement.appendChild(selectStyled);
  selectElement.appendChild(optionList);
  contactInputWrapper.appendChild(selectElement);

  const input = document.createElement("input");
  input.classList.add("modal__form-add-wrapper-input", "input-reset");
  input.type = "text";
  input.id = "contactValue";
  input.setAttribute("aria-label", "Введите данные контакта");
  input.placeholder = "Введите данные контакта";
  input.autocomplete = "off";
  contactInputWrapper.appendChild(input);

  const iconItemDelete = `
  <svg class="modal__form-add-wrapper-btn-closing-icon" aria-hidden="true">
    <use xlink:href="img/sprite.svg#Delete_user"></use>
  </svg>`;
  const deleteIconBtn = document.createElement("button");
  deleteIconBtn.className = "modal__form-add-wrapper-btn-closing btn-reset";
  deleteIconBtn.type = "button";
  deleteIconBtn.innerHTML = iconItemDelete;
  showTooltip(
    deleteIconBtn,
    "Удалить контакт",
    "modal__form-add-wrapper-btn-closing-tooltip"
  );
  contactInputWrapper.appendChild(deleteIconBtn);

  applyMask(input, selectElement.querySelector("select").value);

  selectElement.querySelector("select").addEventListener("change", function () {
    applyMask(input, this.value);
  });

  if (contact.type) {
    const optionToSelect = selectElement.querySelector(
      `[value="${contact.type}"]`
    );
    if (optionToSelect) {
      optionToSelect.selected = true;
      selectStyled.innerText = optionToSelect.text;
      applyMask(input, contact.type);
    }
  }
  if (contact.value) {
    input.value = contact.value;
  }

  return contactInputWrapper;
}

/**
 * Функция для деактивации всех стилизованных селекторов
 *
 * @returns {void} - Не возвращает значение
 */
function deactivateAllSelectors() {
  const allSelectIcons = document.querySelectorAll(
    ".modal__form-add-wrapper-icon-arrow--rotate"
  );
  const allSelectStyledElements = document.querySelectorAll(
    ".modal__form-add-wrapper-select-custom--active"
  );
  const allOptionListElements = document.querySelectorAll(
    ".modal__form-add-wrapper-select-options--show"
  );

  allSelectIcons.forEach((icon) => {
    icon.classList.remove("modal__form-add-wrapper-icon-arrow--rotate");
  });

  allSelectStyledElements.forEach((select) => {
    select.classList.remove("modal__form-add-wrapper-select-custom--active");
  });

  allOptionListElements.forEach((list) => {
    list.classList.remove("modal__form-add-wrapper-select-options--show");
  });
}

/**
 * Функция для активации стилизованного селектора
 *
 * @param {HTMLElement} element - Элемент стилизованного селектора
 * @param {HTMLElement} selectIcon - Иконка стрелки селектора
 * @returns {void} - Не возвращает значение
 */
function activeSelector(element, selectIcon) {
  const isActive = element.classList.contains(
    "modal__form-add-wrapper-select-custom--active"
  );
  deactivateAllSelectors();
  if (isActive) {
    unActiveSelector(selectIcon, element, element.nextSibling);
  } else {
    element.classList.add("modal__form-add-wrapper-select-custom--active");
    element.nextSibling.classList.add(
      "modal__form-add-wrapper-select-options--show"
    );
    selectIcon.classList.add("modal__form-add-wrapper-icon-arrow--rotate");
  }
}

/**
 * Функция для деактивации стилизованного селектора
 *
 * @param {HTMLElement} selectIcon - Иконка стрелки селектора
 * @param {HTMLElement} selectStyledElement - Стилизованный элемент селектора
 * @param {HTMLElement} optionListElement - Элемент списка опций селектора
 * @returns {void} - Не возвращает значение
 */
function unActiveSelector(selectIcon, selectStyledElement, optionListElement) {
  selectStyledElement.classList.remove(
    "modal__form-add-wrapper-select-custom--active"
  );
  optionListElement.classList.remove(
    "modal__form-add-wrapper-select-options--show"
  );
  selectIcon.classList.remove("modal__form-add-wrapper-icon-arrow--rotate");
}

/**
 * Функция для отображения тултипа
 *
 * @param {HTMLElement} element - Элемент, к которому будет привязан тултип
 * @param {string|Object} content - Содержимое тултипа
 * @param {string} content.type - Тип содержимого тултипа (телефон, email и т.д.)
 * @param {string} content.value - Значение содержимого тултипа
 * @param {string} tooltipClass - Класс для тултипа
 * @returns {void} - Не возвращает значение
 */
function showTooltip(element, content, tooltipClass) {
  const tooltip = document.createElement("div");
  tooltip.className = tooltipClass;

  const tooltipText = typeof content === "object" ? content.value : content;

  let contentTooltip = "";
  switch (content.type) {
    case "phone":
    case "additionalPhone":
      contentTooltip = `
      <a href="tel:${tooltipText}" target="_blank" class="${tooltipClass}-text">${tooltipText}</a>
      <svg class="${tooltipClass}-icon" aria-hidden="true">
        <use xlink:href="img/sprite.svg#Background_tooltip"></use>
      </svg>`;
      break;
    case "email":
      contentTooltip = `
      <a href="mailto:${tooltipText}" target="_blank" class="${tooltipClass}-text">${tooltipText}</a>
      <svg class="${tooltipClass}-icon" aria-hidden="true">
        <use xlink:href="img/sprite.svg#Background_tooltip"></use>
      </svg>`;
      break;
    case "vk":
    case "facebook":
    case "other":
      contentTooltip = `
      <a href="${tooltipText}" target="_blank" class="${tooltipClass}-text">${tooltipText}</a>
      <svg class="${tooltipClass}-icon" aria-hidden="true">
        <use xlink:href="img/sprite.svg#Background_tooltip"></use>
      </svg>`;
      break;
    default:
      contentTooltip = `
    <span class="${tooltipClass}-text">${tooltipText}</span>
    <svg class="${tooltipClass}-icon" aria-hidden="true">
      <use xlink:href="img/sprite.svg#Background_tooltip"></use>
    </svg>`;
  }

  tooltip.innerHTML = contentTooltip;
  element.appendChild(tooltip);
}

/**
 * Функция для очистки всех элементов контактов
 *
 * @returns {void} - Не возвращает значение
 */
function clearContacts() {
  const contactItems = contactWrapper.querySelectorAll(
    ".modal__form-add-wrapper-item"
  );
  contactItems.forEach((item) => {
    item.remove();
  });
  updateContactWrapperStyle();
}

/**
 * Функция для обновления стилей контейнера контактов
 *
 * @returns {void} - Не возвращает значение
 */
function updateContactWrapperStyle() {
  const contactItems = contactWrapper.querySelectorAll(
    ".modal__form-add-wrapper-item"
  );
  if (contactItems.length < MAX_CONTACTS) {
    addContactBtn.style.display = styles.displayBlock;
  }

  if (contactItems.length === 0) {
    contactWrapper.style.maxHeight = styles.maxHeightNone;
    formAdd.style.padding = styles.paddingNone;
    contactWrapper.style.marginBottom = styles.marginNone;
  }
}

export {
  handleAddContact,
  clearContacts,
  showTooltip,
  createContactInputWrapper,
  handleRemoveContact,
};
