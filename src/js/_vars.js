/**
 * Модальные окна и их элементы управления;
 *
 * @constant {HTMLElement} modalWindow - Модальное окно
 * @constant {HTMLElement} modalConfirmDelete - Модальное окно подтверждения удаления
 * @constant {HTMLElement} openModalBtn - Кнопка для открытия модального окна
 * @constant {HTMLElement} openModalDeleteBtn - Кнопка для открытия модального окна подтверждения удаления
 * @constant {HTMLElement} closeModalBtn - Кнопка для закрытия модального окна
 * @constant {HTMLElement} closeModalConfirmBtn - Кнопка для закрытия окна подтверждения удаления
 */
export const modalWindow = document.getElementById("modalWindow");
export const modalConfirmDelete = document.getElementById("modalToDelete");
export const openModalBtn = document.getElementById("openModalBtn");
export const openModalDeleteBtn = document.getElementById("openModalDeleteBtn");
export const closeModalBtn = document.querySelector(".modal__btn-close");
export const closeModalConfirmBtn = document.querySelector(
  ".modal__btn-close--delete"
);

/**
 * Селекторы для модальной формы
 *
 * @constant {HTMLElement} clientForm - Модальная форма клиента.
 * @constant {HTMLElement} saveFormBtn - Кнопка сохранения.
 * @constant {HTMLElement} btnWrapper - Обёртка для кнопок в модальной форме.
 * @constant {HTMLElement} confirmDeleteFormBtn - Кнопка подтверждения удаления.
 * @constant {HTMLElement} confirmCancelFormBtn - Кнопка отмены подтверждения.
 */
export const clientForm = document.getElementById("clientForm");
export const saveFormBtn = document.getElementById("saveForm");
export const btnWrapper = document.querySelector(".modal__form-wrapper-btn");
export const confirmDeleteFormBtn = document.getElementById("confirmDeleteBtn");
export const confirmCancelFormBtn = document.getElementById("confirmCancelBtn");

/**
 * Селекторы для управления контактами
 *
 * @constant {HTMLElement} addContactBtn - Кнопка добавления контакта.
 * @constant {HTMLElement} contactWrapper - Обёртка для контактов.
 * @constant {HTMLElement} formAdd - Форма добавления контакта.
 */
export const addContactBtn = document.getElementById("addContactBtn");
export const contactWrapper = document.getElementById("contact-wrapper");
export const formAdd = document.querySelector(".modal__form-add");

/**
 * Селекторы для управления заголовками в таблице
 *
 * @constant {HTMLElement} idCol - Столбец ID.
 * @constant {HTMLElement} idFullname - Столбец полного имени.
 * @constant {HTMLElement} idDateCreation - Столбец даты создания.
 * @constant {HTMLElement} idLatestChange - Столбец даты последнего изменения.
 */
export const idCol = document.getElementById("col-id");
export const idFullname = document.getElementById("col-fullname");
export const idDateCreation = document.getElementById("col-date-create");
export const idLatestChange = document.getElementById("col-latest-change");

/**
 * Селекторы для поиска параметра в запросе
 *
 * @constant {HTMLElement} header - Заголовок.
 * @constant {HTMLElement} searchClients - Поле для ввода поиска клиентов.
 * @constant {HTMLElement} searchResult - Результаты поиска.
 * @constant {HTMLElement} clearInputBtn - Кнопка очистки поля поиска.
 */
export const header = document.querySelector(".header");
export const searchClients = document.getElementById("input-search");
export const searchResult = document.getElementById("result-search");
export const clearInputBtn = document.getElementById("clear-search");

/**
 * Селекторы для изменения иконки
 *
 * @constant {HTMLElement} iconDefault - Иконка по умолчанию.
 * @constant {HTMLElement} iconHover - Иконка при наведении.
 */
export const iconDefault = addContactBtn.querySelector(
  ".modal__form-add-btn-icon:first-child"
);
export const iconHover = addContactBtn.querySelector(
  ".modal__form-add-btn-icon:last-child"
);

/**
 * Селекторы для загрузчика
 *
 * @constant {HTMLElement} tableBody - Основное тело таблицы.
 * @constant {HTMLElement} loader - Элемент загрузчика.
 * @constant {HTMLElement} loaderHeader - Заголовок загрузчика.
 */
