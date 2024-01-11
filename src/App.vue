<template>
  <div :class="{ 'dark-mode': isDarkMode }">
    <RouterView />
  </div>
</template>

<script>
import { useMainStore } from '@/stores/mainStore.js'

export default {
  setup() {
    const mainStore = useMainStore()

    // Load destination data and set dark mode from local storage on component creation
    mainStore.loadDestination()
    const isDarkMode = localStorage.getItem('darkMode') === 'true'

    return { mainStore, isDarkMode }
  },
  watch: {
    // Watch for changes in isDarkMode and update local storage
    isDarkMode(newValue) {
      localStorage.setItem('darkMode', newValue)
    }
  }
}
</script>

<style>
.dark-mode {
  background-color: #333;
  color: #fff;
}
</style>
