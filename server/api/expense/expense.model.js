'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExpenseSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  category: {
    type: String
  },
  type: {
    type: String,
    enum:  {
      values: ['cash', 'credit'],
      message: 'Type must be either cash or credit'
    },
    required: [true, 'Expense type is required']
  },
  amount: {
    type: Number,
    min: [0, 'Amount cannot be less than 0'],
    required: [true, 'Amount is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

var Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = {
  save: function(data, next) {
    var expense = new Expense(data);
    expense.save(function(err) {
      return next(err, expense);
    });
  },

  findOne: function(condition, next) {
    Expense.findOne(condition, next);
  },

  find: function(condition, next) {
    Expense.find(condition, next);
  },

  update: function(condition, data, params, next) {
    Expense.findOneAndUpdate(condition, data, params, next);
  },

  remove: function(condition, next) {
    Expense.remove(condition, next);
  }
};
