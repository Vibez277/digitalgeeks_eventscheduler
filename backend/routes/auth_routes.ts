import express from 'express';
import { SignIn, SignUp } from '../controllers/auth';
import { Authenticate } from '../middleware/authenticate';

const router = express.Router();

router.post("/signin",Authenticate,SignIn);
router.post("/signup",SignUp);


export default router;