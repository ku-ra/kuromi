import { Sequelize, DataTypes, Optional, Model } from 'sequelize';

interface UserBadgesAttributes {
      userBadgeId: number,
      userId: number,
      badgeId: number,
}

interface UserBadgesCreationAttributes extends Optional<UserBadgesAttributes, 'userBadgeId'> {}

interface UserBadgesInstance extends Model<UserBadgesAttributes, UserBadgesCreationAttributes>, UserBadgesAttributes {
      createdAt?: Date;
      updatedAt?: Date;
}

const UserBadges = (sequelize: Sequelize) => { 
      sequelize.define<UserBadgesInstance>('UserBadges', {
            userBadgeId: {
                  type: DataTypes.BIGINT,
                  primaryKey: true,
                  autoIncrement: true,
                  allowNull: false,
            },
            userId: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  references: { model: 'Users', key: 'userId' }
            },
            badgeId: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  references: { model: 'Badges', key: 'badgeId' }
            },
      })
}


export { UserBadges, UserBadgesInstance };