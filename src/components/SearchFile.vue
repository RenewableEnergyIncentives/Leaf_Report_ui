<script setup>
import BaseLoader from '@/components/BaseLoader.vue'
import { onMounted, ref } from 'vue'
import { useReportStore } from '@/stores/report'
import { transfermDataForStore } from '@/utils'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isLoading = ref(false)
const errorResponse = ref(null)
const searchQuery = ref(route.params.report_id || '')
const { setReport } = useReportStore()
const { getFilename } = storeToRefs(useReportStore())
const getReportData = () => {
  isLoading.value = true
  setReport(null)
  try {
    const url = `${import.meta.env.VITE_API_BASE_URL}report/${searchQuery.value}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        errorResponse.value = data.message
        const transformed = transfermDataForStore(data)
        setReport(transformed)
      })
      .catch((error) => {
        errorResponse.value = error
        console.error('Error fetching report data:', error)
      })
      .finally(() => {
        isLoading.value = false
      })
  } catch (error) {
    errorResponse.value = error
  }
}
onMounted(() => {
  if (route.params.report_id) {
    router.push(`/${route.params.report_id}`)
    getReportData()
  }
})
</script>

<template>
  <section class="bg-gray-50 h-screen" v-if="getFilename == null">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
        <img class="w-40 h-20 mr-2" src="/main_logo.png" alt="logo" />
      </a>
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Home Energy Report
          </h1>
          <div>
            <label for="file_number" class="block mb-2 text-sm font-medium text-gray-900">
              Your File #
            </label>
            <input
              type="text"
              name="file_number"
              id="file_number"
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 0"
              placeholder="AHJJ677AJSHLK"
              :required="true"
              @input="searchQuery = $event.target.value"
              :value="searchQuery"
            />
          </div>

          <button
            type="button"
            class="w-full border border-black/50 text-black bg-primary-600 hover:bg-primary-700 focus:border-black font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer disabled:pointer-events-none disabled:opacity-50"
            :disabled="searchQuery == '' || isLoading"
            @click="getReportData"
          >
            <p class="w-fit flex gap-4 items-center mx-auto">
              <span> Search </span>
              <BaseLoader v-if="isLoading" />
            </p>
          </button>
          <div class="text-center text-red-600 text-sm">{{ errorResponse }}</div>
          <p class="text-sm font-light w-fit mx-auto text-gray-500">
            All rights reserved. © 2021 Home Energy Report.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
