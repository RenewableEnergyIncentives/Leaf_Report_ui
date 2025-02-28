<script setup>
import { computed, ref } from 'vue'
import { roundToTwo } from '@/utils'
import EfficiencyGraphs from './EfficiencyGraphs.vue'
import CostGraph from './CostGraph.vue'
import CarbonFootprintGraph from './CarbonFootprintGraph.vue'

const seasonTabs = ['Summer', 'Annual', 'Winter']
const selectedSeason = ref(seasonTabs[1])
const summer = defineModel('summer')
const winter = defineModel('winter')
const annual = defineModel('annual')
const code = defineModel('code')
const discount = defineModel('discount')

const data = computed(() => {
  if (selectedSeason.value === 'Summer') {
    return summer.value
  } else if (selectedSeason.value === 'Winter') {
    return winter.value
  } else {
    return annual.value
  }
})
const is_yearly = computed(() => {
  return selectedSeason.value == 'Annual'
})
</script>
<template>
  <div class="lg:space-y-6 md:space-y-4 space-y-2">
    <!-- Comparison Section -->
    <div
      id="comparison-tabs"
      class="lg:mt-10 md:mt-6 mt-3 flex justify-center items-center space-x-8 border-b pb-4"
    >
      <h3
        v-for="(item, index) in seasonTabs"
        :key="index"
        @click="selectedSeason = item"
        class="tab-item text-lg font-semibold cursor-pointer hover:text-green-600"
        :class="[
          selectedSeason === item
            ? 'border-b-4 border-green-600 pb-2 text-green-600'
            : 'text-gray-800',
        ]"
      >
        {{ item }}
      </h3>
    </div>
    <!-- Labels for Current vs Upgraded -->
    <div class="flex justify-center items-center space-x-4 mt-4">
      <div class="flex items-center space-x-2">
        <div class="w-4 h-4 bg-black rounded-full"></div>
        <p class="text-gray-700 text-sm">Current</p>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-4 h-4 bg-green-600 rounded-full"></div>
        <p class="text-gray-700 text-sm">Upgraded</p>
      </div>
    </div>

    <!-- cost & bill  -->
    <div class="mt-5">
      <CostGraph
        title="Cost"
        :current="roundToTwo(data['current:_cost_per_system'])"
        :upgraded="roundToTwo(data['upgraded:_cost_per_system'])"
        :delta="roundToTwo(data['delta:savings_per_system'])"
        unit="$"
        :selectedSeason="selectedSeason"
      />
    </div>

    <!-- Carbon Footprint -->
    <div class="mt-5">
      <CarbonFootprintGraph
        title="Carbon Footprint"
        :current="roundToTwo(data['current:_carbon_footprint_(system)'])"
        :upgraded="roundToTwo(data['upgraded:_carbon_footprint_(system)'])"
        :delta="roundToTwo(data['delta:_carbon_footprint_savings'])"
        :unit="is_yearly ? 'Co2 lbs. /yr' : 'Co2 lbs. /mo'"
        :selectedSeason="selectedSeason"
      />
    </div>

    <!--Energy Efficiency -->
    <EfficiencyGraphs
      title="Efficiency"
      :current="roundToTwo(data['current:_energy_efficiency_%'] * 100)"
      :upgraded="roundToTwo(data['upgraded_:_energy_efficiency_%'] * 100)"
      :delta="roundToTwo(data['delta:_energy_efficiency_%'] * 100)"
      :unit="is_yearly ? '%/yr' : '%/mo'"
      :selectedSeason="selectedSeason"
    />

    <div class="max-w-sm mx-auto p-8 bg-white shadow-xl mt-12 rounded-lg border border-gray-300">
      <a href="https://renewableenergyincentives.com/" target="_blank" rel="noopener noreferrer">
        <!-- Discount Message -->
        <div class="text-center">
          <p class="text-2xl font-bold text-green-700">
            {{ Math.round(discount * 100) }}% OFF Service
          </p>
          <p class="text-2xl text-gray-800 mt-2">
            Use Code:
            <span class="font-bold text-gray-900">{{ code }}</span>
          </p>
        </div>

        <!-- Divider -->
        <div class="my-6 border-t border-gray-400"></div>

        <!-- Call to Action -->
        <div class="text-center">
          <button
            class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-lg rounded-full transition duration-300 ease-in-out shadow-md"
          >
            FREE ESTIMATE
          </button>
        </div>
      </a>
    </div>
  </div>
</template>
