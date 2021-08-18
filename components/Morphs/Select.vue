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
        <span class="cursor-pointer" @click="deleteSelectedMorph(idx)">
          <FontAwesomeIcon icon="times"/>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
import {mapState} from 'vuex';
  import _ from "lodash";
  import {IKind, IMorph} from "~/types";
  import {formatMorph, formatMorphClass, withPopper} from "~/utils";
import VueSelect from "vue-select";

  export default Vue.extend({
    components: {
      VueSelect
    },

    data() {
      return {
        selectedMorphs: [...this.morphs] || [] as Array<IMorph>,
        morph: null,
        searchedMorphs: [] as Array<IMorph>
      }
    },

    watch: {
      morphs: function (val) {
        this.selectedMorphs = val;
      },
    },

    computed: {
      ...mapState('core', ['kinds'])
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
          const kind = this.kinds.find((k: IKind) => k.slug === this.$route.params.slug)?.id || this.kind;
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

      withPopper,
      formatMorphClass,
      formatMorph
    },

    props: {
      kind: String,
      morphs: Array as PropType<Array<IMorph>>
    }
  });
</script>
