<template>
  <main class="content">
    <div class="header">
      <h1>KAMP</h1>
      <p>Dein Begleiter für barrierefreies Abenteuer</p>
    </div>
    <div class="bottom section">
      <select v-model="MainStore.selectedRegionId" @change="startAdventure">
        <option disabled selected value="">Bitte Region auswählen</option>
        <option v-for="region of MainStore.regions" :key="region.id" :value="region.id">
          {{ region.name }}
        </option>
      </select>
      <button @click="startAdventure">Los Geht's!</button>
    </div>
  </main>
</template>

<script>
import { useMainStore } from '@/stores/mainStore'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const MainStore = useMainStore()

    const router = useRouter()

    const startAdventure = () => {
      if (MainStore.selectedRegionId || MainStore.selectedRegionId === 0) {
        router.push('selection')
        console.log('Redirecting to /selection')
      } else {
        router.push('/selection')
        console.log('Redirecting to /selection')
      }
    }

    MainStore.loadRegion()
    return { MainStore, startAdventure }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.header {
  background: rgba(200, 187, 187, 0.5);
  margin-right: 2rem;
  margin-left: 2rem;
  padding: 16px;
  border-radius: 20px;
}

h1 {
  color: #bcff75;
  font-size: 3.5rem;
}

p {
  color: white;
}
</style>
