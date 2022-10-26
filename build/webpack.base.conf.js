module.exports = {
  entry: {
    app: './src/main.js'
  },
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex'
  }
}