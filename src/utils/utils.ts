const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, '-');

function toggleSet<T>(set: Set<T>, value: T): Set<T> {
  set.delete(value) || set.add(value);
  return new Set(set);
}

export { slugify, toggleSet };
