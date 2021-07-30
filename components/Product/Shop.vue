<template>
  <div class="p-4 flex md:flex-row flex-col rounded-lg shadow mb-4">
    <div class="md:w-3/12 w-full">
      <div v-if="product.preview">
        <img :data-src="product.preview.imgSrc" :alt="product.name" class="img-fluid rounded lazyload">
      </div>
    </div>
    <div class="md:w-7/12 w-full md:px-4 md:py-0 py-4">
      <div class="font-bold md:text-lg mb-3">{{product.name}}</div>
      <div>
        <div class="flex md:mb-2 mb-3">
          <div :class="`${product.article ? 'md:w-5/12' : 'md:w-3/12'} w-5/12 font-semibold`">{{product.article ? 'Уникальный идификатор' : 'Номер в системе'}}</div>
          <div :class="`${product.article ? 'md:w-7/12' : 'md:w-9/12'} w-7/12 pl-3`">{{product.article || product.id}}</div>
        </div>
        <div class="flex md:mb-2 mb-3">
          <div class="md:w-3/12 w-5/12 font-semibold">Категория</div>
          <div class="md:w-9/12 w-7/12 pl-3">{{product.kind.titleRus}}</div>
        </div>
        <div v-if="product.subcategory" class="flex md:mb-2 mb-3">
          <div class="md:w-3/12 w-5/12 font-semibold">Под категория</div>
          <div class="md:w-9/12 w-7/12 pl-3">{{product.subcategory.title}}</div>
        </div>
        <div v-if="!product.kind.onlyText">
          <div class="flex md:mb-2 mb-3">
            <div class="md:w-3/12 w-5/12 font-semibold">Пол</div>
            <div class="md:w-6/12 w-7/12 pl-3">
              <div v-if="!product.group || (product.group.male === 0 && product.group.female)">
                <FontAwesomeIcon v-if="product.sex === null" icon="genderless" class="text-2xl"/>
                <FontAwesomeIcon v-if="!product.sex && product.sex !== null" icon="venus" class="text-2xl" style="color: #c11f80;"/>
                <FontAwesomeIcon v-if="product.sex" icon="mars" class="text-2xl" style="color: #3f81e5;"/>
              </div>
              <div v-else class="flex">
                <div class="flex items-center">
                  <span class="text-sm">{{product.group.male}}</span>
                  <FontAwesomeIcon icon="mars" class="text-2xl" style="color: #3f81e5;"/>
                </div>
                <span class="text-sm">.</span>
                <div class="flex items-center">
                  <span class="text-sm">{{product.group.female}}</span>
                  <FontAwesomeIcon icon="venus" class="text-2xl" style="color: #c11f80;"/>
                </div>
              </div>
            </div>
          </div>
          <div class="flex md:mb-2 mb-3">
            <div class="md:w-3/12 w-5/12 font-semibold">Дата рождения</div>
            <div class="md:w-9/12 w-7/12 pl-3">{{moment(product.cb).format('DD.MM.YYYY')}}</div>
          </div>
          <div v-if="product.morphs.length" class="flex md:mb-2 mb-3">
            <div class="md:w-3/12 w-5/12 font-semibold">Морфы</div>
            <div class="md:w-9/12 w-7/12 pl-3">
              <div class="flex flex-wrap">
                <div v-for="morph in product.morphs" :class="`mr-2 mb-2 morph-indicator inline-block text-sm ${formatMorphClass(morph)}`">
                  {{formatMorph(morph)}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex md:mb-2 mb-3">
          <div class="md:w-3/12 w-5/12 font-semibold">Цена</div>
          <div class="md:w-9/12 w-7/12 pl-3">{{RUB(getPrice(product.price))}}</div>
        </div>
      </div>
    </div>
    <div class="md:w-2/12 w-full flex flex-col justify-center items-center">
      <div class="flex items-center mb-2">
        <div class="font-semibold mr-2">Цена по запросу</div>
        <client-only>
          <ToggleButton v-model="product.askPrice" color="#10B981" :labels="false"/>
        </client-only>
      </div>
      <div class="flex items-center mb-2">
        <div class="font-semibold mr-2">Ативен</div>
        <client-only>
          <ToggleButton v-model="product.isActive" color="#10B981" :labels="false"/>
        </client-only>
      </div>
      <div class="flex items-center">
        <NuxtLink
          :to="`/profile/products/${product.id}`"
          @click.native="setRedirectLink($route.fullPath)"
          class="text-sm text-white font-bold inline-block rounded-lg py-2 px-3 cursor-pointer duration-200 transition bg-green-600 hover:bg-green-700 mr-2"
        >
          Изменить
        </NuxtLink>
        <button
          @click.prevent="deleteProduct"
          class="text-sm text-white font-bold inline-block rounded-lg py-2 px-3 cursor-pointer duration-200 transition bg-red-500 hover:bg-red-600"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
  import {RUB, getPrice, formatMorphClass, formatMorph} from "~/utils";
  import moment from "moment";
  import _ from "lodash";
import {IProduct} from "~/types";
import {mapMutations} from "vuex";
import {SET_REDIRECT_LINK} from "~/store/core";

  export default Vue.extend({
    methods: {
      moment,
      formatMorphClass,
      formatMorph,
      RUB,
      getPrice,
      ...mapMutations({
        setRedirectLink: `core/${SET_REDIRECT_LINK}`
      }),

      deleteProduct() {
        this.$api.deleteProduct(this.product.id);
        this.$emit('delete', this.product.id)
      },

      checkProduct: _.debounce( (product: IProduct, vm: any) => {
        vm.$api.updateProduct({
          id: product.id,
          askPrice: product.askPrice,
          isActive: product.isActive
        })
      }, 200),
    },

    watch: {
      product: {
        handler: function (product: IProduct) {
          this.checkProduct(product, this);
        },
        deep: true
      }
    },

    props: {
      product: Object as PropType<IProduct>,
    }
  });
</script>
