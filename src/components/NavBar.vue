<template>
  <nav>
    <router-link to="/">Home</router-link>
    <button @click="goBack">Zurück</button>
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
