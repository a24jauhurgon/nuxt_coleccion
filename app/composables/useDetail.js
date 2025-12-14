/**
 * Composable per carregar detalls d'un Pokémon
 */
export const useDetail = () => {
  const { getPokemonById } = useApi()
  const pokemon = ref(null)
  const loading = ref(true)
  const error = ref(null)

  /**
   * Carrega els detalls d'un Pokémon per ID
   * @param {number|string} id - ID del Pokémon a carregar
   */
  const loadPokemon = async (id) => {
    loading.value = true
    error.value = null
    pokemon.value = null

    try {
      const data = await getPokemonById(id)
      pokemon.value = data
    } catch (err) {
      console.error('Error carregant pokémon:', err)
      error.value = err
      pokemon.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    pokemon,
    loading,
    error,
    loadPokemon
  }
}
