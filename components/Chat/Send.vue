<template>
  <div class="w-full h-full p-4">
    <div v-if="!isAuthenticated" class="flex h-full">
      <div class="m-auto flex flex-col items-center">
        <div class="font-semibold text-lg mb-4 text-center">Вы не вошли, войдите или зарегестрируйтесь чтобы написать продавцу</div>

        <NuxtLink to="/auth/login" @click.native="$emit('close')" class="ext-sm text-white font-bold inline-block rounded-lg py-2 px-5 cursor-pointer duration-200 transition bg-green-600 hover:bg-green-700">
          Войти
        </NuxtLink>
        <span class="text-sm mt-2">или</span>
        <NuxtLink to="/auth/registration" @click.native="$emit('close')" class="link">Зарегестрироваться</NuxtLink>
      </div>
    </div>
    <div v-else-if="user.id === product.shop.id" class="flex h-full">
      <div class="m-auto flex flex-col items-center">
        <div class="font-semibold text-lg my-4 text-center">Вы не можете написать сами себе</div>
      </div>
    </div>
    <div v-else-if="!success">
      <div class="flex mb-7">
        <div>
          <div class="w-14 h-14 shadow-md flex relative items-center justify-center rounded-full bg-green-400 overflow-hidden mr-4">
            <img v-if="product.shop.logoImg" :src="product.shop.logoImg" :alt="product.shop.companyName" class="img-fluid shadow rounded-full">
            <div v-else class="font-bold text-lg text-white m-auto">{{ product.shop.companyName[0] }}</div>
          </div>
        </div>
        <div class="w-full">
          <div class="font-semibold text-lg">{{ product.shop.companyName }}</div>
          <div class="text-gray-400">На сайте с {{moment(product.shop.createdAt).format('DD.MM.YYYY')}}</div>
        </div>
      </div>
      <form @submit.prevent="sendMessage" class="flex items-end">
        <ValidationProvider name="message" rules="required" tag="div" class="w-full shadow rounded">
          <TextareaAutosize
            v-model="message"
            rows="1"
            @keyup.enter.exact.native="sendMessage"
            placeholder="Напишите сообщение..."
            class="p-2 focus:outline-none w-full mr-2"
          />
          <div class="flex justify-end">
            <button
              type="submit"
              class="flex items-center text-sm text-white font-bold inline-block rounded-lg py-2 px-5 cursor-pointer duration-200 transition bg-green-600 hover:bg-green-700 mb-3 mr-3"
            >
              <span class="mr-2">Отправить</span>
              <svg version="1.0" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg"
                   width="1280.000000pt" height="1280.000000pt" viewBox="0 0 1280.000000 1280.000000"
                   fill="currentColor">
                <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)">
                  <path d="M1758 11505 c-175 -43 -329 -168 -413 -335 -54 -108 -68 -176 -62
                    -315 l4 -120 467 -1628 c257 -895 476 -1651 487 -1679 49 -125 176 -261 301
                    -322 144 -70 32 -66 1688 -66 892 0 1532 -4 1587 -10 477 -50 733 -577 474
                    -972 -109 -167 -274 -267 -474 -288 -55 -6 -695 -10 -1587 -10 -1657 0 -1543
                    4 -1690 -67 -100 -48 -230 -177 -278 -277 -23 -46 -183 -589 -504 -1710 l-470
                    -1641 -5 -115 c-6 -136 9 -215 61 -318 85 -170 233 -290 413 -336 81 -21 245
                    -21 331 1 49 12 1265 615 4602 2284 4897 2448 4611 2300 4703 2427 84 114 127
                    246 127 392 0 179 -63 334 -185 456 l-73 73 -4569 2284 c-2974 1486 -4587
                    2287 -4621 2295 -71 16 -243 14 -314 -3z"/>
                </g>
              </svg>
            </button>
          </div>
        </ValidationProvider>
      </form>
    </div>
    <div v-else class="alert alert-success">
      <div class="alert-icon">
            <span>
                <svg fill="currentColor"
                     viewBox="0 0 20 20"
                     class="h-4 w-4">
                    <path fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"></path>
                </svg>
            </span>
      </div>
      <div class="alert-content">
        <div class="alert-description">
          Вы успешно отправили сообщение
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from "vue";
import {mapGetters, mapState} from "vuex";
import {IProduct, IUser} from "~/types";
import moment from "moment";
import firebase from "firebase/app";
import "firebase/database";

export default Vue.extend({
  name: "Send",

  data: () => ({
    message: '',
    success: false
  }),

  methods: {
    moment,
    async sendMessage() {
      if (!this.message.trim()) {
        return;
      }

      const usersChats = (await this.$fire.database.ref(`users/${this.user.id}`).get()).toJSON();
      const shopsChats = (await this.$fire.database.ref(`users/${this.product.shop.id}`).get()).toJSON() || {};

      let isNewChat = true

      if (usersChats) {
        await new Promise( (resolve) => Object.keys(usersChats as object).some((chatId: string) => {
          // @ts-ignore
          if (shopsChats[chatId]) {
            isNewChat = false
            this.$fire.database.ref(`messages/${chatId}`).push({
              product: String(this.product.id),
              checked: false,
              checkedCreator: `false_${String(this.user.id)}`,
              creator: String(this.user.id),
              text: this.message.trim(),
              createdAt: firebase.database.ServerValue.TIMESTAMP
            });

            this.$fire.database.ref(`chats/${chatId}/message`).set({
              checked: false,
              creator: String(this.user.id),
              text: this.message.trim(),
              createdAt: firebase.database.ServerValue.TIMESTAMP
            });

            this.success = true;
            setTimeout(() => this.$emit('close'), 3000)
            resolve(true);
            return true;
          }
        }))
      }

      if (isNewChat) {
        this.$fire.database.ref('chats')
          .push({
            creator: String(this.user.id),
            message: {
              checked: false,
              createdAt: firebase.database.ServerValue.TIMESTAMP,
              creator: String(this.user.id),
              text: this.message.trim(),
            }
          })
          .then(async (value) => {
            const chatKey = value.key as string;

            await this.$fire.database.ref(`members/${chatKey}`).set({
              [this.user.id]: true,
              [this.product.shop.id]: true
            })

            await this.$fire.database.ref(`messages/${chatKey}`).push({
              product: String(this.product.id),
              checked: false,
              checkedCreator: `false_${String(this.user.id)}`,
              creator: String(this.user.id),
              text: this.message.trim(),
              createdAt: firebase.database.ServerValue.TIMESTAMP
            })

            await this.$fire.database.ref(`users/${this.user.id}`).update({
              [chatKey]: true
            });

            await this.$fire.database.ref(`users/${this.product.shop.id}`).update({
              [chatKey]: true
            });

            this.success = true;
            setTimeout(() => this.$emit('close'), 3000)
          })
      }
    }
  },

  props: {
    product: Object as PropType<IProduct>
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapState('auth', ['user'])
  }
})
</script>
