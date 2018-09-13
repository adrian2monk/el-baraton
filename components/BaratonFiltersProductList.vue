<template>
  <v-card ref="form">
    <v-card-title class="headline">¿Qué estás buscando?</v-card-title>
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <v-subheader>Precio</v-subheader>
          </v-flex>
          <v-flex xs3>
            <v-text-field
              :value="price[0]"
              ref="priceMin"
              label="Mínimo"
              prepend-icon="attach_money"
              type="number"
              readonly
              outline
            ></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-range-slider
              :max="priceMax"
              :min="priceMin"
              v-model="price"
              color="secondary"
              class="px-5"
              thumb-label
            ></v-range-slider>
          </v-flex>
          <v-flex xs3>
            <v-text-field
              :value="price[1]"
              ref="priceMax"
              label="Máximo"
              prepend-icon="attach_money"
              type="number"
              readonly
              outline
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex md4>
            <v-subheader>Cantidad</v-subheader>
            <v-text-field
              :rules="[() => !!quantity || 'Se requiere al menos, un elemento']"
              :error-messages="error"
              min="0"
              v-model="quantity"
              ref="quantity"
              label="Cantidad"
              placeholder="+1"
              type="number"
              class="ml-3"
              solo
              required
            ></v-text-field>
          </v-flex>
            
          <v-flex md4 offset-md1>
            <v-subheader>Producto</v-subheader>
            <v-switch 
              label="¿Disponible?"
              ref="available"
              v-model="available"></v-switch>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="pa-3">
      <v-btn flat color="secondary" @click="clearSearch">Limpiar</v-btn>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="doSearch">Listo</v-btn>
    </v-card-actions>
  </v-card> 
</template>

<script>
export default {
  data () {
    return {
      price: [10.00, 100.00],
      quantity: 1,
      available: true,
      error: ''
    }
  },
  computed: {
    form () {
      return {
        priceMin: this.price[0],
        priceMax: this.price[1],
        quantity: this.quantity,
        available: this.available
      }
    },
    priceMin () {
      return this.$store.state.price.min
    },
    priceMax () {
      return this.$store.state.price.max
    }
  },
  watch: {
    quantity () {
      this.error = ''
    }
  },
  methods: {
    async clearSearch () {
      await this.$store.dispatch('getProducts')
    },
    doSearch () {
      this.$store.commit('productByFilter', this.form)
    }
  }
}
</script>
