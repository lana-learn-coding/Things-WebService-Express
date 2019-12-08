import {Association, DataTypes, Model, Sequelize} from 'sequelize';
import {Attribute} from '../attribute/attribute';

export class Thing extends Model {
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

export function initThing(sequelize: Sequelize) {
    Thing.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
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

    return Thing;
}
