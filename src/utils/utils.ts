function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-');
}

function toggleSet<T>(set: Set<T>, value: T): Set<T> {
  set.delete(value) || set.add(value);
  return new Set(set);
}

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export { slugify, toggleSet, shuffle };
