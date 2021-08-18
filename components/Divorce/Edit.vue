<template>
  <ValidationObserver tag="form" @submit.prevent="submit" v-slot="{ invalid, validate }">
    <nav class="text-black font-bold mb-4 text-xs" aria-label="Breadcrumb">
      <ol class="list-none p-0 inline-flex">
        <li class="flex items-center">
          <NuxtLink to="/profile">Профиль</NuxtLink>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        </li>
        <li class="flex items-center">
          <NuxtLink to="/profile/divorces">Мои разведенья</NuxtLink>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        </li>
        <li>
          <span class="text-gray-500" aria-current="page">Редактирования развода</span>
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
          Вы успешно {{ divorce.id ? 'обновили' : 'добавили' }} разведение
        </div>
      </div>
    </div>
    <div class="shadow rounded-lg p-7 mb-4">
      <h2 class="font-bold text-2xl mb-14">
        <span>Основная информация о разводе</span>
      </h2>

      <div class="flex md:flex-row flex-col mb-4">
        <div class="md:w-2/12 w-full">
          <label for="sexPhotos" class="text-gray-800 font-semibold">Фото спаривания</label>
        </div>
        <div class="md:w-6/12 w-full flex flex-col">
          <UploadImage
            @isUpload="isUpload"
            :value="sexPhotos"
            @change="(val) => sexPhotos = val"
            id="sexPhotos"
            previewClass="md:w-3/12 sm:w-6/12 w-full"
          >
            <div v-for="(image, idx) in divorce.sexPhotos" :key="`sexPhotos-${image.id}`" class="md:w-3/12 sm:w-6/12 w-full px-2 pt-2 mb-2 relative rounded">
              <FontAwesomeIcon
                @click.prevent="divorce.sexPhotos.splice(idx, 1)"
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
          <label for="masonryPhotos" class="text-gray-800 font-semibold">Фото кладки</label>
        </div>
        <div class="md:w-6/12 w-full flex flex-col">
          <UploadImage
            @isUpload="isUpload"
            :value="masonryPhotos"
            @change="(val) => masonryPhotos = val"
            id="masonryPhotos"
            previewClass="md:w-3/12 sm:w-6/12 w-full"
          >
            <div v-for="(image, idx) in divorce.masonryPhotos" :key="`sexPhotos-${image.id}`" class="md:w-3/12 sm:w-6/12 w-full px-2 pt-2 mb-2 relative rounded">
              <FontAwesomeIcon
                @click.prevent="divorce.masonryPhotos.splice(idx, 1)"
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
          <label for="exitPhotos" class="text-gray-800 font-semibold">Фото выхода</label>
        </div>
        <div class="md:w-6/12 w-full flex flex-col">
          <ValidationProvider name="фото выхода" :rules="{required: !divorce.exitPhotos.length}" v-slot="{ errors }">
            <UploadImage
              @isUpload="isUpload"
              :value="exitPhotos"
              @change="(val) => exitPhotos = val"
              id="exitPhotos"
              previewClass="md:w-3/12 sm:w-6/12 w-full"
            >
              <div v-for="(image, idx) in divorce.exitPhotos" :key="`sexPhotos-${image.id}`" class="md:w-3/12 sm:w-6/12 w-full px-2 pt-2 mb-2 relative rounded">
                <FontAwesomeIcon
                  @click.prevent="divorce.exitPhotos.splice(idx, 1)"
                  icon="times"
                  class="text-red-500 absolute top-2 right-4 cursor-pointer z-30"
                />
                <img :src="image.imgSrc" alt="" class="img-fluid shadow rounded">
              </div>
            </UploadImage>

            <div class="mt-1">
              <div class="text-red-500" v-for="error in errors">{{error}}</div>
              <div class="text-red-500" v-for="error in serverErrors.tmpImages">{{error}}</div>
            </div>
          </ValidationProvider>
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
              v-model="formValues.title"
              type="text"
              class="forms-input w-full"
            >
            <div class="mt-1">
              <div class="text-red-500" v-for="error in errors">{{error}}</div>
              <div class="text-red-500" v-for="error in serverErrors.title">{{error}}</div>
            </div>
          </ValidationProvider>
        </div>
      </div>
      <div class="flex md:flex-row flex-col mb-4">
        <div class="md:w-2/12 w-full">
          <label class="text-gray-800 font-semibold">Категория</label>
        </div>
        <div class="md:w-6/12 w-full flex flex-col">
          <ValidationProvider name="категория" rules="required" v-slot="{ errors }">
            <VueSelect
              class="forms-select"
              label="titleRus"
              @input="(k) => {
                if (divorce.kind && k.id !== divorce.kind.id) {
                  subcategory = null
                }
              }"
              :options="kinds.filter(k => !k.onlyText)"
              v-model="kind"
              append-to-body
              :calculate-position="withPopper"
            />

            <div class="mt-1">
              <div class="text-red-500" v-for="error in errors">{{error}}</div>
              <div class="text-red-500" v-for="error in serverErrors.kind">{{error}}</div>
            </div>
          </ValidationProvider>
        </div>
      </div>
      <div v-if="kind">
        <div v-if="kind.subcategories.length" class="flex md:flex-row flex-col mb-4">
          <div class="md:w-2/12 w-full">
            <label class="text-gray-800 font-semibold">Подкатегория</label>
          </div>
          <div class="md:w-6/12 w-full flex flex-col">
            <ValidationProvider name="подкатегория" rules="required" v-slot="{ errors }">
              <VueSelect
                class="forms-select"
                label="title"
                placeholder="Выберите подкатегорию"
                :options="kind.subcategories"
                v-model="subcategory"
                append-to-body
                :calculate-position="withPopper"
              />

              <div class="mt-1">
                <div class="text-red-500" v-for="error in errors">{{error}}</div>
                <div class="text-red-500" v-for="error in serverErrors.subcategory">{{error}}</div>
              </div>
            </ValidationProvider>
          </div>
        </div>
        <div class="flex md:flex-row flex-col mb-4">
          <div class="md:w-2/12 w-full">
            <label class="text-gray-800 font-semibold">Морфы самца</label>
          </div>
          <div class="md:w-6/12 w-full flex flex-col">
            <MorphsSelect class="forms-select" :morphs="male" @change="m => changeMorphs(m, true)" :kind="kind.id"/>
          </div>
        </div>
        <div class="flex md:flex-row flex-col mb-4">
          <div class="md:w-2/12 w-full">
            <label class="text-gray-800 font-semibold">Морфы самки</label>
          </div>
          <div class="md:w-6/12 w-full flex flex-col">
            <MorphsSelect class="forms-select" :morphs="female" @change="m => changeMorphs(m, false)" :kind="kind.id"/>
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
      @click="(e) => validate().then(bool => bool !== true && e.preventDefault())"
      :class="`flex items-center text-sm text-center text-white font-bold inline-block rounded-lg py-2 px-7 cursor-pointer duration-200 transition ${!invalid && !uploaded && (exitPhotos.length || divorce.exitPhotos.length) ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-200 hover:bg-gray-300'} mb-4`"
    >
      Сохранить
    </button>

  </ValidationObserver>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
  import {RUB, getPrice, formatMorphClass, formatMorph, withPopper} from "~/utils";
  import moment from "moment";
  import _ from "lodash";
  import {IMorph} from "~/types";
  import {mapState} from "vuex";
  import {diffArrays} from "diff";
