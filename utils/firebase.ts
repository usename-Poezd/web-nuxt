import * as Cookies from "js-cookie";
import moment from "moment";
import {ApiServiceType} from "~/services";

export const setFirebaseToken = async ($api: ApiServiceType, access_token = '') => {
  if (!Cookies.get('bfbc')) {
    const token = await $api.getFirebaseToken(access_token);
    Cookies.set('bfbc', token, {expires: moment().add(1, 'hour').toDate()});
  }
};

export const getFirebaseToken = (): string =>Cookies.get('bfbc') || '';
