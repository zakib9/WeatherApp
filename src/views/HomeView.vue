<script setup>
import { computed, inject, ref } from 'vue';

const store = inject("store")
const searchQuery = ref("")
const currentWeather = computed(() => {
  return store.state.currentWeather
})
let finalLocation = computed(() => {
  return store.state.finalLocation
})
const currentLocation = computed(() => {
  return store.state.currentLocation
})
function getSearchResults(){
  if (searchQuery.value != '') {
    store.state.actions.setLocation(searchQuery.value)
    
    }
}
function searchWeather(name){
  searchQuery.value = null
  store.state.actions.setWeather(name)
  setInterval(() => {
    store.state.actions.setWeather(name)
  }, 10000)
}
</script>

<template>
   <div class=" w-4/6 h-min px-8 py-2 flex gap-6 rounded-md shadow-lg items-center overflow-hidden my-10 mx-auto">
      <i class="fa-solid fa-magnifying-glass fa-xl" style="color: #919191;"></i>
      <input
      type="text"
       v-model="searchQuery"
       @input="getSearchResults"
      placeholder="Location..."
      class=" placeholder:text-lg bg-transparent p-4 focus:outline-none w-full">
    </div>
    <ul v-if="!finalLocation" class=" w-4/6  flex flex-col rounded-md shadow-lg mx-auto ">
      <li v-for="name in currentLocation.data" :key="name.id" class=" py-2 px-8 hover:bg-slate-200" @click="searchWeather(name.name)">
      {{name.name}}
    </li>
    </ul>

    <div class="flex flex-col gap-4 mt-40 min-w-full  items-center">
      <h1 class="text-4xl font-bold ">{{ finalLocation }}</h1>
      <p v-if="currentWeather" class="text-6xl font-thin">{{ Math.round(currentWeather.data.current.temp_c)  }} °C</p>
      <img v-if="currentWeather" :src="currentWeather.data.current.condition.icon" alt="">
      <p v-if="currentWeather" class="text-6xl font-thin">{{ currentWeather.data.current.condition.text }}</p>
    </div>
    
</template>
