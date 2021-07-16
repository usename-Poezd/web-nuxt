import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate';
import {required, min, confirmed, min_value} from "vee-validate/dist/rules";

import ru from 'vee-validate/dist/locale/ru.json';
localize({
  ru
});

localize('ru');

extend('min_value', min_value)
extend('confirmed', confirmed);
extend('min', min);
extend('required', required);

// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
