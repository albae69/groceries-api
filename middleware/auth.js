import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
  try {
    let bearer = req.headers['authorization'] ?? ''
    let token = bearer.split(' ')[1] || bearer

    if (!token) {
      res.status(403).send({
        success: false,
        message: 'no token provided!',
      })
      return
    } else {
      jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
          res.send({
            success: false,
            message: err.message,
          })
          return
        }

        req.decoded = decode
        next()
      })
    }
  } catch (error) {
    console.log('error while verifyToken')
    res.status(401).send({
      success: false,
      message: 'Unauthorized',
    })
  }
}
