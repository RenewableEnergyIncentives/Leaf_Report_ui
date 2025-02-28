<script setup>
import { computed, ref } from 'vue'
import BaseFooter from './BaseFooter.vue'
import BaseHeader from './BaseHeader.vue'
import { storeToRefs } from 'pinia'
import { useReportStore } from '@/stores/report'
import SecondSectionSeasonal from './SecondSectionSeasonal.vue'
import { roundToTwo } from '@/utils'
import BaseDropdown from './BaseDropdown.vue'

const selectedCategory = ref('Primary Cooling AC')

const showEstimateTable = ref(false)
const {
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

const selectedCategoryData = computed(() => {
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
    Windows: get_windows.value,
    Doors: get_doors.value,
    'Water Heater': get_water_heater.value,
  }
  // Ensure selected category is valid
  if (!savingsMap[selectedCategory.value]) {
    return null
  }
  return savingsMap[selectedCategory.value]
})
const rebateList = computed(() => {
  let rebates = Object.entries(selectedCategoryData.value?.rebates).map(([, rebate], index) => ({
    type:
      typeof rebate[`reb_${index + 1}_type_of_reabtes_or_incentive`] === 'string'
        ? rebate[`reb_${index + 1}_type_of_reabtes_or_incentive`]
        : 'N/A',

    agency:
      typeof rebate[`reb_${index + 1}_agency_provided`] === 'string'
        ? rebate[`reb_${index + 1}_agency_provided`]
        : index === 0
          ? 'State'
          : index == '1'
            ? 'Federal'
            : 'Local',

    description:
      typeof rebate[`reb_${index + 1}_description`] === 'string'
        ? rebate[`reb_${index + 1}_description`]
        : 'N/A',

    total: rebate[`reb_${index + 1}_total_$`] ? rebate[`reb_${index + 1}_total_$`] : 0,
  }))
  return rebates
})
</script>
<template>
  <!-- <pre>{{selectedCategoryDa}}</pre> -->
  <section id="page-2" class="bg-white rounded-lg shadow-lg p-6">
    <!-- header  -->
    <BaseHeader />
    <!-- Main Grid Layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3 md:mt-0">
      <!-- Left Column -->
      <div class="order-2 md:order-1">
        <SecondSectionSeasonal
          v-model:winter="selectedCategoryData.winter"
          v-model:summer="selectedCategoryData.summer"
          v-model:annual="selectedCategoryData.annual"
          v-model:code="selectedCategoryData.system_upgraded_key_points.code_number"
          v-model:discount="selectedCategoryData.system_upgraded_key_points['%_of_service_amount']"
        />
      </div>
      <!-- Right Column -->
      <div class="space-y-6 order-1 md:order-2">
        <div class="p-6 border rounded-lg shadow-md">
          <BaseDropdown v-model:selectedCategory="selectedCategory" />
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="space-y-4">
              <div class="border p-4 rounded-lg">
                <p class="text-gray-700 text-sm">
                  {{
                    selectedCategoryData.info.current_systems_name
                      ? selectedCategoryData.info.current_systems_name
                      : 'N/A'
                  }}
                </p>
                <p class="font-semibold text-green-600 capitalize">
                  {{
                    selectedCategoryData.info["upgraded_system's_name"]
                      ? selectedCategoryData.info["upgraded_system's_name"]
                      : 'N/A'
                  }}
                </p>
              </div>
              <div class="border p-4 rounded-lg">
                <p class="text-gray-700 text-sm">
                  {{
                    selectedCategoryData.info.current_utiltiy_type_name
                      ? selectedCategoryData.info.current_utiltiy_type_name
                      : 'N/A'
                  }}
                </p>
                <p class="font-semibold text-green-600">
                  {{
                    selectedCategoryData.info.utility_type_of_system
                      ? selectedCategoryData.info.utility_type_of_system
                      : 'N/A'
                  }}
                </p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <img
                :alt="selectedCategoryData.info.current_systems_name"
                class="md:w-[190px] h-auto md:h-[230px] rounded-lg shadow"
                :src="
                  selectedCategoryData.info.photo_of_upgrade_system
                    ? selectedCategoryData.info.photo_of_upgrade_system
                    : '/system.png'
                "
              />
            </div>
          </div>

          <div class="border p-4 rounded-lg flex justify-between items-center">
            <p class="text-gray-700 font-medium text-lg">Est. Net Install (After Incentives):</p>
            <p class="font-bold text-green-600 text-2xl">
              ${{
                roundToTwo(selectedCategoryData.system_upgraded_key_points.cost_after_incentives)
              }}
            </p>
          </div>
        </div>
        <div class="p-6 border rounded-lg shadow-md lg:hidden flex flex-col gap-4">
          <div
            v-for="(rebate, index) in rebateList"
            :key="index"
            class="p-3 border rounded-lg shadow-md"
          >
            <div class="flex">
              <p class="min-w-[115px]">TYPE</p>
              {{ rebate.type }}
            </div>
            <div class="flex">
              <p class="min-w-[115px]">AGENCY</p>
              {{ rebate.agency }}
            </div>
            <div class="flex">
              <p class="min-w-[115px]">DESCRIPTION</p>
              {{ rebate.description }}
            </div>
            <div class="flex">
              <p class="min-w-[115px]">TOTAL</p>
              ${{ roundToTwo(rebate.total) }}
            </div>
          </div>
        </div>
        <div class="p-6 border rounded-lg shadow-md lg:block hidden">
          <table class="w-full text-left text-lg">
            <thead class="text-gray-700 bg-gray-200">
              <tr>
                <th class="p-2">TYPE</th>
                <th class="p-2">AGENCY</th>
                <th class="p-2">DESCRIPTION</th>
                <th class="p-2">TOTAL</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr v-for="(rebate, index) in rebateList" :key="index" class="w-full border-b">
                <td class="p-2">{{ rebate.type }}</td>
                <td class="p-2">{{ rebate.agency }}</td>
                <td class="p-2">{{ rebate.description }}</td>
                <td class="p-2">${{ roundToTwo(rebate.total) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="p-6 border rounded-lg shadow-md">
          <div class="border p-4 rounded-lg">
            <div class="w-full text-center flex justify-center items-center space-x-2">
              <p class="font-bold text-green-600 text-2xl">
                ${{
                  roundToTwo(
                    selectedCategoryData.system_upgraded_key_points.monthly_payment_if_installed,
                  )
                }}
              </p>
              <p class="text-gray-700 font-medium text-lg">/48mo with financing</p>
            </div>

            <button
              id="toggleTableButton"
              class="w-full mt-4 text-lg font-semibold text-blue-600 cursor-pointer hover:text-blue-800 flex justify-center items-center transition-all duration-300"
              @click="showEstimateTable = !showEstimateTable"
            >
              Get your estimate
              <i class="fas fa-chevron-down ml-2"></i>
            </button>
          </div>
        </div>

        <div class="p-4 rounded shadow-lg" v-if="showEstimateTable">
          <div id="estimateTable" class="mt-4">
            <div class="flex gap-2">
              <div class="border p-4 rounded-lg mb-4 w-1/2">
                <p class="text-gray-700 font-medium text-lg">Est. Gross Install Cost</p>
                <p class="font-bold text-green-600 text-2xl">
                  ${{
                    roundToTwo(
                      selectedCategoryData.system_upgraded_key_points.average_cost_to_install,
                    )
                  }}
                </p>
              </div>
              <div class="border p-4 rounded-lg mb-4 w-1/2">
                <p class="text-gray-700 font-medium text-lg">Est. Net Install</p>
                <p class="font-bold text-green-600 text-2xl">
                  ${{
                    roundToTwo(
                      selectedCategoryData.system_upgraded_key_points.cost_after_incentives,
                    )
                  }}
                </p>
              </div>
            </div>
            <div class="border p-4 rounded-lg flex justify-between items-center mb-4">
              <p class="text-gray-700 font-medium text-lg">Yearly Savings with Upgrade</p>
              <p class="font-bold text-green-600 text-2xl">
                ${{ roundToTwo(selectedCategoryData.system_upgraded_key_points.yearly_savings) }}/yr
              </p>
            </div>
            <div class="border p-4 rounded-lg flex justify-between items-center mb-4">
              <p class="text-gray-700 font-medium text-lg">Est. Total Available Incentives</p>
              <p class="font-bold text-green-600 text-2xl">
                ${{
                  roundToTwo(
                    selectedCategoryData.system_upgraded_key_points[
                      'total_federal/state/local_incentives'
                    ],
                  )
                }}/total
              </p>
            </div>
            <div class="border p-4 rounded-lg flex justify-between items-center">
              <p class="text-gray-700 font-medium text-lg">ROI After Upgrade</p>
              <p class="font-bold text-green-600 text-2xl">
                {{
                  roundToTwo(
                    selectedCategoryData.system_upgraded_key_points['return_on_investement_(roi)'] *
                      100,
                  )
                }}/%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BaseFooter />
  </section>
</template>
