# CRM - Система управления контактными данными клиентов

<!-- ## [GutHub Pages](https://romanmenshikov92.github.io/Weblayout_Sitdownpls/) -->

<!-- [![Pages build status](https://github.com/RomanMenshikov92/Weblayout_Sitdownpls/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/RomanMenshikov92/ra-16-react-router/actions/workflows/pages/pages-build-deployment) -->

### [Макет из Figma](<https://www.figma.com/design/0L1LfszUWIsB0sty8iMwCZ/CRM-(Copy)?node-id=211-746&t=guVcFIU5gA06w6PV-1>)

## Курс: Базовый JS + Верстка

## Использованные технологии: HTML (метод БЭМ) / CSS (фреймворк Sass) / JavaScript

## Использованные инструменты: JSDoc / Gulp / DevTools / VS Сode / Stylelint / Git / Figma

## Сборка: Gulp , version 5

Проект общий собран на две части:

- [Frontend](./)
- [Backend (внутри проекта)](./backend/)

Разработан в едином стиле написании кода:

- именование - camelCase
- одинаковые отступы - 2 пробела
- стиль объявлении функции - function declaration
- стиль работы с массивами - метод forEach

Запуск проекта:

1. Установить модули - `npm i`
2. Запустить дев-версию gulp - `npm run dev`
3. Запустить прод-версию gulp - `npm rum build`

---

Техническое задание

1. Просмотр списка людей в виде таблицы
2. Добавление нового клиента
3. Изменение информации о существующем клиенте

Каждый контакт представляет из себя следующий набор данных:

- Имя
- Фамилия
- Отчество
- Массив объектов с контактными данными, где каждый объект содержит
  - Тип контакта (телефон, email, VK и т.п.)
  - Значение контакта (номер телефона, адрес email, ссылка на страницу в VK и т.п.)

Интерфейс представляет из себя единственную страницу, на которой располагается таблица клиентов, кнопка для добавления нового клиента, а также шапка с логотипом компании и стройкой поиска клиентов.

## Реализовано
### Главное:

- Верстка + адаптив по макету
- Вывод клиентов в таблице с помощью api-запросов
- Сортировка по заголовкам
- Поиск
- Отображение контактов клиента
- Действия над клиентами (Создание, редактирование и удаление)
- Api-запросы

### Дополнительное:

- Анимация открытия и закрытия (модальное окно, добавление и удаление контактов, открытие дополнительных контактов в виде иконок, открытие и закрытие результатов поиска, вывод ошибок при валидации)
- Ссылка на карточки клиента
- Валидация формы перед отправкой на сервер (при создании или при редактировании)
- Индикатор загрузки при сохранении или редактировании формы
- Заблокированные поля при сохранении или редактировании формы
- Поиск с автодополнением

