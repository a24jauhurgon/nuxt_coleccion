<template>
  <div>
    <div v-if="loading" class="loading-container">
      <img :src="loadingImage" alt="Carregant..." />
    </div>
    <div v-else>
      <div class="pokemon-grid">
        <PokemonCard
          v-for="pokemon in pokemons"
          :key="pokemon.name"
          :pokemon="pokemon"
          :is-favorite="isFavorite(pokemon.name)"
          @toggle-favorite="toggleFavorite"
        >
          <template #actions="{ item }">
            <button 
              @click.stop="toggleFavorite(item)" 
              class="favorite-btn"
              :class="{ active: isFavorite(item.name) }"
              title="Afegir a l'equip"
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
        @previous="handlePreviousPage"
        @next="handleNextPage"
      />
    </div>
  </div>
</template>

<script setup>
const { pokemons, loading, loadPokemonList } = useList()
const { currentPage, totalCount, totalPages, nextPage, previousPage } = usePagination(20)
const { loadingImage } = useTheme()
const { isFavorite, toggleFavorite } = useFavorites()

const itemsPerPage = 20

const loadPage = async (page) => {
  const offset = (page - 1) * itemsPerPage
  const count = await loadPokemonList(itemsPerPage, offset)
  totalCount.value = count
}

const handleNextPage = () => {
  nextPage(loadPage)
}

const handlePreviousPage = () => {
  previousPage(loadPage)
}

onMounted(() => {
  loadPage(1)
})
</script>