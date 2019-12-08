import { DataTypes, Model, Sequelize } from 'sequelize';

export class Thing extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public attribute!: string;

    //timestamp, sequelize auto add this
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function initThing(sequelize: Sequelize) {
    Thing.init({
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
        },
        attribute: {
            type: DataTypes.INTEGER.UNSIGNED
        }
    }, {
        sequelize: sequelize,
        tableName: 'thing'
    });
    return Thing;
}
