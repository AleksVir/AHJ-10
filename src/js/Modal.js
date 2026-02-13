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
            <span class="tooltip-active hidden">*Заполните поле</span>
          </div>
          <div class="button__block modal__button">
            <button class="modal__add-btn">Добавить</button>
          </div>
        </div>
      </div>
    `;
  }

  redrawModal() {
   
    this.parentEl.innerHTML = this.constructor.markup;
  }

  showDescription(title, message) {
    const titleEl = this.parentEl.querySelector(".modal__title");
    const messageEl = this.parentEl.querySelector(".modal__message");

    
    if (titleEl) {
      titleEl.textContent = title;
    }
    if (messageEl) {
      messageEl.textContent = message;
    }
  }

  get modalWrapperEl() {
    return this.parentEl.querySelector(".modal");
  }

  get modalTitle() {
    return this.parentEl.querySelector(".modal__title");
  }

  set modalTitle(title) {
    const el = this.modalTitle;
    if (el) el.textContent = title;
  }

  get modalMessage() {
    return this.parentEl.querySelector(".modal__message");
  }

  set modalMessage(message) {
    const el = this.modalMessage;
    if (el) el.textContent = message;
  }

  get modalButtonEl() {
    return this.parentEl.querySelector(".modal__add-btn");
  }

  closeModal() {
    const modal = this.parentEl.querySelector(".modal");
    if (modal) {
      modal.remove(); 
    }
  }
}
