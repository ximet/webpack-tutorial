const browserList = [
    "iOS >= 8",
    "Android 4.4"
];

module.exports = {
  plugins: [
    require('precss'),
    require('postcss-cssnext')({ browsers: browserList }),
    require('postcss-reporter')({ clearMessages: true })
  ]
}
