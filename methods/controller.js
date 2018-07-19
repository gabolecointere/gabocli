function controller (name) {
  let body = '// const { ' + name + ' } = require(\'../models\')\n' +
  'const { to, ReE, ReS } = require(\'../services/utilService\')\n'

  return body
}

module.exports = controller
