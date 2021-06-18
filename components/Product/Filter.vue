<template>
  <div class="md:w-2/12 w-full">
    <div class="mt-2 mr-2">
      <div v-if="kind" class="mb-5">
        <div class="font-bold mb-3">Категории:</div>
        <div class="mb-1">
          <NuxtLink
            v-if="subcategory"
            :to="'/category/' + kind.slug"
            class="flex items-center transition duration-200 hover:text-green-600 ml-2"
          >
            <FontAwesomeIcon icon="chevron-left" class="mr-1"/>
            <span>{{kind.titleRus}}</span>
          </NuxtLink>
          <NuxtLink
            v-if="subcategory && $route.query.localities"
            :to="'/category/' + kind.slug + '/' + subcategory.slug"
            class="flex items-center transition duration-200 hover:text-green-600 ml-2"
          >
            <FontAwesomeIcon icon="chevron-left" class="mr-1"/>
            <span>{{subcategory.title}}</span>
          </NuxtLink>
          <NuxtLink
            v-if="!subcategory"
            :to="'/category' + kind.slug"
            class="inline-block rounded p-1 bg-green-100 transition hover:text-green-600 ml-2"
          >
            {{kind.titleRus}}
          </NuxtLink>
        </div>
        <div class="flex flex-col items-start flex-start pl-7">
          <ul v-if="kind.activeSubcategories.length && !subcategory">
            <li v-for="subcategory in kind.activeSubcategories" :key="'subcategory-filter-' + subcategory.id">
              <NuxtLink
                :to="'/category/' + kind.slug + '/' + subcategory.slug"
                class="block transition hover:text-green-600 my-1"
              >
                {{subcategory.title}}
              </NuxtLink>
            </li>
          </ul>

          <NuxtLink
            v-if="subcategory && $route.query.localities"
            :to="'/category/' + kind.slug + '/' + subcategory.slug"
            class="block rounded p-1 bg-green-100 transition hover:text-green-600 mb-1"
          >
            {{subcategory.localities.find(i => i.id === $route.query.localities).title}}
          </NuxtLink>
          <NuxtLink
            v-else-if="subcategory"
            :to="'/category/' + kind.slug + '/' + subcategory.slug"
            class="block rounded p-1 bg-green-100 transition hover:text-green-600 mb-1"
          >
            {{subcategory.title}}
          </NuxtLink>
        </div>
      </div>
      <ClientOnly v-if="minPrice !== maxPrice">
        <div class="mb-5">
          <div class="font-bold mb-3">Цена:</div>
          <div class="mb-1">
            <VueSlider v-model="price" @change="changePrice" :min="minPrice" :max="maxPrice" :height="5" :enable-cross="false"/>
            <div class="flex items-center">
              <div class="flex items-center bg-gray-200 rounded p-1 mr-2">
                <span class="text-sm px-2">от</span>
                <input type="text" @input="_.debounce(changePrice, 500)" v-model.number="price[0]" class="w-full bg-gray-200 appearance-none focus:outline-none">
              </div>
              <div class="flex items-center bg-gray-200 rounded p-1 mr-2">
                <span class="text-sm px-2">до</span>
                <input type="text" @input="_.debounce(changePrice, 500)" v-model.number="price[1]" class="w-full bg-gray-200 appearance-none focus:outline-none">
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>
      <div class="mb-5">
        <div class="font-bold mb-3">Пол:</div>
        <div class="mb-1">
          <FilterCheckbox :value="value" query="sex" :key="`sex-${idx}`" v-for="(value, idx) in sex"/>
        </div>
      </div>
      <div class="mb-5">
        <div class="font-bold mb-3">Морфы:</div>
        <div class="mb-1">
          <MorphsSelect :morphs="morphs" @change="changeMorphs"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import _ from "lodash";
  import {IMorph} from "~/types";
  import qs from 'qs';

  export default Vue.extend({
    data() {
      const price = this.$route.query.price ?
        (this.$route.query.price as string).split(',').map(i => Number(i))
        : [ this.minPrice, this.maxPrice];

      return {
        price,
        _,
        sex: [
          {
            label: 'Самец',
            value: true
          },
          {
            label: 'Самка',
            value: false
          },
          {
            label: 'Без пола',
            value: 'null'
          }
        ]
      }
    },

    methods: {
      changeMorphs(morphs: Array<IMorph>) {
        const morphsQuery = qs.stringify({morphs: morphs.map(item => `${item.gene.id},${item.trait.id}`)});
        const query = qs.parse(this.$route.fullPath.replace(this.$route.path, '').replace('?', ''));
        delete query.morphs;
        delete query.gene;
        delete query.trait;

        this.$router.push(`${this.$route.path}?${qs.stringify(query)}&${morphsQuery}`);
      },

      changePrice() {
        this.$router.push({
          path: this.$route.path,
          query: {
            ...this.$route.query,
            price: `${this.price[0]},${this.price[1]}`
          }
        });
      }
    },

    props: [
      'subcategory',
      'kind',
      'maxPrice',
      'minPrice',
      'morphs'
    ]
  });
</script>
