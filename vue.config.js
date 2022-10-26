module.exports = {
  //关闭eslint
  productionSourceMap: false,
  lintOnSave: false,
  assetsDir: 'static',
  parallel: false,
  publicPath: './',
  chainWebpack: config => {
    // 移除prefetch插件，避免加载多余的资源
    config.plugins.delete('prefetch')
    // 移除 preload 插件，避免加载多余的资源
    config.plugins.delete('preload');

    // ============压缩图片 start============
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({ bypassOnDebug: true })
      .end()
    // ============压缩图片 end============
  }
}
