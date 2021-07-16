<template>
  <main class="container">
    <Auth type="registration">
      <div v-if="loading" class="flex items-center justify-center mb-3">
        <svg class="animate-spin -ml-1 mr-3 h-12 w-12 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <div v-else>
        <ValidationObserver v-slot="{ invalid }">
          <form class="mb-3" @submit.prevent="submit">
            <ValidationProvider name="имя" rules="required" v-slot="{ errors }">
              <div class="mb-3">
                <label class="forms-label" for="name">Имя:</label>
                <input
                  v-model="formValues.name"
                  id="name"
                  name="first_name"
                  type="text"
                  placeholder="Ваше имя"
                  class="forms-input w-full"
                >
                <div class="mt-1">
                  <div class="text-red-500" v-for="error in errors">{{error}}</div>
                  <div class="text-red-500" v-for="error in serverErrors.name">{{error}}</div>
                </div>
              </div>
            </ValidationProvider>
            <ValidationProvider name="фамилия" rules="required" v-slot="{ errors }">
              <div class="mb-3">
                <label class="forms-label" for="surname">Фамилия:</label>
                <input
                  v-model="formValues.surname"
                  id="surname"
                  name="surname"
                  type="text"
                  placeholder="Ваша фамилия"
                  class="forms-input w-full"
                >
                <div class="mt-1">
                  <div class="text-red-500" v-for="error in errors">{{error}}</div>
                  <div class="text-red-500" v-for="error in serverErrors.surname">{{error}}</div>
                </div>
              </div>
            </ValidationProvider>
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
                  <div class="text-red-500" v-for="error in serverErrors.phone">{{error}}</div>
                </div>
              </div>
            </ValidationProvider>
            <ValidationProvider name="пароль" rules="required|min:8|confirmed:password_conformation" v-slot="{ errors }">
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
                  <div class="text-red-500" v-for="error in serverErrors.password">{{error}}</div>
                </div>
              </div>
            </ValidationProvider>
            <ValidationProvider name="подверждение пароля" rules="required|min:8" vid="password_conformation" v-slot="{ errors }">
              <div class="mb-3">
                <label class="forms-label" for="password">Подтвердите пароль:</label>
                <input
                  v-model="formValues.password_confirmation"
                  id="password_conformation"
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
            <button
              type="submit"
              :disabled="invalid"
              class="w-full text-center py-2 px-4 transition hover:bg-green-700 bg-green-600 rounded text-white outline-none appearance-none font-semibold"
            >
              Зарегестрироваться
            </button>
          </form>
        </ValidationObserver>
      </div>
    </Auth>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue'
  import VerificationPhoneCode from "~/components/Verification/PhoneCode.vue";

  export default Vue.extend({
    middleware: ['guest'],

    data: () => ({
      formValues: {
        name: '',
        surname: '',
        phone: '',
        password: '',
        password_confirmation: ''
      },
      unauthorized: false,
      loading: false,
      serverErrors: {
        name: [],
        surname: [],
        phone: [],
        password: []
      }
    }),

    methods: {
      submit() {
        this.loading = true;
        this.unauthorized = false;
        this.$api.register(this.formValues)
          .then(() => {
            this.$modal.show(
              VerificationPhoneCode,
              {
                stage: 2,
                type: 'account',
                userPhone: this.formValues.phone
              },
              {
                name: 'verify',
                clickToClose: false,
                adaptive: true
              });
          })
          .catch((err) => {
            if (err.response.status === 422) {
              this.serverErrors = err.response.data.errors;
              this.loading = false;
            }
          });
      }
    },

    head: () => ({
      title: 'Регистрация'
    })
  })
</script>
