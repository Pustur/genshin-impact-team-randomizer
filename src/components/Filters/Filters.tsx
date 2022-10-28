import styles from './Filters.module.css';

import { Component } from 'solid-js';
import { setFilterElements, setFilterRarity } from '../../data/store';
import { elementNames, rarities } from '../../utils/const';

const Filters: Component = () => {
  return (
    <div class={styles.filters}>
      <div class={styles.filterElements}>
        {elementNames.map(element => {
          const id = `filter-element-${element}`;

          return (
            <div>
              <input
                id={id}
                class={`${styles.checkbox} sr-only`}
                type="checkbox"
                value={element}
                onChange={e => {
                  const { value, checked } = e.currentTarget;

                  if (!checked) {
                    setFilterElements(prev => prev.filter(v => v !== value));
                  } else setFilterElements(prev => prev.concat(value));
                }}
              />
              <label
                class={`${styles[element]} ${styles.label}`}
                for={id}
                title={element}
              >
                {element}
              </label>
            </div>
          );
        })}
      </div>

      <div class={styles.filterRarity}>
        {rarities.map(rarity => {
          return (
            <div>
              <input
                id={`filter-rarity-${rarity}`}
                class={`${styles.checkbox} sr-only`}
                type="checkbox"
                value={rarity}
                onChange={e => {
                  const { value, checked } = e.currentTarget;

                  if (!checked) {
                    setFilterRarity(prev =>
                      prev.filter(v => v !== Number(value)),
                    );
                  } else setFilterRarity(prev => prev.concat(Number(value)));
                }}
              />
              <label
                class={`${styles[`stars${rarity}`]} ${styles.label}`}
                for={`filter-rarity-${rarity}`}
                title={`${rarity} stars`}
              >
                {rarity} Stars
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Filters };
