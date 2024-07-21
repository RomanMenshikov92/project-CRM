import { clearInputBtn, searchClients } from "../_vars.js";
import {
  clearSearchInput,
  handleSearchInput,
} from "../functions/handleSearch.js";

/**
 * Обработчик события "click" для кнопки очистки поля поиска.
 *
 * @function
 * @listens click
 * @see {@link clearSearchInput}
 */
clearInputBtn.addEventListener("click", clearSearchInput);

/**
 * Обработчик события "input" для поля ввода поиска.
 *
 * @function
 * @listens click
 * @see {@link handleSearchInput}
 */
searchClients.addEventListener("input", handleSearchInput);
