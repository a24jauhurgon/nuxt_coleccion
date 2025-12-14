/**
 * Composable per carregar llistes de Pokémon amb paginació
 */
export const useList = () => {
  const { getPokemonList, getPokemonByName } = useApi()
  const pokemons = ref([])
  const loading = ref(true)
  const error = ref(null)

  /**
   * Carrega una llista paginada de Pokémon amb els seus detalls
   * @param {number} limit - Número màxim de Pokémon a carregar
   * @param {number} offset - Desplaçament per a la paginació
   * @returns {number} - Total de Pokémon disponibles
   */
  const loadPokemonList = async (limit = 20, offset = 0) => {
    loading.value = true
    error.value = null
    
    try {
      const data = await getPokemonList(limit, offset)
      
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const details = await getPokemonByName(pokemon.name)
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            id: details.id
          }
        })
      )
      
      pokemons.value = pokemonDetails
      return data.count
    } catch (err) {
      console.error('Error carregant pokémons:', err)
      error.value = err
      pokemons.value = []
      return 0
    } finally {
      loading.value = false
    }
  }

  return {
    pokemons,
    loading,
    error,
    loadPokemonList
  }
}
