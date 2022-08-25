function errorHandler(err, req, res, next) {
  // Handle multer errors
  // See: https://github.com/expressjs/multer/blob/master/lib/multer-error.js
  if (err.name === 'MulterError') {
    res.status(400);
    if (err.code === 'LIMIT_FILE_COUNT') {
      res.json('Too many files');
    } else if (err.code === 'LIMIT_FILE_SIZE') {
      res.json('File too large (max. 4MB)');
    } else {
      res.status(400);
      res.json('Unknown error');
    }
  } else if (err.name === 'Error' && err.message === 'File type not allowed') {
    res.status(400);
    res.json(err.message);
  } else {
    res.status(500);
    res.json('Unknown error');
  }
}

module.exports = errorHandler;
