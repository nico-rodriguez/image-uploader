require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

// *********** Constants
const app = express();
const PORT = process.env.PORT || 3001;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests. Try again later.',
});

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 5, // allow 5 requests per 15 minutes, then...
  delayMs: 500, // begin adding 500ms of delay per request above 100:
  // request # 101 is delayed by  500ms
  // request # 102 is delayed by 1000ms
  // request # 103 is delayed by 1500ms
  // etc.
});

const STORAGE_FOLDER_NAME = 'image-uploader-storage';
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: STORAGE_FOLDER_NAME,
    format: async (req, file) => 'jpg',
    public_id: (req, file) => {
      const filename = Date.now() + '-' + Math.round(Math.random() * 1e9);
      // save the random filename for the next middleware
      req.filename = filename;

      return filename;
    },
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 4 * 2 ** 20, // 4MB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (allowedMimeTypes.indexOf(file.mimetype) === -1) {
      cb(new Error('File type not allowed'));
    }

    cb(null, true);
  },
});

// ****************** Middleware application
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'img-src': [
        "'self'",
        'https://res.cloudinary.com/dnjnlemli/image/upload/v1/image-uploader-storage/',
      ],
    },
  })
);

app.use(express.static('build/'));

// ******************** Routes
app.post(
  '/images',
  speedLimiter,
  limiter,
  upload.single('image'),
  (req, res) => {
    const imageURL = cloudinary.url(`${STORAGE_FOLDER_NAME}/${req.filename}`);
    res.json({ path: imageURL });
  }
);

app.set('trust proxy', 1);
app.get('/ip', limiter, (request, response) => response.send(request.ip));

// **************** Error handler
app.use(errorHandler);

// **************** Server running
app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}!`));
