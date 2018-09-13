<template>
<v-container class="mt-5" fluid grid-list-md>
  <v-layout row wrap>
    <v-flex
      :key="product.id"
      v-for="product in products"
      md3 sm6
    >
      <baraton-product-tile :product="product" />
    </v-flex>
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
  }
}
</script>

