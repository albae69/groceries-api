import { query } from '../config/db.js'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'

const getCategory = async (req, res) => {
  try {
    const results = await query('select * from category')
    if (results.rows.length) {
      res.json({
        success: true,
        message: 'Successfully get product category data',
        data: results.rows,
      })
    }
  } catch (error) {
    console.error('error while getCategory', error)
    res.status(500).send({
      success: false,
      message: 'Something wrong!',
    })
  }
}

const createProductCategory = async (req, res, next) => {
  try {
    const uuid = uuidv4()
    const { name } = req?.body
    const image = req?.imageUrl

    await query(
      'insert into category(category_id,category_name,image_url) values($1,$2,$3)',
      [uuid, name, image]
    )

    res.json({
      success: true,
      message: 'successfully create a category data',
    })
  } catch (error) {
    console.error('error while createProductCategory', error)
    fs.unlink(req?.imageUrl, (err) => console.log('err while unlink', err))
    res.status(500).send({
      success: false,
      message: 'Something wrong!',
    })
  }
}

const getProductByCategory = async (req, res) => {
  try {
    const { id } = req?.params
    console.log('id', id)

    const results = await query(
      'select * from product where category_id = $1',
      [id]
    )

    res.json({
      success: true,
      message: 'success get product by category',
      data: results.rows,
    })
  } catch (error) {
    console.error('error while get product by category', error)
    res.status(500).send({ success: false, message: 'Something wrong!' })
  }
}

export { getCategory, createProductCategory, getProductByCategory }
