<template>
  <v-layout column justify-center>
    <baraton-filters-product-list />
    <v-flex wrap>
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
    </v-flex>
    <v-subheader class="title">Productos filtrados por categoría</v-subheader>
    <v-divider></v-divider>
    <baraton-product-list :products="products"/>
  </v-layout>
</template>

<script>
import BaratonFiltersProductList from '../../components/BaratonFiltersProductList'
import BaratonProductList from '../../components/BaratonProductList'

export default {
  components: {
    BaratonFiltersProductList,
    BaratonProductList
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
