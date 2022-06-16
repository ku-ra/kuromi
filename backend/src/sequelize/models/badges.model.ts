import { Sequelize, DataTypes, Optional, Model } from 'sequelize';

interface BadgesAttributes {
      badgeId: number,
      badgePath: string,
      badgeTitle: string,
      badgeDescription: string,
}

interface BadgesCreationAttributes extends Optional<BadgesAttributes, 'badgeId'> {}

interface BadgesInstance extends Model<BadgesAttributes, BadgesCreationAttributes>, BadgesAttributes {
      createdAt?: Date;
      updatedAt?: Date;
}

const Badges = (sequelize: Sequelize) => { 
      sequelize.define<BadgesInstance>('Badges', {
            badgeId: {
                  type: DataTypes.BIGINT,
                  primaryKey: true,
                  autoIncrement: true,
                  allowNull: false,
            },
            badgePath: {
                  type: DataTypes.STRING(256),
                  allowNull: false,
            },
            badgeTitle: {
                  type: DataTypes.STRING(256),
                  allowNull: false,
            },
            badgeDescription: {
                  type: DataTypes.STRING(256),
                  allowNull: false,
            }
      })
}


export { Badges, BadgesInstance };