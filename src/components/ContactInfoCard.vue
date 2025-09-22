<script setup lang="ts">
defineProps<{
  title: string
  detail: string
  link?: string | null
}>()
</script>

<template>
  <div class="flex items-start gap-x-4">
    <div
      class="flex-shrink-0 bg-primary text-white h-12 w-12 rounded-lg flex items-center justify-center"
    >
      <slot></slot>
    </div>
    <div>
      <h3 class="text-lg font-bold text-gray-800">{{ title }}</h3>
      <a
        v-if="link"
        :href="link"
        target="_blank"
        class="text-gray-600 hover:text-primary transition-colors"
      >
        {{ detail }}
      </a>
      <p v-else class="text-gray-600">{{ detail }}</p>
    </div>
  </div>
</template>
