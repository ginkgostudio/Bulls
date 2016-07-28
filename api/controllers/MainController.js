/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var stocksController = require('./StocksController');
var operacionStockFechaController= require('./OperacionStockFechaController');



module.exports = {
    init: function(req,res){
        stocksController.init(req,res);
        operacionStockFechaController.init(req,res);
    }
};

