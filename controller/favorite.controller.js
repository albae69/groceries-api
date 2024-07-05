import * as db from '../config/db.js'

const getFavoriteList = async (req, res) => {
  try {
    let userId = req.decoded
    const results = await db.query(
      'select * from user_favorites where user_id = $1',
      [userId]
    )

    if (results.rows) {
      res.json({
        success: true,
        message: 'successfully get favorite list!',
        data: results.rows,
      })
      return
    }
  } catch (error) {
    console.error('error while getFavoriteList:', error)
    res.json({
      success: false,
      message: 'Something wrong!',
    })
  }
}

const createFavorite = async (req, res) => {
  try {
    let userId = req.decoded

    const results = await db.query('', [])

    if (results.rows) {
      res.json({
        success: true,
        message: 'successfully get favorite list!',
        data: results.rows,
      })
      return
    }
  } catch (error) {
    console.error('error while createFavorite:', error)
    res.json({
      success: false,
      message: 'Something wrong!',
    })
  }
}

export { getFavoriteList, createFavorite }
