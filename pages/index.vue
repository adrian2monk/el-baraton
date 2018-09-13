<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      </div>
      <baraton-filters-product-list />
      <pre class="mt-5">{{ products }}</pre>
    </v-flex>
  </v-layout>
</template>

<script>
import BaratonFiltersProductList from '../components/BaratonFiltersProductList'

export default {
  components: {
    BaratonFiltersProductList
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
