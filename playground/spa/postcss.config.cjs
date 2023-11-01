const pxtorem = require('@rain-star/postcss-pxtorem')

module.exports = {
  plugins: [
    pxtorem.pxtorem({
      propList: ['*'],
    }),
  ],
}
