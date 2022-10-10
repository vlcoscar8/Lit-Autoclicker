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
        color: var(--home-button-text-color, #000000);
        border: 1px solid var(--home-button-border-color, #000000);
        background-color: var(--home-button-background-color, #86edff);
      }

      .disabled {
        color: var(--game-button-disabled-text-color, #000000);
        border: 1px solid var(--game-button-disabled-border-color, #000000);
        background-color: var(--game-button-disabled-background-color, #86edff);
      }

      .active {
        color: var(--home-button-text-color, #000000);
        border: 1px solid var(--home-button-border-color, #000000);
        background-color: var(--game-button-active-background-color, #86edff);
      }

      .energy {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        gap: 1rem;
        width: 80vw;
        height: 6rem;
      }

      .energy img {
        width: 3rem;
      }

      :host([boosted]) .energy img {
        animation: grow 0.5s ease;
      }

      .planet {
        width: 7rem;
      }

      @keyframes grow {
        0% {
          width: 3rem;
        }

        50% {
          width: 4rem;
        }
      }

      .ripple {
        --ripple-background: #992d2d4c;
        --ripple-opacity: 0.1;
        --ripple-duration: 600ms;
        user-select: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }

      [anim="ripple"] {
        position: relative;
        overflow: hidden;
      }

      .ripple:before {
        content: "";
        position: absolute;
        display: block;
        background: var(--ripple-background, white);
        border-radius: 50%;
        pointer-events: none;

        //  position and size
        top: calc(var(--y) * 1px);
        left: calc(var(--x) * 1px);
        width: calc(var(--d) * 1px);
        height: calc(var(--d) * 1px);

        //  animated properties
        opacity: calc(var(--o, 1) * var(--ripple-opacity, 0.3));
        transition: calc(var(--t, 0) * var(--ripple-duration, 600ms))
          var(--ripple-easing, linear);
        transform: translate(-50%, -50%) scale(var(--s, 1));
        transform-origin: center;
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
      boosted: { type: Boolean, reflect: true },
      planet: { type: String },
    };
  }

  constructor() {
    super();
    this.user = "";
    this.counter = 0;
    this.autoclickerBaseCost = 1;
    this.autoclikerCost = 50;
    this.interval = [];
    this.boosted = false;
    this.planets = [
      "../assets/planets/jupiter.png",
      "../assets/planets/mars.png",
      "../assets/planets/planet-earth.png",
      "../assets/planets/saturn.png",
    ];

    this.planet = "";
  }

  firstUpdated() {
    this.user = JSON.parse(localStorage.getItem("lastUser"));
    this.counter = JSON.parse(localStorage.getItem("users")).find(
      (user) => user.name === this.user.name
    ).points;

    this.planet = this.planets[Math.floor(Math.random() * this.planets.length)];
    this.rippleBtn = this.shadowRoot.getElementById("ripple-btn");

    if (this.user.baseCost > 1) {
      this.autoclickerBaseCost = this.user.baseCost;
      this.autoclikerCost = this.user.clickerCost;
      this.addAutoclickerInterval(this.autoclickerBaseCost);
    }
  }

  render() {
    return html`
      <header>
        <h1>PlanetClicker</h1>
        <iron-icon
          class="back"
          icon="icons:exit-to-app"
          @click=${this.navigateToHome}
        ></iron-icon>
      </header>
      <section>
        <h2>Hi ${this.user.name}</h2>
        <p>Planets discovered: ${this.counter}</p>
        <img src="${this.planet}" alt="planet icon" class="planet" />
        <div class="energy">
          <img
            src="https://images.vexels.com/media/users/3/143495/isolated/preview/6b80b9965b1ec4d47c31d7eccf8ce4b0-icono-de-rayo-amarillo.png"
            alt="energy icon"
          />
          <p>Energy boosted: ${this.autoclickerBaseCost - 1}</p>
        </div>

        <button
          @click=${this.addClick}
          id="ripple-btn"
          anim="ripple"
          class="ripple"
        >
          Discover planet
        </button>
        ${this.autoclickerBaseCost > 1 || this.counter >= 50
          ? html`<button
              @click=${(e) => this.buyAutoclicker(e)}
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

  addClick(e) {
    this.counter += 1;
    this.rippleEffect(e);
    this.updateUser();
  }

  buyAutoclicker() {
    this.counter = this.counter - this.autoclikerCost;
    this.autoclickerBaseCost = this.user.baseCost + 1;
    this.autoclikerCost = this.autoclikerCost + 50 * this.autoclickerBaseCost;
    this.addAutoclickerInterval(this.autoclickerBaseCost);
    this.boostedEffect();
  }

  addAutoclickerInterval(basecost) {
    const timeInterval = basecost > 2 ? 100 / basecost : 100;

    const currentInterval = setInterval(
      this.autoclickerEffect.bind(this),
      timeInterval
    );

    this.interval.push(currentInterval);
  }

  boostedEffect() {
    this.boosted = true;
    setTimeout(() => {
      this.boosted = false;
    }, 500);
  }

  autoclickerEffect() {
    this.counter += 1;

    this.updateUser();
  }

  updateUser() {
    let allUsers = JSON.parse(localStorage.getItem("users"));

    const userUpdated = {
      ...this.user,
      points: this.counter,
      baseCost: this.autoclickerBaseCost,
      clickerCost: this.autoclikerCost,
    };

    allUsers = allUsers.map((user) =>
      user.name === this.user.name ? userUpdated : user
    );

    localStorage.setItem("users", JSON.stringify(allUsers));
    localStorage.setItem("lastUser", JSON.stringify(userUpdated));

    this.user = JSON.parse(localStorage.getItem("users")).find(
      (user) => user.name === this.user.name
    );
  }

  rippleEffect(e) {
    e = e.touches ? e.touches[0] : e;
    const r = this.rippleBtn.getBoundingClientRect();
    const d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
    this.rippleBtn.style.cssText = `--s: 0; --o: 1;`;
    this.rippleBtn.offsetTop;
    this.rippleBtn.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${
      e.clientX - r.left
    }; --y:${e.clientY - r.top};`;
  }
}
