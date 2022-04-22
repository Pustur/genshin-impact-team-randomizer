import { Component, createMemo, createSignal, For } from 'solid-js';
import styles from './App.module.css';

import { Card } from '../Card';
import { characters } from '../../data/characters';
import { state, setState } from '../../data/store';
import { GenshinCharacter } from '../../types/types';
import { shuffle, toggleSet } from '../../utils/utils';

const toggleSelected = (id: GenshinCharacter['id']) => {
  setState(state => ({
    ...state,
    selectedCharacters: toggleSet(state.selectedCharacters, id),
  }));
};

const idToCard =
  (offset: number = 0) =>
  (id: GenshinCharacter['id'], index: number) =>
    (
      <Card
        index={index + offset}
        character={characters.find(c => c.id === id)}
      />
    );

const App: Component = () => {
  const [teams, setTeams] = createSignal<GenshinCharacter['id'][]>([]);
  const team1 = createMemo(() =>
    Array.from({ length: 4 }, (_, i) => teams()[i]),
  );
  const team2 = createMemo(() =>
    Array.from({ length: 4 }, (_, i) => teams()[i + 4]),
  );

  return (
    <>
      <div class={styles.teams}>
        <div class={`${styles.grid} ${styles.team}`}>
          {team1().map(idToCard())}
        </div>
        <div class={`${styles.grid} ${styles.team}`}>
          {team2().map(idToCard(4))}
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            const rnd = shuffle(Array.from(state.selectedCharacters));
            setTeams(() => rnd.slice(0, 8));
          }}
        >
          Generate teams
        </button>
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
