let didInstall = false;

export default () => {
  if (!didInstall) {
    const OfflinePlugin = require('offline-plugin/runtime');
    OfflinePlugin.install({
      onInstalled() {
        console.log('installed manifest');
      },
      onUpdating() {
        console.log('updated manifest');
      },
      onUpdateReady() {
        console.log('manifest update ready');
        OfflinePlugin.applyUpdate();
      },
      onUpdated() {
        console.log('updated manifest');
        window.location.reload();
      }
    });

    didInstall = true;
  }
  return null;
};
