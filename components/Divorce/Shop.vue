<template>
  <div class="p-4 flex md:flex-row flex-col rounded-lg shadow mb-4">
    <div class="md:w-3/12 w-full">
      <div v-if="divorce.exitPhotos.length">
        <img :data-src="divorce.exitPhotos[0].imgSrc" :alt="divorce.name" class="img-fluid rounded lazyload">
      </div>
    </div>
    <div class="md:w-7/12 w-full md:px-4 md:py-0 py-4">
      <div class="font-bold md:text-lg mb-3">{{divorce.title}}</div>
      <div>
        <div class="flex md:mb-2 mb-3">
          <div class="md:w-3/12 w-5/12 font-semibold">Категория</div>
          <div class="md:w-9/12 w-7/12 pl-3">{{divorce.kind.titleRus}}</div>
        </div>
        <div v-if="divorce.subcategory" class="flex md:mb-2 mb-3">
          <div class="md:w-3/12 w-5/12 font-semibold">Под категория</div>
          <div class="md:w-9/12 w-7/12 pl-3">{{divorce.subcategory.title}}</div>
        </div>
        <div v-if="!divorce.kind.onlyText">
          <div class="flex md:mb-2 mb-3">
            <div class="md:w-3/12 w-5/12 font-semibold">Дата рождения</div>
            <div class="md:w-9/12 w-7/12 pl-3">{{moment(divorce.cb).format('DD.MM.YYYY')}}</div>
          </div>
          <div v-if="divorce.male.length" class="flex md:mb-2 mb-3">
            <div class="md:w-3/12 w-5/12 font-semibold">Морфы самца</div>
            <div class="md:w-9/12 w-7/12 pl-3">
              <div class="flex flex-wrap">
                <div v-for="morph in divorce.male" :class="`mr-2 mb-2 morph-indicator inline-block text-sm ${formatMorphClass(morph)}`">
                  {{formatMorph(morph)}}
                </div>
              </div>
            </div>
          </div>
          <div v-if="divorce.female.length" class="flex md:mb-2 mb-3">
            <div class="md:w-3/12 w-5/12 font-semibold">Морфы самца</div>
            <div class="md:w-9/12 w-7/12 pl-3">
              <div class="flex flex-wrap">
                <div v-for="morph in divorce.male" :class="`mr-2 mb-2 morph-indicator inline-block text-sm ${formatMorphClass(morph)}`">
                  {{formatMorph(morph)}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md:w-2/12 w-full flex flex-col justify-center items-center">
      <div class="flex md:flex-col items-center">
        <NuxtLink
          :to="`/profile/divorces/${divorce.id}`"
          class="w-full text-sm text-white font-bold inline-block rounded-lg py-2 px-3 cursor-pointer duration-200 transition bg-green-600 hover:bg-green-700 md:mb-2 mb-0 md:mr-0 mr-2"
        >
          Изменить
        </NuxtLink>
        <button
          @click.prevent="deleteDivorce"
          class="w-full text-sm text-white font-bold inline-block rounded-lg py-2 px-3 cursor-pointer duration-200 transition bg-red-500 hover:bg-red-600"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {RUB, getPrice, formatMorphClass, formatMorph} from "~/utils";
  import moment from "moment";
  import _ from "lodash";

  export default Vue.extend({
    methods: {
      moment,
      formatMorphClass,
      formatMorph,
      RUB,
      getPrice,

      deleteDivorce() {
        this.$api.deleteDivorce(this.divorce.id);
        this.$emit('delete', this.divorce.id)
      },
    },


    props: {
      divorce: Object,
    }
  });
</script>
