import { html, css, LitElement } from "lit";

import "@polymer/iron-icons";

export class AutoclickerGame extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 100vw;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 2rem;

        overflow: hidden;
      }

      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        background-color: var(--game-header-background-color, #ccc);
      }

      h1 {
        font-size: 2.5rem;
        background: var(--app-title-color-primary, white);
        background-clip: none;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 2rem;
      }

      .back {
        color: var(--game-header-icon-color, white);
        transform: scale(1.5);
        margin: 2rem;
      }

      h2 {
        font-size: 2.5rem;
        font-weight: 100;
        color: var(--home-title-color, white);
      }
    `;
  }

  static get properties() {
    return {
      user: { type: Object },
      counter: { type: Number },
    };
  }

  constructor() {
    super();
    this.user = "";
    this.counter = 0;
  }

  willUpdate() {
    this.user = JSON.parse(localStorage.getItem("lastUser"));
  }

  render() {
    return html` <header>
        <h1>Autoclicker</h1>
        <iron-icon
          class="back"
          icon="icons:exit-to-app"
          @click=${this.navigateToHome}
        ></iron-icon>
      </header>
      <h2>Hi ${this.user.name}</h2>
      <button @click=${this.navigateToHome}>Start</button>`;
  }

  navigateToHome() {
    this.dispatchEvent(
      new CustomEvent("navigate", {
        detail: {
          view: "home",
          user: {},
        },
      })
    );
  }
}
