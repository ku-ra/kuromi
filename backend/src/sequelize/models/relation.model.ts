import { Sequelize, DataTypes, Optional, Model } from 'sequelize';

interface RelationsAttribute {
      relationId: number,
      targetId: number,
      initiatorId: number,
      type: number
}

interface RelationsCreationAttributes extends Optional<RelationsAttribute, 'relationId'> {}

interface RelationsInstance extends Model<RelationsAttribute, RelationsCreationAttributes>, RelationsAttribute {
      createdAt?: Date;
      updatedAt?: Date;
}


const Relations = (sequelize: Sequelize) => { 
      sequelize.define<RelationsInstance>('Relations', {
            relationId: {
                  type: DataTypes.BIGINT,
                  primaryKey: true,
                  autoIncrement: true,
                  allowNull: false,    
            },
            targetId: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  references: { model: 'Users', key: 'userId'},
                  onDelete: 'cascade',
            },
            initiatorId: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  references: { model: 'Users', key: 'userId'},
                  onDelete: 'cascade',
            },
            type: {
                  type: DataTypes.ENUM,
                  values: ['follow', 'block'],
                  allowNull: false,
            }
      }, {
            indexes: [
                  { unique: true, fields: ['targetId', 'initiatorId', 'type']}
            ]
      });
};

export { Relations, RelationsInstance };