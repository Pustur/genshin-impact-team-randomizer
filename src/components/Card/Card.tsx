import { Component, JSX } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';

import styles from './Card.module.css';
import { slugify } from '../../utils/utils';
import { GenshinCharacter } from '../../types/types';

interface CardProps
  extends Pick<JSX.DOMAttributes<HTMLButtonElement>, 'onClick'> {
  character?: DeepReadonly<GenshinCharacter>;
}

const Card: Component<CardProps> = props => {
  if (!props.character) {
    return (
      <div class={`${styles.card} ${styles.selected}`}>
        <div class={styles.imageHolder}>
          <img class={styles.emptyImage} src="/img/icons/empty.svg" alt="" />
        </div>
        <div class={styles.name}>{props.children}</div>
      </div>
    );
  }

  return (
    <button
      class={styles.card}
      classList={{
        [styles.selected]: props.character.selected,
      }}
      onClick={props.onClick}
    >
      <div
        class={styles.imageHolder}
        classList={{
          [styles.fourStar]: props.character.stars === 4,
          [styles.fiveStar]: props.character.stars === 5,
          [styles.collab]: props.character.collab,
        }}
      >
        <img
          class={styles.characterImage}
          src={`/img/characters/${slugify(props.character.fullName)}.png`}
          alt=""
        />
      </div>
      <div class={styles.elementsContainer}>
        {props.character.elements?.map(element => (
          <img
            class={styles.element}
            src={`/img/elements/${element}.svg`}
            alt=""
          />
        ))}
      </div>
      <div class={styles.name}>{props.character.fullName}</div>
    </button>
  );
};

export { Card };
