<script setup>
import { ref } from 'vue'
import { dropdownOptions } from '@/data'
import IconDropdown from './icons/IconDropdown.vue'
const selectedCategory = defineModel('selectedCategory', { type: String, required: true })
const showDropdown = ref(false)
</script>

<template>
  <div
    @click="showDropdown = !showDropdown"
    class="mb-6 md:max-w-72 max-w-96 w-full relative flex justify-between items-center cursor-pointer bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-lg shadow-md hover:bg-gray-200 focus:outline-none"
  >
    <span>{{ selectedCategory }}</span>
    <IconDropdown />
    <div
      v-if="showDropdown"
      class="absolute z-20 top-14 shadow-md bg-white max-h-[200px] overflow-y-auto w-full left-0 rounded-lg py-2 px-4 flex flex-col gap-3"
    >
      <p
        v-for="(item, index) in dropdownOptions.flat()"
        :key="index"
        :value="item"
        @click="selectedCategory = item"
        :class="selectedCategory === item ? 'text-green-600' : 'text-gray-700'"
      >
        {{ item }}
      </p>
    </div>
  </div>
</template>
