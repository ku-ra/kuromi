import { Sequelize, DataTypes, Optional, Model } from 'sequelize';

interface LikesAttributes {
      likeId: number,
      postId: number,
      userId: number,
}

interface LikesCreationAttributes extends Optional<LikesAttributes, 'likeId'> {}

interface LikesInstance extends Model<LikesAttributes, LikesCreationAttributes>, LikesAttributes {
      createdAt?: Date;
      updatedAt?: Date;
}


const Likes = (sequelize: Sequelize) => { 
      sequelize.define<LikesInstance>('Likes', {
            likeId: {
                  type: DataTypes.BIGINT,
                  primaryKey: true,
                  autoIncrement: true,
                  allowNull: false,    
            },
            postId: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  references: { model: 'Posts', key: 'postId'},
                  onDelete: 'cascade',
            },
            userId: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  references: { model: 'Users', key: 'userId'},
                  onDelete: 'cascade',
            },
      }, {
            indexes: [
                  { 
                        unique: true,
                        fields: ['postId', 'userId']
                  }
            ]
      });
};

export { Likes, LikesInstance };