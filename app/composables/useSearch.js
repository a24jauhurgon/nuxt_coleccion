/**
 * Composable per cercar Pokémon per nom o ID
 */
export const useSearch = () => {
  const { getPokemonById, getAllPokemon, getPokemonByName } = useApi()
  const searchTerm = ref('')
  const results = ref([])
  const loading = ref(false)
  const searched = ref(false)
  const allPokemons = ref([])
  const error = ref(null)

  /**
   * Cerca Pokémon per nom o ID
   * Si és un número, cerca per ID. Si no, cerca per nom.
   */
  const searchPokemon = async () => {
    if (!searchTerm.value) {
      results.value = []
      searched.value = false
      return
    }

    loading.value = true
    searched.value = false
    error.value = null

    try {
      const searchValue = searchTerm.value.trim()

      // Cerca per ID (si és un número)
      if (/^\d+$/.test(searchValue)) {
        try {
          const details = await getPokemonById(searchValue)
          results.value = [{
            name: details.name,
            image: details.sprites.front_default,
            id: details.id
          }]
        } catch (err) {
          results.value = []
        }
      } else {
        // Cerca per nom
        if (allPokemons.value.length === 0) {
          const data = await getAllPokemon(1000)
          allPokemons.value = data.results
        }

        const searchLower = searchValue.toLowerCase()
        const filtered = allPokemons.value.filter(p =>
          p.name.startsWith(searchLower)
        )

        const pokemonDetails = await Promise.all(
          filtered.map(async (pokemon) => {
            const details = await getPokemonByName(pokemon.name)
            return {
              name: pokemon.name,
              image: details.sprites.front_default,
              id: details.id
            }
          })
        )

        results.value = pokemonDetails
      }
    } catch (err) {
      console.error('Error cercant pokémon:', err)
      error.value = err
      results.value = []
    } finally {
      loading.value = false
      searched.value = true
    }
  }

  /**
   * Neteja els resultats de cerca i reinicia l'estat
   */
  const clearSearch = () => {
    searchTerm.value = ''
    results.value = []
    searched.value = false
    error.value = null
  }

  return {
    searchTerm,
    results,
    loading,
    searched,
    error,
    searchPokemon,
    clearSearch
  }
}
