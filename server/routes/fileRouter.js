import { Router } from "express";
import File from "../models/File.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import fileController from "../controllers/fileController.js";


const fileRouter = new Router;

fileRouter.post('', authMiddleware, fileController.createDir)
fileRouter.get('', authMiddleware, fileController.getFiles)

export default fileRouter