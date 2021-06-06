export interface IKind {
  id: number,
  active: boolean,
  slug: string,
  title_rus: string,
  title_eng: string,
  group: string,

  activeSubcategories: Array<any>
}
