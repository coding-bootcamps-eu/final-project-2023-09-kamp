<template>
  <div>
    <navbar />
    <h1>Zugänglichkeit</h1>
    <div class="choice-wrapper">
      <div
        class="disability-option"
        v-for="disability in mainStore.disabilities"
        :key="disability.id"
        @click="toggleSelection(disability.id)"
      >
        <div
          class="disability-rectangle"
          :class="{ selected: mainStore.selectedDisabilitiesId.includes(disability.id) }"
        >
          {{ disability.name }}
        </div>
      </div>
    </div>
    <div class="button-container">
      <button @click="showResults">Ergebnisse anzeigen</button>
    </div>
  </div>
</template>

<script>
import { useMainStore } from '@/stores/mainStore'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

export default {
  setup() {
    const mainStore = useMainStore()
    const router = useRouter()

    onMounted(() => {
      mainStore.loadDisability()
    })

    const toggleSelection = (disabilityId) => {
      const index = mainStore.selectedDisabilitiesId.indexOf(disabilityId)
      if (index === -1) {
        mainStore.selectedDisabilitiesId.push(disabilityId)
      } else {
        mainStore.selectedDisabilitiesId.splice(index, 1)
      }
    }

    const showResults = () => {
      // Save selected disabilities to Pinia store before navigating
      mainStore.selectedDisabilitiesId

      // Use Vue Router to navigate to the destinations page
      router.push({
        name: 'destinations',
        query: { disabilities: mainStore.selectedDisabilitiesId }
      })
    }

    return { mainStore, toggleSelection, showResults }
  },
  components: {
    navbar: NavBar
  }
}
</script>

<style scoped>
.disability-option {
  margin-bottom: 10px;
}

.disability-rectangle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 40px;
  border: 1px solid var(--text-color);
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  background-color: var(--background-color);
  color: var(--text-color);
}

h1 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.choice-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Add shadow box effect */
  padding: 10px;
  border-radius: 10px;
}

button {
  padding: 10px 20px;
  background-color: var(--btn-color);
  color: var(--btn-text-color);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.selected {
  background-color: var(--highlight-color);
  color: var(--text-color);
}
</style>
