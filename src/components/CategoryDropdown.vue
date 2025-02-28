<script setup>
import { onMounted, ref, watch } from 'vue'
import IconDropdown from './icons/IconDropdown.vue'
import { dropdownOptions } from '@/data'

// Selected items in each dropdown
const selectedInDropdowns = ref(dropdownOptions.map(() => []))
const headers = ['Heating & Cooling', 'Appliances', 'Insulation', 'Windows & Doors', 'Water Heater']
const isOpen = ref(Array(dropdownOptions.length).fill(false))

// Selected items
const selectedItems = ref([])
const selectedCategories = defineModel('selectedCategories', {
  required: true,
  type: Array,
  default: () => [],
})

// Toggle item selection
const toggleSelection = (dropdownIndex, item) => {
  const dropdown = selectedInDropdowns.value[dropdownIndex]
  const itemIndex = dropdown.indexOf(item)
  if (itemIndex > -1) {
    dropdown.splice(itemIndex, 1)
  } else {
    dropdown.push(item)
  }
  updateSelectedItems()
  emitUpdatedItems()
}

// Update selected items
const updateSelectedItems = () => {
  selectedItems.value = selectedInDropdowns.value.flatMap((items) => items)
}

// Pre-select items
const preSelectItems = (items) => {
  selectedInDropdowns.value = dropdownOptions.map(() => [])
  items.forEach((item) => {
    for (let i = 0; i < dropdownOptions.length; i++) {
      if (dropdownOptions[i].includes(item)) {
        selectedInDropdowns.value[i].push(item)
      }
    }
  })
  updateSelectedItems()
}

// Emit updated selected items to parent
const emitUpdatedItems = () => {
  selectedCategories.value = selectedItems.value
}

onMounted(() => {
  preSelectItems(selectedCategories.value)
})

watch(
  () => selectedCategories.value,
  (newItems) => {
    preSelectItems(newItems)
  },
)

const closeOthers = (index) => {
  isOpen.value = isOpen.value.map((_, i) => (i === index ? !isOpen.value[index] : false))
}
function hasSelectedSomething(arr1, arr2) {
  return arr1.some((item) => arr2.includes(item))
}
function countSelectedItems(arr1, arr2) {
  return arr1.filter((item) => arr2.includes(item)).length
}
</script>

<template>
  <div class="flex gap-3 flex-wrap">
    <div
      v-for="(options, index) in dropdownOptions"
      :key="index"
      class="w-[150px] lg:w-[210px] md:w-[200px] mx-auto"
    >
      <div class="w-full font-medium rounded-lg shadow-md hover:bg-gray-200 focus:outline-none">
        <div class="relative text-xs lg:text-base">
          <p
            class="flex items-center px-2 py-3 cursor-pointer justify-between w-full"
            @click="closeOthers(index)"
            :class="
              hasSelectedSomething(options, selectedCategories)
                ? 'bg-green-100 text-black'
                : 'text-gray-700 bg-gray-100'
            "
          >
            <span>
              <span>{{ headers[index] }}</span>
              <span class="text-gray-700" v-if="countSelectedItems(options, selectedCategories)">
                ({{ countSelectedItems(options, selectedCategories) }})
              </span>
            </span>
            <IconDropdown />
          </p>
          <div
            v-if="isOpen[index]"
            class="absolute top-[52px] left-0 z-10 bg-white w-full shadow-lg rounded-lg p-2 px-3"
          >
            <div v-for="item in options" :key="item" class="py-1">
              <label class="cursor-pointer">
                <input
                  type="checkbox"
                  :checked="selectedCategories.includes(item)"
                  @click="toggleSelection(index, item)"
                />
                <span
                  class="pl-1 text-sm"
                  :class="selectedCategories.includes(item) ? 'text-green-600' : ''"
                >
                  {{ item }}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
