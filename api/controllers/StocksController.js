/**
 * AccionController
 *
 * @description :: Server-side logic for managing stocks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    init: function (req, res) {
        var stocks =
            [
                {nemo: 'ECOPETROL'},
                {nemo: 'PFBCOLOM'},
                {nemo: 'GRUPOSURA'},
                {nemo: 'EXITO'},
                {nemo: 'CEMARGOS'},
                {nemo: 'PFAVAL'},
                {nemo: 'ISA'},
                {nemo: 'PFAVH'},
                {nemo: 'PFDAVVNDA'},
                {nemo: 'PFCEMARGOS'},
                {nemo: 'GRUPOARGOS'},
                {nemo: 'BCOLOMBIA'},
                {nemo: 'PFGRUPSURA'},
                {nemo: 'CORFICOLCF'},
                {nemo: 'PFGRUPOARG'},
                {nemo: 'BVC'},
                {nemo: 'CLH'},
                {nemo: 'BOGOTA'},
                {nemo: 'NUTRESA'},
                {nemo: 'CNEC'},
                {nemo: 'ISAGEN'},
                {nemo: 'CELSIA'},
                {nemo: 'ELCONDOR'},
                {nemo: 'GRUPOAVAL'},
                {nemo: 'EEB'},
                {nemo: 'MINEROS'},
                {nemo: 'CONCONCRET'},
                {nemo: 'CARTON'},
                {nemo: 'ETB'},
                {nemo: 'ICOLCAP'},
                {nemo: 'TERPEL'},
                {nemo: 'VALOREM'},
                {nemo: 'ENKA'},
                {nemo: 'COLTEJER'}
            ];
        Stock.create(stocks).exec(function (err, created) {
            if (err) {
                res.send(err);
            }
            else {
                res.send("<font color='green'>[Init] Acciones creadas <bold>" + created.length + " </bold></font>");
            }

        });
    }
};
