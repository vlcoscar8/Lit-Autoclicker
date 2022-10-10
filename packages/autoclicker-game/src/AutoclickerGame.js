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

      .name {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .name img {
        width: 5rem;
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

      .factory {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 1em;
        margin-top: 3rem;
        color: white;
      }

      .factory__header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        font-size: 1.7rem;
      }

      .factory-icon {
        transform: rotate(180deg) scale(0.8);
      }

      .factory img {
        width: 4rem;
      }

      .factory button {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        width: 90vw;
        padding: 1rem 3rem;
      }

      .rocket-active {
        color: var(--home-button-text-color, #000000);
        border: 1px solid var(--home-button-border-color, #000000);
        background-color: var(
          --game-button-rocket-active-background-color,
          #86edff
        );
      }

      :host([factoryView]) .factory-icon {
        transform: rotate(0deg) scale(0.8);
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
      factoryView: { type: Boolean, reflect: true },
      rocketCreated: { type: Boolean },
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
    this.factoryView = false;
    this.rocketCreated = false;
    this.rocketPrice = 5000;
  }

  firstUpdated() {
    this.user = JSON.parse(localStorage.getItem("lastUser"));
    this.counter = JSON.parse(localStorage.getItem("users")).find(
      (user) => user.name === this.user.name
    ).points;

    this.rocketCreated = this.user.rockets.pro.owned;

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
        <div class="name">
          <h2>Hi ${this.user.name}</h2>
          <img src="https://cdn-icons-png.flaticon.com/512/2026/2026502.png" />
        </div>
        <p>
          Planets discovered:
          ${this.counter >= 1000
            ? `${(this.counter / 1000).toFixed(1)}k`
            : this.counter}
        </p>
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
        <article class="factory">
          <div class="factory__header">
            <h3>Factory</h3>
            <iron-icon
              class="factory-icon"
              icon="icons:change-history"
              @click=${this.toggleFactoryView}
            ></iron-icon>
          </div>
          ${this.factoryView
            ? html`<button
                @click=${this.createRocket}
                ?disabled=${this.rocketCreated ||
                this.counter <= this.rocketPrice
                  ? true
                  : false}
                class=${this.rocketCreated || this.counter <= this.rocketPrice
                  ? "rocket-btn disabled"
                  : "rocket-btn rocket-active"}
              >
                <img src=${this.user.rockets.pro.img} alt="rocket image" />
                ${!this.rocketCreated
                  ? `Create new Rocket (${this.rocketPrice})`
                  : "Rocket already created"}
              </button>`
            : ""}
        </article>
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

    this.interval[0] = currentInterval;
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

  createRocket() {
    this.counter -= this.rocketPrice;
    this.rocketCreated = true;
    this.addAutoclickerInterval(this.autoclickerBaseCost * 2);
    this.updateUser("pro");
  }

  updateUser(rocket = "basic") {
    let allUsers = JSON.parse(localStorage.getItem("users"));

    const userRockets =
      rocket === "basic"
        ? this.user.rockets
        : {
            basic: {
              owned: false,
              img: "https://cdn-icons-png.flaticon.com/512/316/316309.png",
            },
            pro: {
              owned: true,
              img: "https://cdn-icons-png.flaticon.com/512/181/181764.png",
            },
          };

    const userUpdated = {
      ...this.user,
      points: this.counter,
      baseCost: this.autoclickerBaseCost,
      clickerCost: this.autoclikerCost,
      rockets: userRockets,
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

  toggleFactoryView() {
    this.factoryView = !this.factoryView;
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
