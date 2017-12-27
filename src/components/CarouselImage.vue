<template>
  <div class="container">
    <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                img-width="1024"
                img-height="480"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
    >
      <b-carousel-slide v-for="item in items" :img-src="item.imageUrl" :key="item.id"></b-carousel-slide>
    </b-carousel>
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
