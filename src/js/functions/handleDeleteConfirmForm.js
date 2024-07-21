import {
  modalConfirmDelete,
  modalWindow,
  animationClasses,
  messages,
} from "../_vars.js";
import { fetchApiDeleteClient } from "../api/fetchApiDeleteClient.js";
import { fetchApiGetClients } from "../api/fetchApiGetClients.js";
import { closeModal, closeModalConfirm } from "./openModal.js";
import { loadingIndicatorActions } from "../functions/loadingIndicator.js";
import { setDisabledState } from "../functions/handleSaveForm.js";
import {
  handleSorting,
  resetHeaderStyles,
} from "../functions/handleHeaderSorting.js";

/**
 * Асинхронная функция-обработчик для клика по кнопке удаления c подтверждением
 *
 * @async
 * @function handleDeleteConfirmForm
 * @param {Event} e - Событие клика на кнопке
 * @returns {Promise<void>} - Возвращает Promis, который разрешается после завершения операции удаления.
 */
async function handleDeleteConfirmForm(e) {
  e.preventDefault();
  const deleteButton = e.target;
  const originalDeleteButtonHtml = deleteButton.innerHTML;

  if (deleteButton.id === "confirmDeleteBtn") {
    loadingIndicatorActions(null, null, null, null, deleteButton);
    setDisabledState(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const clientId = modalConfirmDelete.dataset.clientId;

    try {
      const [isDeleted] = await Promise.all([
        fetchApiDeleteClient(clientId),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]);

      deleteButton.innerHTML = originalDeleteButtonHtml;
      setDisabledState(false);
      if (isDeleted) {
        const rowToDelete = document.querySelector(
          `tr[data-client-id="${clientId}"]`
        );

        if (rowToDelete) {
          rowToDelete.classList.add(animationClasses.fadeOut);
          rowToDelete.remove();
        }

        closeModalConfirm();

        if (modalWindow) {
          closeModal();
        }

        const deletedClient = await fetchApiGetClients();
        resetHeaderStyles();
        await handleSorting(deletedClient);
      }
    } catch (error) {
      deleteButton.innerHTML = originalDeleteButtonHtml;
      setDisabledState(false);
      console.error(`${messages.errorDeleteClient}: ${error}`);
    }
  }
}

export { handleDeleteConfirmForm };
