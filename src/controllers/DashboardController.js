goog.provide('app.controllers.DashboardController');

goog.require('goog.dom');
goog.require('goog.dom.TagName');

goog.require('app.services.EmployeeService');
goog.require('app.components.EmployeeTable');

/**
 * Dashboard controller
 *
 * @constructor
 * @param {!Element} rootEl
 */
app.controllers.DashboardController = function (rootEl) {
  /** @private {!Element} */
  this.rootEl_ = rootEl;

  /** @private {!app.services.EmployeeService} */
  this.employeeService_ = new app.services.EmployeeService();

  /** @private {?app.components.EmployeeTable} */
  this.employeeTable_ = null;
};

/**
 * Initialize dashboard
 */
app.controllers.DashboardController.prototype.init = function () {
  this.renderTitle_();
  this.renderTableContainer_();
  this.loadEmployees_();
};

/** @private */
app.controllers.DashboardController.prototype.renderTitle_ = function () {
  var title = goog.dom.createDom(
    goog.dom.TagName.H2,
    null,
    'Enterprise Dashboard'
  );
  goog.dom.appendChild(this.rootEl_, title);
};

/** @private */
app.controllers.DashboardController.prototype.renderTableContainer_ = function () {
  // Controls Container
  var controls = goog.dom.createDom(goog.dom.TagName.DIV, { 'class': 'controls-container' });

  // Search Input
  var searchInput = goog.dom.createDom(goog.dom.TagName.INPUT, {
    'type': 'text',
    'placeholder': 'Search employees...',
    'class': 'search-input'
  });

  var self = this;
  goog.events.listen(searchInput, goog.events.EventType.KEYUP, function (e) {
    self.employeeService_.search(e.target.value);
    self.renderEmployees_();
  });

  goog.dom.appendChild(controls, searchInput);
  goog.dom.appendChild(this.rootEl_, controls);

  // Table Container
  var container = goog.dom.createDom(goog.dom.TagName.DIV);
  goog.dom.appendChild(this.rootEl_, container);
  this.employeeTable_ = new app.components.EmployeeTable(container);

  // Pagination Controls
  this.paginationContainer_ = goog.dom.createDom(goog.dom.TagName.DIV, { 'class': 'pagination-container' });

  this.prevBtn_ = goog.dom.createDom(goog.dom.TagName.BUTTON, { 'class': 'pagination-btn' }, 'Previous');
  this.nextBtn_ = goog.dom.createDom(goog.dom.TagName.BUTTON, { 'class': 'pagination-btn' }, 'Next');
  this.pageIndicator_ = goog.dom.createDom(goog.dom.TagName.SPAN, { 'class': 'page-indicator' }, 'Page 1');

  goog.events.listen(this.prevBtn_, goog.events.EventType.CLICK, function () {
    self.employeeService_.prevPage();
    self.renderEmployees_();
  });

  goog.events.listen(this.nextBtn_, goog.events.EventType.CLICK, function () {
    self.employeeService_.nextPage();
    self.renderEmployees_();
  });

  goog.dom.appendChild(this.paginationContainer_, this.prevBtn_);
  goog.dom.appendChild(this.paginationContainer_, this.pageIndicator_);
  goog.dom.appendChild(this.paginationContainer_, this.nextBtn_);

  goog.dom.appendChild(this.rootEl_, this.paginationContainer_);
};

/** @private */
app.controllers.DashboardController.prototype.loadEmployees_ = function () {
  var self = this;

  console.log('DashboardController: Loading employees from API...');
  this.employeeService_.loadFromApi(function () {
    self.renderEmployees_();
  });
};

/** @private */
app.controllers.DashboardController.prototype.renderEmployees_ = function () {
  var self = this;

  // Render Table
  this.employeeTable_.render(
    this.employeeService_.getVisibleEmployees(),
    function (id) {
      self.employeeService_.toggleActive(id);
      self.renderEmployees_();
    }
  );

  // Update Pagination Controls
  var currentPage = this.employeeService_.getCurrentPage();
  var totalPages = this.employeeService_.getTotalPages();

  goog.dom.setTextContent(this.pageIndicator_, 'Page ' + currentPage + ' of ' + totalPages);

  this.prevBtn_.disabled = currentPage <= 1;
  this.nextBtn_.disabled = currentPage >= totalPages;
};


