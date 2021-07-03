import {NuxtAxiosInstance} from "@nuxtjs/axios";
import {Deserializer} from "jsonapi-serializer";
import qs from "qs";
import {IKind, IMorph} from "~/types";
import {JsonApiService} from "~/services/JsonApiService";

class ApiService {
  private api: NuxtAxiosInstance;
  private authApi: NuxtAxiosInstance;


  private deserializer = new Deserializer({keyForAttribute: "camelCase"});

  constructor(api: NuxtAxiosInstance, authApi: NuxtAxiosInstance) {
    this.api = api;
    this.authApi = authApi
  }

  me = async (access_token: string): Promise<any> => {
    return await this.authApi.$post('me', {}, {
      headers: {
        Authorization: 'Bearer ' + access_token
      }
    });
  };

  register = async (user: any): Promise<any> => {
    return await this.authApi.$post('register', user);
  };

  login = async (loginData: any): Promise<any> => {
    return await this.authApi.$post('login', loginData);
  };

  refresh = async (refresh_token: string): Promise<any> => {
    return await this.authApi.$post('refresh', {refresh_token});
  };

   sendVerification = async (data: any): Promise<any> => {
    return await this.authApi.$post('verify/send', data);
  };

  verify = async (data: any): Promise<any> => {
    return await this.authApi.$post('verify', data);
  };


  getKinds = async (): Promise<Array<IKind>> => {
    const data = await this.api.$get('kinds?include=subcategories,subcategories.localities');

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

  getKindTable = async (id: string|number): Promise<any> => {
    return this.api.$get(`kinds/${id}/table`)
      .then((resp) => resp.data);
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

  // Products

  getProducts = async (options: any = {}) => {
    let url = `products?include=${options.include || ''}`;

    if (options.query.sort) {
      url += `&sort=${options.query.sort}`
    } else if (!options.query.q) {
      url += `&sort=${options.query.sort || 'random'}`
    }

    const query = qs.stringify(options.query);
    url += `&${query}`;

    const data = await this.api.$get(url);
    const products = await this.deserializer.deserialize(data);

    return {
      products,
      meta: data.meta
    };
  };

  getProduct = async (id: number|string, include = '') => {
    const data = await this.api.$get(`products/${id}?${include && `include=${include}`}`);
    return await this.deserializer.deserialize(data);
  };

  updateProduct = async (product: any = {}, include: string = '') => {
    const data = await this.api.$patch(`products/${product.id}?include=${include}`, JsonApiService.serializeProduct(product));

    return this.deserializer.deserialize(data)
      .then((data) => data);
  }

  createProduct = async (product: any = {}) => {
    const data = await this.api.$post(`products`, JsonApiService.serializeProduct(product));

    return this.deserializer.deserialize(data)
      .then((data) => data);
  }

  deleteProduct = async (id: number|string) => {
    const data = await this.api.$delete(`products/${id}`);

    return this.deserializer.deserialize(data)
      .then((data) => data);
  }

  // Divorces

  getDivorces = async (options: any = {}) => {
    let url = `divorces?include=${options.include || ''}`;

    if (options.query.sort) {
      url += `&sort=${options.sort}`
    } else if (!options.query.q) {
      url += `&sort=${options.sort || 'cb'}`
    }

    const query = qs.stringify(options.query);
    url += `&${query}`;

    const data = await this.api.$get(url);
    const divorces = await this.deserializer.deserialize(data);

    return {
      divorces,
      meta: data.meta
    };
  };

  getDivorce = async (id: number|string, include = '') => {
    const data = await this.api.$get(`divorces/${id}?${include && `include=${include}`}`);
    return await this.deserializer.deserialize(data);
  };

  updateDivorce = async (divorce: any = {}, include: string = '') => {
    const data = await this.api.$patch<any>(`divorces/${divorce.id}?include=${include}`, JsonApiService.serializeDivorce(divorce));

    return this.deserializer.deserialize(data)
      .then((data) => data);
  }

  createDivorce = async (divorce: any = {}) => {
    const data = await this.api.$post<any>(`divorces`, JsonApiService.serializeDivorce(divorce));

    return this.deserializer.deserialize(data)
      .then((data) => data);
  }

  deleteDivorce = async (id: number|string) => {
    const data = await this.api.$delete(`divorces/${id}`);

    return this.deserializer.deserialize(data)
      .then((data) => data);
  }

  // User

  updateUser = async (user: any = {}, options: any = {}) => {
    const data = await this.api.$patch(`users/${user.id}`, JsonApiService.serializeUser(user), options);

    return this.deserializer.deserialize(data)
      .then((data) => data);
  }

  // Divorces

  getDocuments = async () => {
    const data = await this.api.$get('documents?fields[documents]=title,label');
    return await this.deserializer.deserialize(data)
  };

  getDocument = async (id: number|string) => {
    const data = await this.api.$get(`documents/${id}?fields[documents]=title,description`);
    return await this.deserializer.deserialize(data);
  };
}


type ApiServiceType =  ApiService;

export {
  ApiService,
  ApiServiceType
}
