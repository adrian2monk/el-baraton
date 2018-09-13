<template>
  <pre>{{ products }}</pre>
</template>

<script>
import BaratonFiltersProductList from '../../components/BaratonFiltersProductList'

export default {
  components: {
    BaratonFiltersProductList
  },
  async fetch ({ store, params }) {
    await store.dispatch('changeCategory', params.permalink)
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>
