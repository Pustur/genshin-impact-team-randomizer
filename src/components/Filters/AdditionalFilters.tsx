import { addtionalFilters, setAddtionalFilters } from '../../data/store';
import styles from './AdditionalFilters.module.css';

import { Component, JSX } from 'solid-js';

const AdditionalFilters: Component<
  JSX.HTMLAttributes<HTMLDivElement>
> = props => {
  return (
    <div {...props} class={`${styles.additionalFilters}`}>
      <div title="Does not repeat characters">
        <input
          id="uniqueFilter"
          name="uniqueFilter"
          type="checkbox"
          checked={addtionalFilters.unique}
          class={`${styles.checkbox}`}
          onChange={e =>
            setAddtionalFilters(prev => ({
              ...prev,
              unique: e.currentTarget.checked,
            }))
          }
        />
        <label for="uniqueFilter">Do not repeat characters</label>
      </div>
    </div>
  );
};

export default AdditionalFilters;
