import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SearchResults from '@/components/SearchResults.vue'
import CarouselImage from '@/components/CarouselImage.vue'
import UploadImage from '@/components/UploadImage'
import DisplayGroup from '@/components/DisplayGroup'
import CreateGroup from '@/components/CreateGroup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
     path:'/search-results',
      name:'SearchResults',
      component:SearchResults
    },
    {
      path:'/carousel-image/:id',
      name:'CarouselImage',
      component:CarouselImage
    },
    {
      path:'/upload-image',
      name:'UploadImage',
      component:UploadImage
    },
    {
      path:'/group-display',
      name:'DisplayGroup',
      component: DisplayGroup
    },
    {
      path:'/create-group',
      name:'CreateGroup',
      component:CreateGroup
    }

  ]
})
