import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import Register from './app/api/Register'
import 'dotenv/config'

const app = new Koa()
const router = new Router()

app.use(bodyParser())
app.use(cors())

router.use('/user', Register.routes())

app.use(router.routes())
app.use(router.allowedMethods())

console.log('App listen at PORT '+process.env.PORT)
app.listen(process.env.PORT)
