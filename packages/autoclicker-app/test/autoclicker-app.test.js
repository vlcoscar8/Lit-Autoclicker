import { html } from "lit";
import { fixture, expect, elementUpdated } from "@open-wc/testing";

import "../src/autoclicker-app.js";
import "../components/autoclicker-home/AutoclickerHome";

describe("AutoclickerApp", () => {
  let app;

  beforeEach(async () => {
    const page = "home";
    app = await fixture(
      html`<autoclicker-app .page=${page}></autoclicker-app>`
    );
  });

  it("renders home component", async () => {
    const home = app.shadowRoot.querySelector("autoclicker-home");
    expect(home).to.exist;
  });

  it("renders game component when page is changed to 'game'", async () => {
    app.page = "game";
    await elementUpdated(app);
    const game = app.shadowRoot.querySelector("autoclicker-game");
    expect(game).to.exist;
  });

  it("renders home component when a default page path is setted", async () => {
    app.page = "fakePath";
    await elementUpdated(app);
    const home = app.shadowRoot.querySelector("autoclicker-home");
    expect(home).to.exist;
  });

  it("Not render home component when the page is setted as 'game'", async () => {
    app.page = "game";
    await elementUpdated(app);
    const home = app.shadowRoot.querySelector("autoclicker-home");
    expect(home).to.be.null;
  });

  it("Render game component when navigateToGame() is fired from home component", async () => {
    const mockName = "MockName";
    const home = await fixture(
      html` <autoclicker-home .name=${mockName}></autoclicker-home> `
    );
    home.navigateToGame();

    await elementUpdated(app);
    const game = app.shadowRoot.querySelector("autoclicker-game");
    expect(game).to.be.null;
  });
});
