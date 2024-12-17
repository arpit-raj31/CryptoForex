import express from 'express';
import authRoutes from './authRoutes.js';
import adminroutes from './adminroutes.js';

import walletRoutes from './account.js';

const router = express.Router();

router.use('/user', authRoutes);

router.use('/admin', adminroutes);

router.use('/user/account', walletRoutes);

export default router;
