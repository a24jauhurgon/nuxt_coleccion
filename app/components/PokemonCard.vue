<template>
  <div class="pokemon-card">
    <slot name="actions" :item="pokemon">
      <button 
        @click.stop="$emit('toggle-favorite', pokemon)" 
        class="favorite-btn"
        :class="{ active: isFavorite }"
        :title="isFavorite ? 'Treure de favorits' : 'Afegir a favorits'"
      >
        ★
      </button>
    </slot>
    
    <NuxtLink :to="`/item/${pokemon.name}`" class="pokemon-link">
      <slot name="image" :item="pokemon">
        <img :src="pokemon.image" :alt="pokemon.name" />
      </slot>
      <slot name="name" :item="pokemon">
        <h3>{{ pokemon.name }}</h3>
      </slot>
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  pokemon: {
    type: Object,
    required: true,
    alias: 'item'
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle-favorite'])
</script>