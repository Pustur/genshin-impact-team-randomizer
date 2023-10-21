import { createLocalStore } from '../utils/utils';
import { createStore } from 'solid-js/store';
import { characters } from './characters';

const preselectedCharacters = characters.filter(c => c.selected).map(c => c.id);

const [filterElements, setFilterElements] = createStore<string[]>([]);

const [filterWeapons, setFilterWeapons] = createStore<string[]>([]);

const [filterRarity, setFilterRarity] = createStore<number[]>([]);

const [selectedCharacters, setSelectedCharacters] = createLocalStore(
  'selectedCharacters',
  {
    selectedCharacters: preselectedCharacters,
  },
);

export {
  selectedCharacters,
  setSelectedCharacters,
  filterElements,
  setFilterElements,
  filterWeapons,
  setFilterWeapons,
  filterRarity,
  setFilterRarity,
};
