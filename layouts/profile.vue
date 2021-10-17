<template>
  <div :style="!$device.isDesktop && 'padding-bottom: 56px;'">
    <modals-container/>
    <Header/>
    <HeaderMenu :class="!headerMenuShow ? 'hidden' : ''"/>
    <main v-if="isAuthenticated && user" :class="`container md:mt-16 mt-5 ${headerMenuShow ? 'hidden' : ''}`">
      <div class="flex items-start flex-wrap">
        <div v-if="$route.path === '/profile' || $device.isDesktop" class="md:w-2/12 w-full md:mb-16 mb-5">
          <div class="mb-7 flex md:flex-col md:items-start items-center">
            <div @click.prevent="updateProfileImg" class="w-24 h-24 flex relative items-center justify-center rounded-full bg-green-400 overflow-hidden shadow">
              <div v-if="profileImgLoading" class="w-full h-full flex absolute top-0 left-0 bg-white opacity-80">
                <svg class="animate-spin m-auto h-12 w-12 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <div v-else class="w-full h-full flex absolute top-0 left-0 bg-white opacity-0 hover:opacity-50 cursor-pointer">
                <FontAwesomeIcon icon="sync-alt" size="2x" class="text-gray-600 m-auto"/>
              </div>
              <img v-if="user.profileImg" :src="user.profileImg" :alt="user.name" class="img-fluid">
              <span v-else class="text-3xl text-white font-bold">{{ user.name[0] }}{{ user.surname[0] }}</span>
            </div>
            <div class="md:ml-0 ml-3">
              <p class="font-bold text-xl">{{ user.name }}</p>
              <p class="font-bold text-xl">{{ user.surname }}</p>
            </div>
          </div>
          <ul>
            <li v-if="$device.isDesktop">
              <NuxtLink to="/profile" :class="`flex items-center justify-between md:pb-2 pb-4 text-gray-800 transition duration-200 hover:text-green-600 ${$route.path === '/profile' && 'text-green-600'}`">
                <div class="flex items-center">
                  <span class="mr-1 w-6 text-center">
                    <FontAwesomeIcon icon="home"/>
                  </span>
                  <span class="md:font-normal font-semibold">Главная</span>
                </div>
                <FontAwesomeIcon v-if="!$device.isDesktop" icon="chevron-right" class="text-gray-500"/>
              </NuxtLink>
            </li>
            <li v-if="user.isBreeder">
              <NuxtLink to="/profile/products" class="flex items-center justify-between md:pb-2 pb-4 text-gray-800 transition duration-200 hover:text-green-600">
                <div class="flex items-center">
                  <span class="mr-1 w-6 text-center">
                    <FontAwesomeIcon icon="box-open"/>
                  </span>
                  <span class="md:font-normal font-semibold">Мои товары</span>
                </div>
                <FontAwesomeIcon v-if="!$device.isDesktop" icon="chevron-right" class="text-gray-500"/>
              </NuxtLink>
            </li>
            <li v-if="user.isBreeder">
              <NuxtLink to="/profile/divorces" class="flex items-center justify-between md:pb-2 pb-4 text-gray-800 transition duration-200 hover:text-green-600">
                <div class="flex items-center">
                  <span class="mr-1 w-6 text-center">
                    <FontAwesomeIcon icon="egg"/>
                  </span>
                  <span class="md:font-normal font-semibold">Мои разведенья</span>
                </div>
                <FontAwesomeIcon v-if="!$device.isDesktop" icon="chevron-right" class="text-gray-500"/>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/profile/settings" class="flex items-center justify-between md:pb-2 pb-4 text-gray-800 transition duration-200 hover:text-green-600">
                <div class="flex items-center">
                   <span class="mr-1 w-6 text-center">
                    <FontAwesomeIcon icon="cog"/>
                  </span>
                  <span class="md:font-normal font-semibold">Настройки</span>
                </div>
                <FontAwesomeIcon v-if="!$device.isDesktop" icon="chevron-right" class="text-gray-500"/>
              </NuxtLink>
            </li>
            <li>
              <div @click.prevent="() => {$router.push('/'); logout();}" class="flex items-center justify-between md:pb-2 pb-4 text-gray-800 transition duration-200 hover:text-green-600 cursor-pointer">
                <div class="flex items-center">
                   <span class="mr-1 w-6 text-center">
                    <FontAwesomeIcon icon="sign-out-alt"/>
                  </span>
                  <span class="md:font-normal font-semibold">Выйти</span>
                </div>
                <FontAwesomeIcon v-if="!$device.isDesktop" icon="chevron-right" class="text-gray-500"/>
              </div>
            </li>
          </ul>
        </div>
        <div v-if="$route.path !== '/profile' || $device.isDesktop" class="md:w-10/12 w-full md:pl-5">
          <Nuxt />
        </div>
      </div>
    </main>
    <MobileHeader v-if="!$device.isDesktop"/>
    <Footer/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';
//@ts-ignore
import UploadAvatar from "~/components/Upload/Avatar"
import {AUTH_MUTATIONS} from "~/store/auth";
import {getFirebaseToken, setFirebaseToken} from "~/utils";

export default Vue.extend({
  middleware: ['auth'],


  data: () => ({
    profileImgLoading: false
  }),

  computed: {
    ...mapState('auth', ['user']),
    ...mapState('core', [
      'headerMenuShow'
    ]),

    ...mapGetters('auth', ['isAuthenticated']),
  },

  mounted() {
    setFirebaseToken(this.$api, this.$cookies)
      .then(async () => {
        await this.$fire.auth.signInWithCustomToken(getFirebaseToken(this.$cookies));

        const chatIds = Object.keys((await this.$fire.database.ref(`users/${this.user.id}`).get()).toJSON() || {});

        chatIds.map((chatId: string) => {
          this.$fire.database.ref(`chats/${chatId}/message`).on('value', (snapshot) => {
            const data = snapshot.val();

            if (data.creator !== String(this.user.id) && !data.checked) {
              this.setUserUnreadChats({
                [chatId]: true
              })
            } else {
              this.setUserUnreadChats({
                [chatId]: false
              })
            }
          })
        })
      })
  },

  methods: {
    ...mapActions('auth', ['logout']),
    ...mapMutations({
      setUser: `auth/${AUTH_MUTATIONS.SET_USER}`,
      setUserUnreadChats: `auth/${AUTH_MUTATIONS.SET_USER_UNREAD_CHATS}`
    }),
    updateProfileImg() {
      this.$modal.show(UploadAvatar, {
        uploaded: (id: number) => {
          this.profileImgLoading = true;
          this.$api.updateUser({
            id: this.user.id,
            profileImg: id,
          })
            .then((data:any) => {
              this.setUser(data);
              this.profileImgLoading = false;
            })
        }
      }, {
        name: 'upload-avatar',
        adaptive: true,
        height: 'auto',
        scrollable: true,
        class: 'upload-modal'
      })
    }
  }
})
</script>
