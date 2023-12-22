<template>
  <div>
    <h1>Ergebnisse</h1>
    <p>Klicke auf dein gewünschtes Ergebnis:</p>
    <ul>
      <li v-for="destination in filteredDestinations" :key="destination.id">
        <router-link :to="`/detail/${destination.id}`">zum Erlebnis</router-link>

        <div>
          <img
            :src="`http://localhost:3333/` + destination.imgSrc"
            :alt="destination.altText"
            style="max-width: 100%"
          />
          <h2>{{ destination.name }}</h2>
          <p>Category: {{ destination.category }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { useMainStore } from '../stores/mainStore.js'
import { computed, onMounted, watch } from 'vue'

export default {
  setup() {
    const mainStore = useMainStore()

    const filteredDestinations = computed(() => {
      const selectedRegionId = mainStore.selectedRegionId
      const selectedDisabilities = mainStore.selecteddisabilitiesId

      console.log(selectedRegionId)
      console.log(selectedDisabilities)

      console.log(mainStore.destinations.length)
      console.log(mainStore.destinations)

      let destinationsToFilter = mainStore.destinations

      if (mainStore.filteredDestinations && mainStore.filteredDestinations.length > 0) {
        destinationsToFilter = mainStore.filteredDestinations
      }

      const result = destinationsToFilter.filter((destination) => {
        console.log(destination)

        //Prüfung ob die Region übereinstimmt oder keien Region ausgewählt
        const regionMatch = !selectedRegionId || destination.regionId === selectedRegionId

        //Prüfung ob disabilities übereinstimmen
        let destinationDisabilities

        // muss in array
        if (Array.isArray(destination.disabilityId)) {
          destinationDisabilities = destination.disabilityId
        } else {
          destinationDisabilities = [destination.disabilityId]
        }

        const disabilityMatch =
          selectedDisabilities.length === 0 ||
          selectedDisabilities.every((selectedDisability) =>
            destinationDisabilities.includes(selectedDisability)
          )

        return regionMatch && disabilityMatch
      })

      console.log(result)

      return result
    })

    onMounted(() => {
      mainStore.loadDestination()
    })

    // Log the filteredDestinations value inside onMounted
    watch(filteredDestinations, (newVal) => {
      console.log('Filtered Destinations:', newVal)
    })

    return { mainStore, filteredDestinations }
  }
}
</script>
