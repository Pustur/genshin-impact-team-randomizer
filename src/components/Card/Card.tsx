import {
  Component,
  ParentComponent,
  createSignal,
  JSX,
  onMount,
} from 'solid-js';

import styles from './Card.module.css';
import { nextFrame, shuffle, slugify } from '../../utils/utils';
import { GenshinCharacter } from '../../types/types';
import { state } from '../../data/store';

interface ICard {
  onClick?: JSX.EventHandler<HTMLButtonElement, MouseEvent>;
  character?: GenshinCharacter;
  index?: number;
}

type IShellCard = Pick<ICard, 'index'>;

type IDisplayCard = ICard & Required<Pick<ICard, 'character'>>;

type IInteractiveCard = Required<Pick<ICard, 'character' | 'onClick'>>;

const ShellCard: ParentComponent<IShellCard> = props => {
  const [isMounted, setIsMounted] = createSignal(false);

  onMount(() => nextFrame(() => setIsMounted(true)));

  return (
    <div
      style={{ '--card-transition-delay': `${(props.index ?? 0) * 100}ms` }}
      class={`${styles.card} ${styles.selected} ${styles.transition}`}
      classList={{
        [styles.animate]: isMounted(),
      }}
    >
      {props.children}
    </div>
  );
};

const EmptyCard: Component = () => {
  return (
    <>
      <div class={styles.imageHolder}>
        <img class={styles.emptyImage} src="/img/icons/empty.svg" alt="" />
      </div>
      <div class={styles.name}>--</div>
    </>
  );
};

const DisplayCard: Component<IDisplayCard> = props => {
  const element = () => {
    if (props.character.elements.length === 1) {
      return props.character.elements[0];
    }
    return shuffle(Array.from(props.character.elements)).slice(0, 1);
  };

  return (
    <>
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
        <img
          class={styles.element}
          src={`/img/elements/${element()}.svg`}
          alt=""
        />
      </div>
      <div class={styles.name}>{props.character.fullName}</div>
    </>
  );
};

const InteractiveCard: Component<IInteractiveCard> = props => {
  return (
    <button
      class={styles.card}
      classList={{
        [styles.selected]: state.selectedCharacters.includes(
          props.character.id,
        ),
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
  if (!props.character) {
    return (
      <ShellCard index={props.index}>
        <EmptyCard />
      </ShellCard>
    );
  }
  if (!props.onClick) {
    return (
      <ShellCard index={props.index}>
        <DisplayCard character={props.character} />
      </ShellCard>
    );
  }
  return (
    <InteractiveCard onClick={props.onClick} character={props.character} />
  );
};

export { Card };