export const tableBody = document.getElementById("listing-crm-body");
export const loader = document.querySelector(".listing__tbody-loader");
export const loaderHeader = document.querySelector(".header__loader");

/**
 * URL API для работы с клиентами.
 *
 * @constant {string} apiClientsUrl - URL API клиентов.
 */
export const apiClientsUrl = "http://localhost:3333/api/clients";

/**
 * Ограничения по количеству контактов.
 *
 * @constant {number} MAX_CONTACTS - Максимальное количество контактов.
 */
export const MAX_CONTACTS = 10;

/**
 * Объект, содержащий стили для валидации формы.
 *
 * @type {Object}
 * @property {string} errorBorderColor - Цвет границы для ошибок.
 * @property {string} defaultBorderColor - Цвет границы по умолчанию.
 * @property {string} displayBlock - Стиль для отображения элемента как блока.
 * @property {string} displayNone - Стиль для скрытия элемента.
 * @property {string} maxHeightFull - Максимальная высота, равная 100%.
 * @property {string} maxHeightNone - Максимальная высота, равная 0%.
 * @property {string} paddingNone - Отступы, равные 0.
 * @property {string} marginNone - Поля, равные 0.
 */
export const styles = {
  errorBorderColor: "#f06a4d",
  defaultBorderColor: "",
  displayBlock: "block",
  displayNone: "none",
  maxHeightFull: "100%",
  maxHeightNone: "0%",
  paddingNone: "0",
  marginNone: "0",
};

/**
 * Объект, содержащий сообщения об ошибках для валидации формы.
 *
 * @type {Object}
 * @property {string} missingSurname - Сообщение об ошибке: не указана фамилия.
 * @property {string} missingFirstname - Сообщение об ошибке: не указано имя.
 * @property {string} incompleteContacts - Сообщение об ошибке: не все контакты полностью заполнены.
 * @property {string} errorPostDataToServer - Сообщение об ошибке: ошибка при отправке данных на сервер.
 * @property {string} errorGetDataToServer - Сообщение об ошибке: ошибка при запросе к серверу.
 * @property {string} errorGetAllClients - Сообщение об ошибке: ошибка при получении полного списка клиентов.
 * @property {string} errorGetCurrentClient - Сообщение об ошибке: ошибка при получении данных текущего клиента.
 * @property {string} errorPostAddClient - Сообщение об ошибке: ошибка при добавлении клиента.
 * @property {string} errorDeleteClient - Сообщение об ошибке: ошибка при удалении клиента.
 * @property {string} errorUpdateClient - Сообщение об ошибке: ошибка при обновлении клиента.
 * @property {string} successAddClient - Сообщение об успешном добавлении клиента.
 * @property {string} successListClients - Сообщение об успешном получении списка клиентов.
 * @property {string} errorFromServerUndefined - Сообщение об ошибке: что-то пошло не так.
 */
export const messages = {
  missingSurname: "Не указана фамилия",
  missingFirstname: "Не указано имя",
  incompleteContacts: "Не все добавленные контакты полностью заполнены",
  errorPostDataToServer: "Ошибка при отправке данных на сервер",
  errorGetDataToServer: "Ошибка при запросе к серверу",
  errorGetAllClients: "Ошибка при получении полного списка клиентов",
  errorGetCurrentClient: "Ошибка при получении данных текущего клиента",
  errorPostAddClient: "Ошибка при добавлении клиента",
  errorDeleteClient: "Ошибка при удалении клиента",
  errorUpdateClient: "Ошибка при обновлении клиента",
  successAddClient: "Клиент успешно добавлен",
  successListClients: "Список клиентов успешно получены",
  errorFromServerUndefined: "Что-то пошло не так...",
};

/**
 * Объект, содержащий CSS классы для анимации.
 *
 * @type {Object}
 * @property {string} fadeIn - Класс для анимации появление.
 * @property {string} fadeOut - Класс для анимации исчезновения.
 * @property {string} rotateInfinity - Класс для бесконечного вращения.
 */
export const animationClasses = {
  fadeIn: "animation-fadeIn",
  fadeOut: "animation-fadeOut",
  rotateInfinity: "animation-rotateInfinity",
};
