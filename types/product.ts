import {IKind} from "~/types/kind";
import {IMorph} from "~/types/morphs";
import {IUser} from "~/types/user";
import {ISubcategory} from "~/types/subcategory";
import {ILocality} from "~/types/locality";

export interface IProduct {
  id: string,
  name: string,
  article: string,
  price: Array<{
    amount: number,
    currency: 'RUB'|'USD'|'EUR'
  }>,
  sex: boolean|null,
  currency: 'RUB'|'USD'|'EUR',
  cb: string|Date,
  askPrice: boolean,
  isActive: boolean,
  description: string|null,
  group: {
    male: number,
    female: number
  }|null,

  images: Array<{
    id: string,
    imgSrc: string
  }>
  preview: {
    id: string,
    imgSrc: string
  }

  age: {
    id: string,
    title: string
  }

  shop: IUser


  kind: IKind,
  subcategory: ISubcategory,
  locality: ILocality,

  morphs: Array<IMorph>,
}
