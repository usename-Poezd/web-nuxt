<template>
  <div class="p-2 h-full">
    <h3 class="font-bold text-lg my-3 text-center">Изменить E-MAIL</h3>
    <div v-if="loading" class="flex items-center justify-center h-full">
      <svg class="animate-spin -ml-1 mr-3 h-12 w-12 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    <ValidationObserver v-if="step === 1" v-slot="{ invalid }" class="w-full block">
      <form class="mb-3" @submit.prevent="submit">
        <ValidationProvider name="E-mail" rules="required" v-slot="{ errors }">
          <div class="mb-3">
            <label class="forms-label" for="email">E-mail:</label>
            <input
              v-model="email"
              id="email"
              name="email"
              type="tel"
              placeholder="mymail@mail.com"
              class="forms-input w-full"
            >
            <div class="mt-1">
              <div class="text-red-500" v-for="error in errors">{{error}}</div>
              <div class="text-red-500" v-for="error in serverErrors.email">{{error}}</div>
            </div>
          </div>
        </ValidationProvider>
        <div class="flex md:flex-row flex-col">
          <button
            type="submit"
            :disabled="invalid"
            class="w-full text-center py-2 px-4 transition hover:bg-green-700 bg-green-600 rounded text-white outline-none appearance-none font-semibold mb-3"
          >
            Отправить
          </button>
          <button
            @click.prevent="$modal.hide('verify-email')"
            type="button"
            class="w-full text-center py-2 px-4 transition bg-gray-200 shadow rounded outline-none appearance-none font-semibold mb-3 md:ml-2 ml-0"
          >
            Отмена
          </button>
        </div>

        <p>Укажите новый e-mail</p>
      </form>
    </ValidationObserver>
    <div v-if="step === 2" class="flex flex-col items-center mt-3">

        <FontAwesomeIcon icon="check-circle" size="4x" class="text-green-500"/>
        <div class="text-lg text-green-500 font-bold mb-7">Мы васлали на вашу почту письмо с подтверждением</div>

        <button
          @click.prevent="$modal.hide('verify-email')"
          class="w-4/12 text-center py-2 px-4 transition hover:bg-green-700 bg-green-600 rounded text-white outline-none appearance-none font-semibold mb-3"
        >
          Закрыть
        </button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: "Verify",

    props: ['userId'],

    data() {
        return {
        step:  1,
        email: '',
        loading: false,
        serverErrors: {
          email: []
        },
      }
    },

    methods: {
      submit() {
        this.loading = true;
        this.$api.sendVerification({
          type: 'email',
          email: this.email.replace(/\s+/gi, ''),
          id: this.userId
        })
          .then(() => {
            this.step = 2;
            this.loading = false;
          })
          .catch((err) => {
            console.log(err.response);
            if (err.response.status === 422) {
              this.serverErrors.email = err.response.data.errors.email;
              this.email = '';
              this.loading = false;
            }
          });
      }
    }
  });
</script>
