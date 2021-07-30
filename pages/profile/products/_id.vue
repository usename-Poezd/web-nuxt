<template>
  <ValidationObserver tag="form" @submit.prevent="submit" v-slot="{ invalid, validate }">
    <nav class="text-black font-bold mb-4 text-xs" aria-label="Breadcrumb">
      <ol class="list-none p-0 inline-flex">
        <li class="flex items-center">
          <NuxtLink to="/profile">Профиль</NuxtLink>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        </li>
        <li class="flex items-center">
          <NuxtLink :to="redirectLink || '/profile/products'">Мои товары</NuxtLink>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        </li>
        <li>
          <span class="text-gray-500" aria-current="page">Редактирование товара</span>
        </li>
      </ol>
    </nav>

    <div v-if="success" class="alert alert-success mb-4">
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

          <span>Вы успешно обновили продукт, </span>
          <NuxtLink :to="redirectLink || '/profile/products'" class="link">назад.</NuxtLink>
        </div>
      </div>
    </div>

    <div v-if="added" class="alert alert-success mb-4">
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
          Вы успешно добавили товар
        </div>
      </div>
    </div>
    <div class="shadow rounded-lg p-7 mb-4">
      <h2 class="font-bold text-2xl mb-14">
        <span>Основная информация о товаре</span>
      </h2>

      <div class="flex md:flex-row flex-col mb-4">
        <div class="md:w-2/12 w-full">
          <label for="preview" class="text-gray-800 font-semibold">Превью</label>
        </div>
        <div class="md:w-6/12 w-full flex flex-col">
          <UploadImage
            @isUpload="isUpload"
            :value="previews"
            :multiple="false"
            @change="(val) => previews = val"
            id="preview"
            previewClass="md:w-3/12 sm:w-6/12 w-full"
          >
            <div v-if="product.preview" class="md:w-3/12 sm:w-6/12 w-full px-2 pt-2 relative rounded">
              <FontAwesomeIcon @click.prevent="product.preview = null" icon="times" class="text-red-500 absolute top-2 right-4 cursor-pointer z-30"/>
              <img :src="product.preview.imgSrc" alt="" class="img-fluid shadow rounded">
            </div>
          </UploadImage>
        </div>
      </div>
      <div class="flex md:flex-row flex-col mb-4">
        <div class="md:w-2/12 w-full">
          <label for="images" class="text-gray-800 font-semibold">Фото</label>
        </div>
        <div class="md:w-6/12 w-full flex flex-col">
          <UploadImage
            @isUpload="isUpload"
            :value="images"
            @change="(val) => images = val"
            id="images"
            previewClass="md:w-3/12 sm:w-6/12 w-full"
          >
            <div v-for="(image, idx) in product.images" :key="`images-${image.id}`" class="md:w-3/12 sm:w-6/12 w-full px-2 mb-2 relative rounded pt-2">
              <FontAwesomeIcon
                @click.prevent="product.images.splice(idx, 1)"
                icon="times"
                class="text-red-500 absolute top-2 right-4 cursor-pointer z-30"
              />
              <img :src="image.imgSrc" alt="" class="img-fluid shadow rounded">
            </div>
          </UploadImage>
        </div>
      </div>
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
          <label class="text-gray-800 font-semibold">Категория</label>
        </div>
        <div class="md:w-6/12 w-full flex flex-col">
          <VueSelect
            class="forms-select"
            label="titleRus"
            @input="(k) => {
              if (k.id !== product.kind.id) {
                subcategory = null
              }
            }"
            :options="kinds"
            v-model="kind"
            append-to-body
            :calculate-position="withPopper"
          />
        </div>
      </div>
      <div v-if="kind.subcategories.length" class="flex md:flex-row flex-col mb-4">
        <div class="md:w-2/12 w-full">
          <label class="text-gray-800 font-semibold">Подкатегория</label>
        </div>
        <div class="md:w-6/12 w-full flex flex-col">
          <VueSelect
            class="forms-select"
            label="title"
            placeholder="Выберите подкатегорию"
            :options="kind.subcategories"
            v-model="subcategory"
            append-to-body
            :calculate-position="withPopper"
          />
        </div>
      </div>
      <div v-if="!kind.onlyText">
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
            <label for="cb" class="text-gray-800 font-semibold">Дата рождения</label>
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
          <client-only>
            <ToggleButton v-model="formValues.askPrice" color="#10B981" :labels="false"/>
          </client-only>
        </div>
      </div>
      <div class="flex md:flex-row flex-col mb-4">
        <div class="md:w-2/12 w-full">
          <label for="description" class="text-gray-800 font-semibold">Ативен</label>
        </div>
        <div class="md:w-6/12 w-full flex flex-col">
          <client-only>
            <ToggleButton v-model="formValues.isActive" color="#10B981" :labels="false"/>
          </client-only>
        </div>
      </div>
    </div>
    <div
      v-if="loading"
      class="flex-inline justify-center items-center text-sm text-white font-bold inline-block rounded-lg py-2 px-14 cursor-pointer duration-200 transition bg-green-600 hover:bg-green-700"
    >
      <svg class="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    <button
      v-else
      type="submit"
      :disabled="invalid || uploaded"
      :class="`flex items-center text-sm text-center text-white font-bold inline-block rounded-lg py-2 px-7 cursor-pointer duration-200 transition ${!invalid && !uploaded ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-200 hover:bg-gray-300'} mb-4`"
    >
      Сохранить
    </button>

  </ValidationObserver>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapActions, mapState} from "vuex";
