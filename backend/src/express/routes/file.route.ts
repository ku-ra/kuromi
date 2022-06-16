import path from 'path'
import config from '../../config/config.json'
import urljoin from 'url-join'

import { getFileType, getStaticPath, imagePath, removeFromPath } from '../../utils/file.utils';
import { Request, Response } from 'express';

import * as Files from '../interfaces/file.interface'
import * as Users from '../interfaces/user.interface'
import * as Videos from '../../utils/media/video.utils';
import * as Images from '../../utils/media/image.utils';
import { Multer } from 'multer';

export const updateAvatar = async (req: Request, res: Response) => {
      if (!req.user) {
            return res.sendStatus(403);
      }
      
      if (!req.file) {
            return res.sendStatus(400);
      }

      return (await setAvatar(req.user.userId, urljoin(config.FILEHOST, removeFromPath(req.file.path, getStaticPath(req.file.path))))) ? res.sendStatus(201) : res.sendStatus(500);
}

export const setAvatar = async (userId: number, path: string) => {
      const changed = await Users.setAvatarById(userId, path)
      if (changed[0]) {
            return true;
      }

      return false;
}

//Technically not a Route but used in Post.Route.ts
export const uploadPostFiles = async (postId: number, files: Express.Multer.File[]) => {
      for (let file of files) { 
            const fileType = getFileType(file);
            const filePath = removeFromPath(file.path, getStaticPath(file.path));

            const thumbnailName = Videos.createThumbnailFilename(filePath);
            const thumbnailPath = path.join(imagePath, thumbnailName);

            if (fileType == 'video') {
                  Videos.createThumbnail({filePath: filePath, saveFileName: thumbnailName, saveLocation: imagePath, timemarks: [ "5%" ]});
            } else {
                  Images.getCroppedThumbnail({filePath: filePath, saveFileName: thumbnailPath});
            }

            const f = await createFile({file: file, postId: postId, filePath: filePath, fileType: fileType, thumbnailPath: thumbnailPath})

            if (!f) {
                  return false;
            }
      }

      return true;
}

const createFile = async (options: {file: Express.Multer.File, postId: number, filePath: string, fileType: string, thumbnailPath: string}) => {
      return await Files.create({
            postId: options.postId, 
            fileType: options.fileType, 
            filePath: urljoin(config.FILEHOST, options.filePath),
            fileSize: options.file.size,
            thumbnailPath: urljoin(config.FILEHOST, removeFromPath(options.thumbnailPath, getStaticPath(options.thumbnailPath))), 
      })
}