goog.provide('app.main');

goog.require('app.bootstrap');
goog.require('goog.dom');

/**
 * Application entry point
 * This is called automatically by the Closure Compiler when using --entry_point
 */
app.main = function () {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      app.bootstrap.init();
    });
  } else {
    app.bootstrap.init();
  }
};

// Export for entry point
goog.exportSymbol('app.main', app.main);
