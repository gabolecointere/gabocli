#!/usr/bin/env node
var program = require('commander')
var mkdirp = require('mkdirp')
var fs = require('fs')

var controllerBody = require('./methods/controller')
var modelBody = require('./methods/model')

program
  .version('0.0.1', '-v, --v')

program
  .command('controller <name>')
  .description('create a new controller')
  .action(function (name) {
    var basePath = './controllers/'
    var nombre = name.toLowerCase().charAt(0).toUpperCase() + name.substr(1)
    var fileName = nombre + 'Controller.js'
    var fullPath = basePath + fileName

    !fs.existsSync(basePath) && mkdirp(basePath)

    return fs.existsSync(fullPath) ? console.log(fileName + ' already exists.') : fs.writeFile(fullPath, controllerBody(nombre), function (err) {
      if (err) {
        console.log(err.message)
      } else {
        console.log(fileName + ' successfuly created')
      }
    })
  })

program
  .command('model <name>')
  .description('create a new model')
  .action(function (name) {
    var basePath = './models/'
    var fileName = name.toLowerCase().charAt(0).toUpperCase() + name.substr(1) + '.js'
    var fullPath = basePath + fileName

    !fs.existsSync(basePath) && mkdirp(basePath)

    return fs.existsSync(fullPath) ? console.log(fileName + ' already exists.') : fs.writeFile(fullPath, modelBody(name), function (err) {
      if (err) {
        console.log(err.message)
      } else {
        console.log(fileName + ' successfuly created')
      }
    })
  })

program.parse(process.argv)
