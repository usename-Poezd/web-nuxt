import {ISubcategory} from "~/types/subcategory";

export interface IKind {
  id: number,
  active: boolean,
  slug: string,
  titleRus: string,
  titleEng: string,
  onlyText: boolean,
  group: string,

  logoSquare: string,

  activeSubcategories: Array<ISubcategory>
  subcategories: Array<ISubcategory>
}
