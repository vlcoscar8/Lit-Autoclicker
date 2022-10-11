import { LitElement, html, css } from "lit";

import "../components/autoclicker-home/AutoclickerHome";
import "../components/autoclicker-game/AutoclickerGame";

import { installRouter } from "pwa-helpers/router.js";

export class AutoclickerApp extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-image: url("https://fsa.zobj.net/crop.php?r=cUwCaG3tjN3elbWNPaT2KHhv9PwvmSxXxKviHByDbJeeMtNUf3tB69bEAyM7dxZVTCyanOixTnJUdB8jDFhK9vhpUi4zCw5kHhNCK-SHkA4rZlAQp_AjvvhtaFF7_RKBN9OevuVeliAFFtXuTGg-L5ZaYDriijukCInePTvL6A0W_Ls-erpjt9cZcp_XvtbhdB2G9j8R9oWFTCiu");
        background-size: cover;
      }
    `;
  }

  static get properties() {
    return {
      page: { type: String },
      user: { type: Object },
    };
  }

  constructor() {
    super();
    this.page = "home";
    this.user = {};
  }

  firstUpdated() {
    installRouter((location) => {
      this.handleNavigation(location);
    });
  }

  render() {
    return html`${this.loadPage()}`;
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
      .user=${this.user}
    ></autoclicker-game>`;
  }

  navigate(e) {
    window.history.pushState({}, "", e.detail.view);
    this.handleNavigation(window.location);

    this.user = e.detail.user;
  }
}
