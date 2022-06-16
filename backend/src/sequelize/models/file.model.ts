import { Sequelize, DataTypes, Optional, Model } from 'sequelize';

interface FilesAttributes {
      fileId: number,
      postId: number,
      fileType: number,
      filePath: string,
      thumbnailPath: string,
      fileSize: number,
}

interface FilesCreationAttributes extends Optional<FilesAttributes, 'fileId'> {}

interface FilesInstance extends Model<FilesAttributes, FilesCreationAttributes>, FilesAttributes {
      createdAt?: Date;
      updatedAt?: Date;
}

const Files = (sequelize: Sequelize) => { 
      sequelize.define<FilesInstance>('Files', {
            fileId: {
                  type: DataTypes.BIGINT,
                  primaryKey: true,
                  autoIncrement: true,
                  allowNull: false,
            },
            postId: {
                  type: DataTypes.INTEGER,
                  references: { model: 'Posts', key: 'postId' },
                  onDelete: 'cascade',
            },
            fileType: {
                  type: DataTypes.ENUM,
                  values: ['video', 'image', 'audio'],
                  allowNull: false,
            },
            filePath: {
                  type: DataTypes.STRING(256),
                  allowNull: false,
            },
            thumbnailPath: {
                  type: DataTypes.STRING(256),
                  allowNull: false,
            },
            fileSize: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
            },

      })
}


export { Files, FilesInstance };