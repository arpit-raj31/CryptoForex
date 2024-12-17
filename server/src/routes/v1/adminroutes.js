import express from 'express';
import { registerAdmin, loginAdmin, viewAllUsers, createUser, updateUser, deleteUser , getUserWithAccounts } from '../../controllers/adminController.js';
import {authenticateAdmin, secretKeyMiddleware } from '../../middleware/auth/adminAuth.js';
import { createLiveAccount, deposit, getLiveAccount, updateBalance, withdraw } from './../../controllers/accountController.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', secretKeyMiddleware, loginAdmin);

// User CRUD

router.get('/users', authenticateAdmin, viewAllUsers);
router.post('/users', authenticateAdmin, createUser);
router.put('/users/:id', authenticateAdmin, updateUser);
router.delete('/users/:id', authenticateAdmin, deleteUser);


// Get User With Balance

router.get('/users/:id', authenticateAdmin, getUserWithAccounts);


//User BALANCE CRUD

router.put('/:userId/deposit', authenticateAdmin, deposit);
router.put('/:userId/deposit', authenticateAdmin, deposit);


export default router;
