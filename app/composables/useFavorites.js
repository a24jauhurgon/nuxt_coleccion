/**
 * Composable per gestionar els favorits (wrapper del store)
 */
export const useFavorites = () => {
  const favoritesStore = useFavoritesStore()
  
  // Auto-inicializar favoritos al usar el composable
  if (process.client && !favoritesStore._initialized) {
    favoritesStore.init()
    favoritesStore._initialized = true
  }

  /**
   * Comprova si un Pokémon és favorit
   * @param {string} name - Nom del Pokémon
   * @returns {boolean} - True si és favorit
   */
  const isFavorite = (name) => {
    return favoritesStore.isFavoriteName(name)
  }

  /**
   * Afegeix o elimina un Pokémon dels favorits
   * @param {Object} pokemon - Dades del Pokémon
   */
  const toggleFavorite = (pokemon) => {
    favoritesStore.toggleFavorite(pokemon)
  }

  /**
   * Afegeix un Pokémon als favorits si no ho és
   * @param {Object} pokemon - Dades del Pokémon
   */
  const addFavorite = (pokemon) => {
    if (!isFavorite(pokemon.name)) {
      favoritesStore.toggleFavorite(pokemon)
    }
  }

  /**
   * Elimina un Pokémon dels favorits si ho és
   * @param {Object} pokemon - Dades del Pokémon
   */
  const removeFavorite = (pokemon) => {
    if (isFavorite(pokemon.name)) {
      favoritesStore.toggleFavorite(pokemon)
    }
  }

  return {
    favorites: computed(() => favoritesStore.favorites),
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite
  }
}
