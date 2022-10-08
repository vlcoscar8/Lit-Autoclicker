import { LitElement, html, css } from "lit";

import "@bbva/autoclicker-game";
import "@bbva/autoclicker-home";

import { installRouter } from "pwa-helpers/router.js";

export class AutoclickerApp extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 100vw;
        height: 100vh;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        background-color: var(--background-color-primary, black);
      }

      header {
        position: fixed;
        top: 0;
      }

      h1 {
        font-size: 4rem;
        background: var(--title-color-primary, white);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    `;
  }

  static get properties() {
    return {
      page: { type: String },
    };
  }

  constructor() {
    super();
    this.page = "home";
  }

  firstUpdated() {
    installRouter((location) => {
      this.handleNavigation(location);
    });
  }

  render() {
    return html` <header>
        <h1>AUTOCLICKER</h1>
      </header>
      ${this.loadPage()}`;
  }

  handleNavigation(location) {
    const path = location.pathname;
    this.page = path === "/" ? "home" : path.slice(1);
  }

  loadPage() {
    switch (this.page) {
      case "home":
        return this.renderHomeView();
      case "game":
        return this.renderGameView();
      default:
        window.history.pushState({}, "", "/");
        return this.renderHomeView();
    }
  }

  renderHomeView() {
    return html`<autoclicker-home
      @navigate=${this.navigate}
    ></autoclicker-home>`;
  }

  renderGameView() {
    return html`<autoclicker-game
      @navigate=${this.navigate}
    ></autoclicker-game>`;
  }

  navigate(e) {
    window.history.pushState({}, "", e.detail);
    this.handleNavigation(window.location);
  }
}
