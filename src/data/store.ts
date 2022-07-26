import { createLocalStore } from '../utils/utils';
import { GenshinCharacter } from '../types/types';

const preselectedCharacters: GenshinCharacter['id'][] = [
  4, 5, 18, 25, 41, 39, 28,
];

const [selectedCharacters, setSelectedCharacters] = createLocalStore(
  'selectedCharacters',
  {
    selectedCharacters: preselectedCharacters,
  },
);

export { selectedCharacters, setSelectedCharacters };
