import moment from 'moment';

import * as Utils from '../utils/utils'
import * as Crypto from '../crypto/crypto';
import * as Users from './interfaces/user.interface'

import { UsersInstance } from "../sequelize/models/user.model";
import { Request, Response } from 'express';

export const authenticate = async (username: string, password: string, callback: Function) => {
      const user = await Users.getByUsernameLogin(username);

      if (!user) {
            return callback(null, false, { message: 'Incorrect username.'});
      }

      if (canResetAttempts(1, user.lastAttempt)) {
            resetAttempts(user);
      } 

      if (tooManyAttempts(user.attempts, 3)) {
            return callback(null, false, { message: 'Too many attempts.'});
      }

      if (!Crypto.compare(password, user.password)) {
            increaseAttempts(user);
            return callback(null, false, { message: 'Wrong password.'});
      }
      
      return callback(null, user);
}

export const serialize = (req: Request, user: Express.User, callback: Function) => {
      callback(null, user.userId);
}

export const deserialize = (userId: number, callback: Function) => {
      Users.getById(userId)
      .then((user) => callback(null, user));
}

export const authenticated = (req: Request, res: Response, next: Function) => {
      if (req.isAuthenticated()) {
            next();
      } else {
            res.redirect(403, '/');
      }
}

const resetAttempts = (user: UsersInstance) => {
      user.set('attempts', 0), user.save();
}

const increaseAttempts = (user: UsersInstance) => {
      user.increment('attempts');
}

const tooManyAttempts = (count: number, limit: number) => {
      return count > limit;
}

const canResetAttempts = (interval: number, lastAttempt: Date) => {
      return Utils.convertDate(lastAttempt).add(interval, 'hours') > moment();
}