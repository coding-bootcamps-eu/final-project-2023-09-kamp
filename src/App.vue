<template>
  <RouterView />
</template>

<script>
import { useMainStore } from '@/stores/mainStore.js'

export default {
  setup() {
    const mainStore = useMainStore()
    return { mainStore }
  },
  // lifecycle hook, ausführung bei erstellung der Instanz in der oder mounted()???
  created() {
    this.mainStore.loadDestination()
  }
}
</script>
