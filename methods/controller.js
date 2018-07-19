function controller (name, resource) {
  let body = resource ? 'const { ' + name + ' } = require(\'../models\')\n' : ''

  body += 'const { to, ReE, ReS } = require(\'../services/utilService\')\n'

  if (resource) {
    body += '\n/**\n* Create\n*/' +
      '\nconst create = async (req, res) => {' +
      '\n  res.setHeader(\'Content-Type\', \'application/json\')' +
      '\n  let err, item' +
      '\n  let user = req.user\n' +
      '\n  let itemInfo = req.body' +
      '\n  itemInfo.users = [{ user: user._id }];\n' +
      '\n  [err, item] = await to(Item.create(itemInfo))' +
      '\n  if (err) return ReE(res, err, 422)\n' +
      '\n  return ReS(res, { item: item.toWeb() }, 201)\n}\n' +
      '\nmodule.exports.create = create\n' +
      '\n/**\n* Get all\n*/' +
      '\nconst getAll = async (req, res) => {' +
      '\n  res.setHeader(\'Content-Type\', \'application/json\')' +
      '\n  let user = req.user' +
      '\n  let err, items\n' +
      '\n  [err, items] = await to(user.Items())' +
      '\n  if (err) return ReE(res, err, 422)\n' +
      '\n  let itemsJson = []' +
      '\n  for (let i in items) {' +
      '\n    let item = items[i]' +
      '\n    itemsJson.push(item.toWeb())' +
      '\n  }\n' +
      '\n  return ReS(res, { items: itemsJson })' +
      '\n}\n' +
      '\nmodule.exports.getAll = getAll\n' +
      '\n/**\n* Get one\n*/' +
      '\nconst get = (req, res) => {' +
      '\n  res.setHeader(\'Content-Type\', \'application/json\')' +
      '\n  let item = req.item\n' +
      '\n  return ReS(res, { item: item.toWeb() })' +
      '\n}\n' +
      '\nmodule.exports.get = get\n' +
      '\n/**\n* Update\n*/' +
      '\nconst update = async (req, res) => {' +
      '\n  let err, item, data' +
      '\n  item = req.user' +
      '\n  data = req.body\n' +
      '\n  item.set(data);\n' +
      '\n  [err, item] = await to(item.save())' +
      '\n  if (err) return ReE(res, err)\n' +
      '\n  return ReS(res, { item: item.toWeb() })' +
      '\n}\n' +
      '\nmodule.exports.update = update\n' +
      '\n/**\n* Remove\n*/' +
      '\nconst remove = async (req, res) => {' +
      '\n  let item, err' +
      '\n  item = req.item;\n' +
      '\n  [err, item] = await to(item.remove())' +
      '\n  if (err) return ReE(res, \'error occured trying to delete the item\')\n' +
      '\n  return ReS(res, { message: \'Deleted Item\' }, 204)' +
      '\n}\n' +
      '\nmodule.exports.remove = remove\n'
  }

  return body
}

module.exports = controller
