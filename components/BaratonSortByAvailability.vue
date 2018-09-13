<template>
<v-tooltip top style="float: right">
  <v-btn
    @click.stop="sort"
    flat icon
    color="accent"
    slot="activator">
    <v-icon small v-show="sorted && order">arrow_drop_up</v-icon>
    <v-icon small v-show="sorted && !order">arrow_drop_down</v-icon>
    <v-icon>track_changes</v-icon>
  </v-btn>
  <span>Ordenar por disponibilidad</span>
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
      return this.$store.state.sorted.availability
    }
  },
  methods: {
    sort () {
      this.$store.commit('sortByAvailability', this.order)
      this.order = !this.order
    }
  }
}
</script>

