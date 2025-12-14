/**
 * Composable per gestionar el tema i les imatges de càrrega
 */
export const useTheme = () => {
  const theme = useState('theme', () => 'light')

  const loadingImage = computed(() =>
    theme.value === 'dark' ? '/cargando_white.gif' : '/cargando_black.gif'
  )

  /**
   * Carrega el tema guardat des de localStorage
   */
  const loadTheme = () => {
    if (process.client) {
      const saved = localStorage.getItem('pokemon-theme')
      if (saved) {
        theme.value = saved
      }
    }
  }

  /**
   * Canvia entre tema clar i fosc i guarda la preferència
   */
  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    if (process.client) {
      localStorage.setItem('pokemon-theme', theme.value)
    }
  }

  return {
    theme,
    loadingImage,
    toggleTheme,
    loadTheme
  }
}
