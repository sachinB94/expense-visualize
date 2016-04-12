var middleware = {

  sanitizeRequest: function(req, res, next) {
    if (req.body.category) {
      req.body.category = req.body.category.toLowerCase();
    }
    return next();
  },

  sendResponse: function(req, res) {
    return res.send(req.data);
  }
  
};

module.exports = middleware;