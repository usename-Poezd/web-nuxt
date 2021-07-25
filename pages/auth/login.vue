<template>
  <main class="container">
    <Auth type="login">
      <div v-if="loading" class="flex items-center justify-center mb-3">
        <svg class="animate-spin -ml-1 mr-3 h-12 w-12 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <div v-else>
        <div v-if="unauthorized" class="rounded shadow p-2 mb-3">
          <p class="text-center text-red-500 font-semibold">
            Пожалуйста, проверьте правильность написания логина и пароля.
          </p>
        </div>
        <ValidationObserver v-slot="{ invalid }">
          <form class="mb-3" @submit.prevent="submit">
            <ValidationProvider name="телефон" rules="required" v-slot="{ errors }">
              <div class="mb-3">
                <label class="forms-label" for="phone">Телефон:</label>
                <input
                  v-model="formValues.phone"
                  id="phone"
                  name="phone"
                  type="tel"
                  v-mask="'+7 ### ### ## ##'"
                  placeholder="+7 999 999 99 99"
                  class="forms-input w-full"
                >
                <div class="mt-1">
                  <div class="text-red-500" v-for="error in errors">{{error}}</div>
                </div>
              </div>
            </ValidationProvider>
            <ValidationProvider name="пароль" rules="required" v-slot="{ errors }">
              <div class="mb-3">
                <label class="forms-label" for="password">Пароль:</label>
                <input
                  v-model="formValues.password"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Ваш пароль"
                  class="forms-input w-full"
                >
                <div class="mt-1">
                  <div class="text-red-500" v-for="error in errors">{{error}}</div>
                </div>
              </div>
            </ValidationProvider>
            <div class="mb-3 flex justify-end">
              <span @click.prevent="openModal({type: 'password'})" class="link">Забыли пароль?</span>
            </div>
            <button
              type="submit"
              :disabled="invalid"
              class="w-full text-center py-2 px-4 transition hover:bg-green-700 bg-green-600 rounded text-white outline-none appearance-none font-semibold"
            >
              Войти
            </button>
          </form>
        </ValidationObserver>
      </div>
    </Auth>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapActions, mapMutations, mapState} from 'vuex';
import VerificationPhoneCode from "~/components/Verification/PhoneCode.vue";
import {getFirebaseToken, setFirebaseToken} from "~/utils";
import {AUTH_MUTATIONS} from "~/store/auth";

export default Vue.extend({
  middleware: ['guest'],
  data: () => ({
    formValues: {
      phone: '',
      password: ''
    },
    unauthorized: false,
    loading: false
  }),

  computed: {
    ...mapState('auth', [
      'user'
    ])
  },

  methods: {
    ...mapActions('auth', [
      'login'
    ]),
    ...mapMutations({
      setUserUnreadChats: `auth/${AUTH_MUTATIONS.SET_USER_UNREAD_CHATS}`
    }),

    submit() {
      this.loading = true;
      this.unauthorized = false;
      this.login(this.formValues)
        .then(() => {
          this.$router.push('/');
          this.loading = false;

          setFirebaseToken(this.$api)
            .then(async () => {
              await this.$fire.auth.signInWithCustomToken(getFirebaseToken());

              const chatIds = Object.keys((await this.$fire.database.ref(`users/${this.user.id}`).get()).toJSON() || {});

              chatIds.map((chatId: string) => {
                this.$fire.database.ref(`chats/${chatId}/message`).on('value', (snapshot) => {
                  const data = snapshot.val();

                  if (data.creator !== String(this.user.id) && !data.checked) {
                    this.setUserUnreadChats({
                      [chatId]: true
                    })
                  } else {
                    this.setUserUnreadChats({
                      [chatId]: false
                    })
                  }
                })
              })
            });
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.unauthorized = true;
            this.loading = false;
          } else if (err.response.status === 403) {
            this.openModal({
              type: 'account',
              stage: 2
            })
          }
        });
    },

    openModal(componentProps: any = {}) {
      this.$modal.show(
        VerificationPhoneCode,
        componentProps,
        {
          name: 'verify',
          adaptive: true
        });
    }
  },

  head: () => ({
    title: 'Вход'
  })
})
</script>
