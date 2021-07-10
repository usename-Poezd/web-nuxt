import {ISubcategory} from "~/types/subcategory";
import {ISeoOption} from "~/types/seo-option";

export interface IKind {
  id: number,
  active: boolean,
  slug: string,
  titleRus: string,
  titleEng: string,
  onlyText: boolean,
  group: string,

  seo: {
    morphs: ISeoOption,
    kind: ISeoOption
  }

  logoSquare: string,

  activeSubcategories: Array<ISubcategory>
  subcategories: Array<ISubcategory>
}
