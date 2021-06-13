<template>
  <div class="p-2 h-full">
    <h3 class="font-bold text-lg my-3 text-center">Пожтверждение аккаунта</h3>
    <div v-if="loading" class="flex items-center justify-center mb-3 h-full">
      <svg class="animate-spin -ml-1 mr-3 h-12 w-12 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    <ValidationObserver v-if="step === 1 && !loading" v-slot="{ invalid }" class="w-full block">
      <form class="mb-3" @submit.prevent="submitPhone">
        <ValidationProvider name="телефон" rules="required" v-slot="{ errors }">
          <div class="mb-3">
            <label class="forms-label" for="phone">Телефон:</label>
            <input
              v-model="phone"
              id="phone"
              name="phone"
              type="tel"
              v-mask="'+7 ### ### ## ##'"
              placeholder="+7 999 999 99 99"
              class="forms-input w-full"
            >
            <div class="mt-1">
              <div class="text-red-500" v-for="error in errors">{{error}}</div>
              <div class="text-red-500" v-for="error in serverErrors.phone">{{error}}</div>
            </div>
          </div>
        </ValidationProvider>
        <button
          type="submit"
          :disabled="invalid"
          class="w-full text-center py-2 px-4 transition hover:bg-green-700 bg-green-600 rounded text-white outline-none appearance-none font-semibold mb-3"
        >
          Отправить
        </button>

        <p>Ваш аккаунт не подтвержден, укажите ваш телефон для дальнейшего подтверждения.</p>
      </form>
    </ValidationObserver>
    <ValidationObserver v-else-if="!loading" v-slot="{ invalid }" class="w-full block">
      <form class="mb-3" @submit.prevent="submitCode">
        <ValidationProvider name="код" rules="required" v-slot="{ errors }">
          <div class="mb-3">
            <label class="forms-label" for="phone">Код:</label>
            <input
              v-model="token"
              id="code"
              name="code"
              type="tel"
              v-mask="'####'"
              placeholder="####"
              class="forms-input w-full"
            >
            <div class="mt-1">
              <div class="text-red-500" v-for="error in errors">{{error}}</div>
              <div class="text-red-500" v-for="error in serverErrors.token">{{error}}</div>
            </div>
          </div>
        </ValidationProvider>
        <button
          type="submit"
          :disabled="invalid"
          class="w-full text-center py-2 px-4 transition hover:bg-green-700 bg-green-600 rounded text-white outline-none appearance-none font-semibold mb-3"
        >
          Отправить
        </button>
        <p>Ваш аккаунт не подтвержден, мы выслали вам код потжтверждения на ваш телефон.</p>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapMutations} from "vuex";
  import {AUTH_MUTATIONS} from "~/store/auth";

  export default Vue.extend({
    name: "Verify",

    props: ['userId', 'stage'],

    data() {
      return {
        step: this.stage || 1,
        phone: '',
        token: '',
        loading: false,
        serverErrors: {
          phone: [],
          token: []
        }
      }
    },

    methods: {
      ...mapMutations({
        setPayload: `auth/${AUTH_MUTATIONS.SET_PAYLOAD}`,
        setUser: `auth/${AUTH_MUTATIONS.SET_USER}`
      }),
      submitPhone() {
        this.loading = true;
        this.$api.sendVerification({
          type: 'account',
          phone: this.phone.replace(' ', ''),
          id: this.userId
        })
          .then(() => {
            this.step = 2;
            this.loading = false;
          })
          .catch((err) => {
            if (err.response.status === 422) {
              this.serverErrors.phone = err.response.data.errors.phone;
              this.phone = '';
              this.loading = false;
            }
          });
      },
      submitCode() {
        this.loading = true;
        this.$api.verify({
          type: 'account',
          token: this.token
        })
          .then((data) => {
            this.setPayload(data);
            this.setUser(data.user);

            this.$modal.hide('verify');

            if (this.$route.path === '/auth/login' || this.$route.path === '/auth/register') {
              this.$router.push('/');
            }

            this.step = 1;
            this.phone = '';
            this.token = '';
            this.loading = false;
          })
          .catch((err) => {
            if (err.response.status === 422) {
              this.serverErrors.token = err.response.data.errors.token;
              this.token = '';
              this.loading = false;
            }
          });
      }
    }
  });
</script>
