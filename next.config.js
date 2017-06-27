const OfflinePlugin = require('offline-plugin');

module.exports = {
  webpack: (config, { dev }) => {
    // Offline support
    if (!dev) {
      config.plugins.push(
        new OfflinePlugin({
          publicPath: '/',
          relativePaths: false,
          externals: ['/', '/manifest.html'],
          rewrites(asset) {
            if (
              asset.indexOf('.hot-update.js') > -1 ||
              asset.indexOf('build-stats.json') > -1 ||
              asset === 'BUILD_ID' ||
              asset.indexOf('dist/') === 0
            ) {
              return null;
            }
            return asset[0] === '/' ?
              asset :
              asset.indexOf('bundles/pages/') === 0 ?
                  `/_next/-/${asset
                      .replace('bundles/pages', 'page')
                      .replace('index.js', '')
                      .replace(/\.js$/, '')}` :
                  `/_next/-/${asset}`;
          },
          autoUpdate: 1000 * 60 * 5, // (five minutes)
          __tests: dev ? { ignoreRuntime: true } : {}, // Hack to circumvent check of offlineplugin
          ServiceWorker: {
            directory: './',
            events: true
          }
        })
      );
    }

    return config;
  }
};
