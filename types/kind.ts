export interface IKind {
  id: number,
  active: boolean,
  slug: string,
  titleRus: string,
  titleEng: string,
  onlyText: boolean,
  group: string,

  activeSubcategories: Array<any>
  subcategories: Array<any>
}
