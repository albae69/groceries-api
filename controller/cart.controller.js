import * as db from '../config/db.js'

const getCartList = async (req, res) => {
  try {
    let userId = req.decoded
    const results = await db.query(
      'select * from user_cart where user_id = $1',
      [userId]
    )

    if (results.rows) {
      res.json({
        success: true,
        message: 'successfully get cart list!',
        data: results.rows,
      })
      return
    }
  } catch (error) {
    console.error('error while getCartList:', error)
    res.json({
      success: false,
      message: 'Something wrong!',
    })
  }
}

const createCart = async (req, res) => {
  try {
    let userId = req.decoded

    const results = await db.query('', [])

    if (results.rows) {
      res.json({
        success: true,
        message: 'successfully get cart list!',
        data: results.rows,
      })
      return
    }
  } catch (error) {
    console.error('error while createCart:', error)
    res.json({
      success: false,
      message: 'Something wrong!',
    })
  }
}

export { getCartList, createCart }
