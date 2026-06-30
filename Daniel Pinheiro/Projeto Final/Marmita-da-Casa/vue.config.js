const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // Para publicar no GitHub Pages, descomente a linha abaixo e troque
  // "marmita-da-casa" pelo nome EXATO do seu repositório do front-end:
  // publicPath: process.env.NODE_ENV === 'production' ? '/marmita-da-casa/' : '/',
})
