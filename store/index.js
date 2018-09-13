export const state = () => ({
  sidebar: false,
  categories: [],
  products: [],
  price: {
    min: 0,
    max: 0
  }
})

export const mutations = {
  setCategories (state, categories) {
    state.categories = categories || []
  },
  setProducts (state, products) {
    state.products = products || []
  },
  setPrice (state, { min, max }) {
    state.price.min = min
    state.price.max = max
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
  },
  productByFilter (state, { quantity = 1, priceMin = state.price.min, priceMax = state.price.max, available = true }) {
    state.products = state.products.filter(pdt => {
      return pdt.quantity > quantity &&
        parseFloat(pdt.price.substring(1)) >= priceMin &&
        parseFloat(pdt.price.substring(1)) <= priceMax &&
        pdt.available === available
    })
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
    const min = products.reduce((acc, pdt) =>
      Math.min(acc, parseFloat(pdt.price.substring(1))),
    0.0)
    const max = products.reduce((acc, pdt) =>
      Math.max(acc, parseFloat(pdt.price.substring(1))),
    0.0)
    commit('setPrice', { min, max })
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
