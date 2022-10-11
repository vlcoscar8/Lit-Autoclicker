import { css } from "lit";

export const gameStyles = () => {
  return css`
    :host {
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      gap: 2rem;

      overflow: hidden;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      background-color: var(--game-header-background-color, #ccc);
    }

    h1 {
      font-size: 2.5rem;
      background: var(--app-title-color-primary, white);
      background-clip: none;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 2rem;
    }

    .back {
      color: var(--game-header-icon-color, white);
      transform: scale(1.5);
      margin: 2rem;
    }

    section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }

    .name {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .name img {
      width: 5rem;
    }

    h2 {
      font-size: 2.5rem;
      font-weight: 100;
      color: var(--home-title-color, white);
    }

    p {
      font-size: 2rem;
      font-weight: 100;
      color: var(--home-title-color, white);
    }

    button {
      margin-top: 1.5rem;
      font-size: 1.5rem;
      padding: 1.5rem 9rem;
      border-radius: 0.7rem;
      text-transform: uppercase;
      color: var(--home-button-text-color, #000000);
      border: 1px solid var(--home-button-border-color, #000000);
      background-color: var(--home-button-background-color, #86edff);
      touch-action: manipulation;
    }

    .disabled {
      color: var(--game-button-disabled-text-color, #000000);
      border: 1px solid var(--game-button-disabled-border-color, #000000);
      background-color: var(--game-button-disabled-background-color, #86edff);
    }

    .active {
      color: var(--home-button-text-color, #000000);
      border: 1px solid var(--home-button-border-color, #000000);
      background-color: var(--game-button-active-background-color, #86edff);
    }

    .energy {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      gap: 1rem;
      width: 80%;
      height: 6rem;
    }

    .energy img {
      width: 3rem;
    }

    :host([boosted]) .energy img {
      animation: grow 0.5s ease;
    }

    .planet {
      width: 7rem;
      background: transparent;
    }

    .factory {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      gap: 1em;
      margin-top: 3rem;
      color: white;
    }

    .factory__header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      font-size: 1.7rem;
    }

    .factory-icon {
      transform: rotate(180deg) scale(0.8);
    }

    .factory img {
      width: 4rem;
    }

    .factory button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      width: 90%;
      padding: 1rem 3rem;
    }

    .rocket-active {
      color: var(--home-button-text-color, #000000);
      border: 1px solid var(--home-button-border-color, #000000);
      background-color: var(
        --game-button-rocket-active-background-color,
        #86edff
      );
    }

    :host([factoryView]) .factory-icon {
      transform: rotate(0deg) scale(0.8);
    }

    @keyframes grow {
      0% {
        width: 3rem;
      }

      50% {
        width: 4rem;
      }
    }

    .ripple {
      --ripple-background: #992d2d4c;
      --ripple-opacity: 0.1;
      --ripple-duration: 600ms;
      user-select: none;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    [anim="ripple"] {
      position: relative;
      overflow: hidden;
    }

    .ripple:before {
      content: "";
      position: absolute;
      display: block;
      background: var(--ripple-background, white);
      border-radius: 50%;
      pointer-events: none;

      //  position and size
      top: calc(var(--y) * 1px);
      left: calc(var(--x) * 1px);
      width: calc(var(--d) * 1px);
      height: calc(var(--d) * 1px);

      //  animated properties
      opacity: calc(var(--o, 1) * var(--ripple-opacity, 0.3));
      transition: calc(var(--t, 0) * var(--ripple-duration, 600ms))
        var(--ripple-easing, linear);
      transform: translate(-50%, -50%) scale(var(--s, 1));
      transform-origin: center;
    }
  `;
};
