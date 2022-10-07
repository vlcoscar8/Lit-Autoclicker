import { html, css, LitElement } from "lit";

export class AutoclickerGame extends LitElement {
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
    return html` <h2>Hi from game view</h2>
      <button @click=${this.navigateToHome}>Start</button>`;
  }

  navigateToHome() {
    this.dispatchEvent(
      new CustomEvent("navigate", {
        detail: "/home",
      })
    );
  }
}
