import { animationClasses, tableBody } from "../_vars.js";
import { showTooltip } from "../functions/handleAddContact.js";
import { openModal, openModalConfirm } from "../functions/openModal.js";
import { loadingIndicatorActions } from "../functions/loadingIndicator.js";
import { fetchApiGetCurrentClient } from "../api/fetchApiGetClients.js";
import { handleEditForm } from "../functions/handleEditForm.js";

/**
 * Функция для форматирования объекта даты и времени
 *
 * @param {Date} date - Дата, которую нужно отформатировать.
 * @param {string} [locale="ru-RU"] - Локаль для форматирования даты и времени.
 * @returns {Object} - Объект с отформатированными датой и временем.
 */
function formatDate(date, locale = "ru-RU") {
  const formattedDate = date.toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
  return {
    date: formattedDate,
    time: formattedTime,
  };
}

/**
 * Функция для создания ячейки таблицы с контактами клиента
 *
 * @param {Object[]} contacts - Массив контактов клиента.
 * @returns {HTMLTableCellElement} - Ячейка таблицы с контактами клиента.
 */
function createContactCell(contacts) {
  const contactsCell = document.createElement("td");
  contactsCell.classList.add(
    "listing__tbody-td",
    "listing__tbody-td--contacts"
  );

  const visibleContacts = contacts.slice(0, 4);
  visibleContacts.forEach((contact) => {
    const contactSpan = document.createElement("span");
    contactSpan.classList.add("listing__tbody-td-contact");
    contactSpan.innerHTML = createIconContacts(contact.type);
    showTooltip(
      contactSpan,
      { type: contact.type, value: contact.value },
      "listing__tbody-td-contact-tooltip"
    );
    contactsCell.appendChild(contactSpan);
  });

  if (contacts.length > 4) {
    const moreButton = createButtonContacts(
      "more",
      `+${contacts.length - 4}`,
      function () {
        moreButton.remove();
        const remainingContacts = contacts.slice(4);
        remainingContacts.forEach((contact) => {
          const contactSpan = document.createElement("span");
          contactSpan.classList.add(
            "listing__tbody-td-contact",
            `${animationClasses.fadeIn}`
          );
          setTimeout(() => {
            contactSpan.classList.remove(animationClasses.fadeIn);
          }, 500);
          contactSpan.innerHTML = createIconContacts(contact.type);
          showTooltip(
            contactSpan,
            { type: contact.type, value: contact.value },
            "listing__tbody-td-contact-tooltip"
          );
          contactsCell.appendChild(contactSpan);
        });
      }
    );
    contactsCell.appendChild(moreButton);
  }

  return contactsCell;
}

/**
 * Функция для генерации HTML-разметки для иконок контактов
 *
 * @param {string} contactType - Тип контакта.
 * @returns {string} - HTML-разметка для иконок контактов.
 */
function createIconContacts(contactType) {
  const iconTypes = {
    phone: ["Phone_mini_1", "Phone_mini_2"],
    additionalPhone: ["Phone_mini_1", "Phone_mini_2"],
    email: ["Mail_mini"],
    vk: ["VK_mini"],
    facebook: ["FB_mini"],
    other: ["User_mini"],
  };

  let iconHTML = `<span class="visually-hidden">Контакт - ${contactType}</span>`;
  if (contactType === "phone" || contactType === "additionalPhone") {
    iconHTML += `
      <svg class="listing__tbody-td-contact-icon listing__tbody-td-contact-icon--phone1" aria-hidden="true">
        <use xlink:href="img/sprite.svg#${iconTypes[contactType][0]}"></use>
      </svg>
      <svg class="listing__tbody-td-contact-icon listing__tbody-td-contact-icon--phone2" aria-hidden="true">
        <use xlink:href="img/sprite.svg#${iconTypes[contactType][1]}"></use>
      </svg>
    `;
  } else {
    iconTypes[contactType].forEach((icon) => {
      iconHTML += `
        <svg class="listing__tbody-td-contact-icon listing__tbody-td-contact-icon--${contactType}" aria-hidden="true">
          <use xlink:href="img/sprite.svg#${icon}"></use>
        </svg>
      `;
    });
  }

  return iconHTML;
}

