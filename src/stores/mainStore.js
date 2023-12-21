import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', {
  state() {
    return { regions: [], selectedRegionId: null } //id
  },
  actions: {
    loadRegion() {
      fetch('http://localhost:3333/regions')
        .then((response) => response.json())
        .then((jsonData) => {
          this.regions = jsonData
        })
    }
  }
})
