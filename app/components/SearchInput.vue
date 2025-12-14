<template>
  <div class="search-input-wrapper">
    <slot name="label">
      <h1 v-if="label">{{ label }}</h1>
    </slot>
    <div class="input-container">
      <slot name="icon">
        <span class="material-symbols-outlined search-icon">search</span>
      </slot>
      <input 
        v-model="query"
        :placeholder="placeholder"
        :type="type"
        @input="emit('search', query)"
      />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["search"]);
const query = defineModel();

defineProps({
  placeholder: {
    type: String,
    default: 'Cercar...'
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  }
})
</script>

<style scoped>
.input-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto 2rem;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  pointer-events: none;
}

input {
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 3rem;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  display: block;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #42b983;
}
</style>