/**
 * Функция для создания кнопки для отображения дополнительных контактов
 *
 * @param {string} buttonType - Тип кнопки.
 * @param {string} text - Текст кнопки.
 * @param {Function} onClick - Функция, вызываемая при нажатии на кнопку.
 * @returns {HTMLButtonElement} - Кнопка для отображения дополнительных контактов.
 */
function createButtonContacts(buttonType, text, onClick) {
  const button = document.createElement("button");
  button.classList.add(
    "listing__tbody-td-contact-btn",
    `listing__tbody-td-contact-btn--${buttonType}`,
    "btn-reset"
  );
  button.innerHTML = `
    <span class="visually-hidden">Иконка ${text}</span>
    <svg class="listing__tbody-td-contact-btn-icon" aria-hidden="true">
      <use xlink:href="img/sprite.svg#Ellipse_mini"></use>
    </svg>
    <span class="listing__tbody-td-contact-btn-text">${text}</span>
  `;
  button.addEventListener("click", onClick);
  return button;
}

/**
 * Функция для определения видимости элементов таблицы
 *
 * @returns {void} - Не возвращает значение
 */
function updateVisibilityOfTableRows() {
  const tableRows = tableBody.querySelectorAll(".listing__tbody-tr");
  if (tableRows.length === 0) {
    return;
  }
  const tableRowHeight = tableRows[0].clientHeight;
  const tableBodyHeight = tableBody.clientHeight;
  const scrollTop = tableBody.scrollTop;
  const startIndex = Math.floor(scrollTop / tableRowHeight);
  const endIndex = Math.ceil((scrollTop + tableBodyHeight) / tableRowHeight);

  tableRows.forEach((row, index) => {
    const isVisible = index >= startIndex && index < endIndex;
    row.classList.toggle("listing__tbody-tr--visible", isVisible);
    row.classList.toggle("listing__tbody-tr--hidden", !isVisible);
    row.classList.toggle(
      "listing__tbody-tr--visible-first",
      isVisible && index === startIndex
    );
  });
}

/**
 * Функция для плавного выравнивания прокрутки к ближайшей строке
 *
 * @returns {void} - Не возвращает значение
 */
function alignScrollToRowHeight() {
  const rowHeight = 60;
  const { scrollTop } = tableBody;
  const alignedScrollPosition = Math.round(scrollTop / rowHeight) * rowHeight;

  tableBody.scrollTo({
    top: alignedScrollPosition,
    behavior: "smooth",
  });
}

/**
 * Функция-обработчик события прокрутки для выравнивания прокрутки
 *
 * @returns {void} - Не возвращает значение
 */
function handleScroll() {
  clearTimeout(window.scrollTimeout);
  window.scrollTimeout = setTimeout(alignScrollToRowHeight, 250);
}

/**
 * Функция для генерации HTML-кода кнопки редактирования
 *
 * @returns {string} - HTML-код кнопки редактирования.
 */
function getEditButtonHtml() {
  return `
    <span class="visually-hidden">Иконка редактирования</span>
    <svg class="listing__tbody-td-btn-edit-icon" aria-hidden="true">
      <use xlink:href="img/sprite.svg#Edit_user"></use>
    </svg>
    <span class="listing__tbody-td-btn-edit-text">Изменить</span>
  `;
}

/**
 * Функция для генерации HTML-кода кнопки удаления
 *
 * @returns {string} - HTML-код кнопки удаления.
 */
function getDeleteButtonHtml() {
  return `
    <span class="visually-hidden">Иконка удаления</span>
    <svg class="listing__tbody-td-btn-delete-icon" aria-hidden="true">
      <use xlink:href="img/sprite.svg#Delete_user"></use>
    </svg>
    <span class="listing__tbody-td-btn-delete-text">Удалить</span>
  `;
}

