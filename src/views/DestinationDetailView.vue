<template>
  <div>
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

export default {
  setup() {
    const mainStore = useMainStore()
    return { mainStore }
  },
  data() {
    return {
      selectedDestination: {},
      map: null
    }
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
    const selectedDestinationId = this.$route.params.id
    //selectedDestination definieren
    if (selectedDestinationId) {
      this.selectedDestination = this.mainStore.destinations.find(
        (destination) => destination.id === selectedDestinationId //.find = durchsucht array nach passender ID
      )
    } else {
      console.error('Kein Erlebnis gefunden!')
    }
  },
  methods: {
    getImgSrc(destination) {
      return `http://localhost:3333/${destination.imgSrc}`
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
