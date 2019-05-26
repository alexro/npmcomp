const path = require('path');
const pkg = require('./package.json');
const libraryName = pkg.name;
const distDir = path.resolve(__dirname, 'dist/');
const demoDir = path.resolve(__dirname, 'demo/');

var config = {
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom')
    }
  },
  plugins: []
};

var fooConfig = Object.assign({}, config, {
  name: 'a',
  entry: './src/index.tsx',
  output: {
    path: distDir,
    filename: 'index.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM'
    }
  }
});

var barConfig = Object.assign({}, config, {
  name: 'b',
  entry: './demo/index.tsx',
  output: {
    path: demoDir,
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    port: 8085,
    contentBase: demoDir,
    historyApiFallback: true,
    hot: true
  }
});

// Return Array of Configurations
module.exports = [barConfig, fooConfig];
