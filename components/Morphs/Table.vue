<template>
  <div class="md:p-2 h-full">
    <div v-if="isModal" class="py-3 mb-3 border-b relative flex justify-center">
      <h3 class="font-bold">Таблица морф</h3>
      <div class="absolute top-3 right-2.5  cursor-pointer">
        <FontAwesomeIcon icon="times" size="lg" @click="$modal.hide('morphs-table')"/>
      </div>
    </div>
    <div v-if="loading" class="flex items-center justify-center my-3">
      <svg class="animate-spin -ml-1 mr-3 h-12 w-12 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    <div v-if="genes.length" class="mb-6">
      <h3 class="font-bold text-xl mb-2 ml-2">Морфы:</h3>
      <div class="flex flex-wrap items-start">
        <div
          v-for="gene in genes"
          :key="`table-gene-${gene.id}`"
          class="flex items-start justify-between lg:w-3/12 md:w-4/12 sm:w-6/12 w-full py-2 px-4"
        >
          <NuxtLink
            :to="{
              path: '/category/' + kind.slug,
              query: {
                gene: gene.title
              }
            }"
            @click.native="$modal.hide('morphs-table')"
            class="font-semibold"
          >
            {{gene.title}}
          </NuxtLink>
          <div v-if="gene.traits" class="flex justify-end">
            <NuxtLink
              v-for="trait in gene.traits"
              :key="`table-gene-${gene.id}-trait-${trait.id}`"
              :to="{
                path: '/category/' + kind.slug,
                query: {
                  gene: gene.title,
                  trait: trait.title
                }
              }"
              @click.native="$modal.hide('morphs-table')"
              :class="`morph-indicator ml-1  inline-block text-sm morph-${trait.type}-${trait.title.toLowerCase()}`"
            >
              {{trait.products_count}}
            </NuxtLink>
          </div>
          <div v-else class="flex justify-end">
            <NuxtLink
              v-for="traitGroup in gene.traitGroups"
              :key="`table-gene-${gene.id}-trait-group-${traitGroup.id}`"
              :to="{
                path: '/category/' + kind.slug,
                query: {
                  gene: gene.title,
                  trait: traitGroup.label
                }
              }"
              @click.native="$modal.hide('morphs-table')"
              :class="`morph-indicator ml-1 inline-block text-sm morph-${traitGroup.type}-${traitGroup.label.toLowerCase()}`"
            >
              {{traitGroup.products_count}}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div v-if="subcategories.length" class="mb-5">
      <h3 class="font-bold text-xl mb-2 ml-2">Подкатегории и локалитеты:</h3>
      <div class="flex flex-wrap items-start justify-center">
        <div
          v-for="subcategory in subcategories"
          :key="`table-subcategory-${subcategory.id}`"
          class="lg:w-3/12 md:w-4/12 sm:w-6/12 w-full py-2 px-4"
        >
          <div class="flex items-start justify-between mb-2">
            <NuxtLink
              :to="'/category/' + kind.slug + '/' + subcategory.slug"
              @click.native="$modal.hide('morphs-table')"
              class="font-semibold"
            >
              {{subcategory.title}}
            </NuxtLink>
            <NuxtLink
              :to="'/category/' + kind.slug + '/' + subcategory.slug"
              @click.native="$modal.hide('morphs-table')"
              class="morph-indicator ml-1 inline-block text-sm morph-other-normal"
            >
              {{subcategory.products_count}}
            </NuxtLink>
          </div>
          <div class="pl-8">
            <div
              v-for="locality in subcategory.localities"
              :key="`table-subcategory-${subcategory.id}-locality-${locality.id}`"
              class="flex items-start justify-between mb-2"
            >
              <NuxtLink
                :to="{
                  path: `/category/${kind.slug}/${subcategory.slug}`,
                  query: {
                    localities: locality.id
                  }
                }"
                @click.native="$modal.hide('morphs-table')"
                class="font-semibold"
              >
                {{locality.title}}
              </NuxtLink>
              <NuxtLink
                :to="{
                  path: `/category/${kind.slug}/${subcategory.slug}`,
                  query: {
                    localities: locality.id
                  }
                }"
                @click.native="$modal.hide('morphs-table')"
                class="morph-indicator ml-1 inline-block text-sm morph-other-normal"
              >
                {{locality.products_count}}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="md:w-7/12 w-full">
        <div class="shadow p-5">
          <h3 class="font-bold text-lg text-center">Обозначения в таблице</h3>
          <div>
            <div class="flex flex-col md:flex-row items-center justify-between w-full mb-5">
              <p
                class="w-full text-center md:text-left mb-5"
                style="lineHeight: 1.1;"
              >
                Доминантные и Ко-доминантные гены<br/>
                <span
                  style="fontSize: 12;"
                >(Dominant and Co-dominant genes)</span>
              </p>
              <div class="morphs-table morphs justify-center">
                <div class="morph-indicator mr-1"></div>
                <div class="morph-indicator morph-dominant-normal mr-1">Visual</div>
                <div class="morph-indicator morph-dominant-super">Super</div>
              </div>
            </div>
            <div class="flex flex-col md:flex-row items-center justify-between w-full mb-5">
              <p
                class="w-full text-center md:text-left mb-5"
                style="lineHeight: 1.1;"
              >
                Рецессивные гены&nbsp;
                <span
                  style="fontSize: 12;"
                >(Recessive genes)</span>
              </p>
              <div class="morphs-table morphs justify-center">
                <div class="morph-indicator morph-recessive-possible-het mr-1">poss. Het.</div>
                <div class="morph-indicator morph-recessive-het mr-1">100% Het.</div>
                <div class="morph-indicator morph-recessive-visual">Visual</div>
              </div>
            </div>
            <div class="flex flex-col md:flex-row items-center justify-between w-full">
              <p class="w-full text-center md:text-left mb-5" style="lineHeight: 1.1">Другие визуальные признаки<br/><span style="fontSize: 12;">(селекционные, природные и генетические)</span></p>
              <div class="morphs-table morphs justify-center">
                <div class="morph-indicator morph-other-possible mr-1">possible</div>
                <div class="morph-indicator morph-other-normal mr-1">Visual</div>
                <div class="morph-indicator"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
  import {stringify} from "qs";
import {IKind} from "~/types";

  export default Vue.extend({
    props: {
      kind: {
        type: Object as PropType<IKind>,
        default: (): IKind => ({} as IKind)
      },
      isModal: {
        type: Boolean,
        default: true
      },
      tableMorphs: {
        type: Object,
        default: () => ({
          genes: [],
          subcategories: []
        })
      },
    },

    data() {
      return {
        loading: false,
        genes: this.tableMorphs.genes,
        subcategories: this.tableMorphs.subcategories
      }
    },

    methods: {
      stringify
    },

    mounted() {
      if (!this.genes.length || !this.subcategories.length) {
        this.loading = true;
        this.$api.getKindTable(this.kind.id)
          .then((data: any) => {
            this.genes = data.genes;
            this.subcategories = data.subcategories;

            this.loading = false;
          })
      }
    }
  });
</script>
