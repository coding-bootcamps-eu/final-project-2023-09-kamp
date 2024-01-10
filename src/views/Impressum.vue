<template>
  <div>
    <navbar />
    <div class="impressum-container">
      <h2>Impressum</h2>
      <p>KAMP</p>
      <p>Musterstraße 123</p>
      <p>12345 Musterstadt</p>
      <p>Telefon: 01234 567890</p>
      <p>E-Mail: info@kamp.de</p>
      <p>Umsatzsteuer-ID: DE123456789</p>
    </div>
  </div>
</template>

<router-link to="/ImpressumView">Impressum</router-link>

<script>
import { useMainStore } from '@/stores/mainStore'
import NavBar from '@/components/NavBar.vue'

export default {
  data() {
    const mainStore = useMainStore()
    return { mainStore }
  },
  components: {
    navbar: NavBar
  }
}
</script>

<style scoped></style>
