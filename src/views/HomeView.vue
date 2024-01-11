<template>
  <main
    class="content"
    :class="{
      blur: showWarning,
      'high-contrast-mode': MainStore.isHighContrastMode
    }"
    :style="{ backgroundImage: 'url(https://i.imgur.com/xfx7DFh.jpg)' }"
    alt="Schönes Bergpanorama mit einem Pfad, der sich hinauf zu den Bergen schlängelt"
  >
    <div v-if="showWarning" :class="{ 'popup-overlay': true, active: showWarning }"></div>

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
      <button @click="startAdventure" class="btn-start">
        <p>Los Geht's!</p>
        <img src="/src/assets/svg/arrow_right.svg" />
      </button>
      <button @click="toggleHighContrastMode" class="high-contrast-toggle">
        {{ MainStore.isHighContrastMode ? ' Hoher Kontrast aus' : ' Hoher Kontrast ein' }}
      </button>
    </div>
    <div v-if="showWarning" :class="{ 'popup-warning': true, 'custom-background': true }">
      <div class="popup-inhalt">
        <span class="closePopup" @click="closePopup"></span>
        <h3 class="popup-title">Hallo Entdecker!</h3>
        <p class="popup-message">Wähle zuerst eine Region aus.</p>
      </div>
    </div>

    <footer class="impressum"><router-link to="/impressum">Impressum</router-link></footer>
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
    const isHighContrastMode = false

    const startAdventure = () => {
      if (MainStore.selectedRegionId || MainStore.selectedRegionId === 0) {
        router.push('selection')
      } else {
        showWarning.value = true
        setTimeout(() => {
          showWarning.value = false
        }, 5000)
        return
      }

      router.push('selection')
    }

    const toggleHighContrastMode = () => {
      MainStore.toggleHighContrastMode()
    }

    MainStore.loadRegion()

    return { MainStore, startAdventure, showWarning, isHighContrastMode, toggleHighContrastMode }
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
    background: var(--background-transparency-color);
    margin: 2rem;
    padding: 16px;
    border-radius: 20px;
  }

  h1 {
    color: var(--highlight-color);
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 8px;
  }

  p {
    color: var(--btn-text-color);
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0;
  }

  .section {
    margin-top: 20px;
    text-align: center;
  }

  .select-dropdown {
    background-color: var(--background-color);
    color: var(--btn-text-color);
    padding: 0.7rem 0.7rem;
    margin-bottom: 2rem;
    margin-top: 5rem;
    border-radius: 0.5rem;
    border: none;
    font-size: 1rem;
    text-align: left;
    font-weight: 500;
    display: flex;
    width: 100%;
  }

  .btn-start {
    background-color: var(--background-color);
    padding: 0.7rem 0.7rem;
    border-radius: 0.5rem;
    border: none;
    font-size: 0.7rem;
    font-weight: 700;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--btn-text-color);
    width: 100%;
  }

  .custom-background {
    background-color: var(--infobox-color);
  }

  .popup-warning {
    position: fixed;
    top: 54%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    box-shadow: 0 0 5px var(--infobox-color);
    padding: 10px;
    max-width: 40%;
    z-index: 10;
  }

  .popup-inhalt {
    text-align: left;
  }

  .popup-title,
  .popup-message {
    color: var(--text-color);
  }

  .closePopup {
    position: absolute;
  }

  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8); /* Ändere die Hintergrundfarbe nach Bedarf */
    z-index: 2;
  }

  .impressum a {
    color: var(--highlight-color);
    font-weight: 500;
  }

  .high-contrast-toggle {
    background-color: var(--hc-btn-color);
    color: var(--btn-text-color);
    font-weight: bold;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: var(--main-font);
    margin-top: 10px;
  }

  .high-contrast-mode .header {
    background-color: var(--hc-background-color);
  }
}
</style>
