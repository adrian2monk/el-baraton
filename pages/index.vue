<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      </div>
      <baraton-filters-product-list />
      <baraton-product-list :products="products"/>
    </v-flex>
  </v-layout>
</template>

<script>
import BaratonFiltersProductList from '../components/BaratonFiltersProductList'
import BaratonProductList from '../components/BaratonProductList'

export default {
  components: {
    BaratonFiltersProductList,
    BaratonProductList
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
