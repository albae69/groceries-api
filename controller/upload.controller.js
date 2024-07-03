export const handleUpload = (req, res, next) => {
  if (!req.file) {
    res.status(400).send({
      success: false,
      message: 'No file uploaded',
    })
  }
  res.send({
    success: true,
    message: 'successfully upload file',
    data: `${req.imageUrl}`,
  })
  next()
}
