<script setup>
import { storeToRefs } from 'pinia'
import { useReportStore } from '@/stores/report'
import { computed } from 'vue'
import { roundToTwo } from '@/utils'
const props = defineProps(['selectedSeason'])
const selectedCategories = defineModel('selectedCategories') // Now an array of strings
const {
  get55_59,
  get61_65,
  get67_71,
  get_primary_cooling_ac,
  get_secondary_cooling_ac,
  get_primary_heating_source,
  get_secondary_heating_source,
  get_range_stoves,
  get_cloths_dryer,
  get_wall_insulation,
  get_ceiling_insulation,
  get_floor_insulation,
  get_windows,
  get_water_heater,
  get_doors,
} = storeToRefs(useReportStore())

function normalizeData(obj) {
  const data = obj.value
  return Object.keys(data).reduce((acc, key) => {
    const normalizedKey = key.replace(/^(annual_|summer_|winter_)/, '') // Remove prefix
    acc[normalizedKey] = data[key] // Keep the value
    return acc
  }, {})
}
const isSeasonal = computed(() =>
  props.selectedSeason === 'Summer' || props.selectedSeason === 'Winter' ? true : false,
)
const normalizedData = computed(() => {
  return props.selectedSeason === 'Summer'
    ? normalizeData(get61_65)
    : props.selectedSeason === 'Annual'
      ? normalizeData(get55_59)
      : normalizeData(get67_71)
})

const getCategoryData = (category) => {
  const savingsMap = {
    'Primary Cooling AC': get_primary_cooling_ac.value,
    'Secondary Cooling AC': get_secondary_cooling_ac.value,
    'Primary Heating': get_primary_heating_source.value,
    'Secondary Heating': get_secondary_heating_source.value,
    'Range/Stove': get_range_stoves.value,
    'Cloths Dryer': get_cloths_dryer.value,
    'Wall Insulation': get_wall_insulation.value,
    'Ceiling Insulation': get_ceiling_insulation.value,
    'Floor Insulation': get_floor_insulation.value,
    Window: get_windows.value,
    'Water Heater': get_water_heater.value,
    Doors: get_doors.value,
  }

  // Ensure category is valid
  return savingsMap[category] || null
}

const getSeasonData = (category) => {
  // Get the selected category's savings data
  const selectedData = getCategoryData(category)

  // Ensure selected season exists and has the required property
  const season = props.selectedSeason.toLowerCase()
  if (!selectedData || !selectedData[season]) {
    return 0
  }
  return selectedData[season]
}

const total_carbon_footprint = computed(() => {
  let carbonSavings = selectedCategories.value.reduce((total, category) => {
    const seasonData = getSeasonData(category)
    let carbonSavings = seasonData['delta:_carbon_footprint_savings']
    if (carbonSavings === undefined || typeof carbonSavings !== 'number') {
      carbonSavings = 0
    }
    return total + carbonSavings
  }, 0)

  const normalizedValue = normalizedData.value?.carbon_footprint || 0
  return normalizedValue - carbonSavings
})

const estimated_total_utility_bill_combined = computed(() => {
  let utilityBillSavings = selectedCategories.value.reduce((total, category) => {
    const seasonData = getSeasonData(category)
    let utilityBillSavings = seasonData['delta:savings_per_system']
    if (utilityBillSavings === undefined || typeof utilityBillSavings !== 'number') {
      utilityBillSavings = 0
    }
    return total + utilityBillSavings
  }, 0)

  const normalizedValue = normalizedData.value?.utility_bill_combined || 0
  return normalizedValue - utilityBillSavings
})

const total_current_energy_usage = computed(() => {
  let energyUsage = selectedCategories.value.reduce((total, category) => {
    const seasonData = getSeasonData(category)
    let energyUsage = seasonData['delta:_energy_units']
    if (energyUsage === undefined || typeof energyUsage !== 'number') {
      energyUsage = 0
    }
    return total + energyUsage
  }, 0)

  const normalizedValue = normalizedData.value?.energy_usage || 0
  return normalizedValue - energyUsage
})

const total_energy_waste = computed(() => {
  let energyWaste = selectedCategories.value.reduce((total, category) => {
    const seasonData = getSeasonData(category)
    let energyWaste = seasonData['systems_waste_%_value']
    if (energyWaste === undefined || typeof energyWaste !== 'number') {
      energyWaste = 0
    }
    return total + energyWaste
  }, 0)

  let waste =
    normalizedData.value['energy_waste_%_/_year'] ||
    normalizedData.value['energy_waste_%_/_mo'] ||
    0
  return waste - energyWaste
})

const total__energy_unit_waste = computed(() => {
  let energyUnitWaste = selectedCategories.value.reduce((total, category) => {
    const seasonData = getSeasonData(category)
    let energyUnitWaste = seasonData['systems_waste_units_value']
    if (energyUnitWaste === undefined || typeof energyUnitWaste !== 'number') {
      energyUnitWaste = 0
    }
    return total + energyUnitWaste
  }, 0)

  const normalizedValue = normalizedData.value?.energy_waste || 0
  return normalizedValue - energyUnitWaste
})
const _home_value_increase = computed(() => {
  const home_value = selectedCategories.value.reduce((total, category) => {
    const data = getCategoryData(category)
    return total + (data?.system_upgraded_key_points['system_specfic_increase_home_%_value'] || 0)
  }, 0)
  return home_value * 100
})
</script>

