<template>
  <v-list-group
    :key="category.id"
    :group="`/filter-by${category.permalink}`"
    sub-group
  >
    <v-list-tile slot="activator">
      <v-list-tile-content>
        <v-list-tile-title v-text="category.name"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <template v-for="level in category.sublevels">
      <baraton-deep-category-list
        v-if="level.sublevels"
        :key="level.id"
        :category="level"
      />
      <v-list-tile
        v-else
        :to="`/filter-by${level.permalink}`"
        :key="level.id"
      >
        <v-list-tile-content>
          <v-list-tile-title v-text="level.name"></v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-icon v-html="level.icon || 'loyalty'"></v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </template>
  </v-list-group>
</template>

<script>
export default {
  name: 'baraton-deep-category-list',
  props: {
    category: {
      type: Object,
      validator (test) {
        // (i) The test object must be a category and...
        // (ii) need to have sub levels (the deep part)
        return test.id && test.name && test.permalink && test.sublevels
      }
    }
  }
}
</script>

