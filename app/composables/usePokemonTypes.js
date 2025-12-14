/**
 * Composable per gestionar els colors dels tipus de Pokémon
 */
export const usePokemonTypes = () => {
  const typeColors = {
    normal: '#aaaa7b',
    fire: '#ef8130',
    water: '#6c91e5',
    electric: '#efd048',
    grass: '#7fc745',
    ice: '#99d5d6',
    fighting: '#c02e24',
    poison: '#994296',
    ground: '#ecdf6d',
    flying: '#9d8dd0',
    psychic: '#ee5c87',
    bug: '#a6b71f',
    rock: '#b99e37',
    ghost: '#6e5996',
    dragon: '#7239f0',
    dark: '#695944',
    steel: '#b9b6d0',
    fairy: '#daa6dc',
  }

  /**
   * Obté el color d'un tipus de Pokémon
   * @param {string} typeName - Nom del tipus
   * @returns {string} - Color en format hexadecimal
   */
  const getTypeColor = (typeName) => {
    return typeColors[typeName] || '#777'
  }

  /**
   * Calcula el color de text adequat (negre o blanc) segons el color de fons
   * @param {string} typeName - Nom del tipus
   * @returns {string} - '#000' o '#fff'
   */
  const getTextColorForType = (typeName) => {
    const bgColor = typeColors[typeName]
    if (!bgColor) return '#fff'
    
    const color = bgColor.substring(1)
    const luminance = (
      parseInt(color.substring(0, 2), 16) * 0.299 +
      parseInt(color.substring(2, 4), 16) * 0.587 +
      parseInt(color.substring(4, 6), 16) * 0.114
    )
    
    return luminance > 186 ? '#000' : '#fff'
  }

  return {
    typeColors,
    getTypeColor,
    getTextColorForType
  }
}
