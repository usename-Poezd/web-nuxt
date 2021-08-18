<template>
  <div class="container md:py-8 py-4">
    <!-- MODAL -->
    <modal
       name="productModal"
       :scrollable="true"
       class="product-modal"
       width="100%"
       height="auto"
    >
      <ProductModal :product="product"/>
    </modal>
    <!-- MODAL END -->


    <nav class="text-black font-bold mb-4 text-xs" aria-label="Breadcrumb">
      <ol class="list-none p-0 inline-flex">
        <li class="flex items-center">
          <NuxtLink :to="`/category/${product.kind.slug}`">{{product.kind.titleRus}}</NuxtLink>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        </li>
        <li v-if="product.subcategory" class="flex items-center">
          <NuxtLink :to="`/category/${product.kind.slug}/${product.subcategory.slug}`">{{ product.subcategory.title }}</NuxtLink>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        </li>
        <li>
          <span class="text-gray-500" aria-current="page">{{ product.name }}</span>
        </li>
      </ol>
    </nav>

    <div class="flex justify-between items-center border-b pb-4 mb-7 ">
      <h1 class="md:text-2xl text-xl font-bold">{{ product.name }}</h1>

      <NuxtLink v-if="user && product.shop.id === user.id" :to="`/profile/products/${product.id}`">
        <FontAwesomeIcon icon="pen" class="text-green-600"/>
      </NuxtLink>
    </div>

    <div class="flex md:flex-nowrap flex-wrap items-start mb-7">
      <div class="md:w-10/12 w-full">
        <div class="w-full flex  md:flex-nowrap flex-wrap mb-7">
          <!-- IMAGES -->
          <div class="md:w-6/12 w-full flex md:flex-nowrap flex-wrap md:flex-row flex-col mr-4">
            <div v-if="!$device.isDesktop" class="w-full mb-2">
              <client-only>
                <Swiper
                :options="{
                  loop: true,
                  loopedSlides: 3,
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                  spaceBetween: 10,
                }"
                ref="main"
              >
                <SwiperSlide
                  v-for="image in product.images"
                  :key="`image-${image.id}`"
                >
                  <img @click.prevent="openModal" :data-src="image.imgSrc" :alt="product.name" class="img-fluid rounded lazyload">
                </SwiperSlide>
              </Swiper>
              </client-only>
            </div>
            <div v-if="!$device.isDesktop" class="w-full">
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
                  grabCursor: true,
                 }"
                 ref="thumbs"
               >
                 <SwiperSlide
                   v-for="image in product.images"
                   :key="`thumb-${image.id}`"

                   class="swiper-thumb"
                 >
                   <img :data-src="image.imgSrc" :alt="product.name" class="img-fluid rounded lazyload">
                 </SwiperSlide>
               </Swiper>
             </client-only>
            </div>


            <div v-if="$device.isDesktop" class="md:w-1/12 w-full mr-2 ">
              <div
                v-for="image in product.images"
                @mouseover.prevent="setShowedImg(image)"
                @click.prevent="openModal"
                :class="`rounded ring-green-600 ${showedImg.id === image.id && 'ring-1'} hover:ring-1 mb-2`"
              >
                <img :data-src="image.imgSrc" :alt="product.name" class="img-fluid rounded lazyload">
              </div>
            </div>
            <div v-if="$device.isDesktop" @click.prevent="openModal" class="md:w-11/12 w-full product-page-image">
              <img :data-src="showedImg.imgSrc" ref="image" :alt="product.name" class="img-fluid cursor-pointer rounded lazyload">

              <div class="flex mt-16">
                <svg class="animate-spin m-auto h-14 w-14 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
          </div>
          <!-- IMAGES END -->

          <!-- INFO -->
          <div v-if="$device.isDesktop" class="w-6/12">
            <div class="flex mb-4">
              <div class="w-5/12 product-border-dashed">
                <span class="relative bg-white pr-1">{{ product.article ? 'Уникальный идентификатор' : 'Номер в системе'}}</span>
              </div>
              <div class="w-7/12 font-semibold">
                {{product.article || product.id}}
              </div>
            </div>
            <div class="flex mb-4">
              <div class="w-5/12 product-border-dashed">
                <span class="relative bg-white pr-1">Категория</span>
              </div>
              <div class="w-7/12 font-semibold">
                {{product.kind.titleRus}}
              </div>
            </div>
            <div v-if="product.subcategory" class="flex mb-4">
              <div class="w-5/12 product-border-dashed">
                <span class="relative bg-white pr-1">Подкатегория</span>
              </div>
              <div class="w-7/12 font-semibold">
                {{product.subcategory.title}}
              </div>
            </div>
            <div v-if="product.locality" class="flex mb-4">
              <div class="w-5/12 product-border-dashed">
                <span class="relative bg-white pr-1">Локалитет</span>
              </div>
              <div class="w-7/12 font-semibold">
                {{product.locality.title}}
              </div>
            </div>
            <div class="flex mb-4">
              <div class="w-5/12 product-border-dashed">
                <span class="relative bg-white pr-1">Пол</span>
              </div>
              <div class="w-7/12 font-semibold">
                <div v-if="!product.group || (product.group.male === 0 && product.group.female)">
                  <div v-if="product.sex === null" class="flex">
                    <FontAwesomeIcon  icon="genderless" class="text-2xl mr-2"/>
                    <div>Без пола</div>
                  </div>
                  <div v-if="!product.sex && product.sex !== null" class="flex">
                    <FontAwesomeIcon v-if="!product.sex && product.sex !== null" icon="venus" class="text-2xl mr-2" style="color: #c11f80;"/>
                    <div>Самка (Female)</div>
                  </div>
                  <div v-if="product.sex" class="flex">
                    <FontAwesomeIcon icon="mars" class="text-2xl mr-2" style="color: #3f81e5;"/>
                    <div>Самец (Male)</div>
                  </div>
                </div>
                <div v-else class="flex">
                  <div>
                    <span>{{product.group.male}}</span>
                    <FontAwesomeIcon icon="mars" class="text-2xl" style="color: #3f81e5;"/>
                  </div>
                  <span class="text-lg">.</span>
                  <div>
                    <span>{{product.group.female}}</span>
                    <FontAwesomeIcon icon="venus" class="text-2xl" style="color: #c11f80;"/>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex mb-4">
              <div class="w-5/12 product-border-dashed">
                <span class="relative bg-white pr-1">Дата рождения</span>
              </div>
              <div class="w-7/12 font-semibold">
                {{moment(product.cb).format('DD.MM.YYYY')}}
              </div>
            </div>
            <div class="flex mb-4">
              <div class="w-5/12 product-border-dashed">
                <span class="relative bg-white pr-1">Возраст</span>
              </div>
              <div class="w-7/12 font-semibold">
                {{product.age.title}}
              </div>
            </div>
            <div v-if="product.morphs.length" class="flex items-start">
              <div class="w-5/12 product-border-dashed">
                <span class="relative bg-white pr-1">Морфы</span>
              </div>
              <div class="w-7/12">
                <div class="flex flex-wrap">
                  <NuxtLink v-for="morph in product.morphs" :key="`morph-${morph.gene.id},${morph.trait.id}`" :to="`/category/${$route.params.slug}?morphs[0]=${morph.gene.id},${morph.trait.id}`" :class="`mr-2 mb-2 morph-indicator inline-block text-sm ${formatMorphClass(morph)}`">
                    {{formatMorph(morph)}}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <!-- INFO END -->
        </div>

        <!-- SHOP -->
        <div class="shadow rounded flex md:flex-row flex-col items-start md:justify-start justify-between p-4 md:mb-0 mb-7">
          <div class="flex items-center justify-between lg:w-auto w-full">
            <NuxtLink
              :to="`/shops/${product.shop.companyName}`"
              class="w-9/12 md:hidden block"
            >
              <div class="text-sm text-gray-500">Продавец</div>

                <div
                class="font-bold">
                {{ product.shop.companyName }}
              </div>
            </NuxtLink>
            <NuxtLink
              :to="`/shops/${product.shop.companyName}`"
              :class="`md:w-24 w-14 md:h-24 h-14 shadow-md flex relative items-center justify-center rounded-full overflow-hidden mr-4 ${!product.shop.logoImg && 'bg-green-400'}`"
            >
              <img v-if="product.shop.logoImg" :src="product.shop.logoImg" :alt="product.shop.companyName" class="img-fluid shadow rounded-full">
              <span v-else class="md:text-3xl text-xl font-bold text-white m-auto">{{product.shop.companyName[0]}}</span>
            </NuxtLink>
          </div>
          <div class="md:block hidden">
            <NuxtLink
              :to="`/shops/${product.shop.companyName}`"
              class="font-bold md:text-lg mb-4">
              {{ product.shop.companyName }}
            </NuxtLink>
            <div class="flex mb-1">
              <div class="w-5/12">
                Локация
              </div>
              <div class="w-7/12 font-semibold">
                {{product.shop.location}}
              </div>
            </div>
            <div class="flex mb-4">
              <div class="w-5/12">
                На сайте с
              </div>
              <div class="w-7/12 font-semibold">
                {{moment(product.shop.createdAt).format('DD.MM.YYYY')}}
              </div>
            </div>
            <NuxtLink
              :to="`/shops/${product.shop.companyName}`"
              class="w-full text-sm text-white font-bold rounded py-2 px-3 cursor-pointer duration-200 transition bg-green-600 hover:bg-green-700"
            >
              <span class="mr-2">Перейти к продавцу</span>
              <FontAwesomeIcon icon="arrow-right"/>
            </NuxtLink>
          </div>
        </div>
        <!-- SHOP END -->
      </div>

      <!-- BASKET BUTTON -->
      <div class="md:w-2/12 w-full p-4 shadow rounded">
        <div class="mb-2">
          <div v-if="!product.askPrice" class="text-red-500 font-bold text-2xl mb-2">{{formatPrice()}}</div>
          <div v-else class="font-bold text-xl mb-2">Цена по запросу</div>
          <button
            @click.prevent="send"
            class="w-full text-sm text-white font-bold rounded py-2 px-3 cursor-pointer duration-200 transition bg-green-600 hover:bg-green-700"
          >
            {{
              product.askPrice ?
                'Запросить цену'
                : 'Написать продавцу'
            }}
          </button>
        </div>

        <div v-if="!product.askPrice">
          <p class="text-center text-sm">Эквивалент по курсу <a href="https://www.cbr.ru/" target="_blank">ЦБ РФ</a></p>
          <div class="text-center">
            <span class="font-bold text-green-600">{{ USD(this.product.price.find(p => p.currency === 'USD').amount) }}</span>
            <span class="font-bold ml-2 text-blue-500">{{ EUR(this.product.price.find(p => p.currency === 'EUR').amount) }}</span>
          </div>
        </div>
      </div>
      <!-- BASKET BUTTON END -->
    </div>
    <div class="w-full mb-7">
      <div class="font-bold text-xl mb-2">Описание</div>
      <p class="whitespace-pre-wrap">{{product.description}}</p>
    </div>

    <div v-if="!$device.isDesktop" class="w-full mb-7">
      <div class="font-bold text-xl mb-3">Информация о товаре</div>
      <div class="flex mb-4">
        <div class="w-6/12 product-border-dashed">
          <span class="relative bg-white pr-1">{{ product.article ? 'Уникальный идентификатор' : 'Номер в системе'}}</span>
        </div>
        <div class="w-6/12 font-semibold">
          {{product.article || product.id}}
        </div>
      </div>
      <div class="flex mb-4">
        <div class="w-6/12 product-border-dashed">
          <span class="relative bg-white pr-1">Категория</span>
        </div>
        <div class="w-6/12 font-semibold">
          {{product.kind.titleRus}}
        </div>
      </div>
      <div v-if="product.subcategory" class="flex mb-4">
        <div class="w-6/12 product-border-dashed">
          <span class="relative bg-white pr-1">Подкатегория</span>
        </div>
        <div class="w-6/12 font-semibold">
          {{product.subcategory.title}}
        </div>
      </div>
      <div v-if="product.locality" class="flex mb-4">
        <div class="w-6/12 product-border-dashed">
          <span class="relative bg-white pr-1">Локалитет</span>
        </div>
        <div class="w-6/12 font-semibold">
          {{product.locality.title}}
        </div>
      </div>
      <div class="flex mb-4">
        <div class="w-6/12 product-border-dashed">
          <span class="relative bg-white pr-1">Пол</span>
        </div>
        <div class="w-6/12 font-semibold">
          <div v-if="!product.group || (product.group.male === 0 && product.group.female)">
            <div v-if="product.sex === null" class="flex">
              <FontAwesomeIcon  icon="genderless" class="text-2xl mr-2"/>
              <div>Без пола</div>
            </div>
            <div v-if="!product.sex && product.sex !== null" class="flex">
              <FontAwesomeIcon v-if="!product.sex && product.sex !== null" icon="venus" class="text-2xl" style="color: #c11f80;"/>
              <div>Самка (Female)</div>
            </div>
            <div v-if="product.sex" class="flex">
              <FontAwesomeIcon icon="mars" class="text-2xl mr-2" style="color: #3f81e5;"/>
              <div>Самец (Male)</div>
            </div>
          </div>
          <div v-else class="flex">
            <div>
              <span>{{product.group.male}}</span>
              <FontAwesomeIcon icon="mars" class="text-2xl" style="color: #3f81e5;"/>
            </div>
            <span class="text-lg">.</span>
            <div>
              <span>{{product.group.female}}</span>
              <FontAwesomeIcon icon="venus" class="text-2xl" style="color: #c11f80;"/>
            </div>
          </div>
        </div>
      </div>
      <div class="flex mb-4">
        <div class="w-6/12 product-border-dashed">
          <span class="relative bg-white pr-1">Дата рождения</span>
        </div>
        <div class="w-6/12 font-semibold">
          {{moment(product.cb).format('DD.MM.YYYY')}}
        </div>
      </div>
      <div class="flex mb-4">
        <div class="w-6/12 product-border-dashed">
          <span class="relative bg-white pr-1">Возраст</span>
        </div>
        <div class="w-6/12 font-semibold">
          {{product.age.title}}
        </div>
      </div>
      <div v-if="product.morphs.length" class="flex md:flex-row flex-col">
        <div class="mb-1">
          Морфы
        </div>
        <div class="w-full pl-2">
          <div class="flex flex-wrap">
            <NuxtLink
              v-for="morph in product.morphs"
              :key="`morph-${morph.gene.id},${morph.trait.id}`"
              :class="`mr-2 mb-2 morph-indicator inline-block text-sm ${formatMorphClass(morph)}`"
              :to="`/category/${$route.params.slug}?morphs[0]=${morph.gene.id},${morph.trait.id}`"
            >
              {{formatMorph(morph)}}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <LazyHydrate when-visible>
      <div v-if="productsLoading || products.length > 0" class="w-full">
        <div class="font-bold text-xl mb-2">Похожие товары</div>
        <div class="flex md:overflow-auto overflow-y-scroll">
          <ProductCardSkeleton
            v-if="productsLoading"
            v-for="i in Array.from({length: 5}, (v, i) => i)"
            :key="'product-skeleton' + i"
            class="md:w-1/5 w-48 md:flex-shrink flex-shrink-0 md:mr-0 mr-4"
          />
          <ProductCard
            class="md:w-1/5 w-48 md:flex-shrink flex-shrink-0 md:mr-0 mr-4"
            v-for="product in products"
            :key="'product-' + product.id"
            :product="product"
            :truncateName="true"
          />
        </div>
      </div>
    </LazyHydrate>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
