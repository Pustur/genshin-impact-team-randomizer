import styles from './Filters.module.css';

import { Component } from 'solid-js';
import { setFilterElements } from '../../data/store';
import { elementNames } from '../../utils/const';

const Filters: Component = () => {
  return (
    <div class={styles.filters}>
      <div class="filter elements">
        {elementNames.map(element => {
          const id = `element-${element}`;

          return (
            <div class="field element">
              <input
                id={id}
                type="checkbox"
                value={element}
                onChange={e => {
                  const { value, checked } = e.currentTarget;

                  if (!checked) {
                    setFilterElements(prev => prev.filter(v => v !== value));
                  } else setFilterElements(prev => prev.concat(value));
                }}
              />
              <label for={id}>{element}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Filters };
