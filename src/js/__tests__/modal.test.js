import Modal from "../Modal";

const parentEl = document.createElement("div");

const modal = new Modal(parentEl);
modal.redrawModal();

test("redrawModalForm() подключает разметку в DOM", () => {
  expect(modal.parentEl.innerHTML).toEqual(Modal.markup);
});

// обработчик вынесен в контроллер
/* test("клик на крестик и удаление modal-active", () => {
  modal.closeModal();
  expect(parentEl.querySelector(".modal")).toBeFalsy();
}); */