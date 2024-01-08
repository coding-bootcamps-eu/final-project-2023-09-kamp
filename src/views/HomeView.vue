<template>
  <main
    class="content"
    :style="{ backgroundImage: 'url(https://i.imgur.com/xfx7DFh.jpg)' }"
    alt="Schönes Bergpanorama mit einem Pfad, der sich hinauf zu den Bergen schlängelt"
  >
    <div class="header">
      <h1>KAMP</h1>
      <p>Dein Begleiter für barrierefreies Abenteuer</p>
    </div>
    <div class="center-content"></div>
    <div class="bottom section">
      <select v-model="MainStore.selectedRegionId" class="select-dropdown">
        <option disabled selected value="" hidden>Bitte Region auswählen</option>
        <option v-for="region of MainStore.regions" :key="region.id" :value="region.id">
          {{ region.name }}
        </option>
      </select>
      <button @click="startAdventure" class="start-button">Los Geht's!</button>
    </div>
    <p v-if="showWarning" class="warning">Bitte wählen Sie zuerst eine Region aus!</p>
  </main>
</template>

<script>
import { useMainStore } from '@/stores/mainStore'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export default {
  setup() {
    const MainStore = useMainStore()
    const router = useRouter()
    const showWarning = ref(false)

    const startAdventure = () => {
      if (MainStore.selectedRegionId || MainStore.selectedRegionId === 0) {
        router.push('selection')
      } else {
        showWarning.value = true
        setTimeout(() => {
          showWarning.value = false
        }, 2000)
        return
      }

      router.push('selection')
    }

    MainStore.loadRegion()

    return { MainStore, startAdventure, showWarning }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

@media (max-width: 600px) {
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 100vh;
    background-size: cover;
    background-position: center;
  }

  .header {
    background: var(--background-color);
    margin: 2rem;
    padding: 16px;
    border-radius: 20px;
  }

  h1 {
    color: var(--highlight-color);
    font-size: 3.5rem;
    margin-bottom: 8px;
  }

  p {
    color: var(--btn-text-color);
    margin-bottom: 0;
  }

  .section {
    margin-top: 20px;
    text-align: center;
  }

  .select-dropdown {
    background-color: var(--background-color);
    color: var(--highlight-color);
    text-align: center;
    font-weight: bold;
    width: 80%;
    padding: 10px;
    border: 1px solid var(--text-color);
    border-radius: 5px;
    margin-bottom: 20px;
    font-family: var(--main-font);
  }

  .start-button {
    background-color: var(--background-color);
    color: var(--btn-text-color);
    font-weight: bold;
    width: 40%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: var(--main-font);
  }

  .warning {
    color: red;
    margin-top: 10px;
    text-align: center;
    font-family: var(--main-font);
  }
}
</style>
