<template>
  <div class="selector-wrapper">
    <label for="country-select" class="selector-label">
      🌍 Escolha uma Seleção
    </label>

    <div class="select-container">
      <select
        id="country-select"
        class="country-select"
        :disabled="loading"
        @change="handleChange"
      >
        <option value="">
          {{ loading ? 'Carregando países...' : '-- Selecione um país --' }}
        </option>
        <option
          v-for="country in countries"
          :key="country.code || country.name"
          :value="country.name"
        >
          {{ country.name }}
        </option>
      </select>
      <span class="select-arrow">▼</span>
    </div>
  </div>
</template>

<script setup>
// defineProps declara quais dados este componente recebe do pai (App.vue)
const props = defineProps({
  countries: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

// defineEmits declara quais eventos este componente pode enviar ao pai
const emit = defineEmits(['country-selected'])

const handleChange = (event) => {
  const selectedName = event.target.value
  if (!selectedName) return

  // Encontra o objeto completo do país pelo nome selecionado
  const country = props.countries.find(c => c.name === selectedName)
  if (country) {
    emit('country-selected', country)  // avisa o App.vue qual país foi escolhido
  }
}
</script>