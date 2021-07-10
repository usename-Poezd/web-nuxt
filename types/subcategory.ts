import {ILocality} from "~/types/locality";

export interface ISubcategory {
  id: string
  title: string,
  slug: string,
  localities: Array<ILocality>
  activeLocalities: Array<ILocality>
}
