import express from 'express';
import { Attribute, Thing } from '../model/models';
import isNumber from '../util/is-number';
import * as url from 'url';

const attributeRouter = express.Router();

attributeRouter.get('', async (req, res) => {
    const attributes = await Attribute.findAll();
    res.status(200);
    res.json(attributes);
});

attributeRouter.post('', async (req, res) => {
    const created = await Attribute.create(req.body);
    res.location(
        url.format({
            protocol: req.protocol,
            host: req.get('host'),
            pathname: req.originalUrl + '/' + created.id,
        }),
    );
    res.status(201);
    res.json(created);
});

attributeRouter.get('/:id', async (req, res) => {
    if (isNumber(req.params.id)) {
        const attribute = await Attribute.findOne({
            where: {
                id: req.params.id,
            },
        });
        if (attribute) {
            res.status(200);
            res.json(attribute);
            return;
        }
    }
    res.status(404);
    res.send();
});

attributeRouter.put('/:id', async (req, res) => {
    if (isNumber(req.params.id)) {
        const existed = await Attribute.findOne({
            where: {
                id: req.params.id,
            },
        });
        if (existed) {
            const updated = await existed.update(req.body);
            res.status(200);
            res.json(updated);
            return;
        }
    }
    res.status(404);
    res.send();
});

attributeRouter.delete('/:id', async (req, res) => {
    await Attribute.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.status(200);
    res.send();
});

attributeRouter.get('/:id/things', async (req, res) => {
    if (isNumber(req.params.id)) {
        const things = await Thing.findAll({
            where: {
                attributeId: req.params.id,
            },
        });
        res.status(200);
        res.json(things);
    } else {
        res.status(404);
        res.send();
    }
});

export default attributeRouter;
