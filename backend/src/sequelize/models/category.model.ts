import { Sequelize, DataTypes, Optional, Model } from 'sequelize';

interface CategoriesAttributes {
      catId: number,
      name: string,
}

interface CategoriesCreationAttributes extends Optional<CategoriesAttributes, 'catId'> {}

interface CategoriesInstance extends Model<CategoriesAttributes, CategoriesCreationAttributes>, CategoriesAttributes {
      createdAt?: Date;
      updatedAt?: Date;
}

const Categories = (sequelize: Sequelize) => { 
      sequelize.define<CategoriesInstance>('Categories', {
            catId: {
                  type: DataTypes.INTEGER,
                  primaryKey: true,
                  autoIncrement: true,
                  allowNull: false,
            },
            name: {
                  type: DataTypes.STRING(16),
                  unique: true,
                  allowNull: false,
            },
      }, {

      });
};

export { Categories, CategoriesInstance };