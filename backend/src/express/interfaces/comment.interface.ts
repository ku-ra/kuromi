import { Order } from 'sequelize'
import sequelize from '../../sequelize'

const Comments = sequelize.models.Comments;

// Interface to see user's comments
export const getByUserId = async (userId: number, limit?: number, offset?: number, order?: Order) => {
      return await Comments.findAll({ where: { userId: userId }, limit: limit, offset: offset, order: order});
}

// Main Query to see all comments for a post
export const getByPostId = async (postId: number, limit?: number, offset?: number, order?: Order) => {
      return await Comments.findAll({ where: { postId: postId }, limit: limit, offset: offset, order: order});
}

export const getCountByPostId = async (postId: number) => {
      return await Comments.findAndCountAll({ where: { postId: postId }});
}

export const getCountByUserId = async (userId: number) => {
      return await Comments.findAndCountAll({ where: { userId: userId }});
}

export const create = async (values: any) => {
      return await Comments.create(values)
            .catch((error) => error);
}

export const remove = async (commentId: number) => {
      return await Comments.destroy({ where: { postId: commentId }});
}