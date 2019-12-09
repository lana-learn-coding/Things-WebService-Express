import { Association, DataTypes, Model, Sequelize } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:', {
    logging: false,
});

class Attribute extends Model {
    public id!: number;
    public name!: string;
    public description!: string;

    // timestamp, sequelize auto add this
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

class Thing extends Model {
    public static associations: {
        attribute: Association<Thing, Attribute>;
    };
    public id!: number;
    public name!: string;
    public description!: string;
    // timestamp, sequelize auto add this
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Attribute.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(256),
        allowNull: false,
        defaultValue: '',
    },
}, {
    sequelize,
    tableName: 'attribute',
});

Thing.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(256),
        allowNull: false,
        defaultValue: '',
    },
}, {
    sequelize,
    tableName: 'thing',
});

Thing.belongsTo(Attribute, {
    foreignKey: 'attributeId',
    as: 'attribute',
    targetKey: 'id',
});

export { Attribute, Thing, sequelize };
