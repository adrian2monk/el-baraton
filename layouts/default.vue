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
        <v-icon>shopping_cart</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
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
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
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
        rightDrawer: false,
        title: 'Baratón'
      }
    },
    computed: {
      items () {
        return this.$store.state.categories
      }
    }
  }
</script>
