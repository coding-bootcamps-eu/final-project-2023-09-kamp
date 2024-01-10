import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DisabilitySelectionView from '../views/DisabilitySelectionView.vue'
import DestinationsPageView from '../views/DestinationsPageView.vue'
import DestinationDetailView from '../views/DestinationDetailView.vue'
import ImpressumView from '../views/ImpressumView.vue'

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
    },
    {
      path: '/impressum',
      name: 'impressum',
      component: ImpressumView
    }
  ]
})

export default router
