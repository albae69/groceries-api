import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'

import * as db from '../config/db.js'

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).send({
        success: false,
        message: 'All the fields is required!',
      })
    }

    // find user by email
    let user = await db.query('select * from users where email = $1', [email])

    if (user.rows.length > 0) {
      let data = user.rows[0]
      let hashedPassword = await bcrypt.compare(password, data.password)

      if (hashedPassword) {
        let token = jwt.sign(data.id, process.env.JWT_SECRET)
        delete ['password']

        res.json({
          success: true,
          message: 'successfully logged in',
          data: { token: token },
        })
      } else {
        res.json({
          success: false,
          message: 'email or password is wrong!',
        })
      }
    }
  } catch (error) {
    console.error('error while login: ', error)
    res.status(500)
  }
}

const register = async (req, res) => {
  try {
    const { email, name, password } = req.body
    if (!email || !name || !password) {
      res.json({
        success: false,
        message: 'All the fields is required!',
      })
    }
    const users = await db.query('select * from users where email = $1', [
      email,
    ])

    if (users.rows.length > 0) {
      res.json({
        success: false,
        message: 'Email already exists!',
      })
      return
    }

    let uuid = uuidv4()
    let hashedPassword = await bcrypt.hash(password, 10)

    let newUser = await db.query(
      'insert into users(id,email,name,password) values($1,$2,$3,$4)',
      [uuid, email, name, hashedPassword]
    )

    res.json({
      success: true,
      message: 'Successfully create new user',
    })
  } catch (error) {
    console.error('error while register: ', error)
    res.status(500)
  }
}

export { login, register }
