import { Sequelize } from 'sequelize';
import { initAttribute } from './src/attribute/attribute';

import { initThing } from './src/thing/thing';

const sequelize = new Sequelize('sqlite::memory:');

const Attribute = initAttribute(sequelize);
const Thing = initThing(sequelize);

sequelize.sync()
    .then(() => Attribute.create({
        name: 'fist attribute',
        description: 'the first attribute',
    }))
    .then(() => Thing.create({
        name: 'new thing',
        description: 'yeah',
        attributeId: 1,
    }))
    .then(() => Thing.create({
        name: 'new thing 2',
        description: 'new thing with no attribute',
    }))
    .then(() => Thing.findAll({
        include: [{ association: 'attribute' }],
    }))
    .then((entity) => console.log(entity.map((val) => val?.toJSON())));
