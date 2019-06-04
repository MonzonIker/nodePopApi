'use strict';

const mongoose = require('mongoose');

// definir un esquema
const anuncioSchema = mongoose.Schema({
    name: String,
    sell: Boolean,
    price: Number,
    photo: String,
    tag: String
});

// creamos un método estático
anuncioSchema.statics.listar = function(filtro, limit, skip, fields, sort) {
    const query = Anuncio.find(filtro);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    return query.exec();
}

// crear el modelo con ese esquema
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// y aunque no haga falta, lo exportamos
module.exports = Anuncio;