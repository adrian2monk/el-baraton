import { save, flush } from '~/utils/storage'

export const state = () => ({
  sidebar: false,
  categories: [],
  products: [],
  shopping: [],
  exists: false,
  sorted: {
    price: false,
    availability: false,
    quantity: false
  },
  price: {
    min: 0,
    max: 0
  }
})

export const mutations = {
  setShopping (state, shopping) {
    state.shopping = shopping || []
  },
  setCategories (state, categories) {
    state.categories = categories || []
  },
  setProducts (state, products) {
    state.products = products || []
    state.sorted.price = state.sorted.availability = state.sorted.quantity = false
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
  },
  sortByPrice (state, order) {
    const sorted = [...state.products]
    sorted.sort((a, b) => order > 0
      ? parseFloat(a.price.substring(1)) - parseFloat(b.price.substring(1))
      : parseFloat(b.price.substring(1)) - parseFloat(a.price.substring(1)))
    state.products = sorted
    state.sorted.price = true
    state.sorted.quantity = state.sorted.availability = false
  },
  sortByQuantity (state, order) {
    const sorted = [...state.products]
    sorted.sort((a, b) => order > 0
      ? a.quantity - b.quantity
      : b.quantity - a.quantity)
    state.products = sorted
    state.sorted.quantity = true
    state.sorted.price = state.sorted.availability = false
  },
  sortByAvailability (state, order) {
    const sorted = [...state.products]
    sorted.sort((a, b) => order > 0
      ? a.available - b.available
      : b.available - a.available)
    state.products = sorted
    state.sorted.availability = true
    state.sorted.price = state.sorted.quantity = false
  },
  addToCart (state, { quantity, subtotal, product }) {
    state.exists = false
    const index = state.shopping.findIndex(psh => psh.product_id === product.id)
    if (index < 0) {
      quantity <= product.quantity && product.available &&
      state.shopping.push({
        // To track purchase
        id: `psh-${Date.now()}-${product.id}`,
        product_id: product.id,
        checked: false,
        quantity,
        subtotal,
        product
      })
      quantity <= product.quantity && product.available &&
      save('cart', state.shopping)
    } else if (state.shopping[index].quantity + 1 <= product.quantity && product.available) {
      state.exists = true
      state.shopping[index].quantity += 1
      save('cart', state.shopping)
    }
  },
  toggleProduct (state, index) {
    state.shopping[index].checked = !state.shopping[index].checked
    save('cart', state.shopping)
  },
  addOne (state, index) {
    state.shopping[index].quantity += 1
    save('cart', state.shopping)
  },
  decreaseOne (state, index) {
    state.shopping[index].quantity -= 1
    save('cart', state.shopping)
  },
  flushCart (state) {
    state.shopping = []
    flush()
  }
}

export const actions = {
  async nuxtServerInit ({ commit, dispatch }) {
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
