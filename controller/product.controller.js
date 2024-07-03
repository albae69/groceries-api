import { query } from '../config/db.js'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'

const getAllProduct = async (req, res) => {
  try {
    const { page, size } = req.params ?? {}
    let limit = size ? parseInt(size, 10) : 10
    let offset = page ? (parseInt(page, 10) - 1) * limit : 0

    const results = await query(
      `select * from product p left join category c on p.category_id = c.category_id limit $1 offset $2`,
      [limit, offset]
    )

    if (results.rows.length > 0) {
      console.log(results.rows)
      res.json({
        success: true,
        message: 'Succesfully get all products',
        data: results.rows,
      })
    }
  } catch (error) {
    console.error('error while getAllProduct', error)
    res.status(500).send({
      success: false,
      message: 'Something wrong!',
    })
  }
}

const createProduct = async (req, res) => {
  try {
    const { product_name, description, price, category_id } = req?.body

    let uuid = uuidv4()
    let imageUrl = req?.imageUrl

    const results = await query(
      'insert into product(product_id,product_name,description,price,image_url,category_id) values($1,$2,$3,$4,$5,$6)',
      [uuid, product_name, description, price, imageUrl, category_id]
    )

    res.json({
      success: true,
      message: 'successfully create a product data',
    })
    return
  } catch (error) {
    console.error('error while create product', error)
    res.status(500).send({
      success: false,
      message: 'failed to create product data',
    })
  }
}

const getAllProductCategory = async (req, res) => {
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
    console.error('error while getAllProductCategory', error)
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

export {
  getAllProduct,
  getAllProductCategory,
  createProductCategory,
  createProduct,
}
