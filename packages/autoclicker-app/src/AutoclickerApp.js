import { LitElement, html, css } from "lit";

import "@bbva/autoclicker-game";
import "@bbva/autoclicker-home";

export class AutoclickerApp extends LitElement {
  static get styles() {
    return css``;
  }

  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  render() {
    return html` <autoclicker-game></autoclicker-game
      ><autoclicker-home></autoclicker-home>`;
  }
}
