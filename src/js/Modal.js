export default class Modal {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.modalEl = null;
    this.closeButton = null;
    this.isOpen = false;

    this.bindEvents();
  }

  static get markup() {
    return `
      <div class="modal modal-active">
        <button class="modal__close" type="button" aria-label="Закрыть">×</button>
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

  bindEvents() {
    this.handleCloseClick = this.closeModal.bind(this);

    this.handleEscKey = (e) => {
      if (e.key === "Escape" && this.isOpen) this.closeModal();
    };

    this.handleOutsideClick = (e) => {
      if (this.isOpen && e.target === this.modalEl) this.closeModal();
    };
  }

  redrawModal() {
    this.parentEl.innerHTML = this.constructor.markup;
    this.cacheElements();
    this.attachEventListeners();
  }

  cacheElements() {
    this.modalEl = this.parentEl.querySelector(".modal");
    this.closeButton = this.parentEl.querySelector(".modal__close");
  }

  attachEventListeners() {
    if (this.closeButton) {
      this.closeButton.addEventListener("click", this.handleCloseClick);
    }
    document.addEventListener("keydown", this.handleEscKey);
    this.parentEl.addEventListener("click", this.handleOutsideClick);
  }

  detachEventListeners() {
    if (this.closeButton) {
      this.closeButton.removeEventListener("click", this.handleCloseClick);
    }
    document.removeEventListener("keydown", this.handleEscKey);
    this.parentEl.removeEventListener("click", this.handleOutsideClick);
  }

  showDescription(title, message) {
    const titleEl = this.parentEl.querySelector(".modal__title");
    const messageEl = this.parentEl.querySelector(".modal__message");

    if (titleEl) titleEl.textContent = title;
    if (messageEl) messageEl.textContent = message;
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

  open() {
    if (!this.modalEl) this.redrawModal();

    this.modalEl.classList.add("modal-active");
    this.isOpen = true;

    document.body.style.overflow = "hidden";

    this.closeButton?.focus();
  }

  closeModal() {
    if (this.modalEl) {
      this.modalEl.remove();
      this.modalEl = null;
      this.isOpen = false;
      document.body.style.overflow = "";
    }
  }

  destroy() {
    this.detachEventListeners();
    if (this.modalEl) {
      this.modalEl.remove();
      this.modalEl = null;
    }
    this.isOpen = false;
    document.body.style.overflow = "";
  }
}
