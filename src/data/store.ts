import { createLocalStore } from '../utils/utils';
import { GenshinCharacter } from '../types/types';
import { createStore } from 'solid-js/store';

const preselectedCharacters: GenshinCharacter['id'][] = [
  4, 5, 18, 25, 41, 39, 28,
];

const [filterElements, setFilterElements] = createStore<string[]>([]);

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
  filterRarity,
  setFilterRarity,
};
