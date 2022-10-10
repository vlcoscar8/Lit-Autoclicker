import { html, css, LitElement } from "lit";
import { gameStyles } from "./game.styles";

import "@polymer/iron-icons";

export class AutoclickerGame extends LitElement {
  static get styles() {
    return css`
      ${gameStyles()}
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
      this.addAutoclickerInterval(
        this.user.rockets.basic.owned
          ? this.autoclickerBaseCost
          : this.autoclickerBaseCost * 2
      );
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
      <section>${this.renderGame()}${this.renderFactory()}</section>
    `;
  }

  renderGame() {
    return html` <div class="name">
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
        @click=${this.addPlanetDiscovered}
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
            class=${this.counter < this.autoclikerCost ? "disabled" : "active"}
          >
            Buy boost (${this.autoclikerCost})
          </button>`
        : ""}`;
  }

  renderFactory() {
    return html`<article class="factory">
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
            ?disabled=${this.rocketCreated || this.counter <= this.rocketPrice
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
    </article>`;
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

  addPlanetDiscovered(e) {
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
