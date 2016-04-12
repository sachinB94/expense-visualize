'use strict';

angular.module('expenseVisualize')
  .service('Expense', function (Restangular) {

    return {

      add: function(expense, next) {
        Restangular
          .all('expenses')
          .post(expense)
          .then(function(data) {
            return next(null, data.plain());
          })
          .catch(function(err) {
            return next(err, null);
          });
      },

      getAll: function(next) {
        Restangular
          .one('expenses')
          .get()
          .then(function(data) {
            return next(null, data.plain());
          })
          .catch(function(err) {
            return next(err, null);
          });
      },

      getById: function(expenseId) {
        Restangular
          .one('expenses', expenseId)
          .get()
          .then(function(data) {
            return next(null, data.plain());
          })
          .catch(function(err) {
            return next(err, null);
          });
      },

      update: function(expenseId, expense, next) {
        Restangular
          .one('expenses', expenseId)
          .customPUT(expense)
          .then(function(data) {
            return next(null, data.plain());
          })
          .catch(function(err) {
            return next(err, null);
          });
      },

      delete: function(expenseId, next) {
        Restangular
          .one('expenses', expenseId)
          .remove()
          .then(function(data) {
            return next(null, data.plain());
          })
          .catch(function(err) {
            return next(err, null);
          });
      }

    };

  });
