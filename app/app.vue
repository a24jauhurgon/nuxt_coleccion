<script setup>
const { theme, loadTheme } = useTheme()

// Cargar tema guardado al montar
onMounted(() => {
  loadTheme()
})

// Añadir Google Material Icons
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=search'
    }
  ]
})
</script>

<template>
  <div class="app-layout" :class="theme">
    <Navbar />
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
</style>

<style>
/* Estilos globales para la parrilla de Pokémon para que las tarjetas sean más grandes */
.pokemon-grid {
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 1.5rem;
}
</style>