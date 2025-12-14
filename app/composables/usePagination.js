/**
 * Composable per gestionar la paginació
 * @param {number} itemsPerPage - Nombre d'ítems per pàgina
 */
export const usePagination = (itemsPerPage = 20) => {
  const currentPage = ref(1)
  const totalCount = ref(0)

  const totalPages = computed(() => Math.ceil(totalCount.value / itemsPerPage))

  /**
   * Avança a la següent pàgina si és possible
   * @param {Function} callback - Funció a executar després de canviar de pàgina
   */
  const nextPage = (callback) => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
      if (callback) callback(currentPage.value)
      scrollToTop()
    }
  }

  /**
   * Retrocedeix a la pàgina anterior si és possible
   * @param {Function} callback - Funció a executar després de canviar de pàgina
   */
  const previousPage = (callback) => {
    if (currentPage.value > 1) {
      currentPage.value--
      if (callback) callback(currentPage.value)
      scrollToTop()
    }
  }

  /**
   * Va a una pàgina específica
   * @param {number} page - Número de pàgina
   * @param {Function} callback - Funció a executar després de canviar de pàgina
   */
  const goToPage = (page, callback) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
      if (callback) callback(currentPage.value)
      scrollToTop()
    }
  }

  /**
   * Reinicia la paginació a la primera pàgina
   */
  const resetPage = () => {
    currentPage.value = 1
  }

  /**
   * Desplaça la finestra al principi de la pàgina
   */
  const scrollToTop = () => {
    if (process.client) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  /**
   * Retorna els ítems de la pàgina actual
   * @param {Array} items - Array complet d'ítems
   * @returns {Array} - Ítems de la pàgina actual
   */
  const getPaginatedItems = (items) => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return items.slice(start, end)
  }

  return {
    currentPage,
    totalCount,
    totalPages,
    nextPage,
    previousPage,
    goToPage,
    resetPage,
    getPaginatedItems
  }
}
