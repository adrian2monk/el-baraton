<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          :to="statics.home.permalink"
        >
          <v-list-tile-action>
            <v-icon v-html="statics.home.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="statics.home.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <template
          v-for="item in items"
        >
          <v-list-group
            :key="item.id"
            :prepend-icon="item.icon"
            :group="`filter-by${item.permalink}`"
            v-if="item.sublevels"
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title v-text="item.name"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <template v-for="level in item.sublevels">
              <baraton-category-deep-list 
                :key="level.id"
                :category="level"
                v-if="level.sublevels"
              />
              <v-list-tile
                :key="level.id"
                :to="`/filter-by${level.permalink}`"
                v-else
              >
                <v-list-tile-content>
                  <v-list-tile-title v-text="level.name"></v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-icon v-html="level.icon"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list-group>
          <v-list-tile
            :key="item.id"
            :to="`/filter-by${item.permalink}`"
            v-else
          >
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.name"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-list-tile
          :to="statics.about.permalink"
        >
          <v-list-tile-action>
            <v-icon v-html="statics.about.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="statics.about.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app dark :clipped-left="clipped" color="primary">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title class="title" v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-badge
          v-model="badge"
          color="warning"
          left>
          <span slot="badge">{{ cart }}</span>
          <v-icon>shopping_cart</v-icon>
        </v-badge>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <v-alert
          id="baraton-success"
          v-model="alert"
          dismissible
          type="success"
          class="font-weight-bold"
        >
          ¡Gracias! Lo felicitamos por su excelente compra.
        </v-alert>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Cambiar de lugar (click aquí)</v-list-tile-title>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-list two-line subheader>
        <v-subheader class="title primary--text">Resumen</v-subheader>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Importe total</v-list-tile-title>
            <v-list-tile-sub-title>Cantidad de productos</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <div class="text-xs-right">
              <p class="ma-0 accent--text" style="font-size: 2.5em">${{ cost }}</p>
              <p class="ma-0 secondary--text"><span class="font-weight-bold mr-1">Cant.</span>{{ total }}</p>
            </div>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-list two-line subheader>
        <v-subheader class="title secondary--text">Sus compras</v-subheader>
        <v-list-tile
          :key="item.id"
          v-for="(item, i) in checklist">
          <v-list-tile-action>
            <v-checkbox v-model="item.checked" @click.stop="toggleProduct(i)"></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="text-capitalize warning--text">{{ item.product.name }}</v-list-tile-title>
            <v-list-tile-sub-title><span class="font-weight-bold mr-1">Disponibles</span><span class="error--text">{{ item.product.quantity }}</span></v-list-tile-sub-title>
            <p class="ma-0 primary--text">{{ item.product.price }}</p>
          </v-list-tile-content>
          <v-list-tile-action style="flex-direction: row">
            <v-btn
              class="mb-1"
              small flat icon
              @click.stop="decreaseOne(i)">
              <v-icon small>arrow_left</v-icon>
            </v-btn>
            <span style="font-size: 2em">{{ item.quantity }}</span>
            <v-btn
              class="mb-1"
              small flat icon
              @click.stop="addOne(i)">
              <v-icon small>arrow_right</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile color="accent" @click="buy">
          <v-list-tile-content style="align-items: center">
            <p class="ma-0" style="font-size: 2em">COMPRAR</p>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapMutations } from 'vuex'
  import BaratonCategoryDeepList from '../components/BaratonDeepCategoryList.vue'

  export default {
    components: {
      BaratonCategoryDeepList
    },
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        miniVariant: false,
        statics: {
          home: { icon: 'apps', name: 'Todos los productos', permalink: '/' },
          about: { icon: 'bubble_chart', name: 'Acerca de mi', permalink: '/inspire' }
        },
        right: true,
        alert: false,
        rightDrawer: false,
        title: 'Baratón'
      }
    },
    computed: {
      items () {
        return this.$store.state.categories
      },
      total () {
        return this.checklist
          .filter(psh => psh.checked)
          .reduce((acc, psh) => acc + psh.quantity, 0)
      },
      cost () {
        return this.checklist
          .filter(psh => psh.checked)
          .reduce((acc, psh) => acc + (parseFloat(psh.quantity) * psh.subtotal), 0.00).toFixed(1)
      },
      checklist () {
        return this.$store.state.shopping
      },
      cart () {
        return this.$store.state.shopping.length
      },
      badge () {
        return this.cart > 0
      }
    },
    methods: {
      ...mapMutations([
        'toggleProduct',
        'addOne',
        'decreaseOne'
      ]),
      buy () {
        this.alert = true
        this.rightDrawer = false
        this.$vuetify.goTo(0)
        this.$store.commit('flushCart')
      }
    }
  }
</script>
