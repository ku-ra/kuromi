import { Sequelize, DataTypes } from 'sequelize';

const Verifications = (sequelize: Sequelize) => { sequelize.define('Verifications', {
      verificationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
      },
      userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'user', key: 'userId'},
      },
      filePath: {
            type: DataTypes.STRING(256),
            allowNull: false,
      },
}, {
  // Other model options go here
});
};

export default Verifications;