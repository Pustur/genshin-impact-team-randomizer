import { JSX, ParentComponent, splitProps } from 'solid-js';

import styles from './Button.module.css';

interface IButton {
  secondary?: boolean;
}

const Button: ParentComponent<
  IButton & JSX.ButtonHTMLAttributes<HTMLButtonElement>
> = props => {
  const [local, others] = splitProps(props, ['secondary']);

  return (
    <button
      {...others}
      class={
        local.secondary
          ? `${styles.button} ${styles.secondaryButton}`
          : styles.button
      }
    >
      {props.children}
    </button>
  );
};

export { Button };
