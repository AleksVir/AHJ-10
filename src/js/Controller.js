import GeolocationService from "./Geo.js";
import Modal from "./Modal.js";
import Post from "./Card.js";
import CoordsValidator from "./Validator.js";
y
export default class Controller {
  constructor(board) {
    this.board = board;
    this.store = [];
    this.geo = new GeolocationService();
    this.modal = new Modal(document.querySelector(".container"));
    this.fieldMessage = document.querySelector(".text__field");
  }

  init() {
    this.addSubscribe();
  }

  addSubscribe() {
    const container = document.querySelector(".container");
    container.addEventListener("keyup", this.keyUp.bind(this));
    container.addEventListener("click", this.completionField.bind(this));
    container.addEventListener("input", this.completionField.bind(this));
    container.addEventListener("click", this.getManualCoords.bind(this));
  }

  completionField(event) {
    if (event.target.classList.contains("text__field")) {
      const tooltip = document.querySelector(".tooltip-active");
      if (tooltip) {
        tooltip.remove(); 
        this.fieldMessage.style.outline = "none";
      }
    }
  }

  validityFields(input) {
    const parent = input.parentElement;
    const tooltip = parent.querySelector(".tooltip-active");

    if (!input.value.trim()) {
      if (!tooltip) {
        const tip = document.createElement("span");
        tip.className = "tooltip-active";
        tip.textContent = "*Заполните поле";
        parent.insertAdjacentElement("beforeend", tip);
      }
      input.style.outline = "2px solid red";
      input.setAttribute("aria-invalid", "true");
      return false;
    }

    if (tooltip) {
      tooltip.remove();
    }
    input.style.outline = "";
    input.setAttribute("aria-invalid", "false");
    return true;
  }

  keyUp(event) {
    event.preventDefault();
    if (document.querySelector(".tooltip-active") || event.code !== "Enter") return;

    if (this.validityFields(this.fieldMessage)) {
      this.getAutoCoords();
    }
  }

  getAutoCoords() {
    this.geo.getPosition().then((result) => {
      if (result.success) {
        const content = this.fieldMessage.value;
        const coords = [result.latitude, result.longitude];
        this.createPost(content, coords);
      } else {
       
        this.modal.redrawModal();
        this.modal.showDescription(result.title, result.message);
      }
    }).catch((error) => {
      console.error("Ошибка при получении геолокации:", error);
     
      this.modal.redrawModal();
      this.modal.showDescription("Ошибка", "Не удалось получить геолокацию. Попробуйте вручную.");
    });
  }

  getManualCoords(event) {
    if (!event.target.classList.contains("modal__add-btn")) return;

    const coordsInput = document.querySelector(".input__coords");
    if (!coordsInput || !coordsInput.value.trim()) {
      const tooltip = document.querySelector(".tooltip-active");
      if (tooltip) {
        tooltip.classList.remove("hidden");
      }
      return;
    }

    const validator = new CoordsValidator(coordsInput);
    const coords = validator.verify();

    if (coords) {
      const content = this.fieldMessage.value;
      this.createPost(content, coords);
      this.modal.closeModal();
    }
  }

  createPost(content, coords) {
    const post = new Post(content, coords);
    post.init();
    console.log(post, "post");
    this.store.push(post);
  }
}
