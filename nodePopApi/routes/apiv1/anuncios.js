'use strict';

const express = require('express');
const router = express.Router();
var createError = require('http-errors');

const Anuncio = require('../../models/Anuncio');

/**
 * GET /
 * Retorna una lista de anuncios
 */
router.get('/', async(req, res, next) => {
    try {
        // recuperar datos de entrada
        const name = req.query.name;
        const sell = req.query.sell;
        const price = req.query.price;
        const photo = req.query.photo;
        const tag = req.query.tag;
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        const fields = req.query.fields;
        const sort = req.query.sort;

        // crear el filtro vacio
        const filtro = {};

        if (name) {
            filtro.name = name;
        }

        if (sell) {
            filtro.sell = sell;
        }

        if (price) {
            filtro.price = price;
        }

        if (photo) {
            filtro.photo = photo;
        }

        if (tag) {
            filtro.tag = tag;
        }

        const anuncios = await Anuncio.listar(filtro, limit, skip, fields, sort);
        // si await falla, lanza una excepción --> throw new Exception()
        res.json({ success: true, result: anuncios });
    } catch (err) {
        next(err);
    }
});

/**
 * GET /:id
 * Retorna un anuncio
 */
router.get('/:id', async(req, res, next) => {
    try {
        const _id = req.params.id;

        const anuncio = await Anuncio.findById(_id).exec();

        if (!anuncio) {
            next(createError(404));
            return;
        }

        res.json({ success: true, result: anuncio });

    } catch (err) {
        next(err);
    }
});

module.exports = router;