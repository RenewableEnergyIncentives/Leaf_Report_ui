<script setup>
import { computed } from 'vue'

const props = defineProps(['title', 'current', 'upgraded', 'delta', 'unit'])

// Function to clean and convert string numbers to float
const parseNumber = (value) => parseFloat(String(value).replace(/,/g, '')) || 0

// Ensure values are numbers
const currentValue = computed(() => parseNumber(props.current))
const upgradedValue = computed(() => parseNumber(props.upgraded))

// Determine which value is greater
const greaterValue = computed(() => Math.max(currentValue.value, upgradedValue.value))
const lowerValue = computed(() => Math.min(currentValue.value, upgradedValue.value))

// Calculate the percentage for the lower value
const lowerPercentage = computed(() =>
  greaterValue.value === 0 ? 0 : (lowerValue.value / greaterValue.value) * 100,
)

// Assign values dynamically, ensuring both are 0 if both inputs are 0
const barValues = computed(() => ({
  first:
    greaterValue.value === 0
      ? 0
      : currentValue.value >= upgradedValue.value
        ? 100
        : lowerPercentage.value.toFixed(2),
  second:
    greaterValue.value === 0
      ? 0
      : upgradedValue.value >= currentValue.value
        ? 100
        : lowerPercentage.value.toFixed(2),
}))
</script>

<template>
  <div class="flex items-center">
    <div class="basis-5/5 flex flex-col">
      <div class="text-base md:text-lg font-bold md:ml-40 text-center md:text-left">
        {{ title }}
      </div>
      <div
        class="h-8 bg-gray-200 border border-black"
        :style="{ width: `${barValues.first == 0 ? 1 : barValues.first}%` }"
      >
        <p class="text-right text-sm pr-3 pt-1">${{ current }}</p>
      </div>
      <div
        class="h-8 bg-green-500 border border-black"
        :style="{ width: `${barValues.second == 0 ? 1 : barValues.second}%` }"
      >
        <p class="text-right text-sm pr-3 pt-1">${{ upgraded }}</p>
      </div>
    </div>
    <div class="text-green-600 basis-2/5 font-bold text-xl lg:text-2xl ms-6 text-right mr-10">
      {{ unit }}{{ delta }}
    </div>
  </div>
</template>
