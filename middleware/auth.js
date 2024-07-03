import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  let bearer = req.headers['authorization']
  let token = bearer.split(' ')[1] || bearer

  if (!token) {
    res.status(403).send({
      success: false,
      message: 'no token provided!',
    })
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.send({
          success: false,
          message: err.message,
        })
      }

      req.decoded = decode
      next()
    })
  }

  res.status(401).send({
    success: false,
    message: 'Unauthorized',
  })
}
