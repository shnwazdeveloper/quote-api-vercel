const fs = require('fs')
const os = require('os')
const path = require('path')

function xmlEscape (value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

module.exports = function configureFontconfig () {
  if (process.env.FONTCONFIG_FILE && process.env.FONTCONFIG_PATH) return

  const fontsDir = path.join(__dirname, 'assets', 'fonts')
  const configDir = path.join(os.tmpdir(), 'quote-api-fontconfig')
  const cacheDir = path.join(os.tmpdir(), 'quote-api-font-cache')
  const configFile = path.join(configDir, 'fonts.conf')

  try {
    fs.mkdirSync(configDir, { recursive: true })
    fs.mkdirSync(cacheDir, { recursive: true })
    fs.writeFileSync(configFile, [
      '<?xml version="1.0"?>',
      '<fontconfig>',
      `  <dir>${xmlEscape(fontsDir)}</dir>`,
      `  <cachedir>${xmlEscape(cacheDir)}</cachedir>`,
      '</fontconfig>'
    ].join('\n'))

    process.env.FONTCONFIG_FILE = configFile
    process.env.FONTCONFIG_PATH = configDir
  } catch (error) {
    console.warn('Could not configure Fontconfig:', error.message)
  }
}
