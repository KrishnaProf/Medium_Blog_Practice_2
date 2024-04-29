import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';

export const blogRouter = new Hono();


blogRouter.post('/', async (req, res) => {

});

blogRouter.put('/', async (req, res) => {

});

blogRouter.get('/bulk', async (req, res) => {

});

blogRouter.get('/:id', async (req, res) => {

});