<script setup>
import { useReportStore } from '@/stores/report'
import { storeToRefs } from 'pinia'
import MainSection from '@/components/MainSection.vue'
import SecondSection from '@/components/SecondSection.vue'
import SearchFile from '@/components/SearchFile.vue'

const { getFilename } = storeToRefs(useReportStore())
</script>
<template>
  <SearchFile />
  <div class="bg-gray-100" v-if="getFilename">
    <div class="mx-auto lg:p-6 md:p-4 p-2 max-w-7xl flex flex-col gap-4">
      <MainSection />
      <SecondSection />
    </div>
  </div>
</template>
