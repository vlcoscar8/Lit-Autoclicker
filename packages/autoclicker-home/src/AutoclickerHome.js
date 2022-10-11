import { html, css, LitElement } from "lit";

import "@polymer/iron-icons";
import { homeStyles } from "./home.styles";

export class AutoclickerHome extends LitElement {
  static get styles() {
    return css`
      ${homeStyles()}
    `;
  }

  static get properties() {
    return {
      name: { type: String },
      error: { type: String },
      allUsers: { type: Array },
      newUser: { type: Object },
      rankView: { type: Boolean, reflect: true },
    };
  }

  constructor() {
    super();
    this.name = "";
    this.error = "";
    this.allUsers = [];
    this.newUser = {
      name: "",
      points: 0,
      baseCost: 1,
      rockets: {
        basic: {
          owned: true,
          img: "https://cdn-icons-png.flaticon.com/512/316/316309.png",
        },
        pro: {
          owned: false,
          img: "https://cdn-icons-png.flaticon.com/512/181/181764.png",
        },
      },
    };
    this.rankView = false;
  }

  firstUpdated() {
    this.allUsers = JSON.parse(localStorage.getItem("users"));
  }

  render() {
    return html`
      <header>
        <h1>PlanetClicker</h1>
      </header>
      <main>${this.renderForm()}</main>
      ${this.allUsers ? this.renderRank() : ""}
    `;
  }

  renderForm() {
    return html`<h2>Create new player</h2>
    <form @submit=${(e) => this.submitName(e)}>
    <input
      class="field"
      placeholder="Name"
      maxlength="7"
      name='name'
      @input=${(e) => this.changeInputValue(e)}
    ></input>
    ${
      this.error !== ""
        ? html`<div class="error">
            <iron-icon class="error__icon" icon="icons:close"></iron-icon>
            <p class="error__text">${this.error}</p>
          </div>`
        : ""
    }
    <button
      type='submit'
      class="button"
      >Start</button
    >
    </form>`;
  }

  renderRank() {
    return html`<section class="ranking">
      <div class="rank__header">
        <h3>Rank</h3>
        <iron-icon
          class="rank"
          icon="icons:change-history"
          @click=${this.toggleRankView}
        ></iron-icon>
      </div>
      ${this.rankView
        ? html`<div class="ranking__users">
            ${this.allUsers
              .sort((a, b) => b.points - a.points)
              .map(
                (user, i) =>
                  html`<div class="ranking__users--user">
                    <div>
                      <h4>${i + 1}</h4>
                      <img
                        src=${user.rockets.basic.owned
                          ? user.rockets.basic.img
                          : user.rockets.pro.img}
                      />
                    </div>
                    <h4>${user.name}</h4>
                    <h4>
                      ${user.points >= 1000
                        ? `${(user.points / 1000).toFixed(1)}k`
                        : user.points}
                    </h4>
                  </div>`
              )}
          </div>`
        : ""}
    </section>`;
  }

  changeInputValue(e) {
    this.name = e.target.value;
  }

  submitName(e) {
    e.preventDefault();
    const validName = /^[A-Z][a-z]/;

    if (!validName.test(this.name)) {
      this.openErrorMessage();
      return;
    }

    this.navigateToGame();
  }

  navigateToGame() {
    this.dispatchEvent(
      new CustomEvent("navigate", {
        detail: {
          view: "game",
          user: this.manageStorage(),
        },
      })
    );
  }

  openErrorMessage() {
    this.error = "Please enter a valid user name";
    setTimeout(() => {
      this.error = "";
    }, 1500);
  }

  manageStorage() {
    let currentUser = JSON.parse(localStorage.getItem("users"))?.find(
      (user) => user.name === this.name
    );

    if (localStorage.getItem("users") == null) {
      return this.createFirstUser();
    }

    if (!currentUser && localStorage.getItem("users")) {
      return this.addNewUser();
    }

    localStorage.setItem("lastUser", JSON.stringify(currentUser));
    return currentUser;
  }

  createFirstUser() {
    const users = [{ ...this.newUser, name: this.name }];
    localStorage.setItem("users", JSON.stringify(users));

    return users[0];
  }

  addNewUser() {
    const users = JSON.parse(localStorage.getItem("users"));
    const newUser = { ...this.newUser, name: this.name };

    const updatedUsers = [...users, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    return newUser;
  }

  toggleRankView() {
    this.rankView = !this.rankView;
  }
}
