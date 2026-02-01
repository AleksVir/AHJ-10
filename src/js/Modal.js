export default class Modal {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  static get markup() {
    return `
        <div class="modal modal-active">
			    <div class="modal-content">
			      <h3 class="modal__title"></h3>
            <span class="modal__message"></span>
            <div class="input__geo">
              <input class="input__coords" type="text" placeholder="широта, долгота">
              <span class="tooltip-active hidden">*Заполните поле	</span>
            </div>
            <div class="button__block modal__button">
              <button class="modal__add-btn">Добавить</button>
            </div>
          </div>
      </div>
`;
  }

  redrawModal() {
    const modalHTML = `
    <div class="modal">
      <button class="modal__close">×</button>
      <div class="modal__content">Контент</div>
    </div>
  `;
    this.parentEl.innerHTML = modalHTML;
  }

  showDescription(title, description) {
    document.querySelector(".modal__title").textContent = title;

    document.querySelector(".modal__message").textContent = description;
  }

  get modalWrapperEl() {
    return this.parentEl.querySelector(".modal");
  }

  get modalTitle() {
    return this.parentEl.querySelector(".modal__title");
  }

  set modalTitle(text) {
    this.parentEl.querySelector(".modal__title").textContent = text;
  }

  get modalMessage() {
    return this.parentEl.querySelector(".modal__message");
  }

  set modalMessage(text) {
    this.parentEl.querySelector(".modal__message").textContent = text;
  }

  get modalButtonEl() {
    return this.parentEl.querySelector(".modal__add-btn");
  }

  closeModal() {
    const modalElement = this.parentEl.querySelector(".modal");
    if (modalElement) {
      modalElement.remove();
    }
  }
}
