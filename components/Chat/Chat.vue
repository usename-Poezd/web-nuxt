<template>
  <main :class="$device.isDesktop && 'container'">
    <div class="lg:py-4 pt-4 lg:px-0 px-4">
      <nav class="text-black font-bold mb-4 text-xs" aria-label="Breadcrumb">
        <ol class="list-none p-0 inline-flex">
          <li class="flex items-center">
            <NuxtLink to="/">Главная</NuxtLink>
            <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          <li>
            <span class="text-gray-500" aria-current="page">Чаты</span>
          </li>
        </ol>
      </nav>

      <div class="flex items-center">
        <h1 class="text-3xl font-bold mr-1">Чаты</h1>
      </div>
    </div>

    <div class="flex flex-wrap chat">
      <div v-if="$device.isDesktop || (!$device.isDesktop && !selectedChat.id)" class="lg:w-4/12 w-full lg:px-4" :set="interlocutors = []">
        <div v-if="!loadingChats" class="overflow-auto h-full">

          <div v-if="Object.keys(chats).length === 0" class="flex items-center p-4 h-full">
            <div class="flex flex-col items-center m-auto text-gray-500">
              <svg class="w-14 h-14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.03 10c-8.48 0-14.97 5.92-14.97 12.8 0 2.47.82 4.79 2.25 6.74a1.5 1.5 0 01.3.9c0 1.63-.43 3.22-.96 4.67a41.9 41.9 0 01-1.17 2.8c3.31-.33 5.5-1.4 6.8-2.96a1.5 1.5 0 011.69-.43 17.06 17.06 0 006.06 1.1C30.5 35.61 37 29.68 37 22.8 37 15.93 30.5 10 22.03 10zM4.06 22.8C4.06 13.9 12.3 7 22.03 7 31.75 7 40 13.88 40 22.8c0 8.93-8.25 15.81-17.97 15.81-2.17 0-4.25-.33-6.17-.95-2.26 2.14-5.55 3.18-9.6 3.34a2.2 2.2 0 01-2.07-3.08l.42-.95c.43-.96.86-1.9 1.22-2.9.41-1.11.69-2.18.76-3.18a14.28 14.28 0 01-2.53-8.08z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M43.01 18.77a1.5 1.5 0 00.38 2.09c3.44 2.38 5.55 5.98 5.55 9.95 0 2.47-.81 4.78-2.25 6.73a1.5 1.5 0 00-.3.9c0 1.63.43 3.22.96 4.67.35.96.77 1.92 1.17 2.8-3.31-.33-5.5-1.4-6.8-2.96a1.5 1.5 0 00-1.69-.43 17.06 17.06 0 01-6.06 1.1c-2.98 0-5.75-.76-8.08-2.03a1.5 1.5 0 00-1.44 2.63 20.19 20.19 0 0015.7 1.44c2.25 2.14 5.54 3.18 9.59 3.34a2.2 2.2 0 002.07-3.08l-.42-.95c-.44-.96-.86-1.9-1.22-2.9a11.65 11.65 0 01-.76-3.18 14.28 14.28 0 002.53-8.08c0-5.1-2.72-9.56-6.84-12.42a1.5 1.5 0 00-2.09.38z" fill="currentColor"></path></svg>
              <div class="font-semibold text-lg">
                Вы пока никому не написали
              </div>
            </div>
          </div>

          <div
            v-for="(chat, id) in chats"
            :key="`chat-${id}`"
            :set="interlocutors[id] = chat.members.find(m => m.id !== String(user.id))"
            @click.prevent="selectChat(id)"
            :class="`flex p-3 mb-4 rounded cursor-pointer ${$route.query.cid === id && 'bg-gray-200'}`"
          >
            <div class="w-2/12 relative">
              <div v-if="chat.newMessagesCount > 0" class="absolute px-2 rounded-full bg-green-500 z-30 text-white font-semibold -top-2 right-1">{{chat.newMessagesCount}}</div>
              <div class="md:w-14 w-12 md:h-14 h-12 shadow-md flex relative items-center justify-center rounded-full bg-green-400 overflow-hidden mr-4">
                <img
                  v-if="interlocutors[id].logoImg && interlocutors[id].companyName"
                  :src="interlocutors[id].logoImg"
                  :alt="interlocutors[id].companyName"
                  class="img-fluid shadow rounded-full"
                >
                <span
                  v-else-if="!interlocutors[id].logoImg && interlocutors[id].companyName"
                  class="text-lg text-white font-bold"
                >
                {{ interlocutors[id].companyName[0] }}
              </span>
                <img
                  v-else-if="!interlocutors[id].companyName && interlocutors[id].profileImg"
                  :src="interlocutors[id].profileImg"
                  :alt="interlocutors[id].name"
                  class="img-fluid shadow rounded-full"
                >
                <span
                  v-else
                  class="text-lg text-white font-bold"
                >
                {{  interlocutors[id].name[0] }}{{  interlocutors[id].surname[0] }}
              </span>
              </div>
            </div>
            <div class="w-10/12 text-sm">
              <div class="flex sm:flex-row flex-col sm:items-center justify-between">
                <span class="font-semibold truncate">{{ interlocutors[id].companyName || `${interlocutors[id].name} ${interlocutors[id].surname}` }}</span>
                <span v-if="moment(chat.message.createdAt).diff(moment(), 'days') === 1" class="text-xs text-gray-500">Вчера {{moment(chat.message.createdAt).format("HH:mm")}}</span>
                <span v-else-if="moment(chat.message.createdAt).diff(moment(), 'days') === 0" class="text-xs text-gray-500">Сегодня {{moment(chat.message.createdAt).format("HH:mm")}}</span>
                <span v-else class="text-xs text-gray-500">{{moment(chat.message.createdAt).format("DD.MM.YYYY HH:mm")}}</span>
              </div>
              <div class="text-xs text-gray-500 truncate">{{ chat.message.creator === String(user.id) ? 'Вы:' : `${ interlocutors[id].companyName ||  interlocutors[id].name}:` }} {{ chat.message.text }}</div>
            </div>
          </div>
        </div>
        <div v-else class="overflow-auto h-full">
          <div
            class="flex p-3 mb-4 rounded cursor-pointer animate-pulse"
          >
            <div class="w-2/12 relative">
              <div class="w-14 h-14 rounded-full bg-gray-300"></div>
            </div>
            <div class="w-10/12 text-sm">
              <div class="flex sm:flex-row flex-col sm:items-center justify-between mb-2">
                <div class="h-3 w-2/4 bg-gray-300 sm:mb-0 mb-2"></div>
                <div class="h-2.5 w-12 bg-gray-300"></div>
              </div>
              <div class="h-2.5 w-3/4 bg-gray-300"></div>
            </div>
          </div>
          <div
            class="flex p-3 mb-4 rounded cursor-pointer animate-pulse"
          >
            <div class="w-2/12 relative">
              <div class="w-14 h-14 rounded-full bg-gray-300"></div>
            </div>
            <div class="w-10/12 text-sm">
              <div class="flex sm:flex-row flex-col sm:items-center justify-between mb-2">
                <div class="h-3 w-2/4 bg-gray-300 sm:mb-0 mb-2"></div>
                <div class="h-2.5 w-12 bg-gray-300"></div>
              </div>
              <div class="h-2.5 w-3/4 bg-gray-300"></div>
            </div>
          </div>
          <div
            class="flex p-3 mb-4 rounded cursor-pointer animate-pulse"
          >
            <div class="w-2/12 relative">
              <div class="w-14 h-14 rounded-full bg-gray-300"></div>
            </div>
            <div class="w-10/12 text-sm">
              <div class="flex sm:flex-row flex-col sm:items-center justify-between mb-2">
                <div class="h-3 w-2/4 bg-gray-300 sm:mb-0 mb-2"></div>
                <div class="h-2.5 w-12 bg-gray-300"></div>
              </div>
              <div class="h-2.5 w-3/4 bg-gray-300"></div>
            </div>
          </div>
          <div
            class="flex p-3 mb-4 rounded cursor-pointer animate-pulse"
          >
            <div class="w-2/12 relative">
              <div class="w-14 h-14 rounded-full bg-gray-300"></div>
            </div>
            <div class="w-10/12 text-sm">
              <div class="flex sm:flex-row flex-col sm:items-center justify-between mb-2">
                <div class="h-3 w-2/4 bg-gray-300 sm:mb-0 mb-2"></div>
                <div class="h-2.5 w-12 bg-gray-300"></div>
              </div>
              <div class="h-2.5 w-3/4 bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="$route.query.cid || $device.isDesktop" class="lg:w-8/12 w-full h-full">
        <div v-if="!loadingChats && selectedChat.id" class="rounded md:shadow h-full flex flex-col">
          <div class="flex items-center border-b p-4">
            <div>
              <div class="md:w-14 w-12 md:h-14 h-12 shadow-md flex relative items-center justify-center rounded-full bg-green-400 overflow-hidden sm:mr-4 mr-2">
                <img
                  v-if="selectedChat.members.find(m => m.id !== String(user.id)).logoImg && selectedChat.members.find(m => m.id !== String(user.id)).companyName"
                  :src="selectedChat.members.find(m => m.id !== String(user.id)).logoImg"
                  :alt="selectedChat.members.find(m => m.id !== String(user.id)).companyName"
                  class="img-fluid shadow rounded-full"
                >
                <span
                  v-else-if="!selectedChat.members.find(m => m.id !== String(user.id)).logoImg && selectedChat.members.find(m => m.id !== String(user.id)).companyName"
                  class="text-lg text-white font-bold"
                >
                {{selectedChat.members.find(m => m.id !== String(user.id)).companyName[0] }}
              </span>
                <img
                  v-else-if="!selectedChat.members.find(m => m.id !== String(user.id)).companyName && selectedChat.members.find(m => m.id !== String(user.id)).profileImg"
                  :src="selectedChat.members.find(m => m.id !== String(user.id)).profileImg"
                  :alt="selectedChat.members.find(m => m.id !== String(user.id)).name"
                  class="img-fluid shadow rounded-full"
                >
                <span
                  v-else
                  class="text-lg text-white font-bold"
                >
                {{  selectedChat.members.find(m => m.id !== String(user.id)).name[0] }}{{  selectedChat.members.find(m => m.id !== String(user.id)).surname[0] }}
              </span>
              </div>
            </div>
            <div class="w-full font-semibold text-lg truncate">
              {{
                selectedChat.members.find(m => m.id !== String(user.id)).companyName
                || `${selectedChat.members.find(m => m.id !== String(user.id)).name} ${selectedChat.members.find(m => m.id !== String(user.id)).surname}`
              }}
            </div>
          </div>
          <VueScroll ref="chatFeed" class="flex flex-1 flex-col">
            <div
              v-for="(message, id) in selectedChat.messages"
              :key="`message-${selectedChat.id}-${id}`"
              class="md:py-4 py-3 px-4"
            >
              <div
                v-if="
                Object.keys(selectedChat.messages).findIndex(mId => mId === id) - 1 < 0
                ||  (
                  Object.keys(selectedChat.messages).findIndex(mId => mId === id) + 1 > selectedChat.messages.length
                  && moment(message.createdAt).diff(selectedChat.messages[Object.keys(selectedChat.messages)[Object.keys(selectedChat.messages).findIndex(mId => mId === id) + 1]].createdAt, 'days') > 0
                  )
                "
                class="flex justify-center mb-4 font-semibold text-gray-500"
              >{{moment(message.createdAt).format('DD.MM.YYYY')}}</div>
              <div class="flex">
                <div>
                  <div class="md:w-14 w-12 md:h-14 h-12 shadow-md flex relative items-center justify-center rounded-full bg-green-400 overflow-hidden mr-4">
                    <img
                      v-if="message.creator.logoImg && message.creator.companyName"
                      :src="message.creator.logoImg"
                      :alt="message.creator.companyName"
                      class="img-fluid shadow rounded-full"
                    >
                    <span
                      v-else-if="!message.creator.logoImg && message.creator.companyName"
                      class="text-lg text-white font-bold"
                    >
                    {{ message.creator.companyName[0] }}
                  </span>
                    <img
                      v-else-if="!message.creator.companyName && message.creator.profileImg"
                      :src="message.creator.profileImg"
                      :alt="message.creator.name"
                      class="img-fluid shadow rounded-full"
                    >
                    <span
                      v-else
                      class="text-lg text-white font-bold"
                    >
                    {{  message.creator.name[0] }}{{  message.creator.surname[0] }}
                  </span>
                  </div>
                </div>
                <div class="flex items-center w-full">
                  <div class="w-full pt-1">
                    <div class="flex items-center">
                      <div class="font-semibold mr-4">{{ message.creator.companyName || `${message.creator.name} ${message.creator.surname}` }}</div>
                      <span class="text-xs text-gray-500">{{moment(message.createdAt).format('HH:mm')}}</span>
                    </div>
                    <p class="whitespace-pre-wrap">{{ message.text }}</p>

                    <div v-if="typeof message.product === 'object'" class="flex lg:flex-row flex-col p-3 shadow rouunded mt-3">
                      <div class="lg:w-2/12  w-full lg:pr-4 lg:pb-0 pr-0 pb-4">
                        <NuxtLink
                          :to="`/category/${message.product.kind.slug}${message.product.subcategory ? `/${message.product.subcategory.slug}/` : '/'}${message.product.id}`"
                        >
                          <img :data-src="message.product.preview.imgSrc" :alt="message.product.name" class="img-fluid lazyload rounded">
                        </NuxtLink>
                      </div>
                      <div class="lg:w-10/12 w-full ">
                        <NuxtLink
                          :to="`/category/${message.product.kind.slug}${message.product.subcategory ? `/${message.product.subcategory.slug}/` : '/'}${message.product.id}`"
                          class="link text-lg font-semibold"
                        >
                          {{message.product.name}}
                        </NuxtLink>

                        <div v-if="!message.product.askPrice">
                          <span class="mr-2">Цена: </span><span class="text-red-500 font-bold text-lg">{{RUB(getPrice(message.product.price))}}</span>
                        </div>
                        <div v-else>
                          <span class="mr-2">Цена запросу</span>
                        </div>
                      </div>
                    </div>
                    <div v-if="typeof message.product === 'string'" class="flex p-3 shadow rounded mt-3">
                      <div class="w-2/12 pr-4 animate-pulse">
                        <div class="bg-gray-300 rounded w-full h-20"></div>
                      </div>
                      <div class="w-10/12 animate-pulse">
                        <div class="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>

                        <div class="h-4 bg-gray-300 rounded w-2/4"></div>
                      </div>
                    </div>
                  </div>
                  <div v-if="message.creator.id === String(user.id) && !message.checked">
                    <div class="w-4 h-4 rounded-full ml-2 bg-blue-400"></div>
                  </div>
                </div>
              </div>
            </div>
          </VueScroll>
          <ValidationObserver tag="form" @submit.prevent="sendMessage" v-slot="{invalid}" class="flex items-end p-3 border-t">
            <ValidationProvider name="message" rules="required" tag="div" class="w-full">
              <TextareaAutosize
                v-model="message"
                rows="1"
                @keyup.enter.exact.native="sendMessage"
                placeholder="Напишите сообщение..."
                class="forms-input w-full mr-2"
              />
            </ValidationProvider>
            <button type="submit" :disabled="invalid" class="mb-2">
              <svg version="1.0" :class="`w-8 h-8 ${!invalid ? 'transition hover:text-green-700 text-green-600 cursor-pointer' : 'text-gray-300'}`" xmlns="http://www.w3.org/2000/svg"
                   width="1280.000000pt" height="1280.000000pt" viewBox="0 0 1280.000000 1280.000000"
                   fill="currentColor">
                <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)">
                  <path d="M1758 11505 c-175 -43 -329 -168 -413 -335 -54 -108 -68 -176 -62
                    -315 l4 -120 467 -1628 c257 -895 476 -1651 487 -1679 49 -125 176 -261 301
                    -322 144 -70 32 -66 1688 -66 892 0 1532 -4 1587 -10 477 -50 733 -577 474
                    -972 -109 -167 -274 -267 -474 -288 -55 -6 -695 -10 -1587 -10 -1657 0 -1543
                    4 -1690 -67 -100 -48 -230 -177 -278 -277 -23 -46 -183 -589 -504 -1710 l-470
                    -1641 -5 -115 c-6 -136 9 -215 61 -318 85 -170 233 -290 413 -336 81 -21 245
                    -21 331 1 49 12 1265 615 4602 2284 4897 2448 4611 2300 4703 2427 84 114 127
                    246 127 392 0 179 -63 334 -185 456 l-73 73 -4569 2284 c-2974 1486 -4587
                    2287 -4621 2295 -71 16 -243 14 -314 -3z"/>
                </g>
              </svg>
            </button>
          </ValidationObserver>
        </div>
        <div v-if="loadingChats && $route.query.cid" class="animate-pulse rounded md:shadow h-full flex flex-col">
          <div class="flex items-center border-b p-4">
            <div>
              <div class="w-14 h-14 rounded-full bg-gray-300 mr-4"></div>
            </div>
            <div class="w-40 h-6 bg-gray-300"></div>
          </div>
          <div class="flex flex-1 flex-col">
            <div
              class="md:py-4 py-3 px-4"
            >
              <div class="flex">
                <div>
                  <div class="w-14 h-14 rounded-full bg-gray-300 mr-4"></div>
                </div>
                <div class="flex items-center w-full">
                  <div class="w-full pt-1">
                    <div class="flex items-center mb-2">
                      <div class="w-40 h-4 bg-gray-300 mr-4"></div>
                      <div class="w-12 h-2.5 bg-gray-300"></div>
                    </div>
                    <div class="w-2/3 h-4 bg-gray-300 mr-4"></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="md:py-4 py-3 px-4"
            >
              <div class="flex">
                <div>
                  <div class="w-14 h-14 rounded-full bg-gray-300 mr-4"></div>
                </div>
                <div class="flex items-center w-full">
                  <div class="w-full pt-1">
                    <div class="flex items-center mb-2">
                      <div class="w-40 h-4 bg-gray-300 mr-4"></div>
                      <div class="w-12 h-2.5 bg-gray-300"></div>
                    </div>
                    <div class="w-2/3 h-4 bg-gray-300 mr-4"></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="md:py-4 py-3 px-4"
            >
              <div class="flex">
                <div>
                  <div class="w-14 h-14 rounded-full bg-gray-300 mr-4"></div>
                </div>
                <div class="flex items-center w-full">
                  <div class="w-full pt-1">
                    <div class="flex items-center mb-2">
                      <div class="w-40 h-4 bg-gray-300 mr-4"></div>
                      <div class="w-12 h-2.5 bg-gray-300"></div>
                    </div>
                    <div class="w-2/3 h-4 bg-gray-300 mr-4"></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="md:py-4 py-3 px-4"
            >
              <div class="flex">
                <div>
                  <div class="w-14 h-14 rounded-full bg-gray-300 mr-4"></div>
                </div>
                <div class="flex items-center w-full">
                  <div class="w-full pt-1">
                    <div class="flex items-center mb-2">
                      <div class="w-40 h-4 bg-gray-300 mr-4"></div>
                      <div class="w-12 h-2.5 bg-gray-300"></div>
                    </div>
                    <div class="w-2/3 h-4 bg-gray-300 mr-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ValidationObserver v-slot="{invalid}" class="flex items-end p-3 border-t">
            <ValidationProvider name="message" rules="required" tag="div" class="w-full">
              <TextareaAutosize
                v-model="message"
                rows="1"
                placeholder="Напишите сообщение..."
                class="forms-input w-full mr-2"
              />
            </ValidationProvider>
            <button type="submit" :disabled="invalid" class="mb-2">
              <svg version="1.0" :class="`w-8 h-8 ${!invalid ? 'transition hover:text-green-700 text-green-600 cursor-pointer' : 'text-gray-300'}`" xmlns="http://www.w3.org/2000/svg"
                   width="1280.000000pt" height="1280.000000pt" viewBox="0 0 1280.000000 1280.000000"
                   fill="currentColor">
                <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)">
                  <path d="M1758 11505 c-175 -43 -329 -168 -413 -335 -54 -108 -68 -176 -62
                    -315 l4 -120 467 -1628 c257 -895 476 -1651 487 -1679 49 -125 176 -261 301
                    -322 144 -70 32 -66 1688 -66 892 0 1532 -4 1587 -10 477 -50 733 -577 474
                    -972 -109 -167 -274 -267 -474 -288 -55 -6 -695 -10 -1587 -10 -1657 0 -1543
                    4 -1690 -67 -100 -48 -230 -177 -278 -277 -23 -46 -183 -589 -504 -1710 l-470
                    -1641 -5 -115 c-6 -136 9 -215 61 -318 85 -170 233 -290 413 -336 81 -21 245
                    -21 331 1 49 12 1265 615 4602 2284 4897 2448 4611 2300 4703 2427 84 114 127
                    246 127 392 0 179 -63 334 -185 456 l-73 73 -4569 2284 c-2974 1486 -4587
                    2287 -4621 2295 -71 16 -243 14 -314 -3z"/>
                </g>
              </svg>
            </button>
          </ValidationObserver>
        </div>
        <div v-if="!$route.query.cid" class="rounded-lg md:shadow h-full flex flex-col">
          <div class="flex items-center border-b p-4 h-full">
            <div class="flex flex-col items-center m-auto text-gray-500">
              <svg class="w-14 h-14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.03 10c-8.48 0-14.97 5.92-14.97 12.8 0 2.47.82 4.79 2.25 6.74a1.5 1.5 0 01.3.9c0 1.63-.43 3.22-.96 4.67a41.9 41.9 0 01-1.17 2.8c3.31-.33 5.5-1.4 6.8-2.96a1.5 1.5 0 011.69-.43 17.06 17.06 0 006.06 1.1C30.5 35.61 37 29.68 37 22.8 37 15.93 30.5 10 22.03 10zM4.06 22.8C4.06 13.9 12.3 7 22.03 7 31.75 7 40 13.88 40 22.8c0 8.93-8.25 15.81-17.97 15.81-2.17 0-4.25-.33-6.17-.95-2.26 2.14-5.55 3.18-9.6 3.34a2.2 2.2 0 01-2.07-3.08l.42-.95c.43-.96.86-1.9 1.22-2.9.41-1.11.69-2.18.76-3.18a14.28 14.28 0 01-2.53-8.08z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M43.01 18.77a1.5 1.5 0 00.38 2.09c3.44 2.38 5.55 5.98 5.55 9.95 0 2.47-.81 4.78-2.25 6.73a1.5 1.5 0 00-.3.9c0 1.63.43 3.22.96 4.67.35.96.77 1.92 1.17 2.8-3.31-.33-5.5-1.4-6.8-2.96a1.5 1.5 0 00-1.69-.43 17.06 17.06 0 01-6.06 1.1c-2.98 0-5.75-.76-8.08-2.03a1.5 1.5 0 00-1.44 2.63 20.19 20.19 0 0015.7 1.44c2.25 2.14 5.54 3.18 9.59 3.34a2.2 2.2 0 002.07-3.08l-.42-.95c-.44-.96-.86-1.9-1.22-2.9a11.65 11.65 0 01-.76-3.18 14.28 14.28 0 002.53-8.08c0-5.1-2.72-9.56-6.84-12.42a1.5 1.5 0 00-2.09.38z" fill="currentColor"></path></svg>
              <div class="font-semibold text-lg">
                Выберете чат
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import {getFirebaseToken, getPrice, RUB, setFirebaseToken} from "~/utils";
import {mapState} from "vuex";
import {IUser} from "~/types";
import firebase from "firebase/app";
import "firebase/database";
import moment from "moment";
import DataSnapshot = firebase.database.DataSnapshot;

