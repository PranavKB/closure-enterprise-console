goog.provide('app.models.Employee');

/**
 * Employee domain model
 *
 * @constructor
 * @param {string} id
 * @param {string} name
 * @param {string} role
 * @param {boolean} active
 */
app.models.Employee = function (id, name, role, active) {
  /** @private {string} */
  this.id_ = id;

  /** @private {string} */
  this.name_ = name;

  /** @private {string} */
  this.role_ = role;

  /** @private {boolean} */
  this.active_ = active;
};

/** @return {string} */
app.models.Employee.prototype.getId = function () {
  return this.id_;
};

/** @return {string} */
app.models.Employee.prototype.getName = function () {
  return this.name_;
};

/** @return {string} */
app.models.Employee.prototype.getRole = function () {
  return this.role_;
};

/** @return {boolean} */
app.models.Employee.prototype.isActive = function () {
  return this.active_;
};

/** Toggle active state */
app.models.Employee.prototype.toggleActive = function () {
  this.active_ = !this.active_;
};

