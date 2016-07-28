/**
 * OperacionStockFechaController
 *
 * @description :: Server-side logic for managing operacionstockfechas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    init: function (req, res) {

        /*OperacionStockFecha.create({fecha: new Date(), stock:'BANCOLOMBIA'}).exec(function (err, created) {
         if (err) {
         res.send(err);
         }
         else {
         res.send("<font color='green'>[Init] Dia generado <bold>" + i + " - "+ allStocks[j]+" </bold></font>");
         }

         });*/

        var fechasOperacionesStocks = [];
        // Día inicial para hacer el scrapping: 1 Enero de 2016
        var fechaInicial = new Date("Jan 01 2006 00:00:00 GMT-0500 (COT)");


        Stock.find({})
            .then(function (allStocks) {

                allStocks.forEach(function (currentValue, index, arr) {
                    console.log(currentValue);
                    for (var i = fechaInicial; i.getDate() < Date.now(); i.setDate(i.getDate() + 1)) {
                        console.log("date: " + i.toString());
                        fechaOperacionStock = {
                            fecha: i,
                            stock: currentValue
                        };
                        OperacionStockFecha.create(fechaOperacionStock).exec(function (err, created) {
                            console.log("entro laverga");
                            if (err) {
                                res.send(err);
                            }
                            else {

                                res.send("<font color='green'>[Init] Dia generado <bold>" + i + " - " + currentValue + " </bold></font>");
                            }

                        });

                    }
                });


            })
            .catch(function (err) {
                res.send("Error en init operaciones fecha stock");
            }
        );


        /*var stocks =
         [
         {fecha: 'ECOPETROL', stock: ''},

         ];*/
        /*OperacionStockFecha.create(stocks).exec(function createCB(err, created) {
         if (err) {
         res.send(err);
         }
         else {
         res.send("<font color='green'>[Init] Fechas Operaciones-Acciones creadas <b>" + created.length + " </b></font>");
         }

         });*/
        //   res.send("ok");
    }
};