export default Vue.extend({
  name: "Chat",
  data: () => ({
    message: '',
    selectedChat: {
      messages: {}
    } as any,
    chats: {} as any,
    loadingChats: true,
  }),

  async mounted() {
    await setFirebaseToken(this.$api);
    await this.$fire.auth.signInWithCustomToken(getFirebaseToken());
    await this.getChats();
  },

  destroyed() {
    const chat = {...this.selectedChat}
    this.$fire.database.ref(`messages/${chat.id}`).off('value', (snapshot) => this.handleMessages(chat, snapshot));
    this.selectedChat = {}
  },

  watch: {
    selectedChat: function (chat) {
      if (chat.id && chat.message.creator !== String(this.user.id) && !chat.message.checked) {
        this.$fire.database.ref(`chats/${chat.id}/message`).update({
          checked: true
        });
      }

      this.getChatMessages(chat)
    },

    '$route.query.cid': function (cid) {
      if (!cid) {
        const chat = {...this.selectedChat}
        this.$fire.database.ref(`messages/${chat.id}`).off('value', (snapshot) => this.handleMessages(chat, snapshot));
        this.selectedChat = {}
      }
    }
  },

  methods: {
    moment,
    RUB,
    getPrice,

    async getChats() {
      this.loadingChats = true;
      // Get users chats
      const chatsId = Object.keys((await this.$fire.database.ref(`users/${this.user.id}`).get()).toJSON() || {});

      if (chatsId.length === 0) {
        this.loadingChats = false;

        return {};
      }

      let chatsQuery = this.$fire.database.ref('chats').orderByKey().on('value', async (snapshot) => {
        if (snapshot.val() === null) {
          return
        }


        const chats = Object.entries(snapshot.val())
          // @ts-ignore
          .sort(([,a],[,b]) => b.message.createdAt - a.message.createdAt)
          .filter((i: any) => chatsId.includes(i[0]))
          .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})


        // Get chat members
        const membersId: Array<string> = []

        await Promise.all(Object.keys(chats).map(async (chatId: string) => {
          // If we dont have a chat
          // then we fetch chat members
          // and push it to array
          if (!this.chats[chatId]) {
            const firebaseMembers = (await this.$fire.database.ref(`members/${chatId}`).get()).toJSON();

            // @ts-ignore
            chats[chatId].members = firebaseMembers;

            Object.keys(firebaseMembers as object).map( async (id) => {
              membersId.push(id)
            });
          }
        }))

        // If members array is not empty
        // We call api
        if (membersId.length) {
          const members = await this.$api.getUsers({
            query: {
              filter: {
                id: membersId
              }
            }
          });

          // and push users to chat members
          Object.keys(chats).map((chatId: string) => {
            // @ts-ignore
            chats[chatId].members = Object.keys(chats[chatId].members as object).map((id) =>  members.find(u => u.id == id));
          })
        }

        // Finally we do for loop and check
        // if chat already exists and is it have members
        Object.keys(chats).map((chatId: string) => {
          const newChat = {
            // @ts-ignore
            ...chats[chatId]
          };

          if(this.chats[chatId] && Array.isArray(this.chats[chatId].members)) {
            newChat.members = this.chats[chatId].members;
          }

          // @ts-ignore
          chats[chatId] = newChat;
        });

        this.chats = chats;

        Object.keys(this.chats).map((chatId: string) => {
          const user = this.chats[chatId].members
            .find((u: IUser) => u.id !== String(this.user.id));

          this.$fire.database.ref(`messages/${chatId}`)
            .orderByChild('checkedCreator')
            .equalTo(`false_${user.id}`)
            .on('value', (snapshot) => {
              if (snapshot.exists()) {
                this.chats[chatId].newMessagesCount = Object.keys(snapshot.val()).length
                return
              }

              this.chats[chatId].newMessagesCount = 0
            })
        });

        if (this.$route.query.cid && !this.selectedChat.id) {
          this.selectedChat = {
            id: this.$route.query.cid,
            messages: {...this.selectedChat.messages},
            ...this.chats[(this.$route.query.cid as string)]
          };
        }

        this.loadingChats = false;
      });
    },
    selectChat(id: string) {
      this.selectedChat = {
        id,
        messages: {...this.selectedChat.messages},
        ...this.chats[id]
      }
      this.$router.push({
        path: this.$route.path,
        query: {
          cid: id
        }
      })
    },
    getChatMessages(chat: any) {
      this.$fire.database.ref(`messages/${chat.id}`).on('value', (snapshot) => this.handleMessages(chat, snapshot));
    },
    async handleMessages(chat: any, snapshot: DataSnapshot) {
      if (this.selectedChat.id === chat.id) {
        const messages = snapshot.val();

        Object.keys(messages).map(messageId => {
          messages[messageId].creator = this.selectedChat.members.find((m: IUser) => m.id == messages[messageId].creator);

          if (!messages[messageId].checked && messages[messageId].creator.id !== String(this.user.id)) {
            this.$fire.database.ref(`messages/${chat.id}/${messageId}`).update({
              checked: true,
              checkedCreator: `true_${messages[messageId].creator.id}`
            });
          }
        })

        Object.keys(messages).map(messageId => {
          if (messages[messageId].product && this.selectedChat.messages[messageId]) {
            messages[messageId].product = this.selectedChat.messages[messageId].product
          }
        });

        this.selectedChat.messages = {...messages};

        Object.keys(messages).map(messageId => {
          if (messages[messageId].product && typeof this.selectedChat.messages[messageId].product === 'string') {
            this.$api.getProduct(messages[messageId].product, 'preview,kind,subcategory')
              .then(data => {
                messages[messageId].product = data;
                this.selectedChat.messages[messageId].product = data;
              });
          }
        });

        this.$nextTick(() => {
          if ((this.$refs as any).chatFeed) {
            (this.$refs as any).chatFeed.scrollTo(
              {
                y: "100%"
              },
              0
            );
          }
        })
      }
    },
    sendMessage() {
      this.$fire.database.ref(`messages/${this.selectedChat.id}`).push({
        checked: false,
        checkedCreator: `false_${String(this.user.id)}`,
        creator: String(this.user.id),
        text: this.message.trim(),
        createdAt:firebase.database.ServerValue.TIMESTAMP
      }).then(() => {
        this.$nextTick(() => (this.$refs as any).chatFeed.scrollTo(
          {
            y: "100%"
          },
          0
        ));
      });
      this.$fire.database.ref(`chats/${this.selectedChat.id}/message`).set({
        checked: false,
        creator: String(this.user.id),
        text: this.message.trim(),
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });

      this.message = '';
    }
  },

  computed: {
    ...mapState('auth', ['user'])
  }
})
</script>
