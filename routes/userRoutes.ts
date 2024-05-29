// userRoutes.ts

import express from 'express';
import { updateUserDataHandler, fetchUserDataHandler, findAllUsersDataHandler } from '../controller/api';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.put('/update-user-data', authMiddleware, updateUserDataHandler);
router.get('/fetch-user-data', authMiddleware, fetchUserDataHandler);
router.get('/get-all', authMiddleware, findAllUsersDataHandler);



export default router;
