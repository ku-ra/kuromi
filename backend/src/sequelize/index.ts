import { Sequelize } from 'sequelize';

import { Categories } from './models/category.model';
import { Comments } from './models/comment.model';
import { Likes } from './models/like.model';
import { Posts } from './models/post.model';
import { PostCategories } from './models/postcategory.model';
import { Users } from './models/user.model';
import { Files } from './models/file.model';
import { Relations } from './models/relation.model';
import { Badges } from './models/badges.model';
import { UserBadges } from './models/userbadges.model';
import { ActiveBadges } from './models/activebadges.model';

const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/backend', { logging: true });

const models = [
      Categories,
      Comments,
      Likes,
      Posts,
      PostCategories,
      Users,
      Files,
      Relations,
      Badges,
      UserBadges,
      ActiveBadges
];

models.forEach((model) => model(sequelize));

(async () => {
      await sequelize.sync();
})();

sequelize.models.Posts.hasMany(sequelize.models.Files, {foreignKey: 'postId', sourceKey: 'postId'});
sequelize.models.Posts.hasMany(sequelize.models.Likes, {foreignKey: 'postId', sourceKey: 'postId'});

sequelize.models.Users.hasMany(sequelize.models.Posts, { foreignKey: 'userId' });
sequelize.models.Posts.belongsTo(sequelize.models.Users, { foreignKey: 'userId' });

sequelize.models.Posts.hasMany(sequelize.models.Comments, { foreignKey: 'postId' });
sequelize.models.Comments.belongsTo(sequelize.models.Posts, { foreignKey: 'postId' });

sequelize.models.Relations.belongsTo(sequelize.models.Users, { foreignKey: 'targetId', targetKey: 'userId' });
sequelize.models.Relations.belongsTo(sequelize.models.Users, { foreignKey: 'initiatorId', targetKey: 'userId' });

sequelize.models.Users.hasMany(sequelize.models.Relations, { foreignKey: 'targetId', sourceKey: 'userId' });
sequelize.models.Users.hasMany(sequelize.models.Relations, { foreignKey: 'initiatorId', sourceKey: 'userId' });

sequelize.models.Comments.belongsTo(sequelize.models.Users, { foreignKey: 'userId' })

sequelize.models.Posts.hasMany(sequelize.models.Comments, { foreignKey: 'postId' })
sequelize.models.Comments.belongsTo(sequelize.models.Posts, { foreignKey: 'postId' })

sequelize.models.Users.hasMany(sequelize.models.UserBadges, { foreignKey: 'userId' });
sequelize.models.Users.hasOne(sequelize.models.ActiveBadges, { foreignKey: 'userId' });

sequelize.models.UserBadges.belongsTo(sequelize.models.Users, { foreignKey: 'userId' });
sequelize.models.UserBadges.belongsTo(sequelize.models.Badges, { foreignKey: 'badgeId' });

sequelize.models.ActiveBadges.belongsTo(sequelize.models.Users, { foreignKey: 'userId' });
sequelize.models.ActiveBadges.belongsTo(sequelize.models.Badges, { foreignKey: 'badgeId' });

sequelize.models.Badges.hasMany(sequelize.models.ActiveBadges, { foreignKey: 'badgeId' });
/*
 * User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
 * User.sync({ force: true }) - This creates the table, dropping it first if it already existed
 * User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
*/

export default sequelize;
