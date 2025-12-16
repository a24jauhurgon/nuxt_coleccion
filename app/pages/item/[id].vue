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

        <div class="ai-section">
          <h3>Informació Extra (IA)</h3>
          
          <button 
            v-if="!aiResponse"
            @click="generateCreativeText(pokemon.name)" 
            :disabled="isGenerating"
            class="ai-button"
          >
            {{ isGenerating ? 'Pensant...' : 'Com trobar aquest Pokémon?' }}
          </button>

          <p v-if="aiResponse" class="ai-response">
            {{ cleanAiResponse }}
          </p>
          
          <p v-if="error" class="error-message">
            {{ error }}
          </p>
        </div>

      </div>
    </div>
  </div>
  <div v-else class="not-found">
    No s'ha trobat el Pokémon.
  </div>
</template>

<script setup>
import { useGemini } from "../../composables/useGemini"

const route = useRoute()
const { pokemon, loading, loadPokemon } = useDetail()
const { loadingImage } = useTheme()
const { getTypeColor, getTextColorForType } = usePokemonTypes()
const { aiResponse, isGenerating, error, generateCreativeText } = useGemini()

// Computed para limpiar el formato Markdown del texto de la IA
const cleanAiResponse = computed(() => {
  if (!aiResponse.value) return ''
  // Eliminar formato Markdown: **negrita**, *cursiva*, etc.
  return aiResponse.value
    .replace(/\*\*/g, '') // Eliminar **
    .replace(/\*/g, '')   // Eliminar *
    .replace(/##/g, '')   // Eliminar ##
    .replace(/__/g, '')   // Eliminar __
    .replace(/_/g, '')    // Eliminar _
})

onMounted(() => {
  loadPokemon(route.params.id)
})

watch(() => route.params.id, (newId) => {
  if (newId) {
    loadPokemon(newId)
    aiResponse.value = '' // Reset AI info cuando cambia el Pokémon
  }
})
</script>

<style scoped>
.ai-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.ai-button {
  width: 100%;
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);
}

.ai-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(102, 126, 234, 0.4);
}

.ai-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.ai-response {
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: var(--card-bg);
  border-radius: 8px;
  border-left: 4px solid #667eea;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.ai-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.ai-section h3 {
  margin: 0 0 1rem 0;
  color: var(--text-color);
  font-size: 1.1rem;
}

.ai-button {
  width: 100%;
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);
}

.ai-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(102, 126, 234, 0.4);
}

.ai-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.ai-response {
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: var(--card-bg);
  border-radius: 8px;
  border-left: 4px solid #667eea;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  line-height: 1.6;
  color: var(--text-color);
  white-space: pre-wrap;
  font-weight: normal;
  font-style: normal;
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #fee;
  border-left: 4px solid #f44;
  border-radius: 4px;
  color: #c33;
}
</style>