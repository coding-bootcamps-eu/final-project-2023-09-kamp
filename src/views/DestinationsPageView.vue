<template>
  <NavBar />
  <div>
    <header>
      <article>
        <h1>Ergebnisse</h1>
        <p>Klicke auf dein gewünschtes Erlebnis:</p>
      </article>
    </header>
    <main>
      <!-- v-model="MainStore.selectedDestinationId" ausgewählte Filter übertragen und zeigen in for-Schleife => destiantion in MainStore.selecteddisabilitiesId -->
      <!-- @click="showDetailPage" -->
      <ul>
        <li
          v-for="destination in filteredDestinations"
          :key="destination.id"
          :value="destination.id"
        >
          <router-link to="'/detail/:' + destination.id">zum Erlebnis</router-link>
          <img :src="destination.imgSrc" :alt="destination.altText" />
          <h2>{{ destination.name }}</h2>
          <p>
            <small>{{ destination.category }}</small>
          </p>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { useMainStore } from '@/stores/mainStore'
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const mainStore = useMainStore()
    const filteredDestinations = ref([])
    const router = useRouter()

    const showDetailPage = (destinationId) => {
      router.push({
        name: 'detail',
        params: { id: destinationId }
      })
    }
    const filterDestinations = () => {
      const selectedRegionId = mainStore.selectedRegionId
      const selectedDisabilities = mainStore.selecteddisabilitiesId || []

      // Example filtering based on region and disabilities
      filteredDestinations.value = mainStore.destinations.filter((destination) => {
        const regionMatch = !selectedRegionId || destination.regionId === selectedRegionId
        const disabilityMatch =
          selectedDisabilities.length === 0 ||
          selectedDisabilities.includes(destination.disabilityId)

        return regionMatch && disabilityMatch
      })
    }

    onMounted(() => {
      mainStore.loadDestination()
    })

    watch([() => mainStore.selectedRegionId, () => mainStore.selecteddisabilitiesId], () => {
      filterDestinations()
    })

    return { mainStore, showDetailPage, filterDestinations, filteredDestinations }
  },
  components: {
    NavBar
  }
}
</script>
