import { communicationManager } from '~/utils/communicationManager'

/**
 * Composable per gestionar totes les crides a l'API
 */
export const useApi = () => {
  /**
   * Obtenir llista de Pokémon amb paginació
   */
  const getPokemonList = async (limit = 20, offset = 0) => {
    try {
      return await communicationManager.getPokemonList(limit, offset)
    } catch (error) {
      console.error('Error obtenint llista de Pokémon:', error)
      throw error
    }
  }

  /**
   * Obtenir Pokémon per nom
   */
  const getPokemonByName = async (name) => {
    try {
      return await communicationManager.getPokemonByName(name)
    } catch (error) {
      console.error(`Error obtenint Pokémon ${name}:`, error)
      throw error
    }
  }

  /**
   * Obtenir Pokémon per ID
   */
  const getPokemonById = async (id) => {
    try {
      return await communicationManager.getPokemonById(id)
    } catch (error) {
      console.error(`Error obtenint Pokémon amb ID ${id}:`, error)
      throw error
    }
  }

  /**
   * Obtenir tots els Pokémon
   */
  const getAllPokemon = async (limit = 1000) => {
    try {
      return await communicationManager.getAllPokemon(limit)
    } catch (error) {
      console.error('Error obtenint tots els Pokémon:', error)
      throw error
    }
  }

  return {
    getPokemonList,
    getPokemonByName,
    getPokemonById,
    getAllPokemon
  }
}
