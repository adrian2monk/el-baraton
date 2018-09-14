<template>
<v-hover>
  <v-card
    slot-scope="{ hover }"
    class="mx-auto"
    color="warning" dark tile>
    <v-card-title primary-title class="text-capitalize pb-0">
      <div class="headline">{{ product.name }}</div>
      <v-icon 
        v-if="product.available"
        color="primary"
        class="ml-1 mt-1"
        style="float: right"
        small
      >check_circle</v-icon>
    </v-card-title>
    <v-card-text>
      <p
        class="font-weight-bold mb-0 text--secondary"
        style="font-size: 1.3em"
      >{{ product.price }}</p>
      <v-fab-transition>
        <v-btn
          @click="shop"
          v-show="hover"
          small
          absolute
          dark fab bottom right
          color="accent darken-1"
          class="mb-5"
        >
          <v-icon>shopping_cart</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card-text>
    <v-divider light></v-divider>
    <v-card-actions>
      <span class="font-weight-bold">Cant.</span>
      <span class="ml-1 error--text" style="font-size: 1.5em">{{ product.quantity }}</span>
    </v-card-actions>
  </v-card>
</v-hover>
</template>

<script>
export default {
  props: {
    product: {
      type: Object
    }
  },
  methods: {
    shop () {
      const count = this.$store.state.shopping.length
      this.$store.commit('addToCart', {
        quantity: 1,
        subtotal: parseFloat(this.product.price.substring(1)),
        product: this.product
      })
      if (this.$store.state.exists) {
        this.$emit('productAddToCart', {
          type: 'success',
          message: `Se actualizó la cantidad a comprar de ${this.product.name}. ¡Gracias por su elección!`
        })
      } else if (count < this.$store.state.shopping.length) {
        this.$emit('productAddToCart', {
          type: 'info',
          message: 'El producto ha sido añadido al carrito de compras. Podrá hacer modificaciones a su pedido cuándo lo desee.'
        })
      } else {
        this.$emit('productAddToCart', {
          type: 'error',
          message: 'El producto no tiene disponibilidad en estos momentos. Inténtelo más tarde.'
        })
      }
    }
  }
}
</script>
