// backend-repo/controller/api.ts

import { Request, Response } from 'express';
import { ApiError } from '../entities/apiError';
import db from '../config/firebaseConfig';
import * as admin from 'firebase-admin';

interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}
/**
 * @swagger
 * components:
 *   schemas:
 *     ApiError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         message:
 *           type: string
 */

/**
 * @swagger
 *   components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /api/update-user-data:
 *   put:
 *     summary: Update user data
 *     description: Update user data in the Firestore database.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token for user authentication.
 *       - in: body
 *         name: userData
 *         description: User data to be updated.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             // Define your schema for userData here
 *     responses:
 *       200:
 *         description: User data updated successfully.
 *       401:
 *         description: Unauthorized - User not authenticated.
 *       500:
 *         description: Internal Server Error - Something went wrong.
 */

export const updateUserDataHandler = (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json(new ApiError('Unauthorized'));
  }
  const userId = req.user.uid;
  const userData = req.body;

  db.collection('users').doc(userId).set(userData, { merge: true })
    .then(() => {
      res.status(200).json({ message: 'User data updated successfully' });
    })
    .catch(error => {
      console.error('Error updating user data:', error);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    });
};

/**
 * @swagger
 *   components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /api/fetch-user-data:
 *   get:
 *     summary: Fetch user data
 *     description: Fetch user data from the Firestore database.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token for user authentication.
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID to fetch data for.
 * 
 *     responses:
 *       200:
 *         description: User data fetched successfully.
 *       401:
 *         description: Unauthorized - User not authenticated.
 *       500:
 *         description: Internal Server Error - Something went wrong.
 */

export const fetchUserDataHandler = (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json(new ApiError('Unauthorized'));
  }

  const userId = req.query.userId;
  db.collection('users').where("userId", "==", userId).get()
  .then(snapshot => {
    const users: any[] = [];
    snapshot.forEach(doc => {
      users.push(doc.data());
    });
    console.log(users)

    if (users.length === 0) {
      res.status(404).json(new ApiError('user not found'));
    }
    res.status(200).json(users); 
  })
  .catch(error => {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Send an error response as JSON
  });
};

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * paths:
 *   /api/get-all:
 *     get:
 *       summary: Retrieve all users
 *       description: Retrieve a list of all users from the database.
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         200:
 *           description: A list of users.
 *         401:
 *           description: Unauthorized - User not authenticated.
 *         500:
 *           description: Internal Server Error - Something went wrong.
 */


export const findAllUsersDataHandler = (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json(new ApiError('Unauthorized'));
  }

  db.collection('users').get()
    .then(snapshot => {
      const users: any[] = [];
      snapshot.forEach(doc => {
        users.push(doc.data());
      });
      console.log('=====',users)
      res.status(200).json(users);
    })
    .catch(error => {
      console.error('Error fetching users:', error);
      res.status(500).json(new ApiError('Internal Server Error'));
    });
};