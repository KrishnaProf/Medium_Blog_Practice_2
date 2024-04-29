import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';

export const userRouter = new Hono();

userRouter.post('/signup', async (req, res) => {

    
});

userRouter.post('/signin', async (req, res) => {
    
    
});