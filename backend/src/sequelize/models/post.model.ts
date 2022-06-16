import { Sequelize, DataTypes, Optional, Model } from 'sequelize';

interface PostsAttributes {
      postId: number,
      userId: number,
      type: number,
      description: string,
}

interface PostsCreationAttributes extends Optional<PostsAttributes, 'postId'> {}

interface PostsInstance extends Model<PostsAttributes, PostsCreationAttributes>, PostsAttributes {
      createdAt?: Date;
      updatedAt?: Date;
}

const Posts = (sequelize: Sequelize) => { sequelize.define<PostsInstance>('Posts', {
      postId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
      },
      userId: {
            type: DataTypes.INTEGER,
            references: { model: 'Users', key: 'userId' },
            onDelete: 'cascade',
      },
      type: {
            type: DataTypes.ENUM,
            values: ['video', 'image', 'text'],
      },
      description: {
            type: DataTypes.STRING(256),
            allowNull: false,
      },
}, {
      
});
};


export { Posts, PostsInstance };