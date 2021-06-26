<template>
  <input
    ref="inputRef"
    :value="formattedValue"
  >
</template>

<script>
import useCurrencyInput from 'vue-currency-input'
import {defineComponent} from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    value: Number, // Vue 2: value
    options: Object
  },

  setup (props) {
    const {
      inputRef,
      formattedValue
    } = useCurrencyInput(props.options)

    return { inputRef, formattedValue }
  }
})
</script>
