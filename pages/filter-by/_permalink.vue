<template>
  <pre>{{ products }}</pre>
</template>

<script>
export default {
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
