import sequelize from '../../sequelize'
import { Sequelize } from 'sequelize'
import { PostsInstance } from '../../sequelize/models/post.model';
import { getFollowingIds } from './relation.interface';

const Users = sequelize.models.Users;
const Posts = sequelize.models.Posts;
const Likes = sequelize.models.Likes;
const Files = sequelize.models.Files;

export const getAll = async () => {
      return await Posts.findAll();
}

export const getById = async (id: number) => {
      return await Posts.findByPk(id)
            .catch((error) => error);
}

export const getByUser = async (userId: number, limit?: number, offset?: number) => {
      return await Posts.findAll({ 
            attributes: ['postId', 'type'],
            where: { userId: userId }, 
            limit: limit, 
            offset: offset, 
            order: [['createdAt', 'DESC']], 
            include: [
                  { 
                        model: sequelize.models.Files, attributes: ['fileType', 'filePath', 'thumbnailPath', 'createdAt'], 
                        limit: 1, 
                        order: [['createdAt', 'ASC']] 
                  }
            ]
      })
}

export const getAnonHomeData = async (limit?: number, offset?: number) => {
      return await Posts.findAll({
            attributes: ['postId', 'type', 'description', 'createdAt' ],
            include: [
                  { model: sequelize.models.Files, attributes: ['fileType', 'filePath', 'createdAt']}, 
                  { model: sequelize.models.Likes, attributes: [[Sequelize.literal('(SELECT COUNT(*) FROM "Likes" likes where likes."postId" = "Posts"."postId")'), 'likeCount']] },
                  { model: sequelize.models.Comments, attributes: [[Sequelize.literal('(SELECT COUNT(*) FROM "Comments" comments where comments."postId" = "Posts"."postId")'), 'commentCount']] },
                  { model: sequelize.models.Users, attributes: ['userId', 'username', 'customname', 'avatar', 'description'],
                        include: [
                              {
                                    model: sequelize.models.ActiveBadges,
                                    attributes: [[Sequelize.literal('(SELECT "badgePath" FROM "Badges" badges WHERE badges."badgeId" = "User->ActiveBadge"."badgeId")'), 'badgePath']]
                              }
                        ]
                  }
            ],
            limit: limit, 
            offset: offset,
            order: [
                  ['createdAt', 'DESC']
            ]
      })
}


export const getHomeData = async (userId: number, limit?: number, offset?: number) => {
      return await Posts.findAll({
            attributes: ['postId', 'type', 'description', 'createdAt'],
            include: [
                  { model: sequelize.models.Files, attributes: ['fileType', 'filePath', 'createdAt']}, 
                  { model: sequelize.models.Likes, attributes: [[Sequelize.literal('(SELECT COUNT(*) FROM "Likes" likes where likes."postId" = "Posts"."postId")'), 'likeCount']] },
                  { model: sequelize.models.Comments, attributes: [[Sequelize.literal('(SELECT COUNT(*) FROM "Comments" comments where comments."postId" = "Posts"."postId")'), 'commentCount']] },
                  { model: sequelize.models.Users, attributes: ['userId', 'username', 'customname', 'avatar', 'description'],
                        include: [
                              {
                                    model: sequelize.models.ActiveBadges,
                                    attributes: [[Sequelize.literal('(SELECT "badgePath" FROM "Badges" badges WHERE badges."badgeId" = "User->ActiveBadge"."badgeId")'), 'badgePath']]
                              }
                        ], 
                        where: { userId: await getFollowingIds(userId) }
                  }
            ],
            limit: limit, 
            offset: offset,
            order: [
                  ['createdAt', 'DESC']
            ]
      })
}

export const getProfileData = async (userId: number) => {
      return await Users.findOne({ 
            attributes: ['userId', 'username', 'customname', 'avatar', 'description'],
            where: { userId: userId }, 
            include: [
                  { model: sequelize.models.Posts, attributes: ['postId', 'type', 'description', 'createdAt'],
                        include: [
                              { model: sequelize.models.Files, attributes: ['fileType', 'filePath', 'createdAt'], limit: 1, order: [['createdAt', 'ASC']]}, 
                        ]
                  }
            ],
      });
}

export const getDetailedInfo = async (postId: number) => {
      return await Posts.findOne({ 
            attributes: ['postId', 'type', 'description', 'createdAt'],
            where: { postId: postId }, 
            include: [
                  { model: sequelize.models.Files, attributes: ['fileType', 'filePath', 'createdAt'], order: [['createdAt', 'ASC']] },
                  { model: sequelize.models.Users, attributes: ['username', 'avatar', 'customname', 'description'], 
                        include: [
                              {
                                    model: sequelize.models.ActiveBadges,
                                    attributes: [[Sequelize.literal('(SELECT "badgePath" FROM "Badges" badges WHERE badges."badgeId" = "User->ActiveBadge"."badgeId")'), 'badgePath']]
                              }
                  ]}, 
                  { model: sequelize.models.Likes, attributes: [[Sequelize.literal('(SELECT COUNT(*) FROM "Likes" likes where likes."postId" = "Posts"."postId")'), 'likeCount']] },
                  { model: sequelize.models.Comments, attributes: ['postId', 'userId', 'comment', 'createdAt'],
                        include: [
                              { 
                                    model: sequelize.models.Users, attributes: ['username', 'avatar', 'customname', 'description'],
                                    include: [
                                          {
                                                model: sequelize.models.ActiveBadges,
                                                attributes: [[Sequelize.literal('(SELECT "badgePath" FROM "Badges" badges WHERE badges."badgeId" = "User->ActiveBadge"."badgeId")'), 'badgePath']]
                                          }
                                    ]
                              }, 
                        ]
                  }
            ],
      });
}


export const create = async (attributes: {userId: number, type: string, description: string}) => {
      return await Posts.create(attributes) as PostsInstance;
}

export const remove = async (id: number) => {
      return await Posts.destroy({ where: { id: id }});
}

export const removeByUser = async (userId: number) => {
      return await Posts.destroy({ where: { userId: userId }});
}