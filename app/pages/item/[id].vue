<template>
  <div v-if="loading" class="loading-container">
    <img :src="loadingImage" alt="Carregant..." />
  </div>
  <div v-else-if="pokemon" class="pokemon-detail-container">
    <div class="pokemon-detail-card">
      <div class="image-section">
        <img :src="pokemon.sprites.other['official-artwork'].front_default" :alt="pokemon.name" class="pokemon-image" />
      </div>
      <div class="info-section">
        <div class="header">
          <h1 class="pokemon-name">{{ pokemon.name }}</h1>
          <span class="pokemon-id">#{{ pokemon.id.toString().padStart(3, '0') }}</span>
        </div>

        <div class="types">
          <span 
            v-for="typeInfo in pokemon.types" 
            :key="typeInfo.type.name" 
            class="type-badge" 
            :style="{ backgroundColor: getTypeColor(typeInfo.type.name), color: getTextColorForType(typeInfo.type.name) }"
          >
            {{ typeInfo.type.name }}
          </span>
        </div>

        <div class="measurements">
          <div class="measurement-item">
            <span class="label">Alçada</span>
            <span class="value">{{ pokemon.height / 10 }} m</span>
          </div>
          <div class="measurement-item">
            <span class="label">Pes</span>
            <span class="value">{{ pokemon.weight / 10 }} kg</span>
          </div>
        </div>

        <div class="abilities">
          <h3>Habilitats</h3>
          <ul>
            <li v-for="ability in pokemon.abilities" :key="ability.ability.name">
              {{ ability.ability.name }}
            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>
  <div v-else class="not-found">
    No s'ha trobat el Pokémon.
  </div>
</template>

<script setup>
const route = useRoute()
const { pokemon, loading, loadPokemon } = useDetail()
const { loadingImage } = useTheme()
const { getTypeColor, getTextColorForType } = usePokemonTypes()

onMounted(() => {
  loadPokemon(route.params.id)
})

watch(() => route.params.id, (newId) => {
  if (newId) loadPokemon(newId)
})
</script>

<style scoped>
/* Estilos específicos de esta página ya están en main.css */
</style>