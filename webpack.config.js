const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const RemoveEmptyScriptsPlugin  = require('webpack-remove-empty-scripts');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');



module.exports = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    liveReload: true
  },
  entry: {
    'common/js/common': './src/common/js/common.js',
    'js/index': './src/js/index.js',
    'members/css/index': './src/members/css/index.scss',
    'foo/js/index': './src/foo/js/index.js',
    'bar/js/index': './src/bar/js/index.js',
    'css/test': './src/css/test.scss',
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  // resolve: {
  //   roots: [path.resolve(__dirname, './src')],
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { 'targets': '> 0.25%, not dead' }]
              ]
            }
          }
        ]
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                    }
                  ]
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      // {
      //   test: /\.(png|jpg|gif)$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'img/[name][ext]'
      //   },
      //   use: [
      //     {
      //       loader: 'image-webpack-loader',
      //       options: {
      //         mozjpeg: {
      //           progressive: true,
      //           quality: 65
      //         }
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.pug/,
        use: [
          {
            loader: 'html-loader',
            options: {
              sources: false,
            }
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
              basedir: path.resolve(__dirname, './src')
            }
          }
        ]
      },
    ]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
    // minimize: true,
  },
  plugins: [
    new RemoveEmptyScriptsPlugin (),
    new MiniCssExtractPlugin({
      filename: ({ chunk }) => `${chunk.name.replace("js/", "css/")}.css`
    }),
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      filename: 'index.html',
      inject: 'body',
      chunks: [
        'common/js/common',
        'js/index',
      ]
    }),
    new HtmlWebpackPlugin({
      template: './src/about/index.pug',
      filename: 'about/index.html',
      inject: 'body',
      chunks: [
        'common/js/common',
      ]
    }),
    new HtmlWebpackPlugin({
      template: './src/members/index.pug',
      filename: 'members/index.html',
      inject: 'body',
      chunks: [
        'common/js/common',
        'members/css/index'
      ]
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets',
          to: 'assets'
        }
      ],
    }),
    new ImageminWebpackPlugin ({
      test: /\.(jpe?g|png|gif|svg)$/i,
      plugins: [
        ImageminMozjpeg({
          quality : 80,
          progressive: true
        })
      ],
      gifsicle: {
        interlaced: false,
        optimizationLevel: 1,
        colors: 256,
      },
      pngquant: {
        quality: '70-80',
      },
      svgo: {}
    }),
  ]
};
