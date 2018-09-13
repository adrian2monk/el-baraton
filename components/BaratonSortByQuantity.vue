<template>
<v-tooltip top style="float: right">
  <v-btn
    @click.stop="sort"
    flat icon
    color="secondary"
    slot="activator">
    <v-icon small v-show="sorted && order">arrow_drop_up</v-icon>
    <v-icon small v-show="sorted && !order">arrow_drop_down</v-icon>
    <v-icon>bar_chart</v-icon>
  </v-btn>
  <span>Ordenar por cantidad</span>
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
      return this.$store.state.sorted.quantity
    }
  },
  methods: {
    sort () {
      this.$store.commit('sortByQuantity', this.order)
      this.order = !this.order
    }
  }
}
</script>

