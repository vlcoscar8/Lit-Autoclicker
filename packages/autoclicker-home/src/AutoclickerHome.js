import { html, css, LitElement } from "lit";

export class AutoclickerHome extends LitElement {
  static get styles() {
    return css``;
  }

  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  render() {
    return html` <h2>Hi from home view</h2>
      <button @click=${this.navigateToGame}>Start</button>`;
  }

  navigateToGame() {
    this.dispatchEvent(
      new CustomEvent("navigate", {
        detail: "game",
      })
    );
  }
}
