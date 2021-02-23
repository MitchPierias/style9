const NAME = require('../package.json').name
const { SourceMapSource, RawSource } = require('webpack-sources')
const virtualModules = require('./virtualModules.js')
const processCSS = require('../src/process-css.js')

class Style9Plugin {
  constructor({ test = /\.css$/ } = {}) {
    this.test = test
  }

  apply(compiler) {
    virtualModules.apply(compiler)

    compiler.hooks.compilation.tap(NAME, (compilation) => {
      compilation.hooks.optimizeChunkAssets.tapPromise(NAME, async (chunks) => {
        const paths = Array.from(chunks)
          .flatMap((chunk) => Array.from(chunk.files))
          .filter((path) => path.match(this.test))

        for (const path of paths) {
          const asset = compilation.assets[path]
          const { source, map } = asset.sourceAndMap()
          const postcssOpts = {
            to: path,
            from: path,
            map: { prev: map || false }
          }
          const result = processCSS(source, postcssOpts)

          if (result.map) {
            compilation.assets[path] = new SourceMapSource(result.css, path, JSON.parse(result.map), source, map, true)
          } else {
            compilation.assets[path] = new RawSource(result.css)
          }
        }
      })
    })
  }
}

module.exports = Style9Plugin

module.exports.loader = require.resolve('./loader.js')
