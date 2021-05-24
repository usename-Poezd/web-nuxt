<template>
  <div class="container">
    <div class="py-8">
      <div class="flex items-center mb-8">
        <h1 class="text-3xl font-bold mr-1">
          {{kind.titleRus}}
        </h1>
        <div class="text-sm text-gray-600">1024</div>
      </div>
      <div v-if="kind.subcategories.length" class="flex flex-wrap items-center mb-4">
        <a v-for="subcategory in kind.subcategories" class="rounded-full bg-gray-100 transition hover:bg-gray-200 text-black mr-2 mb-2 py-1 px-2 text-sm cursor-pointer ">
          {{subcategory.title}}
        </a>
      </div>
    </div>
    <div class="flex">
      <div class="w-2/12">
        321
      </div>


      <div class="w-10/12">
        123
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({

      data: () => ({
        kind: {} as any
      }),

      mounted() {
        console.log(this.kind)
      },

      async asyncData({ params, $api }) {
        const kind = await $api.getKind(params.slug);

        return {
          kind
        }
      }
    });
</script>
