import { JSX, ParentComponent } from 'solid-js';

import styles from './Button.module.css';

const Button: ParentComponent<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>
> = props => {
  return (
    <button class={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export { Button };
