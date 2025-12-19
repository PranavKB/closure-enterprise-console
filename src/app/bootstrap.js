goog.provide('app.bootstrap');

goog.require('goog.dom');
goog.require('app.controllers.DashboardController');

/**
 * Application entry point
 */
app.bootstrap.init = function () {
  var root = goog.dom.getElement('app-root');

  if (!root) {
    throw new Error('Root element #app-root not found');
  }

  var controller = new app.controllers.DashboardController(root);
  controller.init();
};