/**
 * Функция для создания ячейки таблицы с кнопками действий для клиента
 *
 * @param {Object} client - Объект клиента.
 * @returns {HTMLTableCellElement} - Ячейка таблицы с кнопками действий.
 */
function createActionCell(client) {
  const actionsCell = document.createElement("td");
  actionsCell.classList.add("listing__tbody-td", "listing__tbody-td--actions");

  const editButton = document.createElement("button");
  editButton.id = "editButtonToTable";
  editButton.classList.add("listing__tbody-td-btn-edit", "btn-reset");
  editButton.innerHTML = getEditButtonHtml();
  const originalEditButtonHtml = editButton.innerHTML;
  editButton.addEventListener("click", async function () {
    loadingIndicatorActions(editButton, null, null, null, null);
    const clientData = await fetchApiGetCurrentClient(client.id);
    if (clientData) {
      setTimeout(() => {
        handleEditForm(clientData);
        openModal();
        editButton.innerHTML = originalEditButtonHtml;
      }, 1000);
    }
  });

  const deleteButton = document.createElement("button");
  deleteButton.id = "deleteButtonToTable";
  deleteButton.classList.add("listing__tbody-td-btn-delete", "btn-reset");
  deleteButton.innerHTML = getDeleteButtonHtml();
  const originalDeleteButtonHtml = deleteButton.innerHTML;
  deleteButton.addEventListener("click", function () {
    loadingIndicatorActions(null, deleteButton, null, null, null);
    setTimeout(() => {
      openModalConfirm(client.id);
      deleteButton.innerHTML = originalDeleteButtonHtml;
    }, 1000);
  });

  actionsCell.appendChild(editButton);
  actionsCell.appendChild(deleteButton);
  return actionsCell;
}

/**
 * Функция для создания строки таблицы для клиента
 *
 * @param {Object} client - Объект клиента.
 * @param {boolean} [isNewClient=false] - Флаг, указывающий, является ли клиент новым.
 * @returns {HTMLTableRowElement} - Строка таблицы для клиента.
 */
function createClientRow(client, isNewClient = false) {
  const row = document.createElement("tr");
  row.className = "listing__tbody-tr";
  row.setAttribute("data-client-id", client.id);

  if (isNewClient) {
    row.classList.add(animationClasses.fadeIn);
    setTimeout(() => {
      row.classList.remove(animationClasses.fadeIn);
    }, 2500);
  }

  const idCell = document.createElement("td");
  idCell.classList.add("listing__tbody-td", "listing__tbody-td--id");
  idCell.textContent = client.id;
  row.appendChild(idCell);

  const fullNameCell = document.createElement("td");
  fullNameCell.classList.add(
    "listing__tbody-td",
    "listing__tbody-td--fullName"
  );
  fullNameCell.textContent = `${client.surname} ${client.name} ${client.lastName} `;
  row.appendChild(fullNameCell);

  const createdAtCell = document.createElement("td");
  createdAtCell.classList.add(
    "listing__tbody-td",
    "listing__tbody-td--createdAt"
  );
  const createdAtDate = document.createElement("span");
  createdAtDate.classList.add("listing__tbody-td-date");
  createdAtDate.textContent = formatDate(new Date(client.createdAt)).date;
  const createdAtTime = document.createElement("span");
  createdAtTime.classList.add("listing__tbody-td-time");
  createdAtTime.textContent = formatDate(new Date(client.createdAt)).time;
  createdAtCell.appendChild(createdAtDate);
  createdAtCell.appendChild(createdAtTime);
  row.appendChild(createdAtCell);

  const updatedAtCell = document.createElement("td");
  updatedAtCell.classList.add(
    "listing__tbody-td",
    "listing__tbody-td--updatedAt"
  );
  const updatedAtDate = document.createElement("span");
  updatedAtDate.classList.add("listing__tbody-td-date");
  updatedAtDate.textContent = formatDate(new Date(client.updatedAt)).date;
  const updatedAtTime = document.createElement("span");
  updatedAtTime.classList.add("listing__tbody-td-time");
  updatedAtTime.textContent = formatDate(new Date(client.updatedAt)).time;
  updatedAtCell.appendChild(updatedAtDate);
  updatedAtCell.appendChild(updatedAtTime);
  row.appendChild(updatedAtCell);

  row.appendChild(createContactCell(client.contacts));
  row.appendChild(createActionCell(client));

  return row;
}

