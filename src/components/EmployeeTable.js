goog.provide('app.components.EmployeeTable');

goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.events');
goog.require('goog.events.EventType');

/**
 * @constructor
 * @param {!Element} rootEl
 */
app.components.EmployeeTable = function (rootEl) {
  /** @private {!Element} */
  this.rootEl_ = rootEl;
};

/**
 * Render employees
 * @param {!Array<!app.models.Employee>} employees
 * @param {function(string)} onToggle
 */
app.components.EmployeeTable.prototype.render = function (employees, onToggle) {
  goog.dom.removeChildren(this.rootEl_);

  var table = goog.dom.createDom(goog.dom.TagName.TABLE, {
    'class': 'employee-table'
  });

  // Header
  var headerRow = goog.dom.createDom(goog.dom.TagName.TR, {
    'class': 'employee-table-header'
  });
  ['Name', 'Role', 'Status', 'Action'].forEach(function (h) {
    goog.dom.appendChild(
      headerRow,
      goog.dom.createDom(goog.dom.TagName.TH, { 'class': 'employee-table-th' }, h)
    );
  });
  goog.dom.appendChild(table, headerRow);

  // Rows
  for (var i = 0; i < employees.length; i++) {
    var emp = employees[i];

    var row = goog.dom.createDom(goog.dom.TagName.TR, {
      'class': 'employee-table-row'
    });

    goog.dom.appendChild(row,
      goog.dom.createDom(goog.dom.TagName.TD, { 'class': 'employee-table-td' }, emp.getName())
    );
    goog.dom.appendChild(row,
      goog.dom.createDom(goog.dom.TagName.TD, { 'class': 'employee-table-td' }, emp.getRole())
    );

    var statusSpan = goog.dom.createDom(goog.dom.TagName.SPAN, {
      'class': emp.isActive() ? 'status-badge status-active' : 'status-badge status-inactive'
    }, emp.isActive() ? 'Active' : 'Inactive');

    goog.dom.appendChild(row,
      goog.dom.createDom(
        goog.dom.TagName.TD,
        { 'class': 'employee-table-td' },
        statusSpan
      )
    );

    var btn = goog.dom.createDom(
      goog.dom.TagName.BUTTON,
      {
        'class': emp.isActive() ? 'action-btn btn-deactivate' : 'action-btn btn-activate'
      },
      emp.isActive() ? 'Deactivate' : 'Activate'
    );

    goog.events.listen(btn, goog.events.EventType.CLICK, function (id) {
      return function () {
        onToggle(id);
      };
    }(emp.getId()));

    goog.dom.appendChild(row, goog.dom.createDom(goog.dom.TagName.TD, { 'class': 'employee-table-td' }, btn));
    goog.dom.appendChild(table, row);
  }

  goog.dom.appendChild(this.rootEl_, table);
};
