'use strict';

var _ = require('lodash');
var async = require('async');

var Expense = require('./expense.model');

var Util = require('../util');

var controller = {
  
  getAll: function(req, res, next) {
    Expense.find({}, function(err, expenses) {
      if (err) {
        return next(Util.getMongoError(err));
      } else {
        req.data = expenses;
        return next();
      }
    });
  },

  getById: function(req, res, next) {
    var expenseId = req.params.expenseId;
    Expense.findOne({
      _id: expenseId
    }, function(err, expense) {
      if (err) {
        return next(Util.getMongoError(err));
      } else {
        req.data = expense;
        return next();
      }
    });
  },

  add: function(req, res, next) {
    var data = req.body;
    Expense.save(data, function(err, expense) {
      if (err) {
        return next(Util.getMongoError(err));
      } else {
        req.data = expense;
        return next();
      }
    });
  },

  update: function(req, res, next) {
    var expenseId = req.params.expenseId;
    var data = req.body;
    Expense.update({
      _id: expenseId
    }, data, {
      new: true
    }, function(err, expense) {
      if (err) {
        return next(Util.getMongoError(err));
      } else {
        req.data = expense;
        return next();
      }
    });
  },

  delete: function(req, res, next) {
    var expenseId = req.params.expenseId;
    Expense.remove({
      _id: expenseId
    }, function(err, response) {
      if (err) {
        return next(Util.getMongoError(err));
      } else {
        req.data = response;
        return next();
      }
    });
  }
};

module.exports = controller;