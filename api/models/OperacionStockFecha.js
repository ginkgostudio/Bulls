/**
 * OperacionStockFecha.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        fecha: {
            type: 'date',
            required: true
        },
        stock: {
            type: 'string',
            required: true
        },
        resultado: {
            type: 'string',
            enum: ['dia_no_bursatil', 'error', 'ok']
        }
    }
};

