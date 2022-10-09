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

      section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
      }

      h2 {
        font-size: 2.5rem;
        font-weight: 100;
        color: var(--home-title-color, white);
      }

      p {
        font-size: 2rem;
        font-weight: 100;
        color: var(--home-title-color, white);
      }

      button {
        margin-top: 1.5rem;
        font-size: 1.5rem;
        padding: 1.5rem 9rem;
        border-radius: 0.7rem;
        text-transform: uppercase;
      }

      .disabled {
        color: var(--game-button-disabled-text-color, #000000);
        border: 1px solid var(--game-button-disabled-border-color, #000000);
        background-color: var(--game-button-disabled-background-color, #86edff);
      }

      .active {
        color: var(--home-button-text-color, #000000);
        border: 1px solid var(--home-button-border-color, #000000);
        background-color: var(--home-button-background-color, #86edff);
      }
    `;
  }

  static get properties() {
    return {
      user: { type: Object },
      counter: { type: Number },
      autoclickerBaseCost: { type: Number },
      autoclikerCost: { type: Number },
      interval: { type: Array },
    };
  }

  constructor() {
    super();
    this.user = "";
    this.counter = 0;
    this.autoclickerBaseCost = 1;
    this.autoclikerCost = 50;
    this.interval = [];
  }

  firstUpdated() {
    this.user = JSON.parse(localStorage.getItem("lastUser"));
    this.counter = JSON.parse(localStorage.getItem("users")).find(
      (user) => user.name === this.user.name
    ).points;

    if (this.user.baseCost > 1) {
      this.autoclickerBaseCost = this.user.baseCost;
      this.autoclikerCost = this.user.clickerCost;
      this.addAutoclickerInterval(this.autoclickerBaseCost);
    }
  }

  render() {
    return html`
      <header>
        <h1>Autoclicker</h1>
        <iron-icon
          class="back"
          icon="icons:exit-to-app"
          @click=${this.navigateToHome}
        ></iron-icon>
      </header>
      <section>
        <h2>Hi ${this.user.name}</h2>
        <p>Points: ${this.counter}</p>
        <p>Autoclickers bought: ${this.autoclickerBaseCost - 1}</p>
        <button class="active" @click=${this.addClick}>Click</button>
        ${this.autoclickerBaseCost > 1 || this.counter >= 50
          ? html`<button
              @click=${this.buyAutoclicker}
              ?disabled=${this.counter < this.autoclikerCost ? true : false}
              class=${this.counter < this.autoclikerCost
                ? "disabled"
                : "active"}
            >
              Buy boost (${this.autoclikerCost})
            </button>`
          : ""}
      </section>
    `;
  }

  navigateToHome() {
    this.interval.forEach((item) => clearInterval(item));

    this.dispatchEvent(
      new CustomEvent("navigate", {
        detail: {
          view: "home",
          user: {},
        },
      })
    );
  }

  addClick() {
    this.counter += 1;
    this.updateUser();
  }

  buyAutoclicker() {
    this.counter = this.counter - this.autoclikerCost;
    this.autoclickerBaseCost = this.user.baseCost + 1;
    this.autoclikerCost = this.autoclikerCost + 50 * this.autoclickerBaseCost;
    this.addAutoclickerInterval(this.autoclickerBaseCost);
  }

  addAutoclickerInterval(basecost) {
    const timeInterval = basecost > 1 ? 100 / basecost : 100;

    const currentInterval = setInterval(
      this.autoclickerEffect.bind(this),
      timeInterval
    );

    this.interval.push(currentInterval);
  }

  autoclickerEffect() {
    this.counter += 1;

    this.updateUser();
  }

  updateUser() {
    let allUsers = JSON.parse(localStorage.getItem("users"));

    allUsers = allUsers.map((user) =>
      user.name === this.user.name
        ? {
            ...user,
            points: this.counter,
            baseCost: this.autoclickerBaseCost,
            clickerCost: this.autoclikerCost,
          }
        : user
    );

    localStorage.setItem("users", JSON.stringify(allUsers));

    this.user = JSON.parse(localStorage.getItem("users")).find(
      (user) => user.name === this.user.name
    );
  }
}
