import Vue from 'vue'
// @ts-ignore
import {VModal} from 'vue-js-modal';
// @ts-ignore
import VueModal from 'vue-js-modal/dist/ssr.nocss';
import 'vue-js-modal/dist/styles.css';

declare module 'vue/types/vue' {
  interface Vue {
    $modal: VModal
  }
}

Vue.use(VueModal, {dynamic: true});
