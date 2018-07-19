function model (name) {
  var nombre = name.toLowerCase()

  let body = 'const mongoose = require(\'mongoose\')\n' +
  '\nlet ' + nombre + 'Schema = mongoose.Schema({\n\n})\n' +
  '\n' + nombre + 'Schema.methods.toWeb = function () {' +
  '\n  let json = this.toJSON()' +
  '\n  json.id = this._id // this is for the front end' +
  '\n  return json' +
  '\n}\n' +
  '\nmodule.exports = mongoose.model(\'' + name.toLowerCase().charAt(0).toUpperCase() + name.substr(1) + '\', ' + nombre + 'Schema)\n'

  return body
}

module.exports = model
