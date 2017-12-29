<template>
  <div class="container">
    <div class="row">
      <div v-for="item in items" class="col-md-4">
         <router-link :to="{name:'CarouselImage',params:{id:item.id}}">
           <img :src="item.imageUrl" class="img-fluid" height="250"/>
         </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {imageUrl: 'https://media.timeout.com/images/103678916/image.jpg', id: '1', title: 'Newyork'},
          {
            imageUrl: 'https://www.skr.de/fileadmin/_processed_/nepal_reisen_28198ee3a1.jpg',
            id: '2',
            title: 'Nepal'
          },
          {
            imageUrl: 'http://s3.amazonaws.com/libapps/accounts/112538/images/Taj_Mahal.png',
            id: '3',
            title: 'India'
          }

        ]
      }
    }
  }

</script>


