<script setup>
const { theme, toggleTheme } = useTheme()
</script>

<template>
  <header>
    <div class="header-content">
      <h1>Col·lecció Pokémon</h1>
    </div>
    <nav>
      <NuxtLink to="/">Inici</NuxtLink>
      <NuxtLink to="/search">Cerca</NuxtLink>
      <NuxtLink to="/favorites">Equip</NuxtLink>
    </nav>
    <label class="theme-switch">
      <input type="checkbox" @change="toggleTheme" :checked="theme === 'dark'">
      <span class="slider"></span>
    </label>
  </header>
</template>

<style scoped>
.header-content {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  margin: 0 auto 1rem auto;
}

/* Estilos para el interruptor de tema (toggle switch) */
.theme-switch {
  position: absolute;
  top: 21px;
  right: 2rem;
  width: 50px;
  height: 26px;
}

.theme-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .3s;
  border-radius: 26px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .3s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--button-bg);
}

input:checked + .slider:before {
  transform: translateX(24px);
}

nav {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

nav a {
  text-decoration: none;
  color: var(--link-color);
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s, color 0.2s;
}

nav a:hover {
  background: var(--link-hover-bg);
}

nav a.router-link-active {
  color: var(--link-active-color);
  background: var(--link-active-bg);
}
</style>