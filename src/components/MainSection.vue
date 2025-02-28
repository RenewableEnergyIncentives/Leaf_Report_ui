<script setup>
import { storeToRefs } from 'pinia'
import { useReportStore } from '@/stores/report'
import BaseHeader from './BaseHeader.vue'
import BaseFooter from './BaseFooter.vue'
import { getTrueKeys, formatNumber } from '@/utils'
import { ref } from 'vue'
import SeasonComponent from './SeasonComponent.vue'
import CategoryDropdown from './CategoryDropdown.vue'

const { get3_12, get19_29, get31_41, get43_53 } = storeToRefs(useReportStore())

const selectedCategories = ref(getTrueKeys(get31_41.value, 'rec_'))
const showCheapestUpgrade = ref(false)
const showCustomRecommendation = ref(true)
const showLowestCarbonFootprint = ref(false)
const seasonTabs = ['Summer', 'Annual', 'Winter']
const selectedSeason = ref(seasonTabs[1])
</script>

<template>
  <section id="page-1">
    <!-- Header Section -->
    <div class="bg-white rounded-lg shadow-lg lg:p-6 md:p-4 p-2">
      <BaseHeader />

      <!-- Home Profile Section -->
      <div class="lg:mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white shadow-lg rounded-lg lg:p-8 md:p-5 p-3">
          <h2 class="text-3xl font-bold text-green-600 mb-6 flex items-center">
            <i class="fas fa-home mr-3 text-green-500 text-2xl"></i> Home Profile
          </h2>
          <div class="grid md:grid-cols-2 md:gap-6 gap-3 text-gray-700">
            <div class="space-y-4">
              <p class="flex items-center text-lg">
                <i class="fas fa-bed text-green-500 mr-3 text-xl"></i>
                <span class="font-medium">{{ get3_12?.no_of_bedrooms }} bed</span>
              </p>
              <p class="flex items-center text-lg">
                <i class="fas fa-house-user text-green-500 mr-3 text-xl"></i>
                <span class="font-medium me-3">{{ get3_12?.property_type }}</span>
              </p>
              <p class="flex items-center text-lg">
                <i class="fas fa-ruler-combined text-green-500 mr-3 text-xl"></i>
                <span class="font-medium">
                  {{ formatNumber(get3_12?.total_sqft_of_home, true) }} sqft
                </span>
              </p>
              <div class="flex items-center text-lg">
                <i class="fas fa-map-marker-alt text-green-500 mr-3 text-xl me-2"></i>
                <div>
                  <p>{{ get3_12?.address_line_1 }}</p>
                  <p>{{ get3_12['city,_st,_zip'] }}</p>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <p class="flex items-center text-lg">
                <i class="fas fa-shower text-green-500 mr-3 text-xl"></i>
                <span class="font-medium">{{ get3_12?.no_of_bathrooms }} bath</span>
              </p>
              <p class="flex items-center text-lg">
                <i class="fas fa-hammer text-green-500 mr-3 text-xl"></i>
                <span class="font-medium pr-1">Year Built:</span>
                {{ get3_12?.year_house_built }}
              </p>
              <p class="flex items-center text-lg">
                <i class="fas fa-user text-green-500 mr-3 text-xl"></i>
                <span class="font-medium">
                  Name:
                  {{
                    get3_12?.customer_first_and_last_name
                      ? get3_12?.customer_first_and_last_name
                      : 'N/A'
                  }}
                </span>
              </p>
            </div>
          </div>

          <div
            class="lg:mt-8 md:mt-5 mt-3 flex items-center justify-between flex-col md:flex-row bg-green-50 p-6 rounded-lg shadow-md"
          >
            <p class="md:text-xl text-lg font-semibold text-gray-700">Estimated Home Value:</p>
            <p class="md:text-2xl lg:text-4xl text-xl font-bold text-green-600">
              <i class="fas fa-dollar-sign"></i>
              {{ formatNumber(get3_12?.estimated_home_value, true) }}
            </p>
          </div>
        </div>

        <div>
          <img
            :src="get3_12?.photo_of_home_front_view || '/home.png'"
            alt="Home Image"
            class="rounded-lg shadow-md md:h-96 h-72 min-h-72 md:min-h-96 w-full"
          />
        </div>
      </div>

      <div class="mt-6 rounded-lg lg:p-8 md:p-5 p-3">
        <CategoryDropdown v-model:selectedCategories="selectedCategories" />

        <div
          id="upgrade-options-tabs"
          class="mt-6 flex flex-wrap gap-3 md:gap-5 lg:gap-7 justify-center"
        >
          <button
            @click="
              () => {
                selectedCategories = getTrueKeys(get19_29, 'cheapest_')
                showCheapestUpgrade = true
                showCustomRecommendation = false
                showLowestCarbonFootprint = false
              }
            "
            class="tab-btn-upgrade w-fit py-3 px-6 rounded-lg font-medium shadow-md cursor-pointer"
            :class="showCheapestUpgrade ? 'bg-green-100 text-black' : 'text-gray-700 bg-gray-100'"
          >
            Cheapest Upgrade Option
          </button>
          <button
            @click="
              () => {
                selectedCategories = getTrueKeys(get31_41, 'rec_')
                showCheapestUpgrade = false
                showCustomRecommendation = true
                showLowestCarbonFootprint = false
              }
            "
            class="tab-btn-upgrade w-fit py-3 px-6 rounded-lg font-medium shadow-md cursor-pointer"
            :class="
              showCustomRecommendation ? 'bg-green-100 text-black' : 'text-gray-700 bg-gray-100'
            "
          >
            REI Custom Recommendation
          </button>
          <button
            @click="
              () => {
                selectedCategories = getTrueKeys(get43_53, 'lowest_')
                showCheapestUpgrade = false
                showCustomRecommendation = false
                showLowestCarbonFootprint = true
              }
            "
            class="tab-btn-upgrade w-fit py-3 px-6 rounded-lg font-medium shadow-md cursor-pointer"
            :class="
              showLowestCarbonFootprint ? 'bg-green-100 text-black' : 'text-gray-700 bg-gray-100'
            "
          >
            Lowest Carbon Footprint
          </button>
        </div>

        <div
          id="comparison-tabs"
          class="mt-10 flex justify-center items-center space-x-8 border-b pb-4"
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
        <SeasonComponent
          :selectedSeason="selectedSeason"
          :selectedCategories="selectedCategories"
        />
        <BaseFooter />
      </div>
    </div>
  </section>
</template>
