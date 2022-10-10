import { html, css, LitElement } from "lit";

import "@polymer/iron-icons";

export class AutoclickerHome extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        height: 100vh;
      }

      header {
        display: flex;
        align-items: center;
        height: 20%;
      }

      .rocket {
        transform: scale(0.15);
      }

      h1 {
        font-size: 4rem;
        background: var(--app-title-color-primary, white);
        background-clip: none;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      main {
        width: 100vw;
        height: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 15rem;
      }

      h2 {
        font-size: 2.5rem;
        font-weight: 100;
        color: var(--home-title-color, white);
      }

      form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        height: 100%;
      }

      .field {
        background-color: transparent;
        color: var(--home-input-color, white);
        width: 70%;
        font-size: 2rem;
        padding: 1.5rem;
        border-radius: 0.7rem;
        border: 1px solid var(--home-input-color, white);
      }

      .field::placeholder {
        color: var(--home-placeholder-color, #ccc);
      }

      .button {
        margin-top: 1.5rem;
        font-size: 1.5rem;
        padding: 1.5rem 8rem;
        border-radius: 0.7rem;
        text-transform: uppercase;
        color: var(--home-button-text-color, #000000);
        border: 1px solid var(--home-button-border-color, #000000);
        background-color: var(--home-button-background-color, #86edff);
      }

      .error {
        display: flex;
        align-items: center;
        gap: 0.6rem;
      }

      .error__text {
        color: var(--home-error-text-color, red);
        font-size: 1.4rem;
        margin: 0.1rem;
      }

      .error__icon {
        color: var(--home-error-icon-color, red);
        transform: scale(0.8);
      }

      .ranking {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        gap: 1rem;
        font-size: 1.7rem;
        margin-top: -20rem;
        max-height: 28rem;
      }

      .rank {
        transform: rotate(180deg) scale(0.8);
      }

      :host([rankView]) .rank {
        transform: rotate(0deg) scale(0.8);
      }

      .rank__header {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .ranking__users {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 1em;

        overflow-y: scroll;
      }

      .ranking__users--user {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 70vw;
        box-sizing: border-box;
        padding: 0.5rem 2rem;
        gap: 2rem;

        background: rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.1);

        animation: fell-down 1s ease;
      }

      .ranking__users--user div {
        display: flex;
        align-items: center;
        gap: 2rem;
      }

      .ranking__users--user img {
        width: 3rem;
      }

      h4 {
        margin: 0.5rem;
      }

      @keyframes fell-down {
        from {
          opacity: 0;
          transform: translateY(-50px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      ::-webkit-scrollbar {
        width: 10px;
      }

      ::-webkit-scrollbar-track {
        background: #f1f1f111;
      }

      ::-webkit-scrollbar-thumb {
        background: #88888852;
        border-radius: 1rem;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
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
      <main>
        <h2>Create new player</h2>
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
        </form>
      </main>
      <section class="ranking">
        <div class='rank__header'>
          <h3>Rank</h3>
          <iron-icon class='rank' icon='icons:change-history' @click=${
            this.toggleRankView
          }></iron-icon>
        </div>
        ${
          this.rankView
            ? html`<div class="ranking__users">
                ${this.allUsers
                  .sort((a, b) => b.points - a.points)
                  .map(
                    (user, i) =>
                      html`<div class="ranking__users--user">
                        <div>
                          <h4>${i + 1}</h4>
                          <img
                            src=${this.newUser.rockets.basic.owned
                              ? this.newUser.rockets.basic.img
                              : this.newUser.rockets.pro.img}
                          />
                        </div>
                        <h4>${user.name}</h4>
                        <h4>${user.points}</h4>
                      </div>`
                  )}
              </div>`
            : ""
        }
        
      </section>
    `;
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
