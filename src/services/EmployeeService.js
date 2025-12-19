goog.provide('app.services.EmployeeService');

goog.require('app.models.Employee');
goog.require('goog.net.XhrIo');
goog.require('goog.net.EventType');


/**
 * Service responsible for employee data
 *
 * @constructor
 */
app.services.EmployeeService = function () {
  /** @private {!Array<!app.models.Employee>} */
  this.employees_ = [];

  /** @private {string} */
  this.searchQuery_ = '';

  /** @private {number} */
  this.currentPage_ = 1;

  /** @private {number} */
  this.pageSize_ = 5; // Default page size

  this.initMockData_();
};

/**
 * Initialize mock employees
 * @private
 */
app.services.EmployeeService.prototype.initMockData_ = function () {
  this.employees_.push(
    new app.models.Employee('1', 'Alice', 'Manager', true),
    new app.models.Employee('2', 'Bob', 'Driver', true),
    new app.models.Employee('3', 'Charlie', 'Mechanic', false)
  );
};

/**
 * @return {!Array<!app.models.Employee>}
 */
app.services.EmployeeService.prototype.getAll = function () {
  return this.employees_;
};

/**
 * Set search query and reset to first page
 * @param {string} query
 */
app.services.EmployeeService.prototype.search = function (query) {
  this.searchQuery_ = query.toLowerCase();
  this.currentPage_ = 1;
};

/**
 * Go to next page
 */
app.services.EmployeeService.prototype.nextPage = function () {
  if (this.currentPage_ < this.getTotalPages()) {
    this.currentPage_++;
  }
};

/**
 * Go to previous page
 */
app.services.EmployeeService.prototype.prevPage = function () {
  if (this.currentPage_ > 1) {
    this.currentPage_--;
  }
};

/**
 * Get current page number
 * @return {number}
 */
app.services.EmployeeService.prototype.getCurrentPage = function () {
  return this.currentPage_;
};

/**
 * Get total pages based on filtered results
 * @return {number}
 */
app.services.EmployeeService.prototype.getTotalPages = function () {
  var filtered = this.getFilteredEmployees_();
  return Math.ceil(filtered.length / this.pageSize_);
};

/**
 * Get employees for current page and search query
 * @return {!Array<!app.models.Employee>}
 */
app.services.EmployeeService.prototype.getVisibleEmployees = function () {
  var filtered = this.getFilteredEmployees_();
  var start = (this.currentPage_ - 1) * this.pageSize_;
  var end = start + this.pageSize_;
  return filtered.slice(start, end);
};

/**
 * @private
 * @return {!Array<!app.models.Employee>}
 */
app.services.EmployeeService.prototype.getFilteredEmployees_ = function () {
  if (!this.searchQuery_) {
    return this.employees_;
  }
  var self = this;
  return this.employees_.filter(function (emp) {
    return emp.getName().toLowerCase().indexOf(self.searchQuery_) > -1;
  });
};


/**
 * Toggle employee active state
 * @param {string} id
 */
app.services.EmployeeService.prototype.toggleActive = function (id) {
  for (var i = 0; i < this.employees_.length; i++) {
    if (this.employees_[i].getId() === id) {
      this.employees_[i].toggleActive();
      return;
    }
  }
};

/**
 * Fetch employees from API
 * @param {function()} callback
 */
app.services.EmployeeService.prototype.loadFromApi = function (callback) {
  var self = this;

  var xhr = new goog.net.XhrIo();

  xhr.listen(goog.net.EventType.COMPLETE, function () {
    if (xhr.isSuccess()) {
      var data = xhr.getResponseJson();
      console.log('EmployeeService: Received ' + data.length + ' users from API');

      self.employees_ = [];

      for (var i = 0; i < data.length; i++) {
        var u = data[i];
        self.employees_.push(
          new app.models.Employee(
            String(u['id']),
            u['name'],
            u['company']['name'], // Bracket notation prevents property renaming in ADVANCED mode
            true
          )
        );
      }

      callback();
    } else {
      console.error('EmployeeService: Failed to load from API. Status: ' + xhr.getStatus());
    }
  });

  xhr.send('https://jsonplaceholder.typicode.com/users');
};

