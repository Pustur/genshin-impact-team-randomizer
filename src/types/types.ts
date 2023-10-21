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

export interface GenshinCharacter {
  id: number;
  fullName: string;
  shortName: string;
  stars: 4 | 5;
  elements: GenshinElement[];
  weapon: GenshinWeapon;
  selected: boolean;
  collab: boolean;
}
