<template>
  <div class="flex flex-col lg:w-3/12 md:w-4/12 sm:w-6/12 w-full px-2 mb-2">
    <div class="flex flex-col shadow rounded-xl bg-white p-2 flex-1">
      <NuxtLink :to="'/category/' + product.kind.slug + '/' + product.id"  class="relative mb-2">
        <div class="absolute bg-white shadow rounded top-2 right-2 p-1">
          <div v-if="!product.group || (product.group.male === 0 && product.group.female)">
            <FontAwesomeIcon v-if="product.sex === null" icon="genderless" class="text-xl"/>
            <FontAwesomeIcon v-if="!product.sex && product.sex !== null" icon="venus" class="text-xl" style="color: #c11f80;"/>
            <FontAwesomeIcon v-if="product.sex" icon="mars" class="text-xl" style="color: #3f81e5;"/>
          </div>
          <div v-else class="flex">
            <div>
              <span class="text-sm">{{product.group.male}}</span>
              <FontAwesomeIcon icon="mars" class="text-xl" style="color: #3f81e5;"/>
            </div>
            <span class="text-sm">.</span>
            <div>
              <span class="text-sm">{{product.group.female}}</span>
              <FontAwesomeIcon icon="venus" class="text-xl" style="color: #c11f80;"/>
            </div>
          </div>
        </div>
        <img :data-src="product.preview.imgSrc" alt="" class="img-fluid rounded lazyload">
      </NuxtLink>
      <div class="flex flex-col flex-1">
        <div v-if="!product.askPrice">
          <span class="text-red-500 font-bold text-lg">{{formatPrice()}}</span>
        </div>
        <NuxtLink
          :to="'/category/' + product.kind.slug + '/' + product.id"
          class="block font-semibold text-sm mb-2 transition duration-200 hover:text-green-600"
        >
          {{product.name}}
        </NuxtLink>

        <div class="star mb-3">
          <div class="star-outline"></div>
          <div class="star-filled" style="width: 75%"></div>
        </div>

        <div class="mt-auto">
          <button
            class="text-sm text-white font-bold inline-block rounded-lg py-2 px-3 cursor-pointer duration-200 transition bg-green-600 hover:bg-green-700"
          >
            {{
              product.askPrice ?
                'Запросить цену'
                : 'Написать продавцу'
            }}
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {RUB, getPrice} from "~/utils";

  export default Vue.extend({
    name: "Card",

    methods: {
      getPrice,
      formatPrice() {
        return RUB(getPrice(this.product.price))
      }
    },

    props: {
      product: Object,
    }
  });
</script>
