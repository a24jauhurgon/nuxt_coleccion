import axios from 'axios'

class CommunicationManager {
  constructor() {
    this.api = null
    this.initialized = false
  }

  initialize(config) {
    if (this.initialized) return
    
    this.api = axios.create({
      baseURL: config.public.apiBaseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    this.initialized = true
  }

  ensureInitialized() {
    if (!this.initialized) {
      const config = useRuntimeConfig()
      this.initialize(config)
    }
  }

  async getPokemonList(limit = 20, offset = 0) {
    this.ensureInitialized()
    try {
      const response = await this.api.get(`/pokemon`, {
        params: { limit, offset }
      })
      return response.data
    } catch (error) {
      console.error('Error obtenint llista de Pokémon:', error)
      throw error
    }
  }

  async getPokemonByName(name) {
    this.ensureInitialized()
    try {
      const response = await this.api.get(`/pokemon/${name}`)
      return response.data
    } catch (error) {
      console.error(`Error obtenint Pokémon ${name}:`, error)
      throw error
    }
  }

  async getPokemonById(id) {
    this.ensureInitialized()
    try {
      const response = await this.api.get(`/pokemon/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error obtenint Pokémon amb ID ${id}:`, error)
      throw error
    }
  }

  async getAllPokemon(limit = 1000) {
    this.ensureInitialized()
    try {
      const response = await this.api.get(`/pokemon`, {
        params: { limit }
      })
      return response.data
    } catch (error) {
      console.error('Error obtenint tots els Pokémon:', error)
      throw error
    }
  }
}

export const communicationManager = new CommunicationManager()
