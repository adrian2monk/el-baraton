<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <img src="/logo_transparent.png" alt="El Baraton" width="300" />
      </div>
      <baraton-filters-product-list />
      <v-subheader class="title mt-2">Productos</v-subheader>
      <baraton-sort-by-price />
      <baraton-sort-by-quantity />
      <baraton-sort-by-availability />
      <v-divider></v-divider>
      <baraton-product-list :products="products"/>
    </v-flex>
  </v-layout>
</template>

<script>
import BaratonFiltersProductList from '../components/BaratonFiltersProductList'
import BaratonProductList from '../components/BaratonProductList'
import BaratonSortByPrice from '../components/BaratonSortByPrice'
import BaratonSortByQuantity from '../components/BaratonSortByQuantity'
import BaratonSortByAvailability from '../components/BaratonSortByAvailability'

export default {
  components: {
    BaratonFiltersProductList,
    BaratonProductList,
    BaratonSortByPrice,
    BaratonSortByQuantity,
    BaratonSortByAvailability
  },
  async fetch ({ store }) {
    await store.dispatch('getProducts')
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>
