import {IKind} from "~/types/kind";
import {ISeoOption} from "~/types/seo-option";

export interface IUser {
  id: string,
  name: string,
  surname: string,
  companyName: string,
  isBreeder: boolean,
  phone: string,
  email: string,
  logoImg: string,
  profileImg: string,
  description: string,
  about: string,
  policity: string,
  location: string,
  owner: string,

  kinds: Array<IKind>,
  guardKinds: Array<IKind>,
  country: {
    iso31663: string
  },

  seo: ISeoOption,

  website: string,
  vk: string,
  instagram: string,
  facebook: string,
  youtube: string,

  localDelivery: boolean,
  regionalDelivery: boolean,
  countrywideDelivery: boolean,

  createdAt: string|Date,

  unreadChats: any
}
