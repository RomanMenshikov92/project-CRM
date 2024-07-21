import { animationClasses, tableBody, searchResult } from "../_vars.js";

/**
 * Функция для отображения загрузчика
 * @returns {void} - Не возвращает значение
 */
export function loadingIndicator() {
  tableBody.innerHTML = `
    <div class="listing__tbody-loader">
      <span class="visually-hidden">Идет загрузка</span>
      <svg class="listing__tbody-loader-icon ${animationClasses.rotateInfinity}" aria-hidden="true">
        <use xlink:href="img/sprite.svg#Loader"></use>
      </svg>
    </div>
  `;
}

/**
 * Функция для отображения загрузчика в поисковике
 * @returns {void} - Не возвращает значение
 */
export function loadingIndicatorSearch() {
  searchResult.innerHTML = `
    <div class="header__result-search-loader">
      <span class="visually-hidden">Идет загрузка</span>
      <svg class="header__result-search-loader-icon ${animationClasses.rotateInfinity}" aria-hidden="true">
        <use xlink:href="img/sprite.svg#Loader"></use>
      </svg>
    </div>
  `;
}

/**
 * Функция для отображения загрузчика в действиях (сохранение, удаление и редактирование)
 *
 * @param {HTMLButtonElement} editButton Кнопка редактирования.
 * @param {HTMLButtonElement} deleteButton Кнопка удаления.
 * @param {HTMLButtonElement} saveModalButton Кнопка сохранения в модальном окне.
 * @param {HTMLButtonElement} saveEditModalButton Кнопка сохранения в модальном окне редактирования.
 * @param {HTMLButtonElement} deleteConfirmModalButton Кнопка подтверждения удаления в модальном окне.
 * @returns {void} - Не возвращает значение
 */
export function loadingIndicatorActions(
  editButton,
  deleteButton,
  saveModalButton,
  saveEditModalButton,
  deleteConfirmModalButton
) {
  if (editButton) {
    editButton.innerHTML = `
    <span class="visually-hidden">Иконка редактирования</span>
    <svg class="listing__tbody-td-btn-edit-icon listing__tbody-td-btn-edit-icon--loader ${animationClasses.rotateInfinity}" aria-hidden="true">
      <use xlink:href="img/sprite.svg#Loader"></use>
    </svg>
    <span class="listing__tbody-td-btn-edit-text">Изменить</span>
  `;
  }
  if (deleteButton) {
    deleteButton.innerHTML = `
    <span class="visually-hidden">Иконка удаления</span>
    <svg class="listing__tbody-td-btn-delete-icon listing__tbody-td-btn-delete-icon--loader ${animationClasses.rotateInfinity}" aria-hidden="true">
      <use xlink:href="img/sprite.svg#Loader"></use>
    </svg>
    <span class="listing__tbody-td-btn-delete-text">Удалить</span>
  `;
  }
  if (saveModalButton) {
    saveModalButton.innerHTML = `
    <span class="visually-hidden">Иконка сохранения</span>
    <svg class="modal__form-btn-save-icon modal__form-btn-save-icon--loader ${animationClasses.rotateInfinity}" aria-hidden="true">
      <use xlink:href="img/sprite.svg#Loader"></use>
    </svg>
    <span class="modal__form-btn-save-text">Сохранить</span>
  `;
  }
  if (saveEditModalButton) {
    saveEditModalButton.innerHTML = `
    <span class="visually-hidden">Иконка сохранения</span>
    <svg class="modal__form-btn-save-edit-icon modal__form-btn-save-edit-icon--loader ${animationClasses.rotateInfinity}" aria-hidden="true">
      <use xlink:href="img/sprite.svg#Loader"></use>
    </svg>
    <span class="modal__form-btn-save-edit-text">Сохранить</span>
  `;
  }
  if (deleteConfirmModalButton) {
    deleteConfirmModalButton.innerHTML = `
    <span class="visually-hidden">Иконка удаления</span>
    <svg class="modal__form-btn-save-icon modal__form-btn-save-icon--delete modal__form-btn-save-icon--delete-loader ${animationClasses.rotateInfinity}" aria-hidden="true">
      <use xlink:href="img/sprite.svg#Loader"></use>
    </svg>
    <span class="modal__form-btn-save--delete-text">Удалить</span>
  `;
  }
}
