import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', {
  state() {
    return {
      regions: [],
      selectedRegionId: null,
      disabilities: [],
      selectedDisabilitiesId: [],
      destinations: [],
      selectedDestinationId: null
    }
  },
  actions: {
    loadRegion() {
      fetch('http://localhost:3333/regions')
        .then((response) => response.json())
        .then((jsonData) => {
          this.regions = jsonData
        })
    },
    loadDestination() {
      fetch('http://localhost:3333/destinations')
        .then((response) => response.json())
        .then((jsonData) => {
          this.destinations = jsonData
        })
    },
    loadDisability() {
      fetch('http://localhost:3333/disabilities')
        .then((response) => response.json())
        .then((jsonData) => {
          this.disabilities = jsonData
        })
    }
  }
})
