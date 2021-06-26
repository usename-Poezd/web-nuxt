<template>
  <ValidationObserver v-slot="{ invalid }" tag="form" @submit.prevent="submit" class="mb-7">
    <div v-if="success" class="alert alert-success mb-5">
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
          Вы успешно обновили профиль
        </div>
      </div>
    </div>
    <div v-if="error" class="alert alert-danger mb-5">
      <div class="alert-icon">
            <span>
                <svg fill="currentColor" viewBox="0 0 20 20" class="h-4 w-4">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </span>
      </div>
      <div class="alert-content">
        <div class="alert-description">
          Произошла ошибка при обновлении профиля
        </div>
      </div>
    </div>

    <div class="shadow rounded-lg md:p-7 p-3 mb-5">
      <h2 class="font-bold text-2xl mb-14">Личные данные</h2>
      <div>
        <div class="flex md:flex-row flex-col mb-4">
          <div class="md:w-2/12 w-full">
            <div class="text-gray-800 font-semibold">Я</div>
          </div>
          <div class="md:w-6/12 w-full flex flex-col">
            <label
              class="flex items-center cursor-pointer mb-1"
              for="is_breeder_false"
            >
              <input
                id="is_breeder_false"
                name="isBreeder"
                v-model="formValues.isBreeder"
                :value="false"
                type="radio"
                class="form-radio cursor-pointer rounded bg-gray-200 border-transparent focus:border-transparent text-green-600 focus:ring-0 focus:ring-offset-0 mr-1"
              >
              <span>Покупатель</span>
            </label>
            <label
              class="flex items-center cursor-pointer mb-1"
              for="is_breeder_true"
            >
              <input
                id="is_breeder_true"
                name="isBreeder"
                v-model="formValues.isBreeder"
                :value="true"
                type="radio"
                class="form-radio cursor-pointer rounded bg-gray-200 border-transparent focus:border-transparent text-green-600 focus:ring-0 focus:ring-offset-0 mr-1"
              >
              <span>Продавец</span>
            </label>
          </div>
        </div>
        <div class="flex md:flex-row flex-col mb-4">
          <div class="md:w-2/12 w-full">
            <label for="name" class="text-gray-800 font-semibold">Имя</label>
          </div>
          <div class="md:w-6/12 w-full flex flex-col">
            <ValidationProvider name="имя" rules="required" v-slot="{ errors }">
              <input
                id="name"
                name="name"
                v-model="formValues.name"
                type="text"
                placeholder="Ваше имя"
                class="forms-input w-full"
              >
              <div class="mt-1">
                <div class="text-red-500" v-for="error in errors">{{error}}</div>
                <div class="text-red-500" v-for="error in serverErrors.name">{{error}}</div>
              </div>
            </ValidationProvider>
          </div>
        </div>
        <div class="flex md:flex-row flex-col mb-4">
          <div class="md:w-2/12 w-full">
            <label for="surname" class="text-gray-800 font-semibold">Фамилия</label>
          </div>
          <div class="md:w-6/12 w-full flex flex-col">
            <ValidationProvider name="фамилия" rules="required" v-slot="{ errors }">
              <input
                id="surname"
                name="surname"
                v-model="formValues.surname"
                type="text"
                placeholder="Ваша фамилия"
                class="forms-input w-full"
              >
              <div class="mt-1">
                <div class="text-red-500" v-for="error in errors">{{error}}</div>
                <div class="text-red-500" v-for="error in serverErrors.surname">{{error}}</div>
              </div>
            </ValidationProvider>
          </div>
        </div>
        <div class="flex md:flex-row flex-col mb-4">
          <div class="md:w-2/12 w-full">
            <div class="text-gray-800 font-semibold">Номер телефона</div>
          </div>
          <div class="md:w-6/12 w-full">
            <div class="forms-input bg-gray-300 text-gray-600">
              {{user.phone}}
            </div>
          </div>
          <div class="w-4/12 pl-3">
            <div @click.prevent="showModal('phone')" class="link cursor-pointer">Изменить</div>
          </div>
        </div>
        <div class="flex md:flex-row flex-col mb-4">
          <div class="md:w-2/12 w-full">
            <div class="text-gray-800 font-semibold">E-MAIL</div>
          </div>
          <div class="md:w-6/12 w-full">
            <div class="forms-input bg-gray-300 text-gray-600">
              {{user.email}}
            </div>
          </div>
          <div class="w-4/12 pl-3">
            <div @click.prevent="showModal('email')" class="link cursor-pointer">Изменить</div>
          </div>
        </div>
        <div class="flex md:flex-row flex-col mb-4">
          <div class="md:w-2/12 w-full">
            <label for="location" class="text-gray-800 font-semibold">Город</label>
          </div>
          <div class="md:w-6/12 w-full flex flex-col">
            <ValidationProvider name="город" rules="required" v-slot="{ errors }">
              <input
                id="location"
                name="location"
                v-model="formValues.location"
                type="text"
                placeholder="Ваш город"
                class="forms-input w-full"
              >
              <div class="mt-1">
                <div class="text-red-500" v-for="error in errors">{{error}}</div>
                <div class="text-red-500" v-for="error in serverErrors.location">{{error}}</div>
              </div>
            </ValidationProvider>
          </div>
        </div>
      </div>
    </div>
    <div v-if="formValues.isBreeder" class="shadow rounded-lg md:p-7 p-3 mb-5">
      <h2 class="font-bold text-2xl mb-14">Данные продавца</h2>
      <div>
        <div class="flex md:flex-row flex-col mb-4">
          <div class="md:w-2/12 w-full">
            <div class="text-gray-800 font-semibold">Логотип компании</div>
          </div>
          <div class="md:w-6/12 w-full flex items-center">
            <div v-if="user.logoImg" @click.prevent="updateLogoImg" class="w-24 h-24 flex relative items-center justify-center rounded-full bg-green-400 overflow-hidden shadow">
              <div v-if="logoImgLoading" class="w-full h-full flex absolute top-0 left-0 bg-white opacity-80">
                <svg class="animate-spin m-auto h-12 w-12 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <div class="w-full h-full flex absolute top-0 left-0 bg-white opacity-0 hover:opacity-50 cursor-pointer">
                <FontAwesomeIcon icon="sync-alt" size="2x" class="text-gray-600 m-auto"/>
              </div>
              <img :src="user.logoImg" :alt="formValues.companyName" class="img-fluid">
            </div>
            <p v-else>У вас нету логотипа компании</p>

            <button
              @click.prevent="updateLogoImg"
              type="button"
              class="ml-3 text-sm text-white font-bold inline-block rounded-lg py-2 px-4 cursor-pointer duration-200 transition bg-green-600 hover:bg-green-700"
            >
              {{ user.logoImg ? 'Изменить' : 'Добавить' }}
            </button>
          </div>
        </div>
        <div class="flex md:flex-row flex-col mb-4">
          <div class="md:w-2/12 w-full">
            <label for="companyName" class="text-gray-800 font-semibold">Компания</label>
          </div>
          <div class="md:w-6/12 w-full flex flex-col">
            <ValidationProvider name="компания" rules="required" v-slot="{ errors }">
              <input
                id="companyName"
                name="companyName"
                v-model="formValues.companyName"
                type="text"
                placeholder="Ваша компания или имя и фамилия"
                class="forms-input w-full"
              >
              <div class="mt-1">
                <div class="text-red-500" v-for="error in errors">{{error}}</div>
                <div class="text-red-500" v-for="error in serverErrors.company_name">{{error}}</div>
              </div>
            </ValidationProvider>
          </div>
        </div>
        <div class="flex md:flex-row flex-col mb-4">
          <div class="md:w-2/12 w-full">
            <label for="description" class="text-gray-800 font-semibold">Описания магазина</label>
          </div>
          <div class="md:w-6/12 w-full flex flex-col">
            <ValidationProvider name="описания магазина" v-slot="{ errors }">
              <TextareaAutosize
                id="description"
                name="description"
                v-model="formValues.description"
                placeholder="Расскажите вашу историю, чем вы занимаетесь"
                class="forms-input w-full"
              />
              <div class="mt-1">
                <div class="text-red-500" v-for="error in errors">{{error}}</div>
              </div>
            </ValidationProvider>
          </div>
        </div>
        <div class="flex md:flex-row flex-col mb-4">
          <div class="md:w-2/12 w-full">
            <label for="ploicy" class="text-gray-800 font-semibold">Политика магазина</label>
          </div>
          <div class="md:w-6/12 w-full flex flex-col">
            <ValidationProvider name="политика магазина" rules="required" v-slot="{ errors }">
              <TextareaAutosize
                id="ploicy"
                name="policity"
                v-model="formValues.policity"
                placeholder="Опишите информацию о доставке, где с вами лучше связаться"
                class="forms-input w-full"
              />
              <div class="mt-1">
                <div class="text-red-500" v-for="error in errors">{{error}}</div>
                <div class="text-red-500" v-for="error in serverErrors.policity">{{error}}</div>
              </div>
            </ValidationProvider>
          </div>
        </div>
        <div class="flex md:flex-row flex-col mb-4">
          <div class="md:w-2/12 w-full">
            <div class="text-gray-800 font-semibold">Доставка</div>
          </div>
          <div class="md:w-6/12 w-full">
            <label
              class="flex items-center cursor-pointer mb-1"
              for="localDelivery"
            >
              <input
                id="localDelivery"
                name="localDelivery"
                v-model="formValues.localDelivery"
                type="checkbox"
                class="form-checkbox cursor-pointer rounded bg-gray-200 border-transparent focus:border-transparent text-green-600 focus:ring-0 focus:ring-offset-0 mr-1"
              >
              <span>Локальная</span>
            </label>
            <label
              class="flex items-center cursor-pointer mb-1"
              for="regionalDelivery"
            >
              <input
                id="regionalDelivery"
                name="regionalDelivery"
                v-model="formValues.regionalDelivery"
                type="checkbox"
                class="form-checkbox cursor-pointer rounded bg-gray-200 border-transparent focus:border-transparent text-green-600 focus:ring-0 focus:ring-offset-0 mr-1"
              >
              <span>Региональная</span>
            </label>
            <label
              class="flex items-center cursor-pointer mb-1"
              for="countrywideDelivery"
            >
              <input
                id="countrywideDelivery"
                name="countrywideDelivery"
                v-model="formValues.countrywideDelivery"
                type="checkbox"
                class="form-checkbox cursor-pointer rounded bg-gray-200 border-transparent focus:border-transparent text-green-600 focus:ring-0 focus:ring-offset-0 mr-1"
              >
              <span>Международная</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center">
      <div
        v-if="loading"
        class="md:w-4/12 flex justify-center items-center w-full text-sm text-white font-bold inline-block rounded-lg py-2 px-4 cursor-pointer duration-200 transition bg-green-600 hover:bg-green-700"
      >
        <svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <button
        v-else
        :disabled="invalid"
        type="submit"
        class="md:w-4/12 w-full text-sm text-white font-bold inline-block rounded-lg py-2 px-4 cursor-pointer duration-200 transition bg-green-600 hover:bg-green-700"
      >
        Сохранить
      </button>
    </div>
  </ValidationObserver>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapMutations, mapState} from "vuex";
