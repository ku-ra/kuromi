import path from 'path'
import Multer from 'multer'
import express from 'express'
import passport from 'passport'
import flash from 'connect-flash'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import LocalStrategy from 'passport-local';
import cors from 'cors';

import * as Auth from './auth';
import * as FileUtils from '../utils/file.utils'

import * as AuthRoutes from './routes/auth.route'
import * as FileRoutes from './routes/file.route'
import * as PostRoutes from './routes/post.route'
import * as UserRoutes from './routes/user.route'
import * as RelationRoutes from './routes/relation.route'


const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(expressSession({secret: '7cb9aebf9f49d1843c46661afcd577642cc937eb6dbb81d061c89701cef4647b', resave: false, saveUninitialized: false}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/static', express.static(path.join(__dirname, '../../static')));

passport.use(new LocalStrategy.Strategy(Auth.authenticate));
passport.serializeUser(Auth.serialize);
passport.deserializeUser(Auth.deserialize);

app.get('/', (req, res) => {
	res.send(`
		
      `);
});

const routes = {
      users: UserRoutes
}

const makeHandlerAwareOfAsyncErrors = (handler: express.RequestHandler) => {
	return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		try {
			handler(req, res, next);
		} catch (error) {
			next(error);
		}
	};
}

const storage = Multer.diskStorage({destination: FileUtils.destinationHandler, filename: FileUtils.fileHandler});

const upload = Multer({ storage: storage, fileFilter: FileUtils.fileFilter, limits: { fileSize: (1 * 1024 * 1024 * 1024) }});


app.post(
      '/api/v1/files/upload/avatar', 
      Auth.authenticated,
      upload.single('avatar'), 
      makeHandlerAwareOfAsyncErrors(FileRoutes.updateAvatar)
);

app.post(
      '/api/v1/posts/create', 
      Auth.authenticated,
      upload.fields([{name: 'postfiles', maxCount: 5}]), 
      makeHandlerAwareOfAsyncErrors(PostRoutes.create)
);

app.post(
      '/api/v1/accounts/register', 
      upload.single('avatar'),
      makeHandlerAwareOfAsyncErrors(AuthRoutes.register)
);

app.post(
      '/api/v1/accounts/login',
      passport.authenticate('local', { successRedirect: '/',/* failureRedirect: '/login',*/ failureFlash: true })
);

app.post(
      '/api/v1/accounts/logout',
      Auth.authenticated,
      makeHandlerAwareOfAsyncErrors(AuthRoutes.logout)
);

app.get(
      `/api/v1/users/user/:username`,
      makeHandlerAwareOfAsyncErrors(UserRoutes.getByUsername)
);

app.post(
      `/api/v1/users/profile/:username`,
      makeHandlerAwareOfAsyncErrors(UserRoutes.getProfileData)
);


app.post(
      `/api/v1/users/exists/:username`,
      makeHandlerAwareOfAsyncErrors(UserRoutes.isExists)
);

app.post(
      `/api/v1/users/edit`,
      Auth.authenticated,
      makeHandlerAwareOfAsyncErrors(UserRoutes.update) 
)

app.post(
      `/api/v1/posts/user`,
      Auth.authenticated,
      makeHandlerAwareOfAsyncErrors(PostRoutes.getByUser)
);

app.post(
      `/api/v1/posts/home`,
      makeHandlerAwareOfAsyncErrors(PostRoutes.getHomeData)
);


app.get(
      `/api/v1/posts/home`,
      makeHandlerAwareOfAsyncErrors(PostRoutes.getHomeData)
);

app.post(
      `/api/v1/posts/info`,
      makeHandlerAwareOfAsyncErrors(PostRoutes.getDetailedInfo)
);

app.post(
      `/api/v1/relations/follow`,
      Auth.authenticated,
      makeHandlerAwareOfAsyncErrors(RelationRoutes.follow)
)

app.post(
      `/api/v1/relations/unfollow`,
      Auth.authenticated,
      makeHandlerAwareOfAsyncErrors(RelationRoutes.unfollow)
)

app.post(
      `/api/v1/relations/follow/status`,
      Auth.authenticated,
      makeHandlerAwareOfAsyncErrors(RelationRoutes.isFollowing)     
)


for (const [routeName, routeController] of Object.entries(routes)) {
      if (typeof routeController.getAll == 'function') {
            app.get(
                  `/api/v1/${routeName}`,
                  makeHandlerAwareOfAsyncErrors(routeController.getAll),
            );
      }
      if (typeof routeController.getById == 'function') {
            app.get(
                  `/api/v1/${routeName}/id/:id`,
                  makeHandlerAwareOfAsyncErrors(routeController.getById),
            );
      }
      if (typeof routeController.remove == 'function') {
            app.delete(
                  `/api/v1/${routeName}/remove`,
                  makeHandlerAwareOfAsyncErrors(routeController.remove),
            );
      }
}

export default app;
