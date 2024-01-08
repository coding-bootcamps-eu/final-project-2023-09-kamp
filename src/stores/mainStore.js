import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', {
  state() {
    return {
      regions: [],
      selectedRegionId: '',
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
    async loadDestination() {
      try {
        const response = await fetch('http://localhost:3333/destinations')
        const jsonData = await response.json()
        this.destinations = jsonData
      } catch (error) {
        console.error('Fehler beim Laden der Ziele:', error)
        throw error
      }
    },
    loadDisability() {
      fetch('http://localhost:3333/disabilities')
        .then((response) => response.json())
        .then((jsonData) => {
          this.disabilities = jsonData
        })
    },
    setSelectedRegion(regionId) {
      this.selectedRegionId = regionId
    },
    setSelectedDisabilities(disabilities) {
      this.selecteddisabilitiesId = disabilities
    },
    setSelectedDestination(destinationId) {
      this.selectedDestinationId = destinationId
    }
  }
})
