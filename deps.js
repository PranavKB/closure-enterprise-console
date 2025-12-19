// This file was generated manually for the Closure Enterprise Console project
// It maps the dependencies for development mode

// Paths are relative to closure-library/closure/goog/base.js
// We need to go up 3 levels (...) to get to the project root
goog.addDependency('../../../src/models/Employee.js', ['app.models.Employee'], []);
goog.addDependency('../../../src/components/EmployeeTable.js', ['app.components.EmployeeTable'], ['goog.dom', 'goog.dom.TagName', 'goog.events', 'goog.events.EventType']);
goog.addDependency('../../../src/services/EmployeeService.js', ['app.services.EmployeeService'], ['app.models.Employee', 'goog.net.XhrIo', 'goog.net.EventType']);
goog.addDependency('../../../src/controllers/DashboardController.js', ['app.controllers.DashboardController'], ['goog.dom', 'goog.dom.TagName', 'app.services.EmployeeService', 'app.components.EmployeeTable']);
goog.addDependency('../../../src/app/bootstrap.js', ['app.bootstrap'], ['goog.dom', 'app.controllers.DashboardController']);
goog.addDependency('../../../src/app/main.js', ['app.main'], ['app.bootstrap', 'goog.dom']);
