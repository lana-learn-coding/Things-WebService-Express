import express from 'express';
import { Thing } from '../model/models';
import isNumber from '../util/is-number';
import * as url from 'url';

const thingRouter = express.Router();

thingRouter.get('', async (req, res) => {
    const things = await Thing.findAll({
        include: [{
            association: 'attribute',
        }],
    });
    res.status(200);
    res.json(things);
});

thingRouter.post('', async (req, res) => {
    const created = await Thing.create(req.body);
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

thingRouter.get('/:id', async (req, res) => {
    if (isNumber(req.params.id)) {
        const thing = await Thing.findOne({
            where: {
                id: req.params.id,
            },
            include: [{
                association: 'attribute',
            }],
        });
        if (thing) {
            res.status(200);
            res.json(thing);
            return;
        }
    }
    res.status(404);
    res.send();
});

thingRouter.put('/:id', async (req, res) => {
    if (isNumber(req.params.id)) {
        const existed = await Thing.findOne({
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

thingRouter.delete('/:id', async (req, res) => {
    await Thing.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.status(200);
    res.send();
});

export default thingRouter;
