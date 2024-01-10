<template>
  <nav class="nav">
    <button @click="goBack" class="nav-btn">
      <img src="/src/assets/svg/arrow_left.svg" />
    </button>

    <router-link to="/"><img src="/src/assets/svg/home.svg" class="nav-btn" /></router-link>
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