import {RootState} from "~/store";
import VueSelect from "vue-select";

  export default Vue.extend<any, any, any, any>({
    components: {
      VueSelect,
    },

    props: {
      divorce: {
        type: Object as PropType<any>,
        default: () => ({
          exitPhotos: [],
          male: [],
          female: [],
        })
      },
    },

    data() {

      const kind =  this.divorce.kind ? (this.$store.state as RootState).core.kinds.find(k => k.id === this.divorce.kind.id) : null

      return {
        formValues: {
          title: this.divorce.title || '',
          description: this.divorce.description || '',
          cb: this.divorce.cb ?
            moment(this.divorce.cb).toDate()
            : ''
        },

        kind,
        subcategory: kind &&  this.divorce.subcategory ?
          kind.subcategories.find((s: any) => s.id === this.divorce.subcategory.id)
          : null,

        serverErrors: {},
        success: false,
        loading: false,
        uploaded: false,

        exitPhotos: [],
        sexPhotos: [],
        masonryPhotos: [],

        male: [...this.divorce.male] as Array<IMorph>,
        changedMaleMorphs: [] as Array<IMorph>,

        female: [...this.divorce.female] as Array<IMorph>,
        changedFemaleMorphs: [] as Array<IMorph>,
      }
    },

    computed: {
      ...mapState('core', ['kinds'])
    },

    methods: {
      moment,
      withPopper,
      submit() {
        const divorce: any = {
          ...this.formValues,
          cb: moment(this.formValues.cb).add(4, 'hours'),
          tmpImages: [
            ...this.sexPhotos.map((i: any) => ({
              id: i.tmpId,
              type: 'sex'
            })),
            ...this.masonryPhotos.map((i: any) => ({
              id: i.tmpId,
              type: 'masonry'
            })),
            ...this.exitPhotos.map((i: any) => ({
              id: i.tmpId,
              type: 'exit'
            }))
          ],
          tmpMorphs: [
            ...this.changedMaleMorphs.map((m: IMorph) => ({
              type: (m as any).type,
              gene: m.gene.id,
              trait: m.trait.id,
              sex: true
            })),
            ...this.changedFemaleMorphs.map((m: IMorph) => ({
              type: (m as any).type,
              gene: m.gene.id,
              trait: m.trait.id,
              sex: false
            }))
          ],
          kind: {
            id: this.kind.id
          },
          age: {
            id: this.formValues.age
          }
        };

        if (this.subcategory) {
          divorce.subcategory = {
            id: this.subcategory.id
          }
        }


        this.loading = true
        this.success = false
        this.serverErrors = {}
        let resp: Promise<any>;

        if (this.divorce.id) {
          divorce.id = this.divorce.id

          divorce.sexPhotos = this.divorce.sexPhotos.map((i: any) => ({
            ...i,
            customType: 'images'
          }));
          divorce.masonryPhotos = this.divorce.masonryPhotos.map((i: any) => ({
            ...i,
            customType: 'images'
          }));
          divorce.exitPhotos = this.divorce.exitPhotos.map((i: any) => ({
            ...i,
            customType: 'images'
          }));

          resp = this.$api.updateDivorce(divorce, 'male.gene,male.trait,male.trait.traitGroup,female.gene,female.trait,female.trait.traitGroup,kind,subcategory,exitPhotos,sexPhotos,masonryPhotos')
        } else {
          resp = this.$api.createDivorce(divorce)
        }
        resp
          .then((data) => {
            this.success = true;
            window.scrollTo({ top: 0, behavior: 'smooth' })
            this.loading = false;

            if (this.divorce.id) {
              this.$emit('change', {...data});
              this.formValues = {
                title: data.title,
                description: data.description,
                cb: data.cb ?
                  moment(this.divorce.cb).toDate()
                  : ''
              };
              this.male = [...data.male];
              this.female = [...data.male];

              this.changedMaleMorphs = [];
              this.changedFemaleMorphs = [];

              this.sexPhotos = [];
              this.masonryPhotos = [];
              this.exitPhotos = [];

              return
            }

            this.$router.push(`/profile/divorces/${data.id}`)
          })
          .catch((err) => {
            if (err.response.status === 422) {
              const errors = err.response.data.errors;
              this.serverErrors = {
                tmpImages: errors.filter((item: any) => item.source.pointer === "/data/attributes/tmpImages").map((item: any) => item.detail),
                title: errors.filter((item: any) => item.source.pointer === "/data/attributes/title").map((item: any) => item.detail),
                cb: errors.filter((item: any) => item.source.pointer === "/data/attributes/cb").map((item: any) => item.detail)
              };

              this.loading = false;
            }
          });
      },

      isUpload(upl: boolean) {
        this.uploaded = upl;
      },

      changeMorphs(morphs: Array<IMorph>, isMale: boolean) {
        if (isMale) {
          const diff = diffArrays<IMorph, IMorph>(this.divorce.male, morphs, {
            comparator: (left, right) => {
              return left.gene.id == right.gene.id && left.trait.id == right.trait.id
            }
          });

          this.changedMaleMorphs = [
            ...this.changedMaleMorphs,
            ...diff.filter(i => i.added).map(i => ({...i.value[0], type: 'add'})),
            ...diff.filter(i => i.removed).map(i => ({...i.value[0], type: 'delete'}))
          ]

          this.morphs = morphs;
          return
        }

        const diff = diffArrays<IMorph, IMorph>(this.divorce.female, morphs, {
          comparator: (left, right) => {
            return left.gene.id == right.gene.id && left.trait.id == right.trait.id
          }
        });

        this.changedFemaleMorphs = [
          ...this.changedFemaleMorphs,
          ...diff.filter(i => i.added).map(i => ({...i.value[0], type: 'add'})),
          ...diff.filter(i => i.removed).map(i => ({...i.value[0], type: 'delete'}))
        ]

        this.female = morphs
      }
    },
  });
</script>
