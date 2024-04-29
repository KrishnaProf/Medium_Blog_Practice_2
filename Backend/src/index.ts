import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import {cors} from 'hono/cors'


const app = new Hono<{
  Bindings:{
    DATABASE_URL : string,
    SECRET_PATH : string
  }
}>()

app.use('/*', cors())
app.route('/api/v2/user', userRouter)
app.route('/api/v2/blog', blogRouter)

export default app
