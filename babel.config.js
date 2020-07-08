module.exports = function(babel) {
  babel.cache(true);
  return {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      // ES2018
      ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
      // ES2017
      '@babel/plugin-transform-async-to-generator',
      // ES2016
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      // Experimental
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-syntax-dynamic-import',
      // ES2015
      ['@babel/plugin-transform-parameters', { loose: true }],
      '@babel/plugin-transform-arrow-functions',
      '@babel/plugin-transform-classes',
      '@babel/plugin-transform-destructuring',
      '@babel/plugin-transform-spread',
      '@babel/plugin-transform-literals',
      '@babel/plugin-transform-typeof-symbol',
      // Typescript
      '@babel/plugin-transform-typescript',
      // React
      '@babel/plugin-transform-react-constant-elements',
    ],
  };
};
