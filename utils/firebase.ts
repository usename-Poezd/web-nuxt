import * as Cookies from "js-cookie";
import moment from "moment";
import {ApiServiceType} from "~/services";
import {NuxtCookies} from "cookie-universal-nuxt";

export const setFirebaseToken = async ($api: ApiServiceType, $cookies: NuxtCookies, access_token = '') => {
  if (!$cookies.get('bfbc')) {
    const token = await $api.getFirebaseToken(access_token);
    $cookies.set('bfbc', token, {expires: moment().add(1, 'hour').toDate()});
  }
};

export const getFirebaseToken = ($cookies: NuxtCookies): string => $cookies.get('bfbc') || '';
