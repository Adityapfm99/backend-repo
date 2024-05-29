import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import { ApiError } from '../entities/apiError';

interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json(new ApiError('Unauthorized'));
  }

  const authToken = authHeader.split(' ')[1];

  if (!authToken) {
    return res.status(401).json(new ApiError('Unauthorized'));
  }

  admin.auth().verifyIdToken(authToken)
    .then(decodedToken => {
      req.user = decodedToken;
      next();
    })
    .catch(error => {
      console.error('Error verifying token:', error);
      return res.status(403).json(new ApiError('Forbidden'));
    });
};
