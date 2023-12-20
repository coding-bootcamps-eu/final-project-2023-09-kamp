import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DisabilitySelectionView from '../views/DisabilitySelectionView'
import DestinationsPageView from '../views/DestinationsPageView'
import DestinationDetailView from '../views/DestinationDetailView'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/selection',
      name: 'selection',
      component: DisabilitySelectionView
    },
    {
      path: '/destinations',
      name: 'destinations',
      component: DestinationsPageView
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DestinationDetailView
    }
  ]
})

export default router
