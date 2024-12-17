import express from 'express';
import { register, login, validateToken, logout } from '../../controllers/authController.js';

const router = express.Router();


router.post('/register', register);         
router.post('/login', login);                
router.get('/validate-token', validateToken); 
router.post('/logout', logout);             

export default router;