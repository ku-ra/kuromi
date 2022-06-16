import { Order } from 'sequelize'
import sequelize from '../../sequelize'
import { FilesInstance } from '../../sequelize/models/file.model';

const Files = sequelize.models.Files;

export const getById = async (fileId: number) => {
      return await Files.findByPk(fileId)
            .catch((error) => error);
}

export const getByPostId = async (postId: number) => {
      return await Files.findAll({where: { postId: postId }})
            .catch((error) => error);
}

export const create = async (values: any) => {
      return await Files.create(values) as FilesInstance;
}

export const remove = async (fileId: number) => {
      return await Files.destroy({ where: { fileId: fileId }});
}

export const removeByPostId = async (postId: number) => {
      return await Files.destroy({ where: { postId: postId }});
}