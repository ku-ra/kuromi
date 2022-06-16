import { Request, Response } from 'express';
import { Model } from 'sequelize/types';

import * as Posts from '../interfaces/post.interface'
import { uploadPostFiles } from './file.route';

export const getByUser = async (req: Request, res: Response) => {
      let   limit = 10, 
            offset = undefined;

      if (req.body.limit) {
            limit = req.body.limit;
      }

      if (req.body.offset) {
            offset = req.body.limit;
      }

      if (req.body.userId) {
            res.status(200).json(await Posts.getByUser(limit, offset));
      } else {
            res.sendStatus(400);
      }
}

export const getHomeData = async (req: Request, res: Response) => {
      let   limit = 10, 
            offset = undefined;

      if (req.body.limit) {
            limit = req.body.limit;
      }

      if (req.body.offset) {
            offset = req.body.limit;
      }

      let posts: Model<any, any>[] | null = null;

      if (!req.user) {
            posts = await Posts.getAnonHomeData(limit, offset);
      } else {
            posts = await Posts.getHomeData(req.user.userId, limit, offset);
      }

      if (!posts) {
            return res.sendStatus(500);
      }

      res.status(200).json(posts);
}

export const getDetailedInfo = async (req: Request, res: Response) => {
      if (!req.body.postId) {
            return res.sendStatus(400);
      }

      const posts = await Posts.getDetailedInfo(req.body.postId);
      
      if (!posts) {
            return res.sendStatus(500);
      }

      res.status(200).json(posts);
}


export const create = async (req: Request, res: Response) => {
      if (!req.user) {
            return res.sendStatus(400);
      }
      
      if (!req.body.description) {
            return res.sendStatus(400);
      }

      if (!req.body.type) {
            return res.sendStatus(400);
      }

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      if (!files['postfiles'] && req.body.type != 'text') {
            return res.sendStatus(400);
      }
      
      const post = await Posts.create({userId: req.user.userId, type: req.body.type, description: req.body.description})

      if (!post) {
            return res.sendStatus(500);
      }
      
      if (req.body.type == 'text') {
            console.log('text');
            return res.sendStatus(201);
      }

      const created = await uploadPostFiles(post.postId, files['postfiles'])

      if (created) {
            return res.sendStatus(201);
      }

      return res.sendStatus(500);
}