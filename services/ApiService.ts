import {NuxtAxiosInstance} from "@nuxtjs/axios";
import {Deserializer} from "jsonapi-serializer";
import qs from "qs";
import {IMorph, IKind} from "~/types";

class ApiService {
  private api: NuxtAxiosInstance;

  private  deserializer = new Deserializer({keyForAttribute: "camelCase"});

  constructor(api: NuxtAxiosInstance) {
    this.api = api;
  }

  getKinds = async (): Promise<Array<IKind>> => {
    const data = await this.api.$get('kinds');

    return this.deserializer.deserialize(data)
      .then((data) => data);
  };

  getKind = async (slug: string, options: any = {}): Promise<IKind> => {
    let url = `kinds?filter[slug]=${slug}&include=${options.include || ''}`;
    const query = qs.stringify(options.query);
    url += `&${query}`;
    const data = await this.api.$get(url);

    return this.deserializer.deserialize(data)
      .then((data) => data);
  };

  getSubcategory = async (slug: string) => {
    const data = await this.api.$get(`subcategories?filter[slug]=${slug}&include=kind,localities`);

    return this.deserializer.deserialize(data)
      .then((data) => data);
  };

  searchMorphs = async (q: string, kind: string): Promise<Array<IMorph>> => {
    return await this.api.$get(`/search/morphs?q=${q}&kind=${kind}`)
      .then((res) => res.data);
  };

  getProducts = async (options: any = {}) => {
    let url = `products?include=${options.include || ''}&sort=${options.sort || 'random'}`;

    const query = qs.stringify(options.query);
    url += `&${query}`;

    const data = await this.api.$get(url);
    const products = await this.deserializer.deserialize(data);

    return {
      products,
      meta: data.meta
    };
  };

}


type ApiServiceType =  ApiService;

export {
  ApiService,
  ApiServiceType
}
