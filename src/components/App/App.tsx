import { Component, For } from 'solid-js';

import { Card } from '../Card';
import { state } from '../../data/store';

const App: Component = () => {
  return (
    <For each={state.characters}>{character => <Card item={character} />}</For>
  );
};

export { App };
