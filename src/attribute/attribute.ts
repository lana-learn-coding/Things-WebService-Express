import { DataTypes, Model, Sequelize } from 'sequelize';

export class Attribute extends Model {
    public id!: number;
    public name!: string;
    public description!: string;

    // timestamp, sequelize auto add this
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function initAttribute(sequelize: Sequelize) {
    Attribute.init({
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
        tableName: 'attribute',
    });

    return Attribute;
}
