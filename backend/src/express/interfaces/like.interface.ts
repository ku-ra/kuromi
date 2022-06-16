import { Order } from 'sequelize'
import sequelize from '../../sequelize'

const Likes = sequelize.models.Likes;

export const getByUserId = async (userId: number, limit?: number, offset?: number, order?: Order) => {
      return await Likes.findAll({ where: { userId: userId }, limit: limit, offset: offset, order: order});
}

export const getByPostId = async (postId: number, limit?: number, offset?: number, order?: Order) => {
      return await Likes.findAll({ where: { postId: postId }, limit: limit, offset: offset, order: order});
}

export const getCountByPostId = async (postId: number) => {
      return (await Likes.findAndCountAll({ where: { postId: postId } })).count;
}

export const getCountByUserId = async (userId: number) => {
      return (await Likes.findAndCountAll({ where: { userId: userId }})).count;
}

export const update = async (postId: number, values: any) => {
      return await Likes.update(values, { where: { postId: postId }});
}

export const create = async (values: any) => {
      return await Likes.create(values)
            .catch((error) => error);
}

export const remove = async (postId: number) => {
      return await Likes.destroy({ where: { postId: postId }});
}