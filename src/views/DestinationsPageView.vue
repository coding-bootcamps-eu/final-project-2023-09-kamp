<template>
  <div>
    <navbar />

    <h1 class="page-title">Ergebnisse</h1>
    <p class="flowing-text">Klicke auf dein gewünschtes Erlebnis:</p>
    <ul v-if="filteredDestinations.length > 0" class="destination-list">
      <li
        v-for="destination in filteredDestinations"
        :key="destination.id"
        class="destination"
        @click="selectDestination(destination.id)"
      >
        <router-link :to="`/detail/${destination.id}`" class="destinations-detail-router-link">
          <h2 class="subheaders">{{ destination.name }}</h2>
          <small class="subtitle">{{ destination.subtitle }}</small>
          <figure class="img-figure">
            <img :src="getImgSrc(destination)" :alt="destination.altText" class="img" />
            <figcaption class="category">{{ destination.category }}</figcaption>
          </figure>
        </router-link>
        <!-- :to={name: 'detail, params:{destination.id}} -->
      </li>
    </ul>
    <p v-else>Leider gibt es für deine Suche keine passenden Erlebnisse.</p>
  </div>
</template>

<script>
import { useMainStore } from '@/stores/mainStore.js'

import NavBar from '@/components/NavBar.vue'

export default {
  setup() {
    const mainStore = useMainStore()
    return { mainStore }
  },

  data() {
    return {
      filteredDestinations: []
    }
  },
  components: {
    navbar: NavBar
  },
  computed: {
    //Region aus MainStore laden
    selectedRegionId() {
      return this.mainStore.selectedRegionId
    },
    // Disabilities aus MainStore laden
    selectedDisabilities() {
      return this.mainStore.selectedDisabilitiesId
    }
  },

  methods: {
    // funktion um img aus api zu laden
    getImgSrc(destination) {
      return `https://23-september.kamp.api.cbe.uber.space/${destination.imgSrc}`
    },

    filterDestinations() {
      let destinationsToFilter = this.mainStore.destinations //  variable für funktion mit Liste aller Destinations aus Mainstore

      if (this.mainStore.filteredDestinations && this.mainStore.filteredDestinations.length > 0) {
        // wenn es bereits gefilterte Werte im Mainstore gibt dann diese gefilterten Werte verwenden, ansonsten ursprüngliche liste aller Ziele
        destinationsToFilter = this.mainStore.filteredDestinations
      }

      // .filter-Methode um neues Array mit destinations zu erstellen die den enthaltenen Bedingungen entsprechen
      this.filteredDestinations = destinationsToFilter.filter((destination) => {
        const regionMatch = !this.selectedRegionId || destination.regionId === this.selectedRegionId // Überprüfung der Regionenauswahl

        // disabilities in Array speichern
        let destinationDisabilities

        if (Array.isArray(destination.disabilityId)) {
          destinationDisabilities = destination.disabilityId // ist bereits array
        } else {
          destinationDisabilities = [destination.disabilityId] // ansonsten array erstellen
        }

        // Überprüfen ob disabilties in den destinations vorhanden
        const disabilityMatch =
          this.selectedDisabilities.length === 0 ||
          this.selectedDisabilities.every(
            (
              selectedDisability // .every() stellt sicher dass alle ausgewählten disabilities auf destinations zutreffen
            ) => destinationDisabilities.includes(selectedDisability)
          )

        return regionMatch && disabilityMatch
      })
    },

    selectDestination(destinationId) {
      // Hier setzt du die selectedDestinationId im mainStore
      this.mainStore.setSelectedDestination(destinationId)
      console.log(destinationId)
    }
  },
  // lifecycle hook, ausführung bei erstellung der Instanz in der oder mounted()???
  created() {
    this.filterDestinations() // laden der gefilterten Reiseziele, s.o. in methods
  },
  watch: {
    filteredDestinations(newValue) {
      console.log('Filtered Destinations:', newValue) // Änderungen in Konsole anzeigen
    }
  }
}
</script>

<style scoped>
.destination-list {
  padding: 0;
}
.destination {
  list-style-type: none;
  margin-bottom: 2rem;
}

.destinations-detail-router-link {
  text-decoration: none;
  color: var(--text-color);
}

.img-figure {
  margin: 0;
  position: relative;
  margin-bottom: 1rem;
}

.img {
  width: 100%;
  height: 12rem;
  object-fit: cover;
  border-radius: 1rem;
  margin-top: 0.5rem;
}

.category {
  position: absolute;
  right: 0.5rem;
  top: 1rem;
  background-color: var(--btn-color);
  color: var(--highlight-color);
  padding: 0.5rem 0.5rem;
  margin: 0;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
}
</style>
