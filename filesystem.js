if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const mongoose = require('mongoose');
const { MongoClient, GridFSBucket } = require('mongodb');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB URI
const mongoURI = process.env.DATABASE_URL; // Change this to your MongoDB URI

// Create MongoClient
const client = new MongoClient(mongoURI);

let gfs;

client.connect(err => {
  if (err) throw err;
  const db = client.db();
  gfs = new GridFSBucket(db, {
    bucketName: 'uploads'
  });
  console.log('Connected to MongoDB');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  res.status(201).send({ file: req.file });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
