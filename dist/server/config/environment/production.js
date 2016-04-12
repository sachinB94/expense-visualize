'use strict';

module.exports = {
  ip: process.env.IP || undefined,
  mongo: {
    // uri: 'mongodb://localhost/expense-visualize'
    uri: 'mongodb://expense-visualize:expense-visualize@ds023510.mlab.com:23510/expense-visualize'
  }
};
