import { html, css, LitElement } from "lit";

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
        gap: 2rem;
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
        font-size: 1.5rem;
        padding: 1.5rem 5rem;
        border-radius: 0.7rem;
        text-transform: uppercase;
        color: var(--home-button-text-color, #000000);
        border: 1px solid var(--home-button-border-color, #000000);
        background-color: var(--home-button-background-color, #86edff);
      }
    `;
  }

  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  render() {
    return html`<h2>Create new player</h2>
      <form>
        <input
          class="field"
          placeholder="Name"
          maxlength="7"
        ></input>
        <button
          class="button"
          @click=${this.navigateToGame}
          >Start</button
        >
      </form> `;
  }

  navigateToGame() {
    this.dispatchEvent(
      new CustomEvent("navigate", {
        detail: "game",
      })
    );
  }
}
