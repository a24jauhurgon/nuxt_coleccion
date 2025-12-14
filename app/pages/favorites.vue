<template>
  <div>
    <h1>El meu Equip</h1>
    <div v-if="favorites.length === 0" class="empty-message">
      No tens cap Pokémon al teu equip.
    </div>
    <div v-else>
      <div class="pokemon-grid">
        <PokemonCard
          v-for="pokemon in paginatedFavorites"
          :key="pokemon.name"
          :pokemon="pokemon"
          :is-favorite="true"
          @toggle-favorite="toggleFavorite"
        >
          <template #actions="{ item }">
            <button 
              @click.stop="toggleFavorite(item)" 
              class="favorite-btn active"
              title="Eliminar de l'equip"
            >
              <svg viewBox="0 0 100 100" class="pokeball-icon">
                <circle cx="50" cy="50" r="45" fill="var(--pokeball-bg)" stroke="none"/>
                <path d="M 5 50 A 45 45 0 0 1 95 50" class="pb-top" stroke="none" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="8"/>
                <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" stroke-width="8" />
                <circle cx="50" cy="50" r="15" class="pb-center" stroke="currentColor" stroke-width="8" fill="var(--pokeball-bg)" />
                <circle cx="50" cy="50" r="6" class="pb-btn" fill="currentColor" />
              </svg>
            </button>
          </template>
        </PokemonCard>
      </div>
      
      <PaginationControls
        :current-page="currentPage"
        :total-pages="totalPages"
        @previous="previousPage"
        @next="nextPage"
      />
    </div>
  </div>
</template>

<script setup>
const { favorites, toggleFavorite } = useFavorites()
const { currentPage, totalPages, nextPage, previousPage, getPaginatedItems, resetPage } = usePagination(20)

const sortedFavorites = computed(() => {
  return [...favorites.value].sort((a, b) => (a.id || 0) - (b.id || 0))
})

const paginatedFavorites = computed(() => {
  return getPaginatedItems(sortedFavorites.value)
})

watch(() => favorites.value.length, (newLength, oldLength) => {
  if (newLength < oldLength && currentPage.value > totalPages.value && totalPages.value > 0) {
    currentPage.value = totalPages.value
  }
})
</script>

<style scoped>
/* Estilos específicos ya están en main.css */
</style>