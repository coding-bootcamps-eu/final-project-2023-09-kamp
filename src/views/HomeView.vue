<template>
  <main>
    <h1>KAMP</h1>
    <select v-model="MainStore.selectedRegionId">
      <option v-for="region of MainStore.regions" :key="region.id" :value="region.id">
        {{ region.name }}
      </option>
    </select>
  </main>
</template>

<script>
import { useMainStore } from '@/stores/mainStore'
export default {
  setup() {
    const MainStore = useMainStore()
    MainStore.loadRegion()
    return { MainStore }
  }
}
</script>
