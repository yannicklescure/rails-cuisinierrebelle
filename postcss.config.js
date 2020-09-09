// postcss.config.js

const purgecss = require('@fullhuman/postcss-purgecss')

let environment = {
  plugins: [
    // require('tailwindcss'),
    require('bootstrap'),
    require('precss'),
    require('autoprefixer'),
    require('postcss-import'),
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3
    }),
  ]
}

// Only run PurgeCSS in production (you can also add staging here)
if (process.env.RAILS_ENV === "production") {
  environment.plugins.push(
    purgecss({
      content: [
        './app/**/*.html.erb',
        './app/helpers/**/*.rb',
        './app/javascript/**/*.js',
        './app/javascript/**/*.vue',
        './app/javascript/**/*.jsx',
      ],
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:\/]+/g) || []
    })
  )
}

module.exports = environment
