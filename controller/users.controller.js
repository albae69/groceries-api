import * as db from '../config/db.js'

const getUserById = async (req, res) => {
  try {
    let userId = req.decoded

    // find user by id
    let response = await db.query('select * from users where id = $1', [userId])
    let user = response.rows[0]
    delete user['password']

    return res.json({
      success: true,
      message: 'successfully get user by id',
      data: user,
    })
  } catch (error) {
    console.error('error while login: ', error)
    res.status(500)
  }
}

export { getUserById }
