import Router from 'koa-router'
import UserRepository from '../resource/user/user.repository'
import registerConstraints from '../lib/validate/registerValidate'
import loginConstraints from '../lib/validate/loginValidate'
import validate from 'validate.js'

const Register = new Router()

Register.post('/register', async function (context, next) {
  let data = context.request.body
  let error = validate(data, registerConstraints, {format: 'flat'})
  if (!error) {
    await UserRepository.findOrCreate({email: data.email},
      {
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        studentId: data.studentId,
      })
    .spread((user, created) => {
      if (created) {
        context.status = 200
        context.message = JSON.stringify({
          created: created
        })
        context.body = {
          status: context.status,
          message: {
            created: created
          }
        }
      } else {
        context.status = 403
        context.message = JSON.stringify({
            created: created
        })
        context.body = {
          status: context.status,
          message: {
            created: created
          }
        }
      }
    })
  } else {
    context.status = 403
    context.message = JSON.stringify({
      error: error
    })
    context.body = {
      status: context.status,
      message: error
    }
  }
})

Register.post('/login', async function (context, next) {
  let data = context.request.body
  let error = validate(data, loginConstraints, {format: 'flat'})
  if (!error) {
    context.body = await UserRepository.findBy({email: data.email})
  } else {
    context.status = 401
    context.message = JSON.stringify({
      error: error
    })
    context.body = {
      status: context.status,
      message: error
    }
  }
})

export default Register
