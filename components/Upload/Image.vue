<template>
  <div class="p-3">
    <div class="flex justify-center items-center p-3 border-4 border-green-500 border-dashed rounded">
      <FileUpload
        extensions="gif,jpg,jpeg,png,webp"
        accept="image/png,image/gif,image/jpeg,image/webp"
        :input-id="id"
        :multiple="multiple"
        :custom-action="upload"
        v-model="files"
        @input-file="inputFile"
        @input-filter="inputFilter"
        ref="upload">

        <div v-if="!files.length" class="flex flex-col items-center">
          <p class="font-semibold">Перетащите картинку сюда</p>
          <p class="font-semibold mb-1">или</p>
          <button
            class="text-sm text-white font-bold inline-block rounded-lg py-2 px-4 cursor-pointer duration-200 transition bg-green-600 hover:bg-green-700"
          >
            Выберете фотографию
          </button>
        </div>

        <div v-if="files.length || $slots.default" class="flex flex-wrap">
          <slot></slot>
          <div v-for="file in files" :key="`uploaded-image-${file.id}`" :class="`${previewClass} px-2 mb-2 relative rounded`">
            <div v-if="!file.success" class="h-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-7/12 rounded-full overflow-hidden">
              <div class="w-full h-full bg-gray-200 absolute"></div>
              <div class="transition-all ease-out duration-1000 h-full bg-green-500 relative w-0" :style="`width: ${file.progress}%`"></div>
            </div>
            <div :class="`transition absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden flex w-16 h-16 bg-white shadow opacity-0 ${file.success && 'opacity-100'}`">
              <FontAwesomeIcon icon="check" size="2x" class="text-green-500 m-auto"/>
            </div>
            <FontAwesomeIcon icon="times" class="text-red-500 absolute top-2 right-4 cursor-pointer z-30" @click.prevent="$refs.upload.remove(file)"/>
            <img :src="file.url" alt="" class="img-fluid shadow rounded">
          </div>
        </div>
      </FileUpload>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from "vue";
//@ts-ignore
import 'vue-upload-component/dist/vue-upload-component.part.css';
//@ts-ignore
import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js'

export default Vue.extend({
  // @ts-ignore
  $_veeValidate: {
    // fetch the current value from the innerValue defined in the component data.
    // @ts-ignore
    value () {
      // @ts-ignore
      return this.files;
    }
  },

  props: {
    previewClass: {
      type: String as PropType<string>,
      default: 'md:w-2/12 sm:w-6/12 w-full'
    },
    value: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: true
    },
    id: {
      type: String,
      default: 'file'
    }
  },

  components: {
    FileUpload
  },

  computed: {
    files: {
      get: function() {
        // @ts-ignore
        return this.value
      },
      set: function(value: Array<any>) {
        value = value.map((i: any) => {
          i.tmpId =  Number(i.xhr?.response)
          return i
        })

        // @ts-ignore
        this.$emit('change', value)
      }
    }
  },

  watch: {
    files: {
      handler: function (newValue) {
        // @ts-ignore
        if (!this.$refs.upload.active) {
          this.$emit('mutate', newValue.map((i: any) =>  Number(i.xhr?.response)))
        }
      },
      deep: true
    }
  },


  methods: {
    async upload(file: any, component: any) {
      // @ts-ignore
      this.$emit('isUpload', this.$refs.upload.active);
      file.postAction = 'http://localhost/api/v2/upload';
      await component.uploadHtml5(file)
        .then((resp:any) => {
          // @ts-ignore
          this.$emit('isUpload',  this.$refs.upload.uploaded);

          return resp;
        });
    },

    inputFile(newFile: any, oldFile: any) {
      if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
        // @ts-ignore
        if (!this.$refs.upload.active) {
          // @ts-ignore
          this.$refs.upload.active = true
        }
      }
    },

    inputFilter(newFile: any, oldFile: any) {
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.url = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file)
        }
      }
    }
  }

})
</script>
