import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';



const jwtSecret: string = process.env.JWT_SECRET as string

const auth = async (req : express.Request, res : express.Response, next : Function) => {
  try {
    const token = req.header('Authorization')!.replace('Bearer ', '');
    const decoded : any = jwt.verify(token, jwtSecret);
    const user = await User.findOne({_id: decoded['_id'], 'tokens.token': token});

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({error: 'Please authenticate'});
  }
}

export default auth;