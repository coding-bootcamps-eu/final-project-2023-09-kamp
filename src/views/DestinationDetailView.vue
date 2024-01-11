<template>
  <div>
    <navbar />
    <button class="readPageBtn" @click="readPage">Seite vorlesen</button>
    <template v-if="selectedDestination">
      <h1>{{ selectedDestination.name }}</h1>
      <small>{{ selectedDestination.subtitle }}</small>

      <!--img gallery--->
      <div class="carousel slide" id="carouselSwitch" data-bs-wrap="true" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              :src="getImgSrc(selectedDestination)"
              :alt="selectedDestination.altText"
              class="w-100 big-pictures"
            />
          </div>

          <div class="carousel-item" data-bs-interval="3000">
            <img src="@/assets/images/pexels-elevate-3009767_1.jpg" class="w-100" />
          </div>

          <div class="carousel-item">
            <img src="@/assets/images/pexels-elevate-3009746_2.jpg" class="w-100" />
          </div>

          <div class="carousel-item">
            <img src="@/assets/images/pexels-rdne-stock-project-7403005_4.jpg" class="w-100" />
          </div>
        </div>

        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselSwitch"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon"></span>
        </button>

        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselSwitch"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon"></span>
        </button>

        <div class="carousel-indicators">
          <button
            type="button"
            class="active"
            data-bs-target="#carouselSwitch"
            data-bs-slide-to="0"
          >
            <img
              :src="getImgSrc(selectedDestination)"
              :alt="selectedDestination.altText"
              class="w-30 start-img-gallery"
            />
          </button>

          <button type="button" data-bs-target="#carouselSwitch" data-bs-slide-to="1">
            <img
              src="@/assets/images/pexels-elevate-3009767_1.jpg"
              alt="selectedDestination.altText"
              class="w-30"
            />
          </button>

          <button type="button" data-bs-target="#carouselSwitch" data-bs-slide-to="2">
            <img
              src="@/assets/images/pexels-elevate-3009746_2.jpg"
              alt="selectedDestination.altText"
              class="w-30"
            />
          </button>

          <button type="button" data-bs-target="#carouselSwitch" data-bs-slide-to="3">
            <img
              src="@/assets/images/pexels-rdne-stock-project-7403005_4.jpg"
              alt="selectedDestination.altText"
              class="w-30"
            />
          </button>
        </div>
      </div>
      <!--img gallery--->

      <figure>
        <figcaption class="category">
          <small>{{ selectedDestination.category }}</small>
        </figcaption>
      </figure>
      <hr />
      <p class="text-container">{{ selectedDestination.description }}</p>
      <section>
        <h2>Öffnungszeiten:</h2>
        <p>{{ selectedDestination.openingTime }} - {{ selectedDestination.closingTime }} Uhr</p>
      </section>
      <hr />
      <section>
        <h2>Kosten:</h2>
        <p>{{ selectedDestination.price }}</p>
      </section>
      <hr />
      <section>
        <h2>Anfahrt und ÖPNV:</h2>
        <p>{{ selectedDestination.street }}</p>
        <p>{{ selectedDestination.city }}</p>
        <p>{{ selectedDestination.publicTransport }}</p>
      </section>
    </template>

    <section>
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
      const response = await fetch('https://23-september.kamp.api.cbe.uber.space/destinations')
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
      return `https://23-september.kamp.api.cbe.uber.space/${destination.imgSrc}`
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
        const destinationAdress = this.selectedDestination.street
        const destinationCity = this.selectedDestination.city
        const destinationPubTransport = this.selectedDestination.publicTransport
        const destinationSubtitle = this.selectedDestination.subtitle

        if (window.speechSynthesis.speak) {
          const output = new SpeechSynthesisUtterance(
            destinationName +
              ' ' +
              destinationSubtitle +
              '' +
              'Das Erlebnis ist' +
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
              ' ' +
              destinationPrice +
              ' ' +
              'Anfahrt und Öffentliche Verkehrsmittel' +
              destinationAdress +
              ' ' +
              destinationCity +
              ' ' +
              destinationPubTransport
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
.readPageBtn {
  all: unset;
  border-radius: 0.5rem;
  background-color: var(--btn-color, #606e51);
  padding: 4px;
  margin-top: 20px;
  color: white;
  width: 98%;
  text-align: center;
  margin-bottom: 0.5rem;
}

.category {
  right: 1rem;
  top: 1rem;
  background-color: var(--btn-color);
  color: var(--highlight-color);
  padding: 0.5rem 0.5rem;
  margin: 0;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  width: 23%;
}
.carousel-indicators img {
  width: 6rem;
  display: block;
}
.carousel-indicators button {
  width: max-content !important;
}
.carousel-indicators {
  position: unset;
  height: 100px;
  width: auto;
  object-fit: cover;
  gap: 0%;
  margin-bottom: 0px;
}

.carousel-item img {
  height: 300px;
  width: auto;
  object-fit: cover;
}

.carousel-control-prev,
.carousel-control-next {
  height: 20%;
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.788);
  position: absolute;
  top: 25%;
  z-index: 1000;
}

.carousel-indicators img {
  width: 93px;
  height: 70px;
}
.carousel-control-prev {
  left: 3px;
}

.carousel-control-next {
  right: 3px;
}

.carousel-control-prev-icon {
  width: 400px;
  height: 100px;
  opacity: 1;
  filter: invert(100%);
}
.carousel-control-next-icon {
  width: 400px;
  height: 100px;
  opacity: 1;
  filter: invert(100%);
}

.text-container {
  text-align: justify;
  line-height: 150%;
  background-color: rgba(65, 90, 55, 0.113);
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

hr {
  margin-bottom: 7px;
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

@media (max-width: 340px) {
  .carousel-indicators {
    position: unset;
    height: 100px;
    width: auto;
    object-fit: cover;
    gap: 0%;
    flex-wrap: wrap;
    visibility: hidden;
  }
}
</style>
