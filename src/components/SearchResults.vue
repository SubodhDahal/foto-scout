<template>
  <div>
    <v-app>
      <v-container>

          <v-layout row justify-center>

              <v-flex xs12 sm6>
                <v-carousel>

                  <v-carousel-item
                    v-for="item in items"
                    :src="item.imageUrl"
                    :key="item.id"
                     >
                    <div class="title">
                      {{ item.title }}
                    </div>

                  </v-carousel-item>

                </v-carousel>
              </v-flex>

          </v-layout>



      </v-container>
    </v-app>
  </div>
</template>

<script>
  /* eslint-disable padded-blocks */

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

<style>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
</style>
