import dotenv from 'dotenv/config.js'
import * as db from './db.js'

await db
  .query(
    `
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        created_at timestamp default NOW(),
        updated_at timestamp default NOW()
    );
    
    CREATE TABLE IF NOT EXISTS category (
        category_id TEXT PRIMARY KEY NOT NULL,
        category_name TEXT,
        image_url TEXT,
        created_at timestamp default NOW(),
        updated_at timestamp default NOW()
    );


    CREATE TABLE IF NOT EXISTS product (
      product_id TEXT PRIMARY KEY NOT NULL,
      product_name TEXT,
      description TEXT,
      image_url TEXT,
      price NUMERIC,
      category_id TEXT,
      created_at timestamp default NOW(),
      updated_at timestamp default NOW(),
      FOREIGN KEY (category_id) REFERENCES category(category_id)
    );

    CREATE TABLE IF NOT EXISTS user_favorites (
      id TEXT PRIMARY KEY NOT NULL,
      product_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      FOREIGN KEY (product_id) REFERENCES product(product_id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS user_cart (
      id TEXT PRIMARY KEY NOT NULL,
      user_id TEXT NOT NULL,
      product_id TEXT NOT NULL,
      FOREIGN KEY (product_id) REFERENCES product(product_id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    `
  )
  .then((res) => {
    console.log('database initialized')
  })
  .catch((err) => console.error('error while migrate', err))
