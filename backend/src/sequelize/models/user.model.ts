import { Sequelize, DataTypes, Optional, Model } from 'sequelize';

interface UsersAttributes {
      userId: number,
      username: string,
      customname: string,
      password: string,
      attempts: number,
      email: string,
      avatar: string,
      description: string,
      lastAttempt: Date,
}

interface UsersCreationAttributes extends Optional<UsersAttributes, 'userId'> {}

interface UsersInstance extends Model<UsersAttributes, UsersCreationAttributes>, UsersAttributes {
      createdAt?: Date;
      updatedAt?: Date;
}

const Users = (sequelize: Sequelize) => { sequelize.define<UsersInstance>('Users', {
      userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
      },
      username: {
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: false,
      },
      customname: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: ''
      },
      password: {
            type: DataTypes.STRING(64),
            allowNull: false,
      },
      attempts: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
      },
      email: {
            type: DataTypes.STRING(64),
            unique: true,
            allowNull: false,
      },
      avatar: {
            type: DataTypes.STRING(256),
            allowNull: false,
            defaultValue: 'http:\\\\localhost:8001\\static\\avatars\\img_blank.jpg',
      },
      description: {
            type: DataTypes.STRING(256),
            defaultValue: '',
      },
      lastAttempt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
      }
}, {
  // Other model options go here
});
};

export { Users, UsersInstance };