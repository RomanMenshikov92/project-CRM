import Inputmask from "../../../node_modules/inputmask/dist/inputmask.es6.js";

/**
 * Функция для применения маски к полю ввода.
 *
 * @param {HTMLInputElement} input - Поле ввода, к которому нужно применить маску.
 * @param {string} type - Тип маски
 * @returns {void} - Не возвращает значение
 */
function applyMask(input, type) {
  switch (type) {
    case "phone":
    case "additionalPhone":
      new Inputmask("+7 (999) 999-99-99").mask(input);
      break;
    case "email":
      new Inputmask({ alias: "email" }).mask(input);
      break;
    case "vk":
      new Inputmask("https://vk.com/999999", { placeholder: "" }).mask(input);
      break;
    case "facebook":
      new Inputmask("https://facebook.com/999999", { placeholder: "" }).mask(
        input
      );
      break;
    case "other":
      new Inputmask("https://a{1,9}.com/999999", {
        placeholder: "",
        definitions: {
          a: {
            validator: "[a-z]",
            casing: "lower",
          },
        },
      }).mask(input);
      break;
    default:
      new Inputmask.remove(input);
  }
}

export { applyMask };
