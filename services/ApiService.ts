import {NuxtAxiosInstance} from "@nuxtjs/axios";
import {Deserializer} from "jsonapi-serializer";
import qs from "qs";

interface IApiService {
  getKinds: () => Promise<any>
  getKind: (slug: string, options?: any) => Promise<any>,
  getSubcategory: (slug: string) => Promise<any>,
  getProducts: (options?: any) => Promise<any>
}

class ApiService implements IApiService {
  api: NuxtAxiosInstance;

  deserializer = new Deserializer({keyForAttribute: "camelCase"});

  constructor(api: NuxtAxiosInstance) {
    this.api = api;
  }

  getKinds = async () => {
    const data = await this.api.$get('kinds');

    return this.deserializer.deserialize(data)
      .then((data) => data);
  };

  getKind = async (slug: string, options: any = {}) => {
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

  getProducts = async (options: any = {}) => {
    let url = `products?include=${options.include || ''}&sort=${options.sort || 'random'}`;

    const query = qs.stringify(options.query);
    url += `&${query}`;

    const data = await this.api.$get(url);

    return this.deserializer.deserialize(data)
      .then((data) => data);
  };

}


export {
  ApiService,
  IApiService
}
