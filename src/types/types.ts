export type GenshinElement =
  | 'anemo'
  | 'cryo'
  | 'dendro'
  | 'electro'
  | 'geo'
  | 'hydro'
  | 'pyro';

export interface GenshinCharacter {
  fullName: string;
  shortName: string;
  stars: 4 | 5;
  elements: GenshinElement[];
  checked: boolean;
  collab: boolean;
}
