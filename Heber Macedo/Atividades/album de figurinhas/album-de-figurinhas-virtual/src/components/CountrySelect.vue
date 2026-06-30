<script setup lang="ts">
interface Country {
  name: string
  code: string | null
  flag: string | null
}

interface Props {
  countries: Country[]
  selectedCountry: string
  isLoading: boolean
}

defineProps<Props>()
const emit = defineEmits<{
  'update:selected-country': [value: string]
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:selected-country', target.value)
}
</script>

<template>
  <div class="select-container">
    <label for="country-select" class="select-label">
      Selecione um Pa&iacute;s
    </label>
    <div class="select-wrapper">
      <select
        id="country-select"
        :value="selectedCountry"
        :disabled="isLoading"
        class="country-select"
        @change="handleChange"
      >
        <option value="">
          {{ isLoading ? 'Carregando pa\u00edses...' : '-- Escolha um pa\u00eds --' }}
        </option>
        <option
          v-for="country in countries"
          :key="country.name"
          :value="country.name"
        >
          {{ country.name }}
        </option>
      </select>
      <div class="select-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.select-container {
  max-width: 520px;
  margin: 0 auto;
  padding: 1rem 1.1rem 1.15rem;
  background: rgba(255, 255, 255, 0.96);
  border: 2px solid white;
  border-radius: 18px;
  box-shadow: 0 18px 40px rgba(7, 59, 42, 0.18);
}

.select-label {
  display: block;
  margin-bottom: 0.55rem;
  color: var(--color-primary);
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.select-wrapper {
  position: relative;
}

.country-select {
  width: 100%;
  padding: 1.05rem 3rem 1.05rem 1rem;
  color: var(--color-primary);
  background: linear-gradient(90deg, #f5fff8, #fffbea);
  border: 2px solid rgba(0, 140, 90, 0.3);
  border-radius: 11px;
  box-shadow: inset 5px 0 0 var(--color-accent);
  cursor: pointer;
  appearance: none;
  font-size: 1.02rem;
  font-weight: 800;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}

.country-select:hover:not(:disabled) {
  border-color: var(--color-secondary);
  transform: translateY(-1px);
}

.country-select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(26, 71, 42, 0.15);
}

.country-select:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.7;
}

.select-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  color: var(--color-secondary);
  pointer-events: none;
  transform: translateY(-50%);
}

@media (max-width: 768px) {
  .select-container {
    max-width: 100%;
  }
}
</style>
