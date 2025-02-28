<script setup>
import { storeToRefs } from 'pinia'
import { useReportStore } from '@/stores/report'
const { getReportId, getReportDate, get3_12 } = storeToRefs(useReportStore())
</script>

<template>
  <div class="flex lg:items-center justify-between flex-col lg:flex-row">
    <!-- Logo -->
    <a href="https://renewableenergyincentives.com/" target="_blank" rel="noopener noreferrer">
      <img src="/main_logo.png" alt="Logo" class="lg:h-40 md:h-28 h-20" />
    </a>
    <!-- Report Date -->
    <div class="text-right">
      <p class="text-gray-700 md:text-base text-sm">{{ getReportDate }}</p>
      <p class="text-xs md:text-sm text-gray-700">{{ get3_12?.customer_first_and_last_name }}</p>
      <p class="text-xs md:text-sm text-gray-700">{{ getReportId }}</p>
    </div>
  </div>
</template>
