import styles from './Container.module.css';

import { ParentComponent } from 'solid-js';

const Container: ParentComponent = props => {
  return <div class={styles.container}>{props.children}</div>;
};

export { Container };
