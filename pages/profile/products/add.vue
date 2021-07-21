<template>
  <ValidationObserver tag="form" @submit.prevent="submit" v-slot="{ invalid, validate }">
    <nav class="text-black font-bold mb-4 text-xs" aria-label="Breadcrumb">
      <ol class="list-none p-0 inline-flex">
        <li class="flex items-center">
          <NuxtLink to="/profile">Профиль</NuxtLink>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        </li>
        <li class="flex items-center">
          <NuxtLink to="/profile/products">Мои товары</NuxtLink>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        </li>
        <li>
          <span class="text-gray-500" aria-current="page">Добавление товара</span>
        </li>
      </ol>
    </nav>

    <div v-if="!success && loading">
      <h2 class="font-bold text-2xl mb-4">Идет добавление товара</h2>
      <div class="shadow rounded-lg p-7 mb-4 flex">
        <svg class="animate-spin m-auto h-24 w-24 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </div>

    <div v-if="success && loading">
      <h2 class="font-bold text-2xl mb-4">Товар успешно добавлен</h2>
      <div class="shadow rounded-lg p-7 mb-4 flex">
        <div class="m-auto flex items-center shadow justify-center h-28 w-28 flex-shrink-0 rounded-full">
          <svg fill="currentColor"
               viewBox="0 0 20 20"
               class="h-24 w-24 text-green-600">
            <path fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"></path>
          </svg>
        </div>
      </div>
    </div>

    <div v-if="step === 1 && !loading">
      <h2 class="font-bold text-2xl mb-4">Выберете категорию</h2>
      <div class="shadow rounded-lg p-7 mb-4">
        <div class="flex flex-wrap">
          <div v-for="kind in kinds" @click.prevent="chooseKind(kind)" class="md:w-4/12 w-full px-2 mb-2 cursor-pointer transition duration-200 hover:text-green-600">
            {{kind.titleRus}}
          </div>
        </div>
      </div>
    </div>


    <div v-if="step === 2 && !loading">
      <h2 class="font-bold text-2xl mb-4">
        <FontAwesomeIcon icon="chevron-left" class="mr-4 cursor-pointer" @click.prevent="step--"/>
        <span>Выберете подкатегорию</span>
      </h2>
      <div class="shadow rounded-lg p-7 mb-4">
        <div class="flex flex-wrap">
          <div
            v-for="sub in kind.subcategories"
            @click.prevent="subcategory = sub; step++"
            class="md:w-4/12 w-full px-2 mb-2 cursor-pointer transition duration-200 hover:text-green-600"
          >
            {{sub.title}}
          </div>
        </div>
      </div>
    </div>


    <div v-if="step === 3 && !loading">
      <div class="shadow rounded-lg p-7 mb-4">
        <h2 class="font-bold text-2xl mb-14">
          <FontAwesomeIcon icon="chevron-left" class="mr-4 cursor-pointer" @click.prevent="kind.subcategories.length ? step-- : step = 1"/>
          <span>Основная информация о товаре</span>
        </h2>

        <div class="flex md:flex-row flex-col mb-4">
          <div class="md:w-2/12 w-full">
            <label for="name" class="text-gray-800 font-semibold">Название</label>
          </div>
          <div class="md:w-6/12 w-full flex flex-col">
            <ValidationProvider name="название" rules="required" v-slot="{ errors }">
              <input
                id="name"
                name="name"
                v-model="formValues.name"
                type="text"
                placeholder="het. Albino piebald"
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
            <label for="article" class="text-gray-800 font-semibold">Уникальный идентификатор</label>
          </div>
          <div class="md:w-6/12 w-full flex flex-col">
            <input
              id="article"
              name="article"
              v-model="formValues.article"
              type="text"
              placeholder=""
              class="forms-input w-full"
            >
            <div class="mt-1">
              <div class="text-red-500" v-for="error in serverErrors.article">{{error}}</div>
            </div>
          </div>
          <div class="md:w-4/12 w-full pl-3">
            <p>
              Уникальный идентификатор животного (не обязательно)
            </p>
          </div>
        </div>
        <div class="flex md:flex-row flex-col mb-4">
          <div class="md:w-2/12 w-full">
            <label for="description" class="text-gray-800 font-semibold">Описание</label>
          </div>
          <div class="md:w-6/12 w-full flex flex-col">
            <TextareaAutosize
              id="description"
              name="description"
              placeholder="Описание товара"
              v-model="formValues.description"
              class="forms-input w-full"
            />
          </div>
        </div>
        <div class="flex items-start md:flex-row flex-col mb-4">
          <div class="md:w-2/12 w-full">
            <label for="price" class="text-gray-800 font-semibold">Цена</label>
          </div>
          <div class="md:w-6/12 w-full flex md:flex-nowrap flex-wrap">
            <div class="md:w-9/12 w-full">
              <ValidationProvider name="цена" rules="required|min_value:1" v-slot="{ errors }">
                <FormsCurrencyInput
                  v-model="formValues.price"
                  :options="{ currency: 'RUB', currencyDisplay: 'hidden', locale: 'ru-RU'}"
                  id="price"
                  name="price"
                  type="text"
                  class="forms-input w-full"
                />
                <div class="mt-1">
                  <div class="text-red-500" v-for="error in errors">{{error}}</div>
                  <div class="text-red-500" v-for="error in serverErrors.price">{{error}}</div>
                </div>
              </ValidationProvider>
            </div>
            <div class="md:ml-2 md:mt-0 mt-2 md:w-3/12 w-full">
              <ValidationProvider name="валюта" rules="required" v-slot="{ errors }">
                <select
                  name="currency"
                  v-model="formValues.currency"
                  id="currency"
                  class="w-full form-select block rounded-md bg-white shadow border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 cursor-pointer"
                >
                  <option value="RUB">RUB</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>

                <div class="mt-1">
                  <div class="text-red-500" v-for="error in errors">{{error}}</div>
                  <div class="text-red-500" v-for="error in serverErrors.currency">{{error}}</div>
                </div>
              </ValidationProvider>
            </div>
          </div>
          <div class="md:w-4/12 w-full pl-4">
            <p>Оплата за товар производится в рублях, но вы можете указать цену в другой валюте из представленных, стоимость будет автоматически пересчитываться по курсу</p>
            <a href="https://www.cbr.ru/" class="link">ЦБ РФ</a>
          </div>
        </div>
        <div class="flex md:flex-row flex-col mb-4">
          <div class="md:w-2/12 w-full">
            <label for="description" class="text-gray-800 font-semibold">Цена по запросу</label>
          </div>
          <div class="md:w-6/12 w-full flex flex-col">
            <ToggleButton v-model="formValues.askPrice" color="#10B981" :labels="false"/>
          </div>
        </div>
        <div class="flex md:flex-row flex-col mb-4">
          <div class="md:w-2/12 w-full">
            <label for="description" class="text-gray-800 font-semibold">Ативен</label>
          </div>
          <div class="md:w-6/12 w-full flex flex-col">
            <ToggleButton v-model="formValues.isActive" color="#10B981" :labels="false"/>
          </div>
        </div>
      </div>
      <button
        type="button"
        @click.prevent="toNextStep(validate)"
        :class="`flex items-center text-sm text-center text-white font-bold inline-block rounded-lg py-2 px-7 cursor-pointer duration-200 transition ${!invalid ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-200 hover:bg-gray-300'} mb-4`"
      >
        <span class="mr-2">Продолжить</span>
        <FontAwesomeIcon icon="arrow-right"/>
      </button>
    </div>


    <div v-if="step === 4 && !loading">
      <div class="shadow rounded-lg p-7 mb-4">
        <h2 class="font-bold text-2xl mb-14">
          <FontAwesomeIcon icon="chevron-left" class="mr-4 cursor-pointer" @click.prevent="step--"/>
          <span>Параметры товара</span>
        </h2>

        <div v-if="subcategory && subcategory.localities.length" class="flex md:flex-row flex-col mb-4">
          <div class="md:w-2/12 w-full">
            <label for="locality" class="text-gray-800 font-semibold">Локалитет</label>
          </div>
          <div class="md:w-6/12 w-full flex flex-col">
            <select
              name="locality"
              id="locality"
              v-model="formValues.locality"
              class="w-full form-select block rounded-md bg-white shadow border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 cursor-pointer"
            >
              <option :value="''">Нет локалитета</option>
              <option v-for="locality in subcategory.localities" :value="locality.id">{{ locality.title }}</option>
            </select>
          </div>
        </div>
        <div class="flex md:flex-row flex-col mb-4">
          <div class="md:w-2/12 w-full">
            <label class="text-gray-800 font-semibold">Морфы</label>
          </div>
          <div class="md:w-6/12 w-full flex flex-col">
            <MorphsSelect class="forms-select" :morphs="morphs" @change="changeMorphs" :kind="kind.id"/>
          </div>
        </div>
        <div class="flex md:flex-row flex-col mb-4">
          <div class="md:w-2/12 w-full">
            <div class="text-gray-800 font-semibold">Пол</div>
          </div>
          <div class="md:w-6/12 w-full flex flex-col">
            <ValidationProvider name="пол" rules="required" v-slot="{ errors }">
              <label
                class="flex items-center cursor-pointer mb-1"
                for="sex_male"
              >
                <input
                  id="sex_male"
                  name="sex"
                  v-model="formValues.sex"
                  :value="true"
                  type="radio"
                  class="form-radio cursor-pointer rounded bg-gray-200 border-transparent focus:border-transparent text-green-600 focus:ring-0 focus:ring-offset-0 mr-1"
                >
                <span>
                <FontAwesomeIcon icon="mars" size="lg" style="color: #3f81e5;"/> Самец(Male)
              </span>
              </label>
              <label
                class="flex items-center cursor-pointer mb-1"
                for="sex_female"
              >
                <input
                  id="sex_female"
                  name="sex"
                  v-model="formValues.sex"
                  :value="false"
                  type="radio"
                  class="form-radio cursor-pointer rounded bg-gray-200 border-transparent focus:border-transparent text-green-600 focus:ring-0 focus:ring-offset-0 mr-1"
                >
                <span>
                <FontAwesomeIcon icon="venus" size="lg" style="color: #c11f80;"/> Самка(Female)
              </span>
              </label>
              <label
                class="flex items-center cursor-pointer mb-1"
                for="sex_female"
              >
                <input
                  id="sex_null"
                  name="sex"
                  v-model="formValues.sex"
                  :value="null"
                  type="radio"
                  class="form-radio cursor-pointer rounded bg-gray-200 border-transparent focus:border-transparent text-green-600 focus:ring-0 focus:ring-offset-0 mr-1"
                >
                <span>Пол не определен</span>
              </label>
              <label
                class="flex items-center cursor-pointer mb-1"
                for="sex_female"
              >
                <input
                  id="sex_group"
                  name="sex"
                  v-model="formValues.sex"
                  value="group"
                  type="radio"
                  class="form-radio cursor-pointer rounded bg-gray-200 border-transparent focus:border-transparent text-green-600 focus:ring-0 focus:ring-offset-0 mr-1"
                >
                <span>Я продаю группой</span>
              </label>
              <div class="mt-1">
                <div class="text-red-500" v-for="error in errors">{{error}}</div>
                <div class="text-red-500" v-for="error in serverErrors.sex">{{error}}</div>
              </div>
            </ValidationProvider>
            <div v-if="formValues.sex === 'group'" class="mt-2">
              <div class="mb-2">Укажите количество животных:</div>
              <div class="flex md:flex-row flex-col">
                <div class="md:w-6/12 w-full md:mb-0 mb-2">
                  <ValidationProvider name="количество самцов" rules="required" v-slot="{ errors }">
                    <div>
                      <input
                        id="groupMale"
                        name="groupMale"
                        v-model="formValues.groupMale"
                        type="text"
                        class="forms-input"
                      >
                      <label for="groupMale">Самцов</label>
                    </div>
                    <div class="mt-1">
                      <div class="text-red-500" v-for="error in errors">{{error}}</div>
                      <div class="text-red-500" v-for="error in serverErrors.groupMale">{{error}}</div>
                    </div>
                  </ValidationProvider>
                </div>
                <div class="md:w-6/12 w-full">
                  <ValidationProvider name="количество самок" rules="required" v-slot="{ errors }">
                    <div>
                      <input
                        id="groupFemale"
                        name="groupFemale"
                        v-model="formValues.groupFemale"
                        type="text"
                        class="forms-input"
                      >
                      <label for="groupFemale">Самок</label>
                    </div>
                    <div class="mt-1">
                      <div class="text-red-500" v-for="error in errors">{{error}}</div>
                      <div class="text-red-500" v-for="error in serverErrors.groupFemale">{{error}}</div>
                    </div>
                  </ValidationProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex md:flex-row flex-col mb-4">
          <div class="md:w-2/12 w-full">
            <label for="price" class="text-gray-800 font-semibold">Дата рождения</label>
          </div>
          <div class="md:w-6/12 w-full flex md:flex-nowrap flex-wrap">
            <client-only>
              <div class="md:w-5/12 w-full">
                <ValidationProvider name="дата рождения" rules="required" v-slot="{ errors }">
                  <DatePicker v-model="formValues.cb" format="DD.MM.YYYY" :placeholder="moment().format('DD.MM.YYYY')"/>

                  <div class="mt-1">
                    <div class="text-red-500" v-for="error in errors">{{error}}</div>
                    <div class="text-red-500" v-for="error in serverErrors.cb">{{error}}</div>
                  </div>
                </ValidationProvider>
              </div>
            </client-only>
            <div class="md:ml-2 md:mt-0 mt-2 md:w-3/12 w-full">
              <ValidationProvider name="возраст" rules="required" v-slot="{ errors }">
                <select
                  name="age"
                  id="age"
                  v-model="formValues.age"
                  class="form-select block rounded-md bg-white shadow border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 cursor-pointer"
                >
                  <option value="1">Baby</option>
                  <option value="4">Junior</option>
                  <option value="2">Subadult</option>
                  <option value="3">Adult</option>
                </select>
                <div class="mt-1">
                  <div class="text-red-500" v-for="error in errors">{{error}}</div>
                  <div class="text-red-500" v-for="error in serverErrors.age">{{error}}</div>
                </div>
              </ValidationProvider>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        @click.prevent="toNextStep(validate)"
        :class="`flex items-center text-sm text-center text-white font-bold inline-block rounded-lg py-2 px-7 cursor-pointer duration-200 transition ${!invalid ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-200 hover:bg-gray-300'} mb-4`"
      >
        <span class="mr-2">Продолжить</span>
        <FontAwesomeIcon icon="arrow-right"/>
      </button>
    </div>

    <div v-if="step === 5 && !loading">
      <div class="shadow rounded-lg p-7 mb-4">
        <h2 class="font-bold text-2xl mb-14">
          <FontAwesomeIcon icon="chevron-left" class="mr-4 cursor-pointer" @click.prevent="kind.onlyText ? step = 3 : step = 4"/>
          <span>Добавте фото</span>
        </h2>
        <div>
          <UploadImage
            @isUpload="isUpload"
            :value="images"
            @change="(val) => images = val"
          />
        </div>
      </div>

      <button
        type="submit"
        :disabled="uploaded && images.length"
        :class="`flex items-center text-sm text-center text-white font-bold inline-block rounded-lg py-2 px-7 cursor-pointer duration-200 transition ${!uploaded && images.length ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-200 hover:bg-gray-300'} mb-4`"
      >
        <span v-if="!uploaded" class="mr-2">Продолжить</span>
        <svg v-else class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <FontAwesomeIcon icon="arrow-right"/>
      </button>
    </div>
  </ValidationObserver>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapState} from "vuex";
