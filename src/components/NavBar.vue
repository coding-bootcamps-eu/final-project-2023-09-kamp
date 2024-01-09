<template>
  <nav>
    <router-link to="/"><img src="/src/assets/svg/home.svg" />Home</router-link>

    <button @click="goBack">Zurück <img src="/src/assets/svg/arrow_left.svg" /></button>
  </nav>
</template>

<script>
export default {
  methods: {
    goBack() {
      window.history.back()
    }
  }
}
</script>
