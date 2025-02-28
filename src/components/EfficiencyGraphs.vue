<script lang="ts" setup>
defineProps(['title', 'current', 'upgraded', 'delta', 'unit'])
</script>

<template>
  <div class="flex items-center">
    <div class="basis-5/5 flex flex-col">
      <div class="text-base md:text-lg font-bold md:ml-40 text-center md:text-left">
        {{ title }}
      </div>
      <div
        class="h-8 bg-gray-200 border border-black"
        :style="{ width: `${current == 0 ? 1 : current}%` }"
      >
        <p class="text-right text-sm pr-3 pt-1">{{ current }}%</p>
      </div>
      <div
        class="h-8 bg-green-500 border border-black"
        :style="{ width: `${upgraded == 0 ? 1 : upgraded}%` }"
      >
        <p class="text-right text-sm pr-3 pt-1">{{ upgraded }}%</p>
      </div>
    </div>
    <div class="text-green-600 basis-2/5 font-bold text-xl lg:text-2xl ms-6 text-right mr-10">
      {{ delta }}{{ ' ' }}{{ unit }}
    </div>
  </div>
</template>
