export const state = () => ({
  sidebar: false,
  categories: [],
  products: []
})

export const mutations = {
  setCategories (state, categories) {
    state.categories = categories || []
  },
  setProducts (state, products) {
    state.product = products || []
  },
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  productByCategory (state, { source, permalink }) {
    // Initialize new products array with source
    let products = source

    // Find the sublevel(s) to filter
    const sublevels = permalink.split('/').reduce((sub, slug) => {
      const category = sub.find(c => c.permalink.endsWith(slug))
      return category.sublevels || category
    }, state.categories)

    // Only one sublevel, then it's leaf
    products = source.filter(p => p.sublevel_id === sublevels.id)

    // Update product stock with filtered results
    state.products = products
  }
}

export const actions = {
  async nuxtServerInit ({ dispatch }) {
    await dispatch('getCategories')
    await dispatch('getProducts')
  },
  async getCategories ({ commit }) {
    const categoryBody = await this.$axios.$get('categories.json')
    const categories = categoryBody.categories
    commit('setCategories', categories)
  },
  async getProducts ({ commit }) {
    const productBody = await this.$axios.$get('products.json')
    const products = productBody.products
    commit('setProducts', products)
  },
  async changeCategory ({ commit }, permalink) {
    // Get fresh products on each change to filter by
    const productBody = await this.$axios.$get('products.json')
    const products = productBody.products
    commit('productByCategory', {
      source: products,
      permalink
    })
  }
}
