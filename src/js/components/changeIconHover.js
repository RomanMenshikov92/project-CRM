import { addContactBtn, iconDefault, iconHover } from "../_vars.js";

/**
 * Обработчик события "mouseover" для кнопки добавления контакта, который изменяет стили иконок при наведении курсора
 *
 * @function
 * @listens mouseover
 */
addContactBtn.addEventListener("mouseover", () => {
  iconDefault.style.opacity = 0;
  iconHover.style.opacity = 1;
  iconHover.style.transition = "opacity 0.3s ease-out";
});

/**
 * Обработчик события "mouseout" для кнопки добавления контакта, который восстанавливает стили иконок при уводе курсора
 *
 * @function
 * @listens mouseout
 */
addContactBtn.addEventListener("mouseout", () => {
  iconDefault.style.opacity = 1;
  iconHover.style.opacity = 0;
  iconDefault.style.transition = "opacity 0.3s ease-out";
});
