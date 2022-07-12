import { Component, createSignal, For } from 'solid-js';
import styles from './App.module.css';

import { Card } from '../Card';
import { Button } from '../Button';
import { characters } from '../../data/characters';
import { state, setState } from '../../data/store';
import { GenshinCharacter } from '../../types/types';
import { shuffle, toggleSet } from '../../utils/utils';

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
  const team1 = () => Array.from({ length: 4 }, (_, i) => teams()[i]);
  const team2 = () => Array.from({ length: 4 }, (_, i) => teams()[i + 4]);
  const generateTeams = () => {
    const rnd = shuffle(Array.from(state.selectedCharacters));
    setTeams(() => rnd.slice(0, 8));
  };

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
        <Button onClick={generateTeams}>Generate teams</Button>
      </div>
      <div class={styles.grid}>
        <For each={characters}>
          {character => (
            <Card
              onClick={() => {
                setState(state => ({
                  ...state,
                  selectedCharacters: toggleSet(
                    state.selectedCharacters,
                    character.id,
                  ),
                }));
              }}
              character={character}
            />
          )}
        </For>
      </div>
    </>
  );
};

export { App };
