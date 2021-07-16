<template>
  <label
    class="flex items-center cursor-pointer rounded mb-1 transition hover:text-green-600 mb-1"
  >
    <input type="checkbox" v-model="checkbox" class="form-checkbox rounded bg-gray-200 border-transparent focus:border-transparent text-green-600 focus:ring-0 focus:ring-offset-0 mr-1">
    <span>{{value.label}}</span>
  </label>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: "Checkbox",

    data() {
      const queryArray = this.$route.query[this.query] ? (this.$route.query[this.query] as String).split(',') : [];
      const idx = queryArray.findIndex((i) => i === String(this.value.value));

      return {
        checkbox: idx >= 0
      }
    },

    watch: {
      checkbox: function(newValue) {
        const queryArray = this.$route.query[this.query] ? (this.$route.query[this.query] as String).split(',') : [];
        const idx = queryArray.findIndex((i) => i === String(this.value.value));

        if (idx >= 0 && !newValue) {
          queryArray.splice(idx, 1);
        } else {
          queryArray.push(this.value.value);
        }

        this.$router.push({
          path: this.$route.path,
          query: {
            ...this.$route.query,
            [this.query]: queryArray.join(',')
          }
        })
      }
    },

    props: {
      value: Object,
      query: String
    }
  });
</script>
