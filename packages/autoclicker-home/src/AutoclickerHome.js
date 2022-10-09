import { html, css, LitElement } from "lit";

import "@polymer/iron-icons";

export class AutoclickerHome extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 2rem;
      }

      header {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
      }

      h1 {
        font-size: 4rem;
        background: var(--app-title-color-primary, white);
        background-clip: none;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
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
        justify-content: center;
        gap: 0.5rem;
        width: 60vw;
      }

      .field {
        background-color: transparent;
        color: var(--home-input-color, white);
        width: 100%;
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
        padding: 1.5rem 5rem;
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
        margin-top: 5rem;
      }

      .ranking__users {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 0.1rem;
      }

      .ranking__users--user {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      h4 {
        margin: 0.5rem;
      }
    `;
  }

  static get properties() {
    return {
      userName: { type: String },
      error: { type: String },
      allUsers: { type: Array },
    };
  }

  constructor() {
    super();
    this.userName = "";
    this.error = "";
    this.allUsers = [];
  }

  firstUpdated() {
    this.allUsers = JSON.parse(localStorage.getItem("users"));
  }

  render() {
    return html`
    <header>
        <h1>AUTOCLICKER</h1>
      </header>
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
      <section class="ranking">
        <h3>Ranking</h3>
        <div class="ranking__users">
          ${this.allUsers
            .sort((a, b) => b.points - a.points)
            .map(
              (user, i) =>
                html`<div class="ranking__users--user">
                  <h4>${i + 1}</h4>
                  <h4>${user.name}</h4>
                  <h4>${user.points}</h4>
                </div>`
            )}
        </div>
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
    const users = [
      {
        name: this.name,
        points: 0,
        baseCost: 1,
      },
    ];
    localStorage.setItem("users", JSON.stringify(users));

    return users[0];
  }

  addNewUser() {
    const users = JSON.parse(localStorage.getItem("users"));
    const newUser = {
      name: this.name,
      points: 0,
      baseCost: 1,
    };

    const updatedUsers = [...users, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    return newUser;
  }
}
