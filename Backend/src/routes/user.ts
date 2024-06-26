import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import { signinInput, signupInput } from '@leelakrishna/medium-common';
import {sign} from 'hono/jwt'


export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL : string,
        JWT_SECRET : string
    },
    Variables:{
        userId : string
    }
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({message : "Inputs are not correct"})
    }

  
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
  
    if (existingUser) {
        c.status(403);
        return c.json({ error: "User already exists" });
    }

    const user = await prisma.user.create({
        data: {
            email: body.email,
            password: body.password,
            name: body.username,
        },
    });

    const token = await sign({ id: user.id }, c.env?.JWT_SECRET);
      return c.json({jwt : token})
    }
    catch (e) {
      c.status(403);
      console.error(e)
      return c.json({error : "error while signing up"})
    }
  
  })

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL

    }).$extends(withAccelerate())   

    const body = await c.req.json();
    const { success} = signinInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({message: 'Inputs are not valid'})
    }

    try {
        const user = await prisma.user.findFirst({
            where:{
                email: body.email,
                password: body.password
            },
        
        });

    if(!user){
        c.status(404)
        return c.json({message: 'User not found'})
    }

    const jwt = await sign({id: user.id}, c.env?.JWT_SECRET);
    return c.json({jwt})

    }
    catch(e){
        c.status(403)
        return c.text('Invalid')

    }

    
    
});
