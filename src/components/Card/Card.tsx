import { Component, JSX } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';

import styles from './Card.module.css';
import { slugify } from '../../utils/utils';
import { GenshinCharacter } from '../../types/types';
import { state } from '../../data/store';

interface ICard extends Pick<JSX.DOMAttributes<HTMLButtonElement>, 'onClick'> {
  character?: DeepReadonly<GenshinCharacter>;
}

type IDisplayCard = ICard & Required<Pick<ICard, 'character'>>;

type IInteractiveCard = Required<ICard>;

const EmptyCard: Component = () => {
  return (
    <div class={`${styles.card} ${styles.selected}`}>
      <div class={styles.imageHolder}>
        <img class={styles.emptyImage} src="/img/icons/empty.svg" alt="" />
      </div>
      <div class={styles.name}>--</div>
    </div>
  );
};

const DisplayCard: Component<IDisplayCard> = props => {
  return (
    <div class={`${styles.card} ${styles.selected}`}>
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
        {props.character.elements.map(element => (
          <img
            class={styles.element}
            src={`/img/elements/${element}.svg`}
            alt=""
          />
        ))}
      </div>
      <div class={styles.name}>{props.character.fullName}</div>
    </div>
  );
};

const InteractiveCard: Component<IInteractiveCard> = props => {
  return (
    <button
      class={styles.card}
      classList={{
        [styles.selected]: state.selectedCharacters.has(props.character.id),
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
        {props.character.elements.map(element => (
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

const Card: Component<ICard> = props => {
  if (!props.character) return <EmptyCard />;
  if (!props.onClick) return <DisplayCard character={props.character} />;
  return (
    <InteractiveCard onClick={props.onClick} character={props.character} />
  );
};

export { Card };
