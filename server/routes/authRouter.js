import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import config from "config";
import { check, validationResult } from "express-validator";
import authMiddleware from "../middlewares/authMiddleware.js";
import fileService from "../services/fileService.js";
import File from "../models/File.js";

const authRouter = Router();


authRouter.get('/login', (req, res) => {
    res.json({message: 'hello'})
})

authRouter.post('/registration', [
    check('email', 'Uncorrect E-Mail').isEmail(),
    check('password', 'Password must be longer that 3 and shorter than 20').isLength({min: 3, max: 20})
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({message: 'Uncorrect request', errors})
        }

        const {email, password} = req.body;
        const candidate = await User.findOne({email});

        if (candidate) {
            return res.status(400).json({message: 'Email is already used'})
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({email, password: hashPassword});
        // await user.save();
        await fileService.createDir(new File({user: user.id, name: ''}))

        const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: '1h'});

        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar
            }
        })

    } catch(e) {
        console.log(e);
        res.json({message: 'Server error'})
    }
})

authRouter.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: 'Auth error'})
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({message: 'Auth error'})
        }

        const token = jwt.sign({id: user._id}, config.get('secretKey'), {expiresIn: '1h'});

        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar
            }
        })

    } catch(e) {
        console.log(e);
        res.json({message: 'Server error'})
    }
})

authRouter.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user.id});
        
        const token = jwt.sign({id: user._id}, config.get('secretKey'), {expiresIn: '1h'});

        return res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar
            }
        })

    } catch(e) {
        console.log(e);
        res.json({message: 'Server error'})
    }
})

export default authRouter;