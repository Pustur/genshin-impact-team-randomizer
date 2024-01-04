import styles from './Filters.module.css';

import { Component, createSignal } from 'solid-js';
import {
  filterElements,
  setFilterElements,
  filterWeapons,
  setFilterWeapons,
  filterRarity,
  setFilterRarity,
  filterGender,
  setFilterGender,
} from '../../data/store';
import {
  elementNames,
  weaponNames,
  rarities,
  genders,
} from '../../utils/const';
import AdditionalFilters from './AdditionalFilters';

const Filters: Component = () => {
  const [isAdditionalFilterOpen, setIsAdditionalFilterOpen] =
    createSignal(false);
  return (
    <>
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
                  checked={filterElements.includes(element)}
                  onClick={e => {
                    const { value, checked } = e.currentTarget;

                    if (e.altKey) {
                      setFilterElements([value]);
                    } else if (!checked) {
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

        <div class={styles.filterWeapons}>
          {weaponNames.map(weapon => {
            const id = `filter-weapon-${weapon}`;

            return (
              <div>
                <input
                  id={id}
                  class={`${styles.checkbox} sr-only`}
                  type="checkbox"
                  value={weapon}
                  checked={filterWeapons.includes(weapon)}
                  onClick={e => {
                    const { value, checked } = e.currentTarget;

                    if (e.altKey) {
                      setFilterWeapons([value]);
                    } else if (!checked) {
                      setFilterWeapons(prev => prev.filter(v => v !== value));
                    } else setFilterWeapons(prev => prev.concat(value));
                  }}
                />
                <label
                  class={`${styles[weapon]} ${styles.label}`}
                  for={id}
                  title={weapon}
                >
                  {weapon}
                </label>
              </div>
            );
          })}
        </div>

        <div class={styles.filterRarity}>
          {rarities.map(rarity => {
            const id = `filter-rarity-${rarity}`;

            return (
              <div>
                <input
                  id={id}
                  class={`${styles.checkbox} sr-only`}
                  type="checkbox"
                  value={rarity}
                  checked={filterRarity.includes(rarity)}
                  onClick={e => {
                    const { value, checked } = e.currentTarget;

                    if (e.altKey) {
                      setFilterRarity([Number(value)]);
                    } else if (!checked) {
                      setFilterRarity(prev =>
                        prev.filter(v => v !== Number(value)),
                      );
                    } else setFilterRarity(prev => prev.concat(Number(value)));
                  }}
                />
                <label
                  class={`${styles[`stars${rarity}`]} ${styles.label}`}
                  for={id}
                  title={`${rarity} stars`}
                >
                  {rarity} stars
                </label>
              </div>
            );
          })}
        </div>

        <div class={styles.filterGender}>
          {genders.map(gender => {
            const id = `filter-gender-${gender}`;

            return (
              <div>
                <input
                  id={id}
                  class={`${styles.checkbox} sr-only`}
                  type="checkbox"
                  value={gender}
                  checked={filterGender.includes(gender)}
                  onClick={e => {
                    const { value, checked } = e.currentTarget;

                    if (e.altKey) {
                      setFilterGender([value]);
                    } else if (!checked) {
                      setFilterGender(prev => prev.filter(v => v !== value));
                    } else setFilterGender(prev => prev.concat(value));
                  }}
                />
                <label
                  class={`${styles[`gender${gender}`]} ${styles.label}`}
                  for={id}
                  title={`gender ${gender}`}
                >
                  gender {gender}
                </label>
              </div>
            );
          })}
        </div>
        <div>
          <input
            type="button"
            id="additionalFilters"
            class="sr-only"
            onClick={() => setIsAdditionalFilterOpen(!isAdditionalFilterOpen())}
            value="Click Me"
          />
          <label
            for={'additionalFilters'}
            class={`${styles.label} ${styles['additionalFilters']}`}
            title="Additional Filters"
          >
            Additional Filters
          </label>
        </div>
      </div>
      <AdditionalFilters data-show={isAdditionalFilterOpen()} />
    </>
  );
};

export { Filters };
