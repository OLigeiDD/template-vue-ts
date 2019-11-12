const path = require('path')
const fse = require('fs-extra')
const chalk = require('chalk')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    // host: '0.0.0.0',
    // port: 8080, // 指定 devServer 启动的端口
    // hot: true,
    // inline: true,
    // disableHostCheck: true, // 必须
    // public: '0.0.0.0:0' // 必须
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    before(app) {
      app.use((req, res, next) => {
        const method = chalk.bgGreen(`${chalk.black(req.method)}`)
        console.log(`${method} ${req.url}`)
        next()
      })
      if (process.env.VUE_APP_ON_MOCK) {
        addMocks(app)
      }
    }
  },
  chainWebpack(config) {
    // svg-sprite-loader导入svg
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // 去除元素之间的空格
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
  }
}

/**
 * 添加mock支持。
 *
 * @param {Object} app express服务实例
 */
function addMocks(app) {
  const bodyParser = require('body-parser')
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))
  // parse application/json
  app.use(bodyParser.json())
  app.use(async function(req, res, next) {
    const mocks = getMocks()
    const mock = mocks[req.path]
    if (!mock) {
      return next()
    }

    const { method, result } = mock
    if (req.method.toLocaleLowerCase() !== method.toLocaleLowerCase()) {
      return next()
    }

    const _method = chalk.white.bgMagentaBright(` ${req.method} `)
    const _mockIndex = chalk.white.bgMagentaBright(' MOCK ')
    console.log(`${_method} ${_mockIndex} ${req.url}`)
    typeof result === 'function' ? res.json(await result(req, res, next)) : res.json(result)
  })
}

/**
 * 获取mocks对象
 */
function getMocks() {
  // （1）mock目录下所有的js文件，把他们全部合并到mocks对象
  let mocks = {}
  const dir = path.resolve(__dirname, 'mock')
  fse.ensureDirSync(dir)
  const files = fse.readdirSync(dir)
  for (const file of files) {
    const filePath = `${dir}/${file}`
    if (/\.js$/.test(file) && fse.statSync(filePath).isFile()) {
      delete require.cache[require.resolve(filePath)]
      mocks = { ...mocks, ...require(filePath) }
    }
  }
  return mocks
}
