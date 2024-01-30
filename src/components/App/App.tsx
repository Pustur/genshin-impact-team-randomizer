import { Component, createSignal, For } from 'solid-js';
import styles from './App.module.css';

import { Card } from '../Card';
import { Button } from '../Button';
import { Container } from '../Container';
import { Filters } from '../Filters';
import { characters } from '../../data/characters';
import {
  filterElements,
  filterGender,
  filterRarity,
  filterWeapons,
  selectedCharacters,
  setSelectedCharacters,
  teamsCount,
  setTeamsCount,
} from '../../data/store';
import { Gender, GenshinCharacter, GenshinElement } from '../../types/types';
import { shuffle } from '../../utils/utils';
import { teamSize, minTeams, maxTeams } from '../../utils/const';

const idToCard =
  (offset: number = 0) =>
  (id: GenshinCharacter['id'], index: number) => (
    <Card
      index={index + offset}
      character={characters.find(c => c.id === id)}
    />
  );

const App: Component = () => {
  const [teams, setTeams] = createSignal<GenshinCharacter['id'][]>([]);
  const areAllCharatersSelected = () =>
    selectedCharacters.selectedCharacters.length === characters.length;
  const generateTeams = () => {
    const rnd = shuffle(Array.from(selectedCharacters.selectedCharacters));
    setTeams(() => rnd.slice(0, teamsCount.teamsCount * teamSize));
  };
  const increaseTeamSize = () => {
    setTeamsCount(state => ({
      ...state,
      teamsCount: Math.min(teamsCount.teamsCount + 2, maxTeams),
    }));
  };
  const decreaseTeamSize = () => {
    setTeamsCount(state => ({
      ...state,
      teamsCount: Math.max(teamsCount.teamsCount - 2, minTeams),
    }));
  };

  return (
    <>
      <header class={styles.header}>
        <a
          href="https://github.com/Pustur/genshin-impact-team-randomizer"
          target="_blank"
        >
          GitHub Repository
        </a>
      </header>
      <main>
        <h1 class={styles.title}>Genshin Impact Team Randomizer</h1>
        <div class={styles.teams}>
          <For
            each={Array.from({ length: teamsCount.teamsCount }, (_, i) => i)}
          >
            {teamIndex => (
              <div class={`${styles.grid} ${styles.team}`}>
                {Array.from(
                  { length: teamSize },
                  (_, i) => teams()[i + teamIndex * teamSize],
                ).map(idToCard((teamIndex % 2) * teamSize))}
              </div>
            )}
          </For>
        </div>
        <div class={styles.buttons}>
          <Button
            secondary
            onClick={() =>
              setSelectedCharacters(state => ({
                ...state,
                selectedCharacters: areAllCharatersSelected()
                  ? []
                  : characters.map(c => c.id),
              }))
            }
          >
            {areAllCharatersSelected() ? 'Deselect' : 'Select'} all
          </Button>
          <Button onClick={generateTeams}>Generate teams</Button>
          {teamsCount.teamsCount < maxTeams && (
            <Button secondary onClick={increaseTeamSize}>
              Add Team
            </Button>
          )}
          {teamsCount.teamsCount > minTeams && (
            <Button secondary onClick={decreaseTeamSize}>
              Remove Team
            </Button>
          )}
        </div>
        <Container>
          <Filters />
        </Container>
        <div class={`${styles.grid} ${styles.mainGrid}`}>
          <For each={characters}>
            {character => {
              const isSameElement = () =>
                filterElements.length === 0 ||
                filterElements.some(e =>
                  character.elements.includes(e as GenshinElement),
                );
              const isSameWeapon = () =>
                filterWeapons.length === 0 ||
                filterWeapons.some(w => character.weapon.includes(w));
              const isSameGender = () =>
                filterGender.length === 0 ||
                filterGender.some(g => character.gender.includes(g as Gender));
              const isSameRarity = () =>
                filterRarity.length === 0 ||
                filterRarity.includes(character.stars);
              const isShown = () =>
                isSameElement() &&
                isSameWeapon() &&
                isSameGender() &&
                isSameRarity();

              return (
                <Card
                  classList={{ [styles.hidden]: !isShown() }}
                  onClick={() => {
                    setSelectedCharacters(state => {
                      if (state.selectedCharacters.includes(character.id)) {
                        return {
                          ...state,
                          selectedCharacters: [
                            ...state.selectedCharacters.filter(
                              selected => selected !== character.id,
                            ),
                          ],
                        };
                      }
                      return {
                        ...state,
                        selectedCharacters: [
                          ...state.selectedCharacters,
                          character.id,
                        ],
                      };
                    });
                  }}
                  character={character}
                />
              );
            }}
          </For>
        </div>
      </main>
    </>
  );
};

export { App };
