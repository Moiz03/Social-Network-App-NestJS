import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import * as jwt from 'jsonwebtoken';

@Injectable()
// middleware token verification
export class tokenVerification implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.body.authToken || req.header('authToken');

    // if token not available then response with 401 http status
    if (!token) return res.status(401).json('provide Authorization Token');

    try {
      // verifying if giving authorization token is correct or not.
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;

      // if correct, then move to next function
      next();
    } catch (err) {
      // if not correct, then return the 'invalid token' response
      return res.status(400).json('Invalid Token');
    }
  }
}