import {RUB, getPrice, formatMorphClass, formatMorph, USD, EUR} from "~/utils";
import {IKind, IProduct, ISubcategory} from "~/types";
import moment from "moment";
import ChatSend from "~/components/Chat/Send.vue";
import {mapState} from "vuex";
// @ts-ignore
import LazyHydrate from 'vue-lazy-hydration';

  export default Vue.extend({
    components: {
      LazyHydrate,
      ProductCard: () => import('~/components/Product/Card'),
      ProductCardSkeleton: () => import('~/components/Product/CardSkeleton'),
    },

    computed: {
      ...mapState('auth', ['user'])
    },

    data() {
      return {
        showedImg: {...this.product.images[0]},
        products: [] as Array<IProduct>,
        productsLoading: true
      }
    },

    async mounted() {
      if (!this.$device.isDesktop) {
        this.$nextTick(() => {
          const swiperTop = (this.$refs.main as any).$swiper;
          const swiperThumbs = (this.$refs.thumbs as any).$swiper;
          swiperTop.controller.control = swiperThumbs;
          swiperThumbs.controller.control = swiperTop;
        });
      }

      this.productsLoading = true
      const filter: any = {
        exclude: this.product.id,
        kind: this.$route.params.slug,
        shop: this.product.shop.id
      }
      if (!Number(this.$route.params.value)) {
        filter.subcategory = this.$route.params.value
      }
      const {products} = await this.$api.getProducts({
        include: 'preview,kind,subcategory,shop',
        query: {
          sort: 'random',
          page: {
            size: 5
          },
          filter
        }
      });
      this.products = products;
      this.productsLoading = false;
    },

    methods: {
      moment,
      EUR,
      USD,
      getPrice,
      formatMorph,
      formatMorphClass,

      send() {
        this.$modal.show(ChatSend, {product: this.product}, {
          adaptive: true,
          scrollable: true,
          height: 'auto'
        })
      },

      openModal() {
        this.$modal.show('productModal');
      },

      formatPrice() {
        return RUB(getPrice(this.product.price))
      },

      setShowedImg(image: any) {
        if (image.id !== this.showedImg.id) {
          this.showedImg = image;
          (this.$refs.image as HTMLElement).className = 'img-fluid cursor-pointer rounded lazyload'
        }
      }
    },

    props: {
      product: Object as PropType<IProduct>
    }
  });
</script>
