<template>
  <div class="flex flex-col md:px-2 mb-2">
    <div class="flex flex-col shadow rounded-xl bg-white p-2 flex-1">
      <div class="relative mb-2">
        <div class="w-100 h-24 bg-gray-300 animate-pulse rounded"></div>
      </div>
      <div class="flex flex-col flex-1">
        <div>
          <span class="w-24 h-4 bg-gray-300 animate-pulse"></span>
        </div>
        <div
          class="block mb-2 w-32 h-2 bg-gray-300"
        >

        </div>

        <div class="mt-auto">
          <button
            class="w-24 h-4 text-sm text-white font-bold inline-block rounded-lg py-2 px-3 cursor-pointer duration-200 transition bg-green-600 hover:bg-green-700 animate-pulse"
          >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
import {RUB, getPrice} from "~/utils";
import {IProduct} from "~/types";
import ChatSend from '~/components/Chat/Send';
import moment from "moment";


export default Vue.extend({
  name: "CardSkeleton"
});
</script>
