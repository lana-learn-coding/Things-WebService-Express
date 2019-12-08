import {
    Association,
    DataTypes,
    HasManyAddAssociationMixin,
    HasManyGetAssociationsMixin,
    Model,
    Sequelize
} from 'sequelize';
import { Thing } from '../thing/thing';

export class Attribute extends Model {
    public static associations: {
        things: Association<Attribute, Thing>
    };
    public id!: number;
    public name!: string;
    public description!: string;
    //timestamp, sequelize auto add this
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public addThing!: HasManyAddAssociationMixin<Thing, number>;
    public getThings!: HasManyGetAssociationsMixin<Thing>;
    public things?: Thing[];
}

export function initAttribute(sequelize: Sequelize) {
    Attribute.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        description: {
            type: new DataTypes.STRING(256),
            allowNull: false,
            defaultValue: ''
        }
    }, {
        sequelize: sequelize,
        tableName: 'attribute'
    });

    Attribute.hasMany(Thing, {
        sourceKey: 'id',
        foreignKey: 'attribute',
        as: 'things' // this determines the name in `associations`!
    });

    return Attribute;
}
