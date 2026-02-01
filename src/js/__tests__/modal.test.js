import Modal from "../Modal";

import Modal from "../Modal";

describe("Modal", () => {
  let parentEl;
  let modal;

  // Подготовка перед каждым тестом
  beforeEach(() => {
    parentEl = document.createElement("div");
    document.body.appendChild(parentEl); // Добавляем в DOM для реалистичности
    modal = new Modal(parentEl);
  });

  // Очистка после каждого теста
  afterEach(() => {
    if (parentEl.parentNode === document.body) {
      document.body.removeChild(parentEl);
    }
  });

  test("redrawModal() вставляет разметку в контейнер", () => {
    modal.redrawModal();

    // Проверяем, что контейнер содержит элемент .modal
    const modalElement = parentEl.querySelector(".modal");
    expect(modalElement).toBeTruthy();

    // Дополнительно: проверяем наличие ключевых элементов внутри модального окна
    expect(modalElement.querySelector(".modal__close")).toBeTruthy(); // Крестик
    expect(modalElement.querySelector(".modal__content")).toBeTruthy(); // Контент
  });

  test("closeModal() удаляет модальное окно из DOM", () => {
    modal.redrawModal(); // Сначала показываем
    modal.closeModal();  // Затем закрываем

    // Проверяем, что .modal больше нет в контейнере
    const modalElement = parentEl.querySelector(".modal");
    expect(modalElement).toBeFalsy();

    // Дополнительно: проверяем, что класс modal-active удалён (если используется)
    expect(parentEl.classList.contains("modal-active")).toBe(false);
  });


});