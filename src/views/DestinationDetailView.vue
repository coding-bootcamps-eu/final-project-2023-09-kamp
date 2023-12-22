<template>
  <header>
    <article>
      <h1 v-for="region in regions" :key="region.id">{{ region.name }}</h1>
    </article>
  </header>
  <main>
    <article v-for="destination in destinations" :key="destination.id">
      <h2>{{ destination.name }}</h2>
      <div class="img-container">
        <img :src="destination.imgSrc" alt="Bild" />
      </div>
      <p>
        <small>{{ destination.category }}</small>
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
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
//import NavBar from "./components/Navbar.vue";

export default {
  name: 'HomeView',
  components: {
    //NavBar,
  },
  data() {
    return {
      regions: [],
      destinations: []
    }
  },
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
  },
  created() {
    fetch('http://localhost:8080/destinations')
      .then((response) => response.json())
      .then((jsonData) => {
        this.destinations = jsonData
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
