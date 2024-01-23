import { createLocalStore } from '../utils/utils';
import { createStore } from 'solid-js/store';
import { characters } from './characters';

const preselectedCharacters = characters.filter(c => c.selected).map(c => c.id);

const [filterElements, setFilterElements] = createStore<string[]>([]);

const [filterWeapons, setFilterWeapons] = createStore<string[]>([]);

const [filterGender, setFilterGender] = createStore<string[]>([]);

const [filterRarity, setFilterRarity] = createStore<number[]>([]);

const [selectedCharacters, setSelectedCharacters] = createLocalStore(
  'selectedCharacters',
  {
    selectedCharacters: preselectedCharacters,
  },
);

const [teamsCount, setTeamsCount] = createLocalStore('teamsCount', {
  teamsCount: 2,
});

export {
  selectedCharacters,
  setSelectedCharacters,
  filterElements,
  setFilterElements,
  filterWeapons,
  setFilterWeapons,
  filterGender,
  setFilterGender,
  filterRarity,
  setFilterRarity,
  teamsCount,
  setTeamsCount,
};
