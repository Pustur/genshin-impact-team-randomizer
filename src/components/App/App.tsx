import { Component, For } from 'solid-js';
import styles from './App.module.css';

import { Card } from '../Card';
import { setState, state } from '../../data/store';
import { GenshinCharacter } from '../../types/types';

const toggleSelected = (fullName: GenshinCharacter['fullName']) => {
  setState(
    'characters',
    character => character.fullName === fullName,
    'selected',
    selected => !selected,
  );
};

const App: Component = () => {
  return (
    <>
      <div class={styles.teams}>
        <div class={`${styles.grid} ${styles.team}`}>
          <Card>--</Card>
          <Card>--</Card>
          <Card>--</Card>
          <Card>--</Card>
        </div>
        <div class={`${styles.grid} ${styles.team}`}>
          <Card>--</Card>
          <Card>--</Card>
          <Card>--</Card>
          <Card>--</Card>
        </div>
      </div>
      <div class={styles.grid}>
        <For each={state.characters}>
          {character => (
            <Card
              onClick={[toggleSelected, character.fullName]}
              character={character}
            />
          )}
        </For>
      </div>
    </>
  );
};

export { App };
