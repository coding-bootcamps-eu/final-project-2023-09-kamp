<template>
  <div>
    <h1>{{ destination }}</h1>
    <main>
      <article>
        <div class="img-container">
          <img :src="getImgSrc(destination)" :alt="destination.altText" class="img" />
        </div>
        <p>
          <small>{{ $route }}</small>
        </p>
        <p class="text-container">{{ destination.description }}</p>
        <section>
          <h2>Öffnungszeiten</h2>
          <p>{{ destination.openingTime }} - {{ destination.closingTime }}</p>
        </section>
        <section>
          <h2>Kosten</h2>
          <p>{{ destination.price }}</p>
        </section>
        <section>
          <h2>Ort</h2>
          <div class="map-outer-container">
            <div class="map-container" ref="map"></div>
          </div>
        </section>
      </article>
    </main>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  data() {
    return {
      destination: {}
    }
  },
  async created() {
    const response = await fetch('http://localhost:8080/destinations' + this.route.params.id)
    this.destination = await response.json()
  },

  methods: {
    getImgSrc(destination) {
      if (destination.imgSrc) {
        return `http://localhost:3333/${destination.imgSrc}`
      } else {
        return 'http://localhost:3333/img/destinations/ChineseGardenMunich.jpg'
      }
    }

    /*
    initMap(coordinates) {
      this.map = L.map(this.$refs.map).setView(coordinates, 13)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map)

      L.marker(coordinates).addTo(this.map).bindPopup(this.destination.name).openPopup()
    }*/
  },
  /*
  mounted() {
    this.fetchDestination()

    this.map = L.map(this.$refs.map).setView([51.505, -0.09], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map)

    this.destinations.forEach((destination) => {
      if (destination.coordinates) {
        L.marker(destination.coordinates).addTo(this.map).bindPopup(destination.name).openPopup()
      }
    })
  }*/
  mounted() {
    this.map = L.map(this.$refs.map).setView([51.505, -0.09], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map)

    const destinations = [
      { name: 'Alpen', coordinates: [47.4215, 10.9856] },
      { name: 'Konstanz', coordinates: [47.6779, 9.1732] }
    ]

    destinations.forEach((destination) => {
      L.marker(destination.coordinates).addTo(this.map).bindPopup(destination.name).openPopup()
    })
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
