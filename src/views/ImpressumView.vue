<template>
  <div class="impressum-container">
    <h2>Impressum</h2>
    <p>KAMP</p>
    <p>Musterstraße 123</p>
    <p>12345 Musterstadt</p>
    <p>Telefon: 01234 567890</p>
    <p>E-Mail: info@kamp.de</p>
    <p>Umsatzsteuer-ID: DE123456789</p>
  </div>
</template>

<script>
import { useMainStore } from '@/stores/mainStore'
import NavBar from '@/components/NavBar.vue'

export default {
  setup() {
    const mainStore = useMainStore()
    return { mainStore }
  },
  data() {
    components: {
      navbar: NavBar
    }
  }
}
</script>

<style scoped></style>
