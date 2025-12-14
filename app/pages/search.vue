<template>
  <div>
    <SearchInput
      v-model="searchTerm"
      label="Benvingut a la pàgina de cerca"
      placeholder="Nom del Pokémon"
      @search="searchPokemon"
    />
    
    <div v-if="loading" class="loading-container">
      <img :src="loadingImage" alt="Carregant..." />
    </div>
    <div v-else-if="paginatedResults.length > 0">
      <div class="pokemon-grid">
        <PokemonCard
          v-for="pokemon in paginatedResults"
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
        @previous="previousPage"
        @next="nextPage"
      />
    </div>
    <div v-else-if="searched && searchTerm">
      No s'ha trobat cap Pokémon
    </div>
  </div>
</template>

<script setup>
const { searchTerm, results, loading, searched, searchPokemon } = useSearch()
const { currentPage, totalPages, nextPage, previousPage, getPaginatedItems, resetPage } = usePagination(20)
const { loadingImage } = useTheme()
const { isFavorite, toggleFavorite } = useFavorites()

const paginatedResults = computed(() => getPaginatedItems(results.value))

watch(searchTerm, () => {
  resetPage()
})
</script>