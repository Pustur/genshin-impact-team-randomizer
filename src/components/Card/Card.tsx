import { Component } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';

import { GenshinCharacter } from '../../types/types';

const Card: Component<{ item: DeepReadonly<GenshinCharacter> }> = props => {
  return <div>{props.item.fullName}</div>;
};

export { Card };
