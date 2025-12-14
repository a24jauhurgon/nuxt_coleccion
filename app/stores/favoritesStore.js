import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    favorites: []
  }),

  actions: {
    addFavorite(item) {
      this.favorites.push(item);
    },

    removeFavorite(id) {
      this.favorites = this.favorites.filter(f => f.id !== id);
    },

    toggleFavorite(pokemon) {
      const index = this.favorites.findIndex(f => f.name === pokemon.name)
      if (index >= 0) {
        this.favorites.splice(index, 1)
      } else {
        this.favorites.push(pokemon)
      }
      this.saveFavorites()
    },

    loadFavorites() {
      if (process.client) {
        const stored = localStorage.getItem('pokemon-favorites')
        if (stored) {
          this.favorites = JSON.parse(stored)
        }
      }
    },

    saveFavorites() {
      if (process.client) {
        localStorage.setItem('pokemon-favorites', JSON.stringify(this.favorites))
      }
    },

    // Auto-cargar favoritos al crear el store
    init() {
      this.loadFavorites()
    }
  },

  getters: {
    isFavorite: (state) => (id) => state.favorites.some(f => f.id === id),
    
    isFavoriteName: (state) => (name) => state.favorites.some(f => f.name === name)
  }
});