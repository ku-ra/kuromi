import { Order } from 'sequelize'
import sequelize from '../../sequelize'
import { RelationsInstance } from '../../sequelize/models/relation.model';

const Relations = sequelize.models.Relations;

export const getByInitiatorId = async (userId: number, limit?: number, offset?: number, order?: Order) => {
      return await Relations.findAll({ where: { initiatorId: userId }, limit: limit, offset: offset, order: order}) as RelationsInstance[];
}

export const getByTargetId = async (userId: number, limit?: number, offset?: number, order?: Order) => {
      return await Relations.findAll({ where: { targetId: userId }, limit: limit, offset: offset, order: order}) as RelationsInstance[];
}


export const getFollowings = async (userId: number) => {
      return await Relations.findAll({where: { initiatorId: userId, type: 'follow' }}) as RelationsInstance[];
}

export const getFollowingIds = async (userId: number) => {
      return (await Relations.findAll({
            attributes: ['targetId'], 
            where: { initiatorId: userId, type: 'follow' }
      }) as RelationsInstance[])
      .map((relation) => { return relation.targetId });
}

export const getBlocked = async (userId: number) => {
      return await Relations.findAll({where: { initiatorId: userId, type: 'block' }}) as RelationsInstance[];
}

export const getFollowingCount = async (userId: number) => {
      return (await Relations.findAndCountAll({ where: { initiatorId: userId, type: 'follow' } })).count;
}


export const getFollowerCount = async (userId: number) => {
      return (await Relations.findAndCountAll({ where: { targetId: userId, type: 'follow' } })).count;
}

export const isFollowing = async (targetId: number, initiatorId: number) => {
      return !!(await Relations.findOne({ where: {targetId: targetId, initiatorId: initiatorId }}));
}

export const update = async (targetId: number, initiatorId: number, type: number, newType: number) => {
      return await Relations.update({type: newType}, { where: { targetId: targetId, initiatorId: initiatorId, type: type }});
}

export const updateByRelationId = async (relationId: number, type: number) => {
      return await Relations.update({type: type}, { where: { relationId: relationId }});
}


export const create = async (values: any) => {
      return await Relations.create(values) as RelationsInstance;
}


export const removeByRelationId = async (relationId: number) => {
      return await Relations.destroy({ where: { relationId: relationId }});
}

export const remove = async (options: {targetId: number, initiatorId: number, type: string}) => {
      return await Relations.destroy({ where: { targetId: options.targetId, initiatorId: options.initiatorId, type: options.type }});
}