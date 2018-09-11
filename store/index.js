export const state = () => ({
  sidebar: false,
  categories: []
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  toggleActive (state, id) {
    // Make a deepCopy of the array
    let categories = Array.of(...state.categories)
    let item = categories.find(item => item.id === id)

    // Make the mutation
    item.active = !item.active

    // Create a new object for trigger rendering
    state.categories = categories
  },
  setCategories (state, categories) {
    state.categories = categories || []
  }
}

export const actions = {
  async nuxtServerInit ({ commit }) {
    const data = await this.$axios.$get('categories.json')
    commit('setCategories', [
      { icon: 'apps', name: 'Welcome', permalink: '/' },
      ...data.categories,
      { icon: 'bubble_chart', name: 'Inspire', permalink: '/inspire' }
    ])
  }
}
