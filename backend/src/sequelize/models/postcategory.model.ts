import { Sequelize, DataTypes, Optional, Model } from 'sequelize';

interface PostCategoriesAttributes {
      postId: number,
      catId: number,
}

interface PostCategoriesCreationAttributes extends Optional<PostCategoriesAttributes, 'postId'> {}

interface PostCategoriesInstance extends Model<PostCategoriesAttributes, PostCategoriesCreationAttributes>, PostCategoriesAttributes {
      createdAt?: Date;
      updatedAt?: Date;
}

const PostCategories = (sequelize: Sequelize) => { sequelize.define<PostCategoriesInstance>('PostCategories', {
      postId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: { model: 'Posts', key: 'postId' },
            onDelete: 'cascade',
      },
      catId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: { model: 'Categories', key: 'catId' },
            onDelete: 'cascade',
      },
}, {
  // Other model options go here
});
};

export { PostCategories, PostCategoriesInstance }