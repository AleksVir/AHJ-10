export default class Card {
  constructor(content, coords) {
    this.content = content;
    this.coords = coords;
  }

  init() {
    this.bindToDOM();
  }

  static template(created, content, coords) {
    return `
    <div class="article-box">
      <div class="article__header">${created}</div>
      <div class="article__content">
        <span class="article__post">${content}</span>
      </div>
      <div class="article__footer">
        <span class="geo__coords">[${coords}]</span>
        <span class="geo__icon">&#128681</span>
      </td>
    </tr>
`;
  }

  bindToDOM() {
    const panel = document.querySelector(".board");

    const card = this.addCard(this.created, this.content, this.coords);

    panel.insertAdjacentHTML("beforeend", card);
  }

  addCard() {
    this.created = new Date().toLocaleString();
    this.content = document.querySelector(".text__field").value.trim();

    if (this.content) {
      const result = this.constructor.template(
        this.created,
        this.content,
        this.coords
      );
      document.querySelector(".text__field").value = "";
      return result;
    }
    return false;
  }
}