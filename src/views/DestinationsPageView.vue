<template>
  <div>
    <h1>Ergebnisse</h1>
    <p>Klicke auf dein gewünschtes Ergebnis:</p>
    <ul>
      <li
        v-for="destination in filteredDestinations"
        :key="destination.id"
        class="destination-list"
        @click="selectDestination(destination.id)"
      >
        <router-link :to="`/detail/${destination.id}`">
          <h2>{{ destination.name }}</h2>
          <figure class="img-figure">
            <img :src="getImgSrc(destination)" :alt="destination.altText" class="img" />
            <figcaption class="category">{{ destination.category }}</figcaption>
          </figure>
        </router-link>
        <!-- :to={name: 'detail, params:{destination.id}} -->
      </li>
    </ul>
  </div>
</template>

<script>
import { useMainStore } from '../stores/mainStore.js'

export default {
  data() {
    return {
      mainStore: useMainStore(),
      filteredDestinations: []
    }
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
      return `http://localhost:3333/${destination.imgSrc}`
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
    loadDestinations() {
      this.mainStore.loadDestination().then(() => {
        // Nach laden der Daten filtern der Ziele => im Mainstore loadDestination() mit promise!!
        this.filterDestinations()
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
    this.loadDestinations() // laden der Reiseziele und speichern im mainstore, s.o. in methods
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
  list-style-type: none;
  color: var(--text-color);
}
.img-figure {
  margin: 0;
  position: relative;
  margin-bottom: 1rem;
}

.img {
  width: 100%;
  height: 20rem;
  object-fit: cover;
  border-radius: 1rem;
}

.category {
  position: absolute;
  right: 1rem;
  top: 1rem;
  background-color: var(--btn-color);
  color: var(--highlight-color);
  padding: 0.5rem 0.5rem;
  margin: 0;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
}

.btn-to-detail {
  background-color: var(--btn-color);
  color: var(--btn-text-color);
  padding: 0.5rem 0.5rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  border: 0.2rem solid var(--btn-color);
  text-decoration: none;
}

.btn-to-detail:focus:active {
  border: 0.2rem solid var(--highlight-color);
  outline: none;
}
</style>
