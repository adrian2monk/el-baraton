<template>
<v-container class="mt-5" fluid grid-list-md>
  <v-layout row wrap>
    <v-flex
      :key="product.id"
      v-for="product in products"
      md3 sm6
    >
      <baraton-product-tile
        :product="product"
        @productAddToCart="notify($event)" />
    </v-flex>
    <v-snackbar
      :color="type"
      v-model="snackbar"
      top
      auto-height
    >
      {{ message }}
      <v-btn
        flat
        @click="snackbar = false"
      >
        Cerrar
      </v-btn>
    </v-snackbar>
  </v-layout>
</v-container>
</template>

<script>
import BaratonProductTile from '../components/BaratonProductTile'

export default {
  components: {
    BaratonProductTile
  },
  props: {
    products: Array
  },
  data () {
    return {
      snackbar: false,
      message: '',
      type: null
    }
  },
  methods: {
    notify ({ type, message }) {
      this.message = message
      this.type = type
      this.snackbar = true
    }
  }
}
</script>

