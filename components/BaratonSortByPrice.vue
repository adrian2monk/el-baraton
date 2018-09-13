<template>
<v-tooltip top style="float: right">
  <v-btn
    @click.stop="sort"
    flat icon
    color="primary"
    slot="activator">
    <v-icon small v-show="sorted && order">arrow_drop_up</v-icon>
    <v-icon small v-show="sorted && !order">arrow_drop_down</v-icon>
    <v-icon>attach_money</v-icon>
  </v-btn>
  <span>Ordenar por precio</span>
</v-tooltip>
</template>

<script>
export default {
  data () {
    return {
      order: true
    }
  },
  computed: {
    sorted () {
      return this.$store.state.sorted.price
    }
  },
  methods: {
    sort () {
      this.$store.commit('sortByPrice', this.order)
      this.order = !this.order
    }
  }
}
</script>

