import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/')
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  },
})

const runMiddleware = (req, res, cb) =>
  new Promise((resolve, reject) => {
    cb(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })

const uploadSingleFile = multer({ storage: storage }).single('file')

export const uploadFile = async (req, res, next) => {
  const MAX_FILE_SIZE = 3000000 // 3mb

  try {
    await runMiddleware(req, res, uploadSingleFile)

    if (req.file.size >= MAX_FILE_SIZE) {
      res.json({
        success: false,
        message: 'image too large, should be less than 3mb',
      })
    }
    req.imageUrl = `public/uploads/${req.file.filename}`
    next()
  } catch (error) {
    console.log('error while upload file', error)
    res.status(500).send({
      success: false,
      message: 'something wrong!',
    })
  }
}
