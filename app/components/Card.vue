<template>
  <div class="p-4 bg-white rounded shadow mb-4">
    <h3 class="font-semibold text-lg mb-2">{{ title }}</h3>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String
})
</script>