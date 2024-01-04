export type GenshinElement =
  | 'anemo'
  | 'cryo'
  | 'dendro'
  | 'electro'
  | 'geo'
  | 'hydro'
  | 'pyro';

export type GenshinWeapon =
  | 'bow'
  | 'catalyst'
  | 'claymore'
  | 'polearm'
  | 'sword';

export type Gender = 'F' | 'M';

export interface GenshinCharacter {
  id: number;
  fullName: string;
  shortName: string;
  stars: 4 | 5;
  elements: GenshinElement[];
  weapon: GenshinWeapon;
  gender: Gender[];
  selected: boolean;
  collab: boolean;
}

export interface AdditionalFilters {
  unique: boolean;
}
