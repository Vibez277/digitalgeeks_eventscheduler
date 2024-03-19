import express from 'express';
import { SignIn, SignOut, SignUp } from '../controllers/auth';
import { Authenticate } from '../middleware/authenticate';

const router = express.Router();

router.post("/signin",Authenticate,SignIn);
router.post("/signup",SignUp);
router.get("/signout",SignOut);


export default router;