/**
 * Функция-обработчик обновления событий прокрутки для таблицы
 *
 * @returns {void} - Не возвращает значение
 */
function updateAddListeners() {
  tableBody.removeEventListener("scroll", updateVisibilityOfTableRows);
  tableBody.addEventListener("scroll", updateVisibilityOfTableRows);
  tableBody.addEventListener("scroll", handleScroll);
  updateVisibilityOfTableRows();
}

/**
 * Функция для отрисовки, если нет клиентов в таблице
 *
 * @returns {void} - Не возвращает значение
 */
function renderEmptyClients() {
  tableBody.innerHTML = "";

  const layerTableBody = document.createElement("div");
  layerTableBody.classList.add("listing__tbody-empty");

  const titleTableBody = document.createElement("h2");
  titleTableBody.classList.add("listing__tbody-empty-title", "title");

  const titlePart1 = document.createElement("span");
  titlePart1.classList.add("listing__tbody-empty-title-first");
  titlePart1.textContent = "В таблице пока нет клиентов.";
  titleTableBody.appendChild(titlePart1);

  const titlePart2 = document.createElement("span");
  titlePart2.classList.add("listing__tbody-empty-title-second");
  titlePart2.textContent = "Вы можете добавить их, нажав на кнопку - ";
  titleTableBody.appendChild(titlePart2);

  const titleSpan = document.createElement("span");
  titleSpan.classList.add("listing__tbody-empty-title-third");
  titleSpan.textContent = "Добавить клиента.";
  titlePart2.appendChild(titleSpan);

  layerTableBody.appendChild(titleTableBody);
  tableBody.appendChild(layerTableBody);
}

/**
 * Функция для получения индекса столбца по его названию.
 *
 * @param {string} columnName - Название столбца.
 * @returns {number} - Индекс столбца.
 */
function getColumnIndex(columnName) {
  switch (columnName) {
    case "id":
      return 0;
    case "fullname":
      return 1;
    case "dateCreation":
      return 2;
    case "latestChange":
      return 3;
    default:
      return -1;
  }
}

/**
 * Функция для отрисовки таблицы клиентов
 *
 * @param {Object[]} clients - Массив клиентов.
 * @param {string} [order] - Порядок сортировки ("asc" или "desc").
 * @param {string} [column] - Название столбца для сортировки.
 * @returns {void} - Не возвращает значение
 */
function renderClientsTable(clients, order, column) {
  if (clients.length === 0) {
    renderEmptyClients();
  } else {
    tableBody.innerHTML = "";
    const fragment = document.createDocumentFragment();
    let newRow = null;

    clients.forEach((client, index) => {
      const row = createClientRow(client);
      fragment.appendChild(row);
      newRow = row;

      const cells = row.querySelectorAll(".listing__tbody-td");
      cells.forEach((cell, cellIndex) => {
        cell.classList.remove("listing__tbody-td--highlighting");
        if (
          (order === "asc" && index === 0) ||
          (order === "desc" && index === 0)
        ) {
          if (cellIndex === getColumnIndex(column)) {
            cell.classList.add("listing__tbody-td--highlighting");
          }
        }
      });
    });

    tableBody.appendChild(fragment);

    if (order === "asc" || order === "desc") {
      const firstRow = tableBody.querySelector(".listing__tbody-tr");
      if (firstRow) {
        firstRow.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else if (newRow && order === undefined) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          newRow.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
          });
        }, 500);
      });
    }

    updateAddListeners();
  }
}

export {
  renderClientsTable,
  renderEmptyClients,
  getEditButtonHtml,
  getDeleteButtonHtml,
};
