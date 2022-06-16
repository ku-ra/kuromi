import { Request, Response } from 'express';

import * as Relations from '../interfaces/relation.interface'

import { getByUsernameId } from '../interfaces/user.interface';

export const follow = async (req: Request, res: Response) => {
      if (!req.user) {
            return res.sendStatus(403);
      }

      if (!req.body.targetUsername) {
            return res.sendStatus(400);
      }

      const target = await getByUsernameId(req.body.targetUsername)

      if(target){
            Relations.create({targetId: target.userId, initiatorId: req.user.userId, type: 'follow'})
            .then((relation) => {
                  return res.sendStatus(201);
            })
            .catch((error) => {
                  return res.sendStatus(500);
            });
      }  
}

export const unfollow = async (req: Request, res: Response) => {
      if (!req.user) {
            return res.sendStatus(403);
      }

      if (!req.body.targetUsername) {
            return res.sendStatus(400);
      }

      const target = await getByUsernameId(req.body.targetUsername)

      if (target) {
            Relations.remove({targetId: target.userId, initiatorId: req.user.userId, type: 'follow'})
            .then((relation) => {
                  return res.sendStatus(200);
            })
            .catch((error) => {
                  return res.sendStatus(500);
            });
      }
}

export const isFollowing = async (req: Request, res: Response) => {
      if (!req.user) {
            return res.sendStatus(403);
      }

      if (!req.body.targetUsername) {
            return res.sendStatus(400);
      }

      const target = await getByUsernameId(req.body.targetUsername);

      if (target) {
            return res.status(200).json({ status: (await Relations.isFollowing(target.userId, req.user.userId)) });
      }

      return res.sendStatus(500);
}