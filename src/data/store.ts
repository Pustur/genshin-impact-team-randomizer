import { createStore } from 'solid-js/store';

import { characters as c } from './characters';

const [state, setState] = createStore({ characters: c });

export { state, setState };
