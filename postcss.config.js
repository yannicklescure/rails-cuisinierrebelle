// module.exports = {
//   plugins: [
//     require('postcss-import'),
//     require('postcss-flexbugs-fixes'),
//     require('postcss-preset-env')({
//       autoprefixer: {
//         flexbox: 'no-2009'
//       },
//       stage: 3
//     })
//   ]
// }

// module.exports = {
//   test: /\.s?css$/,
//   use: [
//     'vue-style-loader',
//     {
//       loader: 'css-loader',
//       options: { importLoaders: 1 }
//     },
//     'postcss-loader'
//   ],
//   plugins: [
//     require('cssnano')({
//         preset: 'default',
//     }),
//   ],
// };

const environment = ctx => ({
  test: /\.s?css$/,
  use: [
    'vue-style-loader',
    {
      loader: 'css-loader',
      options: { importLoaders: 1 }
    },
    'postcss-loader'
  ],
  plugins: [
    require('cssnano')({
        preset: 'default',
    }),
    require("postcss-import"),
    require("postcss-flexbugs-fixes"),
    require("postcss-preset-env")({
      autoprefixer: {
        flexbox: "no-2009"
      },
      stage: 3
    }),
    // purgeCss(ctx)
  ]
});

// const purgeCss = ({ file }) => {
//   return require("postcss-purgecss")({
//     content: htmlFilePatterns(file.basename),
//     // defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
//   });
// };

// const htmlFilePatterns = filename => {
//   switch (filename) {
//     case "critical.scss":
//       return [
//         "./app/views/vue/index.html.erb",
//         "./app/views/layouts/vue.html.erb",
//         "./app/views/layouts/application.html.erb"
//       ];
//     default:
//       return [
//         "./app/**/*.html.erb",
//         "./config/initializers/**/*.rb",
//         "./app/helpers/**/*.rb",
//         "./app/javascript/**/*.js"
//         // "./app/javascript/stylesheet/**/*.scss"
//       ];
//   }
// };

module.exports = ctx => environment(ctx);
