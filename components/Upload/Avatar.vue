<template>
  <div class="p-3">
    <div  v-show="!edit && !loading" class="flex justify-center items-center p-3 border-4 border-green-500 border-dashed rounded">
      <FileUpload
        extensions="gif,jpg,jpeg,png,webp"
        accept="image/png,image/gif,image/jpeg,image/webp"
        name="file"
        :custom-action="upload"
        :drop="!edit"
        v-model="files"
        @input-file="inputFile"
        @input-filter="inputFilter"
        ref="upload">

        <div class="flex flex-col items-center">
          <p class="font-semibold">Перетащите картинку сюда</p>
          <p class="font-semibold mb-1">или</p>
          <button
            class="text-sm text-white font-bold inline-block rounded-lg py-2 px-4 cursor-pointer duration-200 transition bg-green-600 hover:bg-green-700"
          >
            Выберете фотографию
          </button>
        </div>
      </FileUpload>
    </div>
    <div v-show="files.length && edit && !loading">
      <div v-if="files.length" class="h-full">
        <img ref="editImage" :src="files[0].url" class="img-fluid"/>
      </div>

      <div class="flex mt-3">
        <button
          @click.prevent="editSave"
          class="text-sm text-white font-bold inline-block rounded-lg py-2 px-4 cursor-pointer duration-200 transition bg-green-600 hover:bg-green-700"
        >
          Сохранить
        </button>
      </div>
    </div>
    <div v-if="loading" class="flex items-center justify-center h-full">
      <svg class="animate-spin -ml-1 mr-3 h-12 w-12 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs';
//@ts-ignore
import 'vue-upload-component/dist/vue-upload-component.part.css';
//@ts-ignore
import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js'

export default Vue.extend({
  components: {
    FileUpload
  },

  props: ['uploaded'],

  data: () => ({
    files: [] as Array<any>,
    edit: false,
    cropper: {} as Cropper,
    loading: false
  }),


  watch: {
    edit(value) {
      if (value) {
        this.$nextTick(function () {
          // @ts-ignore
          if (!this.$refs.editImage) {
            return
          }
          // @ts-ignore
          let cropper = new Cropper(this.$refs.editImage, {
            autoCropArea: 0.5,
            aspectRatio: 1 / 1,
            viewMode: 1,
          })
          this.cropper = cropper
        })
      } else {
        if (this.cropper) {
          this.cropper.destroy()
        }
      }
    }
  },

  methods: {
    async upload(file: any, component: any) {
      this.loading = true;
      file.postAction = `${this.$config.api}api/v2/upload`;
      await component.uploadHtml5(file)
        .then((resp:any) => {
          this.uploaded(Number(resp.xhr.response));
          // @ts-ignore
          this.$modal.hide('upload-avatar');

          return resp;
        });
    },

    editSave() {
      this.edit = false
      let oldFile = this.files[0]
      let binStr = atob(this.cropper.getCroppedCanvas().toDataURL(oldFile.type).split(',')[1])
      let arr = new Uint8Array(binStr.length)
      for (let i = 0; i < binStr.length; i++) {
        arr[i] = binStr.charCodeAt(i)
      }
      let file = new File([arr], oldFile.name, { type: oldFile.type })

      // @ts-ignore
      this.$refs.upload.update(oldFile.id, {
        file,
        type: file.type,
        size: file.size,
        active: true,
      })
    },

    inputFile(newFile: any, oldFile: any) {
      if (newFile && !oldFile) {
        this.$nextTick(function () {
          this.edit = true
        })
      }
      if (!newFile && oldFile) {
        this.edit = false;

        // Uploaded successfully
        if (oldFile.success) {
          console.log('success', oldFile.success, oldFile)
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
