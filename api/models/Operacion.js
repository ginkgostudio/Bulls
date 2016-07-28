/**
 * Operacion.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        hora: {
            type: 'datetime',
            required: true
        },
        precio: {
            type: 'float',
            required: true
        },
        cantidad: {
            type: 'integer',
            required: true
        },
        volumen: {
            type: 'integer',
            required: true
        },
        tipo_operacion: {
            type: 'string',
            required: true
        },
        fecha_cumplimiento: {
            type: 'date'
        },
        mercado: {
            type: 'string'
        },
        stock:{
            type: 'string',
            required: true
        }
    }
};