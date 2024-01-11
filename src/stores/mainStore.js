import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', {
  state() {
    return {
      regions: [],
      selectedRegionId: '',
      disabilities: [],
      selectedDisabilitiesId: [],
      destinations: [],
      selectedDestinationId: null,
      isHighContrastMode: false
    }
  },
  actions: {
    loadRegion() {
      fetch('https://23-september.kamp.api.cbe.uber.space/regions')
        .then((response) => response.json())
        .then((jsonData) => {
          this.regions = jsonData
        })
    },
    async loadDestination() {
      try {
        const response = await fetch('https://23-september.kamp.api.cbe.uber.space/destinations')
        const jsonData = await response.json()
        this.destinations = jsonData
      } catch (error) {
        console.error('Fehler beim Laden der Ziele:', error)
        throw error
      }
    },
    loadDisability() {
      fetch('https://23-september.kamp.api.cbe.uber.space/disabilities')
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
    },
    loadHighContrastMode() {
      // Check if high contrast mode preference is stored in localStorage
      const storedHighContrastMode = localStorage.getItem('highContrastMode')

      // If the preference is stored, update the store accordingly
      if (storedHighContrastMode !== null) {
        this.isHighContrastMode = JSON.parse(storedHighContrastMode)
      }
    },

    toggleHighContrastMode() {
      this.isHighContrastMode = !this.isHighContrastMode
      // Update localStorage to store the preference
      localStorage.setItem('highContrastMode', JSON.stringify(this.isHighContrastMode))
    }
  }
})
