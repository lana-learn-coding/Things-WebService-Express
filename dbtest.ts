import { Sequelize } from 'sequelize';

import { initThing } from './src/thing/thing';
import { initAttribute } from './src/attribute/attribute';

const sequelize = new Sequelize('sqlite::memory:');

const Thing = initThing(sequelize);
const Attribute = initAttribute(sequelize);

sequelize.sync()
    .then(() => Attribute.create({
        name: 'fist attribute',
        description: 'the first attribute'
    }))
    .then((entity) => console.log(entity.toJSON()))
    .then(() => Thing.create({
        name: 'new thing',
        description: 'yeah',
        attribute: 1
    }))
    .then((entity) => console.log(entity.toJSON()));
