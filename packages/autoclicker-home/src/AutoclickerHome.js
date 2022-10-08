import { html, css, LitElement } from "lit";

import "@polymer/iron-icons";

export class AutoclickerHome extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 100%;
        height: 100%;
        margin-top: 10rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 2rem;
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
    `;
  }

  static get properties() {
    return {
      userName: { type: String },
      error: { type: String },
    };
  }

  constructor() {
    super();
    this.userName = "";
    this.error = "";
  }

  render() {
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
      </form> `;
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
    };

    const updatedUsers = [...users, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    return newUser;
  }
}
