/**
 * ScrapeController
 *
 * @description :: Server-side logic for managing scrapes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var request = require('request');
var cheerio = require('cheerio');

var complete_curl = {
    headers: {
        'Pragma': 'no-cache',
        'Origin': 'https://www.bvc.com.co',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.8,es;q=0.6',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Cache-Control': 'no-cache',
        'Referer': 'https://www.bvc.com.co/pps/tibco/portalbvc/Home/Mercados/enlinea/acciones?action=dummy',
        //'Cookie': 'JSESSIONID=71A7E745D4854BF910C2F0C684A25C68.tomcatM1p6101; __utmt=1; submenuheader=-1c; style=null; __utma=146679143.1722380614.1465919555.1465919555.1466092795.2; __utmb=146679143.2.10.1466092795; __utmc=146679143; __utmz=146679143.1465919555.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); hijo=0-1; padre=1',
        'Connection': 'keep-alive'
    },

    uri: "https://www.bvc.com.co/pps/tibco/portalbvc/Home/Mercados/enlinea/acciones?com.tibco.ps.pagesvc.action=portletAction&com.tibco.ps.pagesvc.targetSubscription=5d9e2b27_11de9ed172b_-74187f000001&action=buscar",
    formData: {
        tipoMercado: null,
        diaFecha: null,
        mesFecha: null,
        anioFecha: null,
        nemo: null

    }
};
var options = {
    uri: complete_curl.uri,
    headers: complete_curl.headers,
    form: complete_curl.formData,
    method: 'POST',
    followRedirect: true,
    followAllRedirects: true,
    gzip: true,
    jar: true
};


/*
 * Obtiene los movimientos de un día para una acción haciendo scraping de la página BVC
 * */
function getMovementsFromHTML(stock, body) {
    $ = cheerio.load(body);
    var movimientos = Array();
    $("#acordeon_contenedor #seg_acc_2 .mercado_acciones_scroll_interior table tr")
        .each(function () {
            var movimiento = {};
            $(this).children('td').each(function (index) {
                switch (index) {
                    case 0: //Hora
                        var hora_tmp = $(this).html().trim();
                        movimiento.hora = new Date('January 1, 1970 ' + hora_tmp);
                        movimiento.hora.setDate(complete_curl.formData.diaFecha);
                        movimiento.hora.setYear(complete_curl.formData.anioFecha);
                        //setMonth empieza en 0:enero y va hasta 11:diciembre
                        movimiento.hora.setMonth(complete_curl.formData.mesFecha - 1);
                        break;
                    case 1: //Precio
                        movimiento.precio = $(this).html().trim();
                        break;
                    case 2: //Cantidad
                        movimiento.cantidad = $(this).html().trim();
                        break;
                    case 3: //Volumen
                        movimiento.volumen = $(this).html().trim();
                        break;
                    case 4: //Tipo de operacion
                        movimiento.tipo_operacion = $(this).html().trim().toLowerCase();
                        break;
                    case 5: // Fecha de cumplimiento
                        movimiento.fecha_cumplimiento = $(this).html().trim();
                        break;
                    case 6: // Mercado
                        movimiento.mercado = $(this).html().trim().toLowerCase();
                        break;
                }
            });
            movimiento.stock = stock;
            movimientos.push(movimiento);
        });
    return movimientos;
}

/*
 * Guarda los movimiento pasados por parámetro en la base
 */
function saveMovements(movimientos, res) {
    Operacion.create(movimientos).exec(function createCB(err, created) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(created);
        }

    });
}

/*
 * Guarda los nemotecnicos pasados por parámetro en la base
 */
function saveMovements(movimientos, res) {
    Operacion.create(movimientos).exec(function createCB(err, created) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(created);
        }

    });

}

module.exports = {

    /**
     * `ScrapeController.getSingleStock()`
     * Parametros:
     * day: dia a consultar movimientos
     * month: mes a consultar movimientos
     * year: año a consultar movimientos
     * stock: acción a consultar movimientos
     */
    getSingleStock: function (req, res) {

        complete_curl.formData.tipoMercado = '1';
        complete_curl.formData.diaFecha = req.params.day;
        complete_curl.formData.mesFecha = req.params.month;
        complete_curl.formData.anioFecha = req.params.year;
        complete_curl.formData.nemo = req.params.stock;


        var movimientos = null;

        request(options, function (error, response, body) {

                if (!error && response.statusCode == 200) {

                    if (req.params.save == 'save') {
                        saveMovements(getMovementsFromHTML(complete_curl.formData.nemo, body), res);
                    }
                    else {
                        res.json(getMovementsFromHTML(complete_curl.formData.nemo, body));
                    }
                }
                else {
                    console.log("\n\n\n\n4) Leo Error:", response.statusCode);
                    console.log(error);
                    res.send('Error', error);
                }
            }
        );
    },

    /**
     * `ScrapeController.getAll()`
     */
    getAll: function (req, res) {
        return res.json({
            todo: 'getAll() is not implemented yet!'
        });
    }
};

