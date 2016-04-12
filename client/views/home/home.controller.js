'use strict';

angular.module('expenseVisualize')
  .controller('HomeCtrl', function($scope, Expense, EXPENSE_TYPES, $mdToast, $window, $mdMedia, $mdDialog) {

    var vm = this;

    vm.EXPENSE_TYPES = EXPENSE_TYPES;
    vm.totalExpense = 0;
    vm.chartControl = 'date';

    (function() {
      vm.showProgress = true;

      Expense.getAll(function(err, expenses) {
        if (err) {
          $mdToast.showSimple(err.data.message);
        } else {
          vm.expenses = expenses.map(function(expense) {
            expense.formattedDate = moment(expense.date).format('MMM Do YY');
            return expense;
          });
          sortExpenses();
          vm.calculateChartData();
        }
        vm.showProgress = false;
      });

    })();

    var sortExpenses = function() {
      vm.expenses.sort(function(expense1, expense2) {
        return Date.parse(expense2.date) - Date.parse(expense1.date);
      });
    };

    vm.addExpense = function() {
      vm.showProgress = true;
      Expense.add(vm.expense, function(err, expense) {
        if (err) {
          $mdToast.showSimple(err.data.message);
        } else {
          expense.formattedDate = moment(expense.date).format('MMM Do YY');
          vm.expenses.push(expense);
          sortExpenses();
          vm.calculateChartData();
          $mdToast.showSimple('Expense added');
          vm.expense = {};
        }
        vm.showProgress = false;
      });
    };

    vm.deleteExpense = function(expenseId) {
      vm.showProgress = true;
      Expense.delete(expenseId, function(err, expense) {
        if (err) {
          $mdToast.showSimple(err.data.message);
        } else {
          _.remove(vm.expenses, function(expense) {
            return expense._id === expenseId;
          });
          vm.calculateChartData();
          $mdToast.showSimple('Expense deleted');
        }
        vm.showProgress = false;
      });
    };

    vm.openEditExpenseDialog = function(ev, expenseId) {
      var pos = _.findIndex(vm.expenses, function(expense) {
        return expense._id === expenseId;
      });
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
      $mdDialog.show({
          controller: EditController,
          templateUrl: 'views/home/edit.template.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: useFullScreen,
          locals: {
            expense: vm.expenses[pos],
            EXPENSE_TYPES: vm.EXPENSE_TYPES
          }
        })
        .then(function(expense) {
          vm.showProgressBar = true;

          Expense.update(expenseId, expense, function(err, data) {
            if (err) {
              $mdToast.showSimple(err.data.message);
            } else {
              data.formattedDate = moment(data.date).format('MMM Do YY');
              vm.expenses[pos] = data;
              sortExpenses();
              vm.calculateChartData();
              $mdToast.showSimple('Expense updated');
            }
            vm.showProgress = false;
          });
        });

      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
    };


    vm.calculateChartData = function() {
      if (vm.chartControl === 'date') {
        var cashExpenses = _.groupBy(_.filter(vm.expenses, {
          type: 'cash'
        }), 'formattedDate');

        var creditExpenses = _.groupBy(_.filter(vm.expenses, {
          type: 'credit'
        }), 'formattedDate');
      } else if (vm.chartControl === 'category') {
        var cashExpenses = _.groupBy(_.filter(vm.expenses, {
          type: 'cash'
        }), 'category');

        var creditExpenses = _.groupBy(_.filter(vm.expenses, {
          type: 'credit'
        }), 'category');
      }

      var cashValues = [];
      for (var attr in cashExpenses) {
        cashValues.push({
          attr: attr,
          amount: _.sumBy(cashExpenses[attr], 'amount')
        });
      }

      var creditValues = [];
      for (var attr in creditExpenses) {
        creditValues.push({
          attr: attr,
          amount: _.sumBy(creditExpenses[attr], 'amount')
        });
      }

      vm.chartData = [{
        key: 'cash',
        color: '#d62728',
        values: cashValues
      }, {
        key: 'credit',
        color: '#1f77b4',
        values: creditValues
      }];
    };


    vm.d3Options = {
      chart: {
        type: 'multiBarHorizontalChart',
        width: document.getElementById('chart').clientWidth - Math.floor(document.getElementById('chart').clientWidth / 10),
        height: document.getElementById('expense-form').clientHeight,
        x: function(d) {
          return d.attr;
        },
        y: function(d) {
          return d.amount;
        },
        stacked: false,
        showControls: false,
        showValues: true,
        duration: 500,
        xAxis: {
          showMaxMin: false
        },
        yAxis: {
          axisLabel: 'Amount',
          tickFormat: function(d) {
            return d3.format(',.2f')(d);
          }
        }
      }
    };


  });


var EditController = ['$scope', '$mdDialog', 'expense', 'EXPENSE_TYPES',
  function($scope, $mdDialog, expense, EXPENSE_TYPES) {
    expense.date = new Date(expense.date);
    $scope.expense = expense;
    $scope.EXPENSE_TYPES = EXPENSE_TYPES;

    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.submit = function() {
      $mdDialog.hide($scope.expense);
    };
  }
];