<template>
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
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:gap-10 md:gap-6 gap-3 gap-x-12 mt-6"
  >
    <div
      class="border p-4 rounded-lg flex flex-col lg:text-2xl text-xl md:flex-row justify-between items-center lg:px-10 md:px-6 px-3"
    >
      <div class="font-medium md:w-[187px]">
        <p class="text-gray-700">Carbon Footprint</p>
        <p class="md:ml-auto md:mr-0 mx-auto w-fit text-gray-500">
          lbs CO2/ {{ isSeasonal ? 'mo' : 'yr' }}
        </p>
      </div>
      <div class="basis-3/10 text-center">
        <p class="text-gray-600">
          {{ roundToTwo(normalizedData.carbon_footprint) }}
        </p>
        <p class="text-green-600 font-semibold">
          {{ roundToTwo(total_carbon_footprint) }}
        </p>
      </div>
      <div>
        <p class="text-green-700 font-semibold text-3xl">
          {{ roundToTwo(normalizedData.carbon_footprint - total_carbon_footprint) }}
        </p>
      </div>
    </div>
    <!-- Utility Bill -->
    <div
      class="border p-4 rounded-lg flex flex-col lg:text-2xl text-xl md:flex-row justify-between items-center lg:px-10 md:px-6 px-3"
    >
      <p class="text-gray-700 font-medium text-2xl md:w-[187px]">
        Utility Bill <span class="text-gray-500">/ {{ isSeasonal ? 'mo' : 'yr' }}</span>
      </p>
      <div class="basis-1/5">
        <p class="text-gray-600">${{ roundToTwo(normalizedData?.utility_bill_combined) }}</p>
        <p class="text-green-600 font-semibold">
          ${{ roundToTwo(estimated_total_utility_bill_combined) }}
        </p>
      </div>
      <p class="text-green-700 font-semibold text-3xl">
        ${{
          roundToTwo(normalizedData?.utility_bill_combined - estimated_total_utility_bill_combined)
        }}
      </p>
    </div>

    <!-- Energy Usage -->
    <div
      class="border p-4 rounded-lg flex flex-col lg:text-2xl text-xl md:flex-row justify-between items-center lg:px-10 md:px-6 px-3"
    >
      <div class="font-medium md:w-[187px]">
        <div class="md:w-[150px]">
          <p class="text-gray-700">Energy Usage</p>
          <p class="text-gray-500 md:ml-auto md:mr-0 mx-auto w-fit">
            Kwhr /{{ isSeasonal ? 'mo' : 'yr' }}
          </p>
        </div>
      </div>
      <div class="text-center">
        <p class="text-gray-600">
          {{ roundToTwo(normalizedData?.energy_usage) }}
        </p>
        <p class="text-green-600 font-semibold">
          {{ roundToTwo(total_current_energy_usage) }}
        </p>
      </div>
      <p class="text-green-700 font-semibold text-3xl">
        {{ roundToTwo(normalizedData?.energy_usage - total_current_energy_usage) }}
      </p>
    </div>

    <!-- Waste % -->
    <div
      class="border p-4 rounded-lg flex flex-col lg:text-2xl text-xl md:flex-row justify-between items-center lg:px-10 md:px-6 px-3"
    >
      <p class="text-gray-700 font-medium md:min-w-[187px]">
        Waste % <span class="text-gray-500">/{{ isSeasonal ? 'mo' : 'yr' }}</span>
      </p>
      <div class="basis-1/5 pl-4">
        <p class="text-gray-600">
          {{
            normalizedData['energy_waste_%_/_year']
              ? roundToTwo(normalizedData['energy_waste_%_/_year'] * 100)
              : roundToTwo(normalizedData['energy_waste_%_/_mo'] * 100)
          }}%
        </p>
        <p class="text-green-600 font-semibold">{{ roundToTwo(total_energy_waste * 100) }}%</p>
      </div>
      <p class="text-green-700 font-semibold text-3xl">
        {{
          normalizedData['energy_waste_%_/_year']
            ? roundToTwo(normalizedData['energy_waste_%_/_year'] * 100 - total_energy_waste * 100)
            : roundToTwo(normalizedData['energy_waste_%_/_mo'] * 100 - total_energy_waste * 100)
        }}
        %
      </p>
    </div>

    <!-- Unit Waste -->
    <div
      class="border p-4 rounded-lg flex flex-col lg:text-2xl text-xl md:flex-row justify-between items-center lg:px-10 md:px-6 px-3"
    >
      <div class="font-medium md:w-[187px]">
        <div class="md:w-[120px]">
          <p class="text-gray-700">Unit Waste</p>
          <p class="text-gray-500 md:ml-auto md:mr-0 mx-auto w-fit">
            Kwhr /{{ isSeasonal ? 'mo' : 'yr' }}
          </p>
        </div>
      </div>
      <div class="text-center">
        <p class="text-gray-600">
          {{ roundToTwo(normalizedData?.energy_waste) }}
        </p>
        <p class="text-green-600 font-semibold">
          {{ roundToTwo(total__energy_unit_waste) }}
        </p>
      </div>
      <p class="text-green-700 font-semibold text-3xl">
        {{ roundToTwo(normalizedData?.energy_waste - total__energy_unit_waste) }}
      </p>
    </div>

    <!-- Estimated Home Value -->
    <div
      class="border p-4 rounded-lg flex flex-col lg:text-2xl text-xl md:flex-row justify-between items-center lg:px-10 md:px-6 px-3"
    >
      <p class="text-gray-700 font-medium text-2xl">Est. Home Value</p>
      <p class="text-green-700 text-2xl font-bold">+ {{ roundToTwo(_home_value_increase) }}%</p>
    </div>
  </div>
</template>