import moment from "moment";
import {IKind, IMorph} from "~/types";
import qs from "qs";

export default Vue.extend({
  middleware: ['auth'],
  layout: 'profile',

  data: () => ({
    formValues: {
      askPrice: false,
      isActive: true,
      name: '',
      article: '',
      description: null,
      price: null,
      currency: 'RUB',
      age: '1',
      locality: '',
      cb: '' as string|Date,
      sex: true as boolean|string|null,
      groupMale: 0,
      groupFemale: 0,
    },

    serverErrors: {},
    images: [] as Array<any>,
    morphs: [] as Array<IMorph>,

    kind: null as unknown as IKind,
    subcategory: null as any,
    uploaded: false,
    step: 1,
    loading: false,
    success: false
  }),

  methods: {
    moment,
    submit() {
      const product: any = {
        ...this.formValues,
        cb: moment(this.formValues.cb).add(4, 'hours'),
        tmpImages: this.images.map((i: any) => i.tmpId),
        tmpMorphs: this.morphs.map(m => ({
          type: 'add',
          gene: m.gene.id,
          trait: m.trait.id
        })),
        tmpPreview: String(this.images[0].tmpId),
        sex: this.formValues.sex === 'group' ? null : this.formValues.sex,
        kind: {
          id: this.kind.id
        },
        age: {
          id: this.formValues.age
        }
      };

      if (this.subcategory) {
        product.subcategory = {
          id: this.subcategory.id
        }
      }

      if (this.formValues.locality) {
        product.locality = {
          id: this.formValues.locality
        }
      }

      this.loading = true
      this.$api.createProduct(product)
        .then((data: any) => {
          this.success = true;
          this.$router.push(`/profile/products/${data.id}?type=added`);
        })
        .catch((err) => {
          if (err.response.status === 422) {
            const errors = err.response.data.errors;
            this.serverErrors = {
              name: errors.filter((item: any) => item.source.pointer === "/data/attributes/name").map((item: any) => item.detail),
              article: errors.filter((item: any) => item.source.pointer === "/data/attributes/article").map((item: any) => item.detail),
              price: errors.filter((item: any) => item.source.pointer === "/data/attributes/price").map((item: any) => item.detail),
              currency: errors.filter((item: any) => item.source.pointer === "/data/attributes/currency").map((item: any) => item.detail),
              sex: errors.filter((item: any) => item.source.pointer === "/data/attributes/sex").map((item: any) => item.detail),
              cb: errors.filter((item: any) => item.source.pointer === "/data/attributes/cb").map((item: any) => item.detail)
            };

            if ((this.serverErrors as any).name.length
              || (this.serverErrors as any).article.length
              || (this.serverErrors as any).price.length
              || (this.serverErrors as any).currency.length) {
              this.step = 3
            } else {
              this.step = 4
            }

            this.loading = false;
          }
        });
    },

    toNextStep(validate: () => Promise<boolean>) {
      validate()
        .then(validated => {
          if (validated) {
            if (this.step === 3 &&  this.kind.onlyText) {
              return this.step = 5
            }

            this.step++
          }
        })
    },

    changeMorphs(morphs: Array<IMorph>) {
      this.morphs = morphs;
    },

    chooseKind(kind: IKind) {
      this.kind = kind;

      if (kind.onlyText) {
        this.formValues.sex = null;
        this.formValues.cb = new Date();
      }

      if (kind.subcategories.length) {
        this.step = 2;

        return
      }

      this.step = 3
    },

    isUpload(upl: boolean) {
      this.uploaded = upl;
    }
  },

  computed: {
    ...mapState('core', ['kinds'])
  },

  head: () => ({
    title: 'Добавить товар'
  }),
})
</script>
