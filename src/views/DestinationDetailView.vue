<template>
  <div>
    <button @click="readPage">Seite vorlesen</button>

    <navbar />
    <template v-if="selectedDestination">
      <h1>{{ selectedDestination.name }}</h1>
      <div class="img-container">
        <img :src="getImgSrc(selectedDestination)" :alt="selectedDestination.altText" />
      </div>
      <p>
        <small>{{ selectedDestination.category }}</small>
      </p>
      <p class="text-container">{{ selectedDestination.description }}</p>
      <section>
        <h2>Öffnungszeiten</h2>
        <p>{{ selectedDestination.openingTime }} - {{ selectedDestination.closingTime }}</p>
      </section>
      <section>
        <h2>Kosten</h2>
        <p>{{ selectedDestination.price }}</p>
      </section>
    </template>
    <section>
      <h2>Ort</h2>
      <div class="map-outer-container">
        <div class="map-container" ref="map"></div>
      </div>
    </section>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useMainStore } from '../stores/mainStore.js'
import NavBar from '@/components/NavBar.vue'

export default {
  setup() {
    const mainStore = useMainStore()
    return { mainStore }
  },
  data() {
    return {
      map: null,
      selectedDestinationId: null
    }
  },

  components: {
    navbar: NavBar
  },

  async mounted() {
    this.map = L.map(this.$refs.map).setView([51.505, -0.09], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map)

    try {
      const response = await fetch('http://localhost:3333/destinations')
      const data = await response.json()

      data.forEach((destination) => {
        L.marker(destination.coordinates).addTo(this.map).bindPopup(destination.name).openPopup()
      })

      /*
      this.selectedDestination = data[0]
      */

      if (this.selectedDestination) {
        const [latitude, longitude] = this.selectedDestination.coordinates
        this.map.setView([latitude, longitude], 13)
      }
    } catch (error) {
      console.error('Fehler beim Laden der Daten:', error)
    }
  },
  created() {
    this.selectedDestinationId = this.$route.params.id
    //selectedDestination definieren
  },
  computed: {
    selectedDestination() {
      return this.mainStore.destinations.find(
        (destination) => destination.id === this.selectedDestinationId
      )
    }
  },
  methods: {
    getImgSrc(destination) {
      return `http://localhost:3333/${destination.imgSrc}`
    },
    readPage() {
      if ('speechSynthesis' in window) {
        const destinationName = this.selectedDestination.name
        const OpeningTimes =
          this.selectedDestination.openingTime + ' - ' + this.selectedDestination.closingTime
        const destinationDescr = this.selectedDestination.description
        const altText = this.selectedDestination.altText
        const destinationPrice = this.selectedDestination.price
        const indoorOutdoor = this.selectedDestination.category

        if (window.speechSynthesis.speak) {
          const output = new SpeechSynthesisUtterance(
            destinationName +
              ' ' +
              indoorOutdoor +
              ' ' +
              altText +
              ' ' +
              destinationDescr +
              ' ' +
              'Öffnungszeiten' +
              OpeningTimes +
              ' ' +
              'Kosten' +
              destinationPrice
          )

          output.lang = 'de-DE'

          window.speechSynthesis.speak(output)
        } else {
          console.error('Die SpeechSynthesisUtterance-Methode wird nicht unterstützt.')
        }
      } else {
        console.error('Die Web Speech API wird in diesem Browser nicht unterstützt.')
      }
    }
  }
}
</script>
<style scoped>
body {
  margin: 50px;
}

.img-container {
  display: flex;
  justify-content: center;
}

.img-container img {
  width: 100%;
  border-radius: 10px;
}

.text-container {
  text-align: justify;
  line-height: 150%;
}

.map-container {
  height: 600px;
  width: 100%;
  border-radius: 10px;
}

.map-outer-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

@media (max-width: 800px) {
  .map-container {
    height: 15rem;
    width: 100%;
    border-radius: 10px;
  }

  .map-outer-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
}
</style>
