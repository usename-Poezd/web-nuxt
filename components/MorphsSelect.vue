<template>
  <div>
    <VueSelect
      class="mb-2"
      label="label"
      @input="setSelectedMorph"
      placeholder="Найти"
      :filterable="false"
      :options="searchedMorphs"
      :value="morph"
      @search="onSearch"
      append-to-body
      :calculate-position="withPopper"
    >
      <template #selected-option="option">
        <div :class="`morph-indicator inline-block text-sm ${formatMorphClass(option)}`">
          {{formatMorph(option)}}
        </div>
      </template>
      <template #option="option">
        <div :class="`morph-indicator inline-block text-sm ${formatMorphClass(option)}`">
          {{formatMorph(option)}}
        </div>
      </template>
      <template #no-options="{ search, searching, loading }">
        <p v-if="!searching">
          Начните вводить название морфы
        </p>
        <p v-else>
          По запросу {{search}} ничего не найдено
        </p>
      </template>
    </VueSelect>
    <div>
      <div v-for="(morph, idx) in selectedMorphs" :key="`${morph.gene.id}${morph.trait.id}`" :class="`morph-indicator inline-block whitespace-normal mr-1 mb-1 text-sm ${formatMorphClass(morph)}`">
        <span class="mr-1">{{formatMorph(morph)}}</span>
        <span class="cursor-pointer" @click="deleteSelectedMorph">
          <FontAwesomeIcon icon="times"/>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapGetters} from 'vuex';
  import VueSelect from "vue-select";
  import _ from "lodash";
  import {IKind, IMorph} from "~/types";
  import {formatMorph, formatMorphClass} from "~/utils";
  import {createPopper} from "~/node_modules/@popperjs/core";

  export default Vue.extend({
    name: "MorphsSelect",

    components: {
      VueSelect
    },

    data() {
      return {
        selectedMorphs: this.morphs || [] as Array<IMorph>,
        morph: null,
        searchedMorphs: [] as Array<IMorph>
      }
    },

    computed: {
      ...mapGetters('core', ['kinds'])
    },

    methods: {
      setSelectedMorph(morph: IMorph) {
        if (morph) {
          this.selectedMorphs.push(morph);
        }

        this.morph = null;
        this.$emit('change', this.selectedMorphs);
      },

      deleteSelectedMorph(idx: number) {
        this.selectedMorphs.splice(idx, 1);
        this.$emit('change', this.selectedMorphs);
      },

      onSearch(search: string, loading: (arg0: boolean) => void) {
        if(search.length) {
          loading(true);
          const kind = this.kinds.find((k: IKind) => k.slug === this.$route.params.slug)?.id;
          this.search(search, kind, loading, this);
        }
      },
      search: _.debounce((search, kind, loading, vm) => {
        vm.$api.searchMorphs(search, kind)
          .then((data: Array<IMorph>) => {
            vm.searchedMorphs = data.map(m => {
              const obj: any = m;
              obj.label = `${m.gene.id}${m.trait.id}`;

              return (obj as IMorph);
            });

            loading(false)
          })
      }, 450),

      withPopper (dropdownList: any, component: any, {width}: any) {
        /**
         * We need to explicitly define the dropdown width since
         * it is usually inherited from the parent with CSS.
         */
        dropdownList.style.width = width;

        /**
         * Here we position the dropdownList relative to the $refs.toggle Element.
         *
         * The 'offset' modifier aligns the dropdown so that the $refs.toggle and
         * the dropdownList overlap by 1 pixel.
         *
         * The 'toggleClass' modifier adds a 'drop-up' class to the Vue Select
         * wrapper so that we can set some styles for when the dropdown is placed
         * above.
         */
        const popper = createPopper(component.$refs.toggle, dropdownList, {
          placement: 'bottom',
          modifiers: [
            {
              name: 'offset', options: {
                offset: [0, -1]
              }
            },
            {
              name: 'toggleClass',
              enabled: true,
              phase: 'write',
              fn ({state}) {
                component.$el.classList.toggle('drop-up', state.placement === 'top')
              },
            }]
        });

        /**
         * To prevent memory leaks Popper needs to be destroyed.
         * If you return function, it will be called just before dropdown is removed from DOM.
         */
        return () => popper.destroy();
      },

      formatMorphClass,
      formatMorph
    },

    props: {
      kind: String,
      morphs: Array as () => Array<IMorph>
    }
  });
</script>