import {IKind, IMorph, IProduct, ISubcategory} from "~/types";
import moment from "moment";
import {withPopper} from "~/utils";
import {diffArrays} from "diff";

export default Vue.extend({
  middleware: ['auth'],
  layout: 'profile',

  data() {
    return {
      product: {} as IProduct,
      formValues: {
        askPrice: false,
        isActive: true,
        name: '',
        article: '',
        description: null as string|null,
        price: null as unknown as number|undefined,
        currency: 'RUB',
        age: '1',
        locality: '',
        cb: '' as string|Date,
        sex: true as boolean|string|null,
        groupMale: 0,
        groupFemale: 0,
      },

      serverErrors: {},
      images: [] as Array<number>,
      previews: [] as Array<any>,
      morphs: [] as Array<IMorph>,

      kind: null as unknown as IKind,
      subcategory: null as unknown as ISubcategory,
      uploaded: false,
      changedMorphs: [] as Array<IMorph>,
      loading: false,
      success: false,
      added: false
    }
  },

  computed: {
    ...mapState('auth', ['user']),
    ...mapState('core', ['kinds', 'redirectLink']),
  },

  mounted() {
    if (this.added) {
      setTimeout(() => this.added = false, 5000)
    }
  },

  methods: {
    moment,
    withPopper,
    submit() {
      const product: any = {
        ...this.formValues,
        cb: moment(this.formValues.cb).add(4, 'hours'),
        id: this.product.id,
        tmpImages: this.images.map((i: any) => i.tmpId),
        tmpMorphs: this.changedMorphs.map(m => ({
          type: (m as any).type,
          gene: m.gene.id,
          trait: m.trait.id
        })),
        tmpPreview: this.previews.length ?
          String(this.previews[0].tmpId)
          : null,
        sex: this.formValues.sex === 'group' ? null : this.formValues.sex,
        kind: {
          id: this.kind.id
        },
        subcategory: this.subcategory ?
          {
            id: this.subcategory.id
          }
          : null,
        locality: this.formValues.locality ?
          {
            id: this.formValues.locality
          }
          : null,
        images: this.product.images,
        preview: this.product.preview ?
          {
            ...this.product.preview,
            customType: 'images'
          }
          : null,
        age: {
          id: this.formValues.age
        }
      };

      this.loading = true;
      this.success = false;
      this.serverErrors = {};

      this.$api.updateProduct(product, 'preview,kind,subcategory,morphs.gene,morphs.trait,morphs.trait.traitGroup,images,age,locality')
        .then((product: IProduct) => {
          this.loading = false;
          this.success = true
          window.scrollTo({ top: 0, behavior: 'smooth' })
          this.product = product;

          this.formValues = {
            askPrice: product.askPrice,
            isActive: product.isActive,
            name: product.name,
            article: product.article,
            description: product.description,
            price: product.price as unknown as number,
            currency: product.currency,
            age: product.age?.id,
            locality: product.locality?.id || '',
            cb: moment(product.cb).toDate() as Date,
            sex:  product.group !== null ? 'group' : product.sex as boolean|string|null,
            groupMale: product.group?.male || 0,
            groupFemale: product.group?.female || 0,
          };
          this.morphs = [...product.morphs];

          this.images = [];
          this.previews = [];
          this.changedMorphs = [];
        })
        .catch((err: any) => {
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
          }
        });
    },

    changeMorphs(morphs: Array<IMorph>) {
      const diff = diffArrays<IMorph, IMorph>(this.product.morphs, morphs, {
        comparator: (left, right) => {
          return left.gene.id == right.gene.id && left.trait.id == right.trait.id
        }
      });

      this.changedMorphs = [
        ...this.changedMorphs,
        ...diff.filter(i => i.added).map(i => ({...i.value[0], type: 'add'})),
        ...diff.filter(i => i.removed).map(i => ({...i.value[0], type: 'delete'}))
      ]

      this.morphs = morphs;
    },

    isUpload(upl: boolean) {
      this.uploaded = upl;
    }
  },

  async asyncData({$api, params, query, store}) {
    const product = await $api.getProduct(params.id, 'preview,kind,subcategory,morphs.gene,morphs.trait,morphs.trait.traitGroup,images,age,locality');

    const kind = store.state.core.kinds.find((k: IKind) => k.id === product.kind.id);

    return {
      product,
      formValues: {
        askPrice: product.askPrice,
        isActive: product.isActive,
        name: product.name,
        article: product.article,
        description: product.description,
        price: product.price.find(i => i.currency === product.currency)?.amount,
        currency: product.currency,
        age: product.age?.id,
        locality: product.locality?.id || '',
        cb: moment(product.cb).toDate() as Date,
        sex:  product.group !== null ? 'group' : product.sex as boolean|string|null,
        groupMale: product.group?.male || '',
        groupFemale: product.group?.female || '',
      },

      serverErrors: {},
      images: [] as Array<number>,
      morphs: [...product.morphs] as Array<IMorph>,

      kind: kind as IKind,
      subcategory: kind.subcategories.find((s: any) => s.id === product.subcategory.id),
      uploaded: false,

      added: query.type === 'added'
    }
  },

  head() {
    return {
      // @ts-ignore
      title: this.product.name
    }
  },
})
</script>