import VerificationPhoneCode from "~/components/Verification/PhoneCode.vue";
import VerificationEmail from "~/components/Verification/Email.vue";
import {AUTH_MUTATIONS} from "~/store/auth";
import UploadAvatar from "~/components/Upload/Avatar.vue";


export default Vue.extend({
  middleware: ['auth'],
  layout: 'profile',

  data: () => ({
    formValues: {},
    loading: false,
    success: false,
    logoImgLoading: false,
    error: false,
    serverErrors: {
      name: [],
      surname: [],
      company_name: [],
      policity: [],
      location: []
    }
  }),

  asyncData({store}) {
    const {user} = store.state.auth

    return {
      formValues: {
        isBreeder: user.isBreeder,
        name: user.name,
        surname: user.surname,
        location: user.location,
        companyName: user.companyName,
        description: user.description,
        policity: user.policity,
        localDelivery: user.localDelivery,
        regionalDelivery: user.regionalDelivery,
        countrywideDelivery: user.countrywideDelivery
      }
    }
  },

  computed: {
    ...mapState('auth', ['user'])
  },

  methods: {
    ...mapMutations({
      setUser: `auth/${AUTH_MUTATIONS.SET_USER}`
    }),
    updateLogoImg() {
      this.$modal.show(UploadAvatar, {
        uploaded: (id: number) => {
          this.logoImgLoading = true;
          this.$api.updateUser({
            id: this.user.id,
            logoImg: id
          })
            .then((data:any) => {
              this.setUser(data);
              this.logoImgLoading = false;
            })
        }
      }, {
        name: 'upload-avatar',
        adaptive: true,
        height: 'auto',
        scrollable: true,
        class: 'upload-modal'
      })
    },
    submit() {
      this.loading = true;
      this.success = false;
      this.error = false;


      this.$api.updateUser({
        id: this.user.id,
        ...this.formValues
      })
        .then((data: any) => {
          this.setUser(data);
          this.loading = false;
          this.success = true
          window.scrollTo({ top: 0, behavior: 'smooth' })
        })
        .catch((err) => {
          if (err.response.status === 422) {
            this.serverErrors = err.response.data.errors;
            this.loading = false;
            this.error = true;
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        })
    },
    showModal(type: string) {
      if (type === 'phone') {
        this.$modal.show(VerificationPhoneCode, {
          type: 'phone',
          userId: this.user.id
        }, {
          name: 'verify',
          clickToClose: false,
          adaptive: true
        })
      } else {
        this.$modal.show(VerificationEmail, {
          userId: this.user.id
        }, {
          name: 'verify-email',
          adaptive: true
        })
      }
    }
  }
})
</script>
