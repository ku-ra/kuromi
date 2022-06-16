import { Sequelize, DataTypes, Optional, Model } from 'sequelize';

interface ActiveBadgesAttributes {
      activeId: number,
      userId: number,
      badgeId: number,
}

interface ActiveBadgesCreationAttributes extends Optional<ActiveBadgesAttributes, 'activeId'> {}

interface ActiveBadgesInstance extends Model<ActiveBadgesAttributes, ActiveBadgesCreationAttributes>, ActiveBadgesAttributes {
      createdAt?: Date;
      updatedAt?: Date;
}

const ActiveBadges = (sequelize: Sequelize) => { 
      sequelize.define<ActiveBadgesInstance>('ActiveBadges', {
            activeId: {
                  type: DataTypes.BIGINT,
                  primaryKey: true,
                  autoIncrement: true,
                  allowNull: false,
            },
            userId: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  unique: true,
                  references: { model: 'Users', key: 'userId' }
            },
            badgeId: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  references: { model: 'Badges', key: 'badgeId' }
            },
      })
}


export { ActiveBadges, ActiveBadgesInstance };