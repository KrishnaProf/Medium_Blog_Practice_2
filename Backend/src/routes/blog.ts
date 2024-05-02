import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import {verify} from 'hono/jwt'
import { createPostInput, updatePostInput } from '@leelakrishna/medium-common';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use('/*', async(c, next) => {
    const jwt = c.req.header('Authorization');

    if(!jwt){
        c.status(401)
        return c.json({message: "Unauthorized"})
    }
    const token = jwt
    const payload = await verify(token, c.env?.JWT_SECRET);
    if(!payload){
        c.status(401)
        return c.json({message: "Unauthorized"})
    }

    c.set('jwtPayload', {userId : payload.id});
    await next();

})


blogRouter.post('/create', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const userId = c.get('jwtPayload').userId;
    const { success } = createPostInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({message: 'Inputs are not valid'})
    }

    try{
        const post = await prisma.post.create({
            data:{
                title: body.title,
                content: body.content,
                authorId: userId
            }
        })
        return c.json({id : post.id})

    }
    catch(e){
        c.status(403)
        return c.json({message: 'Error while creating post'})
    
    }




});

blogRouter.put('/update', async (c) => {
    const prisma = new PrismaClient({
            datasourceUrl : c.env?.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const userId = c.get('jwtPayload').userId;
    const { success } = updatePostInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({message: 'Inputs are not valid'})
    }

    try{
        const post = await prisma.post.update({
            where:{
                id : body.id
            },
            data:{
                title: body.title,
                content: body.content
            }
        })
        return c.json({id: post.id})

    }
    catch(e){
        c.status(403)
        return c.json({message: 'Error while updating post'})

    }

});

blogRouter.get('/bulk', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl : c.env?.DATABASE_URL
    }).$extends(withAccelerate())

    const posts = await prisma.post.findMany({
        where:{
            id:{
                in: body.ids
            }
        }

    })

    return c.json(posts)

});

blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env?.DATABASE_URL
    }).$extends(withAccelerate())

    const id = await c.req.param('id');
    const post = await prisma.post.findUnique({
        where:{
            id: id
        }
    })

    return c.json(post)

});