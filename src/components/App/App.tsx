import { Component, For } from 'solid-js';
import styles from './App.module.css';

import { Card } from '../Card';
import { characters } from '../../data/characters';
import { setState } from '../../data/store';
import { GenshinCharacter } from '../../types/types';
import { toggleSet } from '../../utils/utils';

const toggleSelected = (id: GenshinCharacter['id']) => {
  setState(state => ({
    ...state,
    selectedCharacters: toggleSet(state.selectedCharacters, id),
  }));
};

const App: Component = () => {
  return (
    <>
      <div class={styles.teams}>
        <div class={`${styles.grid} ${styles.team}`}>
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <div class={`${styles.grid} ${styles.team}`}>
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      <div class={styles.grid}>
        <For each={characters}>
          {character => (
            <Card
              onClick={[toggleSelected, character.id]}
              character={character}
            />
          )}
        </For>
      </div>
    </>
  );
};

export { App };
