<template>
  <div class="p-4">
    <div class="w-full mb-2">
      <Swiper
        :options="{
                  loop: true,
                  loopedSlides: 3,
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                  spaceBetween: 10,
                }"
        ref="modalMain"
      >
        <SwiperSlide
          v-for="image in product.images"
          :key="`modal-image-${image.id}`"
          class="cursor-grab"
        >
          <img :data-src="image.imgSrc" :alt="product.name" class="img-fluid rounded lazyload">
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="w-full">
      <client-only>
        <Swiper
          :options="{
                  loop: true,
                  loopedSlides: 3,
                  centeredSlides: true,
                  slideToClickedSlide: true,
                  slidesPerView: 3,
                  slidesPerGroup: 1,
                  spaceBetween: 10,
                 }"
          ref="modalThumbs"
        >
          <SwiperSlide
            v-for="image in product.images"
            :key="`modal-thumb-${image.id}`"

            class="swiper-thumb"
          >
            <img :data-src="image.imgSrc" :alt="product.name" class="img-fluid rounded lazyload">
          </SwiperSlide>
        </Swiper>
      </client-only>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ['product'],

  mounted() {
    this.$nextTick(() => {
      const swiperModalTop = (this.$refs.modalMain as any).$swiper;
      const swiperModalThumbs = (this.$refs.modalThumbs as any).$swiper;
      swiperModalTop.controller.control = swiperModalThumbs;
      swiperModalThumbs.controller.control = swiperModalTop;
    });
  }
})
</script>
