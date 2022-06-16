import { Sequelize, DataTypes, Optional, Model } from 'sequelize';

interface CommentsAttributes {
      commentId: number,
      postId: number,
      userId: number,
      comment: string,
}

interface CommentsCreationAttributes extends Optional<CommentsAttributes, 'commentId'> {}

interface CommentsInstance extends Model<CommentsAttributes, CommentsCreationAttributes>, CommentsAttributes {
      createdAt?: Date;
      updatedAt?: Date;
}

const Comments = (sequelize: Sequelize) => { 
      sequelize.define<CommentsInstance>('Comments', {
            commentId: {
                  type: DataTypes.INTEGER,
                  primaryKey: true,
                  autoIncrement: true,
                  allowNull: false,
            },
            postId: {
                  type: DataTypes.INTEGER,
                  references: { model: 'Posts', key: 'postId' },
                  onDelete: 'cascade',
            },
            userId: {
                  type: DataTypes.INTEGER,
                  references: { model: 'Users', key: 'userId'},
            },
            comment: {
                  type: DataTypes.STRING(256),
                  allowNull: false,
            },
      }, {
      // Other model options go here
      });
};

export { Comments, CommentsInstance };