<template>
  <div class="pagination" v-if="totalPages > 1">
    <button @click="$emit('previous')" :disabled="currentPage === 1">
      <slot name="previous-text">Anterior</slot>
    </button>
    <span class="page-info">
      <slot name="page-info" :currentPage="currentPage" :totalPages="totalPages">
        Pàgina {{ currentPage }} de {{ totalPages }}
      </slot>
    </span>
    <button @click="$emit('next')" :disabled="currentPage === totalPages">
      <slot name="next-text">Següent</slot>
    </button>
  </div>
</template>

<script setup>
defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

defineEmits(['previous', 'next'])
</script>