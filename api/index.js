require('dotenv').config()

const { app, prepare } = require('../app')
const handler = app.callback()

module.exports = async (req, res) => {
  await prepare()
  return handler(req, res)
}
