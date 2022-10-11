import { css } from "lit";

export const homeStyles = () => {
  return css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      height: 100%;
      gap: 5rem;
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
      width: 100%;
      height: 35%;
      display: flex;
      flex-direction: column;
      align-items: center;
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
      height: 50%;
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
      max-height: 25rem;
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
      width: 70%;
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
};
