if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const axios = require('axios');
const express = require('express');
const fs = require('fs');
const FormData = require('form-data');
const app = express();
const mongoose = require('mongoose');
const indexRouter = require('./routes/index')
const multer = require('multer');
const { MongoClient, GridFSBucket } = require('mongodb');
const { GridFsStorage } = require('multer-gridfs-storage');
const path = require('path');

const apiKey = '663fc94f351eb02337c597ba';
const baseURL = process.env.DATABASE_URL;
const dbName = 'LCAppTest';
const client = new MongoClient(baseURL);

async function uploadFileAudio(filePath) {
    await client.connect();
    const db = client.db(dbName);
    const bucket = new GridFSBucket(db, { bucketName: 'myfiles' });
    
    const uploadStream = bucket.openUploadStream('file.mp3');
    fs.createReadStream(filePath).pipe(uploadStream)
        .on('error', (error) => console.error('Error uploading file:', error))
        .on('finish', () => {
            console.log('File uploaded successfully');
            client.close();
        }
    );
}
async function uploadFileVideo(filePath) {
    await client.connect();
    const db = client.db(dbName);
    const bucket = new GridFSBucket(db, { bucketName: 'myfiles' });
    
    const uploadStream = bucket.openUploadStream('file.mp4');
    fs.createReadStream(filePath).pipe(uploadStream)
        .on('error', (error) => console.error('Error uploading file:', error))
        .on('finish', () => {
            console.log('File uploaded successfully');
            client.close();
        }
    );
}

async function getFileAudio(fileId) {
    await client.connect();
    const db = client.db(dbName);
    const bucket = new GridFSBucket(db, { bucketName: 'myfiles' });

    const downloadStream = bucket.openDownloadStream(fileId);
    const writeStream = fs.createWriteStream('downloaded_file.mp3');
    
    downloadStream.pipe(writeStream)
        .on('error', (error) => console.error('Error downloading file:', error))
        .on('finish', () => {
            console.log('File downloaded successfully');
            client.close();
        }
    );
}

async function getFileVideo(fileId) {
    await client.connect();
    const db = client.db(dbName);
    const bucket = new GridFSBucket(db, { bucketName: 'myfiles' });

    const downloadStream = bucket.openDownloadStream(fileId);
    const writeStream = fs.createWriteStream('downloaded_file.mp4');
    
    downloadStream.pipe(writeStream)
        .on('error', (error) => console.error('Error downloading file:', error))
        .on('finish', () => {
            console.log('File downloaded successfully');
            client.close();
        }
    );
}

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.on('open', () => console.log('Connected to Mongoose'));

app.set('view-engine', 'ejs')
app.use(express.urlencoded( {extended: false} ))

app.get('/', (req, res) => {
    res.render('index.ejs', { name: 'Kilian' })
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/register', (req, res) => {
    res.body.name
})

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)