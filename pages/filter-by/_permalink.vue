<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <baraton-filters-product-list />
      <v-subheader class="primary--text font-weight-bold pa-0">Encuentre a uno de sus favoritos</v-subheader>
      <v-autocomplete
        :items="products"
        no-data-text="No se encontraron similares"
        item-text="name"
        v-model="selected"
        box
        clearable
        full-width
        return-object
      ></v-autocomplete>
      <v-subheader class="title">Productos filtrados por categoría</v-subheader>
      <baraton-sort-by-price />
      <baraton-sort-by-quantity />
      <baraton-sort-by-availability />
      <v-divider></v-divider>
      <baraton-product-list :products="products"/>
    </v-flex>
  </v-layout>
</template>

<script>
import BaratonFiltersProductList from '~/components/BaratonFiltersProductList'
import BaratonProductList from '~/components/BaratonProductList'
import BaratonSortByPrice from '~/components/BaratonSortByPrice'
import BaratonSortByQuantity from '~/components/BaratonSortByQuantity'
import BaratonSortByAvailability from '~/components/BaratonSortByAvailability'

export default {
  components: {
    BaratonFiltersProductList,
    BaratonProductList,
    BaratonSortByPrice,
    BaratonSortByQuantity,
    BaratonSortByAvailability
  },
  async fetch ({ store, params }) {
    await store.dispatch('changeCategory', params.permalink)
  },
  data () {
    return {
      selected: false
    }
  },
  computed: {
    products () {
      return this.selected ? [this.selected] : this.$store.state.products
    }
  }
}
</script>
