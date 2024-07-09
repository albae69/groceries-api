import { query } from '../config/db.js'
import { v4 as uuidv4 } from 'uuid'

const getAllProduct = async (req, res) => {
  try {
    const { page, size } = req.params ?? {}
    const { is_exclusive, is_best_selling } = req?.query ?? {}

    let limit = size ? parseInt(size, 10) : 10
    let offset = page ? (parseInt(page, 10) - 1) * limit : 0

    let results

    if (is_exclusive) {
      results = await query(
        `select p.product_id ,product_name,description,image_url,price,is_exclusive  from product p inner join exclusive_product ep ON p.product_id = ep.product_id limit $1 offset $2`,
        [limit, offset]
      )
    }
    if (is_best_selling) {
      results = await query(
        `select p.product_id ,product_name,description,image_url,price,is_best_selling,sold_total  from product p inner join best_selling_product bsp ON p.product_id = bsp.product_id limit $1 offset $2`,
        [limit, offset]
      )
    } else {
      results = await query(
        `select * from product p left join category c on p.category_id = c.category_id limit $1 offset $2`,
        [limit, offset]
      )
    }

    if (results.rows.length > 0) {
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

const getDetailProduct = async (req, res) => {
  try {
    const { id } = req.params ?? {}

    const results = await query(`select * from product where product_id = $1`, [
      id,
    ])

    if (results.rows) {
      res.json({
        success: true,
        message: 'Succesfully get all products',
        data: results.rows,
      })
    } else {
      res.json({
        success: true,
        message: 'Succesfully get all products',
        data: [],
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

const searchProduct = async (req, res) => {
  try {
    const { product_name } = req?.query

    const results = await query(
      `select * from product where product_name ilike lower($1)`,
      [`%${product_name}%`]
    )

    res.json({
      success: true,
      message: 'successfully get product data',
      data: results.rows,
    })
  } catch (error) {
    console.error('error while search product:', error)
    res.status(500).send({
      success: false,
      message: 'something error',
    })
  }
}

export { getAllProduct, getDetailProduct, createProduct, searchProduct }
