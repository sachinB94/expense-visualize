'use strict';

var express = require('express');
var router = express.Router();

var controller = require('./expense.controller');
var middleware = require('../middleware');

router.get('/',
  controller.getAll,
  middleware.sendResponse
);

router.get('/:expenseId',
  controller.getById,
  middleware.sendResponse
);

router.post('/',
  middleware.sanitizeRequest,
  controller.add,
  middleware.sendResponse
);

router.put('/:expenseId',
  middleware.sanitizeRequest,
  controller.update,
  middleware.sendResponse
);

router.delete('/:expenseId',
  controller.delete,
  middleware.sendResponse
);

module.exports = router;
